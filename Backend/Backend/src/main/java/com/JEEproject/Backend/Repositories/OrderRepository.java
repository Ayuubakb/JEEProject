package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Integer> {
}
