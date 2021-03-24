import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';

const RecentFiveRecords = () => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 2
    },
    {
      field: 'option1',
      flex: 1,
      headerName: 'Option 1'
    },
    {
      field: 'option2',
      flex: 1,
      headerName: 'Option 2'
    },
    {
      field: 'option3',
      flex: 1,
      headerName: 'Option 3'
    },
    {
      field: 'option4',
      flex: 1,
      headerName: 'Option 4'
    }
  ];

  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      option1: 'True',
      option2: 'True',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 2,
      customerName: 'Dhaval Patel',
      option1: 'True',
      option2: 'False',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 3,
      customerName: 'Payal Parmar',
      option1: 'False',
      option2: 'True',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 4,
      customerName: 'Riya Singh',
      option1: 'True',
      option2: 'True',
      option3: 'True',
      option4: 'True'
    },
    {
      id: 4,
      customerName: 'Kishan Chauhan',
      option1: 'True',
      option2: 'True',
      option3: 'False',
      option4: 'False'
    }
  ];

  return (
    <>
      <div style={{ height: 400, width: '100%', margin: '4rem 0 3rem' }}>
        <Card style={{ display: 'flex', justifyContent: 'center' }}>
          <CardHeader title={'Last Five Disposition Data'} />
        </Card>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          pagination
          autoPageSize
        />
      </div>
    </>
  );
};

export default RecentFiveRecords;
