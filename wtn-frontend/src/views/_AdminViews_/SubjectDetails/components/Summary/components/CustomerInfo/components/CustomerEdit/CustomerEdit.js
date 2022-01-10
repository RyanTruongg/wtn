import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Button,
  colors,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { useSubjectDetailsContext } from "../../../../../../hooks/subject-details-context";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%",
  },
  container: {
    marginTop: theme.spacing(3),
  },
  actions: {
    justifyContent: "flex-end",
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    "&:hover": {
      backgroundColor: colors.green[900],
    },
  },
}));

const CustomerEdit = (props) => {
  const { open, onClose, customer, className, ...rest } = props;

  const classes = useStyles();
  const form = useForm();
  const { subjectDetails, updateSubject } = useSubjectDetailsContext();

  const onSubmit = async (data) => {
    await updateSubject(data);
    onClose();
  };

  if (!subjectDetails) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h3">
              Chỉnh sửa môn học
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Tên môn học</FormLabel>
                  <TextField
                    defaultValue={subjectDetails.name}
                    {...form.register("name")}
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Mô tả ngắn</FormLabel>
                  <TextField
                    defaultValue={subjectDetails.brief}
                    {...form.register("brief")}
                    fullWidth
                    variant="outlined"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Đề cương</FormLabel>
                    <TextField
                      defaultValue={subjectDetails.description}
                      {...form.register("description")}
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button onClick={onClose} variant="contained">
              Thoát
            </Button>
            <Button
              className={classes.saveButton}
              type="submit"
              variant="contained"
              disabled={form.formState.isSubmitting}
            >
              Lưu
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

CustomerEdit.displayName = "CustomerEdit";

CustomerEdit.propTypes = {
  className: PropTypes.string,
  customer: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

CustomerEdit.defaultProps = {
  open: false,
  onClose: () => {},
};

export default CustomerEdit;
