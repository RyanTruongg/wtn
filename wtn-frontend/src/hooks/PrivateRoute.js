import { Typography } from "@material-ui/core";
import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "./use-auth";

import PropTypes from "prop-types";

function PrivateRoute(props) {
  const { children, role, ...rest } = props;
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        switch (auth.authState) {
          case "pending":
            return <Typography>Just a second...</Typography>;
          case "success":
            if (auth.user?.role === role) {
              return children;
            }
            return (
              <Redirect
                to={{
                  pathname: auth.user?.role
                    ? "/" + auth.user?.role
                    : "/student",
                  state: { from: location },
                }}
              />
            );
          case "failed":
            return (
              <Redirect
                to={{
                  pathname: "/auth/login",
                  state: { from: location },
                }}
              />
            );
          default:
            return (
              <Typography style={{ padding: "0.5rem" }}>
                Something is wrong
              </Typography>
            );
        }
      }}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.any,
  role: PropTypes.string,
};

export default PrivateRoute;
