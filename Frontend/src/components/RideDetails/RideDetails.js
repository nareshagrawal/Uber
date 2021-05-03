import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import Maps from "../Maps/Maps";

const RideDetails = (props) => {
    const history = useHistory();
    const [rideData, setRideData] = useState(null);
    const [showDirection, setShowDirection] = useState(null);
    const [feedback, setFeedback] = useState('');
    const getLatLng = async (id) => {
        let url = `${process.env.REACT_APP_BACKEND_HOST}/maps/place_id/${id}`;
        let resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        });
        return resp.data.result.geometry.location;
    }
    const cancelRide = () => {
        debugger;
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/rides/cancel/${props.match.params.id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
        })
            .then(res => history.push('/rides'))
            .catch(err => alert("error while cancelling the ride"));
    }
    const feedbackRide = () => {
        if (!feedback && feedback === "") {
            alert("Please enter valid feedback");
        }
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/rides/feedback/${props.match.params.id}`,
            {
                feedback: feedback
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
            .then(res => history.push('/rides'))
            .catch(err => alert("error while adding feedback ride"));
    }
    useEffect(
        () => {
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/rides/${props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
                .then(res => { setRideData(res.data) })
                .catch(err => alert("error while booking ride"));
        }
        , [props.match.params.id])
    useEffect(
        async function getCords() {

            if (rideData != null) {
                let srcCoords = await getLatLng(rideData.pickupPlaceId);
                let dstCoords = await getLatLng(rideData.destinationPlaceId);
                setShowDirection({ src: srcCoords, dst: dstCoords });
            }
        }
        , [rideData])
    return (
        rideData ?
            <div className="row mt-5">
                <div className="col-12 col-md-4 mb-3">
                    <h3>
                        Ride Details:
                    </h3>
                    <Table striped bordered hover size="sm">
                        <tbody>
                            <tr>
                                <td>Pickup Location:</td>
                                <td>{rideData.pickup}</td>
                            </tr>
                            <tr>
                                <td>Destination:</td>
                                <td>{rideData.destination}</td>
                            </tr>
                            <tr>
                                <td>Booking Date:</td>
                                <td>{rideData.bookingDate.split("T")[0]}</td>
                            </tr>
                            <tr>
                                <td>Ride Date:</td>
                                <td>{rideData.rideDate.split("T")[0]}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>${rideData.cost}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {rideData.cancel ?
                        <div className="bg-light p-2">
                            Ride Canceled
                        </div> :
                        <></>}
                    {!rideData.cancel && ((new Date(rideData.rideDate)).getTime()) > (new Date()).getTime() ?
                        <div>
                            <Button onClick={cancelRide} className="btn btn-dark">Cancel Ride</Button>
                        </div>
                        : <></>}
                    {!rideData.cancel && ((new Date(rideData.rideDate)).getTime()) < (new Date()).getTime() ?
                        <div>
                            {!rideData.feedback || rideData.feedback === "" ?
                                <div>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Feedback</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={feedback} onChange={(e) => { setFeedback(e.target.value) }} />
                                    </Form.Group>
                                    <Button onClick={feedbackRide} className="btn btn-dark">Add Feedback</Button>
                                </div>
                                :
                                <div className="bg-light p-2">
                                    Feedback:
                                    <hr></hr>
                                    {rideData.feedback}
                                </div>}
                        </div>
                        : <></>}
                </div>
                <div className="col-12 col-md-8">
                    <Maps
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2HFlhQEag0ziQjl7LULqobeCEmInPAX0&v=3.exp&libraries=geometry,drawing,places,directions"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `calc(100vh - 8.0rem)` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        direction={showDirection}
                    >
                    </Maps>
                </div>
            </div>
            :
            <></>
    )
}

export default RideDetails;