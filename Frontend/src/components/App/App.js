import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookRide from '../BookRide/BookRide';
import Nav from '../UberNavbar/UberNavbar';
import Rides from '../Rides/Rides';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from "react-bootstrap";
import RideDetails from '../RideDetails/RideDetails';
import TestHealth from "../Test/TestHealth";
import TestComms from "../Test/TestComms";
import Login from '../Login/Login';
import Buses from '../Buses/Buses';
import React, { useState } from "react";
import UserContext from "../../context/UserContext";
import Cookie from "js-cookie";
function App() {
  const token = Cookie.get("jwt");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <BrowserRouter>
        {isAuthenticated ?
          <>
            <div className="bg-dark">
              <Container>
                <Nav></Nav>
              </Container>
            </div>
            <Container>
                <Switch>
                  <Route path="/" exact component={BookRide}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/rides/:id" component={RideDetails}></Route>
                  <Route path="/rides" component={Rides}></Route>
                  <Route path="/buses" component={Buses}></Route>
                  <Route path="/testHealth" component={TestHealth}></Route>
                  <Route path="/testComms" component={TestComms}></Route>
                </Switch>
            </Container>
          </>
          : <div>
            <Route path="/login" component={Login}></Route>
            <Redirect to="/login" />
          </div>
        }
      </BrowserRouter>
    </UserContext.Provider>
  )
}
export default App;
