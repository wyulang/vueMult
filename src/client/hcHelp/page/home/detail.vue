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
          <img class="w-all ra-5 h-all" :src="$store.state.picUrl+info.fileId" alt="">
        </div>
        <div class="flex fd-c flex-1 pl60">
          <div class="fs-28 fb fc-000">{{info.productName}}</div>
          <div class="flex mt30 fs-16 fc-999 ai-c">
            规格:<span v-for="(item,i) in info.productSpecList">{{item.specName+'|'}} </span>
          </div>
          <div class="flex fc-999 fs-16 mt10 ai-c">
            品牌：<span v-for="(item,i) in info.brandList">{{item.brandName+'|'}} </span>
          </div>

          <div class="lh-30 mt60 fs-16">
            <div v-html="'产品介绍：'+info.content"></div>
          </div>

          <div class="flex mt30">
            <button @click="$router.push('/product/detail/order/'+this.$route.params.code)" class="btn btn-primary btn-big ra-3">报价</button>
          </div>
        </div>
      </div>

      <div class="mt30 w-all">
        <div class="flex ai-c w-all fs-20 bb-e pb30 mb30 fb fc-000">产品详情</div>
        <div v-html="info.remarks" class="lh-30 pb50 fs-16">
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
  $store; $msg; spinner;
  isModel = false;
  info: any = {}
  brandId = "";
  barndList: any = []
  goodSpec: any = []
  goods: any = []
  list: any = [//根据需要自己变更
    { label: "规格", value: "", filed: "goodCode", type: "select", isDis: false },
    { label: "单价", value: "", filed: "price", type: "amount", isDis: false },
    { label: "数量", value: "", filed: "num", type: "number", isDis: false }
  ];

  tableHeader = [];
  tableBody = [];



  created() {
    let code = this.$route.params.code || "";
    this.$store.dispatch('getProductDetail', code).then(res => {
      if (res.code == 200) {
        this.info = res.data;
        this.info.specs = res.data.productSpecList;
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
.detail-table {
  thead tr td {
    padding: 12px 10px;
    background-color: #f5f6f6;
    font-size: 15px;
    color: #888;
  }
  tbody tr td {
    padding: 3px;
    font-size: 13px;
    min-height: 30px;
  }
  tbody tr {
    color: #555;
  }
}
</style>