<template>
  <section :class="class" :style="scrollStyle" @mouseleave="e=>{visible=false}" @mousemove="e=>{visible=true}" ref="scrollBar" class="scrollbar rel h-all">
    <section v-if="isRels" ref="wrap" @scroll="netScroll" class="scrollbar-contaniner h-all w-all">
      <slot></slot>
    </section>
    <transition name="scrollbar-fade">
      <section ref="instance" v-show="visible" class="scrollbar__bar" @mousedown="clickTrackHandler">
        <div ref="thumb" class="scrollbar__thumb" :style="thumbStyle" @mousedown="clickThumbHandler"></div>
      </section>
    </transition>
  </section>
</template>

<script lang='ts'>
import { Vue, Ref, Prop, Emit } from 'vue-property-decorator';
import { off, on } from '../../lib/lang';
export default class App extends Vue {
  @Prop({ type: [String, Number], default: 0 }) maxHeight;
  @Prop({ type: [String, Number], default: 0 }) height;
  @Prop({ type: Boolean, default: false }) auto;
  @Prop({ type: String, default: "" }) class;
  @Ref('scrollBar') scroll;
  @Ref('instance') instance;
  @Ref('thumb') thumb;
  @Ref('wrap') wrap;
  moveY = 0;
  moveX = 0;
  visible = false;
  cursorDown = false;
  scrollHeight: any = 0;
  scrollStyle = "";
  barStore = {};
  isRels = true;
  cursorLeave;
  onselectstartStore: any = null;
  bar = {
    offset: 'offsetHeight', scroll: 'scrollTop', scrollSize: 'scrollHeight',
    size: 'height', key: 'vertical', axis: 'Y', client: 'clientY', direction: 'top',
  }

  get thumbStyle() {
    const style = {} as any
    let translate = `translateY(${this.moveY}%)`;
    style.height = this.scrollHeight
    style.transform = translate
    style.msTransform = translate
    style.webkitTransform = translate
    return style
  }

  update() {
    let boxHeight = 0;
    let scrollHeight = 0;
    let maxheight: any = this.maxHeight;
    if (this.maxHeight && typeof this.maxHeight == "string") {
      maxheight = this.maxHeight.replace(/[^\d]/g, '');
    }

    if (this.height) {
      boxHeight = this.height
    } else if (maxheight) {
      boxHeight = this.wrap.clientHeight <= maxheight ? this.wrap.clientHeight : maxheight;
    } else {
      boxHeight = this.scroll.clientHeight;
    }

    scrollHeight = (boxHeight * 100) / this.wrap.scrollHeight;
    this.scrollHeight = scrollHeight < 100 ? scrollHeight + '%' : '';
    this.scrollStyle = `height:${boxHeight}px;`;

    if (this.auto) {
      this.$nextTick(() => {
        let half = this.wrap.scrollHeight / 2.5;
        this.moveY = (half * 100) / this.wrap.clientHeight;
        this.wrap.scrollTop = this.moveY;
      })
    }
  }

  @Emit('scroll')
  emitScroll(value) {
    return value
  }

  netScroll(e) {
    if (this.wrap) {
      this.moveY = (this.wrap.scrollTop * 100) / this.wrap.clientHeight
      let isBottom = (this.wrap.clientHeight + this.wrap.scrollTop) == this.wrap.scrollHeight
      this.emitScroll({
        scrollTop: this.moveY,
        isBottom
      })
    }
  }


  clickTrackHandler(e) {
    const offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client])
    const thumbHalf = (this.thumb[this.bar.offset] / 2)
    const thumbPositionPercentage = ((offset - thumbHalf) * 100 / this.instance[this.bar.offset])

    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
  }

  clickThumbHandler(e) {
    e.stopPropagation()
    if (e.ctrlKey || [1, 2].includes(e.button)) {
      return
    }
    (document as any).getSelection().removeAllRanges()
    this.startDrag(e)
    this.barStore[this.bar.axis] = (e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]))
  }

  startDrag(e) {
    e.stopImmediatePropagation()
    this.cursorDown = true
    on(document, 'mousemove', this.mouseMoveDocumentHandler)
    on(document, 'mouseup', this.mouseUpDocumentHandler)
    this.onselectstartStore = document.onselectstart
    document.onselectstart = () => false
  }

  mouseMoveDocumentHandler(e) {
    if (this.cursorDown === false) return
    const prevPage = this.barStore[this.bar.axis]

    if (!prevPage) return

    const offset = ((this.instance.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]) * -1)
    const thumbClickPosition = (this.thumb[this.bar.offset] - prevPage)
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 / this.instance[this.bar.offset])
    this.wrap[this.bar.scroll] = (thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100)
  }

  mouseUpDocumentHandler() {
    this.cursorDown = false
    this.barStore[this.bar.axis] = 0
    off(document, 'mousemove', this.mouseMoveDocumentHandler)
    document.onselectstart = this.onselectstartStore
    if (this.cursorLeave) {
      this.visible = false
    }
  }

  mounted() {
    this.update();
  }
}
</script>

<style lang='less'>
.scrollbar {
  .scrollbar-contaniner {
    scrollbar-width: none;
    -ms-overflow-style: none;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .scrollbar__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    width: 7px;
    top: 2px;
  }

  .scrollbar__thumb {
    position: relative;
    width: 100%;
    cursor: pointer;
    border-radius: inherit;
    background-color: rgba(144, 147, 153, 0.5);
    transition: background-color 0.3s;
  }

  .scrollbar__thumb:hover {
    background-color: rgba(144, 147, 153, 0.5);
  }

  .scrollbar-fade-enter-active {
    transition: opacity 0.34s ease-out;
  }

  .scrollbar-fade-leave-active {
    transition: opacity 0.12s ease-out;
  }

  .scrollbar-fade-enter-from,
  .scrollbar-fade-leave-active {
    opacity: 0;
  }
}
</style>