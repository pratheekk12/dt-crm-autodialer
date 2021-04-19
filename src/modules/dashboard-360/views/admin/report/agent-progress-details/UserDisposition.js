import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const UserDisposition = ({ reportsData }) => {
  const columns = [
    {
      field: 'guestName',
      headerName: 'Customer Name',
      flex: 1,
      renderCell: rowData => rowData.row.guestName
    },
    {
      field: 'mainDisposition',
      headerName: 'Main Disposition',
      flex: 1,
      renderCell: rowData => rowData.row.mainDisposition
    },
    {
      field: 'subDisposition',
      headerName: 'Sub Disposition',
      flex: 1,
      renderCell: rowData => rowData.row.subDisposition
    },
    {
      field: 'overallCustomerRating',
      headerName: 'Rating',
      flex: 1,
      renderCell: rowData => rowData.row.overallCustomerRating
    }
  ];

  return (
    <>
      <div
        style={{
          height: 380,
          width: '100%',
          backgroundColor: 'white'
        }}
      >
        <DataGrid
          columns={columns}
          rows={
            reportsData !== null
              ? reportsData.map(data => ({
                  ...data,
                  id: data._id
                }))
              : []
          }
          pageSize={5}
          pagination
          autoHeight
        />
      </div>
    </>
  );
};

export default UserDisposition;
