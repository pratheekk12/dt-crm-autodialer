import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import React from 'react';
import FeedbackList from './FeedbackList';
import MostQuerryQuestion from './MostQuerryQuestion';
import OverallRating from './OverallRating';

const BranchDetail = ({ branch }) => {
  return (
    <>
      <div id="chart" style={{ marginTop: '1.5rem' }}>
        <Card style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <CardHeader title={branch.name} />
        </Card>
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

export default BranchDetail;
