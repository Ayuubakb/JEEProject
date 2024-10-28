package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Transaction;
import com.JEEproject.Backend.Projections.TransactionProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    @Query("SELECT new com.JEEproject.Backend.Projections.TransactionProjection(t.idTransaction, t.amount, t.date, t.client.id_user, t.type) FROM Transaction t WHERE t.client.id_user = ?1")
    List<TransactionProjection> findByClientId(int clientId);

    @Query("SELECT new com.JEEproject.Backend.Projections.TransactionProjection(t.idTransaction, t.amount, t.date, t.client.id_user, t.type) FROM Transaction t")
    List<TransactionProjection> findAllProjections();

    @Override
    Optional<Transaction> findById(Integer id);

    @Query("SELECT new com.JEEproject.Backend.Projections.TransactionProjection(t.idTransaction, t.amount, t.date, t.client.id_user, t.type) FROM Transaction t WHERE t.idTransaction = ?1")
    Optional<TransactionProjection> findProjectionById(Integer id);
}
