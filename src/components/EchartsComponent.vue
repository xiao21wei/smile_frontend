<template>
  <div ref="echartsContainer" style="width: 100%; height: 600px;"></div>
</template>


<script>
import * as echarts from 'echarts';


var option;

export default {
  mounted() {
    let chartFormdata = new FormData();
    this.$axios.post(`${this.$baseUrl}message/appointment_statistics`, chartFormdata).then(
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
        months: [], // 初始为空数组
        record_count: [{
          "year_month": "",
          "count": 0,
          "daily_records": [],
        }]
      }
    };
  },
  methods: {
    initChart() {
      var chartDom = this.$refs.echartsContainer;
      var myChart = echarts.init(chartDom);
      let chartFormdata = new FormData();
      chartFormdata.append('user_id', this.$store.state.user_id);
      console.log(this.chartData);

        option = {
          title: {
            text: '访客人数统计',
            subtext: '点击柱状图查看每日预约人数',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: null,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.chartData.months.reverse(),
            axisTick: {
              alignWithLabel: true
            },
          },
          yAxis: {
            type: 'value',
            minInterval: 1,
          },
          dataGroupId: '',
          animationDurationUpdate: 500,
          series: {
            type: 'bar',
            id: 'sales',
            barWidth: '60%',
            data: this.chartData.record_count.map(item => {
              return {
                value: item.count,
                groupId: item.year_month
              };
            }).reverse(),
            universalTransition: {
              enabled: true,
              divideShape: 'clone'
            }
          },
        };
      const drilldownData = this.chartData.record_count.map(item => {
        return {
          dataGroupId: item.year_month,
          data: this.chartData = Object.entries(item.daily_records).map(
              ([day, count]) => [parseInt(day), count]).reverse(),
        };
      });
      console.log(option.series.data);
      console.log(drilldownData);
      myChart.on('click', function (event) {
        if (event.data) {
          var subData = drilldownData.find(function (data) {
            return data.dataGroupId === event.data.groupId;
          });
          if (!subData) {
            return;
          }
          myChart.setOption({
            title: {
              text: subData.dataGroupId+ '月份每日预约人数',
              subtext: '',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                return  subData.dataGroupId+'月'+params[0].name + '日预约人数：'+'<br>' + params[0].value + '人';
              },
            },
            xAxis: {
              data: subData.data.map(function (item) {
                return item[0];
              }).reverse()
            },
            yAxis: {
              type: 'value',
              minInterval: 1,
            },
            series: {
              type: 'line',
              id: 'sales',
              dataGroupId: subData.dataGroupId,
              data: subData.data.map(function (item) {
                return item[1];
              }),
              universalTransition: {
                enabled: true,
                divideShape: 'clone'
              }
            },
            graphic: [
              {
                type: 'text',
                left: 50,
                top: 20,
                style: {
                  text: 'Back',
                  fontSize: 18
                },
                onclick: function () {
                  myChart.setOption(option);
                }
              }
            ]
          });
        }
      });

      // 使用配置项初始化图表
      option && myChart.setOption(option);
    }
  },

};
</script>
