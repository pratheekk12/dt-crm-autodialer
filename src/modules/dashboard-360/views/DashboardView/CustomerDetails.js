import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';

const CustomerDetails = () => {
  const columns = [
    { field: 'id', headerName: 'Order ID', flex: 1 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 1.5
    },
    {
      field: 'age',
      flex: 1,
      headerName: 'Age'
    },
    {
      field: 'memberType',
      flex: 1,
      headerName: 'Member Type'
    },
    {
      field: 'email',
      flex: 2,
      headerName: 'Email'
    }
  ];
  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      age: 27,
      memberType: 'Regular',
      email: 'amityadav12@gmail.com'
    }
  ];
  return (
    <>
      <div style={{ height: 170, width: '100%', backgroundColor: 'white' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pagination
          autoHeight
          pageSize={1}
        />
      </div>
    </>
  );
};

export default CustomerDetails;
