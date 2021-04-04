import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const RecentFiveRecords = () => {
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'customerName',
      headerName: 'Customer Name',
      flex: 2
    },
    {
      field: 'option1',
      flex: 1,
      headerName: 'Option 1'
    },
    {
      field: 'option2',
      flex: 1,
      headerName: 'Option 2'
    },
    {
      field: 'option3',
      flex: 1,
      headerName: 'Option 3'
    },
    {
      field: 'option4',
      flex: 1,
      headerName: 'Option 4'
    }
  ];

  const rows = [
    {
      id: 1,
      customerName: 'Amit Yadav',
      option1: 'True',
      option2: 'True',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 2,
      customerName: 'Dhaval Patel',
      option1: 'True',
      option2: 'False',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 3,
      customerName: 'Payal Parmar',
      option1: 'False',
      option2: 'True',
      option3: 'False',
      option4: 'True'
    },
    {
      id: 4,
      customerName: 'Riya Singh',
      option1: 'True',
      option2: 'True',
      option3: 'True',
      option4: 'True'
    },
    {
      id: 4,
      customerName: 'Kishan Chauhan',
      option1: 'True',
      option2: 'True',
      option3: 'False',
      option4: 'False'
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
            rows={rows}
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
