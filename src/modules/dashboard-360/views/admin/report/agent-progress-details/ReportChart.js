import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ReportChart = ({ leadsClosed }) => {
  const [allLeadsInProgress, setAllLeadsInProgress] = useState(0);

  async function leads() {
    try {
      const allLeadsInProgressResp = await axios.get(
        '/crm-route/allleadsinprogress'
      );
      setAllLeadsInProgress(allLeadsInProgressResp.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    leads();
  }, []);

  const series = [leadsClosed, allLeadsInProgress];

  const options = {
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: ['Leads Closed', 'Leads Pending'],
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
        {allLeadsInProgress && (
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={450}
          />
        )}
      </div>
    </>
  );
};

export default ReportChart;
