<template>
  <div class="camera_outer">
    <el-dialog :fullscreen="isMobile"
               title="人脸识别注册"
               :visible.sync="faceRegisterFlag"
               :modal="false" width="400px" height="380px">
    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
    <div v-if="imgSrc" class="img_bg_camera">
      <p>效果预览</p>
      <img :src="imgSrc" alt class="tx_img" />
    </div>
    <div class="button" style="margin-top: 10px">
      <el-button type="success" @click="getCompetence()">打开摄像头</el-button>
      <el-button type="danger" @click="stopNavigator()">关闭</el-button>
      <el-button @click="setImage()">拍照</el-button>
      <el-button type="primary" @click="faceRegister()">注册</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoWidth: 250,
      videoHeight: 350,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false
    };
  },
  mounted () {
    if (this.$store.state.faceRegisterFlag) {
      this.getCompetence() // 进入页面就调用摄像头
    }
  },
  methods: {
    async baiduRegister (faceImgUrl) {
      const param = {
        faceImgUrl: faceImgUrl
      }
      const param2 = this.$encrypTion(JSON.stringify(param))
      const { data: res } = await this.$http.post('/api/server/user/registerByFace', param2)
      if (res.flag) {
        this.$message.success(res.message)
        this.stopNavigator()
        this.$store.state.faceRegisterFlag = false
      } else {
        this.$message.error(res.message)
      }
    },
    async faceRegister () {
      if (this.imgSrc.length === 0) {
        this.$message.error("请先拍照上传！")
        return false
      }
      const file = this.dataURLtoFile(this.imgSrc, '.jpg')
      const formData = new FormData();
      formData.append("file", file)
      const { data: res } = await this.$http.post("/serverApi/file/face/camera", formData)
      if (res.flag) {
        await this.baiduRegister(res.data.url)
      } else {
        this.$message.error(res.message)
      }
    },
    // 调用权限（打开摄像头功能）
    getCompetence () {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
          if (!getUserMedia) { // 不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage () {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      const image = this.thisCancas.toDataURL('image/png')
      _this.imgSrc = image;// 赋值并预览图片
    },
    // 关闭摄像头
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
    // base64转文件，此处没用到
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  },
  computed: {
    faceRegisterFlag: {
      set (value) {
        this.$store.state.faceRegisterFlag = value;
      },
      get () {
        return this.$store.state.faceRegisterFlag;
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
  destroyed () {
    this.stopNavigator()
  }
};
</script>
<style scoped>
  .dialog-title-container {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .dialog-title-container i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
</style>
