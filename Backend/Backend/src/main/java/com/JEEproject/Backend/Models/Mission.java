package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Converters.CitiesConverter;
import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "missions")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_mission;
    private Boolean is_done;

    @Enumerated(value = EnumType.STRING)
    private MissionType mission_type;
    private Date start_date;
    private Date end_date;

    @Convert(converter = CitiesConverter.class)
    private Cities from_city;

    @Convert(converter = CitiesConverter.class)
    private Cities to_city;

    @ManyToOne
    @JoinColumn(name = "id_driver")
    private Driver driver;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinTable(
            name = "mission_details",
            joinColumns = {@JoinColumn(name = "id_mission")},
            inverseJoinColumns = {@JoinColumn(name = "id_order")}
    )
    private List<Order> orders = new ArrayList<>();

    public Mission() {
    }

    public Mission(MissionType mission_type, Cities From, Cities To) {
        this.is_done = false;
        this.mission_type = mission_type;
        this.start_date = new Date();
        this.end_date = null;
        this.from_city = From;
        this.to_city = To;
    }
    public Mission(MissionType mission_type, Cities From, Cities To,Driver driver,List<Order> orders) {
        this.is_done = false;
        this.mission_type = mission_type;
        this.start_date = new Date();
        this.end_date = null;
        this.from_city = From;
        this.to_city = To;
        this.driver = driver;
        this.orders=orders;
    }
}