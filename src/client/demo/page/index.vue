<template>
  <div @click="total=total+10" class="flex hv-all">
    <selects class="w-150" v-model="value" :data='list'></selects>
  </div>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
// import citys from '@lib/city';
export default class App extends Vue {
  // list=citys;
  list = [{value:"1",label:"pppppppp"},{value:"2",label:"DDDddd"}];
  total = 10;
  value = ""

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