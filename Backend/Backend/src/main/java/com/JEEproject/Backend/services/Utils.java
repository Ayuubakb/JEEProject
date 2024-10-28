package com.JEEproject.Backend;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.*;
import com.JEEproject.Backend.Projections.AgencyProjection;
import com.JEEproject.Backend.Projections.ClientProjection;
import com.JEEproject.Backend.Projections.DriverProjection;
import com.JEEproject.Backend.Projections.UserProjection;
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
    public List<UserProjection> generateUserProjection(List<User> users){
        List<UserProjection> userProjection=new ArrayList<>();
        users.forEach(u ->{
            UserProjection up=new UserProjection(
                    u.getId_user(),
                    u.getFirst_name(),
                    u.getLast_name(),
                    u.getEmail(),
                    u.getRole(),
                    u.getAdd_date(),
                    u.getAgency().getId_agency(),
                    u.getAgency().getCity()
            );
            userProjection.add(up);
        });
        return userProjection;
    }

    public List<ClientProjection> generateClientProjection(List<Client> clients){
        List<ClientProjection> clientProjections=new ArrayList<>();
        clients.forEach(c ->{
            ClientProjection client=new ClientProjection(
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
            clientProjections.add(client);
        });
        return clientProjections;
    }

    public List<DriverProjection> generateDriverProjection(List<Driver> drivers){
        List<DriverProjection> driverProjections=new ArrayList<>();
        drivers.forEach(d ->{
            DriverProjection driver=new DriverProjection(
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
            driverProjections.add(driver);
        });
        return driverProjections;
    }

    public List<AgencyProjection> generateAgencyProjection(List<Agency> agencies){
        List<AgencyProjection> agencyProjections=new ArrayList<>();
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
            AgencyProjection ap=new AgencyProjection(
                a.getId_agency(),
                a.getAddress(),
                a.getCity(),
                numManagers,
                numDrivers,
                numClients
            );
            agencyProjections.add(ap);
        });
        return agencyProjections;
    }
}
