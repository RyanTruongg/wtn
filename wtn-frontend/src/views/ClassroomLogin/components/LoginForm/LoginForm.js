import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, Snackbar, TextField } from "@material-ui/core";
import { useAuth } from "hooks/use-auth";
import { Redirect } from "react-router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(14px, -10px) scale(0.75)",
      backgroundColor: "white",
      padding: "0 4px",
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

const LoginForm = (props) => {
  const { className, ...rest } = props;

  const [error, setError] = useState({ msg: "" });

  const classes = useStyles();
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const response = auth.login(data.email, data.password);

    response.catch((e) => {
      setError({ msg: e.response.data.detail });
    });
  };

  if (auth.authState === auth.status.AUTHENTICATED) {
    return <Redirect to="/classroom/home" />;
  }

  return (
    <React.Fragment>
      <form
        {...rest}
        autoComplete="off"
        className={clsx(classes.root, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={classes.fields}>
          <TextField
            error={errors.email ? true : false}
            fullWidth
            helperText={errors.email?.message}
            label="Email address"
            {...register("email")}
            variant="outlined"
          />
          <TextField
            error={errors.password ? true : false}
            fullWidth
            helperText={errors.password?.message}
            label="Password"
            {...register("password")}
            type="password"
            variant="outlined"
          />
        </div>
        <Button
          className={classes.submitButton}
          color="secondary"
          disabled={
            Object.keys(errors).length !== 0 ||
            auth.authState === auth.status.AUTHENTICATING ||
            auth.authState === auth.status.VERIFYING
          }
          size="large"
          type="submit"
          variant="contained"
        >
          Sign in
        </Button>
      </form>

      <Snackbar
        open={error.msg}
        autoHideDuration={6000}
        onClose={() => setError({ msg: "" })}
      >
        <Alert onClose={() => setError({ msg: "" })} severity="error">
          {error.msg}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
