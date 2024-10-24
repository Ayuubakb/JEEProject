package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    @Query("SELECT u from User u left join u.agency a WHERE u.role=?1 group by u ")
    List<User> findByRole(Roles role);

    List<User> findAll();

    Optional<User> findById(int id);

    Optional<User> findByEmail(String email);

    @Query("SELECT count(u) FROM User u WHERE u.email=?1 AND u.id_user!=?2")
    int checkEmailForUpdate(String email,int id);
}
