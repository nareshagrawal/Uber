package com.api.uber.services;

import com.api.uber.model.Ride;
import com.api.uber.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedHashSet;

@Service
public class RideService {

    @Autowired
    RideRepository repository;

    public Ride createRide(Ride ride){

        ride.setComplete(false);
        ride.setBookingDate(new Date());
        ride.setCancel(false);
        return repository.save(ride);
    }

    public Ride getRideByID(long id){
        return repository.findById(id).orElse(null);
    }

    public void saveRide (Ride r){
        repository.save(r);
    }

    public LinkedHashSet<Ride> getUserRides(Long userID){
        return repository.ridesByUserID(userID);
    }
}
