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
    { field: 'id', headerName: 'Order ID', flex: 1 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 2
    },
    {
      field: 'order1',
      flex: 1,
      headerName: 'Order 1'
    },
    {
      field: 'order2',
      flex: 1.5,
      headerName: 'Order 2'
    },
    {
      field: 'order3',
      flex: 2,
      headerName: 'Order 3'
    }
  ];
  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      order1: 'Item 1',
      order2: 'Item 2',
      order3: 'Item 3'
    },
    {
      id: 2,
      customerName: 'Amit Yadav',
      order1: 'Item 1',
      order2: 'Item 2',
      order3: 'Item 3'
    },
    {
      id: 3,
      customerName: 'Amit Yadav',
      order1: 'Item 1',
      order2: 'Item 2',
      order3: ''
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
          <Typography variant="body1">Last 3 Customer Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ height: 280, width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={1}
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
