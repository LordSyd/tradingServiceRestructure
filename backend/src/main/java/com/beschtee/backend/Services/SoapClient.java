package com.beschtee.backend.Services;

import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import jakarta.xml.bind.JAXBElement;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class SoapClient extends WebServiceGatewaySupport {
    public FindStockQuotesByCompanyNameResponse getStock(String url, Object request){
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (FindStockQuotesByCompanyNameResponse) res.getValue();
    }

}