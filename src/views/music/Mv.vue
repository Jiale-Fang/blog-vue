<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <!-- 头像 -->
            <img :src="icon" alt="" />
          </div>
          <!-- 歌手名 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- 标题 -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{mvInfo.publishTime}}</span>
          <!-- 播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <!-- 描述 -->
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number" style="color: #ae81ff;font-weight: bold">{{hotCount}}</span></p>
        <div class="comments-wrap">
          <div v-for="(item, index) in hotComment" :key="index" class="item">
            <div class="icon-wrap">
              <img v-bind:src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{new Date(item.time)}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title" >最新评论<span class="number" style="color: #ae81ff;font-weight: bold">( {{commentTotal}} )</span></p>
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
              <div class="date">{{new Date(item.time)}}</div>
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
        :page-size="5"
        :limit="limit"
      >
      </el-pagination>
      <br>
      <br>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div v-for="(item, index) in simiMvs" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play el-icon-video-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play el-icon-video-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
export default {
  name: 'mv',
  data () {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      // mv地址
      url: '',
      // 相关mv
      simiMvs: [],
      // mv的信息
      mvInfo: {},
      // 头像
      icon: '',
      // 热门评论
      hotComment: [],
      // 热门评论的个数
      hotCount: 0,
      // 普通评论
      comments: [],
      commentTotal: 0
    }
  },
  created () {
    // 获取mv播放地址
    this.$http({
      url: '/music/mv/url',
      method: 'get',
      params: {
        // 获取url中的 id

        id: this.$route.query.q
      }
    }).then(res => {
      // console.log(res)
      this.url = res.data.data.url
    })
    // 获取 相关的mv
    this.$http({
      url: '/music/simi/mv',
      method: 'get',
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      // console.log(res)
      // 保存相关MV
      this.simiMvs = res.data.mvs
      console.log('=====')
      console.log(this.simiMvs)
    })

    // 获取 mv的信息
    this.$http({
      url: '/music/mv/detail',
      method: 'get',
      params: {
        mvid: this.$route.query.q
      }
    }).then(res => {
      // console.log(res)
      // mv的信息
      this.mvInfo = res.data.data
      console.log(this.mvInfo)
      // 获取 歌手信息
      this.$http({
        url: '/music/artists',
        method: 'get',
        params: {
          id: this.mvInfo.artists[0].id
        }
      }).then(res => {
        // console.log(res);
        // 歌手的封面信息
        this.icon = res.data.artist.picUrl
      })
    })

    // 获取评论数据
    this.$http({
      url: '/music/comment/mv',
      method: 'get',
      params: {
        id: this.$route.query.q,
        limit: 10,
        offset: 0
      }
    }).then(res => {
      this.hotComment = res.data.hotComments
      this.hotCount = res.data.hotComments.length
      this.commentTotal = res.data.comments.length
      this.comments = res.data.comments
      console.log(this.comments)
    })
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 去mv详情页
    toMV (id) {
      this.$router.push(`/mv?q=${id}`)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
  @import "../../assets/music/index.css";
</style>
