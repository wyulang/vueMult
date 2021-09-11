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

    <div class="w-all bc-f6 flex ai-c jc-c pt30 pb30">
      <div class="flex-line ra-5 hidden ai-c">
        <input placeholder="请输入关键词" class="pp15 h-60 fs-22 ipt ipt-defalut w-500" type="text">
        <button class="w-150 h-60 flex ai-c jc-c btn-primary">
          <span class="iconfont icon-sousuo fs-25 fc-fff"></span>
          <span class="fs-22 ml5">搜索</span>
        </button>
      </div>
    </div>

    <section class="w-1300 pt30 m-auto">
      <div class="flex w-all fw jc-b">
        <div @click="$router.push('/product/detail')" v-for="item in 24" class="hidden picfilter mb30 hand sha-card flex fd-c bc-fff ra-4" style="height: 366px; width: 310px;">
          <div class="w-all rel hidden" style="height: 176px;">
            <div class="w-72 zi-120 abs ab18 al20 h-30 flex ai-c fc-fff fs-12 jc-c ra-15 ba-2">纹管</div>
            <img src="http://admin.baikehuicai.com/storage/common/20210529/20210529233551_6.jpg" alt="" class="w-all rel zi-100 hall ">
          </div>
          <div class="w-all flex flex-1 fd-c pp15">
            <div class="w-all title fs-16 fc-000 mb10 fbb line-1">双壁波纹管</div>
            <div class="flex-1 w-all">
              <div class=" w-all fs-14 lh-26 line-3"> 风管，是用于空气输送和分布的管道系统。有复合风管和无机风管两种。复合风管以Durkduct风管为代表。可按截面形状和材质分类。风管制作不锈钢风管制作是在咬口缝、铆钉缝、法兰翻边四角等缝隙处涂上密封胶（如中性玻璃胶）。</div>
            </div>
            <div class="fc-aaa fs-12">2021-01-21</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { Swiper, Autoplay, Pagination } from 'swiper';
Swiper.use([Autoplay, Pagination])
export default class App extends Vue {
  url: any = "";
  mounted() {
    this.$nextTick(() => {
      new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,
        effect: 'fade',
      })
    })
  }
}
</script>

<style lang='less'>
// .bc-f5
</style>
<style>
@import "swiper/css";
</style>