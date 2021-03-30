import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const RecentCustomerOrderDetails = () => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 2
    },
    {
      field: 'age',
      flex: 1,
      headerName: 'Age'
    },
    {
      field: 'memberType',
      flex: 1.5,
      headerName: 'Member Type'
    },
    {
      field: 'phone',
      flex: 2,
      headerName: 'Phone'
    }
  ];
  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      age: '20',
      memberType: 'Regular',
      phone: 'xxxxxx8965'
    },
    {
      id: 2,
      customerName: 'Dhaval Patel',
      age: '35',
      memberType: 'Regular',
      phone: 'xxxxxx6584'
    }
  ];

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">Last 2 Customer Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ height: 230, width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={3}
              pagination
              autoHeight
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RecentCustomerOrderDetails;
