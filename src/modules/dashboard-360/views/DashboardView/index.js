import React from 'react';
import DispositionForm from './DispositionForm';
import { Grid, Card, CardHeader } from '@material-ui/core';
import PendingCallList from './PendingCallList';
import RecentFiveRecords from './RecentFiveRecords';
import LeadButtons from './LeadButtons';
import RecentCustomerOrderDetails from './RecentCustomerOrderDetails';

const Dashboard = () => {
  return (
    <>
      <div style={{ padding: '2rem' }}>
        {/* <Grid container direction="column" justify="center" spacing={5}>
          <Grid item xs={12}>
            <LeadButtons />
          </Grid>
          <Grid item lg={7} xs={12}>
            <Card style={{ display: 'flex', justifyContent: 'center' }}>
              <CardHeader title={'Disposition Form'} />
            </Card>
            <Card style={{ padding: '1rem' }}>
              <DispositionForm />
            </Card>
          </Grid>
          <Grid container item direction="column" lg={5} xs={12} spacing="5">
            <Grid item xs={12}>
              <PendingCallList />
            </Grid>
            <Grid item xs={12}>
              <RecentFiveRecords />
            </Grid>
          </Grid>
          <Grid item container justify="center" spacing={3} direction="row">
          </Grid>
        </Grid> */}
        <Grid container spacing="5">
          <Grid item xs={12}>
            <LeadButtons />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing="3">
          <Grid item lg={7} xs={12}>
            <Card style={{ display: 'flex', justifyContent: 'center' }}>
              <CardHeader title={'Disposition Form'} />
            </Card>
            <Card style={{ padding: '1rem' }}>
              <DispositionForm />
            </Card>
          </Grid>
          <Grid container item lg={5} xs={12} spacing="3">
            <Grid item xs={12}>
              <PendingCallList />
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
