import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Tooltip
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CommonAlert from 'src/components/CommonAlert';
import Spinner from 'src/components/Spinner';
import { setRolesAction } from '../../redux/actions';
import { CRUD_ROLES } from '../../utils/endpoints';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateRole from '../dashboard/CreateRole';

function ManageRoles({ roles, setRoles }) {
  const [rolesArray, setRolesArray] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [showError, setShowError] = useState(false);
  const [editRole, showEditRole] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    if (!roles) {
      getRoles();
    } else {
      setRolesArray(roles);
      setShowLoader(false);
      showEditRole(null);
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
  async function deleteRole(role) {
    try {
      setShowError(false);
      await axios.delete(`${CRUD_ROLES}/${role.roleId}`);
      setRoles(roles.filter(role2 => role2.roleId !== role.roleId));
      setShowSuccess({ message: 'Role Deleted Successfully' });
    } catch (err) {
      setShowError(err.response.data);
      console.log(err.response);
    }
  }
  return (
    <>
      <br />
      <Container maxWidth={false}>
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
            {rolesArray && (
              <Paper>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    columns={[
                      { field: 'label', headerName: 'Label', flex: 1 },
                      { field: 'role', headerName: 'Role', flex: 1 },
                      {
                        field: 'id',
                        headerName: 'Actions',
                        renderCell: rowData => (
                          <>
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() => showEditRole(rowData.row)}
                              >
                                <EditIcon color="primary" />
                              </IconButton>
                            </Tooltip>
                            {rowData.row.role !== 'admin' && (
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => deleteRole(rowData.row)}
                                >
                                  <DeleteIcon color="secondary" />
                                </IconButton>
                              </Tooltip>
                            )}
                          </>
                        ),
                        flex: 3
                      }
                    ]}
                    rows={rolesArray.map(role => ({
                      id: role.roleId,
                      ...role
                    }))}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    pagination
                  />
                  <Dialog
                    open={!!editRole}
                    onClose={() => showEditRole(null)}
                    style={{ padding: 0 }}
                  >
                    <DialogContent style={{ padding: 0 }}>
                      <CreateRole
                        role={editRole}
                        onSuccess={() => {
                          setRoles(null);
                          setShowSuccess(true);
                        }}
                        onCancel={() => {
                          showEditRole(null);
                        }}
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
                      text={showSuccess.message || 'Role Updated Successfully'}
                      onClose={() => setShowSuccess(false)}
                    />
                  </Snackbar>
                </div>
              </Paper>
            )}
          </>
        )}
      </Container>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  setRoles: roles => dispatch(setRolesAction(roles))
});

const mapStateToProps = state => ({
  roles: state.roles
});
export default connect(mapStateToProps, mapDispatchToProps)(ManageRoles);
