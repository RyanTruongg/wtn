import React, { useState } from "react";
import {
  Box,
  Typography,
  FormLabel,
  TextField,
  Grid,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    maxWidth: "600px",
    borderRadius: "0.5rem",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0 1rem 0",
  },
  gutterBottom: {
    marginBottom: "0.75rem",
  },
  submitBtn: {
    padding: "0.5rem 3rem",
  },
}));

const AddSomeoneForm = props => {
  const classes = useStyles();
  const { handleClose, handleAddUser, ...rest } = props;
  const initialValues = {
    name: "",
    email: "",
    role: 1,
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddUser(values);
  };

  return (
    <Box {...rest} className={classes.root}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Add someone
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormLabel component="legend">User name</FormLabel>
            <TextField
              name="name"
              value={values.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Email</FormLabel>
            <TextField
              name="email"
              value={values.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel className={classes.gutterBottom} component="legend">
              Type
            </FormLabel>
            <TextField
              select
              name="role"
              value={values.role}
              onChange={handleChange}
              variant="outlined"
              fullWidth>
              <MenuItem value={1}>Student</MenuItem>
              <MenuItem value={2}>Teacher</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.submitBtn}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

AddSomeoneForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired,
};

export default AddSomeoneForm;
