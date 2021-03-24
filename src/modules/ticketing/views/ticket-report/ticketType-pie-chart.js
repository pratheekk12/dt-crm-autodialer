import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import config from '../../views/config.json';
class TicketTypePieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            export: {
              csv: {
                filename: 'Ticket Type',
                columnDelimiter: ',',
                headerCategory: 'category',
                headerValue: 'count',
                dateFormatter(timestamp) {
                  return new Date(timestamp).toDateString();
                }
              }
            },
            autoSelected: 'zoom'
          },
          type: 'pie',
          width: 380
        },
        labels: [],
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
      }
    };
  }

  componentDidMount() {
    var data = [];
    var series = [];
    const apiUrl = config.APIS_URL + '/tickets/report/ticketType';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        repos.data.map(({ _id, count }) =>{ data.push(_id);series.push(count)});
      
        
        this.setState({
          series:series,
          options: {
            chart: { type: 'pie', width: 380 },
            labels: data,
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
          }
        });
      });
    
  }
  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
          height={320}
        />
      </div>
    );
  }
}

export default TicketTypePieChart;
