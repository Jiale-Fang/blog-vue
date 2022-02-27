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
    <div >
      <el-card class="blog-container2">
        <!-- 说明 -->
        <div class="link-title mt-4 mb-4" style="text-align: center">
          文本分类
        </div>
        <br>
        <blockquote class="mb-10 my-blog-shadow">
          <div>基于TexctCNN写的文本分类demo，用Word2Vec构建词向量。</div>
          <div>训练集是csdn爬取的750篇blog，训练了40个Epoch，Accuracy约有96.7%</div>
          <div>暂且只能分类出DB（数据库），Java，Python三个分类</div>
          <div>由于训练文本较少，如若结果不准确可能需要去爬虫模块查看对应的博客并输入关键词，敬请谅解！</div>
        </blockquote>
        <br>
        <br>
        <br>
        <div><el-input suffix-icon="el-icon-edit" style="width: 700px" v-model="str2" placeholder="请输入待分类的文本" ></el-input>
          <button class="ui primary button my-button" @click="textClassify"><i class="star icon"></i>搜索</button>
      </div>
        <br>
        <br>
      </el-card>
    </div>
    <br>
    <br>
    <el-dialog
      title="文本分类的结果"
      :visible.sync="centerDialogVisible"
      width="80%"
      height="90%"
      center>
      <div class="search-result-wrapper">
        <hr class="divider" />
        <br>
        <br>
        <template>
          <el-col style="width: 33%;" v-for="(item, index) in dataList2" :key="index">
          <div class="ui card my-shadow">
            <div class="image">
              <img v-if="item.type==='java'" class="ui rounded image" style="height: 197px" src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcfxg*eg*DXzoyOPhCpNztcXuaOnSxohME.pPlGk0X6DySw85OaptMioCCglUIbkXCgALZYs9vHvPRXBaQfUpMsw!/r">
              <img v-if="item.type==='python'" class="ui rounded image" style="height: 197px" src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcVU0waANwiuihq.W2nBzwOwXqxYRz4ImLPsNhUcM*0mhWWYh*q*8*4kXYbfAoXAqKvTD01Y*vpl7XfJncQ4cC.8!/r">
              <img v-if="item.type==='db'" class="ui rounded image" style="height: 197px" src="https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcfxg*eg*DXzoyOPhCpNztcWZGLjzPgACkFdY6wZX94X6RimTfpFdSg9Nq5YCW8SN6Z2rmInF8bxIhdL6tHQ8TTQ!/r">
            </div>
            <div class="content">
              <a class="header">{{item.type}}</a>
              <div class="meta">
                <span class="date">预测的权重是：</span>
              </div>
              <div class="description">{{item.result}}</div>
            </div>
          </div>
        </el-col>
        </template>
        <span slot="footer" class="dialog-footer">
  </span>
      </div>
    </el-dialog>
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
      dataList2: [],
      user: {},
      nickname: '',
      avatar: 'https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mccJUo7*q6gaMPZmbFDSW8tjmAm4XwuoUZmMKw3asmvn1mxsE*Tf0fj.VOh2G6OX7v4duFOfedV2oGNQ*GrJEPkA!/r',
      str1: '',
      str2: '',
      barrageList: [],
      centerDialogVisible: false,
      picUrl: {
        a: '',
        b: '',
        c: ''
      }
    }
  },
  created () {
    this.getUser()
    // this.listMessage()
  },
  methods: {
    async randomPoem () {
      const { data: res } = await this.$http.get('/ai/poem/randomPoem')
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
    async textClassify () {
      const param = {
        description: this.str2
      }
      this.str2 = ''
      const { data: res } = await this.$http.post('/dl/cnn/textClassify', param)
      if (res.flag) {
        this.$message.success(res.message)
        this.dataList2 = res.data
        this.centerDialogVisible = true
      } else {
        this.$message.error(res.message)
      }
    },
    async acrosticPoem () {
      if (JSON.stringify(this.str1) === '{}' || this.str1 !== '') {
        const { data: res } = await this.$http.get('/ai/poem/acrosticPoem/?words=' + this.str1)
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
        const { data: res } = await this.$http.get('/ai/poem/randomPoem2/?words=' + this.str1)
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
      const { data: res } = await this.$http.get('/server/message/getMessageList')
      // const { data: res } = await this.$http.get('/extension/message/getMessageList')
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
    background: url(https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mce80KgERvhV49OLgLEc6tIVzgewffrS4J*Towawiswq8W32hHiP2mi3eEOka5wZKbmxS4NAOB7C8HDnHM7AmmwY!/r) center
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
  .blog-container2 {

    background: #fff;
    color: #4c4948;
    border-radius: 8px;
    box-shadow: 0 4px 8px 6px rgba(7, 17, 27, 0.06);
    transition: all 0.3s;
  }
  .blog-container2:hover {
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
  .box-card{
    width: 80%;
    margin-left: 9%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .search-input-wrapper {
    display: flex;
    padding: 5px;
    height: 35px;
    width: 100%;
    border: 2px solid #8e8cd8;
    border-radius: 2rem;
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
  .search-reslut-content {
    color: #555;
    cursor: pointer;
    border-bottom: 1px dashed #ccc;
    padding: 5px 0;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
