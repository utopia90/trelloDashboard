import React from "react";
import Homepage from "../pages/homepage/homepage";
import Register from "../pages/register/register";
import Login from "../pages/login/login";
import Test from "../pages/test/productivityTest";


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
      <Route path="/login" component={Login} />
      <Route path="/test" component={Test} />
      <PrivateRoute path="/home" component={Homepage} />
      <Route exact path="/" component={Register} />
    </Switch>
  </Router>
  );
}
