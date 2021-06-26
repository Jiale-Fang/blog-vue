<template>
  <div class="archives">
    <!-- banner -->
    <div class="archives-banner">
      <div class="banner-container">
        <h1 class="blog-title animated zoomIn">
          归档
        </h1>
        <!-- 向下滚动 -->
        <div class="link-scroll-down" @click="scrollDown">
          <h4>向下滚动<i class="el-icon-arrow-down"></i></h4>
        </div>
      </div>
      <!--中间内容,如果太窄了可放到container    <div  class="m-container m-padded-tb-big">-->
    </div>
    <div class="m-archives">
      <!-- 归档列表 -->
      <el-card class="blog-container">
        <timeline>
          <timeline-title bg-color="green"> <h4>目前共计{{total}}篇文章，继续加油</h4> </timeline-title>
          <timeline-item bg-color="#9dd8e0" v-for="item of archiveList" :key="item.blogId">
            <!-- 日期 -->
            <span class="time">{{item.createTime}}</span>
            <!-- 文章标题 -->
              <div class="archives-title mt-4 mb-4" style="cursor:pointer !important;" @click="toBlog(item.blogId)">{{ item.title }}</div>
          </timeline-item>
        </timeline>
      </el-card>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data () {
    return {
      total: '',
      archiveList: [
        {
          blogId: 1,
          createTime: '2010-11-01',
          title: '啊啊'
        }
      ]
    }
  },
  created () {
    this.getArchiveList()
  },
  methods: {
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.$router.push('/blog')
    },
    async getArchiveList () {
      const { data: res } = await this.$http.get('/api/server/archives/getArchivesList')
      if (res.flag) {
        this.archiveList = res.data.records
        this.total = res.data.total
      } else { // 执行失败
        this.$message.error(res.data.message)
      }
    },
    scrollDown () {
      window.scrollTo({
        behavior: 'smooth',
        top: document.documentElement.clientHeight
      })
    }
  }
}
</script>

<style scoped>
  .link-scroll-down {
    cursor: pointer;
    position: absolute;
    bottom: 0 !important;
    width: 100%;
  }
  .m-archives {
    padding-top: 57vh !important;
    padding-bottom: 0px !important;
  }
  .archives-title {
    color: #344c67;
    font-size: 21px;
    font-weight: bold;
    line-height: 2;
  }
  .archives-banner {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 100vh;
    background: url("https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjp1i*p*43XTdPNTx*Qw5X3kLZcdY7f2PP*HY0CLM5irJV7KRGdQZhNlKutHE4uqHzE!/r") center center /
    cover no-repeat;
    background-color: #49b1f5;
    background-attachment: fixed;
    text-align: center;
    color: #fff !important;
    animation: header-effect 1s !important;
  }
  .blog-container {
    background: #fff;
    color: #4c4948;
    border-radius: 8px;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    transition: all 0.3s;
  }
  .blog-container:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  .banner-container {
    margin-top: 43vh;
    line-height: 1.5;
    color: #eee;
  }
  .link-wrapper:hover a {
    color: #fff;
  }
  .link-wrapper:hover .link-intro {
    color: #fff;
  }
  .link-wrapper:hover .link-avatar {
    transform: rotate(360deg);
  }
  .link-wrapper a {
    color: #333;
    text-decoration: none;
    display: flex;
    height: 100%;
    width: 100%;
  }
</style>
