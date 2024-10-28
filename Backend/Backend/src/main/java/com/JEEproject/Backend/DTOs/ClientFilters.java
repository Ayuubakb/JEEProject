package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientFilters extends GeneralFilters{
    private String sortByOrders;
    private String company;

    public ClientFilters(){};
    public ClientFilters(String sortByDate, Cities city, String sortByOrders, String company){
        super(sortByDate,city);
        this.sortByOrders=sortByOrders;
        this.company=company;
    }
}
