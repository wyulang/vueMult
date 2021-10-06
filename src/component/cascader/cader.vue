<template>
  <div :class="class">
    <div @click="upCascader" class="rel zi-100 w-all hand">
      <input readonly :disabled="disabled" ref="cascaderInput" :placeholder="placeholder" v-model="path" :class="{'ipt-small':size=='small','ipt-big':size=='big','is-select':visible}" class="w-all hand ipt" type="text">
      <svg class="abs ar5 abst" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <path d="M346.453333 396.373333L512 561.92l165.546667-165.546667a42.496 42.496 0 1 1 60.16 60.16l-195.84 195.84a42.496 42.496 0 0 1-60.16 0L285.866667 456.533333a42.496 42.496 0 0 1 0-60.16c16.64-16.213333 43.946667-16.64 60.586666 0z" fill="#aaa" p-id="7823"></path>
      </svg>
    </div>

    <div v-if="data&&data.length" @click.stop v-show="visible" class="h-1 zi-8888 rel">
      <div :style="currPosit" class="abs al0 h-1 w-all at0">
        <div class="flex-line ra-3 sha-card bc-fff b-e mt2 pt5 pb5">
          <nodes @setValue="setValue" @setPosition="setPosition" :look="look" :parm="parm" :isCheck="check" :times="expTiem" :lazy="lazy" :sValue="currValue" v-model="selectValue" :data="data"></nodes>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Options, Emit } from 'vue-property-decorator';
import { isString, isArray, isObject } from '../../../lib/lang';
import nodes from './nodes.vue';
@Options({
  components: {
    nodes
  }
})
export default class pan extends Vue {
  @Prop({ type: Function }) lazy;
  @Prop({ type: Boolean, default: false }) isOne;
  @Prop({ type: [Number, String], default: 0 }) look;
  @Prop({ type: Boolean, default: false }) check;
  @Prop({ type: [String, Number, Boolean], default: false }) disabled;
  @Prop({ type: Array, default: [] }) data!: any;
  @Prop({ type: [Array, Object, String], default: ['label', 'value'] }) props;
  @Model('modelValue', { type: [String, Number, Boolean, Object], default: "" }) value;
  @Prop({ type: String, default: "w-all" }) class;
  @Prop({ type: String, default: "" }) placeholder;
  @Prop({ type: String, default: "small" }) size;
  // 当一个页面使多次使用时，可根据类型分别给值
  @Prop({ type: [String, Number, Boolean], default: "1" }) type;
  visible = false;
  currValue: any = [];
  expTiem = 0;
  selectValue: any = []
  gvalue = "";
  digWidth = 0;
  digHeight = 0;

  get path() {
    let isNext = true;
    if (this.value == this.gvalue && (!this.value && !this.gvalue)) {
      isNext = false;
    }
    if (this.value && this.data.length) {
      if (isNext) {
        if (this.isOne) {
          this.getOneValue(this.data)
          this.isEnd = false;
        } else {
          this.getValue(this.data)
        }
      }
      this.selectValue = this.currValue;
      if (this.isOne) {
        this.gvalue = this.currValue && this.currValue.length && this.currValue[this.currValue.length - 1][this.parm.value] || ""
        return this.currValue && this.currValue.length && this.currValue[this.currValue.length - 1][this.parm.label] || ""
      } else {
        if (this.currValue && this.currValue.length > 0) {
          this.gvalue = this.currValue.map((item => item[this.parm.value]));
          return this.currValue.map(item => item[this.parm.label]).join('/');
        }
      }
    } else {
      this.currValue = []
      this.selectValue = []
      return ""
    }
  }

  upCascader() {
    if (this.disabled) return;
    if (this.visible) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }
    this.expTiem = this.expTiem + 1;
    document.addEventListener("click", this.setSelectPop);
  }

  setValue(value) {
    this.visible = false;
    this.currValue = value;
    this.gvalue = "";
    let curr = value.map(v => v[this.parm.value]);
    if (this.isOne) {
      curr = value[value.length - 1][this.parm.value];
      this.changeNodeValue({ value: curr, item: value[value.length - 1], type: this.type });
    } else {
      this.changeNodeValue({ value: curr, item: value, type: this.type });
    }
    this.$emit('update:modelValue', curr);
  }

  setPosition(v) {
    this.digWidth = v;
  }

  mounted() {
    this.digHeight = document.body.scrollHeight;
  }

  getElementLeft() {
    if (!this.$refs.cascaderInput) return { left: 0, top: 0 };
    let element: any = this.$refs.cascaderInput;
    var left = element.offsetLeft;
    var top = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
      left += current.offsetLeft;
      top += current.offsetTop;
      current = current.offsetParent;
    }

    return { left, top };
  }

  get currPosit() {
    let top = 0;
    if (this.visible) {
      top = this.$el.offsetTop + 214
    }
    let height = this.digHeight;
    let width = document.documentElement.clientWidth;
    let left = this.getElementLeft().left + this.digWidth;
    let style = "";
    if (left > width) {
      style = `left:-${left - width + 2}px;`;
    }
    if (top > height) {
      style += `top:-228px;`
    }
    return style;
  }

  @Emit('change')
  changeNodeValue(data) {
    return data
  }

  getValue(list, len = 0) {
    if (len < this.value.length) {
      let curr = list.find(v => v[this.parm.value] == this.value[len]);
      let dal: any = null;
      if (curr) {
        dal = Object.assign({}, curr);
        dal.len = curr[this.parm.child] && curr[this.parm.child].length || 0;
      }
      this.currValue[len] = dal;
      if (dal.len) {
        this.getValue(this.currValue[len][this.parm.child], len + 1)
      }
    }
  }

  oneValue: any = [];
  isEnd = false;
  getOneValue(list: any = [], len = 0) {
    if (this.isEnd) return;
    let l = list.length;
    for (let i = 0; i < l; i++) {
      let item = list[i];
      item.len = item.children && item.children.length;
      this.oneValue[len] = item;
      if (String(item[this.parm.value]) === String(this.value)) {
        this.currValue = [].concat(this.oneValue.slice(0, len + 1));
        this.oneValue = [];
        this.isEnd = true;
        break;
      } else {
        if (item[this.parm.child] && item[this.parm.child].length) {
          this.getOneValue(item[this.parm.child], len + 1)
        }
      }
    }
  }

  get parm() {
    let label = "label";
    let value = "value";
    let child = "children";
    if (this.props) {
      if (isString(this.props)) {
        let obj = this.props.split(',');
        if (obj[0]) {
          label = obj[0];
        }
        if (obj[1]) {
          value = obj[1]
        }
        if (obj[2]) {
          child = obj[2]
        }
      } else if (isArray(this.props)) {
        if (this.props[0]) {
          label = this.props[0];
        }
        if (this.props[1]) {
          value = this.props[1]
        }
        if (this.props[2]) {
          child = this.props[2]
        }
      } else if (isObject(this.props)) {
        label = this.props.label;
        value = this.props.value;
        child = this.props.children;
      }
    }
    return { label, value, child }
  }

  setSelectPop(e) {
    if (!this.$el.contains(e.target)) {
      this.visible = false;
      document.removeEventListener('click', this.setSelectPop)
    }
  }
}
</script>

<style lang='less'>
.cascader {
  .cascader-item {
    .cascader-arrow {
      width: 8px;
      height: 8px;
      border-top: 1.4px solid #999;
      border-right: 1.4px solid #999;
      -webkit-transform: translate3d(0, -50%, 0) rotate(45deg);
      transform: translate3d(0, -50%, 0) rotate(45deg);
    }
  }
  .is-check {
    &:hover {
      .cascader-arrow {
        display: none;
      }
      .checks {
        display: inline-block;
      }
    }
  }
  .select-item {
    .cascader-arrow {
      border-top-color: #409eff !important;
      border-right-color: #409eff !important;
    }
    .cascader-titles {
      color: #409eff !important;
    }
  }
}
</style>