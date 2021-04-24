import React, { useEffect, useState } from 'react';
import CustomBreadcrumbs from 'src/components/CustomBreadcrumbs';
import { Grid } from '@material-ui/core';
import BranchesOverallRating from './BranchesOverallRating';
import Branches from './Branches';
import BranchDetail from './branch-details';

const AdminDashboard = () => {
  const [value, setValue] = useState('');
  return (
    <>
      <CustomBreadcrumbs />
      <div style={{ padding: '1rem 1.5rem', marginBottom: '1rem' }}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          {/* <Grid item xs={12} lg={6}>
            <BranchesOverallRating />
          </Grid> */}
          <Grid item xs={12} lg={6}>
            <Branches value={setValue} />
          </Grid>
        </Grid>
        {value !== null && value !== '' ? (
          <BranchDetail branch={value} />
        ) : null}
      </div>
    </>
  );
};

export default AdminDashboard;
