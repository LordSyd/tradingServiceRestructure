package com.beschtee.backend.Controllers;

import com.beschtee.backend.Models.Bank;
import com.beschtee.backend.Services.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin
@RestController
public class ClientController {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BankService bankService;


    @GetMapping("bank")
    public Bank getBank() {
        Bank bank = bankService.getBank();
        System.out.println(bank);
        return bank;

    }

    @PostMapping("bank")
    public Bank createBank(
            //Bank bank
    ) {
        Bank bankNew = bankService.addBankToDatabase(Bank.builder()
                .volume(1000000000)
                .build());
        System.out.println(bankNew);
        return bankNew;
    }

}
