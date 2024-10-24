package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Integer> {
}
