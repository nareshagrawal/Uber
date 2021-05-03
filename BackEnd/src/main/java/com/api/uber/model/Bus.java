package com.api.uber.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
public class Bus implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long busID;
    private String source;
    private String destination;
    private String sourceId;
    private String destinationId;
    private Integer totalSeats;
    private String busName;

    public Long getBusID() {
        return busID;
    }

    public void setBusID(Long busID) {
        this.busID = busID;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public String getSourceId() {
        return sourceId;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public String getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(String destinationId) {
        this.destinationId = destinationId;
    }

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }
}
