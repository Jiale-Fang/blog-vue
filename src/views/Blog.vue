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
<!--            <div class="ui orange basic label">{{dataList.copyright}}</div>-->
            <el-tag :type="articleType(dataList.copyright).tagType">
              {{ articleType(dataList.copyright).name }}
            </el-tag>
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
                  <div class="text" v-html="item.content">
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
                      <a class="author">{{item2.nickname}}<a class="author" v-if="item2.replyNickname.length!==0">回复</a><a>{{item2.replyNickname}}:</a></a>
                      <div class="metadata">
                        <span class="date">{{item2.createTime}}</span>
                      </div>
                      <div class="text" v-html="item2.content">
                      </div>
                      <div class="actions" >
                        <a class="reply" @click="replyComment(item2)">回复</a>
                        <a class="reply" @click="deleteComment(item2)" v-show="item2.uid==uid">删除</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ui form">
            <el-form ref="addForm" :model="formData">Comments
            <div class="field">
              <textarea name="content" v-model="formData.content"></textarea>
            </div>
            </el-form>
            <div class="fields">
              <div class="field  m-margin-bottom-small m-mobile-wide">
                <button class="ui blue button m-mobile-wide" @click="addComment"><i class="edit icon"></i>发布</button>
                <button class="ui green button m-mobile-wide" @click="addCode"><i class="code icon"></i>代码块</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
      <div class="ui vertical icon buttons ">
        <button type="button" class="ui toc blue button" >目录
        </button>
        <a id="toBottom-button" class="ui blue button" >留言</a>
        <button class="ui wechat icon button"><i class="weixin icon"></i></button>
        <button class="ui icon button" @click="thumbsUp">
          <i v-if="thumbsFlag" class="thumbs up icon"></i>
          <i v-else class="thumbs up outline icon"></i>
        </button>
        <button class="ui icon button" @click="favorite">
          <i v-if="favoriteFlag" class="star icon"></i>
          <i v-else class="star outline icon"></i>
        </button>
        <div id="toTop-button" class="ui icon button" ><i class="chevron up icon"></i></div>
      </div>
    </div>
    <div class="ui toc-container flowing popup transition hidden" style="width: 250px!important;">
      <ol style="overflow: auto" class="js-toc">
      </ol>
    </div>

    <div id="qrcode" class="ui wechat-qr flowing popup transition hidden " style="width: 130px !important;">
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
import tocbot from "tocbot";
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
        parentCommentId: '',
        replyUid: ''
      },
      uid: '',
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      dataList: [],
      dataList2: [],
      thumbsFlag: false,
      favoriteFlag: false
    }
  },
  created () {
    this.uid = this.$store.state.uid
    this.formData.blogId = this.$route.path.split('/blog/')[1]
    this.getOneBlog()
    this.getCommentList()
  },
  destroyed () {
    tocbot.destroy();
  },
  computed: {
    articleType () {
      return function (type) {
        var tagType = "";
        var name = "";
        switch (type) {
          case 1:
            tagType = "danger";
            name = "原创";
            break;
          case 2:
            tagType = "success";
            name = "转载";
            break;
          case 3:
            tagType = "primary";
            name = "翻译";
            break;
        }
        return {
          tagType: tagType,
          name: name
        };
      };
    }
  },
  methods: {
    async favorite () {
      if (this.toLogin()) {
        const blogId = this.$store.state.blogId
        const { data: res } = await this.$http.get(`/api/server/blog/admin/favorite/${blogId}/${this.uid}`)
        if (res.flag) {
          this.$message.success(res.message)
          this.favoriteFlag = res.data
        }
      }
    },
    async thumbsUp () {
      if (this.toLogin()) {
        const blogId = this.$store.state.blogId
        const { data: res } = await this.$http.get(`/api/server/blog/admin/thumbUp/${blogId}/${this.uid}`)
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
      const tokenStr = this.$store.state.token
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
        const blogId = this.$store.state.blogId
        // 表单校验通过，发ajax请求，把数据录入至后台处理
        this.$http.delete(`/api/server/comment/admin/delComment/${blogId}/${commentId}`).then((res) => {
          if (res.data.flag) {
            this.getCommentList()
            this.$store.state.parentCommentId = -1
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
    addCode () {
      this.formData.content = this.formData.content + '\n<pre><code>\n' + '请在此输入要添加的代码（输入时请删除本句话）' +
        '\n</code></pre>\n'
    },
    async addComment () {
      if (this.toLogin()) {
        const parentCommentId = this.$store.state.parentCommentId
        this.formData.blogId = this.$store.state.blogId
        this.formData.parentCommentId = parentCommentId
        // var param = this.$encrypTion(JSON.stringify(this.formData))
        // 表单校验通过，发ajax请求，把数据录入至后台处理
        this.$http.post('/api/server/comment/admin/replyComment', this.formData).then((res) => {
          if (res.data.flag) {
            this.getCommentList()
            this.$store.state.parentCommentId = -1
            this.formData.content = '请输入评论信息...'
            this.formData.replyUid = ''
            // 弹出提示信息
            this.$message({
              message: '回复评论成功',
              type: 'success'
            })
            setTimeout(() => {
              this.reloadPrism()
            }, 1000)
          } else { // 执行失败
            this.$message.error('回复评论失败')
          }
        })
      }
    },
    replyComment (item) { // 获取被评论者的id作为父id
      this.formData.content = '对' + item.nickname + '说点啥吧：(回复时，请删除本行)'
      this.formData.replyUid = item.uid
      if (item.parentCommentId === '-1') { // 代表回复的是根评论
        this.$store.state.parentCommentId = item.commentId
      } else {
        this.$store.state.parentCommentId = item.parentCommentId
      }
    },
    async getCommentList () {
      const { data: res } = await this.$http.get(`/api/server/comment/commentList/${this.formData.blogId}`)
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
      const { data: res } = await this.$http.get(`/api/server${this.$route.path}`)
      if (!res.flag) {
        // return this.$message.error('获取博客信息失败！')
        return this.$message.error(res.message)
      }
      this.dataList = res.data
      setTimeout(() => {
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
    }
  },
  mounted () {
    // 有效
    setTimeout(() => {
      this.reloadPrism()
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
      $(window).scrollTo(0, 500)
    })
    $('#toBottom-button').click(function () {
      $(window).scrollTo(999999999, 1000)
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
  },
  watch: {
    $route (to, from) {
      if ((this.path !== to.path) && (to.path.indexOf('#') === -1)) {
        this.formData.blogId = to.path.split('/blog/')[1]
        this.getCommentList()
        this.getOneBlog()
      }
    }
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
