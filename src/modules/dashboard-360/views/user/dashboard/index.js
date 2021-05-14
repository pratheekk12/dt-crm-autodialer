import React, { useEffect, useState } from 'react';
import DispositionForm from '../../../components/DispositionForm';
import { Grid, Card, CardHeader, Button, Snackbar } from '@material-ui/core';
// import PendingCallList from './PendingCallList';
import RecentFiveRecords from '../../../components/RecentFiveRecords';
import LeadButtons from '../../../components/LeadButtons';
import RecentCustomerOrderDetails from './RecentCustomerOrderDetails';
import CustomerDetails from '../../../components/CustomerDetails';
import MuiAlert from '@material-ui/lab/Alert';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = () => {
  const userData = useSelector(state => state.userData);
  const [formDisabled, setFormDisabled] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [, setTimer] = useState(0);
  const [lastFiveRecords, setLastFiveRecords] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeEnabled, setTimeEnabled] = useState(false);
  const handleBreakTimeOut = () => {
    setTimeEnabled(!timeEnabled);
  };

  const { seconds, minutes, hours, start, reset } = useStopwatch({
    autoStart: false
  });

  const setBreakDuration = async () => {
    console.log(userData);
    axios
      .post('/crm-route/breaks', {
        agent_Name: userData.username,
        agent_Id: userData.userId,
        Agentsip_id: userData.sip_id,
        break_duration: `Hr : ${hours} Min : ${minutes} Sec : ${seconds}`
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (timeEnabled) {
      start();
    } else {
      if (seconds || minutes) {
        setBreakDuration();
      }
      reset(0, false);
    }
  }, [timeEnabled]);

  const dail = async () => {
    await axios.get('https://dt.granalytics.in/ami/actions/orginatecall', {
      params: {
        sipAgentID: userData.sip_id,
        NumbertobeCalled: '1' + customer.phoneNumber.slice(2),
        restaurantId: customer.restaurantId
      }
    });
  };

  const getData = async () => {
    await axios
      .get('/channel/getdata')
      .then(res => {
        setCustomer(res.data);
        res.data && setFormDisabled(false);
        setOpen(true);
      })
      .catch(err => {
        setFormDisabled(true);
        console.log(err);
        setOpen(true);
      });
  };

  const dialTimer = () => {
    if (customer) {
      setTimer(
        setInterval(() => {
          let remSecond;
          setSecondsLeft(prev => {
            remSecond = prev;
            return prev;
          });
          if (remSecond !== 0) {
            setSecondsLeft(remSecond - 1);
          } else {
            dail();
            setSecondsLeft(0);
            setTimer(prev => clearInterval(prev));
          }
        }, 1000)
      );
    }
  };

  useEffect(() => {
    if (customer !== null) {
      setSecondsLeft(15);
      dialTimer();
      const getLastFiveRecords = async () => {
        await axios
          .get(`/crm-route/interactions`, {
            params: {
              customerId: customer.customerId,
              interactionCount: 5
            }
          })
          .then(res => {
            setLastFiveRecords(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };
      getLastFiveRecords();
    } else {
      setSecondsLeft(0);
    }
  }, [customer]);

  const handleClick = () => {
    setFormDisabled(true);
    getData();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {!!secondsLeft && (
        <Button
          style={{
            float: 'right',
            marginRight: '4rem',
            color: 'white',
            marginBottom: '-2rem'
          }}
          variant="contained"
          color="secondary"
        >
          Call Connecting in {secondsLeft}s
        </Button>
      )}
      {timeEnabled && (
        <Button
          style={{
            float: 'right',
            marginRight: '4rem',
            color: 'white',
            marginBottom: '-2rem'
          }}
          variant="contained"
          color="secondary"
        >
          {`Hr : ${hours}  Min : ${minutes} Sec : ${seconds}`}
        </Button>
      )}
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 2rem 2rem' }}>
        <Grid container spacing={5}>
          <Grid item lg={6} xs={12}>
            <LeadButtons customer={customer} />
          </Grid>
          <Grid container item justify="flex-end" lg={3} xs={6}>
            <Button
              variant="contained"
              color={timeEnabled ? 'secondary' : 'primary'}
              style={{ color: 'white' }}
              onClick={handleBreakTimeOut}
            >
              {timeEnabled ? 'Resume Work' : 'Take Break'}
            </Button>
          </Grid>
          <Grid container item justify="flex-end" lg={3} xs={6}>
            <Button
              variant="contained"
              color="primary"
              disabled={secondsLeft}
              onClick={handleClick}
            >
              Fetch New Customer
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              {formDisabled ? (
                <Alert onClose={handleClose} severity="error">
                  Some error occur please try again !
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="success">
                  Fetch new customer successfully !
                </Alert>
              )}
            </Snackbar>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={3}
          style={{ marginTop: '1rem' }}
        >
          <Grid item lg={6} xs={12}>
            <Card style={{ display: 'flex', justifyContent: 'center' }}>
              <CardHeader title={'Disposition Form'} />
            </Card>
            <Card style={{ padding: '1rem' }}>
              <DispositionForm
                visibility={formDisabled}
                customer={customer !== null && customer}
              />
            </Card>
          </Grid>
          <Grid container item lg={6} xs={12}>
            <Grid item xs={12}>
              <Card style={{ display: 'flex', justifyContent: 'center' }}>
                <CardHeader title={'Customer Details'} />
              </Card>
              <Card style={{ padding: '1rem' }}>
                <CustomerDetails customer={customer} />
              </Card>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '1rem' }}>
              <RecentCustomerOrderDetails />
            </Grid>
            <Grid item xs={12} style={{ marginTop: '1rem' }}>
              <RecentFiveRecords
                records={lastFiveRecords !== null && lastFiveRecords}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
