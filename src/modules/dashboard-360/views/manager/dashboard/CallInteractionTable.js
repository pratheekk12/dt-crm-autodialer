import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const CallInteractionTable = ({ tableParams }) => {
  const [interactionData, setInteractionData] = useState(null);
  let defaultDate = new Date();
  defaultDate.setHours(0, 0, 0);
  const getInteractionData = async () => {
    await axios
      .get('http://192.168.4.44:42002/ami/cdr', {
        params: {
          date: tableParams.selectDate
            ? tableParams.selectDate.toISOString().slice(0, 10)
            : defaultDate.toISOString().slice(0, 10)
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
      headerName: 'Call Recording',
      flex: 1,
      renderCell: rowData => (
        <a target="_blank" href={rowData.row.recordingfile}>
          <Chip label="Download" clickable color="primary" />
        </a>
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
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Card>
    </>
  );
};

export default CallInteractionTable;
