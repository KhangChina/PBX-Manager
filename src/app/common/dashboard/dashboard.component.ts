import { Component, OnInit, ViewChild } from '@angular/core';
import { colors } from 'app/colors.const';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
export interface ChartOptions2 {
  // Apex-Axis-Chart-Series
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  colors: string[];
  legend: ApexLegend;
  labels: any;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  states: ApexStates;
}
export interface ChartOptions3 {
  // Apex-non-axis-chart-series
  series?: ApexNonAxisChartSeries;
  chart?: ApexChart;
  stroke?: ApexStroke;
  tooltip?: ApexTooltip;
  dataLabels?: ApexDataLabels;
  fill?: ApexFill;
  colors?: string[];
  legend?: ApexLegend;
  labels?: any;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  markers?: ApexMarkers[];
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  states?: ApexStates;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  chartColors = {
    column: {
      series1: '#826af9',
      series2: '#d2b0ff',
      bg: '#f8d3ff'
    },
    success: {
      shade_100: '#7eefc7',
      shade_200: '#06774f'
    },
    donut: {
      series1: '#28C76F',
      series2: '#4b4b4b',
      series3: '#00cfe8',
      series4: '#EA5455',
    },
    area: {
      series3: '#a4f8cd',
      series2: '#60f2ca',
      series1: '#2bdac7'
    }
  };


  constructor() {
    this.gainedChartoptions = {
      chart: {
        height: 100,
        type: 'area',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        }
      },
      colors: [this.$primary],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2.5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.5,
          stops: [0, 80, 100]
        }
      },
      tooltip: {
        x: { show: false }
      }
    };
    this.orderChartoptions = {
          chart: {
            height: 100,
            type: 'area',
            toolbar: {
              show: false
            },
            sparkline: {
              enabled: true
            }
          },
          colors: [this.$warning],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2.5
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 0.9,
              opacityFrom: 0.7,
              opacityTo: 0.5,
              stops: [0, 80, 100]
            }
          },
          series: [
            {
              name: 'Orders',
              data: [10, 15, 8, 15, 7, 12, 8]
            }
          ],
          tooltip: {
            x: { show: false }
          }
    };
    this.supportChartoptions = {
      chart: {
        height: 290,
        type: 'radialBar',
        sparkline: {
          enabled: false
        }
      },
      plotOptions: {
        radialBar: {
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '65%'
          },
          track: {
            background: this.$white,
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              color: this.$textHeadingColor,
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              color: this.$textHeadingColor,
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [colors.solid.danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [colors.solid.primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: ['CPU Performant']
    };
    this.employeeDangerChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.danger],
      series: [100],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.employeeSuccessChartoptions = {
      chart: {
        height: 32,
        width: 32,
        type: 'radialBar'
      },
      grid: {
        show: false,
        padding: {
          left: -15,
          right: -15,
          top: -12,
          bottom: -15
        }
      },
      colors: [colors.solid.success],
      series: [100],
      plotOptions: {
        radialBar: {
          hollow: {
            size: '22%'
          },
          track: {
            background: this.$trackBgColor
          },
          dataLabels: {
            showOn: 'always',
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      stroke: {
        lineCap: 'round'
      }
    };
    this.salesavgChartoptions = {
        chart: {
          height: 270,
          toolbar: { show: false },
          type: 'line',
          dropShadow: {
            enabled: true,
            top: 20,
            left: 2,
            blur: 6,
            opacity: 0.2
          }
        },
        stroke: {
          curve: 'smooth',
          width: 4
        },
        grid: {
          borderColor: this.$label_color
        },
        legend: {
          show: false
        },
        colors: [this.$purple],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            inverseColors: false,
            gradientToColors: [this.$primary],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        xaxis: {
          labels: {
            style: {
              colors: this.$stroke_color
            }
          },
          axisTicks: {
            show: false
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisBorder: {
            show: false
          },
          tickPlacement: 'on'
        },
        yaxis: {
          tickAmount: 5,
          labels: {
            formatter: function (val) {
              return <string>(val > 999 ? (val / 1000).toFixed(1) + 'k' : val);
            }
          }
        },
        tooltip: {
          x: { show: false }
        }
    };
    this.apexDonutChart = {
      series: [10, 2, 20, 5],
      chart: {
        height: 350,
        type: 'donut'
      },
      colors: [
        this.chartColors.donut.series1,
        this.chartColors.donut.series2,
        this.chartColors.donut.series3,
        this.chartColors.donut.series4
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                fontSize: '2rem',
                fontFamily: 'Montserrat'
              },
              value: {
                fontSize: '1rem',
                fontFamily: 'Montserrat',
                formatter: function (val) {
                  return parseInt(val) + '%';
                }
              },
              total: {
                show: true,
                fontSize: '1.5rem',
                label: 'User',
                formatter: function (w) {
                  return '37 Device';
                }
              }
            }
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
      },
      labels: ['Online', 'Offline', 'Active', 'Deactivate'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };

  }

  ngOnInit() {
  }
  @ViewChild('gainedChartRef') gainedChartRef: any;
  @ViewChild('salesavgChartoptionsRef') salesavgChartoptionsRef: any;
  @ViewChild('apexDonutChartRef') apexDonutChartRef: any;

  public salesavgChartoptions: Partial<ChartOptions2>;
  public apexDonutChart: Partial<ChartOptions3>;

  public gainedChartoptions;
  public supportChartoptions;
  public salesChartoptions
  // public data: any;
  public orderChartoptions;
  private $primary = '#7367F0';
  private $warning = '#FF9F43';
  private $label_color = '#e7eef7';
  private $white = '#fff';
  private $textHeadingColor = '#5e5873';
  private $trackBgColor = '#e9ecef';
  private $stroke_color = '#ebe9f1';
  private $purple = '#df87f2';

  public employeeDangerChartoptions;
  public employeeSuccessChartoptions;


  

  public data = {
    subscribers_gained: {
      series: [
        {
          name: 'Call Out',
          data: [28, 40, 36, 52, 38, 60, 55]
        }
      ],
      analyticsData: {
        subscribers: '390'
      }
    },
    ordersRecevied: {
      series: [
        {
          name: 'Call On',
          data: [10, 15, 8, 15, 7, 12, 8]
        }
      ],
      analyticsData: {
        orders: '75'
      }
    },
    supportTracker: {
      series: [55],
      analyticsData: {
        tickets: 163,
        newTickets: 29,
        openTickets: 63,
        responseTime: '1d'
      }
    },
    sales: {
      series: [
        {
          name: 'Sales',
          data: [140, 180, 150, 205, 160, 295, 125, 255, 205, 305, 240, 295]
        }
      ],
      analyticsData: {
        totalSales: '12.84k'
      }
    },
  }


}
