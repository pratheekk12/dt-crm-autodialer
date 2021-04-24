import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader, Grid } from '@material-ui/core';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const FileHistoryTable = () => {
  const [fileHistoryList, setFileHistoryList] = useState(null);

  const getDispositionData = async () => {
    await axios
      .get('/channel/excel-uploads')
      .then(res => {
        setFileHistoryList(res.data);
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
      headerName: 'Date',
      flex: 1,
      renderCell: rowData => rowData.row.agentName
    },
    {
      field: 'guestName',
      headerName: 'Number of Records',
      flex: 1,
      renderCell: rowData => rowData.row.guestName
    },
    {
      field: 'mainDisposition',
      headerName: 'Status',
      flex: 1,
      renderCell: rowData => rowData.row.mainDisposition
    },
    {
      field: 'subDisposition',
      headerName: 'Type',
      flex: 1,
      renderCell: rowData => rowData.row.subDisposition
    }
    // {
    //   field: 'overallCustomerRating',
    //   headerName: 'Rating',
    //   flex: 1,
    //   renderCell: rowData => rowData.row.overallCustomerRating
    // }
  ];
  return (
    <>
      <Card style={{ marginTop: '2rem' }}>
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={6}>
            <CardHeader title={'File History Records'} />
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: '2rem'
            }}
          >
            {fileHistoryList && fileHistoryList.length > 0 && (
              <ExcelReport
                data={fileHistoryList}
                fileName={'File History Table'}
              />
            )}
          </div>
        </Grid>
      </Card>
      <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
        <DataGrid
          columns={columns}
          rows={
            fileHistoryList !== null && fileHistoryList.length > 0
              ? fileHistoryList.map(data => ({
                  ...data,
                  id: data._id
                }))
              : []
          }
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default FileHistoryTable;
