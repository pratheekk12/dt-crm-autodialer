import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Snackbar,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import CommonAlert from 'src/components/CommonAlert';
import Page from 'src/components/Page';
import RegistrationForm from 'src/components/RegistrationForm';

function EditProfile({ userData }) {
  const [showSuccess, setShowSuccess] = useState(false);
  return (
    <Page title="Edit Profile">
      <Container maxWidth={false}>
        <Grid container spacing={2}>
          <Grid container item xs={12} lg={4} style={{ marginBottom: 'auto' }}>
            {/* <Box padding={2}> */}
            <Card style={{ width: '100%' }}>
              <CardHeader title="My Profile"></CardHeader>
              <CardContent>
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Username:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {userData.username}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Email Id:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {userData.email}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Mobile:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {userData.phone}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Grid item container>
                  <Grid item xs={5}>
                    <Typography variant="h5">Role:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="h5" color="textSecondary">
                      {userData.role}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
              </CardContent>
            </Card>
            {/* </Box> */}
          </Grid>
          <Grid container item xs={12} lg={8}>
            <Card style={{ width: '100%' }}>
              <CardHeader title="Edit Profile" />
              <CardContent>
                <RegistrationForm
                  isEdit
                  onSuccess={isPassword =>
                    setShowSuccess(
                      isPassword
                        ? 'Password Updated Successfully'
                        : 'Profile Updated Successfully'
                    )
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={!!showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <CommonAlert
          variant="success"
          text={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </Snackbar>
    </Page>
  );
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps)(EditProfile);
