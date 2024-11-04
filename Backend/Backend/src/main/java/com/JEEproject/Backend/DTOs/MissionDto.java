package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MissionDto {
    private int id_mission;
    private Boolean is_done;
    private MissionType mission_type;
    private Date start_date;
    private Date end_date;
    private Cities from_city;
    private Cities to_city;
    private List<OrderDto> orders; // Liste de OrderDto pour inclure les informations des ordres

    public MissionDto(int idMission, Boolean isDone, MissionType missionType, Date startDate, Date endDate, Cities fromCity, Cities toCity) {
        this.id_mission = idMission;
        this.is_done = isDone;
        this.mission_type = missionType;
        this.start_date = startDate;
        this.end_date = endDate;
        this.from_city = fromCity;
        this.to_city = toCity;
    }


}
