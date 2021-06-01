import React, { useEffect, useState } from 'react';
import DispositionForm from '../../../components/DispositionForm';
import { Grid, Card, CardHeader, Button, Snackbar, makeStyles,
  Typography,Box } from '@material-ui/core';
// import PendingCallList from './PendingCallList';
import RecentFiveRecords from '../../../components/RecentFiveRecords';
import LeadButtons from '../../../components/LeadButtons';
import CustomerDetails from '../../../components/CustomerDetails';
import MuiAlert from '@material-ui/lab/Alert';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useStopwatch } from 'react-timer-hook';
import RecentCustomerOrderDetails from 'src/modules/dashboard-360/components/RecentCustomerOrderDetails';
import CallIcon from '@material-ui/icons/Call';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    },
    panelBody: {
      padding: 0
    },
    dialogActions: {
      padding: '0 1.5rem 1rem'
    },
    modal: {
      alignItems: 'center',
      width: '100%',
      height: '100%'
    },
    timerComp1: {
      position: 'relative',
      // top: 0,
      // left: '55%',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.2rem',
      backgroundColor: theme.palette.secondary.light,
      padding: '8px 10px',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      top : 0,
      left: '55%'
    },
    callWrapper1: {
      left: 'calc(55% + 90px)'
    },
    callInbound1: {
      backgroundColor: theme.palette.success.light
    },
    callOutbound: {
      backgroundColor: theme.palette.secondary.light
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: theme.spacing(1, 1)
    }
  };
});

const Dashboard = () => {
  const classes = useStyles();
  const userData = useSelector(state => state.userData);
  const [formDisabled, setFormDisabled] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [, setTimer] = useState(0);
  const [lastFiveRecords, setLastFiveRecords] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timeEnabled, setTimeEnabled] = useState(false);
  const [orders,setOrders] = useState([])
  const handleBreakTimeOut = () => {
    //console.log("i am called")
    setTimeEnabled(!timeEnabled);
  };

  const [currentCall, setCurrentCall] = useState({
    callStatus: '',
    callUniqueId: '',
  });

  function setCurrentCallDetails(
    callStatus,
  ) {
    setCurrentCall({
      callStatus,
    });
    localStorage.setItem('callStatus', callStatus);
  }

  function getAgentCallStatus(agentSipID) {
    //console.log('calling the', agentSipID);

    var axios = require('axios');

    var config = {
      method: 'get',
      url: `http://192.168.4.44:62001/api/agents/${agentSipID}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log((response.data));
        setCurrentCallDetails(
          response.data.Event,
          localStorage.setItem('Interaction_id', response.data.InteractionID),
          localStorage.setItem('CallerNumber', response.data.CallerIDNum),
          
        )
        if (response.data.Paused === '1') {
          localStorage.setItem('Break_Status', 'IN')
        } else {
          localStorage.setItem('Break_Status', 'OUT')
        }
        if(response.data.Event === 'AgentConnect' || response.data.Event === 'AgentComplete' ){
          setFormDisabled(false)
        }
        localStorage.setItem('Queue', response.data.Queue)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function breakService() {
    //console.log("called from dispos")
    const AgentSIPID = localStorage.getItem('AgentSIPID1')
    if (localStorage.getItem('Break_Status') === 'OUT') {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://192.168.4.44:62002/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAKIN&Break=true`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
          handleBreakTimeOut()
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      var axios = require('axios');
      var config = {
        method: 'get',
        url: `http://192.168.4.44:62002/ami/actions/break?Queue=${localStorage.getItem('Queue')}&Interface=SIP%2F${AgentSIPID}&Reason=BREAKOUT&Break=false`,
        headers: {}
      };

      axios(config)
        .then(function (response) {
          console.log((response.data));
          handleBreakTimeOut()
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  useEffect(() => {

    

    async function getInitialData() {
      try {
        await getAgentCallStatus(localStorage.getItem('Agent_Object_ID'));
      } catch (err) {
        console.log('err', err);
      }
    }
    getInitialData();
    setLoadingDetails(false);



  }, []);



  useEffect(() => {
    if(localStorage.getItem('Agent_Object_ID')){
      const agentSipID = localStorage.getItem('Agent_Object_ID')
      const interval = setInterval(async () => {
        const GET_CURRENT_STATUS_BY_AGENT_SIP_ID = `http://192.168.4.44:62001/api/agents/${localStorage.getItem('Agent_Object_ID')}`;
        const getCurrentStatus = await axios.get(GET_CURRENT_STATUS_BY_AGENT_SIP_ID);
        //console.log('getCurrentStatus', getCurrentStatus)
        getAgentCallStatus(agentSipID)
  
  
      }, 3000);
    }
   
  }, [])


  const [loadingDetails, setLoadingDetails] = useState(true);

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

  const getCustomerlastThreeOrders =()=>{
    var data = {"apiKey":"25c71cd65026ea2deef9d55c273c2b54","resId":"5964634c395506cf6949b9d5","phone":"918754122211"};
    
    axios.post(`/crm-route/inrestoorders`,data)
      .then((res)=>{
        //console.log(res)
        var i=0
        res.data[0].items.map((ele)=>{
          i=i+1
          return ele.id = i
        })
        setOrders(res.data[0])
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  //console.log(customer)

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

  // //console.log(customer)
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
            console.log(res)
            setLastFiveRecords(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };
      getLastFiveRecords();

      const getCustomerlastThreeOrders =(data)=>{
        //console.log(customer)
        if(Object.keys(customer) != 0){
          var data = {"apiKey":"25c71cd65026ea2deef9d55c273c2b54","resId":customer.restaurantId,"phone": customer.phoneNumber};
        
          axios.post(`/crm-route/inrestoorders`,data)
            .then((res)=>{
              //console.log(res)
              if(res.data.length > 0){
                var i=0
              res.data[0].items.map((ele)=>{
                i=i+1
                return ele.id = i
              })
              console.log(res.data,"order details")
              setOrders(res.data[0])
              }
              
            })
            .catch((err)=>{
              console.log(err)
            })
        }
       
      }
      getCustomerlastThreeOrders()
      
    } else {
      setSecondsLeft(0);
    }
    //getCustomerlastThreeOrders()
  }, [customer]);
  //console.log(orders,"orders")

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

  console.log(currentCall,"current caall")

  return (
    <>
    {
      localStorage.getItem('Agent_Object_ID') ? (
        <div>
        <Box
        alignItems="center"
        display="flex"
        className={`${classes.timerComp1} ${classes.callWrapper1} ${classes.callInbound1}`}>
          
        {
             currentCall.callStatus === 'AgentCalled' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
       Call Ringing
     </Typography>
             </div>) : null
           }
           {
             currentCall.callStatus === 'AgentConnect' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
                 {localStorage.getItem('CallerNumber')}-Call in Progress
     </Typography>
             </div>) : null
           }
           {
             currentCall.callStatus === 'AgentComplete' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
                 {localStorage.getItem('CallerNumber')}- Call Disconnected
     </Typography>
             </div>) : null
           }
           {
             currentCall.callStatus === 'AgentDisposed' || currentCall.callStatus === 'LoggedIn' || currentCall.callStatus === 'BREAKOUT' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
      Free for next call
     </Typography>
             </div>) : null
           }
           {
             currentCall.callStatus === 'BREAKIN' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
               You are in Break
     </Typography>
             </div>) : null
           }
           {
             currentCall.callStatus === 'AgentRingNoAnswer' ? (<div>
               <CallIcon />
         &nbsp;
               <Typography display="inline">
                 {/* {localStorage.getItem('callerNumber')} */}
      Call Not Answered
     </Typography>
             </div>) : null
           }
        </Box>
     </div>     
      ):(null)
    }
    
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
            {
              localStorage.getItem('Agent_Object_ID') ? (
                <Button
              variant="contained"
              color={timeEnabled ? 'secondary' : 'primary'}
              style={{ color: 'white' }}
              onClick={breakService}
            >
              {timeEnabled ? 'Resume Work' : 'Take Break'}
            </Button>
              ):(
                <Button
              variant="contained"
              color={timeEnabled ? 'secondary' : 'primary'}
              style={{ color: 'white' }}
              onClick={handleBreakTimeOut}
            >
              {timeEnabled ? 'Resume Work' : 'Take Break'}
            </Button>
              )
            }
            
          </Grid>
          {
            localStorage.getItem('Agent_Object_ID') ? (null) :(
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
         
            )
          }
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
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
