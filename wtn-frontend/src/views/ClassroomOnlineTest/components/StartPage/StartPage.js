import React from "react";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(10),
    "&.MuiGrid-spacing-xs-4": {
      margin: "2rem 0 0 0",
    },
  },
}));

const StartPage = props => {
  const classes = useStyles();
  const { test, ended } = props;

  return (
    <Grid
      className={classes.root}
      container
      spacing={4}
      justifyContent="center"
      alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h1">{test.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" variant="h3">
          Subject: {test.subject}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography color="textSecondary" variant="h3">
          Start date: {new Date(test.start).toLocaleString()}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography color="textSecondary" variant="h3">
          End date: {new Date(test.end).toLocaleString()}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography color="textSecondary" variant="button">
          {ended ? "Ended" : "Hasn't started yet"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StartPage;
