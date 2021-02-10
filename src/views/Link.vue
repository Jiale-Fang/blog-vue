<template>
    <div class="link">
      <!-- banner -->
      <div class="link-banner">
        <div class="banner-container">
          <h1 class="blog-title animated zoomIn">
            友链
          </h1>
          <!-- 向下滚动 -->
          <div class="link-scroll-down" @click="scrollDown">
            <h4>向下滚动<i class="el-icon-arrow-down"></i></h4>
          </div>
        </div>
        <!--中间内容,如果太窄了可放到container    <div  class="m-container m-padded-tb-big">-->
      </div>
      <div class="m-link">
        <!-- 链接列表 -->
        <el-card class="blog-container">
          <!-- 说明 -->
          <div class="link-title mt-4 mb-4">
          添加友链
          </div>
          <br>
          <blockquote class="my-blog-shadow">
            <div>名称：Tcefrep的个人博客</div>
            <div>简介：这是一篇简单的个人博客，也是一个我记录笔记的地方，欢迎各位到访</div>
            <div>头像：头像链接</div>
            <div>博客：http://39.108.136.207/#/home</div>
          </blockquote>
          <br>
          <div class="link-title mt-4 mb-4">
            需要交换友链的可在此处填写表格💖
            <el-button type="primary" icon="el-icon-edit" style="padding-left: 15px!important;" @click="handleCreate">添加友链</el-button>
          </div>
          <br>
          <blockquote class="mb-10 my-blog-shadow">
            友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像，博主经过筛选后，会在下方以卡片的形式展示出来
          </blockquote>
          <br>
          <template v-for="(item,index) in dataList">
            <el-col style="width: 400px;margin-top: 30px!important;top: 15px !important;" v-if="index%2===0" v-bind:key="item.linkId">
              <div class="ui card my-shadow">
                <div class="image">
                  <img class="ui rounded image" v-bind:src="item.avatarLink">
                </div>
                <div class="content">
                  <a class="header">{{item.linkName}}</a>
                  <div class="meta">
                    <span class="date">{{item.createTime}}</span>
                  </div>
                  <div class="description">{{item.description}} </div>
                </div>
                <div class="extra content">
                  <a v-bind:href="item.blogLink"><i class="desktop icon"></i>{{item.blogLink}} </a>
                </div>
              </div>
            </el-col>
<!--            </div>-->
<!--            <div style="width: 100px;height: 200px" :key="index">-->
            <el-col style="width: 400px;margin-top: 30px!important;top: 15px !important;float: right !important;" v-if="index%2===1" v-bind:key="item.linkId">
              <div class="ui card my-shadow">
                <div class="image">
                  <img class="ui rounded image" v-bind:src="item.avatarLink">
                </div>
                <div class="content">
                  <a class="header">{{item.linkName}}</a>
                  <div class="meta">
                    <span class="date">{{item.createTime}}</span>
                  </div>
                  <div class="description">{{item.description}} </div>
                </div>
                <div class="extra content">
                  <a v-bind:href="item.blogLink"><i class="desktop icon"></i>{{item.blogLink}} </a>
                </div>
              </div>
            </el-col>
<!--            </div>-->
<!--            <el-col style="width: 400px;top: 15px !important;" v-for="item in dataList" :key="item.LinkId">-->
<!--              <div class="ui card my-shadow">-->
<!--                <div class="image">-->
<!--                  <img v-bind:src="item.avatarLink">-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                  <a class="header">Kristy</a>-->
<!--                  <div class="meta">-->
<!--                    <span class="date">2013年加入</span>-->
<!--                  </div>-->
<!--                  <div class="description">Kristy is an art director living in New York. </div>-->
<!--                </div>-->
<!--                <div class="extra content">-->
<!--                  <a><i class="desktop icon"></i> 22 个好友 </a>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
<!--          </el-row>-->
          </template>
          <br>
          <br>
          <br>
        </el-card>
        <AddLink ref="addLink"></AddLink>
      </div>
      <br>
      <br>
    </div>
</template>

<script>
import AddLink from '../components/link/AddLink'
export default {
  components: {
    AddLink
  },
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.getLinkList()
  },
  methods: {
    handleCreate () {
      this.$refs.addLink.handleCreate()
    },
    async getLinkList () {
      const { data: res } = await this.$http.get('/extension/link/getLink')
      if (res.flag) {
        this.dataList = res.data
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
  blockquote {
    line-height: 2;
    margin: 0;
    font-size: 15px;
    border-left: 0.2rem solid #1685a9;
    padding: 10px 1rem !important;
    background-color: #ecf7fe;
    border-radius: 4px;
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
  .link-scroll-down {
    cursor: pointer;
    position: absolute;
    bottom: 0 !important;
    width: 100%;
  }
  .link-banner {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    height: 100vh;
    background: url("http://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjrcd90GMu1NvFVRUxh.ZERBAbPSIeInGGY0C9uI2uTdJATSv*Nt3RFEYI4RVJUCXqo!/r") center center /
    cover no-repeat;
    background-color: #49b1f5;
    background-attachment: fixed;
    text-align: center;
    color: #fff !important;
    animation: header-effect 1s !important;
  }
  .banner-container {
    margin-top: 43vh;
    line-height: 1.5;
    color: #eee;
  }
  .m-link {
    padding-top: 410px !important;
    padding-bottom: 0px !important;
  }
  .link-title {
    color: #344c67;
    font-size: 21px;
    font-weight: bold;
    line-height: 2;
  }
  .link-container {
    margin: 10px 10px 0;
  }
  .link-wrapper {
    position: relative;
    transition: all 0.3s;
    border-radius: 8px;
  }
  .link-avatar {
    margin-top: 5px;
    margin-left: 10px;
    transition: all 0.5s;
  }
  @media (max-width: 759px) {
    .link-avatar {
      margin-left: 30px;
    }
  }
  .link-name {
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    z-index: 1000;
  }
  .link-intro {
    text-align: center;
    padding: 16px 10px;
    height: 50px;
    font-size: 13px;
    color: #1f2d3d;
    width: 100%;
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
  .link-wrapper:hover {
    box-shadow: 0 2px 20px #49b1f5;
  }
  .link-wrapper:hover:before {
    transform: scale(1);
  }
  .link-wrapper:before {
    position: absolute;
    border-radius: 8px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #49b1f5 !important;
    content: "";
    transition-timing-function: ease-out;
    transition-duration: 0.3s;
    transition-property: transform;
    transform: scale(0);
  }
</style>
