<template>
  <div class="w-all">
    <div style="height:300px;" class="bc-primary flex ai-c hidden">
      <div class="w-1300 fc-fff fs-40 m-auto">
        百科汇采—商品百科全书，汇聚采购，采购人的专业网站
      </div>
    <!-- <div style="height:300px;" class="swiper-container hidden"> -->
      <!-- <div class="swiper-wrapper h-all">
        <div class="swiper-slide h-all">
          <div :style="{'background-image':`url(${require('../../assets/banner.1.jpg').default})`}" class="slide-inner bs-c bc-no h-all">
          </div>
        </div>
        <div class="swiper-slide">
          <div :style="{'background-image':`url(${require('../../assets/banner.2.jpg').default})`}" class="slide-inner bs-c bc-no h-all">
          </div>
        </div>
      </div> -->
    </div>

    <div class="w-all bc-f6 flex ai-c jc-c pt30 pb30">
      <div @click="$router.push('/product')" class="flex-line hand ra-5 hidden ai-c">
        <input  placeholder="请输入关键词" class="pp15 h-60 fs-22 ipt hand ipt-defalut w-500" type="text">
        <button class="w-150 h-60 flex ai-c jc-c btn-primary">
          <span class="iconfont icon-sousuo fs-25 fc-fff"></span>
          <span class="fs-22 ml5">搜索</span>
        </button>
      </div>
    </div>

    <section class="w-1300 pt30 m-auto">
      <div class="flex w-all fw jc-b">
        <div @click="$router.push(`/product/detail/${item.productCode}`)" v-for="item in list" class="hidden picfilter mb30 hand sha-card flex fd-c bc-fff ra-4" style="height: 366px; width: 310px;">
          <div class="w-all rel hidden" style="height: 176px;">
            <!-- <div class="w-72 zi-120 abs ab18 al20 h-30 flex ai-c fc-fff fs-12 jc-c ra-15 ba-2">纹管</div> -->
            <img :src="$store.state.picUrl+item.fileId" alt="" class="w-all rel zi-100 hall ">
          </div>
          <div class="w-all flex flex-1 fd-c pp15">
            <div class="w-all title fs-16 fc-000 mb10 fbb line-1">{{item.productName}}</div>
            <div class="flex-1 w-all">
              <div v-html="item.remarks" class=" w-all fs-14 lh-26 line-3"></div>
            </div>
            <div class="fc-aaa fs-12">{{item.createDate}}</div>
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
  $store;
  url: any = "";
  list: any = [];
  initData() {
    this.$store.dispatch('getProduct', { pageNum: 1, pageSize: 10 }).then(res => {
      if (res.code == 200) {
        this.list = res.data.list;
      }
    })
  }
  created() {
    this.initData()
  }
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