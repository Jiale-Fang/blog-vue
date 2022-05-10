<template>
  <div>
    <el-dialog
      title="整合资料"
      :visible.sync="payFlag"
      width="50%"
      :modal="false"
      center>
      <div class="search-result-wrapper">
        <hr class="divider" />
        <blockquote class="my-blog-shadow">
          <div>博客的代码是开源的，位置在网站首页。</div>
          <div>但是如果您能请博主喝瓶雪碧，就能获得博主整理的资料，内容包括：</div>
          <div class="pay-title mt-4 mb-4">
            前后端代码、数据库文件
          </div>
          <div class="pay-title mt-4 mb-4">
            Nginx配置文件、文本训练集
          </div>
          <div class="pay-title mt-4 mb-4">
            本地部署视频、以及远程部署相关教程
          </div>
          <br>
          <el-button type="primary" v-if="this.$store.state.uid" @click="weChatPay">2.88元</el-button>
          <el-button type="primary" v-if="!this.$store.state.uid" @click="toLogin">登录后显示</el-button>
        </blockquote>
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
    }
  },
  methods: {
    setDialogVisible () {
      this.payFlag = true
    },
    weChatPay () {
      this.$http.get(`/api/server/pay/weChatPay/${this.$store.state.uid}`)
        .then((res) => {
          if (res.status === 200) {
            const temp = res.data
            window.location.href = temp.substring(32, 105)
          }
        })
      //   // // 关闭新增窗口
      //   // if (res.data.flag) {
      //   //   this.$message.error(res.data.message)
      //   // } else { // 执行失败
      //   //   this.$message.error(res.data.code)
      //   // }
      // })
    },
    toLogin () {
      this.$router.push('/login')
      this.payFlag = false
    }
  },
  computed: {
    payFlag: {
      set (value) {
        this.$store.state.payFlag = value;
      },
      get () {
        return this.$store.state.payFlag;
      }
    },
  },
}
</script>

<style scoped>
  blockquote {
    line-height: 2;
    margin: 0;
    font-size: 15px;
    border-left: 0.2rem solid #1685a9;
    padding: 10px 1rem !important;
    background-color: #ecf7fe;
    border-radius: 4px;
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
  .pay-title {
    color: #344c67;
    font-size: 17px;
    font-weight: bold;
    line-height: 2;
  }
</style>
