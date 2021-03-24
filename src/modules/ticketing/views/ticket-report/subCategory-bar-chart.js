import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import config from '../../views/config.json';
class SubCategoryBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [
            'Delay dispatch',
            'Dispute',
            'Replacement',
            'Delay dispatch',
            'Dispute',
            'Replacement'
          ]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 91, 45, 33, 22]
        }
      ]
    };
  }
  componentDidMount() {
    var data = [];
    var series = [];
    const apiUrl = config.APIS_URL + '/tickets/report/category';
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        

        repos.data.map(({ _id, count }) => {
          data.push(_id);
          series.push(count);
        });

        this.setState({
          options: {
            chart: {
              id: 'apexchart-example'
            },
            xaxis: {
              categories: data
            }
          },
          series: [
            {
              name: 'series-1',
              data: series
            }
          ]
        });
      });
  }
  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width={'100%'}
        height={320}
      />
    );
  }
}

export default SubCategoryBarChart;
