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
    <Audio ref="audio" v-show="false"></Audio>
  </div>
</template>

<script>
// 导入 axios
import Audio from '../../components/music/Audio'
export default {
  name: 'discovery',
  components: {
    Audio
  },
  data () {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: [],
      songId: 0
    }
  },
  created () {
    // console.log('created')
    // 轮播图接口
    this.$http({
      url: '/music/banner',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.banners = res.data.banners
    })

    // 推荐歌单
    this.$http({
      url: '/music/personalized',
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
    this.$http({
      url: '/music/personalized/newsong',
      method: 'get'
    }).then(res => {
      // console.log(res)
      this.songs = res.data.result
    })

    // 最新mv
    this.$http({
      url: '/music/personalized/mv',
      method: 'get'
    }).then(res => {
      this.mvs = res.data.result
    })
    this.reload()
  },
  methods: {
    // 再次回到博客首页要刷新
    reload () {
      window.sessionStorage.setItem('reload', 'true')
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
      const { data: res } = this.$http.get(`/music/song/detail?ids=${id}`)
      this.$parent.audio.name = res.songs[0].name
      // this.$parent.audio.artist = res.songs[0].ar.name
      console.log(res.songs[0].ar)
    },
    getLrc (id) {
      // 获取歌词
      const { data: res } = this.$http.get(`/music/lyric?id=${id}`)
      this.$parent.audio.lrc = res.lrc.lyric
    },
    playMusic (id) {
      this.songId = id
      this.$root.$emit('songId', id)
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
