import React from "react";
import PropTypes from "prop-types";
import { Page } from "components";
import { makeStyles } from "@material-ui/styles";
import gradients from "utils/gradients";
import { Card, CardContent, Divider, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { ResetPasswordForm } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 2),
  },
  card: {
    width: theme.breakpoints.values.sx,
    maxWidth: "100%",
    overflow: "unset",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },

  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: "absolute",
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32,
  },
  loginForm: {
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  person: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

function RecoveryPassword(props) {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Recovery password">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            Reset password
          </Typography>
          <ResetPasswordForm className={classes.loginForm} />
          <Divider className={classes.divider} />
        </CardContent>
      </Card>
    </Page>
  );
}

RecoveryPassword.propTypes = {};

export default RecoveryPassword;
