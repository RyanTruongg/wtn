import React from "react";
import { Card, Typography, Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import { Skeleton, CourseCard } from "components";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
  },
  mb: {
    marginBottom: "0.5rem",
  },
  linkWraper: {
    display: "flex",
    justifyContent: "flex-end",
    "& > a": {
      marginRight: "1rem",
    },
  },
}));

const OverviewCard = (props) => {
  const { className, title, courses = { data: [], status: "pending" } } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Typography color="secondary" gutterBottom component="h3" variant="h3">
        {title}
      </Typography>

      {courses.status === "pending" && (
        <Grid container spacing={2}>
          <Skeleton variant="card" height={"210px"} count={3} />
        </Grid>
      )}

      {courses.status === "success" && (
        <Grid className={classes.mb} container spacing={2}>
          {courses.data.map((course) => (
            <Grid item xs={12} sm={6} md={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}

      {courses.status === "failed" && (
        <Alert severity="error" className={classes.mb}>
          This is an error alert — check it out!
        </Alert>
      )}

      <div className={classes.linkWraper}>
        <Link
          color="secondary"
          component={RouterLink}
          to="/classroom/courses"
          underline="always"
          variant="subtitle2"
        >
          And {courses.data.length} more
        </Link>
      </div>
    </Card>
  );
};

export default OverviewCard;
