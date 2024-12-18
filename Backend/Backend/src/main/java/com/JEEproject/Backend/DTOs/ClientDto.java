package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.Roles;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ClientDto extends UserDto {
    private String company;
    private String address;
    private float balance;
    private int numOrders;

    public ClientDto(){}
    public ClientDto(
            int id_user,
            String first_name,
            String last_name,
            String email,
            Roles role,
            Date add_date,
            int id_agency,
            Cities city,
            String company,
            String address,
            float balance,
            int numOrders,
            Boolean is_active
    ){
        super(id_user,first_name,last_name,email,role,add_date,id_agency,city,is_active);
        this.company=company;
        this.address=address;
        this.balance=balance;
        this.numOrders=numOrders;
    }
}
