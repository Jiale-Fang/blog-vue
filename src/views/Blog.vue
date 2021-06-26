<template>
  <div class="home">
    <div class="blog-banner banner">
      <h1 class="banner-title">博客详情</h1>
    </div>
    <!--中间内容-->
    <div id="waypoint" class="m-container-small m-blog animated fadeInLeft">
      <div class="ui container">
        <div class="ui top attached segment">
          <div class="ui horizontal link list">
            <div class="item">
              <img v-bind:src="dataList.avatar" class="ui avatar image">
              <div class="content"><a class="header">{{dataList.nickname}}</a></div>
            </div>
            <div class="item">
              <i class="calendar icon"></i> {{dataList.createTime}}
            </div>
            <div class="item">
              <i class="eye icon"></i> {{dataList.views}}
            </div>
            <div class="item">
              <i class="thumbs up outline icon"></i> {{dataList.thumbs}}
            </div>
          </div>
        </div>
        <div class="ui attached segment">
          <!--图片区域-->
          <img v-bind:src=dataList.firstPicture class="ui fluid rounded image">
        </div>
        <div class="ui  attached padded segment">
          <!--内容-->
          <div class="ui right aligned basic segment">
            <div class="ui orange basic label">{{dataList.shareStatement}}</div>
          </div>
          <h2 class="ui center aligned header" v-text="dataList.title"></h2>
          <br>
          <div id="content" class="typo  typo-selection js-toc-content m-padded-lr-responsive m-padded-tb-large" v-html="dataList.content" style="width: 800px">
          </div>

          <!--标签-->
          <div class="m-padded-lr-responsive">
<!--            <div class="ui basic teal left pointing label" v-for="item in tagList" :key="item.tagId">{{item.tagName}}</div>-->
          </div>

          <!--赞赏-->
          <div class="ui center aligned basic segment">
            <button id="payButton" class="ui orange basic circular button">赞赏</button>
          </div>
          <div class="ui payQR flowing popup transition hidden">
            <div class="ui orange basic label">
              <div class="ui images" style="font-size: inherit !important;">
                <div class="image">
                  <img src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcUTT*ciAgjJ0cppZCI5w1ILm3Q2J4WJdIQXJXdXVu5HUtU4pM3n8zAHqY3rf6z3B415ulY*M0Dp.HBBJhfDaF*E!/r" alt="" class="ui rounded bordered image" style="width: 120px">
                  <div>支付宝</div>
                </div>
                <div class="image">
                  <img src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcaapv*CZPLor9HYeVrOOiVJnvoxLW18OIo4.CeFhPXXRsV3xEfxMyKMRodIkn6GwaENGRnt8bkvhKT7JrLFzM.w!/r" alt="" class="ui rounded bordered image" style="width: 120px">
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
                <li>作者：{{dataList.nickname}}（联系作者）</li>
                <li>发表时间：{{dataList.createTime}}</li>
                <li>版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</li>
                <li>公众号转载：请在文末添加作者公众号二维码</li>
              </ui>
            </div>
            <div class="five wide column">
              <img src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcaapv*CZPLor9HYeVrOOiVLnyRm8OUpwb6xeJ6lITPL.CQBAMN*ufWnqF4BJBqO4o0iDboC.V.GwA1i2AehYs7g!/r" alt="" class="ui right floated rounded bordered image" style="width: 110px">
            </div>
          </div>
        </div>
        <div id="comment-container" class="ui bottom attached segment">
          <!--留言区域列表-->
          <div class="ui blue segment">
            <div class="ui threaded comments" style="max-width: 100%">
              <h3 class="ui dividing header">Comments</h3>
              <div class="comment" v-for="item in dataList2" :key="item.commentId">
                <a class="avatar">
                  <img v-bind:src=item.avatar>
                </a>
                <div class="content">
                  <a class="author">{{item.nickname}}</a>
                  <div class="metadata">
                    <span class="date">{{item.createTime}}</span>
                  </div>
                  <div class="text" v-text="item.content">
                  </div>
                  <div class="actions" >
                    <a class="reply" @click="replyComment(item)">回复</a>
                    <a class="reply" @click="deleteComment(item)" v-show="item.uid==uid">删除</a>
                  </div>
                </div>
                <div class="comments">
                  <div class="comment" v-for="item2 in item.children" :key="item2.commentId">
                    <a class="avatar">
                      <img v-bind:src=item2.avatar>
                    </a>
                    <div class="content">
                      <a class="author">{{item2.nickname}}</a>
                      <div class="metadata">
                        <span class="date">{{item2.createTime}}</span>
                      </div>
                      <div class="text" v-text="item2.content">
                      </div>
                      <div class="actions" >
                        <a class="reply" @click="replyComment(item2)">回复</a>
                        <a class="reply" @click="deleteComment(item2)" v-show="item2.uid==uid">删除</a>
                      </div>
                    </div>
                    <div class="comments">
                      <div class="comment" v-for="item3 in item2.children" :key="item3.commentId">
                      <a class="avatar">
                        <img v-bind:src=item3.avatar>
                      </a>
                      <div class="content">
                        <a class="author">{{item3.nickname}}</a>
                        <div class="metadata">
                          <span class="date">{{item3.createTime}}</span>
                        </div>
                        <div class="text" v-text="item3.content">
                        </div>
                        <div class="actions" >
                          <a class="reply" @click="replyComment(item3)">回复</a>
                          <a class="reply" @click="deleteComment(item3)" v-show="item3.uid==uid">删除</a>
                        </div>
                      </div>
                        <div class="comments">
                          <div class="comment" v-for="item4 in item3.children" :key="item4.commentId">
                          <a class="avatar">
                            <img v-bind:src=item4.avatar>
                          </a>
                          <div class="content">
                            <a class="author">{{item4.nickname}}</a>
                            <div class="metadata">
                              <span class="date">{{item4.createTime}}</span>
                            </div>
                            <div class="text" v-text="item4.content">
                            </div>
                            <div class="actions" >
                              <a class="reply" @click="replyComment(item4)">回复</a>
                              <a class="reply" @click="deleteComment(item4)" v-show="item4.uid==uid">删除</a>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui form">
            <el-form ref="addForm" :model="formData">
            <div class="field">
              <textarea name="content" v-model="formData.content"></textarea>
            </div>
            </el-form>
            <div class="fields">
              <div class="field  m-margin-bottom-small m-mobile-wide">
                <button class="ui blue button m-mobile-wide" @click="addComment"><i class="edit icon"></i>发布</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
      <div class="ui vertical icon buttons ">
        <button type="button" class="ui toc blue button" >目录</button>
        <a href="#comment-container" class="ui blue button" >留言</a>
        <button class="ui wechat icon button"><i class="weixin icon"></i></button>
        <button class="ui icon button" @click="thumbsUp">
          <i v-if="thumbsFlag" class="thumbs up icon"></i>
          <i v-else class="thumbs up outline icon"></i>
        </button>
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
    <Footer></Footer>
  </div>

</template>
<script>
import Prism from '../assets/lib/prism/prism'
// import QRCode from '../assets/lib/qrcode/qrcode.min.js'
import QRCode from 'qrcodejs2'
import Footer from '../components/layout/Footer'

export default {
  // 注册组件
  components: {
    Footer
  },
  data () {
    return {
      formData: {
        blogId: '',
        content: '请输入评论信息...', // 评论内容
        parentCommentId: ''
      },
      uid: '',
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      dataList: [],
      dataList2: [],
      thumbsFlag: false
    }
  },
  created () {
    this.getUser()
    this.getOneBlog()
    this.getCommentList()
  },
  methods: {
    async thumbsUp () {
      if (this.toLogin()) {
        const blogId = sessionStorage.getItem('blogId')
        const { data: res } = await this.$http.get(`/api/server/blog/${blogId}/${this.uid}`)
        if (res.flag) {
          this.$message.success(res.message)
          this.thumbsFlag = true
        } else {
          this.$message.info(res.message)
          this.thumbsFlag = false
        }
      }
    },
    toLogin () {
      const tokenStr = window.sessionStorage.getItem('token')
      // 后端指定接口验证了token的正确性
      if (!tokenStr) {
        this.$confirm('登录后才能发表评论或者点赞，请问是否先登录？', '提示', { // 确认框
          type: 'info'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你选择不登录'
          })
          return false
        })
      }
      return !!tokenStr
    },
    async deleteComment (item) {
      this.$confirm('若该评论有子评论的话会被一起删除，你确定要继续删除吗？', '提示', { // 确认框
        type: 'warning'
      }).then(() => {
        const commentId = item.commentId
        const blogId = sessionStorage.getItem('blogId')
        // 表单校验通过，发ajax请求，把数据录入至后台处理
        this.$http.delete(`/api/server/comment/${blogId}/${commentId}`).then((res) => {
          if (res.data.flag) {
            this.getCommentList()
            sessionStorage.setItem('parentCommentId', -1)
            this.formData.content = '请输入评论信息...'
            // 弹出提示信息
            this.$message({
              message: '删除评论成功',
              type: 'success'
            })
          } else { // 执行失败
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除操作已取消'
        })
      })
    },
    async addComment () {
      if (this.toLogin()) {
        console.log(JSON.stringify(this.formData))
        const parentCommentId = sessionStorage.getItem('parentCommentId')
        this.formData.blogId = sessionStorage.getItem('blogId')
        this.formData.parentCommentId = parentCommentId
        var param = this.$encrypTion(JSON.stringify(this.formData))
        // 表单校验通过，发ajax请求，把数据录入至后台处理
        this.$http.post('/api/server/comment/replyComment', param).then((res) => {
          if (res.data.flag) {
            this.getCommentList()
            sessionStorage.setItem('parentCommentId', -1)
            this.formData.content = '请输入评论信息...'
            // 弹出提示信息
            this.$message({
              message: '回复评论成功',
              type: 'success'
            })
          } else { // 执行失败
            this.$message.error('回复评论成功失败')
          }
        })
      }
    },
    replyComment (item) { // 获取被评论者的id作为父id
      this.formData.content = '对' + item.nickname + '说点啥吧：(回复时，请删除本行)'
      sessionStorage.setItem('parentCommentId', item.commentId)
    },
    async getCommentList () {
      const blogId = sessionStorage.getItem('blogId')
      const { data: res } = await this.$http.get(`/api/server/comment/${blogId}`)
      console.log(res)
      if (!res.flag) {
        return this.$message.error('获取评论列表信息失败！')
      }
      this.dataList2 = res.data
    },
    reloadPrism () {
      process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    },
    // 获取所有的菜单
    async getOneBlog () {
      const blogId = sessionStorage.getItem('blogId')
      const { data: res } = await this.$http.get(`/api/server/blog/${blogId}`)
      if (!res.flag) {
        // return this.$message.error('获取博客信息失败！')
        return this.$message.error(res.message)
      }
      this.dataList = res.data
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.uid = JSON.parse(this.user).uid
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
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
    // 有效
    setTimeout(() => {
      this.reloadPrism()
      // eslint-disable-next-line no-undef
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc',
        // Where to grab the headings to build the table of contents.
        contentSelector: '.js-toc-content',
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3'
      })
    }, 1000)
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
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
      console.log('111')
      $(window).scrollTo(0, 500)
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
  .container{
    animation: main 1s;
  }
  .m-blog {
    padding-top: 69vh !important;
    padding-bottom: 0px !important;
  }
  .blog-banner {
    height: 67vh;
    background: url(https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcSPhM*LqG*bYzP4o2JVbahf8eHd4Yd9FO1B4n8UbWJRaQANKT1EBypIfvSNRueI1LSu6d212FUoavpm63ZrUI3E!/r) center
    center / cover no-repeat;
    background-color: #49b1f5;
  }
</style>
