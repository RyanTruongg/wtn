import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { Page } from "components";
import { Header, Results } from "./components";
import { SubjectsProvider } from "./hooks/subjects-context";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "grid",
    placeItems: "center",
  },
}));

const Subjects = () => {
  const classes = useStyles();

  const [subjects, setSubjects] = useState([]);

  return (
    <SubjectsProvider>
      <Page className={classes.root} title="Quản lý môn học">
        <Header />
        {subjects && (
          <Results className={classes.results} subjects={subjects} />
        )}
      </Page>
    </SubjectsProvider>
  );
};

export default Subjects;
