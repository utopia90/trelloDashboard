import React from "react";
import Homepage from "../pages/homepage/homepage";
import Register from "../pages/register/register";
import Login from "../pages/login/login";


import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import PrivateRoute from "./privateroute";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <PrivateRoute component={Homepage}  path="/home"/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Register} />
      </Switch>
    </Router>
  );
}
