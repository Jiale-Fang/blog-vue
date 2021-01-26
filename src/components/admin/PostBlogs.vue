<template>
  <div class="psot-blogs">
    <!--导航-->
    <nav class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">管理后台</h2>
          <a href="#" class="active m-item item m-mobile-hide"><i class="mini home icon"></i>博客</a>
          <a href="#" class=" m-item item m-mobile-hide"><i class="mini idea icon"></i>分类</a>
          <a href="#" class="m-item item m-mobile-hide"><i class="mini tags icon"></i>标签</a>
          <div class="right m-item m-mobile-hide menu">
            <div class="ui dropdown  item">
              <div class="text">
                <img class="ui avatar image" src="https://unsplash.it/100/100?image=1005">
                fjl
              </div>
              <i class="dropdown icon"></i>
              <div class="menu">
                <a href="#" class="item">注销</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#" class="ui menu toggle black icon button m-right-top m-mobile-show">
        <i class="sidebar icon"></i>
      </a>
    </nav>
    <div class="ui attached pointing menu">
      <div class="ui container">
        <div class="right menu">
          <a href="#" class="teal active item">发布</a>
          <a href="#" class="item">列表</a>
        </div>
      </div>
    </div>

    <!--中间内容-->
    <div  class="m-container-small m-padded-tb-big">
      <div class="ui container">
        <form action="#" method="post" class="ui form">

          <div class="required field">
            <div class="ui left labeled input">
              <div class="ui selection compact teal basic dropdown label">
                <input type="hidden" value="原创" >
                <i class="dropdown icon"></i>
                <div class="text">原创</div>
                <div class="menu">
                  <div class="item" data-value="原创">原创</div>
                  <div class="item" data-value="转载">转载</div>
                  <div class="item" data-value="翻译">翻译</div>
                </div>
              </div>
              <input type="text" name="title" placeholder="标题">
            </div>
          </div>
          <div class="field">
            <div id="md-content">
<!--              <textarea placeholder="博客内容" name="content" style="display: none">-->
<!--                #### Disabled options-->

<!-- - TeX (Based on KaTeX);-->
<!-- - Emoji;-->
<!-- - Task lists;-->
<!-- - HTML tags decode;-->
<!-- - Flowchart and Sequence Diagram;-->
<!--              </textarea>-->
            </div>
            <div class="mavonEditor">
<!--              <no-ssr>-->
                <mavon-editor :toolbars="markdownOption" v-model="handbook"/>
<!--              </no-ssr>-->
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <div class="ui left labeled action input">
                <label class="ui compact teal basic label">分类</label>
                <div class="ui fluid selection dropdown">
                  <input type="hidden" name="type">
                  <i class="dropdown icon"></i>
                  <div class="default text">分类</div>
                  <div class="menu">
                    <div class="item" data-value="1">错误日志</div>
                    <div class="item" data-value="2">开发者手册</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="ui left labeled action input">
                <label class="ui compact teal basic label">标签</label>
                <div class="ui fluid selection multiple search  dropdown">
                  <input type="hidden" name="tag">
                  <i class="dropdown icon"></i>
                  <div class="default text">标签</div>
                  <div class="menu">
                    <div class="item" data-value="1">java</div>
                    <div class="item" data-value="2">JavaScript</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="ui left labeled input">
              <label class="ui teal basic label">首图</label>
              <input type="text" name="indexPicture" placeholder="首图引用地址">
            </div>

          </div>

          <div class="inline fields">
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" id="recommend" name="recommend" checked class="hidden">
                <label for="recommend">推荐</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" id="shareInfo" name="shareInfo" class="hidden">
                <label for="shareInfo">转载声明</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" id="appreciation" name="appreciation" class="hidden">
                <label for="appreciation">赞赏</label>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" id="comment" name="comment" class="hidden">
                <label for="comment">评论</label>
              </div>
            </div>
          </div>

          <div class="ui error message"></div>

          <div class="ui right aligned container">
            <button type="button" class="ui button" onclick="window.history.go(-1)" >返回</button>
            <button class="ui secondary button">保存</button>
            <button class="ui teal button">发布</button>
          </div>

        </form>
      </div>
    </div>

    <br>
    <br>
    <!--底部footer-->
    <footer class="ui inverted vertical segment m-padded-tb-massive">
      <div class="ui center aligned container">
        <div class="ui inverted divided stackable grid">
          <div class="three wide column">
            <div class="ui inverted link list">
              <div class="item">
                <img src="../../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">
              </div>
            </div>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced " >最新博客</h4>
            <div class="ui inverted link list">
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
              <a href="#" class="item m-text-thin">用户故事（User Story）</a>
            </div>
          </div>
          <div class="three wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">联系我</h4>
            <div class="ui inverted link list">
              <a href="#" class="item m-text-thin">Email：1626680964@qq.com</a>
              <a href="#" class="item m-text-thin">QQ：1626680964</a>
            </div>
          </div>
          <div class="seven wide column">
            <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>
            <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>
          </div>
        </div>
        <div class="ui inverted section divider"></div>
        <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2020 - 2021 Fjl Designed by Fjl</p>
      </div>

    </footer>
  </div>
</template>

<script>
// import editormd from '../../../src/assets/lib/editormd/editormd.min.js'
export default {
  data () {
    return {
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
        preview: true // 预览
      },
      handbook: '#### how to use mavonEditor in nuxt.js'
    }
  },
  mounted () {
    // 初始化Markdown编辑器
    // $(function () {
    //   this.contentEditor = editormd('md-content', {
    //     width: '100%',
    //     height: 640,
    //     syncScrolling: 'single',
    //     path: '../../static/lib/editormd/lib/'
    //   })
    // })
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })

    $('.ui.dropdown').dropdown({
      on: 'hover'
    })

    $('.ui.form').form({
      fields: {
        title: {
          identifier: 'title',
          rules: [{
            type: 'empty',
            prompt: '标题：请输入博客标题'
          }]
        }
      }
    })
  }
}

// $(function () {
//   editormd('md-content', {
//     width: '100%',
//     height: 640,
//     // syncScrolling: 'single',
//     path: '../../src/assets/lib/editormd/lib/'
//   })
// })
</script>

<style scoped>
/*@import "/src/assets/lib/editormd/css/editormd.min.css";*/
/*@import "src/assets/css/typo.css";*/
/*@import "src/assets/css/animate.css";*/
  @import "/src/assets/css/me.css";
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
