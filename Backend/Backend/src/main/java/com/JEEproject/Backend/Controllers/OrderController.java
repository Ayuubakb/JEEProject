package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.DTOs.OrderFilters;
import com.JEEproject.Backend.DTOs.OrderDto;
import com.JEEproject.Backend.Repositories.OrderRepository;
import com.JEEproject.Backend.Templates.FiltersTemplates;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderRepository orderRepo;
    @Autowired
    FiltersTemplates filtersTemplates;

    @PostMapping("/save")
    public ResponseEntity<Integer> addOrder(@RequestBody Order order){
        int order_id;
        Order orderToSave=new Order(
                order.getOrderType(),
                order.getPrice(),
                order.getPriority(),
                order.getUser(),
                order.getWeight(),
                order.getReceiver()
        );
        try {
            Order newOrder=orderRepo.save(orderToSave);
            order_id=newOrder.getIdOrder();
        }catch (Exception e){
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(order_id,HttpStatus.CREATED);
    }

    @PostMapping("/get")
    public ResponseEntity<List<OrderDto>> getOrders(@RequestBody OrderFilters orderFilters){
        List<OrderDto> orders;
        try {
            orders= filtersTemplates.getOrders(orderFilters);
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(orders,HttpStatus.OK);
    }
}
