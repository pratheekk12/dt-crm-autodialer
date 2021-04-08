import React from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';

const ReportChart = ({ agentName }) => {
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
          <CardHeader title={agentName.name} />
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
