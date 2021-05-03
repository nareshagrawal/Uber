package com.api.uber.services;

import com.api.uber.model.Bus;
import com.api.uber.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BusService {

    @Autowired
    BusRepository repository;

    public Bus createBus(Bus bus) {
        return repository.save(bus);
    }

    public void deleteBus(long busId) {
        Bus bus = repository.getOne(busId);
        repository.delete(bus);
    }

    public void updateBusSeats(long busId, int seats) {
        Bus bus = repository.getOne(busId);
        bus.setTotalSeats(seats);
        repository.save(bus);
    }

    public List<Bus> getBusesWithAvailability(String source, String destination) {
        return repository.findBuses(source, destination);
    }

    public void bookSeat(long busId, int bookSeats) {
        Bus bus = repository.getOne(busId);
        bus.setTotalSeats(bus.getTotalSeats() - bookSeats);
        repository.save(bus);
    }

    public void removeSeat(long busId, int bookSeats) {
        Bus bus = repository.getOne(busId);
        bus.setTotalSeats(bus.getTotalSeats() + bookSeats);
        repository.save(bus);
    }
    public List<Bus> getListBuses(){
        return repository.getListBuses();
    }
}
