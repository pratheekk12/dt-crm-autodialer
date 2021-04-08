import React, { useState } from 'react';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Dashboard = () => {
  const [formDisabled, setFormDisabled] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = React.useState(false);

  const getData = async () => {
    await axios
      .get('/channel/getdata')
      .then(res => {
        setCustomer(res.data);
        setFormDisabled(false);
        setOpen(true);
      })
      .catch(err => {
        setFormDisabled(true);
        console.log(err);
        setOpen(true);
      });
  };

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
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 2rem 2rem' }}>
        <Grid container spacing={5}>
          <Grid item lg={9} xs={12}>
            <LeadButtons />
          </Grid>
          <Grid container item justify="flex-end" lg={3} xs={12}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Fetch New Customer
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
              <DispositionForm visibilty={formDisabled} />
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
              <RecentFiveRecords />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
