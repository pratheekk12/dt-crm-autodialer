import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { IconButton, Snackbar } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Dialpad({ agentPhoneNumber }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    severity: '',
    message: ''
  });

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const dial = async phoneNumber => {
    await axios
      .get('https://dt.granalytics.in/ami/actions/orginatecall', {
        params: {
          sipAgentID: `Local/2${agentPhoneNumber}@from-internal`,
          NumbertobeCalled: '2' + phoneNumber
        }
      })
      .then(res => {
        setSnackbarOpen(true);
        setSnackbarMessage({
          severity: 'success',
          message: `Call connecting !`
        });
      })
      .catch(err => {
        setSnackbarOpen(true);
        setSnackbarMessage({
          severity: 'error',
          message: `Something went wrong. Please try again !`
        });
      });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Call
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div style={{ margin: '0.5rem' }}>
          <Formik
            initialValues={{ phone: '' }}
            validationSchema={Yup.object({
              phone: Yup.string()
                .matches(
                  /^((\+){0,1}91(\s){0,1})?([6-9]\d{9})$/,
                  'Enter valid Phone Number'
                )
                .required('Required')
            })}
            onSubmit={(values, { resetForm }) => {
              dial(values.phone);
              resetForm();
            }}
          >
            <Form>
              <Field
                component={TextField}
                label="Phone Number"
                name="phone"
                type="number"
                variant="outlined"
              />
              <IconButton color="primary" aria-label="phone" type="submit">
                <PhoneIcon />
              </IconButton>
            </Form>
          </Formik>
        </div>
      </Popover>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        style={{ width: '100%' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.severity}
        >
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
