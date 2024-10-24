package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
@DiscriminatorValue("Manager")
public class Manager extends User{
    public Manager() {}
    public Manager(String firstName, String lastName, String email, String password, Agency agency) {
        super(firstName,lastName,email,password, Roles.Manager, agency);
    }
}
