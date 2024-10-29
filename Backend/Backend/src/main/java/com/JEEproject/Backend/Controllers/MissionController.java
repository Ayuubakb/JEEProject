package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import com.JEEproject.Backend.Enums.OrderType;
import com.JEEproject.Backend.Enums.TrackingStatus;
import com.JEEproject.Backend.Models.Driver;
import com.JEEproject.Backend.Models.Mission;
import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.Repositories.DriverRepository;
import com.JEEproject.Backend.Repositories.OrderRepository;
import com.JEEproject.Backend.Repositories.MissionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/missions")
public class MissionController {
    private final OrderRepository orderRepo;
    private final MissionRepository missionRepo;
    private final DriverRepository driverRepo;

    @Autowired
    public MissionController(OrderRepository orderRepo, MissionRepository missionRepo,DriverRepository driverRepo) {
        this.orderRepo = orderRepo;
        this.missionRepo = missionRepo;
        this.driverRepo = driverRepo;
    }

    // Method to calculate and update the priority of a single order
    public void calculateAndUpdatePriority(Order order) {
        // Determine index based on order type
        int index = (order.getOrderType() == OrderType.Express) ? 3 : 1;
        int status = (order.getTracking_status() == TrackingStatus.CollectingFromSender) ? 2 : 1;

        // Calculate the time difference in days between the current date and the order's creation date
        Instant creationInstant = order.getDate().toInstant();
        Instant currentInstant = new Date().toInstant();
        long daysDifference = (Duration.between(creationInstant, currentInstant).toMinutes());

        // Debugging prints to trace values
        System.out.println("Calculating priority for Order ID: " + order.getIdOrder());
        System.out.println("Order Type: " + order.getOrderType());
        System.out.println("Tracking Status: " + order.getTracking_status());
        System.out.println("Days Difference: " + daysDifference);
        System.out.println("Index: " + index);
        System.out.println("Status: " + status);

        // Calculate priority based on the formula
        int priority = (int) (2 * daysDifference * index * status);

        // Debugging print for calculated priority
        System.out.println("Calculated Priority: " + priority);

        // Update and save the order with the new priority
        order.setPriority(priority);
        orderRepo.save(order);
    }

    // Endpoint to update priorities of orders in a specific city
    @PutMapping("/updatePrioritiesByCity/{city}")
    public ResponseEntity<String> updatePrioritiesByCity(@PathVariable Cities city) {
        try {
            // Fetch all orders matching the tracking status and city conditions
            List<Order> orders = orderRepo.findOrdersForPriorityUpdate(
                    TrackingStatus.CollectingFromSender,
                    TrackingStatus.Aborted,
                    TrackingStatus.DeliveringToReceiver,
                    city
            );

            // Debugging print for the number of orders fetched
            System.out.println("Number of orders fetched for city " + city + ": " + orders.size());

            // Update each order's priority
            for (Order order : orders) {
                calculateAndUpdatePriority(order); // Call the method with the order instance
            }

            return new ResponseEntity<>("Priorities updated successfully for selected orders in " + city, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update priorities: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/createMission/{city}/{driverId}")
    public ResponseEntity<String> createMission(@PathVariable Cities city, @PathVariable int driverId) {
        updatePrioritiesByCity(city);
        try {
            // Fetch orders based on tracking statuses, city, and priority
            List<Order> orders = orderRepo.findOrdersForMissionCreation(
                    city, TrackingStatus.CollectingFromSender, TrackingStatus.DeliveringToReceiver, TrackingStatus.Aborted
            );

            // Sort orders by priority descending
            orders.sort(Comparator.comparingInt(Order::getPriority).reversed());

            List<Order> selectedOrders = new ArrayList<>();
            int totalWeight = 0;

            // Select orders until the total weight limit of 100 kg is reached
            for (Order order : orders) {
                if (totalWeight + order.getWeight() <= 100) {
                    selectedOrders.add(order);
                    totalWeight += order.getWeight();
                } else {
                    break;
                }
            }

            Driver driver = driverRepo.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));
            // Create the new mission
            Mission mission = new Mission(
                    0, // ID will be generated by the database
                    false,
                    MissionType.In_City,
                    new Date(),
                    null,
                    city,
                    selectedOrders.get(0).getReceiver().getCity(),
                    driver, // ensure driver is fetched from the database
                    selectedOrders
            );

            // Save the mission to the database
            missionRepo.save(mission);

            return new ResponseEntity<>("Mission created successfully with " + selectedOrders.size() + " orders.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create mission: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
