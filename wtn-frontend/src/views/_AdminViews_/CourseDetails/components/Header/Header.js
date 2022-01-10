import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, colors } from "@material-ui/core";
import { useCourseDetailsContext } from "../../hooks/course-details-context";

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    marginTop: theme.spacing(1),
  },
  shareButton: {
    marginRight: theme.spacing(2),
  },
  shareIcon: {
    marginRight: theme.spacing(1),
  },
  applyButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
}));

const Header = (props) => {
  const { course, className, ...rest } = props;

  const classes = useStyles();
  const { courseDetails } = useCourseDetailsContext();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Khóa học
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            {courseDetails.name}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired,
};

Header.defaultProps = {};

export default Header;
