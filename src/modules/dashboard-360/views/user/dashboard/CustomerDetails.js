// import React from 'react';
// import { DataGrid } from '@material-ui/data-grid';
// import {
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails
// } from '@material-ui/core';

// const CustomerDetails = ({ customer }) => {
//   console.log('customer', customer);
//   const columns = [
//     {
//       field: 'guestName',
//       headerName: 'Customer Name',
//       flex: 1.5,
//       renderCell: rowData => rowData.row.guestName
//     },
//     {
//       field: 'overallRating',
//       headerName: 'Rating',
//       flex: 1,
//       renderCell: rowData => rowData.row.overallRating
//     },
//     {
//       field: 'overallExperience',
//       headerName: 'Experience',
//       flex: 1,
//       renderCell: rowData => rowData.row.overallExperience
//     }
//   ];
//   // const rows = [
//   //   {
//   //     id: 1,
//   //     customerName: 'Amit Yadav',
//   //     age: 27,
//   //     memberType: 'Regular',
//   //     email: 'amityadav12@gmail.com'
//   //   }
//   // ];
//   return (
//     <>
//       <div
//         style={
//           customer !== null
//             ? { height: 106, backgroundColor: 'white' }
//             : { height: 160, width: '100%', backgroundColor: 'white' }
//         }
//       >
//         <DataGrid
//           columns={columns}
//           rows={customer !== null ? [{ ...customer, id: customer['_id'] }] : []}
//           // pagination
//           autoHeight
//           pageSize={1}
//           hideFooter
//         />
//       </div>
//     </>
//   );
// };

// export default CustomerDetails;

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
  console.log(customer);
  let rows = [];
  if (customer !== null) {
    rows = [
      createData('Guest Name', customer.guestName),
      createData('Experience Rating', customer.overallExperience),
      createData('Overall Rating', customer.overallRating),
      createData('Outlet', customer.outlet),
      createData('Feedback Date', customer.feedbackRegisteredDate),
      createData('Feedback Time', customer.feedbackRegisteredDate),
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
