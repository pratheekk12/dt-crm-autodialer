import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const RecentFiveRecords = ({ records }) => {
  const columns = [
    {
      field: 'agentName',
      headerName: 'Agent Name',
      flex: 2,
      renderCell: rowData => rowData.row.agentName
    },
    {
      field: 'guestName',
      headerName: 'GuestName',
      flex: 2,
      renderCell: rowData => rowData.row.guestName
    },
    {
      field: 'mainDisposition',
      headerName: 'Call Status',
      flex: 2,
      renderCell: rowData => rowData.row.mainDisposition
    },
    {
      field: 'response',
      headerName: 'Response',
      flex: 2,
      renderCell: rowData => rowData.row.response
    },
    {
      field: 'suggestions',
      headerName: 'Suggestions',
      flex: 2,
      renderCell: rowData => rowData.row.suggestions
    },
    {
      field: 'overallScore',
      headerName: 'Rating',
      flex: 2,
      renderCell: rowData => rowData.row.overallScore
    }
  ];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">Last 5 Customer Interactions</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          records.length > 0 ? (
            <div style={{ height: 380, width: '100%' }}>
            <DataGrid
              columns={columns}
              rows={
                records.length
                  ? records.map(record => ({
                      ...record,
                      id: record._id
                    }))
                  : []
              }
              pageSize={5}
              pagination
              autoHeight
            />
          </div>
          ) :(null)
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default RecentFiveRecords;
