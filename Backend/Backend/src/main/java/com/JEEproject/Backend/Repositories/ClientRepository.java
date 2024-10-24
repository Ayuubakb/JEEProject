package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client,Integer> {
    Optional<Client> findById(int id);
}
