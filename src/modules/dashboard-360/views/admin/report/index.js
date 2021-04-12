import React, { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import ReportChart from './ReportChart';
import { Grid } from '@material-ui/core';
import AgentName from './AgentName';
import StartEndDates from './StartEndDates';
import DispositionTable from './DispositionTable';

const Report = () => {
  const [agentName, setAgentName] = useState('');
  useEffect(() => {
    console.log(agentName);
  }, [agentName]);
  return (
    <>
      <CustomBreadcrumbs />
      <div style={{ padding: '2rem', marginBottom: '1rem' }}>
        <Grid
          container
          direction="row"
          justify="center"
          direction="row"
          alignItems="flex-start"
          spacing={3}
        >
          <Grid item xs={12} lg={6}>
            <AgentName name={setAgentName} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <StartEndDates />
          </Grid>
          <Grid item xs={12} lg={6}>
            {agentName !== null && agentName !== '' ? (
              <ReportChart agentName={agentName} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <DispositionTable />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Report;
