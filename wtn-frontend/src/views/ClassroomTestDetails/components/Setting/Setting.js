import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { FormLabel, Grid, TextField, Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "1000px",
    padding: "1rem",
    margin: "auto",
  },
  form: {
    width: "100%",
  },
  label: {
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    marginTop: "1rem",
    padding: "0.5rem 3rem",
  },
}));

const Setting = props => {
  const { course = {}, className, ...rest } = props;
  const [name, setName] = useState(course.name || "");

  const handleChange = e => {
    setName(e.target.value);
  };

  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <form
        onSubmit={e => e.preventDefault()}
        className={classes.form}
        noValidate
        autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel className={classes.label} component="legend">
              Name
            </FormLabel>
            <TextField
              variant="outlined"
              value={name}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel className={classes.label} component="legend">
              Start date
            </FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel className={classes.label} component="legend">
              Due date
            </FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

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

Setting.propTypes = {
  className: PropTypes.string,
  course: PropTypes.array.isRequired,
};

export default Setting;
