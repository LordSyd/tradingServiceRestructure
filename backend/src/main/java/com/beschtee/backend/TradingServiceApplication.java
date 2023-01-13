package com.beschtee.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class TradingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradingServiceApplication.class, args);
	}
}
