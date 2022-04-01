<template>
    <div>
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in this.$store.state.userMenuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!--              <i :class="iconsObj[item.id]"></i>-->
              <i :class="item.icon"></i>
              <!-- 文本 -->
              <span>{{item.name}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i v-bind:class="subItem.icon"></i>
                <!-- 文本 -->
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <router-link to="/home">
            <el-menu-item ><i class="el-icon-s-home"></i>首页</el-menu-item>
          </router-link>
        </el-menu>
    </div>
</template>

<script>
import { resetRouter } from '../../router'

export default {
  name: 'SideBar',
  data () {
    return {
      // 被激活的链接地址
      isCollapse: false,
      activePath: '',
    }
  },
  created () {
    // this.menuList = this.$store.state.userMenuList
  },
  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$store.state.isCollapse = this.isCollapse
    },
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

<style scoped>
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
