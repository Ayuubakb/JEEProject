package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
@DiscriminatorValue("Client")
public class Client extends User {
    private String company;
    private String address;
    private Float balance;

    @OneToMany(mappedBy = "client")
    private List<Order> Orders=new ArrayList<>();
    @OneToMany(mappedBy = "client")
    private List<Transaction> transactions=new ArrayList<>();

    public Client() {}
    public Client(String FirstName, String LastName,  String email,String password, String company, String address, Agency agency) {
        super(FirstName,LastName,email,password, Roles.Client,agency);
        this.company = company;
        this.address = address;
        this.balance = (float) 0;
    }
}
