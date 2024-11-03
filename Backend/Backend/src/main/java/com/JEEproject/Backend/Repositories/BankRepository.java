package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Bank;
import com.JEEproject.Backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<Bank, Integer> {
    Optional<Bank> findByUserAndCardnum(User user, long cardnum);
    // Additional query methods can be added here
}
