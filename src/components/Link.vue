<template>
    <div class="link">
      <!-- banner -->
      <div class="link-banner banner">
        <h1 class="banner-title">友链</h1>
      </div>
      <br>
      <br>
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
  .banner-title {
    animation: title-scale 1s;
    position: absolute;
    top: 25rem;
    padding: 0 0.5rem;
    width: 100%;
    font-size: 2.5rem;
    text-align: center;
    color: #eee;
  }
  .link-banner {
    height: 110vh;
    background: url(http://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjrcd90GMu1NvFVRUxh.ZERBAbPSIeInGGY0C9uI2uTdJATSv*Nt3RFEYI4RVJUCXqo!/r) center center /
    cover no-repeat;
    background-color: #49b1f5;
  }
  .container{
    animation: main 1.0s;
  }
  .m-link {
    padding-top: 460px !important;
    padding-bottom: 0px !important;
  }
</style>
