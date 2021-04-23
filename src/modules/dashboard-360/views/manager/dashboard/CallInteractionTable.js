import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader, Grid } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const CallInteractionTable = ({ tableParams }) => {
  const [interactionData, setInteractionData] = useState(null);
  let defaultDate = new Date();
  defaultDate.setHours(0, 0, 0);
  const getInteractionData = async () => {
    await axios
      .get('https://dt.granalytics.in/ami/cdr', {
        params: {
          date: tableParams.selectDate
            ? tableParams.selectDate.toISOString()
            : defaultDate.toISOString()
        }
      })
      .then(res => setInteractionData(res.data.cdr))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getInteractionData();
  }, [tableParams]);
  const columns = [
    {
      field: 'calldate',
      headerName: 'Call Date',
      flex: 1,
      renderCell: rowData => rowData.row.calldate.slice(0, 10)
    },
    {
      field: 'calltime',
      headerName: 'Call Time',
      flex: 1,
      renderCell: rowData => rowData.row.calldate.slice(11, 19)
    },
    {
      field: 'duration',
      headerName: 'Call Duration',
      flex: 1,
      renderCell: rowData => rowData.row.duration
    },
    {
      field: 'disposition',
      headerName: 'Disposition Status',
      flex: 1,
      renderCell: rowData => rowData.row.disposition
    },
    {
      field: 'recordingfile',
      headerName: 'Call Recording',
      flex: 1,
      renderCell: rowData => (
        <a target="_blank" href={rowData.row.recordingfile}>
          <Chip label="Download" clickable color="primary" />
        </a>
      )
    }
  ];
  return (
    <>
      <Card>
        <Grid container direction="row" justify="flex-end">
          <Grid item xs={6}>
            <CardHeader title={'Call Interactions Table'} />
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: '2rem'
            }}
          >
            {interactionData && interactionData.length > 0 && (
              <ExcelReport
                data={interactionData}
                fileName={'Manager CDR Table'}
              />
            )}
          </div>
        </Grid>
      </Card>
      <Card style={{ height: 420, width: '100%', padding: '1rem' }}>
        <DataGrid
          columns={columns}
          rows={
            interactionData !== null
              ? interactionData.map(data => ({
                  ...data,
                  id: interactionData.uniqueid
                }))
              : []
          }
          pageSize={5}
          pagination
          autoHeight
          rowsPerPageOptions={[5, 10, 20]}
        />
      </Card>
    </>
  );
};

export default CallInteractionTable;
