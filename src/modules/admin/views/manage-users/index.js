import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Tooltip
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CommonAlert from 'src/components/CommonAlert';
import Spinner from 'src/components/Spinner';
import { setRolesAction } from '../../redux/actions';
import { GET_USERS, CRUD_ROLES } from '../../utils/endpoints';
import EditIcon from '@material-ui/icons/Edit';
import ChangeRole from './ChangeRole';
const styles = makeStyles(theme => ({
  searchBox: {
    width: '100%',
    margin: `${theme.spacing(2)} 0`,
    backgroundColor: 'white',
    maxWidth: 400
  }
}));
const ManageUsers = ({ roles, setRoles, history }) => {
  const [rolesObj, setRolesObj] = useState({});
  const [users, setUsers] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchParam, setSearchParam] = useState('');
  const [editUser, showEditUser] = useState(null);
  const classes = styles();
  useEffect(() => {
    getUsers();
  }, [searchParam]);
  useEffect(() => {
    if (!roles) {
      getRoles();
    } else {
      const obj = {};
      roles.forEach(role => {
        obj[role.role] = role.label;
      });
      setRolesObj(obj);
    }
  }, [roles]);

  async function getRoles() {
    try {
      const res = await axios.get(CRUD_ROLES);
      setRoles(res.data);
    } catch (err) {
      setShowError(true);
      setShowLoader(false);
      console.log(err);
    }
  }

  async function updateRoleForUserLocal(val) {
    setUsers(
      users.map(user =>
        user.userId === val.userId
          ? {
              ...user,
              auth: {
                ...user.auth,
                role: val.role
              }
            }
          : user
      )
    );
    setShowSuccess(true);
    showEditUser(null);
  }
  async function getUsers() {
    try {
      setShowLoader(true);
      const res = await axios.get(
        `${GET_USERS}${searchParam ? '?search=' + searchParam : ''}`
      );
      setUsers(res.data.users);
    } catch (err) {
      setShowError(true);
      console.log(err);
    } finally {
      setShowLoader(false);
    }
  }

  return (
    <>
      <br />
      <Container maxWidth={false}>
        <div style={{ margin: '1rem 0', display: 'flex' }}>
          <TextField
            onChange={e => setSearchParam(e.target.value)}
            label="Email"
            className={classes.searchBox}
            InputLabelProps={{
              shrink: true
            }}
            placeholder="Enter Username/Email to search for"
            variant="outlined"
          />

          <Button
            variant="outlined"
            color="primary"
            onClick={() => history.push('/admin/manage-users/create')}
            style={{ margin: 'auto 1rem' }}
          >
            Create New User
          </Button>
        </div>
        {showLoader ? (
          <Spinner />
        ) : (
          <>
            {showError && (
              <div style={{ padding: '15px 0' }}>
                <CommonAlert
                  text={
                    showError.message ||
                    'Something went wrong. Please try again'
                  }
                />
              </div>
            )}
            {users && (
              <>
                <Paper>
                  <div style={{ height: 675, width: '100%' }}>
                    <DataGrid
                      columns={[
                        { field: 'username', headerName: 'Username', flex: 1 },
                        { field: 'email', headerName: 'Email', flex: 1 },
                        { field: 'phone', headerName: 'Mobile', flex: 1 },
                        {
                          field: 'role',
                          headerName: 'Role',
                          flex: 1,
                          renderCell: ({ row: { auth = {} } }) =>
                            auth.role === 'user'
                              ? 'default'
                              : rolesObj[auth.role] || auth.role
                        },
                        {
                          field: 'id',
                          headerName: 'Actions',
                          renderCell: rowData => (
                            <>
                              <Tooltip title="Edit">
                                <IconButton
                                  onClick={() => showEditUser(rowData.row)}
                                >
                                  <EditIcon color="primary" />
                                </IconButton>
                              </Tooltip>
                            </>
                          ),
                          flex: 3
                        }
                      ]}
                      rows={users.map(user => ({
                        id: user.userId,
                        ...user
                      }))}
                      pageSize={10}
                      rowsPerPageOptions={[10, 20, 50]}
                      pagination
                    />
                    <Dialog
                      open={!!editUser}
                      onClose={() => showEditUser(null)}
                      style={{ padding: 0 }}
                    >
                      <DialogTitle>Change Role</DialogTitle>
                      <DialogContent>
                        <ChangeRole
                          roles={roles}
                          userData={editUser}
                          onSuccess={role => updateRoleForUserLocal(role)}
                          onCancel={() => showEditUser(null)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Snackbar
                      open={showSuccess}
                      autoHideDuration={6000}
                      onClose={() => setShowSuccess(false)}
                      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                      <CommonAlert
                        variant="success"
                        text={
                          showSuccess.message ||
                          'User Role Updated Successfully'
                        }
                        onClose={() => setShowSuccess(false)}
                      />
                    </Snackbar>
                  </div>
                </Paper>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setRoles: roles => dispatch(setRolesAction(roles))
});

const mapStateToProps = state => ({
  roles: state.roles
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
