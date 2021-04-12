import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export default function StartEndDates({ date }) {
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
      <Grid container direction="row" justify="space-between" spacing={3}>
        <Grid item xs={12} lg={4}>
          <KeyboardDatePicker
            format="yyyy/MM/dd"
            id="date-picker-inline"
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
            id="date-picker-dialog"
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
            Save
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
