package com.JEEproject.Backend.Controllers;

import com.JEEproject.Backend.Models.Receiver;
import com.JEEproject.Backend.Repositories.ReceiverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/receiver")
public class ReceiverController {
    @Autowired
    ReceiverRepository receiverRepo;

    @PostMapping("/save")
    public ResponseEntity<Integer> addReceiver(@RequestBody Receiver receiver){
        int receiver_id=0;
        try {
            Receiver newReceiver=receiverRepo.save(receiver);
            receiver_id=newReceiver.getId_receiver();
        }catch (Exception e){
            return new ResponseEntity<>(receiver_id, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(receiver_id,HttpStatus.CREATED);
    }

    @GetMapping("/get/id/{id}")
    public ResponseEntity<Receiver> getReceiverId(@PathVariable int id){
        Optional<Receiver> receiver;
        try {
            receiver=receiverRepo.findById(id);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new Receiver(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(receiver.isPresent())
            return new ResponseEntity<>(receiver.get(),HttpStatus.OK);
        return new ResponseEntity<>(new Receiver(),HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get/mail/{email}")
    public ResponseEntity<Receiver> getReceiverMail(@PathVariable String email){
        Optional<Receiver> receiver;
        try {
            receiver=receiverRepo.findByEmail(email);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new Receiver(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if(receiver.isPresent())
            return new ResponseEntity<>(receiver.get(),HttpStatus.OK);
        return new ResponseEntity<>(new Receiver(),HttpStatus.NOT_FOUND);
    }
}
