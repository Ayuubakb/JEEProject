package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.TrackingStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderFilters {
    @Enumerated(EnumType.STRING)
    private TrackingStatus tracking_status;
    private String company;
    private String sortByPriority;
    private String sortByDate;

    public OrderFilters(){}
    public OrderFilters(TrackingStatus trackingStatus, String company, String sortByPriority, String sortByDate){
        this.tracking_status=trackingStatus;
        this.company=company;
        this.sortByDate=sortByDate;
        this.sortByPriority=sortByPriority;
    }
}
