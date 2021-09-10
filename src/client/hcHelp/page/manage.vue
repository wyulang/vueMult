<template>
  <header class="h-60 w-all bc-primary fc-fff flex ai-c jc-b">
    <span class="fs-16 fw-400 ml18">汇材帮后台管理系统</span>
    <div class="flex mr20 ai-c">
      欢迎登录
    </div>
  </header>
  <main class="manage-body flex">
    <section class="manageMenu bc-282c33 w-200">
      <ul class="flex w-all fd-c">
        <transition v-for="(item, index) in path">
          <li :class="{ 'menu-active': item.select }" class="flex fd-c ai-c menu-bc fc-999 w-all">
            <div @click.stop="btnMenu(1, item)" :class="{ 'is-open': item.select }" class="flex h-48 item rel pl15 ai-c jc-b w-all">
              <div class="flex ml20 ai-c">
                <span :class="[item.mate.icon]" class="iconfont w-25"></span>
                <span class="fs-14">{{ item.mate.title }}</span>
              </div>
            </div>
          </li>
        </transition>
      </ul>
    </section>
    <section class="flex-1">
      <router-view></router-view>
    </section>
  </main>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator';
import { menus } from '../router';
export default class App extends Vue {
  menu: any = [];
  created() {
    this.menu = menus.find(v => v.name == 'manage').children;
  }

  get path() {
    let curr = this.$route.name;
    // let menu = menus.find(v => v.name == 'manage').children;
    let currMenu = this.menu.map(item => {
      if (item.name == curr) {
        item.select = true;
      }else{
        item.select=false
      }
      return item
    });
    return currMenu
  }


  btnMenu(type,item) {
    this.$router.push({name:item.name})
  }
}
</script>

<style lang='less'>
.bc-282c33 {
  background-color: #2d3948;
}
.manage-body {
  min-height: calc(100vh - 60px);
  .manageMenu {
    .menu-child {
      height: 0px;
      overflow: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: height;
    }
    .menu-bc {
      background-color: #1b2737;
      border-bottom: 1px solid #000;
      border-top: 1px solid #333f4a !important;
      cursor: pointer;
      color: #fff;
      .is-open {
        .icon-jianxiatou {
          transform: rotate(180deg);
        }
      }
      .item {
        .icon-jianxiatou {
          transition: all 0.2s;
        }

        &:hover {
          color: #409eff;
        }
      }
    }
    .menu-active {
      color: #409eff !important;
    }
  }
}
</style>