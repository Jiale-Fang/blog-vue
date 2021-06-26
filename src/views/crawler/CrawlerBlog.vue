<template>
  <div class="home">
    <div class="blog-banner banner">
      <h1 class="banner-title">被爬取的博客详情</h1>
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
            <div class="ui orange basic label">转载</div>
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
              </ui>
            </div>
            <div class="five wide column">
              <img src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcaapv*CZPLor9HYeVrOOiVLnyRm8OUpwb6xeJ6lITPL.CQBAMN*ufWnqF4BJBqO4o0iDboC.V.GwA1i2AehYs7g!/r" alt="" class="ui right floated rounded bordered image" style="width: 110px">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
      <div class="ui vertical icon buttons ">
        <button type="button" class="ui toc blue button" >目录</button>
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
  </div>

</template>
<script>
import Prism from '../../assets/lib/prism/prism'
// import QRCode from '../assets/lib/qrcode/qrcode.min.js'
import QRCode from 'qrcodejs2'

export default {
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
  },
  methods: {
    reloadPrism () {
      process.browser && document.querySelectorAll('pre code').forEach(block => Prism.highlightElement(block))
    },
    // 获取所有的菜单
    async getOneBlog () {
      this.$message.info('博客信息是从csdn中爬取出来的，作者名已显示在开头。该博客仅做学习使用，如若侵权，请联系本人删除谢谢！！')
      const blogId = sessionStorage.getItem('blogId')
      // const { data: res } = await this.$http.get(`/extension/crawler/${blogId}`)
      const { data: res } = await this.$http.get(`/extension/crawler/${blogId}`)
      if (!res.flag) {
        return this.$message.error('获取博客信息失败！')
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
    $('#toTop-button').click(function () {
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
  @import "../../assets/css/typo.css";
  @import "../../assets/css/animate.css";
  .container{
    animation: main 1s;
  }
  .m-blog {
    padding-top: 460px !important;
    padding-bottom: 0px !important;
  }
  .blog-banner {
    height: 480px;
    background: url(https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQz6a6RmGKe6G3ZOYoIoQdmfLYI.msEQq.iRJFhsrqXB.IdsB*o9ZQBar4xdCCjOqlN5rl5AQkXKVqsQ3yu58Pw!/r) center
    center / cover no-repeat;
    background-color: #49b1f5;
  }
</style>
