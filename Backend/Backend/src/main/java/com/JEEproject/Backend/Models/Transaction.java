package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.TType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "transactions")
@Getter
@Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTransaction;
    private Date date;
    private float amount;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private Client client;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type") // Ensure this matches the column name in your database
    private TType type; // Updated to 'type' for clarity

    public Transaction() {
    }

    public Transaction(float amount, Client client, TType type) {
        this.date = new Date();
        this.amount = amount;
        this.client = client;
        this.type = type; // Initialize transaction type
    }
}
