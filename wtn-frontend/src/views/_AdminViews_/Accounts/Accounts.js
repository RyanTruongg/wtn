import React from "react";
import { makeStyles } from "@material-ui/styles";

import { Page } from "components";
import { Header, Results } from "./components";
import { AccountsProvider } from "./hooks/account-context";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ClassroomPeople = () => {
  const classes = useStyles();

  return (
    <AccountsProvider>
      <Page className={classes.root} title="Quản lý tài khoản">
        <Header />
        {<Results className={classes.results} />}
      </Page>
    </AccountsProvider>
  );
};

export default ClassroomPeople;
