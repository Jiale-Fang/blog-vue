<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title" style="font-weight: bold;color: lightpink">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}/</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <!-- 分类标签 -->
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">
            {{ playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
          <tr class="el-table__row" v-for="(item, index) in playlist.tracks" :key="index">
            <td>{{index+1}}</td>
            <td>
              <div class="img-wrap">
                <img v-bind:src="item.al.picUrl" alt="" />
                <span class="iconfont icon-play el-icon-video-play" @click="playMusic(item.id)"></span>
              </div>
            </td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{item.name}}</span>
                  <span class="iconfont icon-mv el-icon-video-play"></span>
                </div>
                <span>{{item.al.name}}</span>
              </div>
            </td>
            <td>{{item.ar[0].name}}</td>
            <td>{{item.name}}</td>
            <td>{{item.dt}}</td>
          </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(n)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number" style="color: #ae81ff;font-weight: bold">({{ hotCount }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div v-for="(item, index) in hotComment" :key="index" class="item">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img v-bind:src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}:</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 评论的回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                  >
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{new Date(item.time)}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number" style="color: #ae81ff;font-weight: bold">( {{total}} )</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
        ></el-pagination>
        <br>
        <br>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入 axios
export default {
  name: 'playlist',
  data () {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 歌单详情数据
      // tracks 歌曲列表
      playlist: {},
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 普通评论
      comments: []
    }
  },
  created () {
    // 获取歌单详情
    this.$http({
      url: '/music/playlist/detail',
      method: 'get',
      params: {
        id: this.$route.query.q
      }
    }).then(res => {
      // console.log(res)
      this.playlist = res.data.playlist
      // this.playlist.createTime = playlist.createTime
      const date = new Date(this.playlist.createTime)
      this.playlist.createTime = date
      // 处理时长 毫秒 转为 分秒
      for (let i = 0; i < this.playlist.tracks.length; i++) {
        // 获取 总毫秒数
        const duration = this.playlist.tracks[i].dt
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
        this.playlist.tracks[i].dt = `${min}:${sec}`
      }
    })
    // 获取 评论
    this.$http({
      url: '/music/comment/hot',
      method: 'get',
      params: {
        id: this.$route.query.q,
        // 传递类型
        type: 2
      }
    }).then(res => {
      // console.log(res)
      this.hotComment = res.data.hotComments
      // 保存个数
      this.hotCount = res.data.total
    })

    // 获取 最新评论
    this.$http({
      url: '/music/comment/playlist',
      method: 'get',
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      // console.log(res)
      // 总个数
      this.total = res.data.total
      // 评论数据
      this.comments = res.data.comments
    })
  },
  methods: {
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val
      // 重新获取数据
      this.$http({
        url: '/music/comment/playlist',
        method: 'get',
        params: {
          id: this.$route.query.q,
          limit: 10,
          // 根据页码计算
          offset: (this.page - 1) * 10
        }
      }).then(res => {
        // console.log(res)
        // 总个数
        this.total = res.data.total
        // 评论数据
        this.comments = res.data.comments
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
