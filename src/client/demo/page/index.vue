<template>
  <div @click="total=total+10" class="flex hv-all">
    <scroll @scroll="onScroll">
      <div v-for="item in total" class="flex w-all pp10">HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</div>
    </scroll>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
// import citys from '@lib/city';
export default class App extends Vue {
  // list=citys;
  list = "";
  total = 10;
  value = true

  onScroll(data) {
    console.log(data)
    if (data.isBottom) {
      this.total = this.total + 10;
    }
  }
  mounted() {

  }
}
</script>

<style lang='less'>
</style>