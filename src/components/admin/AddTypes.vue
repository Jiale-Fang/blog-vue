<template>
  <div class="AddTypes">
    <!--导航-->
    <nav  class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">管理后台</h2>
          <a href="#" class="active m-item item m-mobile-hide"><i class="mini home icon"></i>博客</a>
          <a href="#" class=" m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
          <a href="#" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
          <div class="right m-item m-mobile-hide menu">
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
    <div class="ui attached pointing menu">
      <div class="ui container">
        <div class="right menu">
          <a href="#" class="active item">新增</a>
          <a href="#" class="teal  item">列表</a>
        </div>
      </div>
    </div>

    <!--中间内容-->
    <div  class="m-container-small m-padded-tb-big">
      <div class="ui container">
        <form action="#" method="post" class="ui form">
          <input type="hidden" name="id" >
          <div class=" field">
            <div class="ui left labeled input">
              <label class="ui teal basic label">名称</label>
              <input type="text" name="name" placeholder="分类名称" >
            </div>
          </div>

          <div class="ui error message"></div>
          <!--/*/
          <div class="ui negative message" th:if="${#fields.hasErrors('name')}"  >
            <i class="close icon"></i>
            <div class="header">验证失败</div>
            <p th:errors="*{name}">提交信息不符合规则</p>
          </div>
           /*/-->
          <div class="ui right aligned container">
            <button type="button" class="ui button" onclick="window.history.go(-1)" >返回</button>
            <button class="ui teal submit button">提交</button>
          </div>

        </form>
      </div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!--底部footer-->
    <footer class="ui inverted vertical segment m-padded-tb-massive">
      <div class="ui center aligned container">
        <div class="ui inverted divided stackable grid">
          <div class="three wide column">
            <div class="ui inverted link list">
              <div class="item">
                <img src="../../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">
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
              <a href="#" class="item m-text-thin">Email：lirenmi@163.com</a>
              <a href="#" class="item m-text-thin">QQ：865729312</a>
            </div>
          </div>
          <div class="seven wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>
            <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>
          </div>
        </div>
        <div class="ui inverted section divider"></div>
        <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2016 - 2017 Lirenmi Designed by Lirenmi</p>
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
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('.ui.form').form({
      fields: {
        title: {
          identifier: 'name',
          rules: [{
            type: 'empty',
            prompt: '请输入分类名称'
          }]
        }
      }
    })
  }
}
</script>

<style scoped>

</style>
