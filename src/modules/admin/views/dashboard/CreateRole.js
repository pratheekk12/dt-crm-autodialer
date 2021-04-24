import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import CommonAlert from 'src/components/CommonAlert';
import * as Yup from 'yup';
import { CRUD_ROLES } from '../../utils/endpoints';

export default function CreateRole({ onSuccess, onCancel, role }) {
  const [showError, setshowError] = useState(false);
  const editMode = !!role;
  async function createPostRequest(val) {
    try {
      setshowError(false);
      const res = await axios.post(CRUD_ROLES, { ...val, permissions: {} });
      onSuccess(res);
    } catch (error) {
      console.log(error.response);
      setshowError(error.response.data);
    }
  }
  async function createPatchRequest(val) {
    try {
      setshowError(false);
      const res = await axios.patch(CRUD_ROLES, {
        label: val.label,
        roleId: role.roleId
      });
      onSuccess(res);
    } catch (error) {
      console.log(error.response, error);
      setshowError(error.response.data);
    }
  }
  return (
    <Paper style={{ marginTop: editMode ? 0 : 20 }}>
      <Box padding={2}>
        {editMode && (
          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Edit Role
          </Typography>
        )}
        {showError && (
          <>
            <CommonAlert
              text={
                showError.message || 'Something went wrong. Please try again'
              }
            />
            <br />
          </>
        )}
        <Formik
          initialValues={!editMode ? { role: '', label: '' } : role}
          validationSchema={Yup.object().shape({
            label: Yup.string()
              .min(3, 'Role Label must be minimum 3 characters')
              .required('Role Label is required'),
            role: Yup.string()
              .min(2, 'Role Identifier must be minimum 3 characters')
              // .matches(/^[a-z]+[A-Za-z]*$/, 'Please use only camel case')
              .required('Role Identifier is required')
          })}
          onSubmit={val =>
            editMode ? createPatchRequest(val) : createPostRequest(val)
          }
        >
          {(props) => (
            <Form>
              <Field
                name="label"
                component={TextField}
                style={{ width: 400 }}
                label="Enter Role Label"
                variant="outlined"
                onBlur={(e) => {
                  if(!props.touched.role) {
                    props.setFieldValue('role', props.values.label)
                  }
                }}
                disabled={false}
                autoComplete="off"
              />
              <br />
              <br />
              <Field
                name="role"
                component={TextField}
                style={{ width: 400 }}
                label="Enter Role Identifier"
                variant="outlined"
                disabled={editMode}
              />
              <br />
              <br />
              <Button variant="contained" color="primary" type="submit">
                {editMode ? 'Save' : 'Create'}
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Paper>
  );
}
