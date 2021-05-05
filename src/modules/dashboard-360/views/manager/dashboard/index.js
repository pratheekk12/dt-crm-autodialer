import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import CallInteractionTable from '../../../components/CallInteractionTable';
import DispositionTable from '../../../components/DispositionTable';
import SelectDates from '../../../components/SelectDates';
import { useSelector } from 'react-redux';

const Dashbaord = () => {
  const [interactionTableParams, setInteractionTableParams] = useState({
    selectDate: null
  });
  const userData = useSelector(state => state.userData);

  return (
    <>
      <div style={{ padding: '1rem 2rem 2rem' }}>
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
                restaurantId={userData.restaurants[0]}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Dashbaord;
