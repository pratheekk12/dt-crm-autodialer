import React,{useState,useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  TableContainer,
  TableHead,
  Table,
  TableCell,
  TableRow,
  TableBody
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';

const RecentCustomerOrderDetails = (props) => {
  const {orders} = props

  //console.log(orders)

  //const [orders,setOrders] = useState([])
  const [items,setItems] = useState([])


  function createData(key, value) {
    return { key, value };
  }

  let rows = [];
  if (orders !== null) {
    rows = [
      createData('Date', orders.registerDate),
      createData('Time', orders.registerTime),
      createData('Outlet', orders.outlet),
      createData('Overall Rating', orders.rating),
      createData('Order Type', orders.orderType),
      createData('Order Cost', orders.orderCost),
    ];
  }

  const columns = [
    //{ field: 'id', headerName: 'Order ID', flex: 1 },
    {
      field: 'itemName',
      headerName: 'Item Name',
      flex: 2
    },
    {
      field: 'quantity',
      flex: 1,
      headerName: 'Quantity'
    },
    {
      field: 'totalCost',
      flex: 1.5,
      headerName: 'Total Cost'
    },
  ];
  


  console.log(orders)
  

  // useEffect(()=>{
  //   getCustomerlastThreeOrders()
   
  // },[])

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="body1">Last 3 Customer Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
              <div style={{ height: 480, width: '100%' }}>
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
      <br/>
      {
        Object.keys(orders) != 0 ? (
         <DataGrid 
         rows={orders.items}
         columns = {columns}
         autoHeight="true"
         pagination ="false"
         pageSize="3"
         />
        ):(null)
      }
     
        
          </div>
          
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RecentCustomerOrderDetails;
