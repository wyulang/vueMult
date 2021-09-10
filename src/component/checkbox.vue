<template>
  <div :class="class" @click="handSelect(item)" v-for="(item, index) in checkArray(data)" :key="index" class="flex hand flex-line ai-c">
    <svg t="1624104631224" class="icon" :style="{'fill':color[setColor(item)]}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3126" :width="size" :height="size">
      <path v-if="!setColor(item)"
        d="M887.466667 1024h-750.933334c-75.093333 0-136.533333-61.44-136.533333-136.533333V136.533333c0-75.093333 61.44-136.533333 136.533333-136.533333h750.933334c75.093333 0 136.533333 61.44 136.533333 136.533333v750.933334c0 75.093333-63.146667 136.533333-136.533333 136.533333z m-134.826667-735.573333L433.493333 628.053333l-153.6-165.546666-71.68 76.8 225.28 242.346666 390.826667-414.72-71.68-78.506666z">
      </path>
      <path v-else
        d="M171.434667 85.333333A86.186667 86.186667 0 0 0 85.333333 171.434667V852.48A86.186667 86.186667 0 0 0 171.434667 938.666667H852.48A86.186667 86.186667 0 0 0 938.666667 852.565333V171.52A86.186667 86.186667 0 0 0 852.565333 85.333333H171.52z m0-85.333333H852.48C947.029333 0 1024 76.8 1024 171.434667V852.48A171.52 171.52 0 0 1 852.565333 1024H171.52A171.52 171.52 0 0 1 0 852.565333V171.52C0 76.970667 76.8 0 171.434667 0z">
      </path>
    </svg>
    <span class="ml6" v-if="item.label">{{item.label}}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Emit, Model } from 'vue-property-decorator';
import { isArray } from '../../lib/lang';
export default class checkbox extends Vue {
  @Prop({ type: [Array, String, Boolean, Number], default: "$$" }) data;
  @Prop({ type: [Array, String], default: ['#3699ff', '#888'] }) color;
  @Prop({ type: [Array, String], default: [] }) icon;
  @Prop({ type: Number, default: 20 }) size;
  @Prop({ type: String, default: "" }) class;
  @Model('modelValue', { type: [Array, String, Number, Boolean], default: false }) value;

  @Emit('change')
  handSelect(item) {
    let val;
    if (isArray(this.data)) {
      let dal = this.value && this.value.map(v => String(v)) || []
      if (dal.includes(String(item.value))) {
        val = this.value.filter(v => String(v) != String(item.value));
      } else {
        this.value.push(item.value);
        val=this.value;
      }
    } else {
      if (this.data == '$$') {
        val = !this.value;
      } else {
        val = String(this.data) == String(this.value)
      }
    }
    this.$emit('update:modelValue', val);
    return val;
  }

  checkArray(data) {
    return isArray(data) ? data : [data]
  }

  private setColor(item) {
    let val: any;
    let isGroup = false;
    if (isArray(this.data)) {
      val = this.value && this.value.map(v => String(v)) || []
      isGroup = true;
    }
    if (isGroup) {
      let inv = String(item.value);
      if (val.includes(inv)) {
        return 0
      } else {
        return 1;
      }
    } else {
      if (this.data == '$$') {
        console.log(this.value)
        if (this.value) {
          return 0
        } else {
          return 1;
        }
      } else {
        if (String(this.data) == String(this.value)) {
          return 0;
        } else {
          return 1
        }
      }
    }
  }
}
</script>

<style lang='less'>
</style>