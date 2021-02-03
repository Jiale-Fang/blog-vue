<template>
  <div class="types">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">管理后台</h2>
          <a href="/#/blogs" class=" m-item item m-mobile-hide"><i class="mini edit icon"></i>博客管理</a>
          <a href="/#/types2" class="m-item item m-mobile-hide"><i class="mini idea icon"></i>分类管理</a>
          <a href="/#/tags2" class="active m-item item m-mobile-hide"><i class="mini tags icon"></i>标签管理</a>
          <a href="/#/home" class="m-item item m-mobile-hide"><i class="mini home icon"></i>首页</a>
          <div class="right m-item m-mobile-hide menu">
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
    <div class="ui attached pointing menu">
      <div class="ui container">
        <div class="right menu">
          <a href="#"  @click="handleCreate" class="item">新增</a>
          <a href="#" class="teal active item">列表</a>
        </div>
      </div>
    </div>

    <!--中间内容-->
    <div  class="m-container-small m-padded-tb-big">
      <div class="ui container">
        <el-table size="middle" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <!--                        id,用户名，真实姓名，角色，备注，最后登录时间，创建时间-->
          <el-table-column prop="tagId" min-width="15px" align="center" label="序号"></el-table-column>
          <el-table-column prop="tagName" label="标签名称" align="center"></el-table-column>
          <el-table-column label="管理" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
              <!--              <el-button size="mini" type="info" @click="handleForbidden(scope.row)">禁用</el-button>-->
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
        <!-- 新增标签弹层 手机号 真实姓名（*） 密码 备注 角色-->
        <div class="add-form">
          <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
            <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
                     label-width="100px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="标签编号" prop="typeId">
                    <el-input v-model="formData.tagId"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="标签名" prop="typeName">
                    <el-input v-model="formData.tagName"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
          </el-dialog>
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
                <img src="../../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">
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
              <a href="#" class="item m-text-thin">Email：lirenmi@163.com</a>
              <a href="#" class="item m-text-thin">QQ：865729312</a>
            </div>
          </div>
          <div class="seven wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>
            <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>
          </div>
        </div>
        <div class="ui inverted section divider"></div>
        <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2016 - 2017 Lirenmi Designed by Lirenmi</p>
      </div>

    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: { // 分页相关模型数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页显示的记录数
        total: 0, // 总记录数
        queryString: null // 查询条件
      },
      formData: {}, // 表单数据
      dialogFormVisible: false, // 增加表单是否可见
      dialogFormVisible4Edit: false, // 编辑表单是否可见
      dataList: [], // 当前页要展示的分页列表数据
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      rules: { // 校验规则
        // 分类名称
        typeName: [
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
      var param2 = this.$encruption(JSON.stringify(param))
      const { data: res } = await this.$http.post('server/tag/findPage', param2)
      // 解析controller响应回的数据
      console.log('===>' + res.flag)
      if (!res.flag) {
        return this.$message.error('获取标签列表失败！')
      }
      this.pagination.total = res.data.total
      this.dataList = res.data.records
    },
    // 添加按钮
    handleAdd () {
      this.$message.error('对不起，普通用户没有该权限')
      // 进行表单校验
      // this.$refs.dataAddForm.validate((valid) => {
      //   if (valid) {
      //     // 表单校验通过，发ajax请求，把数据录入至后台处理
      //     // const param = this.$encruption(JSON.stringify(this.formData))
      //     this.$http.post('/types2/add', this.formData).then((res) => {
      //       // 关闭新增窗口
      //       this.dialogFormVisible = false
      //       if (res.data.flag) {
      //         // 新增成功后，重新调用分页查询方法，查询出最新的数据
      //         this.findPage()
      //         // 弹出提示信息
      //         this.$message({
      //           message: '添加成功',
      //           type: 'success'
      //         })
      //       } else { // 执行失败
      //         this.$message.error(res.data.code)
      //       }
      //     })
      //   } else { // 校验不通过
      //     this.$message.error('校验失败，请检查输入格式')
      //     return false
      //   }
      // })
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      this.nickname = JSON.parse(this.user).nickname
      this.avatar = JSON.parse(this.user).avatar
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
  @import "../../assets/css/style.css";
</style>
