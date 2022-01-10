import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { CourseList } from "./components";
import { Page, UpcomingTestList } from "components";
import { CourseServices, ExamServices } from "services";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  header: {
    marginBottom: "2rem",
  },
  mb: {
    marginBottom: "1rem",
  },
}));

const ClassroomHome = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState({ data: [], status: "pending" });
  const [tests, setTests] = useState({ data: [], status: "pending" });

  useEffect(() => {
    CourseServices.getCourseList(0, 3)
      .then((res) => setCourses({ data: res.data, status: "success" }))
      .catch(() => setCourses({ data: [], status: "failed" }));
  }, []);

  useEffect(() => {
    ExamServices.getExamList(0, 3)
      .then((res) => setTests({ data: res.data, status: "success" }))
      .catch(() => setCourses({ data: [], status: "failed" }));
  }, []);

  return (
    <Page className={classes.root} title="Home">
      <Typography className={classes.header} color="primary" variant="h2">
        Home
      </Typography>
      <UpcomingTestList
        className={classes.mb}
        title="Upcoming test"
        tests={tests}
      />
      <CourseList title="Courses" courses={courses} />
    </Page>
  );
};

export default ClassroomHome;
