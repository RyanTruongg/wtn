import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Typography,
  Button,
  Modal,
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import useToggle from "hooks/use-toggle";
import { useForm } from "react-hook-form";
import { useAccountContext } from "../../hooks/account-context";

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
  const { className, openAddSomeoneModal, ...rest } = props;
  const modal = useToggle(false);
  const form = useForm();

  const { addAccount } = useAccountContext();

  const onSubmit = async (data) => {
    await addAccount(data);
    form.reset();
    modal.handleClose();
  };

  const classes = useStyles();

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
              Tài khoản
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={modal.handleOpen}
              color="primary"
              variant="contained"
            >
              Thêm tài khoản
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
            title={<Typography variant="h2">Thêm tài khoản</Typography>}
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
                    <FormLabel component="legend">Họ tên</FormLabel>
                    <TextField
                      {...form.register("displayName")}
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
                    <FormLabel component="legend">Email</FormLabel>
                    <TextField
                      {...form.register("email")}
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
                      <FormLabel component="legend">Mật khẩu</FormLabel>
                      <TextField
                        type="password"
                        {...form.register("password")}
                        fullWidth
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Loại tài khoản</FormLabel>
                    <Select {...form.register("role")}>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"instructor"}>Giảng viên</MenuItem>
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
      </Modal>
    </>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
