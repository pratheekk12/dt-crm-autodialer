import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(key, value) {
  return { key, value };
}

const CustomerDetails = ({ customer }) => {
  const callAttempt = () => {
    if (!customer.hasOwnProperty('attemptCallBack')) return;
    if (customer.attemptCallBack === 0) return;
    if (customer.attemptCallBack === 1) return '1st Attempt';
    if (customer.attemptCallBack === 2) return '2nd Attempt';
    return '3rd Attempt';
  };
  let rows = [];
  if (customer !== null) {
    rows = [
      createData('Guest Name', customer.guestName),
      createData('Experience Rating', customer.overallExperience),
      createData('Call Attempts', callAttempt()),
      createData('Overall Rating', customer.overallRating),
      createData('Outlet', customer.outlet),
      createData('Feedback Date', customer.feedbackRegisteredDate),
      createData('Feedback Time', customer.feedbackRegisteredTime),
      createData('Comments', customer.comments),
      createData('Table Number', customer.tableName),
      createData('Waiter Name', customer.waiterName)
    ];
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customer table">
          <TableBody>
            {rows.length !== 0 &&
              rows.map(row => (
                <TableRow key={row.key}>
                  <TableCell component="th" scope="row">
                    {row.key}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomerDetails;
