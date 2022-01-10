import React, { Suspense } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";

import { NavBar } from "./components";
import TopBar from "../TopBar";
import PrivateRoute from "hooks/PrivateRoute";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  topBar: {
    zIndex: 2,
    position: "relative",
  },
  container: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: "0 0 auto",
  },
  content: {
    overflowY: "auto",
    flex: "1 1 auto",
  },
}));

const Admin = (props) => {
  const { route } = props;

  const classes = useStyles();

  return (
    <PrivateRoute role="admin">
      <div className={classes.root}>
        <TopBar className={classes.topBar} />
        <div className={classes.container}>
          <NavBar className={classes.navBar} />
          <main className={classes.content}>
            <Suspense fallback={<LinearProgress />}>
              {renderRoutes(route.routes)}
            </Suspense>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
};

Admin.propTypes = {
  route: PropTypes.object,
};

export default Admin;
