package com.JEEproject.Backend.services;

import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.*;
import com.JEEproject.Backend.DTOs.AgencyDto;
import com.JEEproject.Backend.DTOs.ClientDto;
import com.JEEproject.Backend.DTOs.DriverDto;
import com.JEEproject.Backend.DTOs.UserDto;
import com.JEEproject.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class Utils {
    @Autowired
    UserRepository userRepo;

    public Boolean mailExists(String email){
        Optional<User> user=userRepo.findByEmail(email);
        return user.isPresent();
    }

    public Boolean mailExists(String email, int id){
        int c=userRepo.checkEmailForUpdate(email,id);
        return c>0;
    }
    public List<UserDto> generateUserProjection(List<User> users){
        List<UserDto> userDto =new ArrayList<>();
        users.forEach(u ->{
            UserDto up=new UserDto(
                    u.getId_user(),
                    u.getFirst_name(),
                    u.getLast_name(),
                    u.getEmail(),
                    u.getRole(),
                    u.getAdd_date(),
                    u.getAgency().getId_agency(),
                    u.getAgency().getCity()
            );
            userDto.add(up);
        });
        return userDto;
    }

    public List<ClientDto> generateClientProjection(List<Client> clients){
        List<ClientDto> clientDtos =new ArrayList<>();
        clients.forEach(c ->{
            ClientDto client=new ClientDto(
                    c.getId_user(),
                    c.getFirst_name(),
                    c.getLast_name(),
                    c.getEmail(),
                    c.getRole(),
                    c.getAdd_date(),
                    c.getAgency().getId_agency(),
                    c.getAgency().getCity(),
                    c.getCompany(),
                    c.getAddress(),
                    c.getBalance(),
                    c.getOrders().size()
            );
            clientDtos.add(client);
        });
        return clientDtos;
    }

    public List<DriverDto> generateDriverProjection(List<Driver> drivers){
        List<DriverDto> driverDtos =new ArrayList<>();
        drivers.forEach(d ->{
            DriverDto driver=new DriverDto(
                d.getId_user(),
                d.getFirst_name(),
                d.getLast_name(),
                d.getEmail(),
                d.getRole(),
                d.getAdd_date(),
                d.getAgency().getId_agency(),
                d.getAgency().getCity(),
                d.getDriver_type(),
                d.getIs_available(),
                d.getMissions().size()
            );
            driverDtos.add(driver);
        });
        return driverDtos;
    }

    public List<AgencyDto> generateAgencyProjection(List<Agency> agencies){
        List<AgencyDto> agencyDtos =new ArrayList<>();
        agencies.forEach(a ->{
            List<User> users=a.getUsers();
            int numManagers = 0;
            int numClients= 0;
            int numDrivers = 0;
            for(int i=0;i<users.size();i++){
                switch (users.get(i).getRole()){
                    case Roles.Driver :
                        numDrivers++;
                        break;
                    case Roles.Manager:
                        numManagers++;
                    case Roles.Client:
                        numClients++;
                }
            };
            AgencyDto ap=new AgencyDto(
                a.getId_agency(),
                a.getAddress(),
                a.getCity(),
                numManagers,
                numDrivers,
                numClients
            );
            agencyDtos.add(ap);
        });
        return agencyDtos;
    }
}
