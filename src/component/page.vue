<template>
  <div v-if="isShow" class="flex-line">
    <!-- 上一页 -->
    <div @click="onPagerClick('prev')" class="w-27 hand h-27 flex ai-c jc-c bc-f4 ra-4"><svg style="width: 15px;height: 15px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872L387.872 512.032l318.016 318.016c18.752 18.752 18.752 49.12 0 67.872-9.344 9.408-21.632 14.08-33.92 14.08z"
          p-id="1105"></path>
      </svg></div>
    <!-- 第一页 -->
    <div @click="onPagerClick('page',1)" :class="{'fc-select':1==currPage}" class="hand wi-27 pl4 pr4 h-27 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">1</div>
    <!-- ...prev -->
    <div v-if="isPrev" @click="onPagerClick('moreprev')" class="w-27 h-27 flex ai-c ml10 hand jc-c bc-f4 ra-4">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2066">
        <path
          d="M175.79019 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.974257 50.238195 111.974257 111.975281C287.764448 573.732993 237.521137 623.975281 175.79019 623.975281L175.79019 623.975281zM511.708869 623.975281c-61.730946 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.244334-111.975281 111.975281-111.975281 61.737086 0 111.975281 50.238195 111.975281 111.975281C623.683127 573.732993 573.445956 623.975281 511.708869 623.975281L511.708869 623.975281zM847.632665 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.969141 50.238195 111.969141 111.975281C959.601806 573.732993 909.363611 623.975281 847.632665 623.975281L847.632665 623.975281zM847.632665 623.975281"
          p-id="2067"></path>
      </svg>
    </div>
    <!-- page -->
    <div @click="onPagerClick('page',item)" v-for="item in list" :class="{'fc-select':item==currPage}" class="hand wi-27 pl4 pr4 h-27 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">{{item}}</div>
    <!-- ...next -->
    <div v-if="isNext" @click="onPagerClick('morenext')" class="w-27 h-27 flex ai-c ml10 hand jc-c bc-f4 ra-4">
      <svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2066">
        <path
          d="M175.79019 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.974257 50.238195 111.974257 111.975281C287.764448 573.732993 237.521137 623.975281 175.79019 623.975281L175.79019 623.975281zM511.708869 623.975281c-61.730946 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.244334-111.975281 111.975281-111.975281 61.737086 0 111.975281 50.238195 111.975281 111.975281C623.683127 573.732993 573.445956 623.975281 511.708869 623.975281L511.708869 623.975281zM847.632665 623.975281c-61.737086 0-111.975281-50.242288-111.975281-111.974257 0-61.737086 50.238195-111.975281 111.975281-111.975281 61.730946 0 111.969141 50.238195 111.969141 111.975281C959.601806 573.732993 909.363611 623.975281 847.632665 623.975281L847.632665 623.975281zM847.632665 623.975281"
          p-id="2067"></path>
      </svg>
    </div>
    <!-- 最后一页 -->
    <div @click="onPagerClick('page',pageCount)" :class="{'fc-select':pageCount==currPage}" class="hand wi-27 pl4 pr4 h-27 flex ai-c jc-c fs-13 bc-f4 ra-4 ml5">{{pageCount}}</div>
    <!-- 下一页 -->
    <div @click="onPagerClick('next')" class="w-27 h-27 hand flex ai-c jc-c bc-f4 ra-4 ml5"><svg class="icon" style="width: 15px;height: 15px;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1115">
        <path
          d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84L335.2 813.632c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344 2.72-2.848 4.16-6.336 6.016-9.6z"
          p-id="1116"></path>
      </svg></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Emit, Watch } from 'vue-property-decorator';
export default class App extends Vue {
  @Prop({ type: [Number, String], default: 10 }) pageSize;
  @Prop({ type: [Number, String], default: 0 }) total;
  currPage = 1;
  pageCount = 1;
  starPage = 0;
  endPage = 0;
  isNext = false;
  isPrev = false;
  isShow = false;
  list: any = [];

  getView() {
    let pagesize = parseInt(this.pageSize);
    let total = parseInt(this.total);
    let counts = 0;
    if ((total / pagesize) > parseInt(String(total / pagesize))) {
      counts = parseInt(String(total / pagesize)) + 1;
    } else {
      counts = parseInt(String(total / pagesize));
    }

    const pagerCount = 10
    const halfPagerCount = (pagerCount - 1) / 2
    const currentPage = Number(this.currPage)
    const pageCount = counts

    let showPrevMore = false
    let showNextMore = false
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount) {
        showPrevMore = true
      }
      if (currentPage < pageCount - halfPagerCount) {
        showNextMore = true
      }
    }
    this.isPrev = showPrevMore;
    this.isNext = showNextMore;
    const array: any = []
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2)
      for (let i = startPage; i < pageCount; i++) {
        array.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i)
      }
    }

    this.pageCount = counts;
    this.isShow = counts > 1;
    this.list = array;
  }

  onPagerClick(type, page: any = null) {
    let newPage;
    const pagerCountOffset = 8
    if (type == 'page') {
      newPage = Number(page);
    }

    if (type == 'moreprev') {
      newPage = this.currPage - pagerCountOffset
    }
    if (type == 'morenext') {
      newPage = this.currPage + pagerCountOffset
    }

    if (type == 'prev') {
      newPage = this.currPage - 1;
    }
    if (type == 'next') {
      newPage = this.currPage + 1;
    }

    if (!isNaN(newPage)) {
      if (newPage < 1) {
        newPage = 1
      }
      if (newPage > this.pageCount) {
        newPage = this.pageCount
      }
    }
    this.currPage = newPage;
    this.handSelect(newPage)
  }

  @Emit('change')
  handSelect(item) {
    return item.value
  }

  mounted() {

  }

  @Watch('total')
  changePage() {
    this.getView();
  }
}
</script>

<style lang='less'>
.fc-select {
  background-color: #409eff !important;
  color: #fff !important;
}
</style>