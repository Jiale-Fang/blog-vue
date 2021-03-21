<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont3 icon-play el-icon-video-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont3 el-icon-video-play"></span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index" @click="toMV(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont3 el-icon-video-play icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont3 el-icon-video-play icon-play"></div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
// // Set config defaults when creating the instance
// const instance = axios.create({
//   baseURL: 'https://autumnfish.cn'
// })
import { Notification } from 'element-ui'

export default {
  name: 'discovery',
  data () {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    }
  },
  created () {
    // console.log('created')
    // 轮播图接口
    this.$musicApi({
      url: '/banner',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.banners = res.data.banners
    })

    // 推荐歌单
    this.$musicApi({
      url: '/personalized',
      method: 'get',
      params: {
        // 获取的数据量
        limit: 10
      }
    }).then(res => {
      // console.log(res)
      this.list = res.data.result
    })

    // 最新音乐
    this.$musicApi({
      url: '/personalized/newsong',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.songs = res.data.result
    })

    // 最新mv
    this.$musicApi({
      url: '/personalized/mv',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.mvs = res.data.result
    })
    this.reload()
    this.message()
  },
  methods: {
    // 再次回到博客首页要刷新
    reload () {
      const str = window.sessionStorage.getItem('reload')
      if (str == null) {
        window.sessionStorage.setItem('reload', 'true')
      }
    },
    // 去mv详情页
    toMV (id) {
      this.$router.push(`/mv?q=${id}`)
    },
    // 去歌单详情页
    toPlaylist (id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    getSongInfo (id) {
      // 获取歌曲封面，歌手等信息
      const { data: res } = this.$musicApi.get(`/song/detail?ids=${id}`)
      this.$parent.audio.name = res.songs[0].name
      // this.$parent.audio.artist = res.songs[0].ar.name
      console.log(res.songs[0].ar)
    },
    getLrc (id) {
      // 获取歌词
      const { data: res } = this.$musicApi.get(`/lyric?id=${id}`)
      this.$parent.audio.lrc = res.lrc.lyric
    },
    playMusic (id) {
      const ids = id
      // 获取歌曲信息
      this.$musicApi({
        url: '/song/detail',
        method: 'get',
        params: {
          ids // id:id
        }
      }).then(res => {
        this.$parent.audio.name = res.data.songs[0].name
        this.$parent.audio.artist = res.data.songs[0].ar[0].name
        this.$parent.audio.cover = res.data.songs[0].al.picUrl
      })
      // 获取歌词
      this.$musicApi({
        url: '/lyric',
        method: 'get',
        params: {
          id // id:id
        }
      }).then(res => {
        const lrc = this.$parent.audio.lrc = res.data.lrc.lyric
        this.$parent.audio.lrc = lrc
      })
      // 获取歌曲音源
      this.$musicApi({
        url: '/song/url',
        method: 'get',
        params: {
          id // id:id
        }
      }).then(res => {
        const url = res.data.data[0].url
        console.log(res.data.data[0].url)
        // 设置给父组件的 播放地址
        this.$parent.audio.url = url
        this.$parent.id = id
      })
    },
    message () {
      const messageFlag = sessionStorage.getItem('messageFlag2')
      if (messageFlag == null) {
        Notification({
          title: '消息',
          message: '音乐盒的接口是调了网易云的api，有时会出现跨域或者网络问题导致页面无法正常显示，此时点击右键重新多加载几次页面即可',
          duration: 0
        })
      }
      sessionStorage.setItem('messageFlag2', 'true')
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
