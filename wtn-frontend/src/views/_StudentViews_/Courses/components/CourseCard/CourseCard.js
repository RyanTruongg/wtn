import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";

const StyledCardHeader = withStyles((theme) => ({
  root: {
    padding: "0 1rem",
  },
  title: {
    color: "white",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "24px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  content: {
    overflow: "hidden",
  },
  subheader: {
    marginTop: "8px",
    color: "white",
    whiteSpace: "nowrap",
  },
}))(CardHeader);

const useStyles = makeStyles((theme) => ({
  content: {
    height: 140,
    padding: theme.spacing(2),
    "& > *": {
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  cardHeader: {
    height: 68,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    fontSize: "64px",
    color: "white",
  },
  link: {
    "&:hover *": {
      textDecoration: "underline",
    },
  },
}));

const CourseCard = (props) => {
  const { className, course, ...rest } = props;
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Link to={`/student/courses/${course.id}`}>
        <CardActionArea>
          <StyledCardHeader
            title={course.name}
            subheader={"GV: " + course.instructor?.displayName}
            className={classes.cardHeader}
            component="div"
          />
        </CardActionArea>
      </Link>
      <CardContent className={classes.content}>
        {course.tests &&
          course.tests.map((test) => (
            <Link
              className={classes.link}
              to={"/classroom/online-test/" + test.id}
            >
              <Typography
                color="textSecondary"
                variant="subtitle2"
                gutterBottom
              >
                {test.name}
              </Typography>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
};

CourseCard.propTypes = {
  className: PropTypes.string,
  course: PropTypes.object.isRequired,
};

export default CourseCard;
