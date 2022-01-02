<template>
  <div class="w-all bc-f6 m-height">
    <div class="w-1300 m-auto">
      <section class="flex w-all m-height">
        <menus></menus>
        <div class="flex-1 bc-fff mt20 pl50 pt30 mb20 ml30">
          <div class="flex ai-c">
            <span class="wi-90 fb fs-16">姓名：</span>
            <input v-model="info.username" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">昵称：</span>
            <input v-model="info.nickname" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">手机号：</span>
            <input v-number v-model="info.phone" maxlength="11" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">邮箱：</span>
            <input v-model="info.email" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">公司名称：</span>
            <input v-model="info.company" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">公司地址：</span>
            <input v-model="info.companyAddress" class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">收货地址：</span>
            <textarea v-model="info.ReceivingAddress" class="ipt h-150 b-d pp10 ra-4 w-500"></textarea>
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16"></span>
            <div @click="btnSave" class="btn btn-small ra-5 btn-primary">保存</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-property-decorator';
import menus from './user.vue';
@Options({
  components: {
    menus
  }
})
export default class App extends Vue {
  created() {
    this.$store.dispatch('getCurrentUser').then(res => {
      if (res.code == 200) {
        this.info = res.data;
        var tem 
        this.info.specs = res.data.productSpecList
      }
    })
  }
  $store;$msg;
  info: any = {
    "address": "",
    "email": "",
    "nickname": "",
    "password": "",
    "phone": "",
    "updator": "",
    "userId": "",
    "username": "",
    "company":"",
    "companyAddress":"",
    "ReceivingAddress":""
  }
  btnSave(){
    if(!this.info.nickname){
      this.$msg.error('昵称不为空')
      return;
    }
    if(!this.info.phone){
      this.$msg.error('手机号不为空')
      return;
    }
    if(!this.info.email){
      this.$msg.error('邮箱不为空')
      return;
    }
    this.$store.dispatch('setUserInfo',this.info).then(res=>{
      if(res.code==200){
        this.$msg.success('保存成功')
      }
    })
  }
}
</script>

<style lang='less'>
.m-height {
  min-height: calc(100vh - 170px);
}
</style>