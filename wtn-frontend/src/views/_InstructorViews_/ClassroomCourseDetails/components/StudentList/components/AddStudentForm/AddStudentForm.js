import React, { useState } from "react";
import { Box, FormLabel, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: theme.spacing(3),
    width: "600px",
    borderRadius: "0.5rem",
    backgroundColor: "white",
  },
  submitBtn: {
    padding: "0.5rem 3rem",
  },
  textField: {
    margin: "0.5rem 0 1rem 0",
  },
}));

const AddStudentForm = props => {
  const classes = useStyles();
  const { handleClose, handleSubmit } = props;
  const [email, setEmail] = useState("");

  const handleChange = e => {
    setEmail(e.target.value);
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Add student
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit || (e => e.preventDefault())}>
        <FormLabel component="legend">Student's email</FormLabel>
        <TextField
          className={classes.textField}
          value={email}
          onChange={handleChange}
          multiline
          rows={2}
          variant="outlined"
          fullWidth
        />
        <Button
          className={classes.submitBtn}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth>
          Add
        </Button>
      </form>
    </Box>
  );
};

AddStudentForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddStudentForm;
