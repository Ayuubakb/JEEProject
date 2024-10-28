package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverFilters extends GeneralFilters{
    private String is_available;
    private String sortByMissions;
    @Enumerated(EnumType.STRING)
    private MissionType driver_type;
    private String name;

    public DriverFilters(){}
    public DriverFilters(String sortByDate,Cities city,String is_available, String sortByMissions, MissionType driver_type,String name){
        super(sortByDate,city);
        this.driver_type=driver_type;
        this.sortByMissions=sortByMissions;
        this.is_available=is_available;
        this.name=name;
    }
}
