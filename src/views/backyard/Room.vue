<template>
  <div v-if="frameVisible" style="left: 5%;top: 16%; z-index: 1100;position: fixed">
    <div class="my-height"></div>
  <div class="Room  my-shadow" ref="room">
    <div class="room-left">
      <div class="block">
        <el-avatar :src="avatar"></el-avatar>
      </div>
      <br>
      <el-tooltip content="聊天信息" placement="left">
      <div class="menus-item" style="cursor: pointer" @click="changeView(1)">
        <i class="comment icon" style="color: whitesmoke"></i><span style="color: whitesmoke"></span>
      </div>
      </el-tooltip>
      <br>
      <el-tooltip content="添加好友" placement="left">
      <div class="menus-item" style="cursor: pointer" @click="changeView(2)">
          <i class="user plus icon" style="color: whitesmoke"/><span style="color: whitesmoke"></span>
      </div>
      </el-tooltip>
      <br>
      <el-tooltip content="窗口最小化" placement="left">
        <div class="menus-item" style="cursor: pointer" @click="closeFrame">
          <i class="close icon" style="color: whitesmoke"/><span style="color: whitesmoke"></span>
        </div>
      </el-tooltip>
    </div>
    <div class="room-center">
      <div class="center-b">
<!--        聊天界面-->
        <div class="ui cards my-UICards" v-if="viewType==1">
          <div class="card my-cards" @click="setToGroupChat">
            <div class="content" >
              <img class="right floated mini ui image" style="height: 50px!important;width: 50px!important;" v-bind:src="groupFirstPicture">
              <div class="header">
                群聊
              </div>
              <div class="divRight" v-if="groupMessageNum!=0">
                {{groupMessageNum}}
              </div>
              <br>
              <div class="meta">
                包含所有用户
              </div>
              </div>
            </div>
          <div class="card my-cards" v-for="item in friendsList" :key="item.friendId" @click="setToName(item)">
            <div class="content" >
              <img class="right floated mini ui image" style="height: 50px!important;width: 50px!important;" v-bind:src="item.avatar">
              <div class="header" v-text="item.nickname">
              </div>
              <div class="divRight" v-if="item.messageNum!=0">
                {{item.messageNum}}
              </div>
              <br>
              <div class="meta">
                {{item.createTime}}
              </div>
              <div class="description" v-text="item.lastContent">
              </div>
            </div>
          </div>
        </div>
        <!--        好友界面-->
        <div class="ui cards my-UICards" v-if="viewType==2">
          <div class="card my-cards" v-for="item in userList" :key="item.uid" @click="openDialog(item)">
            <div class="content" >
              <img class="right floated mini ui image" style="height: 50px!important;width: 50px!important;" v-bind:src="item.avatar">
              <div class="header" v-text="item.nickname">
              </div>
              <br>
              <div class="meta">
                用户名:{{item.username}}
              </div>
              <div class="description" v-text="item.lastContent">
              </div>
            </div>
          </div>
        </div>
        <ul>
        </ul>
      </div>
    </div>
    <div class="room-right">
      <div class="chatcontent">
        <ul class="join" ref="joinUs">
          <li
            v-for="(item1,index) in messageContent"
            :key="index"
            :class="{'my-message':item1.type===1 || item1.type===7,
            'other-message':item1.type===2 || item1.type===3 || item1.type===8}"
          >
            <div class="content1" v-if="item1.type === 1">
              <span>{{item1.content}}</span>
              <img v-bind:src="avatar" class="my-avatar" />
            </div>
            <div v-if="item1.type ===2 && !isGroup">
              <img v-bind:src="friendAvatar" class="my-avatar" />
              <p class="username">{{friendNickName}}</p>
              <p class="content">{{item1.content}}</p>
            </div>
            <div v-if="item1.type ===3 && isGroup">
              <img v-bind:src="item1.avatar" class="my-avatar" />
              <p class="username">{{item1.nickname}}</p>
              <p class="content">{{item1.content}}</p>
            </div>
            <div v-if="item1.type ===4 && isGroup">
              <p class="centerText">欢迎{{item1.username}}加入群聊</p>
            </div>
            <div v-if="item1.type ===5 && isGroup">
              <p class="centerText">{{item1.username}}离开了群聊</p>
            </div>
            <div v-if="item1.type ===6">
              <p class="centerText">{{item1.formatTime}}</p>
            </div>
            <div class="content1" v-if="item1.type ===7">
            <span>
           <el-image class="chatLog-img" v-bind:src="item1.content" :preview-src-list="changeToArray(item1)" lazy>
              </el-image>
            </span>
              <img v-bind:src="avatar" class="my-avatar" />
            </div>
            <div class="content1" v-if="item1.type ===8">
              <template v-if="!isGroup">
                <img v-bind:src="friendAvatar" class="my-avatar" />
                <p class="username">{{friendNickName}}</p>
              </template>
                 <template v-if="isGroup">
                   <img v-bind:src="item1.avatar" class="my-avatar" />
                   <p class="username">{{item1.nickname}}</p>
                 </template>
              <p class="content"><el-image class="chatLog-img" v-bind:src="item1.content" :preview-src-list="changeToArray(item1)" lazy>
              </el-image></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="sendMessage">
        <div style="margin: 5px;cursor: pointer">
          <emoji-picker  @emoji="insert" :search="search">
            <div slot="emoji-invoker" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
              😊
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert }">
              <div>
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div>
            <span
              v-for="(emoji, emojiName) in emojiGroup"
              :key="emojiName"
              @click="insert(emoji)"
              :title="emojiName"
            >{{ emoji }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
          <el-upload
            class="avatar-uploader"
            action="serverApi/oss/userAvatar/"
            accept="image/png,.jpg"
            multiple
            :on-exceed="masterFileMax"
            :show-file-list="false"
            :http-request="uploadPic"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-picture"></i>
          </el-upload>
        </div>
        <textarea cols="80" rows="5" ref="textarea" v-model="messageToSend"></textarea>
        <button class="sendMessage" @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { useWebSocket } from '../../hooks'
import EmojiPicker from 'vue-emoji-picker'
// import VueEmoji from 'emoji-vue'
export default {
  name: 'Room',
  components: {
    EmojiPicker
  },
  mounted () {

  },
  data () {
    return {
      imageUrl: '',
      url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2655800803,3523216634&fm=26&gp=0.jpg',
      srcList: [
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2655800803,3523216634&fm=26&gp=0.jpg'
      ],
      newss: '',
      input: '',
      search: '',
      frameVisible: false,
      ws: null,
      avatar: '', // 头像
      friendAvatar: '',
      friendNickName: '',
      uid: '',
      friendId: '',
      joinRoom: [],
      messageContent: [],
      messageToSend: '',
      toName: '',
      friendsList: [],
      userList: [], // 本站所有用户列表,
      viewType: 1,
      username: '',
      isGroup: false, // 此消息是否是群聊
      isImg: false, // 此消息是否是发送图片
      groupMessageNum: 0,
      groupFirstPicture: 'https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcQaBtLM2yTpYe999VZqnRjqLW3e23.UCR78O5Km8SpsknNgOGpEzdY7QHY1usDO6pbksfeQBV5CqlMGgsjJVV9s!/r'
    }
  },
  methods: {
    changeToArray: function (item) {
      const picList = [
        item.content
      ]
      return picList
    },
    isType7: function (item) {
      if (item.type === 7) {
        this.srcList[0] = item.content
        return true
      } else {
        return false
      }
    },
    isType8: function (item) {
      if (item.type === 8) {
        this.srcList[0] = item.content
        return true
      } else {
        return false
      }
    },
    masterFileMax (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('请最多上传一张图片。')
    },
    async uploadPic (param) {
      var fileObj = param.file
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      const { data: res } = await this.$http.post('/serverApi/oss/chatLogImg', form)
      if (res.flag) {
      // 弹出提示信息
        this.$message.success('发送图片成功')
        this.sendImg(res.data.url)
      } else { // 执行失败
        this.$message.error(res.message)
      }
    },
    sendImg (url) { // 发送图片
      let toName = ''
      let mesType = 4
      if (this.isGroup) {
        toName = 'group'
        mesType = 5
      } else {
        toName = this.toName
      }
      const message = { toName: toName, message: url, mesType: mesType }
      // 将消息展示在聊天区
      this.messageContent.push({
        type: 7,
        content: url
      })
      this.toBottom()
      console.log(JSON.stringify(message))
      this.ws.send(JSON.stringify(message))
      console.log('sendImg')
      if (this.isGroup) { // 发到群聊的那个表
        const param = {
          uid: this.uid,
          roomId: 1,
          content: url,
          textType: 2
        }
        this.$http.post('/api/server/groupChat/addMessage', param).then((res) => {
          // 关闭新增窗口
          if (!res.data.flag) {
            this.$message.error(res.data.code)
          }
        })
      } else { // 发送到私聊
        const param = {
          sender: this.uid,
          receiver: this.friendId,
          content: url,
          textType: 2
        }
        this.$http.post('/api/server/chatLog/addMessage', param).then((res) => {
          // 关闭新增窗口
          if (!res.data.flag) {
            this.$message.error(res.data.code)
          }
        })
      }
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过5MB!')
      }
      return isJPG && isLt5M
    },
    toBottom () {
      setTimeout(() => {
        const father = document.querySelector('.chatcontent')
        const son = document.querySelector('.join')
        const fatherHeight = father.offsetHeight
        const sonHeight = son.offsetHeight
        const move = sonHeight - fatherHeight
        father.scroll({
          top: move
        })
      }, 10)
    },
    insert (emoji) {
      this.messageToSend += emoji
    },
    onInput (event) {
      // 事件。数据包含文本区域的值
      // 将输入的话和表情赋给newss
      this.newss = event.data
    },
    test () {
      console.log(this.newss)
    },
    closeFrame () {
      this.frameVisible = false
    },
    openFrame () {
      this.frameVisible = true
    },
    toGroupChat () {
      console.log(this.messageToSend)
      // $('#context_text').val('')
      if (this.messageToSend !== '') {
        const message = {
          toName: 'group',
          mesType: 2,
          message: this.messageToSend
        }
        // 将消息展示在聊天区
        this.messageContent.push({
          type: 1,
          content: this.messageToSend
        })
        this.toBottom()
        this.ws.send(JSON.stringify(message))
      }
    },
    changeView (num) {
      this.viewType = num
    },
    async getUserList () {
      const { data: res } = await this.$http.get('/api/server/user/getUserList')
      if (res.flag) {
        this.userList = res.data
      } else { // 执行失败
        this.$message.error(res.message)
      }
    },
    async initChat () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.avatar = JSON.parse(this.user).avatar
        this.uid = JSON.parse(this.user).uid
        const { data: res } = await this.$http.get('/api/server/friends/getFriendsList')
        if (res.flag) {
          this.friendsList = res.data
        } else { // 执行失败
          this.$message.error(res.message)
        }
      }
    },
    sendMessage () {
      if (this.isGroup) {
        this.sendToGroup()
      } else {
        this.sendToPerson()
      }
    },
    sendToPerson () {
      if (this.messageToSend !== '') {
        const message = { toName: this.toName, message: this.messageToSend, mesType: 2 }
        // 将消息展示在聊天区
        this.messageContent.push({
          type: 1,
          content: this.messageToSend
        })
        this.toBottom()
        this.ws.send(JSON.stringify(message))
        const param = {
          sender: this.uid,
          receiver: this.friendId,
          content: this.messageToSend
        }
        this.messageToSend = ''
        this.$http.post('/api/server/chatLog/addMessage', param).then((res) => {
          // 关闭新增窗口
          if (!res.data.flag) {
            this.$message.error(res.data.code)
          }
        })
      }
    },
    sendToGroup () {
      if (this.messageToSend !== '') {
        const message = { toName: 'group', message: this.messageToSend, mesType: 2 }
        // 将消息展示在聊天区
        this.messageContent.push({
          type: 1,
          content: this.messageToSend
        })
        this.toBottom()
        this.ws.send(JSON.stringify(message))
        const param = {
          uid: this.uid,
          roomId: 1,
          content: this.messageToSend
        }
        this.messageToSend = ''
        this.$http.post('/api/server/groupChat/addMessage', param).then((res) => {
          // 关闭新增窗口
          if (!res.data.flag) {
            this.$message.error(res.data.code)
          }
        })
      }
    },
    setToName (item) {
      this.toName = item.username
      this.isGroup = false
      const index = (this.friendsList).findIndex((friendsList) => friendsList.username === this.toName)
      //  index 返回的就是当前查找元素在数组中的索引,然后就可以修改小红点的值
      this.$set(this.friendsList[index], 'messageNum', 0)
      this.friendNickName = item.nickname
      this.friendAvatar = item.avatar
      this.friendId = item.friendId
      const param = {
        sender: this.uid,
        receiver: this.friendId
      }
      this.$http.post('/api/server/chatLog/getMessage', param).then((res) => {
        if (res.data.flag) {
          this.messageContent = res.data.data
          this.toBottom()
        } else {
          this.$message.error(res.data.code)
        }
      })
    },
    setToGroupChat () {
      this.isGroup = true
      this.groupMessageNum = 0
      this.$http.get('/api/server/groupChat/getMessage').then((res) => {
        if (res.data.flag) {
          this.messageContent = res.data.data
          this.toBottom()
        } else {
          this.$message.error(res.data.code)
        }
      })
    },
    setMessageNum (fromName) {
      const index = (this.friendsList).findIndex((friendsList) => friendsList.username === fromName)
      //  index 返回的就是当前查找元素在数组中的索引,然后就可以修改小红点的值
      console.log(this.friendsList)
      const messageNum = this.friendsList[index].messageNum
      this.$set(this.friendsList[index], 'messageNum', messageNum + 1)
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.username = JSON.parse(this.user).username // 初始化自己的用户名
      }
    },
    openDialog (item) {
      this.$confirm('您确定要添加用户名为' + item.username + '的用户吗？该功能处于测试阶段，点击确认后无需对方确认请求即可添加成功', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          uid: this.uid,
          friendId: item.uid
        }
        this.$http.post('/api/server/friends/addFriend', param).then((res) => {
          // 关闭新增窗口
          if (!res.data.flag) {
            this.$message.error(res.data.code)
          }
        })
        this.initChat()
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消添加'
        })
      })
    }
  },
  created () {
    this.initChat()
    this.getUser()
    this.getUserList()
    const ws = useWebSocket(handleMessage)
    this.ws = ws
    const _this = this
    function handleMessage (e) {
      const dataStr = e.data
      const res = JSON.parse(dataStr)
      console.log('消息')
      console.log(res)
      if (res.mesType === 1) { // 系统广播消息
        _this.toBottom()
        if (res.message.username !== _this.username) { // 自己发的就没必要展示了
          if (res.fromName === 'online') { // 这是用户上线了的消息，data里面是用户名
            _this.messageContent.push({
              type: 4,
              username: res.message
            })
            // _this.toBottom()
          } else if (res.fromName === 'offline') {
            _this.messageContent.push({
              type: 5,
              username: res.message
            })
            // _this.toBottom()
          } else {
            if (!_this.isGroup) {
              _this.groupMessageNum++
            }
            _this.messageContent.push({
              type: 3,
              nickname: res.message.nickname,
              content: res.message.content,
              avatar: res.message.avatar
            })
            // _this.toBottom()
          }
        }
      } else if (res.mesType === 2) { // 是文本消息
        _this.toBottom()
        if (res.fromName === _this.toName) { // 如果是当前对话的人发来的消息就直接push即可
          _this.messageContent.push({
            type: 2,
            nickname: res.fromName,
            content: res.message
          })
        } else { // 如果不是当前对话的人发来的消息就可以在头像上提醒
          _this.setMessageNum(res.fromName)
        }
      } else if (res.mesType === 4) { // 私聊的图片消息
        _this.toBottom()
        if (res.fromName === _this.toName) {
          _this.messageContent.push({
            type: 8,
            nickname: res.fromName,
            content: res.message
          })
        } else {
          _this.setMessageNum(res.fromName) // 消息提醒
        }
      } else if (res.mesType === 5 && res.message.username !== _this.username) { // 群聊的图片消息
        _this.toBottom()
        if (!_this.isGroup) {
          _this.groupMessageNum++
        } else {
          _this.messageContent.push({
            type: 8,
            nickname: res.message.nickname,
            content: res.message.content,
            avatar: res.message.avatar
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .chatLog-img{
    width: 100px;
    height: 100px;
  }
  .divRight {
    position: absolute;
    color: white;
    font-size: 17px;
    background-color: red;
    width: 23px;
    height: 23px;
    line-height: 23px;
    left: 85%;
    top: 0;
    text-align: center;
    -webkit-border-radius: 24px;
    border-radius: 24px;
  }
  .my-UICards{
    margin-top: 0;
    height: 490px;
    overflow-x:hidden;/*x轴禁止滚动*/
    overflow-y:scroll;/*y轴滚动*/
    color:antiquewhite;
    /*border: 0!important;*/
    /*margin:0 ;*/
    /*padding:0!important;*/
  }
  .my-UICards::-webkit-scrollbar{
  display:none;/*隐藏滚动条*/
}
  .my-cards{
    height: 100px !important;
    border: 0!important;
    /*top: 14px;*/
    margin-top:0 !important;
    margin-bottom:0 !important;
    cursor:pointer !important;
    /*margin:auto;*/
    padding:0!important;
  }
  .my-height{
    height: 15%;
  }
  .my-room{
    width: 100%;
    height: 100%;
    background: url("https://r.photo.store.qq.com/psc?/V53KcXfb1umonn4HbITu3rINxs43TczD/45NBuzDIW489QBoVep5mcSPhM*LqG*bYzP4o2JVbahfGs9C4tYHLuDQWMxk*lbr.Z*THL2ipTPeIxiXd5nibRdObXk9lzHBgBPewtV0qL*g!/r") center center /
    cover no-repeat;
  }
.Room {
  width: 1000px;
  height: 500px;
  margin-left: 18%;
  /*margin: 50px auto;*/
  display: flex;
  .room-left {
    background-color: #474574;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    .icon-liaotianqingqiu,
    .icon-yonghu {
      font-size: 24px;
      padding-top: 10px;
      cursor: pointer;
    }
    .active {
      color: #ecf0f1;
    }
    img {
      width: 40px;
    }
  }
  .room-center {
    width: 200px;
    background-color: #e6e5e5;
    color: #000;
    display: flex;
    flex-direction: column;
    .center-h {
      padding: 9.6px 10px;
      height: 20px;
      border-bottom: 1px solid #e5e5e58c;
      box-shadow: 1px 1px 1px #b2c0c9;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .center-b {
      flex: 1;
      .user-item-name {
        padding: 5px 10px;
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e5e5e58c;
        box-shadow: 1px 1px 1px #2980b9;
        font-size: 17px;
      }
      .user-item {
        padding: 5px 10px;
        height: 40px;
        display: flex;
        align-items: center;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
  }
  .room-right {
    flex: 1;
    background-color: #f6f6f6;
    display: flex;
    flex-direction: column;
    .name {
      display: flex;
      justify-content: center;
      line-height: 40px;
      font-size: 16px;
      border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    }
    .chatcontent {
      height: 400px;
      overflow-y:scroll;/*y轴滚动*/
      .join {
        text-align: center;
        color: #ccc;
        /*overflow: auto;*/

        /*height: 300px;*/
        li {
          padding: 10px;
        }
      }
      .my-message {
        display: flex;
        justify-content: flex-end;
        div {
          display: flex;
          position: relative;
          &::after {
            content: '';
            right: 38px;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            border-left: 6px solid #9eea6a;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid transparent;
          }
          .file {
            max-width: 330px;
            max-height: 170px;
            margin-right: 10px;
            cursor: pointer;
          }
          .my-avatar {
            width: 40px;
            height: 40px;
          }
          span {
            box-sizing: border-box;
            display: inline-block;
            border-radius: 5px;
            line-height: 32px;
            background-color: #9eea6a;
            color: #000;
            padding: 5px;
            margin-right: 10px;
            min-width: 40px;
          }
        }
      }
      .other-message {
        position: relative;
        display: flex;
        justify-content: flex-start;
        div {
          display: flex;
          position: relative;

          &::before {
            content: '';
            left: 40px;
            top: 55%;
            transform: translateY(-50%);
            position: absolute;
            border-left: 5px solid transparent;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 5px solid #ccc;
          }
          .file {
            max-width: 330px;
            max-height: 170px;
            margin-top: 14px;
            margin-left: 10px;
            cursor: pointer;
          }
          .my-avatar {
            width: 40px;
            height: 40px;
          }
          .username {
            position: absolute;
            left: 45px;
            top: -5px;
            font-size: 13px;
            color: #b2b2b2;
          }
          .centerText {
            position: absolute;
            left: 35%;
            top: -5px;
            font-size: 13px;
            color: #b2b2b2;
          }
          .content {
            margin-top: 12px;
            box-sizing: border-box;
            display: inline-block;
            border-radius: 5px;
            line-height: 32px;
            background-color: #fff;
            color: #000;
            padding: 5px;
            margin-left: 10px;
            border: 1px solid #ccc;
            min-width: 40px;
          }
        }
      }
    }
    .sendMessage {
      position: relative;
      flex: 1;
      background-color: #fff;
      padding-left: 10px;
      .icon {
        height: 25px;
        padding-top: 6px;
        /*display: flex;*/
        //.icon-smile
        /*.icon-wenjianjia,*/
        /*.icon-jietu {*/
        /*  font-size: 20px;*/
        /*  padding: 0 6px;*/
        /*  cursor: pointer;*/
        /*}*/
        /*.icon-jietu {*/
        /*  font-size: 23px !important;*/
        /*}*/
        /*.emoji {*/
        /*  !*position: absolute;*!*/
        /*  !*display: flex;*!*/
        /*  !*flex-wrap: wrap;*!*/
        /*  !*width: 276px;*!*/
        /*  !*height: 218px;*!*/
        /*  !*overflow: auto;*!*/
        /*  !*bottom: 159px;*!*/
        /*  !*background-color: #fff;*!*/
        /*  !*border: 1px solid #cccccc;*!*/
        /*  !*outline: none;*!*/
        /*  span {*/
        /*    padding: 7px;*/
        /*    cursor: pointer;*/
        /*  }*/
        /*}*/
      }
      textarea {
        border: none;
        resize: none;
        outline: none;
        font-size: 15px;
        padding-left: 9px;
      }
      .sendMessage {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 4px 10px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
      }
    }
  }
  .join {
    color: #333;
    font-size: 13px;
  }
  .send {
    background-color: #2ecc71;
    color: #000;
  }
  .receive {
    background-color: #fff;
    color: #000;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

</style>
