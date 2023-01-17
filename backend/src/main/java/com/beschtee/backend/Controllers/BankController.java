package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.Bank;
import com.beschtee.backend.Services.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;

@RestController
public class BankController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BankService bankService;


    @GetMapping("api/bank")
    public Bank getBank() {
        Bank bank = bankService.getBank();
        System.out.println(bank);
        return bank;
    }

    @GetMapping("api/bank/volume")
    public BigDecimal getBankVolume() {
        Bank bank = bankService.getBank();
        return bank.getVolume();
    }

    @PostMapping("api/bank")
    public Bank createBank(
            //Bank bank
    ) {
        Bank bankNew = bankService.addBankToDatabase(Bank.builder()
                .volume(BigDecimal.valueOf(1000000000))
                .build());
        System.out.println(bankNew);
        return bankNew;
    }

}
