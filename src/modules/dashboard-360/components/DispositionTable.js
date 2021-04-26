import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader, Grid } from '@material-ui/core';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const DispositionTable = () => {
  const [reportsData, setReportsData] = useState(null);

  const getDispositionData = async () => {
    await axios
      .get('/crm-route/dispositions')
      .then(res => {
        setReportsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDispositionData();
  }, []);

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
      headerName: 'Main Disposition',
      flex: 1,
      renderCell: rowData => rowData.row.mainDisposition
    },
    {
      field: 'subDisposition',
      headerName: 'Sub Disposition',
      flex: 1,
      renderCell: rowData => rowData.row.subDisposition
    },
    {
      field: 'overallCustomerRating',
      headerName: 'Rating',
      flex: 1,
      renderCell: rowData => rowData.row.overallCustomerRating
    }
  ];
  return (
    <>
      <Card>
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={6}>
            <CardHeader title={'Disposition Table'} />
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: '2rem'
            }}
          >
            {reportsData && reportsData.length > 0 && (
              <ExcelReport
                data={reportsData}
                fileName={'DTL2 Disposition Table'}
              />
            )}
          </div>
        </Grid>
      </Card>
      <Card
        style={{
          height: 420,
          width: '100%',
          padding: '1rem',
          overflowY: 'auto'
        }}
      >
        <DataGrid
          columns={columns}
          rows={
            reportsData !== null
              ? reportsData.map(data => ({
                  ...data,
                  id: data._id
                }))
              : []
          }
          pageSize={5}
          // rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default DispositionTable;
