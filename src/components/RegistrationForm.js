import {
  Box,
  Button,
  makeStyles,
  MenuItem,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { Autocomplete } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { CRUD_USER } from 'src/modules/admin/utils/endpoints';
import { setUserDetails } from 'src/redux/action';
import { PasswordSchema, RegistrationSchema } from 'src/utils/schemas';
import CommonAlert from './CommonAlert';
import Spinner from './Spinner';
import withRestaurants from './withRestaurants';
const useStyles = makeStyles(theme => ({
  textField: {
    display: 'flex',
    margin: `${theme.spacing(2)}px 0`
  },
  spinnerWrapper: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    zIndex: 10,
    width: '100%'
  },
  link: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    textTransform: 'underline'
  }
}));

function RegistrationForm({
  admin,
  onSuccess,
  isEdit,
  userData,
  setUserData,
  roles,
  restaurants
}) {
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const ref = useRef(null)
  async function sendCreateUserRequest(val, resetForm) {
    try {
      setShowLoader(true);
      setErrorText('');
      
      await axios.post(CRUD_USER + '/register', {
        ...val
        // password: 'Indusviva@123' // temporary default password for new user
      });
      setShowLoader(false);
      resetForm();
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorText('Email Address/Mobile Number Already exists!');
      } else {
        setErrorText('Some Error Occured. Please try again');
      }
      setShowLoader(false);
    }
  }

  async function sendEditUserRequest(val, isPassword) {
    try {
      setShowLoader(true);
      setErrorText('');
      const obj = {};
      if (isPassword) {
        obj.password = val.password;
      } else {
        obj.phone = val.phone;
      }
      await axios.patch(CRUD_USER, {
        ...obj,
        userId: userData.userId,
        email: userData.email
      });
      if (!isPassword) {
        setUserData({
          ...userData,
          phone: obj.phone
        });
      } else {
        setChecked(false);
      }
      setShowLoader(false);
      onSuccess && onSuccess(isPassword);
    } catch (error) {
      console.log(error.response);
      setErrorText(
        error.response?.data?.message || 'Some Error Occured. Please try agin.'
      );
      setShowLoader(false);
    }
  }

  function getRoles() {
    return roles.map(role => (
      <MenuItem value={role.role} key={role.roleId}>
        {role.label}
      </MenuItem>
    ));
  }

  return (
    <div style={{ position: 'relative' }}>
      <Formik
        initialValues={
          isEdit
            ? userData
            : {
                username: '',
                email: '',
                phone: '',
                role: '',
                password: '',
                sip_id: '',
                agent_type: '',
                restaurants: []
              }
        }
        validationSchema={RegistrationSchema(admin)}
        onSubmit={(values, { resetForm }) => {
          //   actions.resetForm();
          if (isEdit) {
            sendEditUserRequest(values);
          } else if (admin) {
            sendCreateUserRequest(values, resetForm);
          }
        }}
      >
        {props => {
          return (
            <Form>
              {showLoader && <Spinner className={classes.spinnerWrapper} />}
              <Box padding={2} display="block" position="relative">
                {errorText && <CommonAlert text={errorText} />}
                <Field
                  name="username"
                  component={TextField}
                  style={{ width: 400 }}
                  className={classes.textField}
                  label="Enter Username"
                  variant="outlined"
                  disabled={!!isEdit}
                  autoComplete="off"
                />
                <Field
                  name="email"
                  component={TextField}
                  className={classes.textField}
                  style={{ width: 400 }}
                  label="Enter Email"
                  variant="outlined"
                  disabled={!!isEdit}
                  autoComplete="off"
                />
                <Field
                  name="password"
                  component={TextField}
                  className={classes.textField}
                  type="password"
                  style={{ width: 400 }}
                  label="Enter password"
                  variant="outlined"
                  disabled={!!isEdit}
                  autoComplete="off"
                />
                <Field
                  name="phone"
                  component={TextField}
                  style={{ width: 400 }}
                  className={classes.textField}
                  label="Enter Mobile Number"
                  variant="outlined"
                  disabled={false}
                  autoComplete="off"
                />
                {/* <Field
                name="role"
                component={TextField}
                style={{ width: 400 }}
                className={classes.textField}
                label="Role"
                variant="outlined"
                disabled={!!isEdit}
                autoComplete="off"
              /> */}
                <Field
                  name="agent_type"
                  component={TextField}
                  style={{ width: 400 }}
                  className={classes.textField}
                  label="Agent Type"
                  variant="outlined"
                  disabled={false}
                  autoComplete="off"
                />
                <Field
                  name="sip_id"
                  component={TextField}
                  style={{ width: 400 }}
                  className={classes.textField}
                  label="Agent SIP ID"
                  variant="outlined"
                  disabled={false}
                  autoComplete="off"
                />
                {admin && (
                  <>
                    <Field
                      name="role"
                      component={TextField}
                      style={{ width: 400 }}
                      className={classes.textField}
                      select
                      label="Select a Role"
                      variant="outlined"
                      disabled={false}
                      onChange={e => {
                        props.setFieldValue(e.target.name, e.target.value);
                        if(ref && ref.current) {
                          const clear = ref.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
                          clear && clear.click();
                        }
                        // props.setFieldValue('restaurants', e.target.value === 'manager' ? []: '');
                      }}
                      autoComplete="off"
                    >
                      {getRoles()}
                    </Field>
                   { props.values.role && props.values.role !== 'DTL1' && props.values.role !== 'admin' && <Autocomplete
                      options={restaurants}
                      multiple
                      getOptionLabel={option => option.restaurantName}
                      style={{ width: 400, marginBottom: 16 }}
                      getOptionSelected={(option, value) =>
                        value._id === option._id
                      }
                      ref={ref}
                      onChange={(event, value) => {
                        props.setFieldValue('restaurants', value.map(v => v._id));
                      }}
                      renderInput={params => (
                        <Field
                          component={TextField}
                          {...params}
                          label="Choose a restaurant"
                          variant="outlined"
                          name="restaurants"
                          
                        />
                      )}
                    />}
                  </>
                )}
                <Button variant="contained" color="primary" type="submit">
                  {isEdit ? 'Edit' : 'Create Account'}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      {isEdit && (
        <Box padding={2}>
          <Typography
            onClick={() => setChecked(!checked)}
            className={classes.link}
          >
            Change Password
          </Typography>
          {checked && (
            <Formik
              initialValues={{ password: '', confirmPassword: '', otp: '' }}
              validationSchema={PasswordSchema}
              onSubmit={val => sendEditUserRequest(val, true)}
            >
              {() => (
                <Form>
                  <Field
                    name="password"
                    component={TextField}
                    type="password"
                    className={classes.textField}
                    style={{ width: 400 }}
                    label="Enter Password"
                    variant="outlined"
                    disabled={false}
                    autoComplete="off"
                  />
                  <Field
                    name="confirmPassword"
                    component={TextField}
                    type="password"
                    style={{ width: 400 }}
                    className={classes.textField}
                    label="Confirm Password"
                    variant="outlined"
                    disabled={false}
                    autoComplete="off"
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Change Password
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      )}
    </div>
  );
}
const mapStateToProps = state => ({
  userData: state.userData
});

const mapDispatchToProps = dispatch => ({
  setUserData: updatedData => dispatch(setUserDetails(updatedData))
});

export default withRestaurants(
  connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
);
