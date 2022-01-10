import React, { useState } from "react";
import { Box, Typography, TextField, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  content: {
    padding: theme.spacing(2),
    maxWidth: "600px",
    borderRadius: "0.5rem",
    backgroundColor: "white",
  },
  textField: {
    margin: "0.5rem 0 1rem 0",
  },
  submitBtn: {
    padding: "0.5rem 3rem",
  },
}));

const AddCourseForm = props => {
  const classes = useStyles();
  const { handleClose, handleAddCourse, ...rest } = props;
  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddCourse(name);
  };

  return (
    <Box {...rest} className={classes.content}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Add course
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormLabel component="legend">Course's name</FormLabel>
        <TextField
          className={classes.textField}
          value={name}
          onChange={handleChange}
          multiline
          rows={4}
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

AddCourseForm.propsType = {
  handleClose: PropTypes.func.isRequired,
  handleAddCourse: PropTypes.func.isRequired,
};

export default AddCourseForm;
