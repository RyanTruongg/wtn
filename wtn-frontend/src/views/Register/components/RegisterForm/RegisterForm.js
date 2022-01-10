import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  policy: {
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const schema = yup
  .object({
    fullName: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

const RegisterForm = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className={classes.fields}>
        <TextField
          error={errors.fullName ? true : false}
          helperText={errors.fullName?.message}
          label="Full Name"
          {...register("fullName")}
          variant="outlined"
        />
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
          name="password"
          {...register("password")}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
      >
        Create account
      </Button>
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string,
};

export default RegisterForm;
