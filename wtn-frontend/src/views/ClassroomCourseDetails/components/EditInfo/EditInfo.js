import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Box, FormLabel, Paper, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "1000px",
    padding: "1rem",
    margin: "auto",
  },
  form: {
    width: "100%",
  },
  submitBtn: {
    marginTop: "1rem",
    padding: "0.5rem 3rem",
  },
  m1: {
    margin: "0.5rem 0 1rem 0",
  },
}));

const Subscribers = props => {
  const { course, className, ...rest } = props;
  const [name, setName] = useState(course.name || "");
  const [description, setDescription] = useState("");

  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <form
        onSubmit={e => e.preventDefault()}
        className={classes.form}
        noValidate
        autoComplete="off">
        <FormLabel component="legend">Course's name</FormLabel>
        <TextField
          className={classes.m1}
          variant="outlined"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
        <FormLabel component="legend">Description</FormLabel>
        <TextField
          className={classes.m1}
          variant="outlined"
          multiline
          rows={4}
          onChange={e => setDescription(e.target.value)}
          fullWidth
        />
        <Button
          className={classes.submitBtn}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!name || name === course.name}>
          Save
        </Button>
      </form>
    </Paper>
  );
};

Subscribers.propTypes = {
  className: PropTypes.string,
  course: PropTypes.array.isRequired,
};

export default Subscribers;
