package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.Agency;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UserProjection {
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

    public UserProjection(){}
    public UserProjection(int id_user, String first_name, String last_name, String email, Roles role, Date add_date, int id_agency, Cities city){
        this.id_user=id_user;
        this.first_name=first_name;
        this.last_name=last_name;
        this.email=email;
        this.role=role;
        this.add_date=add_date;
        this.id_agency=id_agency;
        this.city=city;
    }
}
