<template>
  <div class="blogs">
    <div class="content-header">
      <h1>博客管理<small>收藏夹</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>收藏夹</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--中间内容-->
    <div class="app-container">
    <div class="box">
<!--    <div  class="m-container-small m-padded-tb-big">-->
      <div class="filter-container">
        <el-input placeholder="请输入标题" v-model="pagination.queryString" style="width: 200px;"
                  class="filter-item" clearable @clear="findPage"></el-input>
        <el-button @click="findPage()" icon="el-icon-search" class="dalfBut">查询博客</el-button>
      </div>
      <div class="ui container">
        <el-table size="middle" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <!--                        id,用户名，真实姓名，角色，备注，最后登录时间，创建时间-->
          <el-table-column type="index" min-width="15px" align="center" label="序号"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="description" label="简介" align="center"></el-table-column>
          <el-table-column prop="typeName" label="类型" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column label="管理" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="toBlog(scope.row.blogId)">查看博客</el-button>
              <el-button size="mini" type="danger" @click="handleCancelFavorites(scope.row)">取消收藏</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: {},
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      formData: {}, // 表单数据
      dataList: [], // 当前页要展示的分页列表数据
      user: {},
      nickname: '',
      uid: '',
      // 被激活的链接地址
      avatar: '',
      rules: { // 校验规则
        // 真实姓名
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.findPage()
    this.getUser()
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
      const { data: res } = await this.$http.post('/api/server/blog/admin/findFavoritesPage', param)
      if (!res.flag) {
        return this.$message.error('获取分类列表失败！')
      }
      this.pagination.total = parseInt(res.data.total)
      this.dataList = res.data.records
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      this.nickname = JSON.parse(this.user).nickname
      this.avatar = JSON.parse(this.user).avatar
      this.uid = JSON.parse(this.user).uid
      console.log(this.user)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // 刷新页面，删除vuex数据
      window.location.reload()
    },
    // 切换页码
    handleCurrentChange (currentPage) {
      // 设置最新的页码
      this.pagination.currentPage = currentPage
      // 重新调用findPage方法进行分页查询
      this.findPage()
    },
    handleSizeChange (newSize) {
      this.pagination.pageSize = newSize
      this.findPage()
    },
    // 重置表单
    resetForm () {
      this.formData = {}// 重置表格数据
      this.$refs.dataAddForm.resetFields()
    },
    // 弹出添加窗口
    handleCreate () {
      this.dialogFormVisible = true
      this.resetForm()
    },
    cancelFavorites (blogId) {
      const { data: res } = this.$http.get(`/api/server/blog/favorite/${blogId}/${this.uid}`)
      if (res.flag) {
        this.$message.success(res.message)
      }
    },
    toBlog (blogId) {
      sessionStorage.setItem('blogId', blogId)
      this.$router.push('/blog')
    },
    handleCancelFavorites (row) {
      this.$confirm('请问是否要取消收藏该文章？', '取消收藏？', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否'
      })
        .then(() => {
          this.cancelFavorites(row.blogId)
        })
        .catch(action => {
          this.$message({
            type: 'success',
            message: '取消成功'
          })
          this.findPage()
        })
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

<style lang="less" scoped>
  @import "../../../assets/css/style.css";
  @import "../../../assets/css/me.css";
  .blogs {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
