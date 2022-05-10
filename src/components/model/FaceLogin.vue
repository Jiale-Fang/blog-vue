<template>
  <div>
 <el-dialog :fullscreen="isMobile"
            title="人脸识别登录"
            :visible.sync="faceLoginFormVisible"
            :modal="false" width="27%" height="40%">
      <el-upload
        class="upload-cover"
        drag
        action="serverApi/file/face/local"
        multiple
        :before-upload="beforeUpload"
        :on-success="faceOnSuccess"
      >
        <i class="el-icon-upload" v-if="faceImgUrl === ''" />
        <div class="el-upload__text" v-if="faceImgUrl === ''">
          将图片拖到此处，或<em>点击上传</em>
        </div>
        <img
          v-else
          :src="faceImgUrl"
          width="360px"
          height="180px"
        />
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过3MB</div>
      </el-upload>
   <el-button style="margin-right: 10px" @click="faceLogin" type="primary">登录</el-button>
   <el-button style="margin-right: 10px" @click="faceCamera" type="success">拍照上传</el-button>
  </el-dialog>
  </div>
</template>

<script>
import * as imageConversion from "image-conversion";
import { generaMenu } from '../../assets/js/menu'
export default {
  data: function () {
    return {
      faceImgUrl: '', // 图片url
    };
  },
  methods: {
    faceCamera () {
      this.$store.state.faceLoginFormVisible = false
      this.$store.state.facePhotoFlag = true
    },
    async faceLogin () {
      if (this.faceImgUrl.length === 0) {
        this.$message.error("请先上传图片！")
        return false
      }
      const param = {
        faceImgUrl: this.faceImgUrl
      }
      const param2 = this.$encrypTion(JSON.stringify(param))
      const { data: res } = await this.$http.post('/api/server/user/oauth/face', param2)
      if (res.flag) {
        this.$message.success(res.message)
        this.$store.state.faceLoginFormVisible = false
        // 保存登录状态
        window.sessionStorage.setItem('token', res.data.token)
        this.$store.state.token = res.data.token
        this.$store.commit("login", res.data.user);
        await generaMenu()
        await this.$router.push({ path: "/welcome" });
        if (res.data.nickname === res.data.uid) {
          this.$message.info("请尽快修改个人信息（用户名，昵称等），以便更好的体验网站");
        } else {
          this.$message.success(res.message);
        }
      } else {
        this.$message.error(res.message)
      }
    },
    faceOnSuccess (response) {
      this.faceImgUrl = response.data.url;
    },
    beforeUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt3M = file.size / 1024 / 1024 < 3
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return false
      }
      if (!isLt3M) {
        this.$message.error('上传图片大小不能超过3MB!')
        return false
      }
      return new Promise(resolve => {
        if (file.size / 1024 < this.config.UPLOAD_SIZE) {
          resolve(file);
        }
        // 压缩到600KB
        imageConversion
          .compressAccurately(file, this.config.UPLOAD_SIZE)
          .then(res => {
            resolve(res);
          });
      });
    }
  },
  computed: {
    faceLoginFormVisible: {
      set (value) {
        this.$store.state.faceLoginFormVisible = value;
      },
      get () {
        return this.$store.state.faceLoginFormVisible;
      }
    },
    isMobile () {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    }
  }
};
</script>
