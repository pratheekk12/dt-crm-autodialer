import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import axios from 'axios';

const DispositionTable = () => {
  const [reportsData, setReportsData] = useState(null);

  const getDispositionData = async () => {
    const tableStartDate = new Date();
    tableStartDate.setHours(0, 0, 0);
    const tableEndDate = new Date();
    tableEndDate.setHours(11, 59, 59);
    await axios
      .get('/crm-route/dispositionreports', {
        params: {
          startDate: tableStartDate.toISOString(),
          endDate: tableEndDate.toISOString()
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
      <Card style={{ display: 'flex', justifyContent: 'center' }}>
        <CardHeader title={'Disposition Table'} />
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
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default DispositionTable;
