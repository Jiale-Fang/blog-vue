<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title" >
          {{ topList.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: tag == '全部' }"
          @click="tag = '全部'" style="font-weight: bold"
        >
          全部
        </span>
        <span
          class="item"
          :class="{ active: tag == '欧美' }"
          @click="tag = '欧美'" style="font-weight: bold"
        >
          欧美
        </span>
        <span
          class="item"
          :class="{ active: tag == '华语' }"
          @click="tag = '华语'" style="font-weight: bold"
        >
          华语
        </span>
        <span
          class="item"
          :class="{ active: tag == '流行' }"
          @click="tag = '流行'" style="font-weight: bold"
        >
          流行
        </span>
        <span
          class="item"
          :class="{ active: tag == '说唱' }"
          @click="tag = '说唱'" style="font-weight: bold"
        >
          说唱
        </span>
        <span
          class="item"
          :class="{ active: tag == '摇滚' }"
          @click="tag = '摇滚'" style="font-weight: bold"
        >
          摇滚
        </span>
        <span
          class="item"
          :class="{ active: tag == '民谣' }"
          @click="tag = '民谣'" style="font-weight: bold"
        >
          民谣
        </span>
        <span
          class="item"
          :class="{ active: tag == '电子' }"
          @click="tag = '电子'" style="font-weight: bold"
        >
          电子
        </span>
        <span
          class="item"
          :class="{ active: tag == '轻音乐' }"
          @click="tag = '轻音乐'" style="font-weight: bold"
        >
          轻音乐
        </span>
        <span
          class="item"
          :class="{ active: tag == '影视原声' }"
          @click="tag = '影视原声'" style="font-weight: bold"
        >
          影视原声
        </span>
        <span
          class="item"
          :class="{ active: tag == 'ACG' }"
          @click="tag = 'ACG'" style="font-weight: bold"
        >
          ACG
        </span>
        <span
          class="item"
          :class="{ active: tag == '怀旧' }"
          @click="tag = '怀旧'" style="font-weight: bold"
        >
          怀旧
        </span>
        <span
          class="item"
          :class="{ active: tag == '治愈' }"
          @click="tag = '治愈'" style="font-weight: bold"
        >
          治愈
        </span>
        <span
          class="item"
          :class="{ active: tag == '旅行' }"
          @click="tag = '旅行'" style="font-weight: bold"
        >
          旅行
        </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont2 icon-play el-icon-video-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
    <br>
    <br>
  </div>
</template>

<script>
// 导入 axios
export default {
  name: 'recommend',
  data () {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部的推荐歌单
      topList: {},
      // 歌单列表
      list: [],
      // 当前选择的数据
      tag: '全部'
    }
  },
  // 侦听器
  watch: {
    tag () {
      // 顶部的 精品歌单
      this.topData()
      // 歌单列表
      this.listData()
      // 修改页码为1
      this.page = 1
    }
  },
  created () {
    // 顶部的 精品歌单
    this.topData()
    // 歌单列表
    this.listData()
  },
  methods: {
    // 去歌单详情页
    toPlaylist (id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    // 抽取的方法1 顶部的数据
    topData () {
      this.$http({
        url: '/music/top/playlist/highquality',
        method: 'get',
        params: {
          limit: 1,
          // 分类数据
          cat: this.tag
        }
      }).then(res => {
        // console.log(res)
        this.topList = res.data.playlists[0]
      })
    },
    // 抽取的方法2 列表数据
    listData () {
      this.$http({
        url: '/music/top/playlist/',
        method: 'get',
        params: {
          limit: 10,
          // 起始的值 （页码-1）*每页多少条数据
          offset: (this.page - 1) * 10,
          // 分类数据
          cat: this.tag
        }
      }).then(res => {
        // console.log(res)
        // 保存总条数
        this.total = res.data.total
        // 保存数据
        this.list = res.data.playlists
      })
    },
    // 页码改变事件
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 保存页码
      this.page = val
      // 重新获取数据
      this.listData()
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
