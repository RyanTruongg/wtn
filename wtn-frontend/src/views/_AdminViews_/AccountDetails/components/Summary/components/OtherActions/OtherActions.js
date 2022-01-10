import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/RemoveCircle";
import { useAccountDetailsContext } from "views/_AdminViews_/AccountDetails/hooks/account-details-context";

const useStyles = makeStyles((theme) => ({
  root: {},

  deleteButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  enableButton: {
    marginTop: theme.spacing(1),
    color: theme.palette.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
}));
const OtherActions = (props) => {
  const { className, ...rest } = props;
  const { accountDetails, updateAccount } = useAccountDetailsContext();
  const classes = useStyles();

  const disableAccount = async () => {
    await updateAccount({ disabled: true });
  };

  const enableAccount = async () => {
    await updateAccount({ disabled: false });
  };

  if (!accountDetails) {
    return null;
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Tác vụ khác" />
      <Divider />
      <CardContent>
        {accountDetails.disabled ? (
          <Button onClick={enableAccount} className={classes.enableButton}>
            <DeleteIcon className={classes.buttonIcon} />
            Kích hoạt tài khoản
          </Button>
        ) : (
          <Button onClick={disableAccount} className={classes.deleteButton}>
            <DeleteIcon className={classes.buttonIcon} />
            Vô hiệu hóa tài khoản
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

OtherActions.propTypes = {
  className: PropTypes.string,
};

export default OtherActions;
