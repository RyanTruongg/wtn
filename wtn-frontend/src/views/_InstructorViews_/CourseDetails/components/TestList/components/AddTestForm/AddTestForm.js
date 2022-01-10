import React from "react";
import { Box, FormLabel, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useCourseDetailsContext } from "../../../../hooks/course-details-context";
import { useTestContext } from "../../hooks/test-list-context";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(4),
    padding: "0.5rem 3rem",
  },
}));

const AddTestForm = (props) => {
  const classes = useStyles();

  const form = useForm();
  const { handleClose } = props;

  const { addTest } = useTestContext();
  const { courseDetails } = useCourseDetailsContext();

  const onSubmit = async (data) => {
    await addTest({ ...data, course_id: courseDetails.id });
    handleClose();
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.header}>
        <Typography component="h4" variant="h4">
          Thêm bài kiểm tra
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel className={classes.label} component="legend">
              Tên bài kiểm tra
            </FormLabel>
            <TextField
              variant="outlined"
              {...form.register("name")}
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel className={classes.label} component="legend">
              Bắt đầu
            </FormLabel>
            <TextField
              type="datetime-local"
              className={classes.textField}
              {...form.register("start_time")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormLabel className={classes.label} component="legend">
              Kết thúc
            </FormLabel>
            <TextField
              {...form.register("end_time")}
              type="datetime-local"
              className={classes.textField}
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
        >
          Thêm
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
