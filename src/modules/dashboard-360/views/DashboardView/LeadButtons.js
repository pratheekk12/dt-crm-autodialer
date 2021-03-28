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
            Lead Bint
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Penalty Leads
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Adjust
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Closed
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Following
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadButtons;
