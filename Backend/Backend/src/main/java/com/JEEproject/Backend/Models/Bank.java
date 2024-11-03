package com.JEEproject.Backend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "banks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_bank;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;  // Assuming a User entity exists

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private long cardnum;

    @Column(nullable = false)
    private Integer cvv;

    @Column(nullable = false)
    private Integer expiry_y;

    @Column(nullable = false)
    private Integer expiry_m;

    @Column
    private Float balance;
}
