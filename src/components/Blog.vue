<template>
  <div class="home">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">Blog</h2>
          <a href="/#/home" class="m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
          <a href="/#/types" class="m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
          <a href="/#/tags" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
          <a href="/#/Archives" class="m-item item m-mobile-hide"><i class="mini clone icon"></i>归档</a>
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
    <div id="waypoint" class="m-container-small m-padded-tb-big animated fadeInLeft">
      <div class="ui container">
        <div class="ui top attached segment">
          <div class="ui horizontal link list">
            <div class="item">
              <img src="https://picsum.photos/seed/picsum/100/100?image=1005" alt="" class="ui avatar image">
              <div class="content"><a href="#" class="header">Fjl</a></div>
            </div>
            <div class="item">
              <i class="calendar icon"></i> 2017-10-01
            </div>
            <div class="item">
              <i class="eye icon"></i> 2342
            </div>
          </div>
        </div>
        <div class="ui attached segment">
          <!--图片区域-->
          <img src="https://picsum.photos/seed/picsum/800/450?image=1005" alt="" class="ui fluid rounded image">
        </div>
        <div class="ui  attached padded segment">
          <!--内容-->
          <div class="ui right aligned basic segment">
            <div class="ui orange basic label">原创</div>
          </div>

          <h2 class="ui center aligned header">关于刻意练习的清单</h2>
          <br>

          <div id="content" class="typo  typo-selection js-toc-content m-padded-lr-responsive m-padded-tb-large" v-html="dataList.content" style="width: 800px" v-highlight>
          </div>

          <!--标签-->
          <div class="m-padded-lr-responsive">
            <div class="ui basic teal left pointing label">方法论</div>
          </div>

          <!--赞赏-->
          <div class="ui center aligned basic segment">
            <button id="payButton" class="ui orange basic circular button">赞赏</button>
          </div>
          <div class="ui payQR flowing popup transition hidden">
            <div class="ui orange basic label">
              <div class="ui images" style="font-size: inherit !important;">
                <div class="image">
                  <img src="../assets/images/Ali-Pay.png" alt="" class="ui rounded bordered image" style="width: 120px">
                  <div>支付宝</div>
                </div>
                <div class="image">
                  <img src="../assets/images/WeChat-Pay.jpg" alt="" class="ui rounded bordered image" style="width: 120px">
                  <div>微信</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="ui attached positive message">
          <!--博客信息-->
          <div class="ui middle aligned grid">
            <div class="eleven wide column">
              <ui class="list">
                <li>作者：Fjl（联系作者）</li>
                <li>发表时间：2021-01-18 19:08</li>
                <li>版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</li>
                <li>公众号转载：请在文末添加作者公众号二维码</li>
              </ui>
            </div>
            <div class="five wide column">
              <img src="../assets/images/wechat.jpg" alt="" class="ui right floated rounded bordered image" style="width: 110px">
            </div>
          </div>
        </div>
        <div id="comment-container" class="ui bottom attached segment">
          <!--留言区域列表-->
          <div class="ui teal segment">
            <div class="ui threaded comments">
              <h3 class="ui dividing header">Comments</h3>
              <div class="comment">
                <a class="avatar">
                  <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                </a>
                <div class="content">
                  <a class="author">Matt</a>
                  <div class="metadata">
                    <span class="date">Today at 5:42PM</span>
                  </div>
                  <div class="text">
                    How artistic!
                  </div>
                  <div class="actions">
                    <a class="reply">回复</a>
                  </div>
                </div>
              </div>

              <div class="comment">
                <a class="avatar">
                  <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                </a>
                <div class="content">
                  <a class="author">Elliot Fu</a>
                  <div class="metadata">
                    <span class="date">Yesterday at 12:30AM</span>
                  </div>
                  <div class="text">
                    <p>This has been very useful for my research. Thanks as well!</p>
                  </div>
                  <div class="actions">
                    <a class="reply">回复</a>
                  </div>
                </div>
                <div class="comments">
                  <div class="comment">
                    <a class="avatar">
                      <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                    </a>
                    <div class="content">
                      <a class="author">Jenny</a>
                      <div class="metadata">
                        <span class="date">Just now</span>
                      </div>
                      <div class="text">
                        Elliot you are always so right :)
                      </div>
                      <div class="actions">
                        <a class="reply">回复</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="comments">
                  <div class="comment">
                    <a class="avatar">
                      <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                    </a>
                    <div class="content">
                      <a class="author">Jenny Hess</a>
                      <div class="metadata">
                        <span class="date">Just now</span>
                      </div>
                      <div class="text">
                        Elliot you are always so right :)
                      </div>
                      <div class="actions">
                        <a class="reply">回复</a>
                      </div>
                    </div>
                    <div class="comments">
                      <div class="comment">
                        <a class="avatar">
                          <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                        </a>
                        <div class="content">
                          <a class="author"> Hess</a>
                          <div class="metadata">
                            <span class="date">Just now</span>
                          </div>
                          <div class="text">
                            Elliot you are always so right :)
                          </div>
                          <div class="actions">
                            <a class="reply">回复</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="comment">
                <a class="avatar">
                  <img src="https://picsum.photos/seed/picsum/100/100?image=1005">
                </a>
                <div class="content">
                  <a class="author">Joe Henderson</a>
                  <div class="metadata">
                    <span class="date">5 days ago</span>
                  </div>
                  <div class="text">
                    Dude, this is awesome. Thanks so much
                  </div>
                  <div class="actions">
                    <a class="reply">回复</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui form">
            <div class="field">
              <textarea name="content" placeholder="请输入评论信息..."></textarea>
            </div>
            <div class="fields">
              <div class="field m-mobile-wide m-margin-bottom-small">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input type="text" name="nickname" placeholder="姓名">
                </div>
              </div>
              <div class="field m-mobile-wide m-margin-bottom-small">
                <div class="ui left icon input">
                  <i class="mail icon"></i>
                  <input type="text" name="email" placeholder="邮箱">
                </div>
              </div>
              <div class="field  m-margin-bottom-small m-mobile-wide">
                <button class="ui teal button m-mobile-wide"><i class="edit icon"></i>发布</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
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
<!--      <img src="../assets/images/wechat.jpg" alt="" class="ui rounded image" style="width: 120px !important;">-->
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
import Prism from '../assets/lib/prism/prism'
// import QRCode from '../assets/lib/qrcode/qrcode.min.js'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      dataList: []
    }
  },
  created () {
    this.getUser()
    this.getOneBlog()
  },
  methods: {
    reloadPrism () {
      process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    },
    // 获取所有的菜单
    async getOneBlog () {
      const blogId = sessionStorage.getItem('blogId')
      const { data: res } = await this.$http.get(`/blog/${blogId}`)
      console.log(res)
      if (!res.flag) {
        return this.$message.error('获取博客信息失败！')
      }
      this.dataList = res.data
      process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
      console.log('-----------' + JSON.stringify(this.dataList))
    },
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
    // 有效
    setTimeout(() => {
      this.reloadPrism()
    }, 1000)
    process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
    process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('#payButton').popup({
      popup: $('.payQR.popup'),
      on: 'click',
      position: 'bottom center'
    })
    $('.toc.button').popup({
      popup: $('.toc-container.popup'),
      on: 'click',
      position: 'left center'
    })
    $('.wechat').popup({
      popup: $('.wechat-qr'),
      position: 'left center'
    })
    $('#toTop-button').click(function () {
      $(window).scrollTo(0, 500)
    })
    // eslint-disable-next-line no-undef
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3'
    })
    // eslint-disable-next-line no-unused-vars
    var qrcode = new QRCode('qrcode', {
      text: 'https://blog.csdn.net/Dlihctcefrep',
      width: 110,
      height: 110,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    })
  }
}
</script>

<style scoped>
  @import "../assets/css/typo.css";
  @import "../assets/css/animate.css";
  @import "../assets/lib/tocbot/tocbot.css";
 @import "../assets/css/me.css";
</style>
