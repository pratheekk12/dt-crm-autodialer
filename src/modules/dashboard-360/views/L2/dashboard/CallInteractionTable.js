import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardHeader } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const CallInteractionTable = ({ tableParams }) => {
  const [interactionData, setInteractionData] = useState(null);
  let defaultDate = new Date();
  defaultDate.setHours(0, 0, 0);
  // const getInteractionData = async () => {
  //   await axios
  //     .get('/ami/cdr', {
  //       params: {
  //         date: tableParams.selectDate
  //           ? tableParams.selectDate.toISOString()
  //           : defaultDate.toISOString()
  //       }
  //     })
  //     .then(res => setInteractionData(res.date))
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   getInteractionData();
  // }, [tableParams]);
  let response = {
    status: 200,
    total: 469,
    cdr: [
      {
        calldate: '2021-04-17T23:10:32.000Z',
        clid: "'DT' <1003>",
        src: '1003',
        dst: '27339512342',
        dcontext: 'from-internal',
        channel: 'SIP/1003-00000c64',
        dstchannel: 'IAX2/pbx-peer2-20324',
        lastapp: 'Dial',
        lastdata: 'IAX2/pbx-peer2/27339512342,300,',
        duration: 32,
        billsec: 0,
        disposition: 'NO ANSWER',
        amaflags: 3,
        accountcode: '',
        uniqueid: '1618701032.6270',
        userfield: '',
        recordingfile:
          'out-27339512342-1003-20210418-044032-1618701032.6270.wav',
        cnum: '1003',
        cnam: 'DT',
        outbound_cnum: '1003',
        outbound_cnam: 'DT',
        dst_cnam: ''
      }
    ],
    recordingFile: [
      'out-27339512342-1003-20210418-044032-1618701032.6270.wav',
      'out-29962063337-1002-20210418-044050-1618701050.6272.wav',
      'out-29840359591-1002-20210418-044220-1618701140.6274.wav',
      'out-29786880807-1003-20210418-044258-1618701178.6276.wav',
      'out-29635211585-1003-20210418-044446-1618701286.6278.wav'
    ]
  };
  setInteractionData(response.cdr);
  console.log('interactionData', interactionData);
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
      renderCell: rowData => rowData.row.calldate
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
      headerName: 'Call End',
      flex: 1,
      renderCell: rowData => (
        <Chip
          label="Download Recording"
          clickable
          color="primary"
          onClick={() => rowData.row.recordingfile}
        />
      )
    }
  ];
  return (
    <>
      <Card style={{ display: 'flex', justifyContent: 'center' }}>
        <CardHeader title={'Call Interactions Table'} />
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
        />
      </Card>
    </>
  );
};

export default CallInteractionTable;
