<template>
  <div class="home">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">Blog</h2>
          <a href="/#/home" class="active m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
          <a href="/#/types" class="m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
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
                <a href="#" @click="logout" class="item">注销</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="ui menu toggle black icon button m-right-top m-mobile-show">
        <i class="sidebar icon"></i>
      </a>
    </nav>

    <!--中间内容,如果太窄了可放到container    <div  class="m-container m-padded-tb-big">-->
    <div  class="m-padded-tb-big">
      <div class="ui container">
        <div class="ui stackable grid">
          <!--左边博客列表-->
          <div class="eleven wide column">
            <!--header-->
            <div class="ui top attached segment">
              <div class="ui middle aligned two column grid">
                <div class="column">
                  <h3 class="ui teal header">博客</h3>
                </div>
                <div class="right aligned column">
                  共 <h2 class="ui orange header m-inline-block m-text-thin"> 14 </h2> 篇
                </div>
              </div>
            </div>

            <!--content-->
            <div class="ui attached  segment">

              <div class="ui padded vertical segment m-padded-tb-large">
                <div class="ui middle aligned mobile reversed stackable grid" v-for="item in dataList" :key="item.blogId">
                  <div class="eleven wide column">
                    <h3 class="ui header">{{item.title}}</h3>
                    <p class="m-text">{{item.description}}</p>
                    <div class="ui grid">
                      <div class="eleven wide column">
                        <div class="ui mini horizontal link list">
                          <div class="item">
                            <img src="https://picsum.photos/seed/picsum/100/100?image=1005" alt="" class="ui avatar image">
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
                        <a href="#" target="_blank" class="ui teal basic label m-padded-tiny m-text-thin">认知升级</a>
                      </div>
                    </div>
                  </div>
                  <div class="five wide column">
                    <a href="#" target="_blank">
                      <img src="https://picsum.photos/seed/picsum/800/450?image=1005" alt="" class="ui rounded image">
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
                  :page-sizes="[2,5,10,15]"
                  :page-size="pagination.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagination.total">
                </el-pagination>
              </div>
            </div>

          </div>

          <!--右边的top-->
          <div class="five wide column">

            <!--分类-->
            <div class="ui segments">
              <div class="ui secondary segment">
                <div class="ui two column grid">
                  <div class="column">
                    <i class="idea icon"></i>分类
                  </div>
                  <div class="right aligned column">
                    <a href="#" target="_blank">more <i class="angle double right icon"></i></a>
                  </div>
                </div>
              </div>
              <div class="ui teal segment">
                <div class="ui fluid vertical menu">
                  <a href="#" class="item">
                    学习日志
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                  <a href="#" class="item">
                    思考与感悟
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                  <a href="#" class="item">
                    学习日志
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                  <a href="#" class="item">
                    学习日志
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                  <a href="#" class="item">
                    学习日志
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                  <a href="#" class="item">
                    学习日志
                    <div class="ui teal basic left pointing label">13</div>
                  </a>
                </div>
              </div>
            </div>

            <!--标签-->
            <div class="ui segments m-margin-top-large">
              <div class="ui secondary segment">
                <div class="ui two column grid">
                  <div class="column">
                    <i class="tags icon"></i>标签
                  </div>
                  <div class="right aligned column">
                    <a href="#" target="_blank">more <i class="angle double right icon"></i></a>
                  </div>
                </div>
              </div>
              <div class="ui teal segment">
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
                <a href="#" target="_blank" class="ui teal basic left pointing label m-margin-tb-tiny">
                  方法论 <div class="detail">23</div>
                </a>
              </div>
            </div>

            <!--最新推荐-->
            <div class="ui segments m-margin-top-large">
              <div class="ui secondary segment ">
                <i class="bookmark icon"></i>最新推荐
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment" >
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
              <div class="ui segment">
                <a href="#" target="_blank" class="m-black m-text-thin">用户故事（User Story）</a>
              </div>
            </div>

            <!--二维码-->
            <h4 class="ui horizontal divider header m-margin-top-large">扫码关注我</h4>
            <div class="ui centered card" style="width: 11em">
              <img src="../assets/images/wechat.jpg" alt="" class="ui rounded image" >
            </div>
          </div>

        </div>
      </div>

    </div>

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
            <h4 class="ui inverted header m-text-thin m-text-spaced " >最新博客</h4>
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
      dataList: [], // 当前页要展示的分页列表数据
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
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
    this.findPage()
  },
  methods: {
    // 分页查询
    async findPage () {
      // 发送ajax，提交分页请求（页码，每页显示条数，查询条件)
      const param = {
        currentPage: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        queryString: this.pagination.queryString
      }
      // var param2 = this.$encruption(JSON.stringify(param))
      const { data: res } = await this.$http.post('/home/findHomePage', param)
      // 解析controller响应回的数据
      if (!res.flag) {
        return this.$message.error('获取首页列表失败！')
      }
      this.pagination.total = res.data.total
      this.dataList = res.data.records
      console.log('-----------' + JSON.stringify(this.dataList))
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      this.nickname = JSON.parse(this.user).nickname
      this.avatar = JSON.parse(this.user).avatar
      console.log(this.user)
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
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })
    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
  }
}
</script>

<style>
 @import "../assets/css/me.css";
</style>
