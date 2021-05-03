package com.api.uber.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TestController {
    @RequestMapping(value = "/health", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Object> getHealth() {

        return new ResponseEntity<>("hello from backend", HttpStatus.OK);
    }
}
