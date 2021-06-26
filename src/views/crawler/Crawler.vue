<template>
  <div class="types">    <!-- banner -->
    <div class="types-banner banner">
      <h1 class="banner-title">爬取的博客</h1>
    </div>
    <!--中间内容-->
    <div class="m-container-small m-types">
      <div class="ui container">
        <!--header-->
        <div class="ui top attached segment my-shadow">
          <div class="ui middle aligned two column grid">
            <div class="column">
              <h3 class="ui my-blue header">从CSDN爬取的博客</h3>
            </div>
            <div class="right aligned column">
              共 <h2 class="ui orange header m-inline-block m-text-thin">{{pagination.total}}</h2> 篇
            </div>
          </div>
        </div>

        <!--content-->
        <div class="ui attached segment my-blog-shadow">

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
      <div id="toolbar" class="m-padded m-fixed m-right-bottom" >
        <div class="ui vertical icon buttons ">
          <el-popover
            placement="top-start"
            title="提示"
            width="200"
            trigger="hover"
            content="这是一个基于Deeplearning4j的CNN文本分类，目前只能分出运维，java，Python三类文本，由于训练集过少结果不太精准，该功能尚在测试中，敬请谅解！">
            <el-button slot="reference" type="button" class="ui toc blue button" @click="handleCreate">智能分类</el-button>
          </el-popover>
          <div id="toTop-button" class="ui icon button" ><i class="chevron up icon"></i></div>
        </div>
      </div>
      <AIClassification ref="aiClassification"></AIClassification>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import AIClassification from '../../components/crawler/AIClassification'
export default {
  components: {
    AIClassification
  },
  data () {
    return {
      visible: false,
      flag: false,
      dataList: [], // 当前页要展示的博客分页列表数据
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 6, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      tip: false,
      articleList: [],
      blogInfo: {},
      current: 1
    }
  },
  created () {
    this.getUser()
    this.findPage()
  },
  methods: {
    handleCreate () {
      this.$refs.aiClassification.handleCreate()
    },
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.$router.push('/crawlerBlog')
    },
    // 分页查询
    async findPage () {
      // 发送ajax，提交分页请求（页码，每页显示条数，查询条件)
      const param = {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: null
      }
      // const param2 = this.$encrypTion(JSON.stringify(param))
      const { data: res } = await this.$http.post('/extension/crawler/crawlerPage', param)
      // const { data: res } = await this.$http.post('/extension/crawler/crawlerPage', param2)
      // 解析controller响应回的数据
      if (!res.flag) {
        return this.$message.error('获取爬取的博客列表失败！')
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
  }
}
</script>

<style scoped>
  .container{
    animation: main 1.0s;
  }
  .m-types {
    padding-top: 460px !important;
    padding-bottom: 0 !important;
  }
  .types-banner {
    height: 480px;
    background: url(https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcedMeLHGVj5EQ3pZboWf9ZUT1VbRGevOCgENGxhi4UfCZmagBgzctF7EuOFHUysHbFq2ePjbWIGvH5niXuYkow8!/r) center
    center / cover no-repeat;
    background-color: #49b1f5;
  }
</style>
