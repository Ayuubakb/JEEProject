package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Enums.OrderType;
import com.JEEproject.Backend.Enums.TrackingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idOrder;
    private Date date;

    @Enumerated(value = EnumType.STRING)
    private TrackingStatus tracking_status;

    @Enumerated(value = EnumType.STRING)
    private OrderType orderType;

    private float price;
    private int priority;
    private int weight;

    @ManyToOne
    @JoinColumn(name = "id_client")  // Ensure this column refers to Client's ID
    private Client client;  // Changed to Client instead of User

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "mission_details",
            joinColumns = {@JoinColumn(name = "id_order")},
            inverseJoinColumns = {@JoinColumn(name = "id_mission")}
    )
    public List<Mission> missions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "id_receiver")
    private Receiver receiver;

    public Order() {}

    public Order(OrderType orderType, float price, int priority, Client client, int weight, Receiver receiver) {
        this.date = new Date();
        this.tracking_status = TrackingStatus.CollectingFromSender;
        this.orderType = orderType;
        this.price = price;
        this.priority = priority;
        this.client = client;  // Changed to client
        this.weight = weight;
        this.receiver = receiver;
    }
}
