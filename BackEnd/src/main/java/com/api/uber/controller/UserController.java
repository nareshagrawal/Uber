package com.api.uber.controller;

import com.api.uber.model.User;
import com.api.uber.services.UserService;
import com.api.uber.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;

@Controller
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1/users/**")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserValidator validator;

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    @RequestMapping(value="/", method = RequestMethod.GET,  produces = "application/json")
    public ResponseEntity<Object> getUser(Authentication authentication){
        String username = authentication.getName();
        User user = userService.findByUserName((username));
        if(user!= null) {
            log.info("get user, UserID:"+user.getUserID());
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            log.info("User not found, UserID:");
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT,  produces = "application/json")
    public  ResponseEntity<Object> updateUser(@RequestBody User user, @PathVariable("id") Long id) {
        try {
            User newUser = userService.updateUser(user,id);
            log.info("User updated, UserID:"+user.getUserID());
            return new ResponseEntity<>(newUser, HttpStatus.ACCEPTED);

        }catch (Exception e){
            log.error(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

}
