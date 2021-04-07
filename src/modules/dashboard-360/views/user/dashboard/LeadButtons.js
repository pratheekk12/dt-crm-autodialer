import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const LeadButtons = () => {
  const [allLeads, setAllLeads] = useState(0);
  const [allLeadsInProgress, setAllLeadsInProgress] = useState(0);
  const [allLeadsComplete, setAllLeadsComplete] = useState(0);
  async function leads() {
    try {
      const allLeadsResp = await Axios.get('/crm-route/allleads');
      const allLeadsInProgressResp = await Axios.get('/crm-route/allleadsinprogress');
      const leadsClosedResp = await Axios.get('/crm-route/leadsclosed');
      setAllLeads(allLeadsResp.data);
      setAllLeadsInProgress(allLeadsInProgressResp.data);
      setAllLeadsComplete(leadsClosedResp.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(async () => {
    leads();
  }, []);
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
            Leads Total
{' '}
            {allLeads}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads In Progress {' '} {allLeadsInProgress}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Leads Closed {' '} {allLeadsComplete}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default LeadButtons;
