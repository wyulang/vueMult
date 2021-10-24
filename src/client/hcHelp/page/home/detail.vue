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
  <div class="w-all">
    <div class="w-1300 m-auto">
      <div class="flex pt50 pb50">
        <div class="detail-img hidden">
          <img class="w-all ra-5 h-all" src="http://admin.baikehuicai.com/storage/common/20210529/20210529233551_6.jpg" alt="">
        </div>
        <div class="flex fd-c flex-1 pl60">
          <div class="fs-28 fb fc-000">{{info.productName}}</div>
          <div class="flex mt30 fs-16 fc-999 ai-c">
            <span>规格:OX201</span>
          </div>
          <div class="flex fc-999 fs-16 mt10 ai-c">
            <span>品牌：铝膜铝膜铝膜:OX201</span>
          </div>

          <div class="lh-30 mt60 fs-16">
            产品介绍： 铝膜对拉片，简称拉片，是新型建材铝膜板的零配件，是代替螺丝作用的，其特点有稳定性强，施工灵活快速，工厂化施工更快捷，避免留空，操作简单，更加紧固
          </div>

          <div class="flex mt30">
            <button class="btn btn-primary btn-big ra-3">报价</button>
          </div>
        </div>
      </div>

      <div class="mt30 w-all">
        <div class="flex ai-c w-all fs-20 bb-e pb30 mb30 fb fc-000">产品详情</div>
        <div class="lh-30 pb50 fs-16">
         {{info.remarks}}
        </div>
      </div>
    </div>
  </div>

</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { Swiper, Autoplay, Pagination } from 'swiper';
Swiper.use([Autoplay, Pagination])
export default class App extends Vue {
  $store;
  info: any = {}
  created() {
    let code = this.$route.params.code || "";
    this.$store.dispatch('getProductDetail', code).then(res => {
      if (res.code == 200) {
        this.info = res.data;
      }
    })
  }
}
</script>

<style lang='less'>
.btnSerch {
  background-color: #409eff;
}
.detail-img {
  width: 700px;
  height: 600px;
}
</style>