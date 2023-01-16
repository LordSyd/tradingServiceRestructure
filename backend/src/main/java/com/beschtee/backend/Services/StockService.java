package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Repositories.StockRepository;
import com.beschtee.backend.stub.PublicStockQuote;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StockService {

    @Autowired
    private final StockRepository stockRepository;

    public Stock saveStock(PublicStockQuote stockQuote, int quantity, Depot depot) {
        Optional<Stock> stock = stockRepository.findStockBySymbolIgnoreCaseAndDepot(stockQuote.getSymbol(), depot);

        //TODO: change the way the problem with already existing user is handled
        if (stock.isPresent()) {
            Stock availableStock = stock.get();
            availableStock.setQuantity(availableStock.getQuantity() + quantity);
            return stockRepository.save(availableStock);
            //stockRepository.updateQuantity(availableStock.getId(), );
        } else {
            return stockRepository.save(Stock.builder()
                    .symbol(stockQuote.getSymbol())
                    .depot(depot)
                    .companyName(stockQuote.getCompanyName())
                    .quantity(quantity)
                    .build()
            );
        }
    }

    public Stock getStockBySymbolAndDepot(String symbol, Depot depot) {
        return this.stockRepository.findStockBySymbolIgnoreCaseAndDepot(symbol, depot).orElse(null);
    }

    public boolean checkQuantity( Stock stock, int sellQuantity ) {
        return stock.getQuantity() >= sellQuantity;
    }

    public Stock updateQuantity(Stock stock, int quantity, Depot depot) {
            Stock currentState = this.stockRepository.findById(stock.getId()).orElseThrow(() ->
                    new NoSuchElementException("No such stock found")
            );
            double newQuantity = currentState.getQuantity() - quantity;
            currentState.setQuantity(newQuantity);
            return stockRepository.save(currentState);
    }

    public List<Stock> getStocksByDepotId(Long depotId) {
        return this.stockRepository.findStocksByDepot_Id(depotId);
    }
}
