<template>
  <header class="h-60 bc-3 flex fc-fff ai-c jc-c">
    <div class="w-1300 flex jc-b ai-c">
      <span @click="$router.push('/')" class="fb hand fs-22">百科汇采</span>
      <div class="flex flex-1 jc-b pl80 ai-c">
        <div class="flex ai-c">
          <span @click="$router.push('/')" class="fs-18 h-all hand">首页</span>
          <span @click="$router.push('/product')" class="fs-18 h-all hand ml50">产品列表</span>
        </div>
        <div v-if="$store.state.user" class="flex ai-c">
          <span @click="$router.push('/user/order')" class="hand">{{$store.state.user.nickname||$store.state.user.fullName}}</span>
          <span @click="btnOut" class="fc-aa ml6 hand">退出登录</span>
        </div>
        <div v-else class="flex ai-c">
          <span @click="isLogin=true" class="fs-16 hand">登录</span>
          <span class="ml7 mr7">|</span>
          <span @click="isRegedit=true" class="fs-16 hand">注册</span>
        </div>
      </div>
    </div>
  </header>
  <router-view ></router-view>
  <footer class="flex footer fc-ddd bc-3 ai-c jc-c">
    <div class="w-all">
      <div class="w-1300 m-auto ai-c flex h-60 jc-b fs-18">
        <span class="flex-1 centers">厂家直销</span>
        <span class="flex-1 centers">优选品牌</span>
        <span class="flex-1 centers">品质保证</span>
      </div>
      <div class="w-all bt-4 flex ai-c jc-c h-50 fc-333">
        <a href="https://beian.miit.gov.cn/#/">Copyright © 2019-2022 . 粤ICP备20006031号-1 All Rights Reserved.</a>
      </div>
    </div>
  </footer>

  <section v-if="isLogin" class="fixed ar0 ab0 at0 al0 zi-2000 login-bc flex ai-c jc-c">
    <div class="pp30 ra-5 sha-card w-400 flex jc-c fd-c bc-fff">
      <div class="w-all flex jc-e rel">
        <i @click="isLogin=false" class=" abs at-20 hand iconfont icon-delete fs-23  ar-20 fc-999"></i>
      </div>
      <div class="fs-22 centers">登录</div>
      <div class="rel mt30 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input @blur="btnCheckVip" v-model="user.username" placeholder="请输入账号" class="h-50 pp10 fs-16 bc-t" type="text">
      </div>
      <div class="rel mt30 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input @blur="btnCheckVip" v-model="user.password" placeholder="请输入密码" class="h-50 pp10 fs-16 bc-t" type="password">
      </div>

      <div @click="goLogin" style="box-shadow: 0 8px 20px rgba(137,191,234,.64);" class="mt25 bc-primary fc-fff hand fs-26 flex ai-c jc-c h-63 ra-32">
        登录
      </div>
      <div class="h-10"></div>
    </div>
  </section>

  <section v-if="isRegedit" class="fixed ar0 ab0 at0 al0 zi-2000 login-bc flex ai-c jc-c">
    <div class="pp30 ra-5 sha-card w-400 flex jc-c fd-c bc-fff">
      <div class="w-all flex jc-e rel">
        <i @click="isRegedit=false" class=" abs at-20 hand iconfont icon-delete fs-23  ar-20 fc-999"></i>
      </div>
      <div class="fs-22 centers">注册</div>
      <div class="rel mt30 flex ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <radio v-model="info.type" :data="[{value:'客户',label:'客户'},{value:'产品合伙人',label:'产品合伙人'},{value:'业务合伙人',label:'业务合伙人'}]"></radio>
      </div>
      <div class="rel mt10 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input v-model="info.username" placeholder="请输入您的姓名" class="h-50 pp10 fs-16 bc-t" type="text">
      </div>
      <div class="rel mt30 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input v-model="info.phone" placeholder="请输入手机号码" class="h-50 pp10 fs-16 bc-t" type="text">
      </div>
      <div class="rel mt30 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input v-model="info.password" placeholder="请输入您的密码" class="h-50 pp10 fs-16 bc-t" type="password">
      </div>
      <div v-if="info.type=='客户'" class="rel mt30 flex bc-f6 ra-29 h-50 ai-c">
        <span class="iconfont iconshouji ml10 fc-bbb fs-25"></span>
        <input v-model="info.code" placeholder="请输入您邀请码" class="h-50 pp10 fs-16 bc-t">
      </div>

      <div @click="toRegedit" style="box-shadow: 0 8px 20px rgba(137,191,234,.64);" class="mt25 bc-primary fc-fff hand fs-26 flex ai-c jc-c h-63 ra-32">
        注册
      </div>
      <div class="h-10"></div>
    </div>
  </section>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
export default class App extends Vue {
  $store;$msg;
  user: any = {
    username:"",
    password:""
  }
  info: any = {
    username:"",
    password:"",
    phone:"",
    type:'客户',
    code:''
  }
  isLogin = false;
  isRegedit=false;

  btnOut(){
    this.$store.commit('outLogin');
    this.$router.push('/')
  }

  toRegedit(){
      if(!this.info.username){
      this.$msg.error('登录名不为空！');
      return;
    }
      if(!/^1[3456789]\d{9}$/.test(this.info.phone)){
      this.$msg.error('手机号不正确');
      return;
    }
    if(!this.info.password){
      this.$msg.error('密码不为空！');
      return;
    }
    this.$store.dispatch('pcRegedit',this.info).then(res=>{
      if(res.code==200){
        this.isRegedit=false;
        this.user.username=this.info.username;
        this.user.password=this.info.password;
        this.goLogin()
      }
    })
  }

  goLogin(){
    // 
    if(!this.user.username){
      this.$msg.error('登录名不为空！');
      return;
    }
    if(!this.user.password){
      this.$msg.error('密码不为空！');
      return;
    }
    this.$store.dispatch('login',this.user).then(res=>{
      if(res.code==200){
        this.isLogin=false;
        this.$router.push('/user/order');
      }
    })
    
  }
}
</script>

<style lang='less'>
.bodyHeight{
  min-height: calc(100vh - 170px);
}
.login-bc {
  background: rgba(0, 0, 0, 0.5);
  // z-index: 1355;
}
</style>