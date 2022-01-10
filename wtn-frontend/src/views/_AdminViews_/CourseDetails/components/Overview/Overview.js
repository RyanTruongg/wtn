import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid } from "@material-ui/core";

import { TeacherList } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Overview = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Box {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TeacherList title="Giảng viên" />
        </Grid>
      </Grid>
    </Box>
  );
};

Overview.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired,
};

export default Overview;
