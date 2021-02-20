<template>
  <div id="app">
    <!-- 导航栏 -->
    <TopNavBar v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about' || path==='/message' || path==='/login')"></TopNavBar>
<!--    <AdminTopNavBar v-show="( path==='/blogs' || path==='/tags2' || path==='/types2' || path==='/postblogs')"></AdminTopNavBar>-->
    <AdminTopNavBar v-show="false"></AdminTopNavBar>
    <router-view/>
<!--    <Footer v-show="( path==='/home' || path==='/types' || path==='/archives' || path==='/link' || path==='/blog' || path==='/tags' || path==='/about')"></Footer>-->
  </div>
</template>
<script>
import TopNavBar from './components/layout/TopNavBar'
import AdminTopNavBar from './components/layout/AdminTopNavBar'
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
