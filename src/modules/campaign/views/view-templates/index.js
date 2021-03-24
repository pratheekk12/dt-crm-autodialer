import React from 'react';
import { Button, Box, ButtonGroup, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0.5rem 1rem 1rem 1rem'
  },
  dataGrid: {
    backgroundColor: theme.palette.background.paper
  }
}));

const colConfig = [
  {
    field: 'templateId',
    headerName: 'Template Id',
    flex: 1
  },
  { field: 'label', headerName: 'Template Title', flex: 1 },
  {
    field: 'preview',
    headerName: 'Preview',
    flex: 1,
    renderCell: rowData => (
      <Link
        to={{
          pathname: `/campaign/templates`,
          data: { name: rowData.row.label, content: rowData.row.content }
        }}
      >
        Preview
      </Link>
    )
  }
];

const ViewTemplates = () => {
  const classes = useStyles();

  let templates = [
    {
      templateId: '01',
      label: 'Template 1',
      content: `<p>This is the initial content of the editor</p>
    <p>This is content</p>
    <p><strong>This text is wrap in strong tag</strong></p>
    <h1><strong>Heading 1</strong></h1>`
    },
    {
      templateId: '02',
      label: 'Template 2',
      content: `<h2>This is Image</h2>
      <p><img style="display: block; margin-left: auto; margin-right: auto;" src="https://picsum.photos/seed/picsum/200/300" alt="My alt text" width="156" height="234" /></p>`
    },
    {
      templateId: '03',
      label: 'Template 3',
      content: `<p>This is the Demo Text</p>
    <p>This is content from a template 3</p>
    `
    }
  ];

  return (
    <div className={classes.root}>
      <Box marginBottom={2}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/campaign/dashboard">Dashboard</Link>
          </Button>
          <Button>
            <Link to="/campaign/templates">Templates</Link>
          </Button>
        </ButtonGroup>
      </Box>
      <Box style={{ marginTop: '1rem' }}>
        <DataGrid
          rows={templates.map(template => ({
            ...template,
            id: template.templateId
          }))}
          columns={colConfig}
          autoHeight="true"
          pageSize={5}
          style={{ width: '100%' }}
          className={classes.dataGrid}
        />
      </Box>
    </div>
  );
};

export default ViewTemplates;
