package com.JEEproject.Backend.Models;

import com.JEEproject.Backend.Converters.CitiesConverter;
import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.MissionType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Entity
@Table(name = "missions")
public class Mission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id_mission;
    public Boolean is_done;
    @Enumerated(value = EnumType.STRING)
    public MissionType mission_type;
    public Date start_date;
    public Date end_date;

    @Convert(converter = CitiesConverter.class)
    public Cities from_city;

    @Convert(converter = CitiesConverter.class)
    public Cities to_city;

    @ManyToOne
    @JoinColumn(name = "id_driver")
    @JsonBackReference // Évite la boucle en ne sérialisant pas cette référence
    public Driver driver;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "mission_details",
            joinColumns = {@JoinColumn(name = "id_mission")},
            inverseJoinColumns = {@JoinColumn(name = "id_order")}
    )
    @JsonManagedReference // Gère la sérialisation de la liste des ordres

    public List<Order> Orders = new ArrayList<>();

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
}
