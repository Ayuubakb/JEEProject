package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.DTOs.UserDto;
import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.User;
import com.JEEproject.Backend.Repositories.ClientRepository;
import com.JEEproject.Backend.Repositories.DriverRepository;
import com.JEEproject.Backend.Repositories.ManagerRepository;
import com.JEEproject.Backend.Repositories.UserRepository;
import com.JEEproject.Backend.services.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserRepository userRepo;
    @Autowired
    ClientRepository clientRepo;
    @Autowired
    DriverRepository driverRepo;
    @Autowired
    ManagerRepository managerRepo;
    @Autowired
    Utils utils;

    @GetMapping("/get")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<User> users = new ArrayList<>();
        try {
            users = userRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(utils.generateUserProjection(users), HttpStatus.OK);
    }

    @GetMapping("/get/role/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable Roles role) {
        List<User> users;
        try {
            users = userRepo.findByRole(role);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(utils.generateUserProjection(users), HttpStatus.OK);
    }

    @PutMapping("/is_active/{id}/{status}")
    public ResponseEntity<String> changeIsActiveStatus(@PathVariable int id, @PathVariable boolean status) {
        Optional<User> user;
        try {
            user = userRepo.findById(id);
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (user.isEmpty())
            return new ResponseEntity<>("User Not Found", HttpStatus.NOT_FOUND);
        User updatedUser = user.get();
        updatedUser.setIs_active(status);
        try {
            userRepo.save(updatedUser);
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String message;
        if (status)
            message = "User Reactivated";
        else
            message = "User Removed";
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
