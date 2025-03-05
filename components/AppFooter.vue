<template>
  <footer class="AppFooter">
    <div class="link w">
      <a href="">关于我们</a>
      <a href="">广告合作</a>
      <a href="">申请收录</a>
      <a href="">意见反馈</a>
      <a href="">站长统计</a>
    </div>
    <div class="siteinfoLegal">网址收集于互联网，版权归原作者所有，任何商业用途均须联系作者。如未经授权用作他处，作者将保留追究侵权者法律责任的权利。</div>
    <div class="siteinfoLegal">本站收录的网站若侵害到您的利益，请联系我们删除处理，本站所有内容来源于网络，本站不承担任何连带责任。</div>
    <div class="copyright">导航 - i6i8.cn © All rights Reserved </div>
    <a class="icp" href="#">
      <img src="//static.daohangtx.com/static/img/police.png">
      <span>湘ICP备2021010691号</span>
    </a>
  </footer>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.AppFooter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0px;
  gap: 10px;
  color: #666;
  background-color: white;
  border-top: 1px solid #eaeaea;

  .w {
    width: 1200px;
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .icp {
    display: flex;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
    }
  }
}
</style>