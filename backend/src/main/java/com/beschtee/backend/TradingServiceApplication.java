package com.beschtee.backend;

import com.beschtee.backend.soapClient.SoapClient;
import com.beschtee.backend.stub.FindStockQuotesByCompanyNameResponse;
import com.beschtee.backend.stub.PublicStockQuote;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TradingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradingServiceApplication.class, args);
	}

	/*
	@Bean
	CommandLineRunner lookup(SoapClient articleClient) {
		return args -> {
			System.out.println("--- Get Article by Id ---");
			FindStockQuotesByCompanyNameResponse findResponse = articleClient.getStockNew("mag");
			PublicStockQuote companyInfo = findResponse.getReturn().get(1);
			System.out.println(companyInfo.getCompanyName() + ", " + companyInfo.getSymbol()
					+ ", " + companyInfo.getLastTradePrice());
		};
	}
	 */
}
