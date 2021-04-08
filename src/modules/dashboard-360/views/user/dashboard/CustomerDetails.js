import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';

const CustomerDetails = ({ customer }) => {
  console.log('customer', customer);
  const columns = [
    {
      field: 'guestName',
      headerName: 'Customer Name',
      flex: 1.5,
      renderCell: rowData => rowData.row.guestName
    },
    {
      field: 'overallRating',
      headerName: 'Rating',
      flex: 1,
      renderCell: rowData => rowData.row.overallRating
    },
    {
      field: 'overallExperience',
      headerName: 'Experience',
      flex: 1,
      renderCell: rowData => rowData.row.overallExperience
    }
  ];
  // const rows = [
  //   {
  //     id: 1,
  //     customerName: 'Amit Yadav',
  //     age: 27,
  //     memberType: 'Regular',
  //     email: 'amityadav12@gmail.com'
  //   }
  // ];
  return (
    <>
      <div style={{ height: 170, width: '100%', backgroundColor: 'white' }}>
        {customer !== '' && (
          <DataGrid
            columns={columns}
            rows={[{ ...customer, id: customer['_id'] }]}
            pagination
            autoHeight
            pageSize={1}
          />
        )}
      </div>
    </>
  );
};

export default CustomerDetails;
