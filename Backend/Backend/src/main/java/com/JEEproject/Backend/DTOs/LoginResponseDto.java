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

    public LoginResponseDto() {}
    public LoginResponseDto(String token, Roles role) {
        this.token = token;
        this.role = role;
    }
}
