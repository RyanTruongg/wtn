import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { FormLabel, Paper, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useCourseDetailsContext } from "../../hooks/course-details-context";
import { useForm } from "react-hook-form";
import { ErrorButton } from "components";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "1000px",
    padding: "1rem",
    margin: "auto",
  },
  form: {
    width: "100%",
  },
  btn: {
    marginTop: "1rem",
    padding: "0.5rem 3rem",
  },
  m1: {
    margin: "0.5rem 0 1rem 0",
  },
}));

const Subscribers = (props) => {
  const { course, className, ...rest } = props;
  const form = useForm();
  const {
    courseDetails,
    updateCourse,
    deleteCourse,
  } = useCourseDetailsContext();
  const classes = useStyles();

  const onSubmit = async (data) => {
    await updateCourse(data);
  };

  useEffect(() => {
    form.setValue("name", courseDetails.name);
  }, [courseDetails, form]);

  if (!courseDetails) {
    return null;
  }
  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <FormLabel component="legend">Tên khóa học</FormLabel>
        <TextField
          className={classes.m1}
          variant="outlined"
          defaultValue={courseDetails.name}
          {...form.register("name")}
          fullWidth
        />

        <Button
          className={classes.btn}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={form.formState.isSubmitting}
        >
          Lưu thay đổi
        </Button>
        <ErrorButton onClick={deleteCourse} fullWidth className={classes.btn}>
          Xóa khóa học
        </ErrorButton>
      </form>
    </Paper>
  );
};

Subscribers.propTypes = {
  className: PropTypes.string,
  course: PropTypes.array.isRequired,
};

export default Subscribers;
