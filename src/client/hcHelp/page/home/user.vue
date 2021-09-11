<template>
  <div class="w-250 ra-5 bc-fff mt20 mb20">
    <div class="w-all flex pt30 pb30 jc-c fs-18 fc-primary fb ai-c">欢迎，王成文登录</div>

    <div class="mt30 flex fd-c">
      <div :class="{'fc-primary fb':$route.name=='user.info'}" @click="$router.push('/user/info')" class="flex jc-c mb20 hand fs-16 ai-c">个人资料</div>
      <div :class="{'fc-primary fb':$route.name=='user.order'}" @click="$router.push('/user/order')" class="flex jc-c mb20 hand fs-16 ai-c">我的订单</div>
      <div :class="{'fc-primary fb':$route.name=='user.password'}" @click="$router.push('/user/password')" class="flex jc-c mb20 hand fs-16 ai-c">修改密码</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
export default class App extends Vue {
}
</script>

<style lang='less'>
</style>