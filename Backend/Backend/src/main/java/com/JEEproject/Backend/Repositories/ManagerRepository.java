package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Manager;
import com.JEEproject.Backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager,Integer> {
    Optional<User> findById(int id);
}
