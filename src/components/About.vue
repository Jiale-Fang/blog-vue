<template>
  <div class="about">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">Blog</h2>
          <a href="/#/home" class="m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
          <a href="/#/types" class="m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
          <a href="/#/tags" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
          <a href="/#/Archives" class="m-item item m-mobile-hide"><i class="mini clone icon"></i>归档</a>
          <a href="/#/About" class="active m-item item m-mobile-hide"><i class="mini info icon"></i>关于我</a>
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
    <div  class="m-container m-padded-tb-big">
      <div class="ui container">

        <div class="ui stackable grid">
          <div class="eleven wide column">
            <div class="ui segment">
              <img src="https://picsum.photos/800/600?image=1006" alt="" class="ui rounded image">
            </div>
          </div>
          <div class="five wide column">
            <div class="ui top attached segment">
              <div class="ui header">关于我</div>
            </div>
            <div class="ui attached segment">
              <p class="m-text">一个独立开发者，折腾在 0 和 1 世界的人；一个终身学习者，誓将学习无限循环. 希望结识可以共同成长的小伙伴.</p>
              <p class="m-text">热爱编程，喜欢折腾，正在探索高效学习编程技术的方法...</p>
            </div>
            <div class="ui attached segment">
              <div class="ui orange basic left pointing label">编程</div>
              <div class="ui orange basic left pointing label">写作</div>
              <div class="ui orange basic left pointing label">思考</div>
              <div class="ui orange basic left pointing label">运动</div>
            </div>
            <div class="ui attached segment">
              <div class="ui teal basic left pointing label m-margin-tb-tiny">Java</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">JavaScript</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">Node</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">ElasticSearch</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">S</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">MYSQL</div>
              <div class="ui teal basic left pointing label m-margin-tb-tiny">...</div>
            </div>
            <div class="ui bottom attached segment">
              <a href="#" class="ui github circular icon button" data-content="https://gitee.com/fang-jiale" data-position="bottom center"><i class="github icon"></i></a>
              <a href="#" class="ui wechat circular icon button"><i class="weixin icon"></i></a>
              <a href="#" class="ui qq circular icon button" data-content="1626680964" data-position="bottom center"><i class="qq icon"></i></a>
            </div>

            <div class="ui wechat-qr flowing popup transition hidden">
              <img src="../assets/images/wechat.jpg" alt="" class="ui rounded image" style="width: 110px">
            </div>
          </div>
        </div>

      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" style="display: none">
      <div class="ui vertical icon buttons ">
        <button type="button" class="ui toc teal button" >目录</button>
        <a href="#comment-container" class="ui teal button" >留言</a>
        <button class="ui wechat icon button"><i class="weixin icon"></i></button>
        <div id="toTop-button" class="ui icon button" ><i class="chevron up icon"></i></div>
      </div>
    </div>

    <div class="ui toc-container flowing popup transition hidden" style="width: 250px!important;">
      <ol class="js-toc">

      </ol>
    </div>

    <div id="qrcode" class="ui wechat-qr flowing popup transition hidden " style="width: 130px !important;">
      <!--<img src="./static/images/wechat.jpg" alt="" class="ui rounded image" style="width: 120px !important;">-->
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
    $('.wechat').popup({
      popup: $('.wechat-qr'),
      position: 'bottom center'
    })
    $('.qq').popup()
    $('.github').popup()
  }
}
//
//
// var qrcode = new QRCode("qrcode", {
//   text: "http://jindo.dev.naver.com/collie",
//   width: 110,
//   height: 110,
//   colorDark : "#000000",
//   colorLight : "#ffffff",
//   correctLevel : QRCode.CorrectLevel.H
// });
//
//
//
// var waypoint = new Waypoint({
//   element: document.getElementById('waypoint'),
//   handler: function(direction) {
//     if (direction == 'down') {
//       $('#toolbar').show(100);
//     } else {
//       $('#toolbar').hide(500);
//     }
//     console.log('Scrolled to waypoint!  ' + direction);
//   }
// })
</script>

<style>
 @import "../assets/css/me.css";
</style>
