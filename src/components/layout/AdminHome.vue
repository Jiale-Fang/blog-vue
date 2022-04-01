<template>
  <el-container class="admin-home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <el-avatar v-bind:src="this.$store.state.avatar"></el-avatar>
        <span>博客后台管理</span>
      </div>
      <router-link to="/home">
      <el-button type="info" @click="logout">退出</el-button>
      </router-link>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏，点击收缩-->
      <el-aside height="100%" :width="this.$store.state.isCollapse ? '64px' : '200px'">
      <SideBar/>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import router from '../../router'
// import Vue from 'vue'
import { resetRouter } from '../../router'
// import { generaMenu } from '../../assets/js/menu'
import SideBar from "../../components/layout/SideBar";
export default {
  components: {
    SideBar
  },
  created () {
    this.activePath = this.$store.state.activePath
  },
  methods: {
    logout () {
      // 清空用户菜单
      resetRouter();
      window.sessionStorage.clear()
      this.$store.commit('logout')
      this.$router.push('/home')
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      this.$store.state.activePath = activePath
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .admin-home-container {
    height: 100%;
  }
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }

  .iconfont2 {
    margin-right: 10px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
</style>
