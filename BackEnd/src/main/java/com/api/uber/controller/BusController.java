package com.api.uber.controller;

import com.api.uber.model.Bus;
import com.api.uber.services.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/bus/**")
public class BusController {
    @Autowired
    BusService service;

    @RequestMapping(value = "/", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<Object> createBus(@RequestBody Bus bus) {
        try {
            bus = service.createBus(bus);
            return new ResponseEntity<>(bus, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
    public List<Bus> getListBuses() {
        return service.getListBuses();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteBus(@PathVariable("id") long busId) {
        service.deleteBus(busId);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = "application/json")
    public void updateBus(@PathVariable("id") long busId, @RequestParam int seats) {
        service.updateBusSeats(busId, seats);
    }

    @RequestMapping(value = "/getAvailability", method = RequestMethod.GET, produces = "application/json")
    public List<Bus> getBusWithSeatDetails(@RequestParam String source, @RequestParam String destination) {
        List<Bus> lstBus = service.getBusesWithAvailability(source, destination);
        return lstBus;
    }
}
