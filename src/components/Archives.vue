<template>
    <div class="archives">
      <!--导航-->
      <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
        <div class="ui container">
          <div class="ui inverted secondary stackable menu">
            <h2 class="ui teal header item">Blog</h2>
            <a href="/#/home" class="m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
            <a href="/#/types" class="m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
            <a href="/#/tags" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
            <a href="/#/Archives" class="active m-item item m-mobile-hide"><i class="mini clone icon"></i>归档</a>
            <a href="/#/About" class="m-item item m-mobile-hide"><i class="mini info icon"></i>关于我</a>
            <a href="/#/blogs" class="m-item item m-mobile-hide"><i class="mini user icon"></i>后台管理</a>
            <div class="right m-item m-mobile-hide menu">
              <div class="ui icon inverted transparent input m-margin-tb-tiny">
                <input type="text" placeholder="Search....">
                <i class="search link icon"></i>
              </div>
              <div class="ui dropdown item">
                <div class="text">
                  <img class="ui avatar image" v-bind:src="avatar">
                  <span>{{this.nickname}}</span>
                </div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a href="/#/login" class="item">登录</a>
                  <a @click="logout" class="item">注销</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="ui menu toggle black icon button m-right-top m-mobile-show">
          <i class="sidebar icon"></i>
        </a>
      </nav>
      <el-container>
        <div class="main-pic" align="middle" style="margin:auto">
          <h1> 尚在开发中，请期待</h1>
          <img src="https://unsplash.it/800/450?image=385" class="main-pic" width="800" height="450" align="middle">
        </div>
      </el-container>
      <br>
      <br>
      <!--底部footer-->
      <footer class="ui inverted vertical segment m-padded-tb-massive">
        <div class="ui center aligned container">
          <div class="ui inverted divided stackable grid">
            <div class="three wide column">
              <div class="ui inverted link list">
                <div class="item">
                  <img src="../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">
                </div>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header m-text-thin m-text-spaced " >最新博客</h4>
              <div class="ui inverted link list">
                <a href="#" class="item m-text-thin">用户故事（User Story）</a>
                <a href="#" class="item m-text-thin">用户故事（User Story）</a>
                <a href="#" class="item m-text-thin">用户故事（User Story）</a>
              </div>
            </div>
            <div class="three wide column">
              <h4 class="ui inverted header m-text-thin m-text-spaced ">联系我</h4>
              <div class="ui inverted link list">
                <a href="#" class="item m-text-thin">Email：1626680964@qq.com</a>
                <a href="#" class="item m-text-thin">QQ：1626680964</a>
              </div>
            </div>
            <div class="seven wide column">
              <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>
              <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>
            </div>
          </div>
          <div class="ui inverted section divider"></div>
          <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2020 - 2021 Fjl Designed by Fjl</p>
        </div>

      </footer>
    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
        console.log(this.user)
      }
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
      // 刷新页面，删除vuex数据
      window.location.reload()
    }
  },
  mounted () {
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
  }
}
</script>

<style scoped>

</style>
