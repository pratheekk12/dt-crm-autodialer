import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import CommonAlert from 'src/components/CommonAlert';
import { USER_ROLE } from '../../utils/endpoints';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120
  }
}));
export default function ChangeRole({ roles, userData, onSuccess, onCancel }) {
  const classes = useStyles();
  const [showError, setshowError] = useState(false);
  const [role, setrole] = useState(userData?.auth.role);

  function getRoles() {
    return roles.map(role => (
      <MenuItem value={role.role} key={role.roleId}>
        {role.label}
      </MenuItem>
    ));
  }

  async function sendChangeRoleRequest() {
    try {
      setshowError(false);
      const res = await axios.patch(USER_ROLE, {
        userId: userData.userId,
        role,
        email: userData.email
      });
      onSuccess({ userId: userData.userId, role });
    } catch (error) {
      console.log(error.response, error);
      setshowError(error.response.data);
    }
  }
  return roles && userData ? (
    <>
      {showError && (
        <>
          <CommonAlert
            text={showError.message || 'Something went wrong. Please try again'}
          />
          <br />
        </>
      )}
      <Typography variant="h5">Username: {userData.username}</Typography>
      <Typography variant="h6">Email: {userData.email}</Typography>
      <br />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={role}
          onChange={e => setrole(e.target.value)}
          label="Role"
          style={{ minWidth: 400 }}
        >
          {getRoles()}
        </Select>
      </FormControl>
      <div style={{ margin: '1rem 0' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => sendChangeRoleRequest()}
        >
          Change
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
      </div>
    </>
  ) : (
    <CommonAlert text="Unable to fetch roles" />
  );
}
