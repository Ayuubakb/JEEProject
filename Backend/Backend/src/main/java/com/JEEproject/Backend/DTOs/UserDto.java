package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserDto {
    private int id_user;
    private String first_name;
    private String last_name;
    private String email;
    @Enumerated(EnumType.STRING)
    private Roles role;
    private Date add_date;
    private int id_agency;
    @Enumerated(EnumType.STRING)
    private Cities city;
    private Boolean is_active;

    public UserDto(){}
    public UserDto(int id_user, String first_name, String last_name, String email, Roles role, Date add_date, int id_agency, Cities city,Boolean is_active) {
        this.id_user=id_user;
        this.first_name=first_name;
        this.last_name=last_name;
        this.email=email;
        this.role=role;
        this.add_date=add_date;
        this.id_agency=id_agency;
        this.city=city;
        this.is_active=is_active;
    }
}
