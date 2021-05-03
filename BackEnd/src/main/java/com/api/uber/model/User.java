package com.api.uber.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import java.io.Serializable;

@Entity
public class User implements Serializable {

    public User(){
    }

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long userID;

    private String firstName;

    private String lastName;
    @Column(unique = true)
    private String username;


    @JsonProperty(value = "password", access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    public Long getUserID() {
        return userID;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
