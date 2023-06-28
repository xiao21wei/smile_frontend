<template>
  <div ref="echartsContainerRepair" style="width: 100%; height: 650px;"></div>
</template>


<script>
import * as echarts from 'echarts';


var option;

export default {
  mounted() {
    let chartFormdata = new FormData();
    this.$axios.post(`${this.$baseUrl}message/maintenance_statistics`, chartFormdata).then(
        res => {
          // console.log(res.data.msg);
          this.chartData = res.data.data;
          console.log(this.chartData);
          this.initChart();
        }
    )
  },
  data() {
    return {
      chartData: {
        cleaner: [],
        water: [],
        mechanic: [],
        electric: []

      }
    };
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.echartsContainerRepair;
      var myChart = echarts.init(chartDom);

      let chartFormdata = new FormData();
      chartFormdata.append('user_id', this.$store.state.user_id);
      console.log(this.chartData);

      const water_data = [];
      this.chartData.water.forEach((item) => {
        water_data.push(item.count);
      });
      water_data.push('水利维修');
      water_data.reverse()
      const electric_data = [];
      this.chartData.electric.forEach((item) => {
        electric_data.push(item.count);
      });
      electric_data.push('电力维修');
      electric_data.reverse()
      const mechanic_data = [];
      this.chartData.mechanic.forEach((item) => {
        mechanic_data.push(item.count);
      });
      mechanic_data.push('机械维修');
      mechanic_data.reverse()
      const cleaner_data = [];
      this.chartData.cleaner.forEach((item) => {
        cleaner_data.push(item.count);
      });
      cleaner_data.push('清洁');
      cleaner_data.reverse()
      const month_data = [];
      this.chartData.cleaner.forEach((item) => {
        const [year, month] = item.year_month.split('-');
        month_data.push(`${year}-${month}`);
      });
      month_data.push('工单类型');
      month_data.reverse()
      console.log(month_data[12])
      var source_data = [
        month_data,
        water_data,
        electric_data,
        mechanic_data,
        cleaner_data
      ]

      var field_index = source_data[0].indexOf(month_data[12])

      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: source_data
          },
          xAxis: {type: 'category'},
          yAxis: {gridIndex: 0},
          grid: {top: '55%'},
          series: [
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: {focus: 'series'}
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: {focus: 'series'}
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: {focus: 'series'}
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row',
              emphasis: {focus: 'series'}
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              emphasis: {
                focus: 'self'
              },
              label: {
                formatter: function (params) {
                  return params.data[0] + ': ' + params.data[field_index] + '次' +' (' + params.percent + '%)';
                }
              },
              encode: {
                itemName: '工单类型',
                value: field_index,
                tooltip: field_index
              }
            }
          ]
        };
        myChart.on('updateAxisPointer', function (event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: 'pie',
                label: {
                  formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        myChart.setOption(option);
      });
      option && myChart.setOption(option);
    }
  },

};
</script>