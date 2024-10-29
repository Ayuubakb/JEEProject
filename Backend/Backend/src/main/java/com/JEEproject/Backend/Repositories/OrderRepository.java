package com.JEEproject.Backend.Repositories;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.TrackingStatus;
import com.JEEproject.Backend.Models.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT o FROM Order o WHERE " +
            "(o.tracking_status = :collectingFromSenderStatus AND o.client.agency.city = :city) " + // Changed from o.user to o.client
            "OR (o.tracking_status = :abortedStatus AND o.client.agency.city = :city) " +          // Changed from o.user to o.client
            "OR (o.tracking_status = :deliveringToReceiverStatus AND o.receiver.city = :city)")
    List<Order> findOrdersForPriorityUpdate(
            @Param("collectingFromSenderStatus") TrackingStatus collectingFromSenderStatus,
            @Param("abortedStatus") TrackingStatus abortedStatus,
            @Param("deliveringToReceiverStatus") TrackingStatus deliveringToReceiverStatus,
            @Param("city") Cities city
    );

    @Query("SELECT o FROM Order o WHERE " +
            "((o.tracking_status = :collectingStatus AND o.client.agency.city = :city) " +
            "OR (o.tracking_status = :deliveringStatus AND o.receiver.city = :city) " +
            "OR (o.tracking_status = :abortedStatus AND o.client.agency.city = :city)) " +
            "AND NOT EXISTS (SELECT m FROM o.missions m WHERE m.is_done = false)")
    List<Order> findOrdersForMissionCreation(
            @Param("city") Cities city,
            @Param("collectingStatus") TrackingStatus collectingStatus,
            @Param("deliveringStatus") TrackingStatus deliveringStatus,
            @Param("abortedStatus") TrackingStatus abortedStatus
    );

}
