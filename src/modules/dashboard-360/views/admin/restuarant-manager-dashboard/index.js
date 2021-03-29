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
      <div style={{ margin: '2rem' }}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item xs={12}>
            <OverallRating />
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing="3"
          >
            <Grid item xs={5}>
              <MostQuerryQuestion />
            </Grid>
            <Grid item xs={7}>
              <FeedbackList />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Manager;
