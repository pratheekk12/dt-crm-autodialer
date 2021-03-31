import React from 'react';
import DispositionForm from './DispositionForm';
import { Grid, Card, CardHeader, Button } from '@material-ui/core';
import PendingCallList from './PendingCallList';
import RecentFiveRecords from './RecentFiveRecords';
import LeadButtons from './LeadButtons';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import RecentCustomerOrderDetails from './RecentCustomerOrderDetails';
import CustomerDetails from './CustomerDetails';

const Dashboard = () => {
  return (
    <>
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 2rem 2rem' }}>
        <Grid container spacing="5">
          <Grid item xs={9}>
            <LeadButtons />
          </Grid>
          <Grid container item justify="flex-end" xs={3}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '1.5rem' }}
            >
              Fetch New Customer
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing="3"
          style={{ marginTop: '1rem' }}
        >
          <Grid item lg={5} xs={12}>
            <Card style={{ display: 'flex', justifyContent: 'center' }}>
              <CardHeader title={'Disposition Form'} />
            </Card>
            <Card style={{ padding: '1rem' }}>
              <DispositionForm />
            </Card>
          </Grid>
          <Grid container item lg={7} xs={12} spacing="3">
            <Grid item xs={12}>
              <CustomerDetails />
            </Grid>
            <Grid item xs={12}>
              <RecentCustomerOrderDetails />
            </Grid>
            <Grid item xs={12}>
              <RecentFiveRecords />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;

// demo commit
