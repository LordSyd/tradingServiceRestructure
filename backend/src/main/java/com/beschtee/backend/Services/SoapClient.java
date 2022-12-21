package com.beschtee.backend.Services;

import com.beschtee.backend.stub.Buy;
import com.beschtee.backend.stub.BuyResponse;
import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import com.beschtee.backend.stub.SellResponse;
import jakarta.xml.bind.JAXBElement;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

public class SoapClient extends WebServiceGatewaySupport {
    public FindStockQuotesByCompanyNameResponse getStock(String url, Object request){
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (FindStockQuotesByCompanyNameResponse) res.getValue();
    }

    public BuyResponse buyStock(String url, Object request){
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (BuyResponse) res.getValue();
    }

    public SellResponse sellStock(String url, Object request){
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (SellResponse) res.getValue();
    }

}