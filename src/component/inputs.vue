<template>
  <div :class="class" class="flex-line __inputs zi-100 rel ai-c">
    <svg v-if="value" @click="inputClose" class="abs zi-120 hand input-svg abst ar6" viewBox="0 0 1024 1024" style="fill:#aaa" width="16" height="16">
      <path d="M512 102.4A409.6 409.6 0 1 0 921.6 512 409.6 409.6 0 0 0 512 102.4z m181.248 518.144a51.2 51.2 0 0 1-72.704 72.704L512 584.192 403.456 693.248a51.2 51.2 0 0 1-72.704-72.704L439.808 512 330.752 403.456a51.2 51.2 0 0 1 72.704-72.704L512 439.808l108.544-109.056a51.2 51.2 0 0 1 72.704 72.704L584.192 512z">
      </path>
    </svg>
    <input ref="inputs" :placeholder="placeholder" :class="{'ipt-small':size=='small','ipt-big':size=='big'}" class="ipt w-all ra-4 rel zi-110" @input="handSelect" v-model="value" :maxlength="max" :disabled="disabled" :type="type">
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Emit } from 'vue-property-decorator';
export default class Input extends Vue {
  $refs;
  @Prop({ type: [String], default: "text" }) type;
  @Prop({ type: [String], default: "small" }) size;
  @Prop({ type: [String], default: "" }) placeholder;
  @Prop({ type: String, default: "" }) class;
  @Prop({ type: [String], default: "" }) max;
  @Prop({ type: [Boolean], default: false }) disabled;
  @Model('modelValue', { type: [String, Number], default: "" }) value;
  isShow = false;
  @Emit('input')
  handSelect() {
    return this.value
  }

  @Emit('close')
  inputClose() {
    this.$emit('update:modelValue', "");
    this.$refs.inputs.focus();
    return ""
  }
}
</script>

<style lang='less'>
.__inputs {
  svg {
    display: none;
  }
  &:hover {
    svg {
      display: block !important;
    }
  }
}
</style>