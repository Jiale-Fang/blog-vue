<template>
  <!-- 新增标签弹层 手机号 真实姓名（*） 密码 备注 角色-->
  <div class="add-form">
    <el-dialog title="新增友链" :visible.sync="dialogFormVisible">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="友链名称" prop="linkName">
              <el-input v-model="formData.linkName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="头像地址" prop="avatarLink">
            <el-input v-model="formData.avatarLink"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="博客地址" prop="blogLink">
            <el-input v-model="formData.blogLink"/>
          </el-form-item>
        </el-row>
        <el-form-item label="友链描述" prop="description">
          <el-input type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        linkName: '',
        avatarLink: '',
        blogLink: '',
        description: ''
      }, // 表单数据
      dialogFormVisible: false, // 增加表单是否可见
      dataList: [], // 当前页要展示的分页列表数据
      rules: { // 校验规则
        // 分类名称
        linkName: [
          { required: true, message: '请输入友链名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        avatarLink: [
          { required: true, message: '请输入友链头像地址（便于展示）', trigger: 'blur' }
        ],
        blogLink: [
          { required: true, message: '请输入博客地址', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入友链描述信息', trigger: 'blur' },
          { min: 10, max: 250, message: '长度在 10 到 250 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleCreate () {
      this.dialogFormVisible = true
    },
    // 添加按钮
    handleAdd () {
      // 进行表单校验
      this.$refs.dataAddForm.validate((valid) => {
        if (valid) {
          // 表单校验通过，发ajax请求，把数据录入至后台处理
          // const param = this.$encrypTion((this.formData))
          this.$http.post('/extension/link/addLink', this.formData).then((res) => {
          // this.$http.post('/extension/link/addLink', this.formData).then((res) => {
            // 关闭新增窗口
            this.dialogFormVisible = false
            if (res.data.flag) {
              // 新增成功后，重新调用分页查询方法，查询出最新的数据
              // this.findPage()
              // 弹出提示信息
              this.$message({
                message: res.data.message,
                type: 'success'
              })
            } else { // 执行失败
              this.$message.error(res.data.code)
            }
          })
        } else { // 校验不通过
          this.$message.error('校验失败，请检查输入格式')
          return false
        }
      })
    },
    // 重置表单
    resetForm () {
      this.formData = {}// 重置表格数据
      // this.$refs.dataAddForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
