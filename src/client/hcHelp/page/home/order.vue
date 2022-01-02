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
    <div class="w-all">
      <div style="min-height:700px" class="w-1300 m-auto">
        <div id="order" class="mt30 mb20 w-all">
          <div class="flex ai-c w-all fs-20 bb-e pb30 mb20 fb fc-000">报价详情</div>

          <div class="flex pb10 ai-c">
            <span>品牌：</span>
            <div class="flex-line ra-5 hidden ai-c">
              <div @click="btnBrand(item)" :class="{'bc-primary fc-fff':item.value==brandId,'bc-f2':item.brandCode!=brandId}" v-for="item in barndList" class="h-32 centent hand lh-32 pl10 pr10">{{item.brandName}}</div>
            </div>
          </div>

          <div class="flex w-all mb20 mt20 ai-c">
            <div class="flex fs-14 mr15 ai-c">
              <span class=" mr10">联系电话：</span>
              <Input class="w-200" clear v-model="info.phone"></Input>
            </div>
            <div class="flex fs-14 mr15 ai-c">
              <span class=" mr10">收货地址：</span>
              <Input class="w-200" clear v-model="info.address"></Input>
            </div>
            <div class="flex flex-1 fs-14 ai-c">
              <span class="nowrap mr10">留言：</span>
              <Input class="w-all" clear v-model="info.address"></Input>
            </div>
          </div>

          <table class="w-all detail-table">
            <thead>
              <tr>
                <td v-for="item in tableHeader">{{item}}</td>
                <td class="nowrap wb-1">操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableBody">
                <td v-for="(child,ids) in item">
                  <input v-if="child.type=='number'" :disabled="child.isDis" v-number v-model="child.value" class="w-all ipt ipt-small h-all" type="text">
                  <input v-else-if="child.type=='amount'" :disabled="child.isDis" v-number.2 v-model="child.value" class="w-all ipt ipt-small h-all" type="text">
                  <selects @change="v=>{changeGood(v,item)}" :index="ids" v-else-if="child.type=='select'" v-model="child.value" :data="child.list"></selects>
                  <input v-else v-model="child.value" :disabled="child.isDis" class="w-all ipt ipt-small h-all" type="text">
                </td>
                <td class="nowrap">
                  <span @click="delItem(item,index)" class="fc-danger hand pl10"><svg fill="#d81e06" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3621" width="23" height="23">
                      <path
                        d="M786.7392 333.42464 608.17408 512 786.7392 690.57536c26.56256 26.56256 26.56256 69.61152 0 96.17408-13.27104 13.27104-30.6688 19.9168-48.06656 19.9168-17.408 0-34.80576-6.63552-48.0768-19.9168L512 608.16384l-178.5856 178.5856c-13.27104 13.27104-30.6688 19.9168-48.0768 19.9168-17.39776 0-34.78528-6.63552-48.06656-19.9168-26.56256-26.55232-26.56256-69.60128 0-96.17408L415.82592 512 237.2608 333.42464c-26.56256-26.56256-26.56256-69.61152 0-96.17408 26.55232-26.54208 69.5808-26.54208 96.14336 0L512 415.83616l178.5856-178.5856c26.56256-26.54208 69.59104-26.54208 96.14336 0C813.30176 263.81312 813.30176 306.86208 786.7392 333.42464z"
                        p-id="3622"></path>
                    </svg></span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex ai-c">
            <div @click="btnAdd" class="fc-aa fs-15 ml3 mt5 hand">新增一行</div>
          </div>

          <div class="flex ai-c jc-e">
            <span></span>
            <div class="flex ai-c">
              <div class="fc-danger">总计：￥{{countPrice}}</div>
              <div @click="btnSave" class="btn ra-4 btn-big ml10 btn-primary">生成报价单</div>
            </div>
          </div>
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
  info: any = {};
  query: any = { productCode: "", brandCode: "" }
  brandId = "";
  barndList: any = []
  goodSpec: any = []
  goods: any = []
  list: any = [//根据需要自己变更

  ];

  tableHeader = [];
  tableBody = [];

  get countPrice() {
    let total = 0;
    this.tableBody.forEach(v => {
      if (v && v.length) {
        let paylist = v.filter(item => ['amount', 'number'].includes(item.type))
        let currCount = v.find(f => f.filed == 'count');
        let curritem = paylist.reduce((count, item) => { return count * parseFloat(item.value || 0) }, 1)
        currCount.value = curritem;
        total += parseFloat(curritem)
      }
    })
    return total
  }

  btnBrand(item) {
    this.brandId = item.brandCode;
    this.initData(this.brandId)
    // this.tableBody.forEach(item => {
    //   item.find(f => f.filed == 'price').value = "";
    // })
    this.btnAdd();
  }

  changeGood(data, item) {
    let currItem = item.find(f => f.filed == 'price');
    // currItem.value = data.item.price;
    console.log(item, data)
    item[data.index].props.goodsCode = data.item.goodsCode;
    // item.data.goodsCode=data.item.goodsCode;
    let dal = item.filter(v => v.props).length;
    let mod = item.filter(v => v.props && v.props.goodsCode == data.item.goodsCode).length;
    if (dal && dal == mod) {
      currItem.value = data.item.price;
    } else {
      currItem.value = 0;
    }
  }

  btnSave() {
    let sql = []
    let isNext = true;
    for (let i = 0; i < this.tableBody.length; i++) {
      let item = this.tableBody[i];
      if (item.some(v => !v.value)) {
        this.$msg.error(`请先完善第${i + 1}内容`);
        isNext = false;
        break;
      }
      let data: any = {};
      item.forEach(v => {
        if (v.props) {
          data[v.filed] = v.label + ':' + v.value;
        } else {
          data[v.filed] = v.value;
        }
      });
      data.brandCode = this.brandId;
      data.productCode = this.info.productCode
      sql.push(data)
    }
    console.log(sql);
    if (!isNext) return;
    this.$store.dispatch('buildOrder', { orderItemList: sql })
  }

  delItem(item, index) {
    this.tableBody.length > 1 && this.tableBody.splice(index, 1)
  }

  btnAdd() {
    this.tableBody.push(JSON.parse(JSON.stringify(this.list)))
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

  initData(brandCode) {
    this.list = [];
    this.$store.dispatch('getBrandProductPrices', { productCode: this.$route.params.code, brandCode }).then(res => {
      if (res.code == 200) {
        let list: any = []
        res.data && res.data.forEach(item => {
          item.goodsSpecList.forEach(v => {
            let curr = list.find(f => f.label == v.specName);
            // 当找到相同属性名称
            if (curr) {
              if (!curr.list) {
                curr.list = [];
              }
              // 追加一条下拉记录
              curr.list.push({ label: v.specValue, value: v.specValue, price: item.priceList[0].price, goodsCode: v.goodsCode })
            } else {
              // 当没找到相同属性名称 新建表列，并把当前属性加到下拉选项中
              list.push({ label: v.specName, isDis: false, filed: 'spec' + v.id, value: '', type: 'select', props: { goodsCode: "", brandCode: item.brandCode }, list: [{ value: v.specValue, label: v.specValue, price: item.priceList[0].price, goodsCode: v.goodsCode }] })
            }
          })
        })
        this.list = [
          ...list,
          { label: "数量", value: "", filed: "num", type: "number", isDis: false },
          { label: "单价", value: "", filed: "price", type: "amount", isDis: false },
          { label: "合计", value: "", filed: "count", type: "text", isDis: true }
        ]
        this.tableHeader = this.list.map(v => v.label);
        this.tableBody = [JSON.parse(JSON.stringify(this.list))]
        console.log(this.list)
      }
    });
  }

  created() {
    let code = this.$route.params.code || "";
    this.$store.dispatch('getProductDetail', code).then(res => {
      if (res.code == 200) {
        this.info = res.data;
        this.info.specs = res.data.productSpecList;
        // res.data.productSpecList.forEach((v, index) => {
        //   this.list.push({ label: v.specName, value: "", filed: "spec" + (index + 1), type: "text", isDec: true, isDis: false })
        // })

        // this.list.push()
        this.barndList = res.data.brandList.map(v => { return { label: v.brandName, value: v.brandCode, ...v } });

        //品牌默认选中第一个
        this.brandId = this.barndList.length && this.barndList[0].brandCode;
        this.initData(this.brandId);
        // debugger


        // this.list.unshift({ label: "产品", value: this.info.productName, filed: "product", type: "text", isDis: false })
        // this.tableBody.push(JSON.parse(JSON.stringify(this.list)))


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
<style>
@import "swiper/css";
</style>