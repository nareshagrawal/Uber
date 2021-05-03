package com.api.uber.services;

import com.api.uber.model.User;
import com.api.uber.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository repository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User u){
        u.setPassword(bCryptPasswordEncoder.encode(u.getPassword()));
        return repository.save(u);
    }

    public User findByUserName(String userName){
        return repository.findByUserName(userName);
    }

    public User userBYID(Long id){
        return repository.findById(id).orElse(null);
    }

    public User updateUser(User u, long id){

        User user = userBYID(id);

        user.setPassword(bCryptPasswordEncoder.encode(u.getPassword()));
        user.setFirstName(u.getFirstName());
        user.setLastName(u.getLastName());

        return repository.save(user);
    }

}

