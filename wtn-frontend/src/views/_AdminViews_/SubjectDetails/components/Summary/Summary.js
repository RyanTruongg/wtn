import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import { CustomerInfo, OtherActions } from "./components";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Summary = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item lg={4} md={6} xl={3} xs={12}>
        <CustomerInfo />
      </Grid>

      <Grid item lg={4} md={6} xl={3} xs={12}>
        <OtherActions />
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  className: PropTypes.string,
};

export default Summary;
