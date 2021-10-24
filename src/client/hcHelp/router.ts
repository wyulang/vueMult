import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "introduce" */ './page/login.vue'),
    name: 'login',
  },
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "introduce" */ './page/home.vue'),
    name: 'home',
    mate: {
      title: ""
    },
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/home.vue'),
        name: 'home.home',
        mate: {
          title: ""
        },
      },
      {
        path: '/product',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/product.vue'),
        name: 'home.product',
        mate: {
          title: ""
        },
      },
      {
        path: '/product/detail/:code',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/detail.vue'),
        name: 'home.detail',
        mate: {
          title: ""
        },
      },
      {
        path: '/user/order',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/my.order.vue'),
        name: 'user.order',
        mate: {
          title: ""
        },
      },
      {
        path: '/user/info',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/my.info.vue'),
        name: 'user.info',
        mate: {
          title: ""
        },
      },
      {
        path: '/user/password',
        component: () => import(/* webpackChunkName: "introduce" */ './page/home/my.password.vue'),
        name: 'user.password',
        mate: {
          title: ""
        },
      },
    ]
  },
  {
    path: '/manage',
    component: () => import(/* webpackChunkName: "introduce" */ './page/manage.vue'),
    name: 'manage',
    mate: {
      title: ""
    },
    children: [
      {
        path: '/manage/index',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/index.vue'),
        name: 'manage.index',
        mate: {
          title: "每日统计",
          icon:"icon-shujutongji"
        },
      },
      {
        path: '/manage/product/type',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/product.type.vue'),
        name: 'manage.product.type',
        mate: {
          title: "产品类别",
          icon:'icon-fenlei-copy'
        },
      },
      {
        path: '/manage/product',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/product.vue'),
        name: 'manage.product',
        mate: {
          title: "产品管理",
          icon:'icon-chanpinguanli'
        },
      },
      {
        path: '/manage/order',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/order.vue'),
        name: 'manage.order',
        mate: {
          title: "订单管理",
          icon:'icon-dingdan'
        },
      },
      {
        path: '/manage/brand',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/brand.vue'),
        name: 'manage.brand',
        mate: {
          title: "品牌管理",
          icon:'icon-pinpaishezhi'
        },
      },
      {
        path: '/manage/user',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/user.vue'),
        name: 'manage.user',
        mate: {
          title: "会员管理",
          icon:'icon-huiyuan'
        },
      },
      {
        path: '/manage/admin',
        component: () => import(/* webpackChunkName: "introduce" */ './page/manage/admin.vue'),
        name: 'manage.admin',
        mate: {
          title: "职员管理",
          icon:'icon-yonghu'
        },
      },
    ]
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export const menus = routes;