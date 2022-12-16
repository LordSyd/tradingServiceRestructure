package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Repositories.StockRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StockService {
    @Autowired
    StockRepository stockRepository;

    public void addStockToDatabase(Stock stock){
        stockRepository.save(stock);
    }
}
