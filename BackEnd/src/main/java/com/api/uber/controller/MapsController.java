package com.api.uber.controller;

import com.api.uber.model.Bus;
import com.api.uber.model.User;
import com.api.uber.services.UserService;
import com.api.uber.validator.UserValidator;
import netscape.javascript.JSObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/maps/**")
public class MapsController {
    @RequestMapping(value = "/{searchTerm}", method = RequestMethod.GET, produces = "application/json")
    public String getLocations(@PathVariable("searchTerm") String searchTerm) {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(
                "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+searchTerm+"&key=AIzaSyB2HFlhQEag0ziQjl7LULqobeCEmInPAX0",
                String.class);
        return result;
    }
    @RequestMapping(value = "place_id/{placeId}", method = RequestMethod.GET, produces = "application/json")
    public String getLatLng(@PathVariable("placeId") String placeId) {
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(
                "https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeId+"&key=AIzaSyB2HFlhQEag0ziQjl7LULqobeCEmInPAX0",
                String.class);
        return result;
    }
    @RequestMapping(value = "/distance", method = RequestMethod.POST, produces = "application/json")
    public String getDistance(@RequestBody Bus bus) {
        String source = bus.getSourceId();
        String destination = bus.getDestinationId();
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(
                "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=place_id:"+source+"&destinations=place_id:"+destination+"&key=AIzaSyB2HFlhQEag0ziQjl7LULqobeCEmInPAX0",
                String.class);
        return result;
    }
}
