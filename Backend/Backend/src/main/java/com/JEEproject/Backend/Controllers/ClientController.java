package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Models.Agency;
import com.JEEproject.Backend.Models.Client;
import com.JEEproject.Backend.Projections.ClientFilters;
import com.JEEproject.Backend.Projections.ClientProjection;
import com.JEEproject.Backend.Repositories.AgencyRepository;
import com.JEEproject.Backend.Repositories.ClientRepository;
import com.JEEproject.Backend.Templates.FiltersTemplates;
import com.JEEproject.Backend.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    ClientRepository clientRepo;
    @Autowired
    Utils utils;
    @Autowired
    private AgencyRepository agencyRepository;
    @Autowired
    private FiltersTemplates filtersTemplates;

    ResponseEntity<String> stringInternalError= new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<List<ClientProjection>> listInternalError= new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<ClientProjection> clientInternalError= new ResponseEntity<>(new ClientProjection(), HttpStatus.INTERNAL_SERVER_ERROR);


    @PostMapping("/save")
    public ResponseEntity<String> addClient(@RequestBody Client client){
        Boolean mailExists= utils.mailExists(client.getEmail());
        Optional<Agency> agency;
        if(!mailExists) {
            try {
                agency = agencyRepository.findAgencyByCity(client.getAgency().getCity());
            }catch (Exception e){
                return stringInternalError;
            }
            if(agency.isEmpty())
                return new ResponseEntity<>("Agency Not Found",HttpStatus.NOT_FOUND);
            Client clientInstance=new Client(client.getFirst_name(), client.getLast_name(), client.getEmail(), client.getPassword(), client.getCompany(),client.getAddress(),agency.get());
            try {
                clientRepo.save(clientInstance);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return stringInternalError;
            }
            return new ResponseEntity<>("Client Saved", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get/id/{id}")
    public ResponseEntity<ClientProjection> getClientById(@PathVariable int id){
        Optional<Client> client;
        try {
            client=clientRepo.findById(id);
        }catch (Exception e){
            return clientInternalError;
        }
        if(client.isEmpty())
            return new ResponseEntity<>(new ClientProjection(),HttpStatus.NOT_FOUND);
        List<Client> tmp=new ArrayList<>();
        tmp.add(client.get());
        return new ResponseEntity<>(utils.generateClientProjection(tmp).getFirst(),HttpStatus.OK);
    }

    @PostMapping("/get")
    public ResponseEntity<List<ClientProjection>> getClients(@RequestBody ClientFilters filters){
        List<ClientProjection> clients;
        try {
            clients=filtersTemplates.getClients(filters);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return listInternalError;
        }
        return new ResponseEntity<>(clients,HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateClient(@RequestBody Client newClient){
        Optional<Client> client;
        try {
            client=clientRepo.findById(newClient.getId_user());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return stringInternalError;
        }
        if(client.isEmpty())
            return new ResponseEntity<>("Client not found",HttpStatus.NOT_FOUND);
        if(!client.get().getEmail().equals(newClient.getEmail()))
            if(utils.mailExists(newClient.getEmail(),newClient.getId_user()))
                return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
        Optional<Agency> agency;
        try {
            agency = agencyRepository.findAgencyByCity(newClient.getAgency().getCity());
        }catch (Exception e){
            return stringInternalError;
        }
        if(agency.isEmpty())
            return new ResponseEntity<>("Agency Not Found",HttpStatus.NOT_FOUND);
        newClient.setAgency(agency.get());
        try {
            clientRepo.save(newClient);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return stringInternalError;
        }
        return new ResponseEntity<>("Client Updated",HttpStatus.OK);
    }

    @PutMapping("/update/{id}/{balance}")
    public ResponseEntity<String> updateClientBalance(@PathVariable int id,@PathVariable float balance){
        Optional<Client> client;
        try {
            client=clientRepo.findById(id);
        }catch (Exception e){
            return stringInternalError;
        }
        if(client.isEmpty())
            return new ResponseEntity<>("Client not found",HttpStatus.NOT_FOUND);
        Client tmp=client.get();
        tmp.setBalance(balance);
        try {
            clientRepo.save(tmp);
        }catch (Exception e){
            return stringInternalError;
        }
        return new ResponseEntity<>("Balance updated",HttpStatus.OK);
    }
}
