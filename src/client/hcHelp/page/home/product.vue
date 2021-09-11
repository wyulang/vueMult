<template>
  <div class="w-all">
    <div style="height:500px;" class="swiper-container hidden">
      <div class="swiper-wrapper h-all">
        <div class="swiper-slide h-all">
          <div :style="{'background-image':`url(${require('../../assets/banner.1.jpg').default})`}" class="slide-inner bs-c bc-no h-all">
          </div>
        </div>
        <div class="swiper-slide">
          <div :style="{'background-image':`url(${require('../../assets/banner.2.jpg').default})`}" class="slide-inner bs-c bc-no h-all">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-all bc-f6">
    <div class="w-1300 m-auto">
      <div class="flex fd-c">
        <div class="w-all pt50 pb50 flex">
          <div class="btnSerch ra-5 h-60 flex ai-c hidden rel">
            <input placeholder="请输入产品名称 / 品牌 / 规格" class="h-56 pp15 ra-5 fs-18 w-600 bc-fff mt2 mb2 ml2" type="text">
            <div class="w-150 h-all flex ai-c jc-c btn-primary">
              <span class="iconfont icon-sousuo fs-25 fc-fff"></span>
              <span class="fs-22 ml5">搜索</span>
            </div>
          </div>

          <div class=""></div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-all pt30 bc-fff">
    <div class="w-1300 m-auto">
      <section @click="$router.push('/product/detail')" v-for="item in 30" class="sha-card picfilter hand mb30 w-all flex pp15">
        <div class="flex hidden ra-5 ai-c jc-c">
          <img class="w-250 " src="http://admin.baikehuicai.com/storage/common/20210529/20210529233551_6.jpg" alt="">
        </div>
        <div class="pl15 flex-1 flex fd-c">
          <div class="mb15 mt10 flex ai-c">
            <h1 class="fs-22 fb">铝膜对拉片</h1>
            <span class="ml10 fc-999 fs-14">品牌：铝膜铝膜铝膜</span>
          </div>
          <div class="line-3 fs-16 lh-30">
            中学理化生实验考试系统具有注重实验操作过程和实验结果双重特点，既能通过信息化手段记录所有考生实验测试操作全过程，又能确保网上统一阅卷过程中真实还原考生实验操作全程和关键细节，而且支持考生质疑和查阅成绩，实现科学实验操作测试管理工作的规范化、数字化、智能化。
          </div>
          <div class="flex ai-c fc-999 mt10">
            <span>成功报价：12次</span>
            <span class="ml30">上架时间：2021/9/12</span>
          </div>
        </div>
      </section>
    </div>
  </div>

</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { Swiper, Autoplay, Pagination } from 'swiper';
Swiper.use([Autoplay, Pagination])
export default class App extends Vue {
}
</script>

<style lang='less'>
.btnSerch {
  background-color: #409eff;
}
</style>