<template>
  <div class="w-all hi-all pp15 bc-f7">
    <div class="w-all sha-5 h-55 flex ai-c pl15 pr15 ra-5 bc-fff">
      <inputs class="w-180" v-model="query.name" placeholder="请输入名称" type="text"></inputs>
      <div @click="initData()" class="btn btn-small btn-default ra-3 ml10">搜索</div>
    </div>
    <div class="w-all sha-5 mt15 pp15 ra-5 bc-fff">
      <div @click="btnSet('add',null)" class="btn btn-small btn-primary ra-3">新增会员</div>
      <table class="table mt15 mb20 ra-3 w-all">
        <thead>
          <tr>
            <td>联系人</td>
            <td>手机号</td>
            <td>邮箱</td>
            <td>价格模式</td>
            <td>登录次数</td>
            <td>上次登录时间</td>
            <td>创建时间</td>
            <td >描述</td>
            <td class="wa-200">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list">
            <td>联系人</td>
            <td>手机号</td>
            <td>邮箱</td>
            <td>价格模式</td>
            <td>登录次数</td>
            <td>上次登录时间</td>
            <td>创建时间</td>
            <td >描述</td>
            <td class="wa-200">
              <span @click="btnSet('modify',item)" class="fc-primary hand">查看</span>
              <span @click="btnDel(item)" class="fc-danger ml10 hand">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex ai-c jc-e">
        <page @change="initData" :pageSize="query.size" :total="query.total"></page>
      </div>
    </div>
  </div>
  <dig :title="info.id?'员工修改':'新增员工'" v-model="isModel" width="500px">
    <div class="pp15 w-all">
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">联系人：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">手机号：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">邮箱：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">公司名称：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">公司地址：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">公司品牌名称：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">经营范围：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">登录账号：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">登录密码：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>
      <div class="flex ai-c w-all mb15">
        <span class="wi-100">价格模式：</span>
        <radio :data="[{value:'底价模式',label:'底价模式'},{value:'分享模式',label:'分享模式'}]"></radio>
      </div>
      <div class="flex ai-c w-all">
        <span class="wi-100">个人说明：</span>
        <input class="ipt ipt-small w-all" type="text">
      </div>

      <div class="flex mt15 jc-e ai-c">
        <div @click="isDig=false" class="btn hand btn-small btn-default ra-3">取消</div>
        <div @click="btnSave()" class="btn hand btn-small btn-primary ml10 ra-3">确定</div>
      </div>
    </div>
  </dig>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
export default class App extends Vue {
  isModel = false;
  list:any=[]
  info: any = {
    name: "",
    email: "",
    phone: "",
    password: ""
  }
  query = {
    name: "",
    size: 10,
    page: 1,
    total: 0
  }

  btnSet(type, item) {
    if (type == 'add') {
      this.info = {
        name: "",
        email: "",
        phone: "",
        password: ""
      }
      this.isModel=true;
    }
  }

  initData(page: any = null) {

  }
}
</script>

<style lang='less'>
</style>