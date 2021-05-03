package com.api.uber.validator;

import com.api.uber.model.User;
import com.api.uber.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator  implements Validator {

    @Autowired
    UserService userService;

    @Override
    public boolean supports(Class<?> type) {
        return type.equals(User.class);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User user = (User) o;

        try{

            User u = userService.findByUserName(user.getUsername());
            if (u != null){
                errors.rejectValue("username", "error.invalid.username", "Username already taken");
            }


        } catch (Exception e) {

        }

    }
}
