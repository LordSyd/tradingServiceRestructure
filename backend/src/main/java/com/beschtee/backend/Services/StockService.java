package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Depot;
import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Repositories.StockRepository;
import com.beschtee.backend.stub.PublicStockQuote;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
