import {
  Box,
  Typography,
  Divider,
  Grid,
  FormControlLabel,
  Radio,
  makeStyles,
  Button,
  FormGroup,
  Paper,
  Snackbar,
  ButtonGroup
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { grey } from '@material-ui/core/colors';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, RadioGroup } from 'formik-material-ui';
import * as Yup from 'yup';
import Axios from 'axios';
import Spinner from 'src/components/Spinner';
import CommonAlert from 'src/components/CommonAlert';
import { connect } from 'react-redux';
import CreateRole from './CreateRole';
import { CRUD_ROLES } from '../../utils/endpoints';
import { setRolesAction } from '../../redux/actions';

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: 0
  },
  grey: {
    color: grey[50],
    backgroundColor: grey[50]
  },
  tab: {
    height: 50,
    border: '1px solid #4fa1e3',
    margin: theme.spacing(2),
    color: '#4fa1e3',
    '&:hover': {
      cursor: 'pointer'
    },
    '&.selected': {
      color: 'white',
      backgroundColor: '#4fa1e3'
    }
  }
}));

const AdminDashboard = ({ history, roles, setRoles }) => {
  const classes = useStyles();
  // const [error, setError] = useState({ helperText: ' ', error: false });
  const [rolesArray, setRolesArray] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);

  useEffect(() => {
    if (!roles) {
      getRoles();
    } else {
      setRolesArray(roles);
      if (!selectedTab) {
        setSelectedTab(roles[0]);
      }
      setShowLoader(false);
    }
  }, [roles]);

  async function getRoles() {
    try {
      const res = await Axios.get(CRUD_ROLES);
      setRoles(res.data);
    } catch (err) {
      setShowError(true);
      setShowLoader(false);
      console.log(err);
    }
  }

  async function updatePermissions(val) {
    try {
      setShowError(false);
      setShowSuccess(false);
      await Axios.patch(CRUD_ROLES, {
        roleId: selectedTab.roleId,
        permissions: val
      });
      const newObj = { ...selectedTab, permissions: val };
      const newRolesArray = rolesArray.map(role =>
        role.roleId === selectedTab.roleId ? newObj : role
      );
      setRoles(newRolesArray);
      setSelectedTab(newObj);
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  }

  function getRolesBlocks() {
    return rolesArray.map(role => (
      <Grid
        item
        xs={4}
        lg={2}
        container
        key={role.roleId}
        onClick={() => setSelectedTab(role)}
      >
        <Grid
          container
          alignItems="center"
          justify="center"
          className={`${classes.tab} ${selectedTab === role ? 'selected' : ''}`}
        >
          <Typography variant="h5">{role.label}</Typography>
        </Grid>
      </Grid>
    ));
  }
  function createRoleSuccessful() {
    setShowCreateRole(false);
    setShowLoader(true);
    setSelectedTab(null);
    getRoles();
  }
  return showLoader ? (
    <Spinner />
  ) : (
    <Box style={{ margin: '0.5rem 1rem' }}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowCreateRole(true)}
        >
          Create New Role
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/admin/manage-roles')}
        >
          Manage roles
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => history.push('/admin/manage-users')}
        >
          Manage users
        </Button>
      </ButtonGroup>
      {showCreateRole && (
        <CreateRole
          onSuccess={createRoleSuccessful}
          onCancel={() => setShowCreateRole(false)}
        />
      )}
      <br />
      <br />
      {showError && (
        <>
          <CommonAlert />
          <br />
        </>
      )}
      {!showError && !rolesArray?.length && (
        <Typography>No Roles Found</Typography>
      )}
      {showSuccess && (
        <Snackbar
          open
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <CommonAlert
            variant="success"
            text="Permissions Updated Successfully"
            onClose={() => setShowSuccess(false)}
          />
        </Snackbar>
      )}
      {!!selectedTab && (
        <Paper>
          <Grid container>{getRolesBlocks()}</Grid>
          <Divider />
          <div style={{ margin: '0.5rem 0 0.5rem 1rem' }}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>SERVICE NAME</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>PERMISSION LEVELS</Typography>
              </Grid>
            </Grid>
          </div>

          {/* Form */}

          <Formik
            initialValues={{ resources: '', ...selectedTab.permissions }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              updatePermissions(values);
            }}
            enableReinitialize
            validationSchema={Yup.object().shape()}
          >
            {() => (
              <Form>
                <div style={{ marginLeft: '1rem' }}>
                  <Grid container>
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Telephony</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="telephony"
                            value="callReceiving"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Call Receiving' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            value="callPlacing"
                            name="telephony"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Call Placing' }}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid container item>
                        <Grid item xs={6}>
                          <Typography variant="body1">Dash 360</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <FormGroup row>
                            <Field
                              component={CheckboxWithLabel}
                              name="dashboard"
                              value="admin"
                              color="primary"
                              type="checkbox"
                              Label={{ label: 'Admin' }}
                            />
                            {/* <Field
                              component={CheckboxWithLabel}
                              value="disposition"
                              name="dashboard"
                              color="primary"
                              type="checkbox"
                              Label={{ label: 'Disposition' }}
                            /> */}
                            <Field
                              component={CheckboxWithLabel}
                              value="disposition"
                              name="Agent"
                              color="primary"
                              type="checkbox"
                              Label={{ label: 'Agent' }}
                            />
                            <Field
                              component={CheckboxWithLabel}
                              value="disposition"
                              name="manager"
                              color="primary"
                              type="checkbox"
                              Label={{ label: 'Manager' }}
                            />
                            <Field
                              component={CheckboxWithLabel}
                              value="disposition"
                              name="areaManager"
                              color="primary"
                              type="checkbox"
                              Label={{ label: 'Area Manager' }}
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          Telephony Dashboard
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="telephonyDashboard"
                            value="inboundDashboard"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Inbound Dashboard' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="telephonyDashboard"
                            value="outboundDashboard"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Outbound Dashboard' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    {/* <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Tickets General</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketing"
                            value="user"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'User' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketing"
                            value="team"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Team' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketing"
                            value="all"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'All' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">
                          Tickets Dashboard
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketingDashboard"
                            value="user"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'User' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketingDashboard"
                            value="team"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Team' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="ticketingDashboard"
                            value="all"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'All' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Survey</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="survey"
                            value="dashboard"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Dashboard' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="survey"
                            value="admin"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Admin' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Campaign</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="campaign"
                            value="dashboard"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Dashboard' }}
                          />
                          <Field
                            component={CheckboxWithLabel}
                            name="campaign"
                            value="admin"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'Admin' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid> */}
                    <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Admin</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup row>
                          <Field
                            component={CheckboxWithLabel}
                            name="admin"
                            value="all"
                            color="primary"
                            type="checkbox"
                            Label={{ label: 'All' }}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                    {/* <Grid container item>
                      <Grid item xs={6}>
                        <Typography variant="body1">Resource Access</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Field component={RadioGroup} name="resources">
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                          >
                            <FormControlLabel
                              value="CR"
                              control={<Radio color="primary" />}
                              label="CR"
                            />
                            <FormControlLabel
                              control={<Radio color="primary" />}
                              value="CRU"
                              label="CRU"
                            />
                          </Grid>
                        </Field>
                      </Grid>
                    </Grid>*/}
                  </Grid>
                </div>
                <Divider />
                <div>
                  <Grid container alignItems="center" justify="center">
                    <Button
                      variant="contained"
                      size="medium"
                      type="submit"
                      color="primary"
                      startIcon={<SaveIcon />}
                      style={{ margin: '1rem 0' }}
                    >
                      Save
                    </Button>
                  </Grid>
                </div>
              </Form>
            )}
          </Formik>
        </Paper>
      )}
    </Box>
  );
};

const mapDispatchToProps = dispatch => ({
  setRoles: roles => dispatch(setRolesAction(roles))
});

const mapStateToProps = state => ({
  roles: state.roles
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
