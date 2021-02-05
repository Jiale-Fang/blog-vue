<template>
<!--    <div class="footerClass">-->
      <!--底部footer-->
      <div class="ui inverted vertical m-padded-tb-footer">
        <div class="el-myFooter">
          <el-footer style="bottom: 5px;height: 10px">Copyright &copy; 2020-{{ new Date().getFullYear() }}, Designed by Fjl</el-footer>
        </div>
<!--        <div class="footer" app padless absolute style="background:rgba(0,0,0,0)">-->
<!--          <el-col class="text-center footer" cols="12">-->
<!--            <div>Copyright &copy; 2020-{{ new Date().getFullYear() }}</div>-->
<!--            <a href="http://www.beian.miit.gov.cn" target="_blank">-->
<!--              渝ICP备2020012273号</a-->
<!--            >-->
<!--          </el-col>-->
<!--        </div>-->
<!--        <div class="ui center aligned container">-->
<!--          <div class="ui inverted divided stackable grid">-->
<!--            <div class="three wide column">-->
<!--              <div class="ui inverted link list">-->
<!--                <div class="item">-->
<!--                  <img src="../../assets/images/wechat.jpg" class="ui rounded image" alt="" style="width: 110px">-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="three wide column">-->
<!--              <h4 class="ui inverted header m-text-thin m-text-spaced " >最新博客</h4>-->
<!--              <div class="ui inverted link list">-->
<!--                <a href="#" class="item m-text-thin">用户故事（User Story）</a>-->
<!--                <a href="#" class="item m-text-thin">用户故事（User Story）</a>-->
<!--                <a href="#" class="item m-text-thin">用户故事（User Story）</a>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="three wide column">-->
<!--              <h4 class="ui inverted header m-text-thin m-text-spaced ">联系我</h4>-->
<!--              <div class="ui inverted link list">-->
<!--                <a href="#" class="item m-text-thin">Email：1626680964@qq.com</a>-->
<!--                <a href="#" class="item m-text-thin">QQ：1626680964</a>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="seven wide column">-->
<!--              <h4 class="ui inverted header m-text-thin m-text-spaced ">Blog</h4>-->
<!--              <p class="m-text-thin m-text-spaced m-opacity-mini">这是我的个人博客、会分享关于编程、写作、思考相关的任何内容，希望可以给来到这儿的人有所帮助...</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="ui inverted section divider"></div>-->
<!--          <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2020 - 2021 Fjl Designed by Fjl</p>-->
<!--        </div>-->

      </div>
<!--    </div>-->
</template>

<script>
</script>

<style scoped>
  .el-myFooter {
    color: #606266;
    text-align: center;
    line-height: 6px !important;
    margin-bottom: 2px !important;
    bottom: 1px!important;
  }
  .m-padded-tb-footer {
    padding-top: 1em !important;
    padding-bottom: 1em !important;
    bottom: 2px !important;
  }
  .footer {
    font-size: 0.75rem;
  }
  .footer div {
    line-height: 1.75;
  }
</style>
