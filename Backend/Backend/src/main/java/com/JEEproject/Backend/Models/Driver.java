package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.MissionType;
import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name="users")
@DiscriminatorValue("Driver")
public class Driver extends User{
    @Enumerated(value = EnumType.STRING)
    public MissionType driver_type;
    public Boolean is_available;
    @OneToMany(mappedBy = "driver")
    private List<Mission> missions=new ArrayList<>();

    public Driver() {}
    public Driver(String firstName, String lastName, String email,String password, MissionType type,Agency agency) {
        super(firstName,lastName,email,password, Roles.Driver,agency);
        this.driver_type = type;
        this.is_available = true;
    }
}
