<template>
  <el-drawer
    :visible.sync="drawer"
    direction="rtl"
    width="250"
    disable-resize-watcher
    right
    overlay-opacity="0.8"
  >
    <!-- 博主介绍 -->
    <div class="blogger-info">
      <el-avatar :size="110" style="margin-bottom:0.5rem">
        <img src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjqLW3e23.UCR78O5Km8SpsknNgOGpEzdY7QHY1usDO6pbksfeQBV5CqlMGgsjJVV9s!/r" />
      </el-avatar>
    </div>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem">文章</div>
          <div style="font-size: 1.125rem;">
            {{ this.$store.state.blogInfo.blogCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/types">
          <div style="font-size: 0.875rem">分类</div>
          <div style="font-size: 1.125rem">
            {{ this.$store.state.blogInfo.typeCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/tags">
          <div style="font-size: 0.875rem">标签</div>
          <div style="font-size: 1.125rem">
            {{ this.$store.state.blogInfo.tagCount }}
          </div>
        </router-link>
      </div>
    </div>
    <hr />
    <!-- 页面导航 -->
    <div class="menu-container">
      <div class="menus-item">
        <router-link to="/">
          <i class="iconfont iconzhuye" /> 首页
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/archives">
          <i class="iconfont iconguidang" /> 归档
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/discovery">
          <i class="el-icon-headset" /> 音乐盒
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/types">
          <i class="iconfont iconfenlei" /> 分类
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/tags">
          <i class="iconfont iconbiaoqian" /> 标签
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/link">
          <i class="iconfont iconlianjie" /> 友链
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/about">
          <i class="iconfont iconzhifeiji" /> 关于
        </router-link>
      </div>
      <div class="menus-item">
        <router-link to="/message">
          <i class="iconfont iconpinglunzu" /> 留言
        </router-link>
      </div>
      <div class="menus-item" v-if="!this.$store.state.avatar">
        <router-link to="/login">
        <i class="iconfont icondenglu" /> 登录
        </router-link>
      </div>
      <div v-else>
        <div class="menus-item">
          <router-link to="/adminHome">
            <i class="iconfont icongerenzhongxin" /> 个人中心
          </router-link>
        </div>
        <div class="menus-item">
          <a @click="logout"><i class="iconfont icontuichu" /> 退出</a>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.blogger-info {
  padding: 26px 30px 0;
  text-align: center;
}
.blog-info-wrapper {
  display: flex;
  align-items: center;
  padding: 12px 10px 0;
}
.blog-info-data {
  flex: 1;
  line-height: 2;
  text-align: center;
}
hr {
  border: 2px dashed #d2ebfd;
  margin: 20px 0;
}
.menu-container {
  padding: 0 10px 40px;
  animation: 0.8s ease 0s 1 normal none running sidebarItem;
}
.menus-item a {
  padding: 6px 30px;
  display: block;
  line-height: 2;
}
.menus-item i {
  margin-right: 2rem;
}
@keyframes sidebarItem {
  0% {
    transform: translateX(200px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>

<script>
import { resetRouter } from '../../router'

export default {
  computed: {
    drawer: {
      set (value) {
        this.$store.state.drawer = value;
      },
      get () {
        return this.$store.state.drawer;
      }
    },
    isLogin () {
      return this.$store.state.uid;
    }
  },
  methods: {
    logout () {
      // 清空用户菜单
      resetRouter()
      window.sessionStorage.clear()
      this.$store.commit('logout')
      this.$router.push('/home')
    },
  }
};
</script>
