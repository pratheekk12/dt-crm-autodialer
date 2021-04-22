import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const CallInteractionTable = ({ tableParams }) => {
  const [interactionData, setInteractionData] = useState(null);
  let defaultDate = new Date();
  defaultDate.setHours(0, 0, 0);
  console.log(defaultDate);
  const getInteractionData = async () => {
    await axios
      .get('/ami/cdr', {
        params: {
          date: tableParams.selectDate
            ? tableParams.selectDate.toISOString()
            : defaultDate.toISOString()
        }
      })
      .then(res => setInteractionData(res.date))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getInteractionData();
  }, [tableParams]);
  const columns = [
    {
      field: 'calldate',
      headerName: 'Call Date',
      flex: 1,
      renderCell: rowData => rowData.row.calldate
    },
    {
      field: 'duration',
      headerName: 'Call Duration',
      flex: 1,
      renderCell: rowData => rowData.row.duration
    },
    {
      field: 'disposition',
      headerName: 'Disposition Status',
      flex: 1,
      renderCell: rowData => rowData.row.disposition
    },
    {
      field: 'recordingfile',
      headerName: 'Call End',
      flex: 1,
      renderCell: rowData => (
        <Chip
          label="Download Recording"
          clickable
          color="primary"
          onClick={() => rowData.row.recordingfile}
        />
      )
    }
  ];
  return (
    <>
      <Card style={{ display: 'flex', justifyContent: 'center' }}>
        <CardHeader title={'Call Interactions Table'} />
      </Card>
      <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
        <DataGrid
          columns={columns}
          rows={
            interactionData !== null
              ? interactionData.map(data => ({
                  ...data,
                  id: interactionData.uniqueid
                }))
              : []
          }
          pageSize={5}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default CallInteractionTable;
