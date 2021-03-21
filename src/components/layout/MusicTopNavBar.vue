<template>
  <div id="navClass" class="navClass" hide-on-scroll flat height="58">
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="float-left blog-title">
<!--        <router-link to="/">-->
<!--        </router-link>-->
      </div>
      <div class="float-right nav-title">
        <div class="right-box">
          <div class="el-input el-input--small el-input--prefix">
            <!-- 搜索框 -->
            <input v-if="searchFlag"
              type="text"
              autocomplete="off"
              placeholder="搜索"
              class="el-input__inner"
              v-model="inputValue"
              @keyup.enter="toResult"
            />
            <span class="el-input__prefix">
              <i class="el-input__icon el-icon-search" v-if="searchFlag"></i>
            </span>
          </div>
        </div>
<!--        <el-input v-if="searchFlag" style="float: top;width: 100px" placeholder="请输入内容" v-model="inputValue"-->
<!--                  @keyup.enter="toResult"></el-input><i class="el-icon-circle-close" v-if="searchFlag" @click="closeSearch"></i>-->
        <div class="menus-item" @click="openSearch" v-if="!searchFlag">
          <a @click="search"><i class="iconfont2 iconsousuo" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 15px">搜索</span></a>
        </div>
        <div class="menus-item">
          <router-link to="/discovery">
            <i class="el-icon-service" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">发现音乐</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/playlists">
            <i class="el-icon-document" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">推荐歌单</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/songs">
            <i class="el-icon-news" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">最新音乐</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/mvs">
            <i class="el-icon-film" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">最新MV</span>
          </router-link>
        </div>
        <div class="menus-item" style="cursor:pointer;">
          <router-link to="/home">
            <i class="iconfont2 iconzhuye" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">首页</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.getUser()
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  // data: function () {
  //   return {
  //
  //   }
  // },
  data () {
    return {
      // 输入的内容
      inputValue: '',
      navClass: '',
      avatar: '',
      user: {},
      queryString: '',
      searchFlag: false
    }
  },
  methods: {
    toResult () {
      // 非空判断
      if (this.inputValue === '') {
        // 提示用户
        this.$message.warning('请输入内容')
      } else {
        // 去搜索页 携带数据
        this.$router.push('/result?q=' + this.inputValue)
      }
    },
    openSearch () {
      this.searchFlag = true
    },
    search () {
      this.searchFlag = true
      if (this.queryString !== '') {
        sessionStorage.setItem('queryString', this.queryString)
        this.queryString = ''
        this.searchFlag = false
        if (this.$route.path === '/home') { window.location.reload() } else {
          this.$router.push('/home')
        }
      }
    },
    scroll () {
      const that = this
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.navClass = 'nav-fixed'
      } else {
        that.navClass = 'nav'
      }
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
      // 刷新页面，删除vuex数据
      window.location.reload()
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    }
  },
  computed: {
    // avatar () {
    //   return this.avatar
    // }
  }
}
</script>

<style scoped>
@import "../../assets/music/index.css";
  .navClass{
    /*position:fixed; !* 绝对定位，fixed是相对于浏览器窗口定位。 *!*/
    position: relative;
    top:15px; /* 距离窗口顶部距离 */
    right: 22px;
    height:10px; /* 高度 */
    float: right;
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
  i {
    margin-right: 4px;
  }
  ul {
    list-style: none;
  }
  .nav {
    background: rgba(0, 0, 0, 0) !important;
  }
  .nav a {
    color: #eee !important;
  }
  .nav .menus-item a {
    text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  }
  .nav .blog-title a {
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  }
  .theme--light.nav-fixed {
    background: rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
  }
  .theme--dark.nav-fixed {
    background: rgba(18, 18, 18, 0.8) !important;
  }
  .theme--dark.nav-fixed a {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .theme--light.nav-fixed a {
    color: #4c4948 !important;
  }
  .nav-fixed .menus-item a,
  .nav-fixed .menus-btn a,
  .nav-fixed .blog-title a {
    text-shadow: none;
  }
  .nav-container {
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
  .nav-mobile-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .blog-title,
  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .blog-title a {
    font-size: 18px;
    font-weight: bold;
  }
  .user-btn,
  .menus-btn,
  .menus-item {
    position: relative;
    display: inline-block;
    margin: 0 0 0 0.875rem;
  }
  .menus-btn a,
  .menus-item a {
    transition: all 0.2s;
  }
  .nav-fixed .menus-btn a:hover,
  .nav-fixed .menus-item a:hover {
    color: #49b1f5 !important;
  }
  .menus-item a:hover:after {
    width: 100%;
  }
  .menus-item a:after {
    position: absolute;
    bottom: -5px;
    left: 0;
    z-index: -1;
    width: 0;
    height: 3px;
    background-color: #80c8f8;
    content: "";
    transition: all 0.3s ease-in-out;
  }
  .user-btn a {
    transition: all 0.2s;
  }
  .user-avatar {
    cursor: pointer;
    border-radius: 50%;
  }
  .user-btn:hover .user-submenu {
    display: block;
  }
  .user-submenu {
    position: absolute;
    display: none;
    right: 0;
    width: max-content;
    margin-top: 8px;
    box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    animation: submenu 0.3s 0.1s ease both;
  }
  .user-submenu:before {
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 20px;
    content: "";
  }
  .user-submenu a {
    line-height: 2;
    color: #4c4948 !important;
    text-shadow: none;
    display: block;
    padding: 6px 14px;
  }
  .user-submenu a:hover {
    background: #4ab1f4;
  }
  @keyframes submenu {
    0% {
      opacity: 0;
      filter: alpha(opacity=0);
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      filter: none;
      transform: translateY(0);
    }
  }
</style>
