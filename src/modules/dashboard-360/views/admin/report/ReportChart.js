import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DataGrid } from '@material-ui/data-grid';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const ReportChart = ({ reportParams }) => {
  const [reportsData, setReportsData] = useState(null);
  const getReportChart = async () => {
    await axios
      .get('/crm-route/agentreports', {
        params: {
          startDate: reportParams.startDate.toISOString(),
          endDate: reportParams.endDate.toISOString(),
          agentId: reportParams.agentId
        }
      })
      .then(res => {
        console.log('report res', res);
        setReportsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReportChart();
  }, [reportParams]);

  const series = [65, 45, 20];

  const options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: ['Total Leads', 'Leads Pending', 'Leads Closed'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

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
      <div id="chart">
        <Card style={{ textAlign: 'center' }}>
          <CardHeader title={reportParams.agentName} />
          <Divider />
          <CardContent>
            {/* <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={380}
            /> */}
            <div
              style={{
                height: 380,
                width: '100%'
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
          </CardContent>
          <Divider />
          {/* <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body1">Most rating on : Satisfied</Typography>
          </CardActions> */}
        </Card>
      </div>
    </>
  );
};

export default ReportChart;
