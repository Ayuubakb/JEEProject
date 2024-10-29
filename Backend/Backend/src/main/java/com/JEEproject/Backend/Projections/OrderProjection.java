package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.OrderType;
import com.JEEproject.Backend.Enums.TrackingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderProjection {
    private int idOrder;
    private Date date;

    @Enumerated(value = EnumType.STRING)
    private TrackingStatus tracking_status;

    @Enumerated(value = EnumType.STRING)
    private OrderType orderType;

    private float price;
    private int priority;
    private int weight;
    private int id_client;
    private int id_receiver;
    private boolean is_aborted;
    private String company;
    private String receiver;

    @Enumerated(value = EnumType.STRING)
    private Cities from;

    @Enumerated(value = EnumType.STRING)
    private Cities to;

    // New fields for addresses
    private String clientAddress;
    private String receiverAddress;
}
