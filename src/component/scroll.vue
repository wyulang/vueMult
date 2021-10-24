<template>
  <section :style="sHeight" class="scrollbar rel h-all">
    <main ref="main" @scroll="onScroll" @mouseleave="e=>{visible=false}" @mousemove="e=>{visible=true}" class="h-all scrollbar-contaniner w-all">
      <slot></slot>
    </main>

    <transition name="scrollbar-fade">
      <section ref="instance" v-show="visible" class="scrollbar__bar" @mousedown="clickTrackHandler">
        <div ref="thumb" class="scrollbar__thumb" :style="thumbStyle" @mousedown="clickThumbHandler"></div>
      </section>
    </transition>
  </section>
</template>

<script lang='ts'>
import { Vue, Prop, Ref, Emit } from 'vue-property-decorator';
import { off, on } from '../../lib/lang';
export default class App extends Vue {
  @Prop({ type: [String, Number], default: 0 }) width;
  @Prop({ type: [String, Number], default: 0 }) maxHeight;
  @Prop({ type: [String, Number], default: 0 }) height;
  @Prop({ type: Boolean, default: false }) auto;
  mainHeight = 0;
  bodyHeight = 0;
  oldHeight = 0;
  mainWidth = 0;
  getLevel = 0;
  visible = true;
  moveY = 0;
  @Ref('instance') instance;
  @Ref('thumb') thumb;
  cursorDown = false;
  barStore = {};
  onselectstartStore: any = null;
  cursorLeave;
  // scrollHeight: any = 0;
  bar = {
    offset: 'offsetHeight', scroll: 'scrollTop', scrollSize: 'scrollHeight',
    size: 'height', key: 'vertical', axis: 'Y', client: 'clientY', direction: 'top',
  }

  mounted() {
    this.initHeight();
  }

  // 最大高度
  get mheight() {
    let curr: any = this.maxHeight;
    if (curr && typeof curr == "string") {
      curr = curr.replace(/[^\d]/g, '');
    }
    return Number(curr)
  }

  get heights() {
    let curr: any = this.height;
    if (curr && typeof curr == "string") {
      curr = curr.replace(/[^\d]/g, '') || 0;
    }
    return curr
  }

  //当未设height/maxHeight时，取父级高度，直到取到高度为止
  getPrentHeight(el) {
    if (el.parentNode.clientHeight) {
      return el.parentNode.clientHeight
    } else {
      this.getPrentHeight(el.parentNode)
    }
  }

  initHeight() {
    let curr = 0;
    if (this.$el) {
      this.bodyHeight = this.$el.firstElementChild.scrollHeight;
      curr = this.$el.firstChild.clientHeight || this.getPrentHeight(this.$el)
    }
    if (this.mheight) {
      let child = this.$el.firstElementChild.scrollHeight;
      if (child < this.mheight) {
        curr = child;
      } else {
        curr = this.mheight;
      }
    }
    if (this.heights) {
      curr = this.heights;
    }
    this.mainHeight = curr;
  }

  updated() {
    let curr = this.$el.firstChild.scrollHeight || 0;
    if (curr > this.bodyHeight && this.bodyHeight) {
      this.initHeight();
    }
  }

  get sHeight() {
    return `height:${this.mainHeight}px;`
  }

  @Emit('scroll')
  changeScroll(value) {
    return value
  }

  @Ref('main') wrap;
  onScroll(e) {
    if (this.wrap) {
      this.moveY = (this.wrap.scrollTop * 100) / this.mainHeight
      let isBottom = (this.mainHeight + this.wrap.scrollTop) == this.bodyHeight
      this.changeScroll({
        scrollTop: this.moveY,
        isBottom
      })
    }
  }

  get scrollHeight() {
    let scrollHeight = (this.mainHeight * 100) / this.bodyHeight;
    return scrollHeight < 100 ? scrollHeight + '%' : '';
  }

  get thumbStyle() {
    console.log(this.scrollHeight, 'scrollHeight')
    const style = {} as any
    let translate = `translateY(${this.moveY}%)`;
    style.height = this.scrollHeight
    style.transform = translate
    style.msTransform = translate
    style.webkitTransform = translate
    return style
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