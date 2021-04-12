import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function StartEndDates() {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="row" justify="space-between" spacing={3}>
        <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
          <KeyboardDatePicker
            id="date-picker-dialog"
            label="End Date"
            format="yyyy/MM/dd"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'end date'
            }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
