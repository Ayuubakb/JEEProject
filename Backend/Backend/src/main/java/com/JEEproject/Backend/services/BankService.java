package com.JEEproject.Backend.services;

import com.JEEproject.Backend.Models.Bank;
import com.JEEproject.Backend.Repositories.BankRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BankService {

    @Autowired
    private BankRepository bankRepository;

    public List<Bank> getAllBanks() {
        return bankRepository.findAll();
    }

    public Optional<Bank> getBankById(Integer id) {
        return bankRepository.findById(id);
    }

    public Bank saveBank(Bank bank) {
        return bankRepository.save(bank);
    }

    public void deleteBank(Integer id) {
        bankRepository.deleteById(id);
    }
}
