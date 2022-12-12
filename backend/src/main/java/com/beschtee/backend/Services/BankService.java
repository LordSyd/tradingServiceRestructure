package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Bank;
import com.beschtee.backend.Repositories.BankRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class BankService {

    BankRepository bankRepository;

    public Bank addBankToDatabase(Bank bank) {
        ArrayList<Bank> banks = new ArrayList<>(bankRepository.findAll());
        if ( banks.size() > 0 ) {
            throw new IllegalStateException("There is a bank already in the database");
        } else {
            return bankRepository.save(bank);
        }

    }

    public Bank getBank() {
        return bankRepository.findById(1L).orElseThrow(() -> new NoSuchElementException("There is no bank in the database"));
    }
}
