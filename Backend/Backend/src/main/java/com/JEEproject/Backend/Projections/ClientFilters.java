package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
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
