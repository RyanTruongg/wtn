import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, colors } from "@material-ui/core";

import { Page } from "components";
import { Header, Summary } from "./components";

import { AccountDetailsProvider } from "./hooks/account-details-context";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  tabs: {
    marginTop: theme.spacing(3),
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const AccountDetails = (props) => {
  const { match } = props;
  const classes = useStyles();
  const { id } = match.params;

  return (
    <AccountDetailsProvider userId={id}>
      <Page className={classes.root} title="Customer Management Details">
        <Header />

        <Divider className={classes.divider} />
        <div className={classes.content}>
          <Summary />
        </div>
      </Page>
    </AccountDetailsProvider>
  );
};

AccountDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default AccountDetails;
