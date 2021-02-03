<template>
  <div class="types">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small">
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">Blog</h2>
          <a href="/#/home" class="m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
          <a href="/#/types" class="active m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
          <a href="/#/tags" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
          <a href="/#/Archives" class="m-item item m-mobile-hide"><i class="mini clone icon"></i>归档</a>
          <a href="/#/About" class="m-item item m-mobile-hide"><i class="mini info icon"></i>关于我</a>
          <a href="/#/blogs" class="m-item item m-mobile-hide"><i class="mini user icon"></i>后台管理</a>
          <div class="right m-item m-mobile-hide menu">
            <div class="ui icon inverted transparent input m-margin-tb-tiny">
              <input type="text" placeholder="Search....">
              <i class="search link icon"></i>
            </div>
            <div class="ui dropdown item">
              <div class="text">
                <img class="ui avatar image" v-bind:src="avatar">
                <span>{{this.nickname}}</span>
              </div>
              <i class="dropdown icon"></i>
              <div class="menu">
                <a href="/#/login" class="item">登录</a>
                <a @click="logout" class="item">注销</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="ui menu toggle black icon button m-right-top m-mobile-show">
        <i class="sidebar icon"></i>
      </a>
    </nav>

    <!--中间内容-->
    <div class="m-container-small m-padded-tb-big">
      <div class="ui container">
        <!--header-->
        <div class="ui top attached segment">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <h3 class="ui teal header">分类</h3>
            </div>
            <div class="right aligned column">
              共 <h2 class="ui orange header m-inline-block m-text-thin"> {{typeList.length}} </h2> 个
            </div>
          </div>
        </div>

        <div class="ui attached segment m-padded-tb-large" >
          <template v-for="item in typeList">
            <div class="ui labeled button m-margin-tb-tiny" @click="saveNavState(item)" v-if="activeId===item.typeId" :key="item.typeId">
              <a class="ui basic teal button">{{item.typeName}}</a>
              <div class="ui basic teal left pointing label">{{item.typeCount}}</div>
            </div>
            <div class="ui labeled button m-margin-tb-tiny" @click="saveNavState(item)" v-else :key="item.typeId">
              <a class="ui basic button">{{item.typeName}}</a>
              <div class="ui basic left pointing label">{{item.typeCount}}</div>
            </div>
          </template>
        </div>

        <!--header-->
        <div class="ui top attached segment">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <h3 class="ui teal header">博客</h3>
            </div>
            <div class="right aligned column">
              共 <h2 class="ui orange header m-inline-block m-text-thin">{{pagination.total}}</h2> 篇
            </div>
          </div>
        </div>

        <!--content-->
        <div class="ui attached  segment">

          <div class="ui padded vertical segment m-padded-tb-large" v-for="item in dataList" :key="item.blogId">
            <div class="ui middle aligned mobile reversed stackable grid">
              <div class="eleven wide column" style="cursor:pointer;">
                <h3 class="ui header" @click="toBlog(item.blogId)">{{item.title}}</h3>
                <p class="m-text">{{item.description}}</p>
                <div class="ui grid">
                  <div class="eleven wide column">
                    <div class="ui mini horizontal link list">
                      <div class="item">
                        <img v-bind:src=item.avatar class="ui avatar image">
                        <div class="content"><a href="#" class="header">{{item.nickname}}</a></div>
                      </div>
                      <div class="item">
                        <i class="calendar icon"></i> {{item.createTime}}
                      </div>
                      <div class="item">
                        <i class="eye icon"></i> {{item.views}}
                      </div>
                    </div>
                  </div>
                  <div class="right aligned five wide column">
                    <a href="#" target="_blank" class="ui teal basic label m-padded-tiny m-text-thin">{{item.typeName}}</a>
                  </div>
                </div>
              </div>
              <div class="five wide column">
                <a target="_blank">
                  <img v-bind:src=item.firstPicture @click="toBlog(item.blogId)" alt="" class="ui rounded image">
                </a>
              </div>

            </div>
          </div>
        </div>

        <!--footer-->
        <div class="ui bottom attached segment">
          <div class="pagination-container">
            <el-pagination
              class="pagiantion"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="[2,6,10,15]"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>

    <br>
    <br>
    <!--底部footer-->
    <footer class="ui inverted vertical segment m-padded-tb-massive">
      <div class="ui center aligned container">
        <div class="ui inverted divided stackable grid">
          <div class="three wide column">
            <div class="ui inverted link list">
              <div class="item">
                <img src="../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">
              </div>
            </div>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">最新博客</h4>
            <div class="ui inverted link list">
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
            </div>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">联系我</h4>
            <div class="ui inverted link list">
              <a href="#" class="item m-text-thin">Email：1626680964@qq.com</a>
              <a href="#" class="item m-text-thin">QQ：1626680964</a>
            </div>
          </div>
          <div class="seven wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>
            <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>
          </div>
        </div>
        <div class="ui inverted section divider"></div>
        <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2020 - 2021 Fjl Designed by Fjl</p>
      </div>

    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeId: '', // 被激活的标签id
      dataList: [], // 当前页要展示的博客分页列表数据
      typeList: [], // 分类列表的数据
      tagList: [], // 标签列表的数据
      latestList: [], // 最新发布的博客列表的数据
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 6, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: ''
    }
  },
  created () {
    this.getUser()
    this.findPage(this.activeId)
    this.getTypeList()
  },
  methods: {
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.$router.push('/blog')
    },
    async saveNavState (item) {
      this.activeId = item.typeId
      if (item.typeCount === 0) {
        this.$message.error('查询失败，当前所在分类的博客数为0')
      } else {
        await this.findPage(this.activeId)
      }
    },
    async getTypeList () {
      const { data: res } = await this.$http.get('/server/home/getTypeCount')
      this.typeList = res.data
    },
    // 分页查询
    async findPage (typeId) {
      const id = sessionStorage.getItem('typeId')
      if (id !== null) {
        typeId = id
        this.activeId = id
      }
      sessionStorage.removeItem('typeId')
      // 发送ajax，提交分页请求（页码，每页显示条数，查询条件)
      const param = {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: this.pagination.queryString,
        typeId: typeId
      }
      var param2 = this.$encruption(JSON.stringify(param))
      const { data: res } = await this.$http.post('/server/type/getById', param2)
      // 解析controller响应回的数据
      if (!res.flag) {
        return this.$message.error('获取首页列表失败！')
      }
      this.pagination.total = res.data.total
      this.dataList = res.data.records
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
    },
    handleCurrentChange (currentPage) {
      // 设置最新的页码
      this.pagination.currentPage = currentPage
      // 重新调用findPage方法进行分页查询
      this.findPage()
    },
    handleSizeChange (newSize) {
      this.pagination.pageSize = newSize
      this.findPage()
    }
  },
  mounted () {
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
  }
}
</script>

<style scoped>

</style>
