package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Converters.OrderConverter;
import com.JEEproject.Backend.DTOs.OrderDto;
import com.JEEproject.Backend.DTOs.OrderFilters;
import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.TrackingStatus;
import com.JEEproject.Backend.Models.Client;
import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.Models.Receiver;
import com.JEEproject.Backend.Repositories.ClientRepository;
import com.JEEproject.Backend.Repositories.OrderRepository;
import com.JEEproject.Backend.Repositories.ReceiverRepository;
import com.JEEproject.Backend.Templates.FiltersTemplates;
import com.JEEproject.Backend.services.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderRepository orderRepo;
    @Autowired
    FiltersTemplates filtersTemplates;
    @Autowired
    private ReceiverRepository receiverRepo; // Add your Receiver repository here

    @Autowired
    private ClientRepository clientRepo; // Add your Client repository here
    @Autowired
    private Utils utils;


    private float calculatePrice(float weight, Receiver receiver, Client client) {
        // Fetch the complete Receiver and Client from the repository

        // Fetch the agency and its city
        Cities clientCity = client.getAgency().getCity();
        Cities receiverCity = receiver.getCity();

        float pricePerKg;

        // Determine price per kg based on the cities
        if (receiverCity.equals(clientCity)) {
            pricePerKg = 15.0f; // Same city
        } else {
            pricePerKg = 50.0f; // Different cities
        }

        return weight * pricePerKg; // Calculate total price
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> addOrder(@RequestBody Order order) {
        int order_id;
        int receiverId = order.getReceiver().getId_receiver();
        int clientId = order.getClient().getId_user();
        Receiver receiver = receiverRepo.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found with ID: " + receiverId));

        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found with ID: " + clientId));


        try {
            // Calculate the price based on weight and cities using IDs
            float calculatedPrice = calculatePrice(
                    order.getWeight(),
                    receiver,
                    client
            );

            // Create the order to save
            Order orderToSave = new Order(
                    order.getOrderType(),
                    calculatedPrice, // Set the calculated price here
                    order.getPriority(),
                    order.getClient(),  // Changed to getClient()
                    order.getWeight(),
                    order.getReceiver()
            );

            // Save the order
            Order newOrder = orderRepo.save(orderToSave);
            order_id = newOrder.getIdOrder();
        } catch (Exception e) {
            return new ResponseEntity<>(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(order_id, HttpStatus.CREATED);
    }

    @PostMapping("/get")
    public ResponseEntity<List<OrderDto>> getOrders(@RequestBody OrderFilters orderFilters) {
        List<OrderDto> orders;
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

    @PutMapping("/updateIsAborted/{id}/{isAborted}")
    public ResponseEntity<String> updateIsAborted(@PathVariable int id, @PathVariable boolean isAborted) {
        try {
            Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setIs_aborted(isAborted);  // Ensure this method exists in the Order class
            orderRepo.save(order);
            return new ResponseEntity<>("is_aborted status updated successfully.", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        return new ResponseEntity<>(utils.generateOrderProjection(orders), HttpStatus.OK);
    }

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<OrderDto>> getOrdersByClientId(@PathVariable int clientId) {
        List<OrderDto> orders;
        try {
            // Récupérer les commandes pour le client avec l'ID spécifié
            orders = orderRepo.findByClientId(clientId)
                    .stream()
                    .map(order -> {
                        OrderDto dto = OrderConverter.toProjection(order);
                        // Vérifier si le destinataire est null avant d'accéder aux champs
                        if (order.getReceiver() != null) {
                            dto.setId_receiver(order.getReceiver().getId_receiver());
                            dto.setReceiver(order.getReceiver().getFullname());
                            dto.setReceiverAddress(order.getReceiver().getAddress());
                            dto.setTo(order.getReceiver().getCity());
                        } else {
                            dto.setId_receiver(0); // ou une valeur par défaut appropriée
                            dto.setReceiver("Aucun destinataire assigné");
                            dto.setReceiverAddress("N/A");
                            dto.setTo(null); // ou gérer selon vos besoins
                        }
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.println("Erreur lors de la récupération des commandes pour l'ID client " + clientId + ": " + e.getMessage());
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable int orderId) {
        try {
            Order order = orderRepo.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));

            // Vérifie si le statut de la commande est ProcessingOrder
            if (order.getTracking_status() == TrackingStatus.ProcessingOrder) {
                orderRepo.delete(order);
                return new ResponseEntity<>("Order deleted successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Only orders with status 'ProcessingOrder' can be deleted.", HttpStatus.FORBIDDEN);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
