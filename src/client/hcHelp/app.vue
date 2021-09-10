<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
export default class App extends Vue {
  created() {

  }
}
</script>

<style lang="less">
@import "~@css/pc.less";
.picfilter {
  &:hover {
    img {
      -webkit-transform: scale(1.5, 1.5);
      -moz-transform: scale(1.5, 1.5);
      -transform: scale(1.5, 1.5);
      transition: 0.5s all ease-out;
    }
    .title {
      color: #398cff;
    }
  }
}
.m-body {
  min-height: 100vh;
}
.footer {
  a:hover,
  a:link,
  a:visited {
    text-decoration: none;
    color: #aaa;
  }
}
.table {
  thead tr td {
    padding: 12px 10px;
    background-color: #f5f6f6;
    font-size: 15px;
    color: #888;
  }
  tbody tr td {
    padding: 12px 10px;
    font-size: 13px;
    border-bottom: 1px solid #f2f2f2;
  }
  tbody tr {
    color: #555;
    &:hover {
      background-color: #f0f6ff;
      // background-color: #ecfaf4;
      color: #000;
    }
  }
}
</style>