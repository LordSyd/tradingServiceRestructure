package com.beschtee.backend.Controllers;


import com.beschtee.backend.Services.SoapClient;
import com.beschtee.backend.stub.FindStockQuotesByCompanyName;
import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import com.beschtee.backend.stub.ObjectFactory;
import com.beschtee.backend.stub.PublicStockQuote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TradingServiceController {

    @Autowired
    private SoapClient soapClient;

    @GetMapping("/api/findStock")
    public List<PublicStockQuote> test(@RequestParam String namePart) {
        ObjectFactory objectFactory = new ObjectFactory();
        FindStockQuotesByCompanyName type = new FindStockQuotesByCompanyName();
        type.setPartOfCompanyName(namePart);

        FindStockQuotesByCompanyNameResponse response = soapClient.getStock("https://edu.dedisys.org/ds-finance/ws/TradingService",
                objectFactory.createFindStockQuotesByCompanyName(type));
        return response.getReturn();
    }
}
