package com.beschtee.backend.soapClient;

import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import com.beschtee.backend.stub.GetStockQuotes;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import javax.xml.bind.JAXBElement;

public class SoapClient extends WebServiceGatewaySupport {
    public FindStockQuotesByCompanyNameResponse getStockQuotes(String url, Object request) {
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (FindStockQuotesByCompanyNameResponse) res.getValue();
    }
}
