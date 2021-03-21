<template>
  <div class="add-form">
    <el-dialog title="文本分类" :visible.sync="dialogFormVisible">
      <el-form ref="dataAddForm" :model="formData" :rules="rules" label-position="right"
               label-width="100px">
        <el-form-item label="文本" prop="description">
          <el-input type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="结果"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>分类权重占比如下：{{this.resultList}}</span>
      <span slot="footer" class="dialog-footer">
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      resultList: {},
      dialogVisible: false,
      formData: {
        description: '请输入待分类的文本'
      }, // 表单数据
      dialogFormVisible: false, // 增加表单是否可见
      dataList: [], // 当前页要展示的分页列表数据
      rules: { // 校验规则
        description: [
          { required: true, message: '请输入待分类的文本', trigger: 'blur' },
          { max: 150, message: '长度在 150 个字符以内', trigger: 'blur' }
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
          this.$http.post('/crawler/cnn/textClassify', this.formData).then((res) => {
            // 关闭新增窗口
            this.dialogFormVisible = false
            if (res.data.flag) {
              // 新增成功后，重新调用分页查询方法，查询出最新的数据
              // this.findPage()
              // 弹出提示信息
              this.resultList = res.data.data
              this.dialogVisible = true
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
