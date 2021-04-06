import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

const AgentName = ({ name }) => {
  console.log(name);
  const names = [
    {
      name: 'Pavithra'
    },
    {
      name: 'Nandini'
    },
    {
      name: 'Bhuvaneshwari'
    },
    {
      name: 'Maria'
    }
  ];
  return (
    <>
      <Autocomplete
        id="agentName"
        options={names}
        onChange={(event, newValue) => {
          name(newValue);
        }}
        style={{ width: '100%', backgroundColor: 'white' }}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField {...params} label="Agent Name" variant="outlined" />
        )}
      />
    </>
  );
};

export default AgentName;
