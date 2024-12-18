package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Bank;
import com.JEEproject.Backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankRepository extends JpaRepository<Bank, Integer> {
    Optional<Bank> findByUserAndCardnum(User user, long cardnum);

    @Query("SELECT b FROM Bank b WHERE b.user.id_user = :userId")
    List<Bank> findByUser_Id_user(@Param("userId") int userId);    // Additional query methods can be added here
}
