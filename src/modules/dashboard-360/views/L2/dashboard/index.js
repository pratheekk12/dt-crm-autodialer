import React, { useEffect, useState } from 'react';
import DispositionForm from '../../../components/DispositionForm';
import { Grid, Card, CardHeader, Button, Snackbar } from '@material-ui/core';
// import PendingCallList from './PendingCallList';
import RecentFiveRecords from '../../../components/RecentFiveRecords';
import LeadButtons from '../../../components/LeadButtons';
import CustomerDetails from '../../../components/CustomerDetails';
import MuiAlert from '@material-ui/lab/Alert';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DispositionTable from '../../../components/DispositionTable';
import Dialpad from './Dialpad';
import RecentCustomerOrderDetails from 'src/modules/dashboard-360/components/RecentCustomerOrderDetails';
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
  const [orders,setOrders] = useState([])
  // const [interactionTableParams, setInteractionTableParams] = useState({
  //   selectDate: null
  // });

  const dial = async () => {
    // await axios.get('https://dt.granalytics.in/ami/actions/orginatecall', {
    //   params: {
    //     sipAgentID: `Local/1${userData.phone}@from-internal`,
    //     NumbertobeCalled: '1' + customer.phoneNumber.slice(2),
    //     restaurantId: customer.restaurantId
    //   }
    // });
  };

  const getData = async () => {
    await axios
      .get('/crm-route/tlleads')
      .then(res => {
        console.log(res.data)
        setCustomer(res.data);
        res.data && setFormDisabled(false);
        setOpen(true);
        getCustomerlastThreeOrders()
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
            dial();
            setSecondsLeft(0);
            setTimer(prev => clearInterval(prev));
          }
        }, 1000)
      );
    }
  };

  const getCustomerlastThreeOrders =()=>{
    console.log(" i am called")
    var axios = require('axios');
    var data = JSON.stringify({"apiKey":"25c71cd65026ea2deef9d55c273c2b54","resId":"5964634c395506cf6949b9d5","phone":customer.phoneNumber});
    
    var config = {
      method: 'post',
      url: 'http://192.168.4.44:43001/crm-route/inrestoorders',
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setOrders(response.data[0])
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    console.log(customer,"customer")
    if (customer) {
     
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
            console.log(res.data)
            setLastFiveRecords(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };
      getLastFiveRecords();
      
    }
    getCustomerlastThreeOrders()
  }, [customer]);

  console.log(orders,"orders")

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
      {!!secondsLeft && customer !== null && (
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
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 2rem 2rem' }}>
        <Grid container spacing={5}>
          <Grid item lg={6} xs={12}>
            <LeadButtons customer={customer} />
          </Grid>
          <Grid item container justify="flex-end" lg={3} xs={6}>
            <Dialpad agentPhoneNumber={userData.phone} />
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
              <RecentCustomerOrderDetails orders={orders}/>
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
