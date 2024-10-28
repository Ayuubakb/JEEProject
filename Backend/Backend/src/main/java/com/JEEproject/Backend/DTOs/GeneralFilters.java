package com.JEEproject.Backend.Projections;

import com.JEEproject.Backend.Enums.Cities;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeneralFilters {
    private String sortByDate;
    @Enumerated(EnumType.STRING)
    private Cities city;

    public GeneralFilters(){}
    public GeneralFilters(String sortByDate, Cities city){
        this.sortByDate=sortByDate;
        this.city=city;
    }
}
