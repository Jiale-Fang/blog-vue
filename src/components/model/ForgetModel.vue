<template>
  <div>
 <el-dialog :fullscreen="isMobile"
            title="忘记密码"
            :visible.sync="forgetFlag"
            :modal="false" width="30%">
    <el-card class="login-container" style="border-radius:4px">
      <el-icon class="float-right" @click="forgetFlag = false">
        mdi-close
      </el-icon>
      <div class="login-wrapper">
        <el-form ref="forgetForm" :model="formData" :rules="forgetFormRules" label-position="right"
                 label-width="100px">
          <el-form-item label="用户名" prop="username">
            <!-- 用户名 -->
            <el-input
              v-model="formData.username"
              label="用户名"
              placeholder="请输入您的用户名"
              clearable
              @keyup.enter="forget"
            />
          </el-form-item>
       <el-form-item label="邮箱" prop="email">
         <!-- 用户名 -->
        <el-input
          v-model="formData.email"
          label="邮箱号"
          placeholder="请输入您的邮箱号"
          clearable
          @keyup.enter="forget"
        />
       </el-form-item>
          <el-form-item prop="code" label="验证码">
            <!-- 验证码 -->
            <div class="mt-7 send-wrapper">
              <el-input
                maxlength="6"
                v-model="formData.code"
                label="验证码"
                placeholder="请输入6位验证码"
                @keyup.enter="register"
              />
              <el-button text small :disabled="flag" @click="sendCode">
                {{ codeMsg }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password">
        <!-- 密码 -->
        <el-input
          v-model="formData.password"
          show-password
          class="mt-7"
          label="新密码"
          placeholder="请输入您的新密码"
          @keyup.enter="forget"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button
          type="primary"
          block
          color="green"
          style="color:#fff;margin-left: 35%"
          @click="forget"
        >
          确定
        </el-button>
      </div>
    </el-card>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      flag: false,
      codeMsg: "发送",
      time: 60,
      show: false,
      formData: {
        username: '',
        password: '',
        email: '',
        code: ''
      },
      forgetFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        // 验证码
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请填写电子邮箱', trigger: 'change' }]
      }
    };
  },
  methods: {
    openLogin () {
      this.$store.state.forgetFlag = false;
      this.$store.state.loginFlag = true;
    },
    sendCode () {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.formData.email)) {
        this.$message.error("邮箱格式不正确");
        return false;
      }
      const that = this;
      // eslint-disable-next-line no-undef
      var captcha = new TencentCaptcha(this.config.TENCENT_CAPTCHA, function (
        res
      ) {
        if (res.ret === 0) {
          // 发送邮件
          that.countDown();
          that.$http
            .get("/api/server/user/code", {
              params: { email: that.formData.email }
            })
            .then(({ data }) => {
              if (data.flag) {
                that.$message.success(data.message);
              } else {
                that.$message.error(data.message);
              }
            });
        }
      });
      // 显示验证码
      captcha.show();
    },
    countDown () {
      this.flag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + "s";
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = "发送";
          this.time = 60;
          this.flag = false;
        }
      }, 1000);
    },
    forget () {
      // 进行表单校验
      this.$refs.forgetForm.validate((valid) => {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.formData.email)) {
          this.$message.error("邮箱格式不正确");
          return false;
        }
        if (valid) {
          const user = {
            email: this.formData.email,
            password: this.formData.password,
            code: this.formData.code,
            username: this.formData.username
          };
          this.$http.put("/api/server/user/resetPassword", user).then(({ data }) => {
            if (data.flag) {
              this.$message.success(data.message);
              this.forgetFlag = false
            } else {
              this.$message.error(data.message);
            }
          });
        } else { // 校验不通过
          this.$message.error('校验失败，请检查输入格式')
          return false
        }
      })
    }
  },
  computed: {
    forgetFlag: {
      set (value) {
        this.$store.state.forgetFlag = value;
      },
      get () {
        return this.$store.state.forgetFlag;
      }
    },
    isMobile () {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    }
  },
  watch: {
    email (value) {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.flag = !reg.test(value);
    }
  }
};
</script>
