import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { Table } from "react-bootstrap";
const Rides = () => {
    const [rides, setRides] = useState([]);
    useEffect(
        () => {
            //Todo make api call to get all rides 
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/rides/all`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
                .then(res => { debugger; setRides(res.data) })
                .catch(err => alert("error while booking ride"));
        }
        , []);
    const renderHTML = () => {
        return rides.map((ride) => {
            return (
                <tr key={ride}>
                    <td>{ride.pickup}</td>
                    <td>{ride.destination}</td>
                    <td>{ride.bookingDate.split("T")[0]}</td>
                    <td>{ride.rideDate.split("T")[0]}</td>
                    <td className="text-center"><Link to={`/rides/${ride.rideID}`}> &#8658;</Link></td>
                </tr>
            );
        });
    }
    return (
        <div className="w-100 ride-mobile">
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Pick up</th>
                        <th>Destination</th>
                        <th>Booking Date</th>
                        <th>Ride Date</th>
                        <th>Ride Details</th>
                    </tr>
                </thead>
                <tbody>
                    {renderHTML()}
                </tbody>
            </Table>
        </div>
    )
}

export default Rides;