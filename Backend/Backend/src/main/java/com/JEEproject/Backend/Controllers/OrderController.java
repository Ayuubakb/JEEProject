package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Enums.TrackingStatus;
import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.Projections.OrderFilters;
import com.JEEproject.Backend.Projections.OrderProjection;
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
    public ResponseEntity<Integer> addOrder(@RequestBody Order order) {
        int order_id;
        Order orderToSave = new Order(
                order.getOrderType(),
                order.getPrice(),
                order.getPriority(),
                order.getClient(),  // Changed to getClient()
                order.getWeight(),
                order.getReceiver()
        );
        try {
            Order newOrder = orderRepo.save(orderToSave);
            order_id = newOrder.getIdOrder();
        } catch (Exception e) {
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(order_id, HttpStatus.CREATED);
    }

    @PostMapping("/get")
    public ResponseEntity<List<OrderProjection>> getOrders(@RequestBody OrderFilters orderFilters) {
        List<OrderProjection> orders;
        try {
            orders = filtersTemplates.getOrders(orderFilters);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/updateStatus/{id}/{newStatus}")
    public ResponseEntity<String> updateTrackingStatus(@PathVariable int id, @PathVariable TrackingStatus newStatus) {
        try {
            Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setTracking_status(newStatus);
            orderRepo.save(order);
            return new ResponseEntity<>("Tracking status updated successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
