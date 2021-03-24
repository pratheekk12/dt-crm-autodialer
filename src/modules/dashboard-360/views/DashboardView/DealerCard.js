import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Tooltip,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallIcon from '@material-ui/icons/Call';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getAddressFromObj } from '../../utils/util-functions';

const useStyles = makeStyles(theme => ({
  maxW50: {
    maxWidth: '50%',
    width: '50%'
  },
  customLink: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  chipPrimary: {
    backgroundColor: theme.palette.success.light
  },
  rootChip: {
    color: theme.palette.common.white
  },
  chipWarning: {
    backgroundColor: theme.palette.warning.light
  },
  mt1: {
    marginTop: '0.25rem'
  },
  container1: {
    position: 'relative',
    '&::after': {
      content: 'no-open-quote',
      borderRight: '1px solid rgba(0,0,0,0.2)',
      height: '60%',
      position: 'absolute',
      right: 0,
      top: '50%',
      bottom: '50%',
      transform: 'translateY(-50%)'
    }
  },
  profileIcon: {
    right: 5
  },
  dialog: {
    minWidth: 400
  }
}));

export default function DealerCard({ dealerDetails }) {
  console.log('dealerDetails', dealerDetails);
  const classes = useStyles();
  const {
    distributor_name,
    distributor_id,
    // lastInteractionId,
    // lastInteractionDate,
    // lastOrderReference,
    distributor_rank,
    Joiningdate,
    distributor_status,
    email_id,
    display_name,
    mob_no,
    pan_no,
    adhar_no,
    phone_no,
    SelfDOB
  } = dealerDetails;

  const [showFullDetailsModal, setShowFullDetailsModal] = useState(false);
  const SOCKETENDPOINT = 'http://14.98.23.204:42002/';
  const getIconColor = () => {
    return 'primary';
  };

  function makeCall(Number) {
    if (Number.length === 10) {
      const axios = require('axios');

      const config = {
        method: 'get',
        // eslint-disable-next-line prefer-template
        url:
          SOCKETENDPOINT +
          'ami/actions/orginatecall?sipAgentID=SIP%2F' +
          localStorage.getItem('AgentSIPID') +
          '&NumbertobeCalled=5' +
          Number,
        headers: {}
      };
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Invalide number');
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid container justify="center" className="position-relative">
          <Tooltip
            title="View More Details"
            className={`position-absolute ${classes.profileIcon} `}
          >
            <AccountCircleIcon
              color="primary"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowFullDetailsModal(true)}
            />
          </Tooltip>
          {localStorage.getItem('AgentType') === 'Outbound' &&
          localStorage.getItem('callDispositionStatus') === 'Disposed' &&
          localStorage.getItem('callStatus') === 'disconnected' &&
          localStorage.getItem('breakStatus') === 'OUT' ? (
            <CallIcon onClick={() => makeCall(mob_no)} />
          ) : null}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg> */}
          <Box>
            <Typography gutterBottom variant="h5" component="h2" align="center">
              {display_name}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="center"
            >
              {email_id}
              <br />
              {distributor_rank}
              <br />
              Member From - {Joiningdate}
            </Typography>
            <Box style={{ marginTop: '0.5rem' }}>
              <Tooltip title="Verified">
                <Chip
                  color="primary"
                  label="Aadhar"
                  className={`${classes.chipPrimary} ${classes.rootChip} `}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Verification Pending">
                <Chip
                  color="secondary"
                  label="Cheque book"
                  className={`${classes.chipWarning} ${classes.rootChip} `}
                />
              </Tooltip>
              &nbsp;
              <Tooltip title="Not Verified">
                <Chip
                  color="secondary"
                  label="PAN"
                  className={` ${classes.rootChip} `}
                />
              </Tooltip>
            </Box>
          </Box>
          <Grid container spacing={4} className={classes.mt1}>
            <Grid item xs={6} className={classes.container1}>
              <Grid container direction="column" alignItems="flex-end">
                <Typography gutterBottom variant="h5" align="center">
                  Last Order
                </Typography>
                <Link to="/dash360/orders/1234">#1234</Link>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" alignItems="flex-start">
                <Typography gutterBottom variant="h5" align="center">
                  Last Interaction
                </Typography>
                <Link to="/dash360/orders/1234">#1234</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {showFullDetailsModal && (
        <Dialog
          open
          onClose={() => setShowFullDetailsModal(false)}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>User Profile</DialogTitle>
          <Divider light />
          <DialogContent>
            <Typography variant="h6">
              {display_name}
              <Tooltip title={distributor_status}>
                <CheckCircleIcon
                  color={getIconColor()}
                  style={{ marginBottom: -3, marginLeft: 5 }}
                />
              </Tooltip>
            </Typography>
            <Typography color="textSecondary">{distributor_id}</Typography>
            {/* <Typography color="textSecondary" display="inline" variant="p">
              Distributor Name:
            </Typography>
            <Typography color="textSecondary" display="inline">
              {display_name}
            </Typography> */}
            <br />
            <Grid container wrap>
              <Grid container item xs={12} wrap>
                <Box style={{ flexBasis: '100%' }}>
                  <Typography variant="h4">Contact Details</Typography>
                </Box>
                <Box style={{ flexBasis: '100%' }} marginTop={2} />
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Email Id:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {email_id}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Mobile Number:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {mob_no}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Phone Number:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {phone_no || '-'}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Billing Address:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {getAddressFromObj(dealerDetails)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Box style={{ flexBasis: '100%' }}>
                <br />
              </Box>
              <Grid container item xs={12}>
                <Box style={{ flexBasis: '100%' }}>
                  <Typography variant="h4">Personal Details</Typography>
                </Box>
                <Box style={{ flexBasis: '100%' }} marginTop={2} />
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Distributor Name:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {distributor_name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Aadhar Number:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {adhar_no}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">PAN Number:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {pan_no}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Date Of Birth:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {SelfDOB.substring(0, 10)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setShowFullDetailsModal(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Display Name
                </Typography>
                <span>{distributor_name}</span>
              </Box>
            }
          />
        </ListItem> */}

      {/* <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Email Id
                </Typography>
                <span>{email_id}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Interaction ID
                </Typography>
                <span>{lastInteractionId}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Interaction Date
                </Typography>
                <span>{lastInteractionDate}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Last Order Reference
                </Typography>
                <span>#{lastOrderReference}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Rank
                </Typography>
                <span>{distributor_rank}</span>
              </Box>
            }
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="h5" className={classes.maxW50}>
                  Membership Date
                </Typography>
                <span>{Joiningdate}</span>
              </Box>
            }
          />
        </ListItem> */}
      {/* </List> */}
    </Card>
  );
}
