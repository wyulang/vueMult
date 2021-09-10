<template>
  <div id="container" class="w-all hidden hv-all">
    <div class="rel zi-100" id="output"></div>
    <div class="abs at0 ab0 al0 ar0 zi-120">
      <div class="h-all w-all ai-c jc-c flex">
        <div class=" bc-bb fc-fff jc-c mb100 ai-c flex fd-c ra-4 h-200">
          <div class="flex fd-c">
            <span style="text-shadow: 0 8px 9px #1462b3, 0px -1px 1px #fff;" class="fs-29 fc-fff fbb mb1">汇材帮后台管理系统</span>
          </div>
          <div class="flex mt20">
            <inputs v-model="user.loginName" size="big" class="mr15  w-200"  placeholder="请输入用户名"></inputs>
            <inputs type="password" size="big" v-model="user.password" class="mr15 w-200" placeholder="请输入密码"></inputs>
            <button @click="btnLogin" style="background-color:#0b5849" class="fc-fff ra-3 w-80">登 录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import canvas from '@lib/login.js'
export default class App extends Vue {
  $msg
  user = {
    loginName: "",
    password: ""
  }
  btnLogin() {
    // if (!this.user.loginName) {
    //   this.$msg.error('请输入用户名');
    //   return;
    // }
    // if (!this.user.password) {
    //   this.$msg.error('请输入密码');
    //   return;
    // }
    this.$router.push('/manage/admin')
  }

  created() {
  }
  mounted() {
    this.$nextTick(() => {
      canvas("container", "output");
      document.onkeydown = e => {
        var ev: any = document.all ? window.event : e;
        if (ev.keyCode == 13) {
          // this.btnLogin();
        }
      };
    });
  }
}
</script>

<style lang='less'>
</style>