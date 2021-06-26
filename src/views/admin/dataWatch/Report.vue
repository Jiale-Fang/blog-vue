<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>博文数据</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 1250px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入 echarts
// import echarts from 'echarts'
import _ from 'lodash'

export default {
  data () {
    return {
      // 指定图表的配置项和数据
      option: {
        backgroundColor: '#2c343c',
        textStyle: {
          color: 'rgba(255, 255, 255, 255)'
        },
        title: {
          text: '博文数据',
          textStyle: {
            color: 'rgba(255, 255, 255, 255)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['访问量', '评论数', '点赞量'],
          textStyle: {
            color: 'rgba(255, 255, 255, 255)'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '2-20']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '访问量',
            type: 'line'
            // data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '评论数',
            type: 'line'
            //   data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '点赞量',
            type: 'line'
            //   data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
    }
  },
  created () {},
  // 此时，页面上的元素，已经被渲染完毕了！
  async mounted () {
    const echarts = require('echarts')
    const myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('/api/server/report/getReport')
    if (res.flag) {
      const result = _.merge(res.data, this.option)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(result)
    } else {
      this.$message.error('获取博文数据失败')
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
