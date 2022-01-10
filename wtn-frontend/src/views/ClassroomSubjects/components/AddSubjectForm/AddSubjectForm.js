import React, { useState } from "react";
import { Box, Typography, FormLabel, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    padding: theme.spacing(3),
    maxWidth: "500px",
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

const AddSubjectForm = props => {
  const classes = useStyles();
  const { handleClose, handleSubmit } = props;
  const [name, setName] = useState("");

  const handleChange = e => {
    setName(e.target.value);
  };

  const tmpSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(name));
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Add subject
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={tmpSubmit}>
        <FormLabel component="legend">Subject name</FormLabel>
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

export default AddSubjectForm;
