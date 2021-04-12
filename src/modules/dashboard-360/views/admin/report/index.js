import React, { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import ReportChart from './ReportChart';
import { Grid } from '@material-ui/core';
import AgentName from './AgentName';
import StartEndDates from './StartEndDates';
import DispositionTable from './DispositionTable';

const Report = () => {
  const [date, setDate] = React.useState({
    startDate: null,
    endDate: null
  });

  const [reportParams, setReportParams] = useState({
    agentId: null,
    startDate: null,
    endDate: null,
    agentName: null
  });

  const [agentName, setAgentName] = useState('');
  useEffect(() => {
    console.log(agentName);
  }, [agentName]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  useEffect(() => {
    setReportParams({
      agentId: agentName.userId,
      startDate: date.startDate,
      endDate: date.endDate,
      agentName: agentName.username
    });
  }, [date, agentName]);

  useEffect(() => {
    console.log('report params', reportParams);
  }, [reportParams]);
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
            <StartEndDates date={setDate} />
          </Grid>
          <Grid item xs={12} lg={6}>
            {reportParams.endDate !== null && reportParams.agentId !== null ? (
              <ReportChart reportParams={reportParams} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <DispositionTable date={date} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Report;
