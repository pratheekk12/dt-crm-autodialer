import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';

const RecentFiveRecords = ({ records }) => {
  const userData = useSelector(state => state.userData);
  const columns = [
    {
      field: 'languageChoosed',
      headerName: 'Language',
      flex: 1,
      renderCell: rowData => rowData.row.languageChoosed
    },
    {
      field: 'overallCustomerRating',
      headerName: 'Rating',
      flex: 1,
      renderCell: rowData => rowData.row.overallCustomerRating
    },
    {
      field: 'customerExperiences',
      headerName: 'Experience',
      flex: 1,
      renderCell: rowData => rowData.row.customerExperiences
    },
    {
      field: 'issues',
      headerName: 'Issues',
      flex: 2,
      renderCell: rowData => rowData.row.issues
    }
  ];

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">Last 5 agent Interaction</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default RecentFiveRecords;
