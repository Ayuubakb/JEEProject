package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_user;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private Boolean is_active;
    @Enumerated(EnumType.STRING)
    private Roles role;
    private Date add_date;
    @ManyToOne
    @JoinColumn(name = "id_agency")
    private Agency agency;

    public User(){}
    public User(String FirstName, String LastName, String Email, String Password, Roles Role,Agency agency) {
        this.first_name = FirstName;
        this.last_name = LastName;
        this.email = Email;
        this.password = Password;
        this.is_active = true;
        this.role = Role;
        this.add_date=new Date();
        this.agency=agency;
    }
    public User(int id_user, String FirstName,String LastName, String Email, Roles Role, Date add_date,int id_agency, Cities city) {
        this.first_name = FirstName;
        this.id_user=id_user;
        this.last_name = LastName;
        this.email = Email;
        this.role = Role;
        this.add_date=add_date;
        this.agency.setId_agency(id_agency);
        this.agency.setCity(city);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
