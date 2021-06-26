<template>
  <!-- 新增标签弹层 手机号 真实姓名（*） 密码 备注 角色-->
  <div class="add-form">
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类编号" prop="typeId">
              <el-input v-model="formData.typeId"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分类名" prop="typeName">
              <el-input v-model="formData.typeName"/>
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
</template>

<script>
export default {
  data () {
    return {
      formData: {}, // 表单数据
      dialogFormVisible: false, // 增加表单是否可见
      dataList: [], // 当前页要展示的分页列表数据
      rules: { // 校验规则
        // 分类名称
        typeName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
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
      this.$message.error('对不起，普通用户没有该权限')
      // 进行表单校验
      // this.$refs.dataAddForm.validate((valid) => {
      //   if (valid) {
      //     // 表单校验通过，发ajax请求，把数据录入至后台处理
      //     // const param = this.$encrypTion(JSON.stringify(this.formData))
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
