package com.JEEproject.Backend.DTOs;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BankDto {

    private Integer id_bank;
    private Integer id_user;
    private String name;
    private String address;
    private long cardnum;
    private Integer cvv;
    private Integer expiry_y;
    private Integer expiry_m;
    private Float balance;
}