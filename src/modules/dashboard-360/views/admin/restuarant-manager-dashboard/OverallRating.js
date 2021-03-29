import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const OverallRating = () => {
  const series = [5.6, 9.6, 15, 30, 40];

  const options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: [
      '1 Star Rating',
      '2 Star Rating',
      '3 Star Rating',
      '4 Star Rating',
      '5 Star Rating'
    ],
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
          <CardHeader title={'Customer Rating'} />
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
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body1">
              Overall Customer Rating : 4.3 STAR
            </Typography>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default OverallRating;
