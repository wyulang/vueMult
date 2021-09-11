<template>
  <div class="w-all bc-f6 m-height">
    <div class="w-1300 m-auto">
      <section class="flex w-all m-height">
        <menus></menus>
        <div class="flex-1 bc-fff mt20 pl50 pt30 mb20 ml30">
          <div class="flex ai-c">
            <span class="wi-90 fb fs-16">旧密码：</span>
            <input class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">新密码：</span>
            <input class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16">确认密码：</span>
            <input class="ipt ipt-big w-300" type="text">
          </div>
          <div class="flex mt30 ai-c">
            <span class="wi-90 fb fs-16"></span>
           <div class="btn btn-small ra-5 btn-primary">保存</div>
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
}
</script>

<style lang='less'>
.m-height {
  min-height: calc(100vh - 170px);
}
</style>