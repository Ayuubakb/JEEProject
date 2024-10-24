package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.Cities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="receivers")
@Getter
@Setter
public class Receiver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_receiver;
    private String fullname;
    private String email;
    @Enumerated(EnumType.STRING)
    private Cities city;
    private String phone;
    private String address;

    @OneToMany(mappedBy = "receiver")
    private List<Order> orders=new ArrayList<>();

    public Receiver() {}
    public Receiver(String fullname, String email, Cities city, String phone, String address) {
        this.fullname = fullname;
        this.email = email;
        this.city = city;
        this.phone = phone;
        this.address=address;
    }

}
