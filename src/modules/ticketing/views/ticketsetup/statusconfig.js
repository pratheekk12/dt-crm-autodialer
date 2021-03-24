import React, { useState, useEffect } from 'react';
import './App.css';
import config from '../config.json';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

import TextField from '@material-ui/core/TextField';
function StatusConfig() {
  const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        width: '25ch'
      }
    },
    formControl: {
      margin: theme.spacing(0)
    },
    selectEmpty: {
      marginTop: theme.spacing(0)
    }
  }));
  const [newRow, setNewRow] = useState({
    status: '',
    slahold: false,
    closed: false,
    color: '',
    active: true
  });
  const [apiStatuses, setApiStatuses] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [updatedRow, setUpdatedRow] = useState({
    status: '',
    slahold: false,
    closed: false,
    color: '',
    active: false
  });

  const updateRow = () => {
    const val = JSON.stringify(updatedRow.status);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      setIsEditing(-1);
      const apiUrl = config.APIS_URL + '/statuses';
      var apiParam = {
        method: 'PUT',
        headers: updatedRow
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiStatuses([]);
        });
    }
  };

  const addRow = e => {
    const val = JSON.stringify(newRow.status);

    if (val.length === 2) {
      alert('Please enter value');
    } else {
      const apiUrl = config.APIS_URL + '/statuses';
      var apiParam = {
        method: 'POST',
        headers: {
          status: newRow.status,
          slahold: newRow.slahold,
          closed: newRow.closed,
          color: newRow.color,
          active: newRow.active
        }
      };
      fetch(apiUrl, apiParam)
        .then(res => res.json())
        .then(repos => {
          setApiStatuses([]);
          setNewRow({
            status: '',
            slahold: false,
            closed: false,
            color: '',
            active: true
          });
        });
    }
  };

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/statuses';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        setApiStatuses(repos.data);
        setStatuses(apiStatuses);
      });
  }, [apiStatuses]);

  useEffect(() => {
    setUpdatedRow(isEditing === '-1' ? {} : statuses[isEditing]);
  }, [isEditing]);

  useEffect(() => {}, [statuses]);

  const handleStatusChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: event.target.value,
      slahold: updatedRow.slahold,
      closed: updatedRow.closed,
      color: updatedRow.color,
      active: updatedRow.active
    });
  };

  const handleSlaHoldChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: event.target.checked,
      closed: updatedRow.closed,
      color: updatedRow.color,
      active: updatedRow.active
    });
  };

  const handleColorChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: updatedRow.slahold,
      closed: updatedRow.closed,
      color: event.target.value,
      active: updatedRow.active
    });
  };

  const handleClosedChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: updatedRow.slahold,
      closed: event.target.checked,
      color: updatedRow.color,
      active: updatedRow.active
    });
  };

  const handleActiveChange = (index, event) => {
    setUpdatedRow({
      id: statuses[index]._id,
      status: updatedRow.status,
      slahold: updatedRow.slahold,
      closed: updatedRow.closed,
      color: updatedRow.color,
      active: event.target.checked
    });
  };

  return (
    <div>
      <div className="SectionHeader">Status</div>
      <Table>
        <TableRow>
          <TableCell>Sl. No.</TableCell>
          <TableCell>Status</TableCell>
          <TableCell style={{ textAlign: 'center' }}>SLA on Hold</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Closed</TableCell>
          <TableCell>Color</TableCell>
          <TableCell style={{ textAlign: 'center' }}>Active</TableCell>
          <TableCell></TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              label="Status"
              id="outlined-size-small"
              value={newRow.status}
              onChange={e =>
                setNewRow({
                  status: e.target.value,
                  slahold: newRow.slahold,
                  closed: newRow.closed,
                  color: newRow.color,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.slahold}
              onChange={e =>
                setNewRow({
                  status: newRow.status,
                  slahold: e.target.checked,
                  closed: newRow.closed,
                  color: newRow.color,
                  active: newRow.active
                })
              }
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.closed}
              onChange={e =>
                setNewRow({
                  status: newRow.status,
                  slahold: newRow.slahold,
                  closed: e.target.checked,
                  color: newRow.color,
                  active: newRow.active
                })
              }
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Status"
              id="outlined-size-small"
              value={newRow.color}
              onChange={e =>
                setNewRow({
                  status: newRow.status,
                  slahold: newRow.slahold,
                  closed: newRow.closed,
                  color: e.target.value,
                  active: newRow.active
                })
              }
              variant="outlined"
              size="small"
            />
          </TableCell>
          <TableCell>
            <Checkbox
              checked={newRow.active}
              onChange={e =>
                setNewRow({
                  status: newRow.status,
                  slahold: newRow.slahold,
                  closed: newRow.closed,
                  color: newRow.color,
                  active: e.target.checked
                })
              }
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={addRow}
              className="SmallButton"
            >
              Add
            </Button>
          </TableCell>
        </TableRow>
        {statuses.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Status"
                    id="outlined-size-small"
                    defaultValue={item.status}
                    onChange={e => handleStatusChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.status
                )}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Checkbox
                  defaultChecked={item.slahold}
                  disabled={isEditing === idx ? false : true}
                  onChange={e => handleSlaHoldChange(idx, e)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Checkbox
                  defaultChecked={item.closed}
                  disabled={isEditing === idx ? false : true}
                  onChange={e => handleClosedChange(idx, e)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
              <TableCell>
                {isEditing === idx ? (
                  <TextField
                    label="Color"
                    id="outlined-size-small"
                    defaultValue={item.color}
                    onChange={e => handleColorChange(idx, e)}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  item.color
                )}
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <Checkbox
                  defaultChecked={item.active}
                  disabled={isEditing === idx ? false : true}
                  onChange={e => handleActiveChange(idx, e)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e =>
                    isEditing === idx ? updateRow(item) : setIsEditing(idx)
                  }
                  className="SmallButton"
                >
                  {isEditing === idx ? 'Update' : 'Edit'}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

export default StatusConfig;
