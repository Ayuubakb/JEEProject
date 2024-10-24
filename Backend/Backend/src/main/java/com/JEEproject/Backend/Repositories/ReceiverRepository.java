package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReceiverRepository extends JpaRepository<Receiver,Integer> {
    Optional<Receiver> findById(int id);
    Optional<Receiver> findByEmail(String email);
}
