package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Models.Agency;
import com.JEEproject.Backend.Models.Driver;
import com.JEEproject.Backend.Projections.DriverFilters;
import com.JEEproject.Backend.Projections.DriverProjection;
import com.JEEproject.Backend.Repositories.AgencyRepository;
import com.JEEproject.Backend.Repositories.DriverRepository;
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
@RequestMapping("/driver")
public class DriverController {
    @Autowired
    DriverRepository driverRepo;
    @Autowired
    AgencyRepository agencyRepository;
    @Autowired
    Utils utils;

    ResponseEntity<String> stringInternalError= new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<List<DriverProjection>> listInternalError= new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    ResponseEntity<DriverProjection> driverInternalError= new ResponseEntity<>(new DriverProjection(), HttpStatus.INTERNAL_SERVER_ERROR);
    @Autowired
    private FiltersTemplates filtersTemplates;

    @PostMapping("/save")
    public ResponseEntity<String> addDriver(@RequestBody Driver driver){
        Boolean mailExists= utils.mailExists(driver.getEmail());
        Optional<Agency> agency;
        if(!mailExists) {
            try {
                agency = agencyRepository.findAgencyByCity(driver.getAgency().getCity());
            }catch (Exception e){
                return new ResponseEntity<>("Something Went Wrong",HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if(agency.isEmpty())
                return new ResponseEntity<>("Agency Not Found",HttpStatus.NOT_FOUND);
            Driver driverInstance=new Driver(driver.getFirst_name(), driver.getLast_name(), driver.getEmail(), driver.getPassword(), driver.getDriver_type(),agency.get());
            try {
                driverRepo.save(driverInstance);
            } catch (Exception e) {
                return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>("Driver Saved", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/get/id/{id}")
    public ResponseEntity<DriverProjection> getDriverById(@PathVariable int id){
        Optional<Driver> driver;
        try{
            driver=driverRepo.findById(id);
        } catch (Exception e) {
            return driverInternalError;
        }
        if(driver.isEmpty())
            return new ResponseEntity<>(new DriverProjection(),HttpStatus.NOT_FOUND);
        List<Driver> tmp=new ArrayList<>();
        tmp.add(driver.get());
        return new ResponseEntity<>(utils.generateDriverProjection(tmp).getFirst(),HttpStatus.OK);
    }

    @PostMapping("/get")
    public ResponseEntity<List<DriverProjection>> getDrivers(@RequestBody DriverFilters filters){
        List<DriverProjection> drivers;
        try{
            drivers=filtersTemplates.getDrivers(filters);
        } catch (Exception e) {
            return listInternalError;
        }
        return new ResponseEntity<>(drivers,HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateDriver(@RequestBody Driver newDriver){
        Optional<Driver> driver;
        try {
            driver=driverRepo.findById(newDriver.getId_user());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return stringInternalError;
        }
        if(driver.isEmpty())
            return new ResponseEntity<>("Driver Not Found",HttpStatus.NOT_FOUND);
        if(!driver.get().getEmail().equals(newDriver.getEmail()))
            if(utils.mailExists(newDriver.getEmail(),newDriver.getId_user()))
                return new ResponseEntity<>("Email Already Used",HttpStatus.BAD_REQUEST);
        Optional<Agency> agency;
        try {
            agency = agencyRepository.findAgencyByCity(newDriver.getAgency().getCity());
        }catch (Exception e){
            return stringInternalError;
        }
        if(agency.isEmpty())
            return new ResponseEntity<>("Agency Not Found",HttpStatus.NOT_FOUND);
        newDriver.setAgency(agency.get());
        try {
            driverRepo.save(newDriver);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return stringInternalError;
        }
        return new ResponseEntity<>("Driver Updated",HttpStatus.OK);
    }

    @PutMapping("/update/available/{id}/{status}")
    public ResponseEntity<String> updateDriverAvailability(@PathVariable int id,@PathVariable boolean status){
        Optional<Driver> driver;
        try{
            driver=driverRepo.findById(id);
        }catch (Exception e){
            return stringInternalError;
        }
        if(driver.isEmpty())
            return new ResponseEntity<>("Driver Not Found",HttpStatus.NOT_FOUND);
        Driver tmp=driver.get();
        tmp.setIs_available(status);
        try {
            driverRepo.save(tmp);
        }catch (Exception e){
            return stringInternalError;
        }
        return new ResponseEntity<>("Availability Updated",HttpStatus.OK);
    }
}
