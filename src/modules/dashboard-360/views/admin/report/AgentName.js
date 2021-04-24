import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentName = ({ name }) => {
  const [agentNames, setAgentNames] = useState(null);

  const getAgentName = async () => {
    await axios
      .get('/crm-route/agents')
      .then(res => {
        setAgentNames(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAgentName();
  }, []);
  return (
    <>
      {agentNames !== null && (
        <Autocomplete
          id="agentName"
          options={agentNames}
          onChange={(event, newValue) => {
            name(newValue);
          }}
          style={{ width: '100%', backgroundColor: 'white' }}
          getOptionLabel={option => option.username}
          renderInput={params => (
            <TextField {...params} label="Agent Name" variant="outlined" />
          )}
        />
      )}
    </>
  );
};

export default AgentName;
