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
    backgroundImage: 'url(/static/images/thalappakatti.jpg)',
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

const ResetPassword = props => {
  const classes = useStyles();

  const [showError, setshowError] = useState('');
  const [redirectLogin, setRedirectLogin] = useState(false);

  async function verifyPassword(values) {
    {
      setshowError(false);
      try {
        const obj = {
          password: values.password,
          otp: values.otp,
          email: props.location.state.email
        };
        props.history.push({
          pathname: '/auth/login',
          state: {
            message: 'Password Reset Successful. Please login to continue'
          }
        });
        await Axios.patch('/user/reset-password', obj);
        setRedirectLogin(true);
      } catch (error) {
        if (error.response && error.response.status === 503) {
          setshowError('Invalid OTP');
        } else {
          setshowError('Some Error Occured. Please try again');
        }
      }
    }
  }

  const errorStrings = {
    ERR_REQ: 'This Field is Required'
  };

  const PasswordSchema = yup.object({
    password: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .min(8)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Must Contain At least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    confirmPassword: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .min(8)
      .test('passwords-match', 'Passwords must match', function(value) {
        return this.parent.password === value;
      }),
    otp: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .min(6)
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
              {redirectLogin ? (
                <Redirect
                  to={{
                    pathname: '/auth/login'
                  }}
                />
              ) : (
                <div>
                  {showError && <ErrorComponent message={showError} />}
                  <Formik
                    initialValues={{
                      otp: '',
                      password: '',
                      confirmPassword: ''
                    }}
                    validationSchema={PasswordSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setSubmitting(false);
                      verifyPassword(values);
                    }}
                  >
                    {() => (
                      <Form>
                        <Field
                          name="otp"
                          component={TextField}
                          type="text"
                          style={{ width: 400 }}
                          label="Please enter OTP"
                          margin="normal"
                          variant="outlined"
                          disabled={false}
                          autoComplete="off"
                        />
                        <Field
                          name="password"
                          component={TextField}
                          type="password"
                          style={{ width: 400 }}
                          label="Enter Password"
                          margin="normal"
                          variant="outlined"
                          disabled={false}
                          autoComplete="off"
                        />
                        <Field
                          name="confirmPassword"
                          component={TextField}
                          style={{ width: 400 }}
                          label="Confirm Password"
                          type="password"
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
                            Change Password
                          </Button>
                        </Box>
                      </Form>
                    )}
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
