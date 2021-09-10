<template>
  <transition name="dialog">
    <section v-if="modelValue" :id="zindex" :style="{'z-index':zindex}" class="_dialog" ref='digBox'>
      <div v-if="isModel" @click="fullClose&&closeWin()" :style="{'z-index':zindex+1}" class="model"></div>
      <section ref='dialog' class="_dialog_body" :style='{top:top+"px",left:left+"px","min-width":setWidth,height:"min-height"+"px"}'>
        <!-- 头部 -->
        <div v-if="isHeader" @mousedown='startMove' class="_dialog_title" data-type='move'>
          <span v-html="title"></span>
          <div @click.stop="closeWin">
            <span class="_diglog_close">✖</span>
          </div>
        </div>
        <!-- body -->
        <div class="_dialog_box">
          <slot></slot>
        </div>
        <!-- bottom -->
        <div class="_dialog_bottom">
          <slot name="footer"></slot>
        </div>
      </section>
    </section>
  </transition>
</template>

<script lang='ts'>
import { Vue, Prop, Model, Watch,Ref } from 'vue-property-decorator';
export default class dig extends Vue {
  @Prop({ default: true, type: Boolean }) fullClose;
  @Prop({ default: true, type: Boolean }) isHeader;
  @Prop({ default: true, type: Boolean }) isModel;//显示遮罩层？
  @Prop({ default: 300, type: [String, Number] }) width;
  @Prop({ default: 100, type: [String, Number] }) height;
  @Prop({ default: '标题', type: String }) title;
  @Model('modelValue', { type: Boolean, default: false }) value!: boolean
  @Ref('dialog') dialog;

  startX: Number = 0;
  startY: Number = 0;
  oldTop: Number = 0;
  oldLeft: Number = 0;
  top: Number = 0;
  left: Number = 0;
  max: Boolean = false;
  zindex: Number = 1000;

  get setWidth() {
    if (this.width.includes('%')) {
      return this.width;
    } else if (!isNaN(this.width)) {
      return this.width + 'px';
    }
    return this.width
  }

  private initSize() {
    let width=Number(String(this.width).replace(/[^\d]/g,""));
    let height=Number(String(this.width).replace(/[^\d]/g,""));
    this.top = this.oldTop = (document.documentElement.clientHeight - height) / 4;
    this.left = this.oldLeft = (document.documentElement.clientWidth - width) / 2;
  }

  private startMove(e) { // 鼠标按下
    if (e.button === 0) { // 鼠标左键按下
      let x = e.pageX - this.dialog.offsetLeft;  // 鼠标与窗口边框距离
      let y = e.pageY - this.dialog.offsetTop;
      let maxW = window.innerWidth; // 最大拖动位置（不能拖离页面可视区）
      let maxH = window.innerHeight;
      document.onmousemove = (e) => { // 鼠标移动
        let loginX = e.pageX;
        let loginY = e.pageY;
        if (loginX < 0) loginX = 0;
        if (loginX > maxW) loginX = maxW;
        if (loginY < 0) loginY = 0;
        if (loginY > maxH) loginY = maxH;
        this.dialog.style.left = loginX - x + 'px';  // 设置窗口位置，跟随鼠标移动
        this.dialog.style.top = loginY - y + 'px';
      }
      document.onmouseup = (el) => {  // 鼠标抬起，清除鼠标移动事件
        document.onmousemove = null;
      }
    }
  }
  private closeWin() {
    this.$emit('update:modelValue', false)
    this.initSize();
  }

  private maxWin() {
    this.max = !this.max;
    if (this.max) {
      this.top = 0;
      this.left = 0;
    } else {
      this.top = this.oldTop;
      this.left = this.oldLeft;
    }
  }


  @Watch('modelValue')
  btnModel(newVal, oldVal) {
    let dig: any = document.getElementsByClassName('_dialog');
    let maxZindex: any = 1000;
    if (newVal) {
      if (dig.length) {
        dig.forEach((item, index) => {
          item.children[0].style.display = "none";
          if (maxZindex < parseInt(item.style.zIndex)) {
            maxZindex = parseInt(item.style.zIndex);
          }
        });
      }

      if (this.zindex == 1000) {
        this.zindex = parseInt(maxZindex) + 1;
      }
    } else {
      if (dig.length > 1) {
        let ids: any = [];
        dig.forEach((v, index) => {
          ids.push({ id: parseInt(v.id), index: index });
        })
        let item = ids.sort((a, b) => { return a.id - b.id })[ids.length - 2];
        dig[item.index].children[0].style.display = "";
      }
    }
  }

  mounted() {
    this.initSize()
  }
}
</script>

<style lang='less'>
._dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .model {
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-color: #000;
  }
  ._dialog_body {
    min-width: 240px;
    background: #fff;
    position: absolute;
    margin: 0 auto;
    border-radius: 5px;
    min-height: 30px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    ._dialog_title {
      height: 45px;
      cursor: move;
      align-items: center;
      user-select: none;
      width: 100%;
      background-color: #f2f2f2;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      display: flex;
      span {
        flex: 1;
        font-size: 15px;
        margin-left: 15px;
      }
      ._diglog_close {
        width: 33px;
        margin-right: 10px;
        cursor: pointer;
        font-size: 18px;
        padding: 10px 0;
      }
    }
    ._dialog_box {
      flex: 1;
      width: 100%;
    }
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s;
}
.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: all 0.2s;
}
.dialog-enter .dialog,
.dialog-leave-to .dialog {
  transform: scale3d(0.1, 0.1, 0.1);
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>