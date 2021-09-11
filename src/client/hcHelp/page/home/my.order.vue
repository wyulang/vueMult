<template>
  <div class="w-all bc-f6 m-height">
    <div class="w-1300 m-auto">
      <section class="flex w-all m-height">
        <menus></menus>
        <div class="flex-1 bc-fff mt20 pl50 pr50 pt30 mb20 ml30">
          <table class="table w-all">
            <thead>
              <tr>
                <td>订单编号</td>
                <td>产品名称</td>
                <td>品牌名称</td>
                <td>收货人</td>
                <td>手机号</td>
                <td>收货地址</td>
                <td>订单时间</td>
              </tr>
            </thead>
          </table>
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