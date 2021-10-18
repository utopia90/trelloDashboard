import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "../contexts/authenticationContext";

interface PrivateRouteProps {
  component: React.FC;
  path: string;
}

export default function PrivateRoute({ component, path }: PrivateRouteProps) {
  const state = React.useContext(AuthenticationContext);

  const renderComponent = () => {
    return state.loggedIn ? (
      React.createElement(component)
    ) : (
      <Redirect to="/login" />
    );
  };
  return <Route exact path={path} render={renderComponent} />;
}
