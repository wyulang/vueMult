<template>
  <div class="rel">
    <span ref="trigger">
      <slot></slot>
    </span>
    <transition>
      <div class="abs ra-4">

      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: String, default: '#fff' }) fcolor;
  @Prop({ type: String, default: '#303133' }) bcolor;
}
</script>

<style lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>