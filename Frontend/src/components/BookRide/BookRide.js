import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import AutoComplete from "../AutoComplete/AutoComplete";
import Maps from "../Maps/Maps";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faDollarSign, faPlus, faMinus, faCalendar, faUsers, faCircle } from '@fortawesome/fontawesome-free-solid';

const BookRide = () => {
    const history = useHistory();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [showDirection, setShowDirection] = useState(null);
    const [showMarker, setShowMarker] = useState(null);
    const [userDisplay, setUserDisplay] = useState('');
    const [rideDate, setRideDate] = useState(`${(new Date()).getFullYear()}-0${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`);
    const [seats, setSeats] = useState(1);
    const [price, setPrice] = useState(0);
    const [busId, setBusID] = useState('');
    const [lstBus, setLstBus] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/rides/book`, {
            pickup: source.name,
            destination: destination.name,
            pickupPlaceId: source.place_id,
            destinationPlaceId: destination.place_id,
            rideDate: rideDate,
            busId: busId,
            cost: price,
            seats: seats
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
        })
            .then(res => { console.log("Ride booked Successfully."); history.push(`/rides/${res.data.rideID}`) })
            .catch(err => alert("error while booking ride"));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/v1/users/`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        })
            .then(res => { setUserDisplay(res.data.firstName + " " + res.data.lastName) })
            .catch(err => console.log(err));
    }
        , [])
    const getPrice = () => {
        if (source.place_id && destination.place_id) {
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/maps/distance`, {
                sourceId: source.place_id,
                destinationId: destination.place_id
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
                .then(res => setPrice(Math.round(seats * 10 * (parseFloat(res.data.rows[0].elements[0].distance.value / 1000))) / 100))
                .catch(err => console.log(err));
        }
    }
    const getBusList = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/bus/getAvailability?source=${source.place_id}&&destination=${destination.place_id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
        })
            .then(res => {
                let data = [];
                [...res.data].forEach(bus => {
                    if (bus.totalSeats >= seats) {
                        data.push(bus);
                    }
                });
                setLstBus(data);
            })
            .catch(err => alert("error while booking ride"));
    }
    useEffect(() => {
        getPrice();
        getBusList();
    }, [source, destination, seats]);
    const getLatLng = async (id) => {
        let url = `${process.env.REACT_APP_BACKEND_HOST}/maps/place_id/${id}`;
        let resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        });
        return resp.data.result.geometry.location;
    }
    const sourceChange = async (data) => {
        setSource(data);
        updateMap("src", data);

    }
    const destinationChange = (data) => {
        setDestination(data);
        updateMap("dest", data);
    }
    const updateMap = async (type, data) => {
        if (type === "src") {
            if (destination) {
                let srcCoords = await getLatLng(data.place_id);
                let dstCoords = await getLatLng(destination.place_id);
                setShowDirection({ src: srcCoords, dst: dstCoords });
                setShowMarker(null);
            }
            else {
                let coords = await getLatLng(data.place_id);
                setShowMarker({ src: coords });
                setShowDirection(null);
            }
        }
        else if (type === "dest") {
            if (source) {
                let dstCoords = await getLatLng(data.place_id);
                let srcCoords = await getLatLng(source.place_id);
                setShowDirection({ src: srcCoords, dst: dstCoords });
                setShowMarker(null);
            }
            else {
                let coords = await getLatLng(data.place_id);
                setShowMarker({ src: coords });
                setShowDirection(null);
            }
        }
        else {
            // clear map dummy image
            setShowDirection(null);
            setShowMarker(null);
        }
    }
    const getBusDD = () => {
        return (
            [...lstBus].map(bus => {
                return (
                    <Dropdown.Item className="w-100" key={bus.busID} onClick={() => { setBusID(bus.busID) }}>{bus.busName}: Bus No{bus.busID}</Dropdown.Item>
                )
            })
        )
    }
    return (
        <div className="row main-div mt-5">
            <div className="col-12 col-md-4 d-flex align-items-center mb-3">
                <Form onSubmit={handleSubmit} className="w-100">
                    <h3>Hi, {userDisplay}</h3>
                    <h5>Please book your ride</h5>
                    <div className="row">
                        <div className="col-2 pr-0">
                            <div className="py-2">
                                <div className="verticalLine"></div>
                                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                            </div>

                        </div>
                        <div className="col-10 pl-0">
                            <div className="p-0">
                                <AutoComplete label="Enter pickup location" onSelect={sourceChange}></AutoComplete>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2 pr-0">
                            <div className="py-2">
                                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                            </div>

                        </div>
                        <div className="col-10 pl-0">
                            <div className="p-0">
                                <AutoComplete label="Enter destination" onSelect={destinationChange}></AutoComplete>
                            </div>
                        </div>
                    </div>
                    <Form.Group className="m-0">
                        <div className="row">
                            <div className="col-2 pr-0">
                                <div className="px-1 py-3">
                                    <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                                </div>

                            </div>
                            <div className="col-10 pl-0">
                                <div className="py-2">
                                    <Form.Control
                                        type="date"
                                        value={rideDate}
                                        min={`${(new Date()).getFullYear()}-0${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`}
                                        onChange={(e) => { setRideDate(e.target.value) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <div className="row">
                            <div className="col-2 pr-0">
                                <div className="py-3">
                                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                                </div>

                            </div>
                            <div className="col-10 pl-0">
                                <div className="py-2">
                                    <div className="row">
                                        <div className="col-3 pr-0">
                                            <div className="p-2 bg-info text-white text-center rounded"
                                                onClick={() => { if (seats != 1) { setSeats(seats - 1) } }}
                                            >
                                                <FontAwesomeIcon className="fa-lg" icon={faMinus}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                        <div className="col-6 pl-0 pr-0 text-center">
                                            <div className="bg-light p-2">
                                                <strong>{seats}</strong>
                                            </div>
                                        </div>
                                        <div className="col-3 pl-0">
                                            <div className="p-2 bg-info text-white text-center rounded"
                                                onClick={() => { setSeats(seats + 1) }}
                                            >
                                                <FontAwesomeIcon className="fa-lg" icon={faPlus}></FontAwesomeIcon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <div className="row">
                            <div className="col-2 pr-0">
                                <div className="p-2">
                                    <FontAwesomeIcon  icon={faDollarSign}></FontAwesomeIcon>
                                </div>

                            </div>
                            <div className="col-10 pl-0">
                                <div className="text-success bg-light rounded p-2 border border-secondary">
                                    <strong>{price}</strong>
                                </div>
                            </div>
                        </div>
                    </Form.Group>
                    {lstBus.length > 0 && (
                        <>
                            <div className="text-center bg-light p-2 mb-3">
                                <FontAwesomeIcon className="fa-lg" icon={faBus}></FontAwesomeIcon>
                            </div>
                            <DropdownButton
                                className="my-comment-dropdown w-100"
                                size="sm"
                                variant="secondary"
                                title="Select Bus">
                                {
                                    getBusDD()
                                }
                            </DropdownButton>
                        </>
                    )}
                    {lstBus.length <= 0 && (
                        <div className="text-center bg-danger p-2 text-white rounded">No bus available</div>
                    )}
                    <div className="mt-2">
                        <Button type="submit" disabled={lstBus.length > 0 ? false : true} className="bg-dark w-100">Book Ride</Button>
                    </div>
                </Form>
            </div>
            <div className="col-12 col-md-8">
                {(showDirection || showMarker)
                    &&
                    <Maps
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2HFlhQEag0ziQjl7LULqobeCEmInPAX0&v=3.exp&libraries=geometry,drawing,places,directions"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `calc(100vh - 8.0rem)` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        direction={showDirection}
                        marker={showMarker}
                    >
                    </Maps>
                }
            </div>
        </div>
    );
}
export default BookRide;