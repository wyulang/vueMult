<template>
  <div class="w-all">
    <div v-if="isOrder" class="w-all">
      <div style="min-height:700px" class="w-1300 m-auto">
        <div id="order" class="mt60 mb40 w-all">
          <div class="flex ai-c w-all fs-30 bb-e jc-c pb30 mb20 fb fc-000">{{info.productName}}报价</div>
          <div class="flex fs-18 pb10 ai-c">
            <span>品牌：</span>
            <div class="flex-line ra-5 hidden ai-c">
              <div @click="btnBrand(item)" :class="{'bc-primary fc-fff':item.value==brandId,'bc-f2':item.brandCode!=brandId}" v-for="item in barndList" class="h-42 centent hand lh-42 pl15 pr15">{{item.brandName}}</div>
            </div>
          </div>

          <table class="w-all mt20 detail-table">
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
                  <selects @change="v=>{changeGood(v,item,index)}" :type="child.label" :index="child.curr" v-else-if="child.type=='select'" v-model="child.value" :data="child.curr?child.data:sepattr['spec'+String(child.curr)]"></selects>
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
              <div @click="btnSave" class="btn ra-4 btn-big ml10 btn-primary">确定认下单</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="w-800 fs-18 m-auto">
      <div class="flex ai-c w-all fs-30 bb-e jc-c mt50 pb30 mb20 fb fc-000">生成订单</div>
      <table class="w-all order-table">
        <thead>
          <tr>
            <td v-for="item in tableHeader">{{item}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableBody">
            <td v-for="(child,ids) in item">{{child.value&&String(child.value).includes('-')?child.value.split('-')[0]:child.value}}</td>
          </tr>
          <tr>
            <td :colspan="tableHeader.length-1">总价</td>
            <td>{{countPrice}}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex "></div>
      <div class="flex mt35 ai-c">
        <div class="flex w-120">收货人：</div>
        <Input size="big" v-model="order.name"></Input>
      </div>
      <div class="flex mt15 ai-c">
        <div class="flex w-120">联系电话：</div>
        <Input size="big" v-model="order.phone"></Input>
      </div>
      <div class="flex mt15 ai-c">
        <div class="flex w-120">送货地址：</div>
        <Input size="big" v-model="order.address"></Input>
      </div>
      <div class="flex mt15 ai-c">
        <div class="flex w-120">收货时间：</div>
        <date size="big" v-model="order.time"></date>
      </div>
      <div class="flex mt15 ai-c">
        <div class="flex w-120">包装要求：</div>
        <Input size="big" v-model="order.need"></Input>
      </div>
      <div class="flex mt15 ai-c">
        <div class="flex w-120">备注：</div>
        <textarea name="" id="" v-model="order.remark" class="ipt pp12 ipt-auto w-all h-120"></textarea>
      </div>
      <div class="flex mt35 mb50 ai-c">
        <div class="w-100"></div>
        <div @click="btnOrder" class="btn ml5 ra-4 btn-big btn-primary">立即下单</div>
        <span class="fc-aa ml15 hand fs-12">[下单合同]</span>
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
  isOrder = true;
  isFirstFile = ""
  order: any = {
    name: "",
    address: "",
    phone: "",
    time: "",
    need: "",
    remark: ""
  }
  list: any = [];

  tableHeader: any = [];
  tableBody: any = [];

  btnOrder() {
    if (this.order.name.length < 1) {
      this.$msg.error(`收货人不能为空！`);
      return;
    }
    if (this.order.phone < 1) {
      this.$msg.error(`联系电话不能为空！`);
      return;
    }
    if (!this.order.address) {
      this.$msg.error(`联系地址不能为空！`);
      return;
    }
    if (!this.order.remark) {
      this.$msg.error(`备注不能为空！`);
      return;
    }
    // 这个接口需要自己去添加
    this.$store.dispatch('接口名', this.order).then(res => {
      if (res.code == 200) {
        this.$msg.success('下单成功')
        this.$router.push('/')
      }
    })
  }

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
    this.btnAdd();
  }

  currIndex = 0;
  fter = {
    label: 'goodsCode',
    value: ''
  }



  btnSave() {
    let sql: any = []
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
        if (v.filed.includes('spec')) {
          data[v.filed] = v.label + ':' + v.value;
        } else {
          data[v.filed] = v.value;
        }
        if (v.goodsCode) {
          data.goodsCode = v.goodsCode
        }
      });

      data.brandCode = this.brandId;
      data.productCode = this.info.productCode
      sql.push(data)
    }
    this.order.orderItemList = sql;
    this.order.price = this.countPrice;
    console.log(sql);
    if (!isNext) return;
    this.isOrder = false;
    // this.$store.dispatch('buildOrder', { orderItemList: sql })
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

  sepattr = {};
  changeGood(data, item, ins) {
    item.filter(v => v.curr).forEach(line => {
      let list = [];
      // 存在codo 说明已选第一项
      if (!data.item.code) {
        this.baseList.filter(f => f.goodsSpecList.find(d => d.specValue == data.value)).forEach(child => {
          let curr = child.goodsSpecList.find(d => d.specName == line.label);
          list.push({ label: curr.specValue, value: curr.specValue, price: child.priceList[0].price, code: curr.goodsCode })
        })
        line.data=list;
        // this.sepattr['spec' + line.curr] = list;
        //   //清空其它已选属性和价格
        this.tableBody[ins].filter(v => v.curr || v.filed == 'price').forEach(v => v.value = '')
      } else {
        setTimeout(() => {
          //当所有属性都选完后设置价格，或则所有列表取同一商品下的属性
          if (item.filter(v => v.curr).some(v => !v.value)) {
            item.filter(v => v.curr).forEach(v => {
              this.sepattr['spec' + v.curr] = this.sepattr['spec' + v.curr].filter(f => f.code == data.item.code)
            })
          } else {
            let line = item.find(v => v.filed == 'price');
            line.value = data.item.price;
            line.goodsCode = data.item.code;
          }
        }, 100);
      }
    })
  }

  seplist = [];
  baseList = [];
  initData(brandCode) {
    this.list = [];
    this.$store.dispatch('getBrandProductPrices', { productCode: this.$route.params.code, brandCode }).then(res => {
      if (res.code == 200) {
        let list: any = []
        this.baseList = res.data;
        res.data[0].goodsSpecList.forEach((item, i) => {
          list.push({ label: item.specName, value: '', filed: 'spec' + i, type: 'select', isDis: false, curr: i });
          let currlist = []
          res.data.forEach(line => {
            let dal = line.goodsSpecList.find(v => v.specName == item.specName);
            if (!i) {
              dal && currlist.push(dal.specValue);
            }
          })
          if (!i) {
            this.sepattr['spec' + i] = [...new Set(currlist)]
          }
        })
        this.list = [
          ...list,
          { label: "数量", value: "1", filed: "num", type: "number", isDis: false },
          { label: "单价", value: "", filed: "price", type: "amount", isDis: true },
          { label: "合计", value: "", filed: "count", type: "text", isDis: true }
        ]
        this.tableHeader = this.list.map(v => v.label);
        if (!this.tableBody.length) {
          this.tableBody.push(JSON.parse(JSON.stringify(this.list)))
        } else {
          this.tableBody = this.tableBody.filter(v => v.len)
        }
      }
    });
  }

  created() {
    let code = this.$route.params.code || "";
    this.$store.dispatch('getProductDetail', code).then(res => {
      if (res.code == 200) {
        this.info = res.data;
        this.info.specs = res.data.productSpecList;
        this.barndList = res.data.brandList.map(v => { return { label: v.brandName, value: v.brandCode, ...v } });
        this.brandId = this.barndList.length && this.barndList[0].brandCode;
        this.initData(this.brandId);
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
.order-table {
  // border: 1px solid #ddd;
  td {
    border: 1px solid #ddd;
  }
  thead tr td {
    padding: 12px 10px;
    // background-color: #f5f6f6;
    font-size: 15px;
    text-align: center;
    color: #888;
  }
  tbody tr td {
    padding: 12px 10px;
    font-size: 13px;
    text-align: center;
    min-height: 30px;
  }
}
</style>
<style>
@import "swiper/css";
</style>