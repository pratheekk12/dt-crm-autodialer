import { Button, Grid } from '@material-ui/core';
import React from 'react';

const LeadButtons = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Total
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Pending
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Assigned
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Closed
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads To Followup
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadButtons;
