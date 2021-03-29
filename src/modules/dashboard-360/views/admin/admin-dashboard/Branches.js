import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react';

const Branches = ({ value }) => {
  const branches = [
    {
      name: 'Branch 1'
    },
    {
      name: 'Branch 2'
    },
    {
      name: 'Branch 3'
    },
    {
      name: 'Branch 4'
    }
  ];
  return (
    <>
      <Autocomplete
        id="branches"
        options={branches}
        onChange={(event, newValue) => {
          value(newValue);
        }}
        style={{ width: '100%', backgroundColor: 'white' }}
        getOptionLabel={option => option.name}
        renderInput={params => (
          <TextField {...params} label="Branch Name" variant="outlined" />
        )}
      />
    </>
  );
};

export default Branches;
