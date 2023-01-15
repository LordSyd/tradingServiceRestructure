package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Models.person.User;
import com.beschtee.backend.Models.person.UserRole;
import com.beschtee.backend.Services.*;
import com.beschtee.backend.stub.*;
import lombok.RequiredArgsConstructor;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class TradingServiceController {

    @Autowired
    private SoapClient soapClient;

    @Autowired
    private final UserService userService;

    @Autowired
    private final DepotService depotService;

    @Autowired
    private final BankService bankService;

    @Autowired
    private final StockService stockService;

    @GetMapping("/api/findStockByName")
    public List<PublicStockQuote> findStockByName(@RequestParam String namePart) {
        ObjectFactory objectFactory = new ObjectFactory();
        FindStockQuotesByCompanyName type = new FindStockQuotesByCompanyName();
        type.setPartOfCompanyName(namePart);

        FindStockQuotesByCompanyNameResponse response = soapClient.getStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createFindStockQuotesByCompanyName(type));
        return response.getReturn();
    }

    @GetMapping("/api/findStocksBySymbol")
    public List<PublicStockQuote> findStocksBySymbol(@RequestParam List<String> symbols) {
        ObjectFactory objectFactory = new ObjectFactory();
        GetStockQuotes type = new GetStockQuotes();
        for (String symbol : symbols) {
            type.getSymbols().add(symbol);
        }

        GetStockQuotesResponse response = soapClient.findStocksBySymbol("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createGetStockQuotes(type));
        return response.getReturn();
    }

    @GetMapping("/api/getStockQuoteHistory")
    public List<PublicStockQuote> getStockQuoteHistory(@RequestParam String symbol) {
        ObjectFactory objectFactory = new ObjectFactory();
        GetStockQuoteHistory type = new GetStockQuoteHistory();
        type.setSymbol(symbol);

        GetStockQuoteHistoryResponse response = soapClient.getStockHistory("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createGetStockQuoteHistory(type));
        return response.getReturn();
    }

    @PostMapping("/api/buyStock")
    public ResponseEntity buyStock(@RequestParam String symbol, @RequestParam int shares, @RequestParam Long depotId) {
        if ( userService.getCurrentUser().isCustomer()
                && ! this.depotService.checkDepotAuthorization(userService.getCurrentUser(), depotId)
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("DepotId does not match with provided credentials");
        }

        Depot depot = this.depotService.getDepotById(depotId);
        List<PublicStockQuote> stockQuoteList = this.findStocksBySymbol(Collections.singletonList(symbol));
        if (stockQuoteList.size() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No shares with provided symbol found");
        }

        float buyVolume = stockQuoteList.get(0).getLastTradePrice().floatValue() * shares;

        if ( ! this.bankService.checkVolume(buyVolume) ) {
            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).body("Insufficient trading volume");
        }
        //Kaufvorgang
        ObjectFactory objectFactory = new ObjectFactory();
        Buy type = new Buy();
        type.setShares(shares);
        type.setSymbol(symbol);
        float pricePerShare;
        //Return value: Buys shares and returns the price per share effective for the buying transaction.
        try {
             BuyResponse response = soapClient.buyStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                    objectFactory.createBuy(type));
             pricePerShare = response.getReturn().floatValue();

             //500 net.froihofer.dsfinance.business.TradingException: Not enough shares available.
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        //stock
        Stock stock = stockService.saveStock(stockQuoteList.get(0), shares, depot);
        //depot

        //bankVolume aktualisieren
        bankService.decreaseVolume(pricePerShare * shares);

        return ResponseEntity.ok("Customer id " + depot.getCustomer().getId());
    }

    @PostMapping("/api/sellStock")
    public ResponseEntity sellStock(@RequestParam String symbol, @RequestParam int shares, @RequestParam Long depotId) {
        if ( userService.getCurrentUser().isCustomer()
                && ! this.depotService.checkDepotAuthorization(userService.getCurrentUser(), depotId)
        ) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("DepotId does not match with provided credentials");
        }

        Depot depot = this.depotService.getDepotById(depotId);
        Stock stock = this.stockService.getStockBySymbolAndDepot(symbol, depot);

        if ( stock == null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No shares found with provided symbol and depotId");
        } else if (! this.stockService.checkQuantity(stock, shares)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough shares to sell");
        }

        List<PublicStockQuote> stockQuoteList = this.findStocksBySymbol(Collections.singletonList(symbol));
        if (stockQuoteList.size() == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No shares exists with provided symbol");
        }

        //Verkauf
        ObjectFactory objectFactory = new ObjectFactory();
        Sell type = new Sell();
        type.setShares(shares);
        type.setSymbol(symbol);
        float pricePerShare;
        //Return value: Buys shares and returns the price per share effective for the buying transaction.
        try {
            SellResponse response = soapClient.sellStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                    objectFactory.createSell(type));
            stock = this.stockService.updateQuantity(stock, shares, depot);
            bankService.increaseVolume(response.getReturn().floatValue() * shares);
            return ResponseEntity.ok("Customer id " + depot.getCustomer().getId());
            //500 net.froihofer.dsfinance.business.TradingException: Not enough shares available.
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
