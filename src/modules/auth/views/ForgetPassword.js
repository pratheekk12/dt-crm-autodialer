import React, { useState } from 'react';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import ErrorComponent from '../utils/ErrorComponent';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(/static/images/indusviva.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  imageWrapper: {
    background:
      'linear-gradient(45eg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.15))',
    height: '100%',
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  avatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const ForgetPassword = () => {
  const classes = useStyles();

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showError, setshowError] = useState('');
  const [email, setEmail] = useState('');

  async function sendPasswordRecoveryMail(values) {
    setshowError(false);
    try {
      const obj = {
        email: values.email
      };
      await Axios.post('/user/forget-password', obj);
      setEmail(values.email);
      setShowResetPassword(true);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 412 || error.response.status === 503)
      ) {
        setshowError("Email Id doesn't exist");
      } else {
        setshowError('Some Error Occured. Please try again');
      }
    }
  }

  const emailSchema = yup.object({
    email: yup
      .string()
      .required('Email Required !')
      .email()
  });

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image}>
          <div className={classes.imageWrapper} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          component={Paper}
          elevation={6}
          square
          style={{ display: 'flex' }}
        >
          <div className={`${classes.paper}`}>
            <div>
              <div className={classes.avatarWrapper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Password Recovery
                </Typography>
              </div>
              {!showResetPassword ? (
                <div>
                  {showError && <ErrorComponent message={showError} />}
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={emailSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      sendPasswordRecoveryMail(values);
                    }}
                  >
                    {() => (
                      <Form>
                        <Field
                          name="email"
                          component={TextField}
                          type="email"
                          style={{ width: 400 }}
                          label="Please enter Email"
                          margin="normal"
                          variant="outlined"
                          disabled={false}
                          autoComplete="off"
                        />
                        <Box my={2} mt={3}>
                          <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Verify Email
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </div>
              ) : (
                <Redirect
                  to={{
                    pathname: '/auth/reset-password',
                    state: { email: email }
                  }}
                />
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgetPassword;
