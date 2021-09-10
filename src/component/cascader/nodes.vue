<template>
  <scrollbar v-if="isFirst" :class="{'bl-d':level}" height="180">
    <div class="flex fd-c cascader wi-120 auto pl10 pr10 auto">
      <div  :class="{'select-item':item[parm.value]==path[parm.value],'is-check':isCheck}" @click="setNodeValue(item,index)" v-for="(item,index) in list" class="flex ai-c cascader-item hand jc-b h-35">
        <span class="cascader-titles nowrap">{{item[parm.label]}}</span>
        <div v-if="item.len" class="flex w-16">
          <span class="cascader-arrow mt9"></span>
          <div @click="setNodeValue(item,index,true)" class="ra-3 hide b-8 checks w-16 h-16"></div>
        </div>
      </div>
    </div>
  </scrollbar>
  <cascader-node :times="times" v-if="path.len>0&&isRefresh" :isCheck="isCheck" :parm="parm" :sValue="sValue" v-model="value" @setValue="changeNodeValue" :level="currLevel" :data="path.children"></cascader-node>
</template>

<script lang='ts'>
import { Vue, Options, Prop, Model, Emit, Watch } from 'vue-property-decorator';
import scrollbar from '../scroll.vue';
@Options({
  name: "cascader-node",
  components: {
    scrollbar
  }
})
export default class nodes extends Vue {
  @Prop({ type: Function }) lazy;
  @Prop({ type: Number, default: false }) times;
  @Prop({ type: [Number,String], default: 0 }) look;
  @Prop({ type: Object, default: false }) parm;
  @Prop({ type: Boolean, default: false }) isCheck;
  @Prop({ type: Number, default: 0 }) level;
  @Model('modelValue', { type: [String, Number, Boolean, Object], default: "" }) value;
  @Prop({ type: [String, Number, Boolean, Object], default: "" }) sValue;
  @Prop({ type: Array, default: [] }) data;
  isRefresh = true;
  currValue: any = {}
  isFirst = true;

  get currLevel(){
    return this.level+1
  }

  @Watch('times')
  changeTimes() {
    if (this.times == 1) {
      this.isFirst = false;
      this.$nextTick(() => {
        this.isFirst = true;
      })
    }
  }

  mounted(){
  }

  get path() {
    let len = this.value.length || this.sValue.length;
    if (len) {
      let curr = this.value.slice(0, len);
      let old = this.sValue.slice(0, len);
      if (curr[this.level]) {
        return curr[this.level]
      } else if (old[this.level]) {
        return old[this.level]
      } else {
        return {}
      }
    } else {
      return {}
    }
  }

  setNodeValue(data, index,check=false) {
    // if (this.value[this.level] && this.value[this.level][this.parm.value] == data[this.parm.value]&&!check) {
    //   return
    // }
    this.currValue=data;
    let val: any = [].concat(this.value || []);
    val[this.level] = data;
    let sel = [].concat(val).slice(0, this.level + 1);
    this.$emit('update:modelValue', sel);
    if(check){
      this.changeNodeValue(sel);
      return;
    }
    if (this.lazy && !data.isLoader) {
      this.lazy(data).then(res => {
        if (res && res.length) {
          this.data[index].len = res.length;
          this.data[index].isLoader = true;
          this.data[index].children = res;
          this.onRefresh();
        } else {
          this.changeNodeValue(sel);
        }
      })
    } else {
      if (!data.len) {
        this.changeNodeValue(sel);
      } else {
        this.onRefresh();
      }
    }
  }

  @Emit('setValue')
  changeNodeValue(value) {
    return value
  }

  onRefresh() {
    this.isRefresh = false;
    this.$nextTick(() => {
      this.isRefresh = true;
    })
  }

  get list() {
    if (this.data.length) {
      return this.data.map(v => {
        let len = v[this.parm.child] && v[this.parm.child].length || 0;
        return {
          value: v[this.parm.value], label: v[this.parm.label], select: v.select == undefined ? false : v.select, children: v[this.parm.child] || [], len, ...v
        }
      })
    } else {
      return []
    }
  }

}
</script>

<style lang='less'>
</style>