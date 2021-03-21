<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <el-avatar v-bind:src="this.avatar"></el-avatar>
        <span>博客后台管理</span>
      </div>
      <router-link to="/home">
      <el-button type="info" @click="logout">退出</el-button>
      </router-link>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏，点击收缩-->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i v-bind:class="subItem.icon"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <router-link to="/home">
          <el-menu-item ><i class="el-icon-s-home"></i>首页</el-menu-item>
          </router-link>
        </el-menu>
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
// import { initDynamicRoutes } from '../router'
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        {
          id: 101,
          authName: '用户管理',
          path: null,
          children: [
            {
              id: 102,
              authName: '个人信息',
              path: 'users',
              icon: 'el-icon-user-solid',
              children: []
            },
            {
              id: 103,
              authName: '评论管理',
              path: 'comments',
              icon: 'el-icon-s-comment',
              children: []
            }
          ]
        },
        {
          id: 201,
          authName: '博客管理',
          path: null,
          children: [
            {
              id: 202,
              authName: '发布博客',
              path: 'PostBlogs',
              icon: 'el-icon-edit',
              children: []
            },
            {
              id: 203,
              authName: '查看博客',
              path: 'blogs',
              icon: 'el-icon-view',
              children: []
            },
            {
              id: 204,
              authName: '标签管理',
              path: 'tags2',
              icon: 'iconfont2 iconbiaoqian',
              children: []
            },
            {
              id: 205,
              authName: '分类管理',
              path: 'types2',
              icon: 'iconfont2 iconfenlei',
              children: []
            }
          ]
        },
        {
          id: 501,
          authName: '数据统计',
          path: null,
          children: [
            {
              id: 502,
              icon: 'el-icon-s-data',
              authName: '博文数据',
              path: 'Report',
              children: []
            },
            {
              id: 503,
              icon: 'el-icon-s-management',
              authName: '单篇博客分析',
              path: 'Report2',
              children: []
            }
          ]
        }
      ],
      iconsObj: {
        101: 'el-icon-s-custom',
        201: 'el-icon-edit-outline',
        301: 'iconfont icon-tijikongjian',
        401: 'iconfont icon-baobiao',
        501: 'el-icon-s-marketing'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      nickname: '',
      avatar: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getUser()
  },
  methods: {
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
      // 刷新页面，删除vuex数据
      setTimeout(() => {
        window.location.reload()
      }, 100)
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
  .home-container {
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
