import { Component } from 'react'
import ApexCharts from 'react-apexcharts'
import React , { useState , useEffect } from 'react';
import axios from 'axios'

const timea = 10;

function abc(){
            axios.get("/member/timecal")
                         .then( re => {console.log(re.data); timea = re.data; } )
                         .catch( err => console.log(err) )


}


export default class App extends Component {

  constructor(props) {
            super(props);


            this.state = {

              series: [this.props.initNumber*10],
              options: {
                chart: {
                  height: 350,
                  type: 'radialBar',
                },
                plotOptions: {
                pie: {
                        size: 200
                      },
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
                  },
                },
                labels: ['평균근무시간'],
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