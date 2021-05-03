package com.api.uber.repository;

import com.api.uber.model.Ride;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashSet;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    @Query(value= "SELECT * FROM ride w WHERE w.userid_userid= :userID",nativeQuery = true)
    LinkedHashSet<Ride> ridesByUserID(Long userID);
}
