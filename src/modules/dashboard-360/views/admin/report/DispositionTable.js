import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import axios from 'axios';

const DispositionTable = ({ dispositionParams }) => {
  const tableStartDate = new Date();
  tableStartDate.setHours(0, 0, 0);
  const tableEndDate = new Date();
  tableEndDate.setHours(23, 59, 59);
  console.log('tableStartDate', tableStartDate, 'tableEndDate', tableEndDate);
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

  console.log('Datehjfdl', date);

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
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          autoHeight
        />
      </Card>
    </>
  );
};

export default DispositionTable;
