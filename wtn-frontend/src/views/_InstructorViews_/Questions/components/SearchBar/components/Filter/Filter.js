import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Drawer } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    width: 420,
    maxWidth: "100%",
  },
  header: {
    padding: theme.spacing(2, 1),
    display: "flex",
    justifyContent: "space-between",
  },
  buttonIcon: {
    marginRight: theme.spacing(1),
  },
  content: {
    padding: theme.spacing(0, 3),
    flexGrow: 1,
  },
  actions: {
    padding: theme.spacing(3),
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const objectToQueryString = obj => {
  if (typeof obj !== "object") return "";
  let queryString = "";
  for (const key in obj) {
    queryString += key + "=" + obj[key] + "&";
  }
  return queryString.slice(0, -1);
};

const Filter = props => {
  const { open, onClose, onFilter, className, ...rest } = props;

  const classes = useStyles();

  const initialValues = {
    name: "asc",
    role: "student",
  };

  const [values, setValues] = useState({ ...initialValues });
  const history = useHistory();

  const handleClear = () => {
    setValues({ ...initialValues });
    history.replace(history.location.pathname);
  };

  const handleSubmit = event => {
    event.preventDefault();
    history.push("?" + objectToQueryString(values));
  };

  return (
    <Drawer
      anchor="right"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant="temporary">
      <form
        {...rest}
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit}>
        <Box className={classes.header}>
          <Button onClick={onClose} size="small">
            <CloseIcon className={classes.buttonIcon} />
            Close
          </Button>
        </Box>
        <Box className={classes.content}></Box>
        <Box className={classes.actions}>
          <Button fullWidth onClick={handleClear} variant="contained" yarn>
            <DeleteIcon className={classes.buttonIcon} />
            Clear
          </Button>
          <Button color="primary" fullWidth type="submit" variant="contained">
            Apply filters
          </Button>
        </Box>
      </form>
    </Drawer>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default Filter;
