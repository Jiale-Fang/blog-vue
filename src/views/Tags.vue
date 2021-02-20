<template>
    <div class="tags">
      <div class="tags-banner banner">
        <h1 class="banner-title">标签</h1>
      </div>
      <!--中间内容-->
      <div  class="m-container-small m-tags">
        <div class="ui container">
          <!--header-->
          <div class="ui top attached segment my-shadow">
            <div class="ui middle aligned two column grid">
              <div class="column">
                <h3 class="ui my-blue header">标签</h3>
              </div>
              <div class="right aligned column">
                共 <h2 class="ui orange header m-inline-block m-text-thin"> {{tagList.length}} </h2> 个
              </div>
            </div>
          </div>

          <div class="ui attached segment m-padded-tb-large my-shadow">
            <template v-for="item in tagList">
              <div class="ui labeled button m-margin-tb-tiny" @click="saveNavState(item)" v-if="activeId===item.tagId" :key="item.tagId">
                <a class="ui blue basic button">{{item.tagName}}</a>
                <div class="ui basic blue left pointing label">{{item.tagCount}}</div>
              </div>
              <div class="ui labeled button m-margin-tb-tiny" @click="saveNavState(item)" v-else :key="item.tagId">
                <a class="ui basic button">{{item.tagName}}</a>
                <div class="ui basic left pointing label">{{item.tagCount}}</div>
              </div>
            </template>
          </div>

          <!--content-->
          <div class="ui attached  segment my-blog-shadow">

            <div class="ui padded vertical segment m-padded-tb-large" v-for="item in dataList" :key="item.blogId">
              <div class="ui middle aligned mobile reversed stackable grid">
                <div class="eleven wide column" style="cursor:pointer;">
                  <h3 class="ui header" @click="toBlog(item.blogId)">{{item.title}}</h3>
                  <p class="m-text" @click="toBlog(item.blogId)">{{item.description}}</p>
                  <div class="ui grid">
                    <div class="eleven wide column">
                      <div class="ui mini horizontal link list">
                        <div class="item">
                          <img v-bind:src=item.avatar class="ui avatar image">
                          <div class="content"><a class="header">{{item.nickname}}</a></div>
                        </div>
                        <div class="item">
                          <i class="calendar icon"></i> {{item.createTime}}
                        </div>
                        <div class="item">
                          <i class="eye icon"></i> {{item.views}}
                        </div>
                        <div class="item">
                          <i class="thumbs up outline icon"></i> {{item.thumbs}}
                        </div>
                      </div>
                    </div>
                    <div class="right aligned five wide column">
                      <a target="_blank" class="ui my-blue basic label m-padded-tiny m-text-thin">{{item.typeName}}</a>
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
          <div class="ui bottom attached segment my-blog-shadow">
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
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeId: '', // 被激活的标签id
      tagList: [], // 标签列表的数据
      dataList: [],
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 6, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      }
    }
  },
  created () {
    this.getUser()
    this.findPage(this.activeId)
    this.getTagList()
  },
  methods: {
    async getTagList () {
      const { data: res } = await this.$http.get('/server/home/getTagCount')
      this.tagList = res.data
    },
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.$router.push('/blog')
    },
    async saveNavState (item) {
      console.log('----item----' + JSON.stringify(item))
      this.activeId = item.tagId
      if (item.tagCount === 0) {
        this.$message.error('查询失败，当前所在标签的博客数为0')
      } else {
        await this.findPage(this.activeId)
      }
    },
    // 分页查询
    async findPage (tagId) {
      const id = sessionStorage.getItem('tagId')
      if (id !== null) {
        tagId = id
        this.activeId = id
      }
      sessionStorage.removeItem('tagId')
      // 发送ajax，提交分页请求（页码，每页显示条数，查询条件)
      const param = {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: this.pagination.queryString,
        tagId: tagId
      }
      var param2 = this.$encruption(JSON.stringify(param))
      const { data: res } = await this.$http.post('/server/tagShow/getById', param2)
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
      this.$router.push('/login')
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
  .container{
    animation: main 1s;
  }
  .m-tags {
    padding-top: 460px !important;
    padding-bottom: 0px !important;
  }
  .tags-banner {
    height: 480px;
    background: url(https://www.static.talkxj.com/wallhaven-13mk9v.jpg) center
    center / cover no-repeat;
    background-color: #49b1f5;
  }
</style>
