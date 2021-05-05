import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import CallInteractionTable from '../../../../../components/CallInteractionTable';
import DispositionTable from '../../../../../components/DispositionTable';
import SelectDates from '../../../../../components/SelectDates';

const Dashbaord = ({ branchDetails }) => {
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
            <CallInteractionTable
              tableParams={interactionTableParams}
              restaurantId={branchDetails._id}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Dashbaord;
