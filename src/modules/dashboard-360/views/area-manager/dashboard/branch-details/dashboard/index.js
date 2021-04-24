import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import CallInteractionTable from './CallInteractionTable';
import DispositionTable from './DispositionTable';
import SelectDates from './SelectDates';

const Dashbaord = () => {
  const [interactionTableParams, setInteractionTableParams] = useState({
    selectDate: null
  });

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <DispositionTable />
        </Grid>
        <Grid item xs={12}>
          <SelectDates tableParams={setInteractionTableParams} />
        </Grid>
        <Grid item xs={12}>
          {interactionTableParams.selectDate && (
            <CallInteractionTable tableParams={interactionTableParams} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashbaord;
