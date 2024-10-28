package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Enums.TType;
import com.JEEproject.Backend.Models.Client;
import com.JEEproject.Backend.Models.Transaction;
import com.JEEproject.Backend.Projections.TransactionProjection;
import com.JEEproject.Backend.Repositories.ClientRepository;
import com.JEEproject.Backend.Repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ClientRepository clientRepository;

    // Get transaction by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<TransactionProjection> getTransactionById(@PathVariable int id) {
        Optional<TransactionProjection> transactionOpt = transactionRepository.findProjectionById(id);
        return transactionOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @GetMapping("/get/client/{clientId}")
    public ResponseEntity<List<TransactionProjection>> getTransactionsByClient(@PathVariable int clientId) {
        List<TransactionProjection> transactions = transactionRepository.findByClientId(clientId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<TransactionProjection>> getAllTransactions() {
        List<TransactionProjection> transactions = transactionRepository.findAllProjections();
        return ResponseEntity.ok(transactions);
    }

    // Save a new transaction with only client ID
    @PostMapping("/save")
    public ResponseEntity<String> saveTransaction(@RequestParam float amount, @RequestParam int clientId, @RequestParam String type) {
        // Retrieve the client by ID
        Optional<Client> clientOpt = clientRepository.findById(clientId);

        // Check if the client exists
        if (clientOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Client does not exist");
        }

        Client client = clientOpt.get();
        float currentBalance = client.getBalance() == null ? 0 : client.getBalance();

        // Handle different transaction types
        TType transactionType;
        try {
            transactionType = TType.valueOf(type);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid transaction type");
        }

        if (transactionType == TType.Recharge) {
            // Add to balance for recharge
            client.setBalance(currentBalance + amount);
        } else if (transactionType == TType.Purchase) {
            // Check if there are enough funds for purchase
            if (currentBalance < amount) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance for purchase");
            }
            // Deduct from balance for purchase
            client.setBalance(currentBalance - amount);
        }

        // Save updated client and create the new transaction
        clientRepository.save(client);
        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDate(new Date());
        transaction.setClient(client);
        transaction.setType(transactionType); // Set transaction type (Recharge or Purchase)
        transactionRepository.save(transaction);

        return ResponseEntity.ok("Transaction saved successfully");
    }

    // Update an existing transaction
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateTransaction(@PathVariable int id, @RequestBody Transaction updatedTransaction) {
        Optional<Transaction> existingTransactionOpt = transactionRepository.findById(id);
        if (existingTransactionOpt.isPresent()) {
            Transaction existingTransaction = existingTransactionOpt.get();
            Client client = existingTransaction.getClient();

            if (client != null) {
                float currentBalance = client.getBalance() == null ? 0 : client.getBalance();
                float difference = updatedTransaction.getAmount() - existingTransaction.getAmount();

                if (existingTransaction.getType() == TType.Recharge) {
                    // Adjust balance for recharge
                    client.setBalance(currentBalance + difference);
                } else if (existingTransaction.getType() == TType.Purchase) {
                    // Adjust balance for purchase
                    if (currentBalance + difference < 0) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient balance after update");
                    }
                    client.setBalance(currentBalance - difference);
                }

                clientRepository.save(client);
            }

            existingTransaction.setAmount(updatedTransaction.getAmount());
            existingTransaction.setDate(updatedTransaction.getDate());
            transactionRepository.save(existingTransaction);

            return ResponseEntity.ok("Transaction updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
        }
    }

    // Delete a transaction
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable int id) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(id);
        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            Client client = transaction.getClient();
            if (client != null) {
                float currentBalance = client.getBalance() == null ? 0 : client.getBalance();

                // Reverse the operation based on transaction type
                if (transaction.getType() == TType.Recharge) {
                    // Remove amount from balance for recharge
                    client.setBalance(currentBalance - transaction.getAmount());
                } else if (transaction.getType() == TType.Purchase) {
                    // Add amount to balance for purchase
                    client.setBalance(currentBalance + transaction.getAmount());
                }

                clientRepository.save(client);
            }
            transactionRepository.deleteById(id);
            return ResponseEntity.ok("Transaction deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transaction not found");
        }
    }
}
