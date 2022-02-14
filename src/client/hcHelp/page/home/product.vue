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
        <!-- 用途，材质，形状 -->
        <div class="w-all pt50 pb50 flex">
          
          <div class="btnSerch ra-5 h-60 flex ai-c hidden mr10 rel">
            <input v-model="query.productName" placeholder="请输入产品名称" class="h-56 pp15 ra-5 fs-18 w-600 bc-fff mt2 mb2 ml2" type="text">
            <div @click="initData(1)" class="w-150 h-all flex ai-c jc-c btn-primary">
              <span class="iconfont icon-sousuo fs-25 fc-fff"></span>
              <span class="fs-22 ml5">搜索</span>
            </div>
          </div>
          <radio @change="initData(1)" :data="[{value:'用途',label:'用途'},{value:'材质',label:'材质'},{value:'形状',label:'形状'}]"  v-model="query.type"></radio>
          <div class=""></div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-all pt30 bc-fff">
    <div class="w-1300 m-auto">
      <section @click="$router.push(`/product/detail/${item.productCode}`)" v-for="item in list" class="sha-card picfilter hand mb30 w-all flex pp15">
        <div class="flex hidden ra-5 ai-c jc-c">
          <img class="w-150 " :src="$store.state.picUrl+item.fileId" alt="">
        </div>
        <div class="pl15 flex-1 flex fd-c">
          <div class="mb15 mt10 flex ai-c">
            <h1 class="fs-22 fb">{{item.productName}}</h1>
            <span class="ml10 fc-999 fs-14"></span>
          </div>
          <div class="line-3 fs-16 lh-30">
            <div v-html="item.remarks"></div>
          </div>
          <div class="flex ai-c fc-999 mt10">
            <!-- <span class="mr30">成功报价：12次</span> -->
            <span>上架时间：{{item.createDate}}</span>
          </div>
        </div>
      </section>

      <div class="pt20 pb20">
        <page @change="initData" :total="query.total"></page>
      </div>
    </div>
  </div>

</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { Swiper, Autoplay, Pagination } from 'swiper';
import { toObject } from 'lib/lang';
Swiper.use([Autoplay, Pagination])
export default class App extends Vue {
  $store; spinner; $msg;
  list = [];
  query: any = {
    pageNum: 1,
    pageSize: 10,
    type:"",
    productName: "",
    total: 0
  }
  initData(page = 1) {
    this.query.pageNum = page;
    this.spinner.show();
    this.$store.dispatch('getProduct', this.query).then(res => {
      this.spinner.close()
      if (res.code == 200) {
        this.list = res.data.list;
        this.query.total = res.data.total;
      }
    })
  }

  created() {
    this.initData();
  }
}
</script>

<style lang='less'>
.btnSerch {
  background-color: #409eff;
}
</style>