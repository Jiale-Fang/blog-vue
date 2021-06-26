<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>单篇文章分析</el-breadcrumb-item>
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
          text: '单篇文章分析',
          subtext: '只展示排名前几的文章',
          textStyle: {
            color: 'rgba(255, 255, 255, 255)'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
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
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['点赞量', '评论数', '访问量']
        },
        series: [
        ]
      }
    }
  },
  created () {},
  // 此时，页面上的元素，已经被渲染完毕了！
  async mounted () {
    const echarts = require('echarts')
    const myChart = echarts.init(document.getElementById('main'))
    const { data: res } = await this.$http.get('/api/server/report/getReport2')
    if (res.flag) {
      const result = _.merge(res.data, this.option)
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(result)
    } else {
      this.$message.error('获取单篇博文分析失败')
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
