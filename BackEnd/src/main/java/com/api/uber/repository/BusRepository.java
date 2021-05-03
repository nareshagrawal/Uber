package com.api.uber.repository;

import com.api.uber.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {

    @Query(value = "FROM Bus b WHERE b.sourceId = :source and b.destinationId = :destination")
    List<Bus> findBuses(String source, String destination);
    @Query(value = "FROM Bus")
    List<Bus> getListBuses();
}
