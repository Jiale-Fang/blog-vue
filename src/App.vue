<template>
  <div id="app">
    <index v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login' || path==='/crawler' || path==='/crawlerBlog' )"></index>
    <!-- 导航栏 -->
    <TopNavBar v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login' || path==='/crawler' || path==='/crawlerBlog' )"></TopNavBar>
<!--    <AdminTopNavBar v-show="( path==='/blogs' || path==='/tags2' || path==='/types2' || path==='/postblogs')"></AdminTopNavBar>-->
<!--    <MusicTopNavBar v-show="( path==='/music' || path==='discovery' || path==='/playlists' || path==='/songs' || path==='/mvs' )"></MusicTopNavBar>-->
    <AdminTopNavBar v-show="false"></AdminTopNavBar>
    <Audio></Audio>
    <router-view/>
<!--    <Footer v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about')"></Footer>-->
  </div>
</template>
<script>
// import MusicTopNavBar from './components/layout/MusicTopNavBar'
import TopNavBar from './components/layout/TopNavBar'
import AdminTopNavBar from './components/layout/AdminTopNavBar'
import Audio from './components/music/Audio'
// import Footer from './components/layout/Footer'
export default {
  data () {
    return {
      path: ''
    }
  },
  components: {
    TopNavBar,
    // Footer,
    Audio,
    AdminTopNavBar
    // MusicTopNavBar
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
