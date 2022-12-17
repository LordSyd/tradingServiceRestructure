package com.beschtee.backend.Controllers;

import com.beschtee.backend.soapClient.SoapClient;
import com.beschtee.backend.stub.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/soap")
public class soapRequest {
        @Autowired
        private SoapClient soapClient;

        @GetMapping
        public List<PublicStockQuote> sum(@RequestParam String companyName) {
            ObjectFactory objectFactory = new ObjectFactory();
            FindStockQuotesByCompanyName type = new FindStockQuotesByCompanyName();
            type.setPartOfCompanyName(companyName);
            FindStockQuotesByCompanyNameResponse response = soapClient.getStockQuotes("https://edu.dedisys.org/ds-finance/ws/TradingService");
            return response.getReturn();
        }
    }
