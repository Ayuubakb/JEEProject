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
@Table(name="agencies")
@Getter
@Setter
public class Agency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_agency;
    private String address;
    @Enumerated(value = EnumType.STRING)
    private Cities city;
    @OneToMany(mappedBy = "agency")
    private List<User> users= new ArrayList<>();
    public Agency() {}
    public Agency(String Address, Cities City) {
        this.address = Address;
        this.city = City;
    }
}
