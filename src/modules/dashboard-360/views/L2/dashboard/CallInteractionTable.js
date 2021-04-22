import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import axios from 'axios';

const CallInteractionTable = ({ tableParams }) => {
  const [interactionData, setInteractionData] = useState(null);

  const columns = [
    {
      field: 'agentName',
      headerName: 'Agent Name',
      flex: 1,
      renderCell: rowData => rowData.row.agentName
    },
    {
      field: 'guestName',
      headerName: 'Customer Name',
      flex: 1,
      renderCell: rowData => rowData.row.guestName
    },
    {
      field: 'mainDisposition',
      headerName: 'Call Start',
      flex: 1,
      renderCell: rowData => rowData.row.mainDisposition
    },
    {
      field: 'subDisposition',
      headerName: 'Call End',
      flex: 1,
      renderCell: rowData => rowData.row.subDisposition
    },
    {
      field: 'overallCustomerRating',
      headerName: 'Download',
      flex: 1,
      renderCell: rowData => rowData.row.overallCustomerRating
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
                  id: data._id
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
