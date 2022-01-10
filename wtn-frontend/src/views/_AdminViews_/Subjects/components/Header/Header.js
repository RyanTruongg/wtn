import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Button,
  FormLabel,
  FormControl,
  TextField,
  Modal,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import useToggle from "hooks/use-toggle";
import { useForm } from "react-hook-form";
import { useSubjectsContext } from "../../hooks/subjects-context";

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

const Header = (props) => {
  const { className, ...rest } = props;

  const modal = useToggle(false);
  const form = useForm();
  const classes = useStyles();

  const { addSubject } = useSubjectsContext();

  const onSubmit = async (data) => {
    await addSubject(data);
    form.reset();
    // modal.handleClose();
  };

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <Grid
          alignItems="flex-end"
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography component="h2" gutterBottom variant="overline">
              Quản lý
            </Typography>
            <Typography component="h1" variant="h3">
              Môn học
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={modal.handleOpen}
              color="primary"
              variant="contained"
            >
              Thêm môn học
            </Button>
          </Grid>
        </Grid>
      </div>

      <Modal
        className={classes.modal}
        open={modal.is_open}
        onClose={modal.handleClose}
      >
        <Card>
          <CardHeader
            title={<Typography variant="h2">Thêm môn học</Typography>}
          />
          <CardContent>
            <form
              className={classes.form}
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Tên môn học</FormLabel>
                    <TextField
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
                        {...form.register("description")}
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={form.formState.isSubmitting}
                  >
                    Thêm môn học
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
