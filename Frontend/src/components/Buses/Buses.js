import React, { useState, useEffect } from "react";
import { Button, ListGroup, Form, Table } from "react-bootstrap";
import AutoComplete from "../AutoComplete/AutoComplete";
import axios from "axios";
import Cookies from "js-cookie";
import Toast from "../Toast/Toast";
const Buses = () => {
    const [selected, setSelected] = useState("all");
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [seats, setSeats] = useState('');
    const [busId, setBusId] = useState('');
    const [busName, setBusName] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [showError, setShowError] = useState(false);
    const [lstBus, setLstBus] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/bus/`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        })
            .then(res => { setLstBus(res.data) })
            .catch(err => console.log(err));
    }, [])
    const sourceChange = (data) => {
        setSource(data);
    }
    const destinationChange = (data) => {
        setDestination(data);
    }
    const addBus = (e) => {
        e.preventDefault();
        if (source !== '' && destination !== '' && seats !== '') {
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/bus/`, {
                source: source.name,
                destination: destination.name,
                sourceId: source.place_id,
                destinationId: destination.place_id,
                busName: busName,
                totalSeats: parseInt(seats)
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
                .then(res => { console.log("Bus added successfully"); setShowInfo(true); setSeats("") })
                .catch(err => setShowError(true));
        }
    }
    const getBusList = () => {
        return (
            [...lstBus].map((bus) => {
                return (
                    <tr key={bus.busID}>
                        <td>{bus.busID}</td>
                        <td>{bus.busName}</td>
                        <td>{bus.source}</td>
                        <td>{bus.destination}</td>
                        <td>{bus.totalSeats}</td>
                    </tr>
                )
            })
        )
    }
    const removeBus = (e) => {
        e.preventDefault();
        if (busId !== '') {
            axios.delete(`${process.env.REACT_APP_BACKEND_HOST}/bus/${busId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("jwt")}`
                },
            })
                .then(res => { console.log("Bus removed successfully"); setShowInfo(true); setBusId("") })
                .catch(err => setShowError(true));
        }
    }
    // const updateBus = (e) => {
    //     e.preventDefault();
    //     if (seats !== '') {
    //         axios.put(`${process.env.REACT_APP_BACKEND_HOST}/bus/${busId}?seats=${seats}`, {
    //             headers: {
    //                 Authorization: `Bearer ${Cookies.get("jwt")}`
    //             },
    //         })
    //             .then(res => { setShowInfo(true); setBusId(""); setSeats("") })
    //             .catch(err => setShowError(true));
    //     }
    // }
    return (
        <>
            { showInfo && (<Toast updateShow={setShowInfo} message="Successfully!!!" mode="success"></Toast>)}
            { showError && (<Toast updateShow={setShowError} message="Error while performing operation, please try again later" mode="danger"></Toast>)}

            <div className="row mt-3">
                <div className="col-12 col-sm-4">
                    <ListGroup>
                        <ListGroup.Item onClick={() => { setSelected("all") }} className={selected === "all" ? "bg-dark text-white" : ""}>All Buses</ListGroup.Item>
                        <ListGroup.Item onClick={() => { setSelected("add") }} className={selected === "add" ? "bg-dark text-white" : ""}>Add Bus</ListGroup.Item>
                        <ListGroup.Item onClick={() => { setSelected("remove") }} className={selected === "remove" ? "bg-dark text-white" : ""}>Remove Bus</ListGroup.Item>
                        {/* <ListGroup.Item onClick={() => { setSelected("update") }} className={selected === "update" ? "bg-dark text-white" : ""}>Update Bus</ListGroup.Item> */}
                    </ListGroup>
                </div>
                <div className="col-12 col-sm-8">
                    {selected === "all" && (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Bus ID</th>
                                    <th>Bus Name</th>
                                    <th>Pick up</th>
                                    <th>Destination</th>
                                    <th>Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getBusList()}
                            </tbody>
                        </Table>
                    )}
                    {selected === "add" && (
                        <div>
                            <Form onSubmit={addBus}>
                                <div>
                                    <Form.Group controlId="source">
                                        <label>Source</label>
                                        <AutoComplete label="Enter pickup location" onSelect={sourceChange}></AutoComplete>
                                    </Form.Group>
                                    <Form.Group controlId="destination">
                                        <label>Destination</label>
                                        <AutoComplete label="Enter destination" onSelect={destinationChange}></AutoComplete>
                                    </Form.Group>
                                    <Form.Group controlId="busName">
                                        <label>Bus Name</label>
                                        <Form.Control
                                            type="text"
                                            value={busName}
                                            onChange={(e) => { setBusName(e.target.value) }}
                                            required />
                                    </Form.Group>
                                    <Form.Group controlId="seats">
                                        <label>Seats</label>
                                        <Form.Control
                                            type="number"
                                            value={seats}
                                            onChange={(e) => { setSeats(e.target.value) }}
                                            required />
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-dark">Submit</Button>
                                </div>
                            </Form>
                        </div>
                    )}
                    {selected === "remove" && (
                        <div>
                            <Form onSubmit={removeBus}>
                                <div>
                                    <Form.Group controlId="source">
                                        <label>Enter Bus Id to be removed</label>
                                        <Form.Control
                                            type="number"
                                            value={busId}
                                            onChange={(e) => { setBusId(e.target.value) }}
                                            required />
                                    </Form.Group>
                                    <Button type="submit" className="btn btn-dark">Submit</Button>
                                </div>
                            </Form>
                        </div>
                    )}
                    {/* {selected === "update" && (
                        <Form onSubmit={updateBus}>
                            <div>
                                <Form.Group controlId="source">
                                    <label>Enter Bs Id to be removed</label>
                                    <Form.Control
                                        type="number"
                                        value={busId}
                                        onChange={(e) => { setBusId(e.target.value) }}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="source">
                                    <label>Enter Bus Id to be updated</label>
                                    <Form.Control
                                        type="number"
                                        value={seats}
                                        onChange={(e) => { setSeats(e.target.value) }}
                                        required />
                                </Form.Group>
                                <Button type="submit" className="btn btn-dark">Submit</Button>
                            </div>
                        </Form>
                    )} */}
                </div>
            </div>
        </>
    )
}

export default Buses;