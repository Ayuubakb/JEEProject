package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DriverRepository extends JpaRepository<Driver,Integer> {
    Optional<Driver> findById(int id);
}
