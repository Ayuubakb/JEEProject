package com.JEEproject.Backend.Controllers;


import com.JEEproject.Backend.Models.Agency;
import com.JEEproject.Backend.Models.Manager;
import com.JEEproject.Backend.Models.User;
import com.JEEproject.Backend.Projections.ManagerFilters;
import com.JEEproject.Backend.Projections.UserProjection;
import com.JEEproject.Backend.Repositories.AgencyRepository;
import com.JEEproject.Backend.Repositories.ManagerRepository;
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
@RequestMapping("/manager")
public class ManagerController {
    @Autowired
    ManagerRepository managerRepo;
    @Autowired
    FiltersTemplates managerTmpl;
    @Autowired
    AgencyRepository agencyRepository;
    @Autowired
    Utils utils;

    ResponseEntity<String> stringInternalError= new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<List<UserProjection>> listInternalError= new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<UserProjection> managerInternalError= new ResponseEntity<>(new UserProjection(), HttpStatus.INTERNAL_SERVER_ERROR);

    @PostMapping("/save")
    public ResponseEntity<String> addManager(@RequestBody Manager manager){
        Boolean mailExists= utils.mailExists(manager.getEmail());
        Optional<Agency> agency;
        if(!mailExists) {
            try {
                agency=agencyRepository.findAgencyByCity(manager.getAgency().getCity());
            }catch (Exception e){
                return stringInternalError;
            }
            if(agency.isEmpty())
                return new ResponseEntity<>("Agency Not Found",HttpStatus.NOT_FOUND);
            Manager managerInstance=new Manager(manager.getFirst_name(), manager.getLast_name(), manager.getEmail(), manager.getPassword(), agency.get());
            try {
                managerRepo.save(managerInstance);
            } catch (Exception e) {
                return stringInternalError;
            }
            return new ResponseEntity<>("Manager Saved", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/get")
    public ResponseEntity<List<UserProjection>> getManagers(@RequestBody ManagerFilters filters){
        List<UserProjection> managers;
        try{
            managers=managerTmpl.getManagers(filters);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return listInternalError;
        }
        return new ResponseEntity<>(managers,HttpStatus.OK);
    }
    @GetMapping("/get/id/{id}")
    public ResponseEntity<UserProjection> getManagerById(@PathVariable int id){
        Optional<User> manager;
        try{
           manager=managerRepo.findById(id);
        } catch (Exception e) {
            return managerInternalError;
        }
        if(manager.isEmpty())
            return new ResponseEntity<>(new UserProjection(),HttpStatus.NOT_FOUND);
        List<User> tmp=new ArrayList<>();
        tmp.add(manager.get());
        return new ResponseEntity<>(utils.generateUserProjection(tmp).getFirst(),HttpStatus.OK);
    }

    // add update manager
}

