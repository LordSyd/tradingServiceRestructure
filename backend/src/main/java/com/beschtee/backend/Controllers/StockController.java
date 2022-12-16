package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.Stock;
import com.beschtee.backend.Services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping(value = "buyStock")
    public void buyStock(@RequestBody Stock stock){
        stockService.addStockToDatabase(stock);
    }
}
