package com.api.uber.controller;

import com.api.uber.model.Ride;
import com.api.uber.model.User;
import com.api.uber.model.Bus;
import com.api.uber.services.BusService;
import com.api.uber.services.RideService;
import com.api.uber.services.UserService;
import netscape.javascript.JSObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashSet;


@Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/rides/**")
public class RideController {

    @Autowired
    RideService rideService;
    @Autowired
    UserService userService;
    @Autowired
    BusService busService;
    private final Logger log = LoggerFactory.getLogger(this.getClass());


    @RequestMapping(value="/book", method = RequestMethod.POST,  produces = "application/json")
    public ResponseEntity<Object> bookRide(@RequestBody Ride ride, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUserName((username));
        try{
            ride.setUserID(user);
            ride = rideService.createRide(ride);
            busService.bookSeat(ride.getBusId(), ride.getSeats());
            log.info("ride booked, rideID:" + ride.getRideID());
            return new ResponseEntity<>(ride, HttpStatus.CREATED);
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET,  produces = "application/json")
    public  ResponseEntity<Object> getRide( @PathVariable("id") Long id) {
        try {
            Ride ride = rideService.getRideByID(id);
            if(ride!= null) {
                log.info("get ride, rideID:"+ride.getRideID());
                return new ResponseEntity<>(ride, HttpStatus.OK);
            } else {
                log.info("ride not found, rideID:"+id);
                return new ResponseEntity<>("Ride not found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/complete/{id}", method = RequestMethod.POST,  produces = "application/json")
    public  ResponseEntity<Object> rideCompleted( @PathVariable("id") Long id) {
        try {
            Ride ride = rideService.getRideByID(id);
            if(ride!= null) {
                ride.setComplete(true);
                rideService.saveRide(ride);
                log.info("ride completed, rideID:"+ id);
                return new ResponseEntity<>("Ride Completed", HttpStatus.OK);
            } else {
                log.info("ride not found, rideID:"+id);
                return new ResponseEntity<>("Ride not found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/feedback/{id}", method = RequestMethod.POST,  produces = "application/json")
    public  ResponseEntity<Object> rideFeedBack(@RequestBody Ride ride1, @PathVariable("id") Long id) {
        try {
            Ride ride = rideService.getRideByID(id);
            if(ride!= null) {
                ride.setFeedback(ride1.getFeedback());
                rideService.saveRide(ride);
                log.info("ride feedback set, rideID:"+ id);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("ride not found, rideID:"+id);
                return new ResponseEntity<>("Ride not found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/cancel/{id}", method = RequestMethod.GET,  produces = "application/json")
    public  ResponseEntity<Object> rideCancel(@PathVariable("id") Long id) {
        try {
            Ride ride = rideService.getRideByID(id);
            if(ride!= null && !ride.isComplete()) {
                ride.setCancel(true);
                rideService.saveRide(ride);
                busService.removeSeat(ride.getBusId(), ride.getSeats());
                log.info("ride canceled, rideID:"+ id);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                log.info("ride not found, rideID:"+id);
                return new ResponseEntity<>("Ride not found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="/all", method = RequestMethod.GET,  produces = "application/json")
    public  ResponseEntity<Object> getAllRides(Authentication authentication) {
        try {
            String username = authentication.getName();
            User user = userService.findByUserName((username));
            LinkedHashSet<Ride> list = rideService.getUserRides(user.getUserID());
            if(list != null) {
                //log.info("all rides of userID:"+ id);
                return new ResponseEntity<>(list,HttpStatus.OK);
            } else {
                //log.info("user not found, userID:"+id);
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
