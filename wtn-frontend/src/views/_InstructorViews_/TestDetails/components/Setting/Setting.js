import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { FormLabel, Grid, TextField, Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useTestsDetailsContext } from "../../hooks/test-details-context";
import { useForm } from "react-hook-form";
import { ErrorButton } from "components";

const useStyles = makeStyles((theme) => ({
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

const Setting = (props) => {
  const { className, ...rest } = props;
  const form = useForm();
  const { testDetails, updateTest, deleteTest } = useTestsDetailsContext();

  const classes = useStyles();

  React.useEffect(() => {
    if (testDetails) {
      form.setValue("name", testDetails.name);
      form.setValue("start_time", String(testDetails.start_time).slice(0, -1));
      form.setValue("end_time", String(testDetails.end_time).slice(0, -1));
      form.setValue("duration", testDetails.duration);
    }
  }, [form, testDetails]);

  const now = Date.now();
  const ended = Date.parse(testDetails.end_time) < now;
  const started = Date.parse(testDetails.start_time) < now;

  const onSubmit = async (data) => {
    await updateTest(data);
  };

  return (
    <Paper {...rest} className={clsx(classes.root, className)}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel className={classes.label} component="legend">
              Tên bài kiểm tra
            </FormLabel>
            <TextField
              variant="outlined"
              className={classes.textField}
              fullWidth
              {...form.register("name")}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.label} component="legend">
              Bắt đầu
            </FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              {...form.register("start_time")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.label} component="legend">
              Kết thúc
            </FormLabel>
            <TextField
              fullWidth
              type="datetime-local"
              {...form.register("end_time")}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormLabel className={classes.label} component="legend">
              Thời gian làm bài
            </FormLabel>
            <TextField
              fullWidth
              type="number"
              {...form.register("duration")}
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
          disabled={ended || started}
        >
          Lưu
        </Button>

        <ErrorButton
          className={classes.submitBtn}
          variant="contained"
          fullWidth
          onClick={() => deleteTest()}
          disabled={ended || started}
        >
          Xóa bài kiểm tra
        </ErrorButton>
      </form>
    </Paper>
  );
};

Setting.propTypes = {
  className: PropTypes.string,
  course: PropTypes.array.isRequired,
};

export default Setting;
