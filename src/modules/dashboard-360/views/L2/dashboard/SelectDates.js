import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

export default function SelectDates({ tableParams }) {
  const [selectDate, setSelectDate] = React.useState(new Date());

  const handleSelectDateChange = date => {
    setSelectDate(date);
  };

  const saveTime = () => {
    tableParams({
      selectDate
    });
    setSelectDate(new Date());
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={6} lg={3}>
          <KeyboardDatePicker
            format="yyyy/MM/dd"
            id="date-picker-inline"
            label="Select Date"
            value={selectDate}
            onChange={handleSelectDateChange}
            KeyboardButtonProps={{
              'aria-label': 'select date'
            }}
          />
        </Grid>
        <Grid item xs={6} lg={3}>
          <Button variant="contained" color="primary" onClick={saveTime}>
            Fetch
          </Button>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
