<template>
    <div class="adminNavClass">
      <!--导航-->
      <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
        <div class="ui container">
          <div class="ui inverted secondary stackable menu">
            <h2 class="ui my-blue header item">管理后台</h2>
            <template v-for="item in dataList">
              <div @click="saveNavState(item.id)"  :key="item.id" style="padding-top: 14px">
                <a v-bind:href="item.path" v-if="item.id==activeIndex" v-bind:class="'active '+item.active"><i v-bind:class="item.icon" style="width: 15px"></i>{{item.name}}</a>
                <a v-bind:href="item.path" v-else :key="item.id" v-bind:class="item.active"><i v-bind:class="item.icon" style="width: 15px"></i>{{item.name}}</a>
              </div>
            </template>
            <div class="right m-item m-mobile-hide menu" >
              <div class="ui dropdown item">
                <div class="text">
                  <img class="ui avatar image" v-bind:src="avatar">
                  <span>{{this.nickname}}</span>
                </div>
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a href="#" @click="logout" class="item">注销</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="ui menu toggle black icon button m-right-top m-mobile-show">
          <i class="sidebar icon"></i>
        </a>
      </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          id: 1,
          path: '/#/blogs',
          active: 'item',
          icon: 'mini edit icon',
          name: '个人博客'
        },
        {
          id: 2,
          path: '/#/types2',
          active: 'item',
          icon: 'mini idea icon',
          name: '分类管理'
        },
        {
          id: 3,
          path: '/#/tags2',
          active: 'item',
          icon: 'mini tags icon',
          name: '标签管理'
        },
        {
          id: 4,
          path: '/#/home',
          active: 'item',
          icon: 'mini home icon',
          name: '首页'
        }
      ], // 当前页要展示的博客分页列表数据
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 6, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      user: {},
      nickname: '',
      avatar: '',
      activeIndex: ''
    }
  },
  created () {
    this.getUser()
    this.activeIndex = window.sessionStorage.getItem('activeIndex')
    // this.findPage()
  },
  methods: {
    // 保存链接的激活状态
    saveNavState (activeIndex) {
      window.sessionStorage.setItem('activeIndex', activeIndex)
      this.activeIndex = activeIndex
    },
    search () {
      this.findPage()
      this.pagination.queryString = null
    },
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
      window.location.reload()
    }
  },
  mounted () {
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
  }
}
</script>

<style scoped>

</style>
