package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AgencyDto {
    private int id_agency;
    private String address;
    @Enumerated(value = EnumType.STRING)
    private Cities city;
    private int numManagers;
    private int numClients;
    private int numDrivers;
    public AgencyDto(){}
    public AgencyDto(int id_agency, String address, Cities city, int numClients, int numManagers, int numDrivers){
        this.id_agency=id_agency;
        this.address=address;
        this.city=city;
        this.numClients=numClients;
        this.numManagers=numManagers;
        this.numDrivers=numDrivers;
    }
}
