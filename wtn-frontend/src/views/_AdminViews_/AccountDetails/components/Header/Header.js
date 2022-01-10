import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { useAccountDetailsContext } from "../../hooks/account-details-context";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { accountDetails } = useAccountDetailsContext();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component="h2" gutterBottom variant="overline">
        Tài khoản
      </Typography>
      <Typography component="h1" variant="h3">
        {accountDetails.displayName || "Loading..."}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
