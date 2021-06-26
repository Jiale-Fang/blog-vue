<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }" style="font-weight: bold">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }" style="font-weight: bold">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }" style="font-weight: bold">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }" style="font-weight: bold">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }" style="font-weight: bold">
        韩国
      </span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt="" />
              <!-- 播放按钮 -->
              <span @click="playMusic(item.id)" class="iconfont3 icon-play el-icon-video-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont3 icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists['0'].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 导入 axios
export default {
  name: 'songs',
  data () {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      tag: '0'
    }
  },
  watch: {
    tag () {
      this.getList()
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表数据
    getList () {
      // 获取 最新音乐数据
      this.$http({
        url: '/music/top/song',
        method: 'get',
        params: {
          // 传递 设置的数据
          type: this.tag
        }
      }).then(res => {
        // console.log(res)
        this.lists = res.data.data
        // 处理时长 毫秒 转为 分秒
        for (let i = 0; i < this.lists.length; i++) {
          // 获取 总毫秒数
          const duration = this.lists[i].duration
          // eslint-disable-next-line no-tabs
          // 假定 	350750 毫秒
          // 秒 350750/1000  350秒
          // 分 350 /60
          // 秒 350 % 60
          let min = parseInt(duration / 1000 / 60)
          if (min < 10) {
            min = '0' + min
          }
          let sec = parseInt((duration / 1000) % 60)
          if (sec < 10) {
            sec = '0' + sec
          }
          // console.log(min + '|' + sec)
          this.lists[i].duration = `${min}:${sec}`
        }
      })
    },
    // 播放歌曲
    playMusic (id) {
      this.$root.$emit('songId', id)
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
