import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton, TextField } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function Dialpad({ agentPhoneNumber }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [phoneNumber, setPhoneNumber] = React.useState(0);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dial = async () => {
    await axios.get('https://dt.granalytics.in/ami/actions/orginatecall', {
      params: {
        sipAgentID: `Local/2${agentPhoneNumber}@from-internal`,
        NumbertobeCalled: '2' + phoneNumber
      }
    });
  };

  const handleCall = () => {
    if (phoneNumber.length === 10) {
      dial();
    } else {
      alert('Please enter valid phone number');
    }
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
          <TextField
            id="outlined-number"
            label="Phone Number"
            type="number"
            variant="outlined"
            onChange={e => {
              setPhoneNumber(e.target.value);
            }}
          />
          <IconButton color="primary" aria-label="phone" onClick={handleCall}>
            <PhoneIcon />
          </IconButton>
        </div>
      </Popover>
    </div>
  );
}
