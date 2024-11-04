package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.DTOs.BankDto;
import com.JEEproject.Backend.Models.Bank;
import com.JEEproject.Backend.Repositories.BankRepository;
import com.JEEproject.Backend.Repositories.ClientRepository;
import com.JEEproject.Backend.services.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/bank")
public class BankController {

    @Autowired
    private BankRepository bankRepo;

    private ClientRepository clientRepo;

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
        if (bankExists.isPresent()) {
            return new ResponseEntity<>("Bank account already exists for user with card number: " + bank.getCardnum(), HttpStatus.NOT_ACCEPTABLE);
        }

        // Set random balance for the bank
        Random random = new Random();
        int randomBalance = random.nextInt(5000 - 100 + 1) + 100;
        bank.setBalance((float) randomBalance);

        try {
            bankRepo.save(bank);
        } catch (Exception e) {
            return stringInternalError;
        }
        return new ResponseEntity<>("Bank Account Added", HttpStatus.CREATED);
    }

    @GetMapping("/get/user/{userId}")
    public ResponseEntity<List<BankDto>> getAllBanksByUser(@PathVariable int userId) {
        List<Bank> banks;
        try {
            // Retrieve banks associated with the specific user ID
            banks = bankRepo.findByUser_Id_user(userId);
        } catch (Exception e) {
            return listInternalError;
        }

        if (banks.isEmpty()) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND); // Return 404 if no banks found
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

    @PutMapping("/update/{id}/{newBalance}")
    public ResponseEntity<String> updateBankBalance(@PathVariable int id, @PathVariable float newBalance) {
        Optional<Bank> bank = bankRepo.findById(id);
        if (bank.isEmpty()) {
            return new ResponseEntity<>("Bank not found", HttpStatus.NOT_FOUND);
        }
        Bank bankToUpdate = bank.get();
        bankToUpdate.setBalance(newBalance);
        bankRepo.save(bankToUpdate);
        return new ResponseEntity<>("Bank balance updated", HttpStatus.OK);
    }


}
