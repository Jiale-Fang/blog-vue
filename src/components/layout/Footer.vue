<template>
  <el-footer app padless absolute>
    <div class="footer-wrap">
      <div>&copy; 2021 - {{ new Date().getFullYear() }} By Tcefrep</div>
      <a href="https://gitee.com/" target="_blank">
        暂无备份
      </a>
    </div>
  </el-footer>
</template>

<script>
</script>

<style scoped>
  .footer-wrap {
    bottom: 0!important;
    width: 100%;
    line-height: 2;
    position: relative;
    padding: 40px 20px;
    color: #eee;
    font-size: 14px;
    text-align: center;
    background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: Gradient 10s ease infinite;
  }
  .footer-wrap a {
    color: #eee !important;
  }
  @keyframes Gradient {
    0% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
</style>
