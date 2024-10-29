package com.JEEproject.Backend.Converters;

import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.Projections.OrderProjection;

public class OrderConverter {

    public static OrderProjection toProjection(Order order) {
        if (order == null) {
            return null; // Handle null order case
        }

        return new OrderProjection(
                order.getIdOrder(),
                order.getDate(),
                order.getTracking_status(),
                order.getOrderType(),
                order.getPrice(),
                order.getPriority(),
                order.getWeight(),
                order.getClient().getId_user(), // Assuming getClient() returns the client entity
                order.getReceiver().getId_receiver(), // Assuming getReceiver() returns the receiver entity
                order.getIs_aborted(),
                order.getClient().getCompany(), // Assuming getClient() has a getCompany() method
                order.getReceiver().getFullname(), // Assuming getReceiver() has a getName() method
                order.getClient().getAgency().getCity(), // Assuming getAgency() returns the agency entity
                order.getReceiver().getCity(), // Assuming getReceiver() has a getCity() method
                order.getClient().getAddress(), // Assuming getClient() has a getAddress() method
                order.getReceiver().getAddress() // Assuming getReceiver() has a getAddress() method
        );
    }
}
