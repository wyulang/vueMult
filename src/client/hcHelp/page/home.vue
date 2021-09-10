<template>
    <header class="h-60 bc-3 flex fc-fff ai-c jc-c">
    <div class="w-1300 flex jc-b ai-c">
      <span class="fb fs-22">汇材帮</span>
      <div class="flex flex-1 jc-b pl50 ai-c">
        <div class="flex ai-c">
          <span class="fs-18 h-all hand">首页</span>
          <span class="fs-18 h-all hand ml30">产品列表</span>
        </div>
        <div class="flex ai-c">
          <span class="fs-14">登录</span>
          <span class="ml3 mr3">|</span>
          <span class="fs-14">注册</span>
        </div>
      </div>
    </div>
  </header>
  <router-view class="m-body"></router-view>
  <footer class="flex footer fc-ddd bc-3 ai-c jc-c">
    <div class="w-all">
      <div class="w-1300 m-auto ai-c flex h-60 jc-b fs-18">
        <span class="flex-1 centers">厂家直销</span>
        <span class="flex-1 centers">优选品牌</span>
        <span class="flex-1 centers">品质保证</span>
      </div>
      <div class="w-all bt-4 flex ai-c jc-c h-50 fc-333">
        <a href="https://beian.miit.gov.cn/#/">Copyright © 2019-2022 . 粤ICP备20006031号-1 All Rights Reserved.</a>
      </div>
    </div>
  </footer>
</template>

<script lang='ts'>
import {Vue} from 'vue-property-decorator';
export default class App extends Vue {
}
</script>

<style lang='less'>
</style>