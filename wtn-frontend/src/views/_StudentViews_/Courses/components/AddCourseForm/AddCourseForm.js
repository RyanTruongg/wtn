import React from "react";
import {
  Typography,
  TextField,
  FormLabel,
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useCourseContext } from "../../hooks/course-context";

const useStyles = makeStyles(() => ({
  root: {},
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    maxWidth: "600px",
  },
}));

const AddCourseForm = (props) => {
  const classes = useStyles();
  const { handleClose, ...rest } = props;
  const form = useForm();
  const { addCourse, instructors } = useCourseContext();

  const onSubmit = async (data) => {
    await addCourse(data);
    form.reset();
    handleClose();
  };

  return (
    <Card {...rest}>
      <CardHeader title={<Typography variant="h2">Thêm khóa học</Typography>} />
      <CardContent>
        <form
          className={classes.form}
          onSubmit={form.handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <FormLabel component="legend">Tên khóa học</FormLabel>
                <TextField
                  {...form.register("name")}
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <FormLabel component="legend">Giảng viên</FormLabel>
                <Select
                  disabled={instructors.length <= 0}
                  {...form.register("instructor_id")}
                >
                  {instructors.map((instructor) => (
                    <MenuItem key={instructor.uid} value={instructor.uid}>
                      {instructor.displayName}
                    </MenuItem>
                  ))}
                  {instructors.length <= 0 && (
                    <MenuItem selected disabled value={null}>
                      Không có giảng viên
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={form.formState.isSubmitting}
              >
                Thêm
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

AddCourseForm.propsType = {};

export default AddCourseForm;
