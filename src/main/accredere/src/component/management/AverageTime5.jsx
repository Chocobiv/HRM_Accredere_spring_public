import { Component } from 'react'
import ApexCharts from 'react-apexcharts'

const timea = 10;
export default class App extends Component {
  constructor(props) {
            super(props);

            this.state = {

              series: [this.props.initNumber],
              options: {
                chart: {
                  height: 350,
                  type: 'radialBar',
                  offsetY: -10
                },
                plotOptions: {
                  radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                      name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120
                      },
                      value: {
                        offsetY: 76,
                        fontSize: '22px',
                        color: undefined,
                        formatter: function (val) {
                          return (val/10).toFixed(1) + " hours";
                        }
                      }
                    }
                  }
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                      shade: 'dark',
                      shadeIntensity: 0.15,
                      inverseColors: false,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 50, 65, 91]
                  },
                },
                stroke: {
                  dashArray: 4
                },
                labels: ['평균 야근시간'],
              },
            };
          }



        render() {
          return (
              <div id="chart">
                  <ApexCharts options={this.state.options} series={this.state.series} type="radialBar" height={350} />
              </div>
              )
          }
        }