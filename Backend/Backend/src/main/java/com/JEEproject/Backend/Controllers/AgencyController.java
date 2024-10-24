package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Enums.Cities;
import com.JEEproject.Backend.Models.Agency;
import com.JEEproject.Backend.Projections.AgencyProjection;
import com.JEEproject.Backend.Repositories.AgencyRepository;
import com.JEEproject.Backend.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agency")
public class AgencyController {
    @Autowired
    AgencyRepository agencyRepo;
    @Autowired
    Utils utils;

    ResponseEntity<String> stringInternalError= new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<List<AgencyProjection>> listInternalError= new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<AgencyProjection> agencyInternalError= new ResponseEntity<>(new AgencyProjection(), HttpStatus.INTERNAL_SERVER_ERROR);

    @PostMapping("/save")
    public ResponseEntity<String> addAgency(@RequestBody Agency agency){
        Optional<Agency> agencyExists;
        try {
            agencyExists = agencyRepo.findAgencyByCity(agency.getCity());
        }catch (Exception e){
            return stringInternalError;
        }
        if(agencyExists.isPresent())
            return new ResponseEntity<>("Agency already exist in "+ agency.getCity(), HttpStatus.NOT_ACCEPTABLE);
        try {
            agencyRepo.save(agency);
        } catch (Exception e) {
            return stringInternalError;
        }
        return new ResponseEntity<>("Agency Added",HttpStatus.CREATED);
    }
    @GetMapping("/get")
    public ResponseEntity<List<AgencyProjection>> getAllAgencies(){
        List<Agency> agencies;
        try {
            agencies=agencyRepo.findAll();
        }catch(Exception e){
            return listInternalError;
        }
        return new ResponseEntity<>(utils.generateAgencyProjection(agencies),HttpStatus.OK);
    }
    @GetMapping("/get/city/{city}")
    public ResponseEntity<AgencyProjection> getAgencyByCity(@PathVariable Cities city){
        Optional<Agency> agency;
        try {
            agency=agencyRepo.findAgencyByCity(city);
        }catch (Exception e){
            return agencyInternalError;
        }
        if(agency.isPresent()) {
            List<Agency> agencies=new ArrayList<>();
            agencies.add(agency.get());
            AgencyProjection result=utils.generateAgencyProjection(agencies).getFirst();
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else
            return new ResponseEntity<>(new AgencyProjection(),HttpStatus.NOT_FOUND);
    }
    @GetMapping("/get/sort/{sort}")
    public ResponseEntity<List<AgencyProjection>> getSortedAgencies(@PathVariable String sort){
        List<Agency> agencies;
        if(sort.equalsIgnoreCase("asc"))
            try {
                agencies = agencyRepo.sortAgenciesAsc();
            }catch (Exception e){
                return listInternalError;
            }
        else if (sort.equalsIgnoreCase("desc"))
            try {
                agencies=agencyRepo.sortAgenciesDesc();
            }catch (Exception e){
                return listInternalError;
            }
        else
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(utils.generateAgencyProjection(agencies),HttpStatus.OK);
    }
    @GetMapping("/get/id/{id}")
    public ResponseEntity<AgencyProjection> getAgencyById(@PathVariable int id){
        Optional<Agency> agency;
        try{
            agency=agencyRepo.findById(id);
        }catch (Exception e){
            return agencyInternalError;
        }
        if(agency.isEmpty())
            return  new ResponseEntity<>(new AgencyProjection(),HttpStatus.NOT_FOUND);
        List<Agency> tmp=new ArrayList<>();
        tmp.add(agency.get());
        return new ResponseEntity<>(utils.generateAgencyProjection(tmp).getFirst(),HttpStatus.OK);
    }
}
