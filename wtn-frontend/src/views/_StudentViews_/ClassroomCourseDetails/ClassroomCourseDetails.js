import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Divider, colors } from "@material-ui/core";

import { Page } from "components";
import {
  Header,
  Overview,
  StudentList,
  TestList,
  EditInfo,
} from "./components";

import axios from "utils/axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    margin: "0 auto",
    padding: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[400],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const ClassroomCourseDetails = props => {
  const classes = useStyles();
  const { id, tab } = useParams();
  const history = useHistory();

  const init = {
    name: "12A1",
    teachers: [],
    students: [],
    tests: [],
  };
  const [course, setCourse] = useState(init);

  useEffect(() => {
    let mounted = true;
    axios.get("/api/classroom/tests").then(res => {
      if (mounted) setCourse(course => ({ ...course, tests: res.data.tests }));
    });

    axios.get("/api/classroom/teachers").then(res => {
      if (mounted)
        setCourse(course => ({ ...course, teachers: res.data.teachers }));
    });

    axios.get("/api/classroom/students").then(res => {
      if (mounted)
        setCourse(course => ({ ...course, students: res.data.students }));
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "students", label: "Students" },
    { value: "tests", label: "Tests" },
    { value: "edit-info", label: "Edit Info" },
  ];

  if (!tab) {
    return <Redirect to={`/classroom/courses/${id}/overview`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!course) {
    return null;
  }

  return (
    <Page className={classes.root} title="Course Details">
      <Header course={course} />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable">
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      <div className={classes.content}>
        {tab === "overview" && <Overview course={course} />}
        {tab === "students" && <StudentList students={course.students} />}
        {tab === "tests" && <TestList tests={course.tests} />}
        {tab === "edit-info" && <EditInfo course={course} />}
      </div>
    </Page>
  );
};

ClassroomCourseDetails.propTypes = {};

export default ClassroomCourseDetails;
