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

<style>
  body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: url("https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mce80KgERvhV49OLgLEc6tIViX7bQ6yhDjSCZnfvv3X*LDhhFk0K*5xZoxTlCiYo.ZBnLMk4RdY2seW70EDByE84!/r") center center /
    cover no-repeat;
    background-color: #49b1f5;
    background-attachment: fixed;
    text-align: center;
    color: #fff !important;
    animation: header-effect 1s !important;
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
