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
                  <a href="#" @click="logout" class="item">注销</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="ui menu toggle black icon button m-right-top m-mobile-show">
          <i class="sidebar icon"></i>
        </a>
      </nav>

      <!--中间内容-->
      <div  class="m-container-small m-padded-tb-big">
        <div class="ui container">
          <!--header-->
          <div class="ui top attached padded segment">
            <div class="ui middle aligned two column grid">
              <div class="column">
                <h3 class="ui teal header">归档</h3>
              </div>
              <div class="right aligned column">
                共 <h2 class="ui orange header m-inline-block m-text-thin"> 114 </h2> 篇博客
              </div>
            </div>
          </div>

          <h3 class="ui center aligned header">2021</h3>
          <div class="ui fluid vertical menu">
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
          </div>

          <h3 class="ui center aligned header">2020</h3>
          <div class="ui fluid vertical menu">
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
            <a href="#" target="_blank" class="item">
          <span>
            <i class="mini teal circle icon"></i>关于刻意练习的清单
            <div class="ui teal basic left pointing label m-padded-mini ">9月03</div>
          </span>
              <div class="ui orange basic left pointing label m-padded-mini ">原创</div>
            </a>
          </div>
        </div>
      </div>

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
      avatar: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      this.nickname = JSON.parse(this.user).nickname
      this.avatar = JSON.parse(this.user).avatar
      console.log(this.user)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
