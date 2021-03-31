import { Button, Grid } from '@material-ui/core';
import React from 'react';

const LeadButtons = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Total 500
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Pending 450
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Assigned 10
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Closed 30
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads To Followup 10
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadButtons;
