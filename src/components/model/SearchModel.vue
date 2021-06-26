<template>
  <div >
    <el-dialog
      title="搜索"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <!-- 输入框 -->
      <div class="search-input-wrapper">
        <i class="el-icon-search"></i>
        <input style="width: 80%;border: none;outline: medium" v-model="input" placeholder="输入文章标题或内容... 等上方进度条加载完结果就出来了" />
<!--        <el-input v-model="input" placeholder="请输入内容"></el-input>-->
      </div>
      <div class="search-result-wrapper">
        <hr class="divider" />
        <div v-show="total!==-1">
          查询到{{total}}条与<span style="font-weight: bold">{{input}}</span>相关的结果
        </div>
        <br>
        <br>
        <div v-for="item in blogList" :key="item.blog_id">
      <el-card class="box-card my-shadow">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold;cursor:pointer;" v-html="item.title" @click="toBlog(item.blogId)"></span>
        </div>
        <div class="text item" v-html="item.content" style="cursor:pointer;" @click="toBlog(item.blogId)">
        </div>
      </el-card>
          <br>
        </div>
        <!-- 搜索结果不存在提示 -->
        <el-card class="box-card my-shadow"  v-show="total === 0">
          <div
            style="font-size:0.875rem"
          >
            找不到您查询的内容：" <span style="font-weight: bold">{{input}}</span> "
          </div>
        </el-card>
      <span slot="footer" class="dialog-footer">
  </span>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data: function () {
    return {
      centerDialogVisible: false,
      input: '',
      blogList: [],
      total: -1,
      path: ''
    }
  },
  methods: {
    setDialogVisible () {
      this.centerDialogVisible = true
    },
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.centerDialogVisible = false
      if (this.path === '/blog') {
        window.location.reload()
      }
      this.$router.push('/blog')
    }
  },
  mounted () {
    this.path = this.$route.path
    // console.log(this.$route.path)
  },
  watch: {
    $route (to, from) {
      this.path = to.path
    },
    input (value) {
      const param = {
        currentPage: 1,
        pageSize: 100,
        queryString: value
      }
      this.$http.post('/api/server/search/searchPage1', param).then((res) => {
      // this.$http.post('/extension/search/searchPage1', param).then((res) => {
        // 关闭新增窗口
        if (res.data.flag) {
          this.blogList = res.data.data.records
          this.total = res.data.data.total
        } else { // 执行失败
          this.$message.error(res.data.code)
        }
      })
    }
  }
}
</script>

<style scoped>
  .box-card{
    width: 80%;
    margin-left: 9%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .search-input-wrapper {
    display: flex;
    padding: 5px;
    height: 35px;
    width: 100%;
    border: 2px solid #8e8cd8;
    border-radius: 2rem;
  }
  @media (min-width: 960px) {
    .search-result-wrapper {
      padding-right: 5px;
      height: 450px;
      overflow: auto;
    }
  }
  @media (max-width: 959px) {
    .search-result-wrapper {
      height: calc(100vh - 110px);
      overflow: auto;
    }
  }
  .divider {
    margin: 20px 0;
    border: 2px dashed #d2ebfd;
  }
  .search-reslut-content {
    color: #555;
    cursor: pointer;
    border-bottom: 1px dashed #ccc;
    padding: 5px 0;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
