import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Page } from "components";
import { Header, Results } from "./components";
import clsx from "clsx";
import { QuestionsProvider } from "./hooks/questions-context";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    minWidth: "1000px",
  },
  results: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "grid",
    placeItems: "center",
  },
}));

const Questions = (props) => {
  const { headless, className, ...rest } = props;
  const classes = useStyles();

  return (
    <QuestionsProvider>
      <Page
        {...rest}
        className={clsx(classes.root, className)}
        title="Ngân hàng câu hỏi"
      >
        {!headless && <Header />}
        <Results className={classes.results} />
      </Page>
    </QuestionsProvider>
  );
};

export default Questions;
