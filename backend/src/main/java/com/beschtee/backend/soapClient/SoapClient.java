package com.beschtee.backend.soapClient;
import com.beschtee.backend.stub.FindStockQuotesByCompanyName;
import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.client.core.SoapActionCallback;


import javax.xml.bind.JAXBElement;

public class SoapClient extends WebServiceGatewaySupport {
    public FindStockQuotesByCompanyNameResponse getStockQuotes(String url, Object request){
        JAXBElement res = (JAXBElement) getWebServiceTemplate().marshalSendAndReceive(url, request);
        return (FindStockQuotesByCompanyNameResponse) res.getValue();
    }

    public FindStockQuotesByCompanyNameResponse getStockNew(String name) {
        FindStockQuotesByCompanyName request = new FindStockQuotesByCompanyName();
        request.setPartOfCompanyName(name);
        FindStockQuotesByCompanyNameResponse response = (FindStockQuotesByCompanyNameResponse) getWebServiceTemplate().marshalSendAndReceive(
                request, new SoapActionCallback("https://edu.dedisys.org/ds-finance/ws/TradingService"));
        return response;
    }
}
