<template>
  <div id="app">
    <!-- 导航栏 -->
    <TopNavBar v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login' || path==='/crawler' || path==='/crawlerBlog' || path==='/AI' )"></TopNavBar>
<!--    <AdminTopNavBar v-show="( path==='/blogs' || path==='/tags2' || path==='/types2' || path==='/postblogs')"></AdminTopNavBar>-->
<!--    <MusicTopNavBar v-show="( path==='/music' || path==='discovery' || path==='/playlists' || path==='/songs' || path==='/mvs' )"></MusicTopNavBar>-->
    <AdminTopNavBar v-show="false"></AdminTopNavBar>
    <Audio></Audio>
<!--    <Audio v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login' || path==='/crawler' || path==='/crawlerBlog' )"></Audio>-->
    <router-view/>
<!--    <Footer v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about')"></Footer>-->
  </div>
</template>
<script>
import Vue from 'vue'
import TopNavBar from './components/layout/TopNavBar'
import AdminTopNavBar from './components/layout/AdminTopNavBar'
import Audio from './components/music/Audio'
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
    AdminTopNavBar
  },
  // 判断路由
  mounted () {
    this.path = this.$route.path
    // console.log(this.$route.path)
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    }
  }

}
</script>
<style>
</style>
