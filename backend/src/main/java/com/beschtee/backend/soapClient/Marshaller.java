package com.beschtee.backend.soapClient;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;

@Configuration
public class Marshaller {
    @Bean
    public Jaxb2Marshaller marshallerTest()  {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("com.beschtee.backend.stub");
        return marshaller;
    }
    @Bean
    public SoapClient soapConnector(Jaxb2Marshaller marshaller) {
        SoapClient client = new SoapClient();
        client.setDefaultUri("https://edu.dedisys.org/ds-finance/ws/TradingService");
        client.setMarshaller(marshaller);
        client.setUnmarshaller(marshaller);
        return client;
    }
}
