import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader, Grid } from '@material-ui/core';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const DispositionTable = ({ dispositionParams }) => {
  const tableStartDate = new Date();
  tableStartDate.setHours(0, 0, 0);
  const tableEndDate = new Date();
  tableEndDate.setHours(23, 59, 59);
  const [date, setDate] = useState({
    startDate: tableStartDate,
    endDate: tableEndDate
  });
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    if (dispositionParams.startDate !== null) {
      setDate({
        startDate: dispositionParams.startDate,
        endDate: dispositionParams.endDate
      });
    }
  }, [dispositionParams]);

  const getDispositionData = async () => {
    await axios
      .get('/crm-route/dispositionreports', {
        params: {
          startDate: date.startDate.toISOString(),
          endDate: date.endDate.toISOString()
        }
      })
      .then(res => {
        setReportsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDispositionData();
  }, [date]);

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
                fileName={'Admin Disposition Table'}
              />
            )}
          </div>
        </Grid>
      </Card>
      <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
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
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default DispositionTable;
