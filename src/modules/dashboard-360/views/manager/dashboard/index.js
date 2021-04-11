import { Grid } from '@material-ui/core';
import React from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import FeedbackList from './FeedbackList';
import MostQuerryQuestion from './MostQuerryQuestion';
import OverallRating from './OverallRating';

const Manager = () => {
  return (
    <>
      <CustomBreadcrumbs />
      <div style={{ padding: '2rem', marginBottom: '1rem' }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} lg={6}>
            <OverallRating />
          </Grid>
          <Grid item xs={12} lg={6}>
            <MostQuerryQuestion />
          </Grid>
          <Grid item xs={12}>
            <FeedbackList />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Manager;
