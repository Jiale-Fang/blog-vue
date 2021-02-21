<template>
  <div class="blogs">
    <div class="content-header">
      <h1>用户管理<small>个人信息</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--中间内容-->
    <div class="app-container">
      <div class="box">
        <el-form :model="formData" :rules="userRules" ref="userForm" label-width="100px">
          <el-form-item prop="avatar" label="头像地址">
            <el-input v-model="formData.avatar"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="username" label="用户名">
                <el-input v-model="formData.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="password" label="密码">
                <el-input v-model="formData.password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item prop="nickname" label="昵称">
                <el-input v-model="formData.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="email" label="邮箱">
                <el-input v-model="formData.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">立即修改</el-button>
<!--            <el-button @click="resetForm('formData')">重置</el-button>-->
          </el-form-item>
        </el-form>
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
      formData: {
        uid: '',
        username: '',
        password: '',
        nickname: '',
        email: '',
        avatar: ''
      },
      userRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          // { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请输入头像地址', trigger: 'blur' },
          { min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur' }
        ],
        email: [
          // { required: true, message: '请输入头像地址', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    submitForm () {
      // 进行表单校验
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          // 表单校验通过，发ajax请求，把数据录入至后台处理
          const param = this.$encruption(JSON.stringify(this.formData))
          this.$http.put('/server/user/updateUser', param).then((res) => {
            // 关闭新增窗口
            if (res.data.flag) {
              // 弹出提示信息
              this.$message({
                message: '修改成功！',
                type: 'success'
              })
            } else { // 执行失败
              this.$message.error(res.data.message)
            }
          })
        } else { // 校验不通过
          this.$message.error('校验失败，请检查输入格式')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.formData.uid = JSON.parse(this.user).uid
        this.formData.nickname = JSON.parse(this.user).nickname
        this.formData.avatar = JSON.parse(this.user).avatar
        this.formData.username = JSON.parse(this.user).username
        this.formData.email = JSON.parse(this.user).email
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../assets/css/me.css";
  @import "../../../assets/css/style.css";
</style>
