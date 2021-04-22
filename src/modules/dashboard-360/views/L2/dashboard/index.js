import React, { useEffect, useState } from 'react';
import DispositionForm from './DispositionForm';
import { Grid, Card, CardHeader, Button, Snackbar } from '@material-ui/core';
// import PendingCallList from './PendingCallList';
import RecentFiveRecords from './RecentFiveRecords';
import LeadButtons from './LeadButtons';
import RecentCustomerOrderDetails from './RecentCustomerOrderDetails';
import CustomerDetails from './CustomerDetails';
import MuiAlert from '@material-ui/lab/Alert';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DispositionTable from './DispositionTable';
// import SelectDates from './SelectDates';
// import CallInteractionTable from './CallInteractionTable';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = () => {
  const userData = useSelector(state => state.userData);
  const [formDisabled, setFormDisabled] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [lastFiveRecords, setLastFiveRecords] = useState(null);
  const [timer, setTimer] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [interactionTableParams, setInteractionTableParams] = useState({
    selectDate: null
  });

  const dail = async () => {
    await axios.get('https://dt.granalytics.in/ami/actions/orginatecall', {
      params: {
        // sipAgentID: `Local/2${agentNumber.slice(2)}@from-internal`,
        NumbertobeCalled: '2' + customer.phoneNumber.slice(2)
      }
    });
  };

  useEffect(() => {
    console.log(interactionTableParams);
  });

  const getData = async () => {
    await axios
      .get('/crm-route/tlleads')
      .then(res => {
        setCustomer(res.data);
        setSecondsLeft(15);
        setFormDisabled(false);
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
          // console.log('Interval');
          let remSecond;
          setSecondsLeft(prev => {
            remSecond = prev;
            return prev;
          });
          if (remSecond !== 0) {
            setSecondsLeft(remSecond - 1);
            // console.log(remSecond);
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
      dialTimer();
      const getLastFiveRecords = async () => {
        await axios

          .get(`/crm-route/agentinteraction`, {
            params: {
              phonenumber: customer.phoneNumber
            }
          })

          // .get(
          //   `/crm-route/agentinteraction?phonenumber=${customer.phoneNumber}`
          // )
          // .get(
          //   `/crm-route/agentinteraction?phonenumber=${919600920380}&agent_id=${
          //     userData.userId
          //   }`
          // )
          .then(res => {
            setLastFiveRecords(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };
      getLastFiveRecords();
    }
  }, [customer]);

  const handleClick = () => {
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
      {!!secondsLeft && customer !== null && (
        <Button
          style={{ float: 'right', marginRight: '4rem', color: 'white' }}
          variant="contained"
          color="secondary"
        >
          Call Connecting in {secondsLeft}s
        </Button>
      )}
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 2rem 2rem' }}>
        <Grid container spacing={5}>
          <Grid item lg={9} xs={12}>
            <LeadButtons customer={customer} />
          </Grid>
          <Grid container item justify="flex-end" lg={3} xs={12}>
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
          {/* <Grid item xs={12}>
            <SelectDates tableParams={setInteractionTableParams} />
          </Grid>
          <Grid item xs={12}>
            <CallInteractionTable tableParams={interactionTableParams} />
          </Grid> */}
          <Grid item xs={12} style={{ marginTop: '1rem' }}>
            <DispositionTable />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
