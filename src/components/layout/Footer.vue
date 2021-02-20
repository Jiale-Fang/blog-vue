<template>
      <!--底部footer-->
<!--      <div class="ui inverted vertical m-padded-tb-footer">-->
        <div class="el-myFooter">
          <el-footer>Copyright &copy; 2020-{{ new Date().getFullYear() }}, Designed by Fjl</el-footer>
        </div>
<!--      </div>-->
</template>

<script>
</script>

<style scoped>
  .el-myFooter {
    color: #606266;
    text-align: center;
    line-height: 10px !important;
    height: 10px;
    margin-bottom: 2px !important;
    bottom: -1000px!important;
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
