<template>
  <div ref="selects" :class="class" class="_selects">
    <div @click="upSelect" class="rel hand">
      <input readonly :placeholder="placeholder" v-model="currValue[sLabel]"  :class="{'ipt-small':size=='small','ipt-big':size=='big','is-select':visible}" class="w-all hand ipt" type="text">
      <svg class="abs ar5 abst" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7822" width="20" height="20">
        <path d="M346.453333 396.373333L512 561.92l165.546667-165.546667a42.496 42.496 0 1 1 60.16 60.16l-195.84 195.84a42.496 42.496 0 0 1-60.16 0L285.866667 456.533333a42.496 42.496 0 0 1 0-60.16c16.64-16.213333 43.946667-16.64 60.586666 0z" fill="#aaa" p-id="7823"></path>
      </svg>
    </div>
    <transition v-if="isRefresh">
      <div style="height:0;" @click.stop v-if="visible" class="w-all zi-8888 rel">
        <div class="h-3 w-all"></div>
        <div class="_selects_dropdown bc-fff al0 pt5 pb5">
          <scrollbar maxHeight="220" @scroll="scroll">
            <div class="flex w-all fd-c">
              <div :class="{'_is_select fb':currValue[sValue]==item[sValue]}" @click="selectItem(item)" v-for="(item,index) in data" class="hand h-34">
                <slot>
                  <div :class="setStyle(item)" class="flex  h-all w-all pl15 ai-c">{{item[sLabel]}}</div>
                </slot>
              </div>
            </div>
          </scrollbar>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Options, Ref, Model, Emit } from 'vue-property-decorator';
import { isString, isArray, isObject } from '../../lib/lang';
import scrollbar from './scroll.vue';
@Options({
  components: {
    scrollbar
  }
})
export default class selects extends Vue {
  @Prop({ type: String, default: "w-all" }) class;
  @Prop({ type: String, default: "" }) placeholder;
  @Prop({ type: Array }) disList;
  @Prop({ type: Number, default: 0 }) index;
  @Prop({ type: String, default: "small" }) size;
  @Prop({ type: [String, Object, Array], default: "" }) props;
  @Model('modelValue', { type: [String, Number, Boolean], default: "" }) value;
  @Prop({ type: Array, default: [] }) data!: any;
  @Ref('selects') selects;
  sLabel = "label";
  sValue = "value"
  visible = false;
  iHeight = 34;
  isRefresh = true;
  isOpen = false;
  boxHeight = 0;
  isMaxHeight = false;
  scroll(e) {
  }

  setStyle(item) {
    let curr = item[this.sValue];
    if (this.disList && curr != String(this.value)) {
      if (this.disList.some(v => String(item[this.sValue]) == String(v))) {
        return "is_dis"
      } else {
        return "_select_hover"
      }
    } else {
      return "_select_hover"
    }
  }



  get currValue() {
    let item = this.data.find(v => { return v[this.sValue] == this.value });
    if (item) {
      return item
    } else {
      return { [this.sLabel]: "", [this.sValue]: "" }
    }
  }

  onRefresh() {
    this.isRefresh = false;
    this.isOpen = true;
    this.$nextTick(() => {
      this.isRefresh = true;
    })
  }

  setValue() {
    let label = "label";
    let value = "value";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
      }
    }
    this.sLabel = label;
    this.sValue = value;
  }

  upSelect() {
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }
    document.addEventListener("click", this.setSelectPop);
    if (!this.isOpen) {
      this.onRefresh();
    }
  }

  mounted() {
    this.setValue();
  }

  selectItem(item) {
    let curr = item[this.sValue];
    if (this.disList && curr != String(this.value)) {
      if (this.disList.some(v => String(item[this.sValue]) == String(v))) {
        return ;
      } 
    }
    this.visible = false;
    this.$emit('update:modelValue', item[this.sValue]);
    this.handSelect(item)
    document.removeEventListener('click', this.setSelectPop)
  }

  @Emit('change')
  handSelect(item) {
    return { value: item[this.sValue], item, index: this.index }
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }

  beforeUnmount() {
    document.removeEventListener('click', this.setSelectPop);
  }
}
</script>

<style lang='less'>
._selects {
  .is-select {
    border-color: #57a3f3;
  }
  ._select_hover {
    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
  .is_dis {
    color: #c0c4cc;
    cursor: not-allowed;
  }
  ._is_select {
    color: #409eff;
  }
  ._selects_dropdown {
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }
}
</style>