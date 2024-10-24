package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.B_Type;
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
    @Enumerated(value = EnumType.STRING)
    private B_Type Receiver;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    public Transaction() {}
    public Transaction(float amount, B_Type Receiver) {
        this.date = new Date();
        this.amount=amount;
        this.Receiver=Receiver;
    }
}
