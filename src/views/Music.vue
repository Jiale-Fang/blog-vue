<template>
  <div id="app">
      <MusicTopNavBar></MusicTopNavBar>
    <!-- 头部组件 -->
<!--    <Top></Top>-->
    <!-- 主体组件 -->
    <index style="width: 100%!important;"></index>
  </div>
</template>

<script>
// import Top from '../components/music/Top.vue'
import MusicTopNavBar from '../components/layout/MusicTopNavBar'
import index from '../components/music/Index.vue'
export default {
  // 注册组件
  components: {
    // Top, // top:top
    MusicTopNavBar,
    index// index:index
  }
}
</script>

<style scoped>
</style>
