import React from 'react';
import { Chip, withStyles, Card, CardHeader } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import CallIcon from '@material-ui/icons/Call';
import { green } from '@material-ui/core/colors';

const GreenChip = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  }
}))(Chip);

const PendingCallList = () => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center' },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 1.5
    },
    {
      field: 'callBtn',
      headerName: 'Action',
      flex: 1,
      renderCell: rowData => (
        <GreenChip
          color="primary"
          icon={<CallIcon fontSize="small" />}
          label="Call"
          style={{ color: 'white' }}
        />
      )
    }
  ];

  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav'
    },
    {
      id: 2,
      customerName: 'Dhaval Patel'
    },
    {
      id: 3,
      customerName: 'Bhavik Patel'
    },
    {
      id: 4,
      customerName: 'Payal Parmar'
    },
    {
      id: 5,
      customerName: 'Riya Singh'
    },
    {
      id: 6,
      customerName: 'Deepak Suthar'
    },
    {
      id: 7,
      customerName: 'Kishan Chauhan'
    },
    {
      id: 8,
      customerName: 'Bhavik Parmar'
    },
    {
      id: 9,
      customerName: 'Zuber Jalla'
    },
    {
      id: 10,
      customerName: 'Shashi Patil'
    },
    {
      id: 11,
      customerName: 'Mitali Gupta'
    },
    {
      id: 12,
      customerName: 'Priyanshu Gami'
    },
    {
      id: 13,
      customerName: 'Dinesh Kanayalal'
    }
  ];
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <Card style={{ display: 'flex', justifyContent: 'center' }}>
          <CardHeader title={'Customer Pending Call List'} />
        </Card>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={7}
          rowsPerPageOptions={[7, 10, 20]}
          pagination
          // autoHeight
        />
      </div>
    </>
  );
};

export default PendingCallList;
