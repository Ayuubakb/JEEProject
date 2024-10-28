package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.DTOs.LoginDto;
import com.JEEproject.Backend.DTOs.LoginResponseDto;
import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.User;
import com.JEEproject.Backend.Repositories.UserRepository;
import com.JEEproject.Backend.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> loginUser(@RequestBody LoginDto inputs) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        inputs.getEmail(),
                        inputs.getPassword()
                )
        );
        Optional<User> user = userRepository.findByEmail(inputs.getEmail());
        if(user.isEmpty())
            return new ResponseEntity<>(new LoginResponseDto(),HttpStatus.UNAUTHORIZED);
        String jwtToken = jwtService.generateToken(user.get());
        LoginResponseDto loginResponseDto=new LoginResponseDto(jwtToken,user.get().getRole());
        return new ResponseEntity<>(loginResponseDto,HttpStatus.OK);
    }
}

