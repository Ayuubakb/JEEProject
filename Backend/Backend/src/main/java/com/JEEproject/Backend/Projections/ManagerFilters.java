package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
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
