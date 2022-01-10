import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    // marginBottom: "1rem",
  },
}));

const Header = props => {
  const { className, openAddTestModal, ...rest } = props;
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Tests
          </Typography>
        </Grid>
        <Grid item>
          <Button
            onClick={openAddTestModal}
            color="primary"
            variant="contained">
            Add test
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  openAddTestModal: PropTypes.func.isRequired,
};

export default Header;
