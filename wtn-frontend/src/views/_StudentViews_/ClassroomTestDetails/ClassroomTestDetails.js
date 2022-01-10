import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useParams, useHistory } from "react-router";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab, Divider, colors } from "@material-ui/core";

import { Page } from "components";
import { QuestionList } from "./components";

import { Header, Setting } from "./components";

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
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const mockCourseDetails = {};
    setCourse(mockCourseDetails);
  }, []);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: "questions", label: "Questions" },
    { value: "setting", label: "Setting" },
  ];

  if (!tab) {
    return <Redirect to={`/classroom/tests/${id}/questions`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!course) {
    return null;
  }

  return (
    <Page className={classes.root} title="Test Details">
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
        {tab === "questions" && <QuestionList />}
        {tab === "setting" && <Setting />}
      </div>
    </Page>
  );
};

ClassroomCourseDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default ClassroomCourseDetails;
