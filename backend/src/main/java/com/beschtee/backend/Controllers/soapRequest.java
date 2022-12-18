package com.beschtee.backend.Controllers;

import com.beschtee.backend.soapClient.SoapClient;
import com.beschtee.backend.stub.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class soapRequest {
        @Autowired
        private SoapClient soapClient;

        @GetMapping("/soap")
        public FindStockQuotesByCompanyNameResponse sum(@RequestParam String companyName){
            ObjectFactory objectFactory = new ObjectFactory();
            FindStockQuotesByCompanyName symbol = new FindStockQuotesByCompanyName();
            symbol.setPartOfCompanyName(companyName);
            FindStockQuotesByCompanyNameResponse response = soapClient.getStockQuotes("https://edu.dedisys.org/ds-finance/ws/TradingService", objectFactory.createFindStockQuotesByCompanyName());
            return response;
        }

    }
