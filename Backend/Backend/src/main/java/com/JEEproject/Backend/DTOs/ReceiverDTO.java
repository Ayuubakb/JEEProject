package com.JEEproject.Backend.DTOs;

import com.JEEproject.Backend.Enums.Cities;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReceiverDTO {
    private int id_receiver;
    private String fullname;
    private String email;
    @Enumerated(EnumType.STRING)
    private Cities city;
    private String phone;
    private String address;

    public ReceiverDTO() {
    }

    public ReceiverDTO(int idReceiver, String fullname, String email, Cities city, String phone, String address) {
        this.id_receiver = idReceiver;
        this.fullname = fullname;
        this.email = email;
        this.city = city;
        this.phone = phone;
        this.address = address;
    }
}
