package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.TType;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TransactionProjection {
    private int idTransaction; // Transaction ID
    private float amount; // Transaction amount
    private Date date; // Transaction date
    private int clientId; // Associated client ID
    private TType type; // Field for the transaction type

    // Constructor matching the JPQL query
    public TransactionProjection(int idTransaction, float amount, Date date, int clientId, TType type) {
        this.idTransaction = idTransaction;
        this.amount = amount;
        this.date = date;
        this.clientId = clientId;
        this.type = type; // Initialize receiver type
    }

    // Getters and Setters
}
