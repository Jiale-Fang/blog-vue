<template>
  <div class="tags">
    <div class="tags-banner banner">
      <h1 class="banner-title">MachineLearning</h1>
      <h2 class="banner-title" style="margin-top: 40px">初体验</h2>
    </div>
    <!-- 弹幕列表 -->
    <div class="barrage-container">
      <vue-baberrage :barrageList="barrageList" :loop="true">
        <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                :src="slotProps.item.avatar"
                width="30"
                height="30"
                style="border-radius:100%"
              />
              <span class="ml-2">{{ slotProps.item.title }} :</span>
              <span class="ml-2">{{ slotProps.item.messageContent }}</span>
            </span>
        </template>
      </vue-baberrage>
    </div>
    <div class="m-poem">
      <el-card class="blog-container">
        <!-- 说明 -->
        <div class="link-title mt-4 mb-4" style="text-align: center">
          古诗生成
        </div>
        <br>
        <blockquote class="mb-10 my-blog-shadow">
          <div>基于RNN和LSTM写的古诗生成demo，训练集古诗约有四万首。</div>
          <div>由于个人原因，只迭代了两次，</div>
          <div>所以结果可能不太精准并且某些生僻字可能无法生成古诗，敬请谅解</div>
        </blockquote>
        <br>
        <br>
        <br>
        <div><el-input suffix-icon="el-icon-edit" style="width: 270px" v-model="str1" placeholder="藏头诗和剩余古诗要输入内容" ></el-input>
          <button class="ui primary button my-button" @click="randomPoem"><i class="star icon"></i>生成随机古诗</button>
          <button class="ui secondary button my-button" @click="acrosticPoem"><i class="paragraph icon"></i>生成藏头诗</button>
          <button class="ui google plus button my-button" @click="randomPoem2"><i class="pencil alternate icon"></i>生成剩余古诗</button></div>
        <br>
        <br>
      </el-card>
    </div>
    <br>
    <br>
  </div>
</template>

<script>
import Vue from 'vue'
import { vueBaberrage } from 'vue-baberrage'
Vue.use(vueBaberrage)
export default {
  data () {
    return {
      dataList: [],
      user: {},
      nickname: '',
      avatar: '',
      str1: '',
      barrageList: []
    }
  },
  created () {
    this.getUser()
    // this.listMessage()
  },
  methods: {
    async randomPoem () {
      const { data: res } = await this.$AI.get('/poem/randomPoem')
      if (res.flag) {
        // this.$message.success(res.message)
        const message = {
          avatar: this.avatar,
          title: '生成随机古诗',
          messageContent: res.data,
          time: Math.floor(Math.random() * 10) + 5
        }
        this.barrageList.push(message)
      } else {
        this.$message.error(res.message)
      }
    },
    async acrosticPoem () {
      if (JSON.stringify(this.str1) === '{}' || this.str1 !== '') {
        const { data: res } = await this.$AI.get('/poem/acrosticPoem/?words=' + this.str1)
        if (res.flag) {
          const message = {
            avatar: this.avatar,
            title: '藏头诗',
            messageContent: res.data,
            time: Math.floor(Math.random() * 10) + 5
          }
          this.barrageList.push(message)
        } else {
          this.$message.error(res.message)
        }
      }
    },
    async randomPoem2 () {
      if (JSON.stringify(this.str1) === '{}' || this.str1 !== '') {
        const { data: res } = await this.$AI.get('/poem/randomPoem2/?words=' + this.str1)
        if (res.flag) {
          const message = {
            avatar: this.avatar,
            title: '生成剩余古诗',
            messageContent: res.data,
            time: Math.floor(Math.random() * 10) + 5
          }
          this.barrageList.push(message)
        } else {
          this.$message.error(res.message)
        }
      }
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    },
    async addToList () {
    },
    async listMessage () {
      const { data: res } = await this.$http.get('/extension/message/getMessageList')
      if (res.flag) {
        // this.$message.success(res.message)
        this.barrageList = res.data
      } else {
        this.$message.error(res.message)
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .my-button{
    margin-left: 10px!important;
    position: relative;
    z-index: 100;
  }
  .tags-banner {
    height:  67vh;
    background: url(http://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mce80KgERvhV49OLgLEc6tIVzgewffrS4J*Towawiswq8W32hHiP2mi3eEOka5wZKbmxS4NAOB7C8HDnHM7AmmwY!/r) center
    center / cover no-repeat;
    background-color: #49b1f5;
  }
  blockquote {
    line-height: 2;
    margin: 0;
    font-size: 15px;
    border-left: 0.2rem solid #1685a9;
    padding: 10px 1rem !important;
    background-color: #ecf7fe;
    border-radius: 4px;
  }
  .blog-container {
    background: #fff;
    color: #4c4948;
    border-radius: 8px;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    transition: all 0.3s;
  }
  .blog-container:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  .m-poem {
    padding-top: 11vh !important;
    padding-bottom: 0px !important;
  }
  .m-text {
    top: 40vh !important;
    /*padding-bottom: 0px !important;*/
  }
  .link-title {
    color: #344c67;
    font-size: 21px;
    font-weight: bold;
    line-height: 2;
  }
  @media (max-width: 759px) {
    .link-avatar {
      margin-left: 30px;
    }
  }
  .link-wrapper:hover a {
    color: #fff;
  }
  .link-wrapper:hover .link-intro {
    color: #fff;
  }
  .link-wrapper:hover .link-avatar {
    transform: rotate(360deg);
  }
  .link-wrapper a {
    color: #333;
    text-decoration: none;
    display: flex;
    height: 100%;
    width: 100%;
  }
  .message-input-wrapper input {
    outline: none;
    width: 70%;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    color: #eee;
    border: #fff 1px solid;
  }
  .message-input-wrapper input::-webkit-input-placeholder {
    color: #eeee;
  }
  .message-input-wrapper button {
    outline: none;
    border-radius: 20px;
    height: 100%;
    padding: 0 1.25rem;
    border: #fff 1px solid;
  }
  .barrage-container {
    position: absolute;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% -50px);
    width: 100%;
  }
  .barrage-items {
    background: rgb(0, 0, 0, 0.7);
    border-radius: 100px;
    color: #fff;
    padding: 5px 10px 5px 5px;
    align-items: center;
    display: flex;
  }
</style>
