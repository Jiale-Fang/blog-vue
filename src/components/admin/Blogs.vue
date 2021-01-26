<template>
  <div class="blogs">
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
                Fjl
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
          <a href="#" class="item">发布</a>
          <a href="#" class="teal active item">列表</a>
        </div>
      </div>
    </div>

    <!--中间内容-->
    <div  class="m-container-small m-padded-tb-big">
      <div class="ui container">
        <form action="#" method="post" class="ui segment form">
          <div class="inline fields">
            <div class="field">
              <input type="text" name="title" placeholder="标题">
            </div>
            <div class="field">
              <div class="ui selection dropdown">
                <input type="hidden" name="type">
                <i class="dropdown icon"></i>
                <div class="default text">分类</div>
                <div class="menu">
                  <div class="item" data-value="1">错误日志</div>
                  <div class="item" data-value="2">开发者手册</div>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="ui checkbox">
                <input type="checkbox" id="recommend" name="recommend">
                <label for="recommend">推荐</label>
              </div>
            </div>
            <div class="field">
              <button class="ui mini teal basic button"><i class="search icon"></i>搜索</button>
            </div>
          </div>
        </form>

        <table class="ui celled table">
          <thead>
          <tr>
            <th></th>
            <th>标题</th>
            <th>类型</th>
            <th>推荐</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>刻意练习清单</td>
            <td>认知升级</td>
            <td>是</td>
            <td>2017-10-02 09:45</td>
            <td>
              <a href="#" class="ui mini teal basic button">编辑</a>
              <a href="#" class="ui mini red basic button">删除</a>
            </td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th colspan="6">
              <div class="ui mini pagination menu">
                <a class=" item">上一页</a>
                <a class=" item">下一页</a>
              </div>
              <a href="#" class="ui mini right floated teal basic button">新增</a>
            </th>
          </tr>
          </tfoot>
        </table>
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
export default {
  mounted () {
    $('.menu.toggle').click(function () {
      $('.m-item').toggleClass('m-mobile-hide')
    })

    $('.ui.dropdown').dropdown({
      on: 'hover'
    })
  }
}
</script>

<style scoped>

</style>
