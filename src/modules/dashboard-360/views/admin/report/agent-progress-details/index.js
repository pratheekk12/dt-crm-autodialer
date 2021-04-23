import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader } from '@material-ui/core';
import ReportChart from './ReportChart';
import UserDisposition from './UserDisposition';
import axios from 'axios';
import ExcelReport from 'src/components/ExcelReport';

const AgentProgressDetails = ({ reportParams }) => {
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
        setReportsData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReportChart();
  }, [reportParams]);
  return (
    <>
      <div id="chart" style={{ marginTop: '0.5rem' }}>
        <Card>
          <Grid container direction="row" justify="flex-end">
            <Grid item xs={6}>
              <CardHeader title={reportParams.agentName} />
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingRight: '2rem'
              }}
            >
              {reportsData && reportsData.length > 0 && (
                <ExcelReport
                  data={reportsData}
                  fileName={'User Disposition Table'}
                />
              )}
            </div>
          </Grid>
        </Card>
        {reportsData && (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12}>
              <UserDisposition reportsData={reportsData} />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default AgentProgressDetails;
