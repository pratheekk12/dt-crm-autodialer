import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Box, ButtonGroup, makeStyles } from '@material-ui/core';
import Axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0.5rem 1rem 1rem 1rem'
  },
  dataGrid: {
    backgroundColor: theme.palette.background.paper
  }
}));

const colConfig = [
  {
    field: 'guestName',
    headerName: 'Guest Name',
    renderCell: rowData => rowData.row.guestName,
    flex: 1
  },
  {
    field: 'phone',
    headerName: 'Phone Number',
    renderCell: rowData => rowData.row.phoneNumber,
    flex: 1
  },
  // {
  //   field: 'email',
  //   headerName: 'Email',
  //   flex: 1,
  //   renderCell: rowData => rowData.row.email
  // },
  {
    field: 'rating',
    headerName: 'Overall Rating',
    renderCell: rowData => rowData.row.overallRating,
    flex: 1
  },
  {
    field: 'outlet',
    headerName: 'Outlet',
    renderCell: rowData => rowData.row.outlet,
    flex: 2
  }
];

const OneDirectApi = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');

  // let templates = [
  //   {
  //     templateId: '01',
  //     label: 'Name 1',
  //     content: `<p>This is the initial content of the editor</p>
  //   <p>This is content</p>
  //   <p><strong>This text is wrap in strong tag</strong></p>
  //   <h1><strong>Heading 1</strong></h1>`
  //   },
  //   {
  //     templateId: '02',
  //     label: 'Name 2',
  //     content: `<h2>This is Image</h2>
  //     <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://picsum.photos/seed/picsum/200/300" alt="My alt text" width="156" height="234" /></p>`
  //   },
  //   {
  //     templateId: '03',
  //     label: 'Name 3',
  //     content: `<p>This is the Demo Text</p>
  //   <p>This is content from a template 3</p>
  //   `
  //   }
  // ];

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    (async function getQuestions() {
      try {
        const res = await Axios.get('/channel/getsheetdata');
        setUserData(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (Err) {
        console.log(Err);
        setError(Err);
      }

      // finally {
      //   setLoading(false);
      // }
    })();
  }, []);

  return (
    <div className={classes.root}>
      {/* <Box marginBottom={2}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/campaign/dashboard">Dashboard</Link>
          </Button>
          <Button>
            <Link to="/campaign/templates">Templates</Link>
          </Button>
        </ButtonGroup>
      </Box> */}
      <Box style={{ marginTop: '1rem', height: 690, width: 1200 }}>
        <DataGrid
          rows={userData.map(user => ({
            ...user,
            id: user._id
          }))}
          columns={colConfig}
          autoHeight="true"
          pageSize={10}
          autoHeight
          // autoPageSize
          className={classes.dataGrid}
          loading={loading}
        />
      </Box>
    </div>
  );
};

export default OneDirectApi;
