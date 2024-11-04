package com.JEEproject.Backend.services;

import com.JEEproject.Backend.DTOs.*;
import com.JEEproject.Backend.Enums.Roles;
import com.JEEproject.Backend.Models.*;
import com.JEEproject.Backend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class Utils {
    @Autowired
    UserRepository userRepo;

    public Boolean mailExists(String email) {
        Optional<User> user = userRepo.findByEmail(email);
        return user.isPresent();
    }

    public Boolean mailExists(String email, int id) {
        int c = userRepo.checkEmailForUpdate(email, id);
        return c > 0;
    }

    public List<UserDto> generateUserProjection(List<User> users) {
        List<UserDto> userDto = new ArrayList<>();
        users.forEach(u -> {
            UserDto up = new UserDto(
                    u.getId_user(),
                    u.getFirst_name(),
                    u.getLast_name(),
                    u.getEmail(),
                    u.getRole(),
                    u.getAdd_date(),
                    u.getAgency().getId_agency(),
                    u.getAgency().getCity(),
                    u.getIs_active()
            );
            userDto.add(up);
        });
        return userDto;
    }

    public List<ClientDto> generateClientProjection(List<Client> clients) {
        List<ClientDto> clientDtos = new ArrayList<>();
        clients.forEach(c -> {
            ClientDto client = new ClientDto(
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
                    c.getOrders().size(),
                    c.getIs_active()
            );
            clientDtos.add(client);
        });
        return clientDtos;
    }

    public List<DriverDto> generateDriverProjection(List<Driver> drivers) {
        List<DriverDto> driverDtos = new ArrayList<>();
        drivers.forEach(d -> {
            DriverDto driver = new DriverDto(
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
                    d.getMissions().size(),
                    d.getIs_active()
            );
            driverDtos.add(driver);
        });
        return driverDtos;
    }

//    public List<AgencyDto> generateAgencyProjection(List<Agency> agencies){
//        List<AgencyDto> agencyDtos =new ArrayList<>();
//        agencies.forEach(a ->{
//            List<User> users=a.getUsers();
//            int numManagers = 0;
//            int numClients= 0;
//            int numDrivers = 0;
//            for(int i=0;i<users.size();i++){
//                switch (users.get(i).getRole()){
//                    case Roles.Driver :
//                        numDrivers++;
//                        break;
//                    case Roles.Manager:
//                        numManagers++;
//                    case Roles.Client:
//                        numClients++;
//                }
//            };
//            AgencyDto ap=new AgencyDto(
//                a.getId_agency(),
//                a.getAddress(),
//                a.getCity(),
//                numManagers,
//                numDrivers,
//                numClients
//            );
//            agencyDtos.add(ap);
//        });
//        return agencyDtos;
//    }

    public List<AgencyDto> generateAgencyProjection(List<Agency> agencies) {
        List<AgencyDto> agencyDtos = new ArrayList<>();
        agencies.forEach(a -> {
            List<User> users = a.getUsers();
            int numManagers = 0;
            int numClients = 0;
            int numDrivers = 0;

            for (User user : users) {
                Roles role = user.getRole();
                if (role == null) continue; // Ignore les utilisateurs sans rôle

                switch (role) {
                    case Driver:
                        numDrivers++;
                        break;
                    case Manager:
                        numManagers++;
                        break;
                    case Client:
                        numClients++;
                        break;
                    default:
                        break;
                }
            }

            AgencyDto ap = new AgencyDto(
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

    public List<OrderDto> generateOrderProjection(List<Order> orders) {
        List<OrderDto> orderDtos = new ArrayList<>();
        orders.forEach(order -> {
            OrderDto tmp = new OrderDto(
                    order.getIdOrder(),
                    order.getDate(),
                    order.getTracking_status(),
                    order.getOrderType(),
                    order.getPrice(),
                    order.getPriority(),
                    order.getWeight(),
                    order.getClient().getId_user(), // Assuming getClient() returns the client entity
                    order.getReceiver().getId_receiver(), // Assuming getReceiver() returns the receiver entity
                    order.getIs_aborted(),
                    order.getClient().getCompany(), // Assuming getClient() has a getCompany() method
                    order.getReceiver().getFullname(), // Assuming getReceiver() has a getName() method
                    order.getClient().getAgency().getCity(), // Assuming getAgency() returns the agency entity
                    order.getReceiver().getCity(), // Assuming getReceiver() has a getCity() method
                    order.getClient().getAddress(), // Assuming getClient() has a getAddress() method
                    order.getReceiver().getAddress() // Assuming getReceiver() has a getAddress() method
            );
            orderDtos.add(tmp);
        });
        return orderDtos;
    }

    public List<BankDto> generateBankProjection(List<Bank> banks) {
        List<BankDto> bankDtos = new ArrayList<>();
        banks.forEach(bank -> {
            BankDto tmp = new BankDto(
                    bank.getId_bank(),
                    bank.getUser().getId_user(), // Assuming getUser() returns the user entity
                    bank.getName(),
                    bank.getAddress(),
                    bank.getCardnum(),
                    bank.getCvv(),
                    bank.getExpiry_y(),
                    bank.getExpiry_m(),
                    bank.getBalance()
            );
            bankDtos.add(tmp);
        });
        return bankDtos;
    }

}
