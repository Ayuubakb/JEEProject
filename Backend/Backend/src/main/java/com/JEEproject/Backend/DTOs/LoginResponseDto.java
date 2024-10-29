package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private String token;
    @Enumerated(EnumType.STRING)
    private Roles role;
    private UserDto user;

    public LoginResponseDto() {}
    public LoginResponseDto(String token, Roles role,UserDto user) {
        this.token = token;
        this.role = role;
        this.user = user;
    }
}
