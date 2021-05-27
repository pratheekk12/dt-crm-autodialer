import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import StartEndDates from 'src/modules/dashboard-360/components/StartEndDates';

const InrestoApi = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null
  });
  const [disableInrestoBtn, setDisableInrestoBtn] = useState(false);
  useEffect(() => {
    axios
      .post('/crm-route/inrestofeedback', {
        apiKey: '25c71cd65026ea2deef9d55c273c2b54',
        resId: '5964634c395506cf6949b9d5',
        start: date.startDate,
        end: date.endDate,
        limit: 200,
        skip: 0
      })
      // .then(function(response) {
      //   console.log(response);
      //   setDisableInrestoBtn(true);
      //   setTimeout(() => {
      //     setDisableInrestoBtn(false);
      //   }, 86400000);
      // })
      .then(function(response) {
        console.log(response);
        setDisableInrestoBtn(true);
        setTimeout(() => {
          setDisableInrestoBtn(false);
        }, 60000);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [date]);
  return (
    <>
      <div
        style={{
          height: 180,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Grid container direction="row" justify="center" spacing={3}>
          <Grid item lg={6} xs={12}>
            <StartEndDates disabled={disableInrestoBtn} date={setDate} />
          </Grid>
          {/* <Grid item lg={6} xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleInrestoApi}
              disabled={false}
            >
              Fetch Data
            </Button>
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default InrestoApi;
