import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import Axios from 'axios';
import {
  setLoggedIn,
  setUserDetails,
  setAccessLevels,
  setAccountType
} from '../../../redux/action';
import { CRUD_LOGIN } from '../utils/endpoints';
import { ADMIN, AREAMANAGER, MANAGER, USER } from 'src/redux/constants';
import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://thalappakatti.com/">
        Thalappakatti
      </Link>{' '}
      {2021}
      {'.'}
    </Typography>
  );
}

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

function Login(props) {
  const {
    setAccess,
    setUserDetailsMain,
    setLoggedInMain,
    setAccountTypeMain
  } = props;
  const classes = useStyles();
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  async function authenticate(values) {
    setError('');
    try {
      const res = await Axios.post(CRUD_LOGIN, values);
      const obj = res.data.userObj || res.data.userDetails;

      console.log(obj,"login api")

      if(obj.role === 'DTL1'){
        
        localStorage.setItem('AgentSIPID1', '1010');
        localStorage.setItem('Queue','5003')
        localStorage.setItem('Agent_Object_ID', '60b5d2a3918b902ed36bc536')

        // const data2 = 

        // axios.post(`http://192.168.3.36:5555/api/login`, data2)
        // .then((res) => {
        //   console.log(res)
        // }
        const data1 =''
        var config = {
          method: 'get',
          url: `http://192.168.4.44:62002/ami/actions/addq?Queue=${5003}&Interface=${res.data.sip_id}`,
          headers: {},
          data: data1
        };


        axios(config)
          .then(function (response) {
            console.log(response.data, "queue addedd");
          })
          .catch(function (error) {
            console.log(error, "error in adding queue");
          });

          var data3 ={
            "Event": "LoggedIn"
          }
          axios.put(`http://192.168.4.44:62001/api/agents/${localStorage.getItem('Agent_Object_ID')}`,data3)
            .then((response)=>{
              console.log(response)
            })
            .catch((err)=>{
              console.log(err)
            })

       

        const AgentSIPID = localStorage.getItem('AgentSIPID1')
        //var axios = require('axios');
        var config = {
          method: 'get',
          url: `http://192.168.4.44:62002/ami/actions/break?Queue=${5003}&Interface=SIP%2F${AgentSIPID}&Reason=BREAK_OUT&Break=false`,
          headers: {}
        };

        axios(config)
          .then(function (response) {
            console.log((response.data));

          })
          .catch(function (error) {
            console.log(error);
          });

      
        
        

      }

      setUserDetailsMain(obj);
      setAccess(obj.permissions);
      setLoggedInMain(true);
      setError(false);
    } catch (err) {
      console.log(err);
      setLoggedInMain(false);
      setError(true);
    }
  }

  const handleSnackbarClose = reason => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (props.location.state !== undefined && props.location.state.message) {
      setSnackbarMessage(props.location.state.message);
      setSnackbarOpen(true);
    }
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      {snackbarOpen && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      )}
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
                Sign in
              </Typography>
            </div>
            <Formik
              initialValues={{
                email: '',
                password: ''
                // role: 'Agent',
                // AgentType: 'Inbound',
                // AgentSIPID: '9999'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .max(255)
                  .required('Email is required'),
                password: Yup.string()
                  .max(255)
                  .required('Password is required')
              })}
              onSubmit={values => {
                localStorage.setItem('AgentType', values.AgentType);
                localStorage.setItem('role', values.role);
                localStorage.setItem('AgentSIPID', values.AgentSIPID);

                // navigate('/app/dashboard', { replace: true });
                authenticate(values);
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  {/* <TextField
                    error={Boolean(touched.role && errors.role)}
                    fullWidth
                    helperText={touched.role && errors.role}
                    label="role"
                    margin="normal"
                    name="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.role}
                    variant="outlined"
                  /> */}
                  {/* <TextField
                    error={Boolean(touched.AgentType && errors.AgentType)}
                    fullWidth
                    helperText={touched.AgentType && errors.AgentType}
                    label="Agent Type"
                    margin="normal"
                    name="AgentType"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentType}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.AgentSIPID && errors.AgentSIPID)}
                    fullWidth
                    helperText={touched.AgentSIPID && errors.AgentSIPID}
                    label="Agent SIPID"
                    margin="normal"
                    name="AgentSIPID"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.AgentSIPID}
                    variant="outlined"
                  /> */}

                  {!!error && (
                    <Box my={1}>
                      <Typography color="secondary">
                        Invalid Username/Password
                      </Typography>
                    </Box>
                  )}
                  <Box my={1} mt={3}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            <Box>
              <RouterLink to="/auth/forget-password">
                forget password ?
              </RouterLink>
            </Box>
            <Box mt={1}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = dispatch => ({
  setUserDetailsMain: details => dispatch(setUserDetails(details)),
  setAccountTypeMain: accType => dispatch(setAccountType(accType)),
  setLoggedInMain: val => dispatch(setLoggedIn(val)),
  setAccess: roles => dispatch(setAccessLevels(roles))
});

export default connect(null, mapDispatchToProps)(Login);
