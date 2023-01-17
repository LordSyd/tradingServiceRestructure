package com.beschtee.backend.Services;

import com.beschtee.backend.Models.Bank;
import com.beschtee.backend.Repositories.BankRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public boolean checkVolume( float amount ) {
        Bank bank = this.getBank();
        if(bank.getVolume().compareTo(BigDecimal.valueOf(amount))==1 || bank.getVolume().compareTo(BigDecimal.valueOf(amount))==0) {
            return true;
        }
        return false;
    }

    public BigDecimal decreaseVolume(float amount) {
        Bank bank = this.getBank();
        bank.setVolume(bank.getVolume().subtract(BigDecimal.valueOf(amount)));
        bank = bankRepository.save(bank);
        return bank.getVolume();
    }

    public BigDecimal increaseVolume(float amount) {
        Bank bank = this.getBank();
        bank.setVolume(bank.getVolume().add(BigDecimal.valueOf(amount)));
        bank = bankRepository.save(bank);
        return bank.getVolume();
    }

}
