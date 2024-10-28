package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import com.JEEproject.Backend.Enums.Roles;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DriverDto extends UserDto {
    @Enumerated(EnumType.STRING)
    private MissionType driver_type ;
    private Boolean is_available;
    private int numMissions;

    public DriverDto(){}
    public DriverDto(
            int id_user,
            String first_name,
            String last_name,
            String email,
            Roles role,
            Date add_date,
            int id_agency,
            Cities city,
            MissionType driver_type,
            Boolean is_available,
            int numMissions
    ){
        super(id_user,first_name,last_name,email,role,add_date,id_agency,city);
        this.driver_type=driver_type;
        this.is_available=is_available;
        this.numMissions=numMissions;
    }
}
