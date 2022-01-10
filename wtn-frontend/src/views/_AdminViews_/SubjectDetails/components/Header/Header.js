import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import { useSubjectDetailsContext } from "../../hooks/subject-details-context";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { subjectDetails } = useSubjectDetailsContext();
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component="h2" gutterBottom variant="overline">
        Môn học
      </Typography>
      <Typography component="h1" variant="h3">
        {subjectDetails.name || "Loading..."}
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
