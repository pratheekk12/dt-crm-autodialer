import React, { useState } from 'react';
import {
  Chip,
  withStyles,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Grid,
  Typography
} from '@material-ui/core';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PendingCallList = () => {
  const [detail, setDetail] = useState('');
  const handleClickOpen = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const columns = [
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
          label={rowData.row.callBtn}
          style={{ color: 'white' }}
        />
      )
    },
    {
      field: 'viewDetail',
      headerName: 'View Detail',
      flex: 1,
      renderCell: rowData => (
        <Button
          onClick={() => {
            setOpen(true);
            setDetail(rowData.row);
          }}
          variant="outlined"
          color="primary"
        >
          View Detail
        </Button>
      )
    }
  ];

  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      callBtn: 'Call'
    },
    {
      id: 2,
      customerName: 'Dhaval Patel',
      callBtn: 'Call'
    },
    {
      id: 3,
      customerName: 'Bhavik Patel',
      callBtn: 'Call'
    },
    {
      id: 4,
      customerName: 'Payal Parmar',
      callBtn: 'Call'
    },
    {
      id: 5,
      customerName: 'Riya Singh',
      callBtn: 'Call'
    },
    {
      id: 6,
      customerName: 'Deepak Suthar',
      callBtn: 'Call'
    },
    {
      id: 7,
      customerName: 'Kishan Chauhan',
      callBtn: 'Call'
    },
    {
      id: 8,
      customerName: 'Bhavik Parmar',
      callBtn: 'Call'
    },
    {
      id: 9,
      customerName: 'Zuber Jalla',
      callBtn: 'Call'
    },
    {
      id: 10,
      customerName: 'Shashi Patil',
      callBtn: 'Call'
    },
    {
      id: 11,
      customerName: 'Mitali Gupta',
      callBtn: 'Call'
    },
    {
      id: 12,
      customerName: 'Priyanshu Gami',
      callBtn: 'Call'
    },
    {
      id: 13,
      customerName: 'Dinesh Kanayalal',
      callBtn: 'Call'
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
          autoPageSize
          rowsPerPageOptions={[7, 10, 20]}
          pagination
          // onRowSelected={({ data }) => console.log(data)}
          // autoHeight
        />
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography variant="h2">All Customer Details</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column">
              <Grid item container direction="row">
                <Grid item xs={5}>
                  <Typography variant="body1">Id</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{detail.id}</Typography>
                </Grid>
              </Grid>
              <Grid item container direction="row">
                <Grid item xs={5}>
                  <Typography variant="body1">Name</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">{detail.customerName}</Typography>
                </Grid>
              </Grid>
              <Grid item container direction="row">
                <Grid item xs={5}>
                  <Typography variant="body1">Other Details</Typography>
                </Grid>
                <Grid item xs={1}>
                  :
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Other Details</Typography>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Disagree
            </Button> */}
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default PendingCallList;
