package com.beschtee.backend.Controllers;

import com.beschtee.backend.Services.SoapClient;
import com.beschtee.backend.stub.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
public class TradingServiceController {

    @Autowired
    private SoapClient soapClient;

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
    public BigDecimal buyStock(@RequestParam String symbol, @RequestParam int shares) {
        ObjectFactory objectFactory = new ObjectFactory();
        Buy type = new Buy();
        type.setShares(shares);
        type.setSymbol(symbol);

        BuyResponse response = soapClient.buyStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createBuy(type));
        return response.getReturn();
    }

    @PostMapping("/api/sellStock")
    public BigDecimal sellStock(@RequestParam String symbol, @RequestParam int shares) {
        ObjectFactory objectFactory = new ObjectFactory();
        Sell type = new Sell();
        type.setShares(shares);
        type.setSymbol(symbol);

        SellResponse response = soapClient.sellStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createSell(type));
        return response.getReturn();
    }
}
