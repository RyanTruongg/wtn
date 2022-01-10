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
  Select,
  MenuItem,
} from "@material-ui/core";
import { useAccountDetailsContext } from "views/_AdminViews_/AccountDetails/hooks/account-details-context";
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
  const { accountDetails, updateAccount } = useAccountDetailsContext();

  const onSubmit = async (data) => {
    await updateAccount(data);
  };

  if (!accountDetails) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card {...rest} className={clsx(classes.root, className)}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <Typography align="center" gutterBottom variant="h3">
              Chỉnh sửa tài khoản
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Họ tên</FormLabel>
                  <TextField
                    defaultValue={accountDetails.displayName}
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
                  <FormLabel component="legend">Loại tài khoản</FormLabel>
                  <Select
                    {...form.register("role")}
                    defaultValue={accountDetails.customClaims?.role}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"instructor"}>Giảng viên</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">Loại tài khoản</FormLabel>
                    <Select>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid> */}
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
