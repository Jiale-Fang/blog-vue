<template>
  <div class="blogs">
    <div class="content-header">
      <h1>博客管理<small>发布博客</small></h1>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布博客</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <div class="app-container">
        <div class="blog-box" style="">
        <el-form ref="addForm" :model="formData" :rules="rules" >
          <div class="required field">
            <div class="ui left labeled input">
              <el-form-item prop="shareStatement">
                <el-select v-model="formData.shareStatement" placeholder="原创" style="margin-right: 10px; width: 100px;margin-left: 155px">
                  <el-option
                    v-for="item in shareStatementList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="title">
                <el-button type="primary">
                  <i class="el-icon-arrow-down el-icon-s-opportunity"></i>
                </el-button>
                <el-input v-model="formData.title" placeholder="请输入标题" style="width: 790px"></el-input>
              </el-form-item>
            </div>
          </div>
            <div class="mavonEditor" style="margin-top: 10px;">
              <el-form-item prop="content">
                <mavon-editor :codeStyle="markdownOption.codeStyle"
                              style="max-height: 500px"
                              :scrollStyle="true"
                              :ishljs="true"
                              @imgAdd="handleEditorImgAdd"
                              @imgDel="handleEditorImgDel"
                              :toolbars="markdownOption"
                              v-model="formData.content"/>
              </el-form-item>
          </div>
          <div class="two fields" style="margin-top: 3px">
            <el-form-item prop="typeId">
              <el-row>
                <el-select v-model="formData.typeId" placeholder="请选择分类" style="margin-left: 155px;float:left; width: 470px; margin-right: 8px">
                  <el-option
                    v-for="item in typeList"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                  </el-option>
                </el-select>
                <el-select v-model="formData.value" multiple placeholder="请选择标签" style="width: 470px">
                  <el-option
                    v-for="item in tagList"
                    :key="item.tagId"
                    :label="item.tagName"
                    :value="item.tagId">
                  </el-option>
                </el-select>
              </el-row>
            </el-form-item>
          </div>

          <div class="field" style="margin-top: 8px;margin-left: 155px">
            <el-button type="primary">
            <el-upload
              class="avatar-uploader"
              action="serverApi/oss/userAvatar/"
              accept="image/png,.jpg"
              multiple
              :limit="1"
              :on-exceed="masterFileMax"
              :show-file-list="false"
              :http-request="uploadPic"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-arrow-down el-icon-picture"></i>
            </el-upload>
<!--              <i class="el-icon-arrow-down el-icon-picture"></i>-->
            </el-button>
            <el-input v-model="formData.firstPicture" style="width: 895px"></el-input>
            <el-form-item prop="description" style="margin-top: 8px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5}"
                placeholder="请写一下关于文章的摘要，这将让你的博客显示在首页时，帮助你吸引更多的读者"
                v-model="formData.description" style="margin-top: 10px;width: 950px">
              </el-input>
            </el-form-item>
          </div>
          <div class="inline fields" style="margin-top: 10px;margin-left: 155px">
            <el-checkbox v-model="formData.recommend">推荐</el-checkbox>
            <el-checkbox v-model="formData.appreciation">赞赏</el-checkbox>
            <el-checkbox v-model="formData.commentabled">评论</el-checkbox>
          </div>
          <div class="ui right aligned container">
            <button type="button" class="ui button" onclick="window.history.go(-1)" >返回</button>
            <button type="button" id="save-btn" class="ui secondary button">保存</button>
            <button type="button" id="publish-btn" class="ui my-blue button" @click="addBlog">发布</button>
          </div>
        </el-form>
        </div>
      </div>
    <br>
    <br>
  </div>
</template>

<script>
// import editormd from '../../../src/assets/lib/editormd/editormd.min.js'
export default {
  data () {
    return {
      imageUrl: '',
      imgFile: [],
      user: {},
      nickname: '',
      // 被激活的链接地址
      avatar: '',
      rules: { // 校验规则
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入正文内容', trigger: 'blur' },
          { min: 10, message: '长度最少是 10 个字符', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '至少要有一个分类', trigger: 'blur' }
        ],
        shareStatement: [
          { required: true, message: '至少选择一个文章信息', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '麻烦写一个简单的摘要', trigger: 'blur' },
          { min: 10, max: 110, message: '长度在 10 到 110 个字符之间', trigger: 'blur' }
        ]
      },
      formData: {
        shareStatement: '', // 版权状态
        typeId: '', // 分类id
        title: '', // 博客标题
        content: '#### 使用 markdown 编辑器来开始书写你的博客吧!&emsp;已经支持markdown编辑器上传图片的功能', // 正文文本
        firstPicture: '点按钮添加博客首图（建议尺寸是800乘450），否则显示会不正常；或者自行添加图片链接，图片参考地址(https://picsum.photos/images),修改右边链接末尾id即可(https://unsplash.it/800/450?image=1005)', // 博客首图链接地址
        recommend: true, // 是否推荐
        appreciation: false, // 是否开启赞赏
        commentabled: true, // 是否开启评论
        value: [], // 标签列表,
        flag: '', // 发布状态 (草稿还是发布)
        description: ''
      }, // 表单数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      typeList: [],
      tagList: [],
      shareStatementList: [
        {
          id: 1,
          name: '原创'
        },
        {
          id: 2,
          name: '转载'
        },
        {
          id: 3,
          name: '翻译'
        }
      ],
      contentEditor: '',
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        codeStyle: 'monokai-sublime'
      }
    }
  },
  created () {
    this.getTypeList()
    this.getUser()
    this.getTagList()
  },
  methods: {
    masterFileMax (files, fileList) {
      console.log(files, fileList)
      this.$message.warning('请最多上传一张图片')
    },
    async uploadPic (param) {
      var fileObj = param.file
      var form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      const { data: res } = await this.$http.post('/serverApi/oss/userAvatar', form)
      if (res.flag) {
        // 弹出提示信息
        this.$message.success('上传头像成功')
        this.formData.avatar = res.data.url
        console.log(res.data.url)
      } else { // 执行失败
        this.$message.error(res.message)
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
    handleEditorImgAdd (pos, $file) {
      const formData = new FormData()
      formData.append('file', $file)
      this.imgFile[pos] = $file
      this.$http.post('/serverApi/oss/articleImage', formData).then(res => {
        if (res.data.flag) {
          this.$message.success('上传成功')
          const url = res.data.data.url
          let name = $file.name
          if (name.includes('-')) {
            name = name.replace(/-/g, '')
          }
          const content = this.formData.content
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)  这里是必须要有的
          if (content.includes(name)) {
            const oStr = `(${pos})`
            const nStr = `(${url})`
            const index = content.indexOf(oStr)
            const str = content.replace(oStr, '')
            const insertStr = (soure, start, newStr) => {
              return soure.slice(0, start) + newStr + soure.slice(start)
            }
            this.formData.content = insertStr(str, index, nStr)
          }
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    handleEditorImgDel (pos) {
      delete this.imgFile[pos]
      this.$message.error('暂时无法删除图片！')
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      this.nickname = JSON.parse(this.user).nickname
      this.avatar = JSON.parse(this.user).avatar
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
      // 刷新页面，删除vuex数据
      window.location.reload()
    },
    addBlog () {
      // 进行表单校验
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          // 表单校验通过，发ajax请求，把数据录入至后台处理
          // const param = this.$encrypTion(JSON.stringify(this.formData))
          this.formData.flag = '发布'
          // var param = this.$encrypTion(this.formData)
          this.$http.post('/api/server/blog/add', this.formData).then((res) => {
            // 关闭新增窗口
            this.dialogFormVisible = false
            if (res.data.flag) {
              // 弹出提示信息
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push('/blogs')
            } else { // 执行失败
              this.$message.error('添加失败')
            }
          })
        } else { // 校验不通过
          this.$message.error('校验失败，请检查输入格式')
          return false
        }
      })
    },
    // 获取所有的分类并回显
    async getTypeList () {
      const { data: res } = await this.$http.get('/api/server/types2/getTypeList')
      this.typeList = res.data
    },
    // 获取所有的标签并回显
    async getTagList () {
      const { data: res } = await this.$http.get('/api/server/tag/getTagList')
      this.tagList = res.data
    }
  },
  mounted () {
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })

    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
    $('.ui.form').form({
      // fields: {
      //   title: {
      //     identifier: 'title',
      //     rules: [{
      //       type: 'empty',
      //       prompt: '标题：请输入博客标题'
      //     }]
      //   }
      // }
    })
  }
}
</script>

<style scoped>
  @import "../../../assets/css/me.css";
.mavonEditor {
  width: 75%;
  height: 100%;
  margin: 0 auto;
}
  .blog-box {
    position: relative;
    border-radius: 3px;
    background: #ffffff;
    border-top: 3px solid #3c8dbc;
    padding: 10px;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .avatar-uploader .el-upload {
    border: 5px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
