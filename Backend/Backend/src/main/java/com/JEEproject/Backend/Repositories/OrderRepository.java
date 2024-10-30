package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Converters.OrderConverter;
import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.TrackingStatus;
import com.JEEproject.Backend.Models.Order;
import com.JEEproject.Backend.DTOs.OrderDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.stream.Collectors;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT o FROM Order o WHERE " +
            "((o.tracking_status = :collectingFromSenderStatus AND o.client.agency.city = :city) " +
            "OR (o.is_aborted = true AND o.tracking_status = 'InCollectingAgency' AND o.client.agency.city = :city) " +
            "OR (o.tracking_status = :deliveringToReceiverStatus AND o.receiver.city = :city)) " +
            "AND NOT EXISTS (SELECT m FROM o.missions m WHERE m.is_done = false)")
    List<Order> findLocalOrders(
            @Param("collectingFromSenderStatus") TrackingStatus collectingFromSenderStatus,
            @Param("deliveringToReceiverStatus") TrackingStatus deliveringToReceiverStatus,
            @Param("city") Cities city
    );

    @Query("SELECT o FROM Order o WHERE " +
            "((o.tracking_status = 'InCollectingAgency' AND o.receiver.city = :cityto AND o.client.agency.city = :cityfrom) " +
            "OR (o.is_aborted = true AND o.tracking_status = 'InReceivingAgency' AND o.receiver.city = :cityfrom AND o.client.agency.city = :cityto)) " +
            "AND NOT EXISTS (SELECT m FROM o.missions m WHERE m.is_done = false)")
    List<Order> findForeignOrders(
            @Param("cityfrom") Cities cityfrom,
            @Param("cityto") Cities cityto
    );

    @Query("SELECT o FROM Order o")
    List<Order> findAllOrders(); // Change return type to List<Order>

    default List<OrderDto> findAllOrdersProjections() {
        List<Order> orders = findAllOrders();
        return orders.stream()
                .map(OrderConverter::toProjection)
                .collect(Collectors.toList());
    }
}
