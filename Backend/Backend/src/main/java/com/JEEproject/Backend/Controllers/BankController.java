package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.DTOs.BankDto;
import com.JEEproject.Backend.Models.Bank;
import com.JEEproject.Backend.Repositories.BankRepository;
import com.JEEproject.Backend.services.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bank")
public class BankController {

    @Autowired
    private BankRepository bankRepo;

    @Autowired
    private Utils utils;

    private final ResponseEntity<String> stringInternalError = new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    private final ResponseEntity<List<BankDto>> listInternalError = new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    private final ResponseEntity<BankDto> bankInternalError = new ResponseEntity<>(new BankDto(), HttpStatus.INTERNAL_SERVER_ERROR);

    @PostMapping("/save")
    public ResponseEntity<String> addBank(@RequestBody Bank bank) {
        Optional<Bank> bankExists;
        try {
            bankExists = bankRepo.findByUserAndCardnum(bank.getUser(), bank.getCardnum());
        } catch (Exception e) {
            return stringInternalError;
        }
        if (bankExists.isPresent())
            return new ResponseEntity<>("Bank account already exists for user with card number: " + bank.getCardnum(), HttpStatus.NOT_ACCEPTABLE);
        try {
            bankRepo.save(bank);
        } catch (Exception e) {
            return stringInternalError;
        }
        return new ResponseEntity<>("Bank Account Added", HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<BankDto>> getAllBanks() {
        List<Bank> banks;
        try {
            banks = bankRepo.findAll();
        } catch (Exception e) {
            return listInternalError;
        }
        return new ResponseEntity<>(utils.generateBankProjection(banks), HttpStatus.OK);
    }

    @GetMapping("/get/id/{id}")
    public ResponseEntity<BankDto> getBankById(@PathVariable int id) {
        Optional<Bank> bank;
        try {
            bank = bankRepo.findById(id);
        } catch (Exception e) {
            return bankInternalError;
        }
        if (bank.isEmpty())
            return new ResponseEntity<>(new BankDto(), HttpStatus.NOT_FOUND);
        List<Bank> tmp = new ArrayList<>();
        tmp.add(bank.get());
        return new ResponseEntity<>(utils.generateBankProjection(tmp).get(0), HttpStatus.OK);
    }

}
