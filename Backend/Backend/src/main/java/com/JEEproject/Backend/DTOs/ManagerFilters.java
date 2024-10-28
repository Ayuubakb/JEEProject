package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManagerFilters extends GeneralFilters {
    private String name;

    public ManagerFilters(){};
    public ManagerFilters(String sortByDate, Cities city,String name){
        super(sortByDate,city);
        this.name=name;
    }
}
