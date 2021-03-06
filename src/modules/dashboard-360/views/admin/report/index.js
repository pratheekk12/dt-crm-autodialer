import React, { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import { Grid } from '@material-ui/core';
import AgentName from './AgentName';
import StartEndDates from 'src/modules/dashboard-360/components/StartEndDates';
import DispositionTable from './DispositionTable';
import AgentProgressDetails from './agent-progress-details';
import DateRangeForDispostion from './DateRangeForDispostion';
import SelectDates from 'src/modules/dashboard-360/components/SelectDates';
import CallInteractionTable from 'src/modules/dashboard-360/components/CallInteractionTable';

const Report = () => {
  const [date, setDate] = React.useState({
    startDate: null,
    endDate: null
  });

  const [dispositionDate, setDispositionDate] = React.useState({
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
  const [interactionTableParams, setInteractionTableParams] = useState({
    selectDate: null
  });

  useEffect(() => {
    setReportParams({
      agentId: agentName.userId,
      startDate: date.startDate,
      endDate: date.endDate,
      agentName: agentName.username
    });
  }, [date, agentName]);

  return (
    <>
      <CustomBreadcrumbs />
      <div style={{ padding: '2rem', marginBottom: '1rem' }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
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
          <Grid item xs={12}>
            {reportParams.endDate && reportParams.agentId ? (
              <AgentProgressDetails reportParams={reportParams} />
            ) : null}
          </Grid>
          <Grid item xs={12} lg={6}>
            <DateRangeForDispostion date={setDispositionDate} />
          </Grid>
          <Grid item xs={12}>
            <DispositionTable dispositionParams={dispositionDate} />
          </Grid>
          <Grid item xs={12}>
            <SelectDates tableParams={setInteractionTableParams} />
          </Grid>
          <Grid item xs={12}>
            {interactionTableParams.selectDate && (
              <CallInteractionTable
                tableParams={interactionTableParams}
                restaurantId={null}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Report;
