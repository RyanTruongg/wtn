import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/core";
import { Results, Header } from "./components";
import { StudentInCoursesProvider } from "./hooks/student-list-context";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "grid",
    placeItems: "center",
  },
  files: {
    marginTop: theme.spacing(3),
  },
}));

const StudentList = (props) => {
  const { students, className, ...rest } = props;

  const classes = useStyles();

  return (
    <StudentInCoursesProvider>
      <Box {...rest} className={clsx(classes.root, className)}>
        <Header />
        <Results />
      </Box>
    </StudentInCoursesProvider>
  );
};

StudentList.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired,
};

export default StudentList;
