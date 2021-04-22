import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

const DateRangeForDispostion = ({ date }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const saveTime = () => {
    date({
      startDate,
      endDate
    });
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        align="flex-start"
        spacing={3}
      >
        <Grid item xs={12} lg={4}>
          <KeyboardDatePicker
            format="yyyy/MM/dd"
            id="disposition-start-date"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              'aria-label': 'start date'
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <KeyboardDatePicker
            id="disposition-end-date"
            variant="contained"
            label="End Date"
            format="yyyy/MM/dd"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'end date'
            }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Button variant="contained" color="primary" onClick={saveTime}>
            Fetch
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DateRangeForDispostion;
