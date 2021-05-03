package com.api.uber.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Ride {

    public Ride() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long rideID;

    private String pickupPlaceId;

    private String destinationPlaceId;

    private String pickup;

    private String destination;

    private Date rideDate;

    private double cost;

    private String rideDuration;

    private Date bookingDate;

    private boolean isComplete;

    private boolean cancel;

    private Integer seats;

    private long busId;

    @Lob
    private String feedback;

    @ManyToOne
    @JoinColumn()
    private User userID;

    public Long getRideID() {
        return rideID;
    }

    public void setRideID(Long rideID) {
        this.rideID = rideID;
    }

    public String getPickup() {
        return pickup;
    }

    public void setPickup(String pickup) {
        this.pickup = pickup;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Date getRideDate() {
        return rideDate;
    }

    public void setRideDate(Date rideDate) {
        this.rideDate = rideDate;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getRideDuration() {
        return rideDuration;
    }

    public void setRideDuration(String rideDuration) {
        this.rideDuration = rideDuration;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public boolean isCancel() {
        return cancel;
    }

    public void setCancel(boolean cancel) {
        this.cancel = cancel;
    }

    public User getUserID() {
        return userID;
    }

    public void setUserID(User userID) {
        this.userID = userID;
    }

    public String getPickupPlaceId() {
        return pickupPlaceId;
    }

    public void setPickupPlaceId(String pickupPlaceId) {
        this.pickupPlaceId = pickupPlaceId;
    }

    public String getDestinationPlaceId() {
        return destinationPlaceId;
    }

    public void setDestinationPlaceId(String destinationPlaceId) {
        this.destinationPlaceId = destinationPlaceId;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public long getBusId() {
        return busId;
    }

    public void setBusId(long busId) {
        this.busId = busId;
    }
}
