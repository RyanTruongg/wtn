import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

import { Page } from 'components';
import gradients from 'utils/gradients';
import { LoginForm } from './components';
import { useAuth } from 'hooks/use-auth';
import { Redirect } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },

  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  }
}));

const Login = () => {
  const classes = useStyles();
  const auth = useAuth();

  if (auth.authState === 'success') {
    return (
      <Redirect to={auth.user?.role ? '/' + auth.user?.role : '/student'} />
    );
  }

  if (auth.authState === 'pending') {
    return (
      <Typography align="center" variant="body2">
        Authenticating
      </Typography>
    );
  }

  return (
    <Page className={classes.root} title="Đăng nhập">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            Đăng nhập
          </Typography>
          <Typography variant="subtitle2">Truy cập vào hệ thống</Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
        </CardContent>
      </Card>
    </Page>
  );
};

export default Login;
