<template>
  <div id="app">
    <!-- 导航栏 -->
    <TopNavBar v-show="( path==='/home' || path.includes('/types') || path==='/archives' || path==='/link' || path.includes('/blog/') || path.includes('/tags') || path==='/about' || path==='/message' || path==='/login' || path.includes('/crawler') || path==='/AI' )"></TopNavBar>
<!--    <AdminTopNavBar v-show="( path==='/blogs' || path==='/tags2' || path==='/types2' || path==='/postblogs')"></AdminTopNavBar>-->
<!--    <MusicTopNavBar v-show="( path==='/music' || path==='discovery' || path==='/playlists' || path==='/songs' || path==='/mvs' )"></MusicTopNavBar>-->
    <AdminTopNavBar v-show="false"></AdminTopNavBar>
    <Audio></Audio>
    <!-- 忘记密码模态框 -->
    <ForgetModel></ForgetModel>
<!--        <Footer v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about')"></Footer>-->
    <!--    <Audio v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login' || path==='/crawler' || path==='/crawlerBlog' )"></Audio>-->
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue'
import ForgetModel from './components/model/ForgetModel'
import TopNavBar from './components/layout/TopNavBar'
import AdminTopNavBar from './components/layout/AdminTopNavBar'
import Audio from './components/music/Audio'
import router from './router'
import { generaMenu } from './assets/js/menu'
// import Footer from './components/layout/Footer'
export default {
  data () {
    return {
      path: '',
      myApp: new Vue() // 为了非父子组件共享值
    }
  },
  components: {
    Audio,
    TopNavBar,
    // Footer,
    ForgetModel,
    AdminTopNavBar
  },
  // 判断路由
  mounted () {
    this.path = this.$route.path
  },
  watch: {
    $route (to, from) {
      this.path = to.path
      router.addRoutes(this.$store.state.asyncRoutes);
    }
  },
  created () {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    if (this.$store.state.token !== '') {
      generaMenu()
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
</style>
