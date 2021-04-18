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

const MostQuerryQuestion = () => {
  const series = [25, 65, 10];

  const options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: ['It was Okay', 'Satisfied', 'Not Satisfied'],
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
          <CardHeader title={'Do you feel satisfied with our food?'} />
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
            <Typography variant="body1">Most rating on : Satisfied</Typography>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default MostQuerryQuestion;
