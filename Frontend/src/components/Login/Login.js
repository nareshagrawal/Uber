import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/fontawesome-free-solid'
import Toast from "../Toast/Toast";
const Login = () => {
    const { setIsAuthenticated } = useContext(UserContext);
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [validated, setValidated] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const reset = () => {
        setfirstName('');
        setlastName('');
        setUsername('');
        setPassword('');
        setIsSignUp(false);
        setValidated(false);
    }
    const handleSubmit = (event) => {
        console.log(process.env.REACT_APP_BACKEND_HOST);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            event.stopPropagation();
            if (isSignUp) {
                axios.post(`${process.env.REACT_APP_BACKEND_HOST}/register`, {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    username: username
                })
                    .then(resp => { setShowInfo(true); reset(); history.push("/login"); console.log("User created.") })
                    .catch((err) => {
                        setValidated(false);
                        console.log("Error while creating user")
                        console.log(err);
                        // err.response.data ? setErrorMessage(err.response.data) : setErrorMessage("error while creating user");
                        setShowError(true);
                    });
            }
            else {

                axios.post(`${process.env.REACT_APP_BACKEND_HOST}/login`, {
                    password: password,
                    username: username
                })
                    .then(res => { 
                        Cookies.set('jwt', res.data.token); 
                        console.log("Login Successful!!!")
                        setIsAuthenticated(true); 
                        if(username ==="admin@uberbus.com"){
                            history.push("/buses")
                        }
                        else {
                            history.push("/");
                        }
                    })
                    .catch(err => { setErrorMessage("Please enter valid credentials"); setShowError(true) });
            }
        }

        setValidated(true);
    };
    return (
        <div className="bg-dark vh-100">
            {showInfo && (<Toast updateShow={setShowInfo} message="Successful!!! Please login using new credentials" mode="info"></Toast>)}
            {showError && (<Toast updateShow={setShowError} message={errorMessage} mode="danger"></Toast>)}
            <div className="login-div p-3 bg-white rounded">
                <div className="text-center p-1 mb-2">
                    <FontAwesomeIcon className="fa-lg" icon={faBus}></FontAwesomeIcon>
                    <h3>UberBus</h3>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <Button onClick={() => { setIsSignUp(false) }} className={`${isSignUp ? 'btn-light' : 'btn-dark'} w-50 `}>Login</Button>
                        <Button onClick={() => { setIsSignUp(true) }} className={`${isSignUp ? 'btn-dark' : 'btn-light'} w-50 `}>SignUp</Button>
                    </div>
                    <div>
                        <Form.Group>
                            <Form.Group controlId="email">
                                <Form.Control
                                    type="email"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    placeholder="Enter Email"
                                    required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid email address.
                            </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Enter Password"
                                    required />
                                <Form.Text className="text-muted">
                                    Password is protected with end to end encryption
                            </Form.Text>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter valid password.
                            </Form.Control.Feedback>
                            </Form.Group>
                            {isSignUp && (<div><Form.Group controlId="firstName">
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => { setfirstName(e.target.value) }}
                                    placeholder="First Name"
                                    required />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please enter first name.
                            </Form.Control.Feedback>
                            </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Control
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => { setlastName(e.target.value) }}
                                        placeholder="Last name"
                                        required />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter valid last name.
                            </Form.Control.Feedback>
                                </Form.Group>
                            </div>)}
                        </Form.Group>
                    </div>
                    <div>
                        <Button type="submit" className="bg-dark w-100">{isSignUp ? 'Signup' : 'Login'}</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;