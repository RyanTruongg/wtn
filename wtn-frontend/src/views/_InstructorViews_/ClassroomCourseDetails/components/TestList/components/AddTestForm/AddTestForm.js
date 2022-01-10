import React from "react";
import { Box, FormLabel, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { FilesDropzone } from "components";

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
  label: {
    marginBottom: theme.spacing(1),
  },
  submitBtn: {
    float: "right",
    marginTop: "1rem",
    padding: "0.5rem 3rem",
  },
}));

const AddTestForm = props => {
  const classes = useStyles();
  const { handleClose, handleSubmit } = props;
  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Add test
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={handleSubmit || (e => e.preventDefault())}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel className={classes.label} component="legend">
              Test name
            </FormLabel>
            <TextField
              variant="filled"
              // value={name}
              // onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel className={classes.label} component="legend">
              Start date
            </FormLabel>
            <TextField
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel className={classes.label} component="legend">
              End date
            </FormLabel>
            <TextField
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormLabel className={classes.label} component="legend">
              Questions image
            </FormLabel>
            <FilesDropzone />
          </Grid>
        </Grid>
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

AddTestForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddTestForm;
