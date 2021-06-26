<template>
  <div class="result-container">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title" style="font-weight: bold!important;color: lightpink">找到 {{ count }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
          </thead>
          <tbody>
          <tr
            v-for="(item, index) in songList"
            :key="index"
            class="el-table__row"
            @dblclick="playMusic(item.id)"
          >
            <td>1</td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <!-- 歌名 -->
                  <span style="cursor:pointer !important;">{{ item.name }}</span>
                  <!-- mv的图标 -->
                  <span v-if="item.mvid != 0" class="iconfont3 icon-mv el-icon-video-play" style="cursor:pointer !important;"></span>
                </div>
                <!-- 二级标题 -->
                <span v-if="item.alias.length != 0" style="cursor:pointer !important;">{{ item.alias[0] }}</span>
              </div>
            </td>
            <td style="cursor:pointer !important;">{{ item.artists[0].name }}</td>
            <td style="cursor:pointer !important;">{{ item.album.name }}</td>
            <td style="cursor:pointer !important;">{{ item.duration }}</td>
          </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div
            v-for="(item, index) in playlists"
            :key="index"
            class="item"
            @click="toPlaylist(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont3 icon-play el-icon-video-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div v-for="(item, index) in mv" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <!-- 封面 -->
              <img :src="item.cover" alt="" />
              <span class="iconfont3 icon-play el-icon-video-play"></span>
              <div class="num-wrap">
                <div class="iconfont3 icon-play el-icon-video-play"></div>
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount }}</div>
              </div>
              <!-- 持续时间 -->
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      // tab切换时 会改变的数据
      activeIndex: 'songs',
      // 保存 查询歌曲
      songList: [],
      // 保存歌单的字段
      playlists: [],
      // 保存mv的字段
      mv: [],
      // 搜索结果的总数
      count: 0
    }
  },
  // 生命周期钩子 回调函数
  created () {
    this.$http({
      url: '/music/search',
      method: 'get',
      params: {
        keywords: this.$route.query.q,
        type: 1,
        // 获取的数据量
        limit: 10
      }
    }).then(res => {
      console.log(res)
      this.songList = res.data.result.songs
      // 计算歌曲时间
      for (let i = 0; i < this.songList.length; i++) {
        let min = parseInt(this.songList[i].duration / 1000 / 60)
        let sec = parseInt((this.songList[i].duration / 1000) % 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        // console.log(min + '|' + sec)
        this.songList[i].duration = min + ':' + sec
      }
      // 保存总数
      this.count = res.data.result.songCount
    })
  },
  // 侦听器
  watch: {
    activeIndex () {
      // songs 歌曲
      // lists 歌单
      // mv    mv
      let type = 1

      // 获取个数
      let limit = 10
      switch (this.activeIndex) {
        case 'songs':
          type = 1
          limit = 10
          break
        case 'lists':
          type = 1000
          limit = 10
          break
        case 'mv':
          type = 1004
          limit = 8
          break

        default:
          break
      }

      this.$http({
        url: '/music/search',
        method: 'get',
        params: {
          keywords: this.$route.query.q,
          type, // type:type,
          // 获取的数据量
          limit // limit: limit
        }
      }).then(res => {
        console.log(res)
        // 获取歌曲
        if (type === 1) {
          // 歌曲
          this.songList = res.data.result.songs
          // 计算歌曲时间
          for (let i = 0; i < this.songList.length; i++) {
            let min = parseInt(this.songList[i].duration / 1000 / 60)
            let sec = parseInt((this.songList[i].duration / 1000) % 60)
            if (min < 10) {
              min = '0' + min
            }
            if (sec < 10) {
              sec = '0' + sec
            }
            // console.log(min + '|' + sec)
            this.songList[i].duration = min + ':' + sec
          }
          // 保存总数
          this.count = res.data.result.songCount
        }
        // 获取 歌单
        if (type === 1000) {
          // 歌单的逻辑
          this.playlists = res.data.result.playlists
          // 总数
          this.count = res.data.result.playlistCount
          // 处理 播放次数
          for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].playCount > 100000) {
              this.playlists[i].playCount =
                  parseInt(this.playlists[i].playCount / 10000) + '万'
            }
          }
        } else {
          // 保存mv数据
          this.mv = res.data.result.mvs
          // 总数
          this.count = res.data.result.mvCount
          // 处理数据
          for (let i = 0; i < this.mv.length; i++) {
            // 时间
            let min = parseInt(this.mv[i].duration / 1000 / 60)
            let sec = parseInt((this.mv[i].duration / 1000) % 60)
            if (min < 10) {
              min = '0' + min
            }
            if (sec < 10) {
              sec = '0' + sec
            }
            this.mv[i].duration = min + ':' + sec

            // 播放次数
            if (this.mv[i].playCount > 100000) {
              this.mv[i].playCount =
                  parseInt(this.mv[i].playCount / 10000) + '万'
            }
          }
        }
      })
    }
  },
  // 方法
  methods: {
    // 去mv详情页
    toMV (id) {
      this.$router.push(`/mv?q=${id}`)
    },
    // 去歌单详情页
    toPlaylist (id) {
      // 跳转并携带数据即可
      this.$router.push(`/playlist?q=${id}`)
    },
    playMusic (id) {
      this.$root.$emit('songId', id)
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
