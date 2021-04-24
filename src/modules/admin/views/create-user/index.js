import { Box, Container, Paper, Snackbar } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CommonAlert from 'src/components/CommonAlert';
import RegistrationForm from 'src/components/RegistrationForm';
import Spinner from 'src/components/Spinner';
import { setRolesAction } from '../../redux/actions';
import { CRUD_ROLES } from '../../utils/endpoints';

function CreateUser({ roles, setRoles }) {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!roles) {
      getRoles();
    }
  }, [roles]);

  async function getRoles() {
    try {
      const res = await axios.get(CRUD_ROLES);
      setRoles(res.data);
    } catch (err) {
      setShowError(true);
      console.log(err);
    }
  }

  return (
    <Container maxWidth={false}>
      <Box margin={2}>
        <Paper>
          {roles ? (
            <RegistrationForm
              admin
              roles={roles}
              onSuccess={() => setShowSuccess(true)}
            />
          ) : (
            <>{showError ? <CommonAlert /> : <Spinner />}</>
          )}
          <Snackbar
            open={showSuccess}
            autoHideDuration={6000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <CommonAlert
              variant="success"
              text="User Created Successfully"
              onClose={() => setShowSuccess(false)}
            />
          </Snackbar>
        </Paper>
      </Box>
    </Container>
  );
}
const mapDispatchToProps = dispatch => ({
  setRoles: roles => dispatch(setRolesAction(roles))
});

const mapStateToProps = state => ({
  roles: state.roles
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
