import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';

const DispositionTable = () => {
  const columns = [
    { field: 'agentName', headerName: 'Agent Name', flex: 1 },
    { field: 'mainDisposition', headerName: 'Main Disposition', flex: 1 },
    { field: 'subDisposition', headerName: 'Sub Disposition', flex: 1 },
    { field: 'rating', headerName: 'Rating', flex: 1 }
  ];

  const rows = [
    {
      id: 1,
      agentName: 'Bhuvneshwari',
      mainDisposition: 'Connected',
      subDisposition: '',
      rating: '5'
    },
    {
      id: 2,
      agentName: 'Nandani',
      mainDisposition: 'Not Connected',
      subDisposition: 'RNR',
      rating: ''
    },
    {
      id: 3,
      agentName: 'Nandani',
      mainDisposition: 'Not Connected',
      subDisposition: 'Not Reachable',
      rating: ''
    },
    {
      id: 4,
      agentName: 'Bhuvneshwari',
      mainDisposition: 'Connected',
      subDisposition: '',
      rating: '4'
    },
    {
      id: 5,
      agentName: 'Bhuvneshwari',
      mainDisposition: 'Connected',
      subDisposition: '',
      rating: '4'
    }
  ];

  return (
    <>
      <Card style={{ display: 'flex', justifyContent: 'center' }}>
        <CardHeader title={'Disposition Table'} />
      </Card>
      <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
        <DataGrid
          columns={columns}
          rows={rows.map(row => ({
            ...row,
            id: row.id
          }))}
          pageSize={5}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default DispositionTable;
