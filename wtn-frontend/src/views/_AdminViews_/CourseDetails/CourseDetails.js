import React from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Divider, colors } from "@material-ui/core";

import { Page } from "components";
import { Header, Overview, StudentList, EditInfo } from "./components";
import { CourseDetailsProvider } from "./hooks/course-details-context";

const useStyles = makeStyles((theme) => ({
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

const CourseDetails = (props) => {
  const classes = useStyles();
  const { id, tab } = useParams();
  const history = useHistory();

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: "overview", label: "Tổng quan" },
    { value: "students", label: "Học viên" },
    { value: "edit-info", label: "Thông tin" },
  ];

  if (!tab) {
    return <Redirect to={`/admin/courses/${id}/overview`} />;
  }

  if (!tabs.find((t) => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  return (
    <CourseDetailsProvider courseId={id}>
      <Page className={classes.root} title="Course Details">
        <Header />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        <div className={classes.content}>
          {tab === "overview" && <Overview />}
          {tab === "students" && <StudentList />}
          {tab === "edit-info" && <EditInfo />}
        </div>
      </Page>
    </CourseDetailsProvider>
  );
};

CourseDetails.propTypes = {};

export default CourseDetails;
