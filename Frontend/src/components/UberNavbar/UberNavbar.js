import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Navbar, Nav } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

const UberNavbar = () => {
    const { setIsAuthenticated } = useContext(UserContext);
    //state to update the selection on navbar
    const [current, setCurrent] = useState('Book Ride');
    const history = useHistory();
    const logout = (e) => {
        e.preventDefault();
        Cookies.remove("jwt");
        setIsAuthenticated(false);
        history.push("/login");
    }
    return (
        <Navbar className="bg-dark px-0" variant='dark' expand="lg">
            <Navbar.Brand as={Link} to="/" onClick={(e) => { setCurrent("home") }}>Uber</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex w-100" activeKey={current} onSelect={(e) => { setCurrent(e.eventKey) }}>
                    <Nav.Link as={Link} eventKey="Book Ride" to="/" className="btn">
                        <div>
                            <FontAwesomeIcon className="fa-sm" icon={faHome}></FontAwesomeIcon>
                        </div>
                        <div className="navbar-text">Home</div>
                    </Nav.Link>
                    <Nav.Link as={Link} eventKey="rides" to="/rides" className="btn">
                        <div>
                            <FontAwesomeIcon className="fa-sm" icon={faList}></FontAwesomeIcon>
                        </div>
                        <div className="navbar-text">Rides</div>
                    </Nav.Link>
                    {/* <Nav.Link as={Link} eventKey="buses" to="/buses" className="btn">Admin</Nav.Link> */}
                    <Nav.Link as={Link} onClick={logout} className="btn ml-logout active">
                        <div>
                            <FontAwesomeIcon className="fa-sm" icon={faSignOutAlt}></FontAwesomeIcon>
                        </div>
                        <div className="navbar-text">Logout</div>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default UberNavbar;