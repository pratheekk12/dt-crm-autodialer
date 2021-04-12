import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
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
  const getReportChart = async () => {
    await axios
      .get('/crm-route/agentreports', {
        params: {
          startDate: reportParams.startDate,
          endDate: reportParams.endDate,
          agentId: reportParams.agentId
        }
      })
      .then(res => {
        console.log('report res', res);
        // setAgentNames(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReportChart();
  }, []);

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
  return (
    <>
      <div id="chart">
        <Card style={{ textAlign: 'center' }}>
          <CardHeader title={reportParams.agentName} />
          <Divider />
          <CardContent>
            <ReactApexChart
              options={options}
              series={series}
              type="pie"
              width={380}
            />
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
