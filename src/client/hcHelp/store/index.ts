import { createStore } from 'vuex'
import api from './webapi';
export default createStore({
  state: {
    message: "VUE3",
    picUrl: `${api.env('envUrl')}/file/downloadFile/`,
    user: api.storage('hchelp')
  },
  actions: {
    getProduct(store, data) {
      let sql = Object.assign({}, data);
      delete sql.pageNum;
      delete sql.pageSize;
      return api.post(`/product/list/${data.pageNum}/${data.pageSize}`, sql)
    },
    getProductDetail(store, data) {
      return api.post(`/product/detail/${data}`)
    },
    setUserInfo(store, data) {
      return api.post(`/user/update`, data)
    },
    getOrder(store, data) {
      let sql = Object.assign({}, data);
      delete sql.pageNum;
      delete sql.pageSize;
      return api.post(`/order/list/${data.pageNum}/${data.pageSize}`, sql)
    },
    login(store, data) {
      return api.get('/umc/login/in', data).then(res => {
        if (res.code == 200) {
          api.storage('hchelp', res.data);
          store.state.user = res.data;
        }
        return res
      })
    },
    getCurrentUser(store, data) {
      return api.post('/umc/user/getCurrentUser')
    },
    getcurrentUseRoleDetail(store, data) {
      return api.post('/umc/user/currentUseRoleDetail')
    },
    pcRegedit(store, data) {
      return api.post('/umc/user/register', data)
    },
    getBrandProductPrices(store, data) {
      return api.get('/product/brandProduct/prices', data)  
    },
    buildOrder(store, data) {
      return api.post('/product/order/buildOrder', data, { responseType: 'blob' }).then(res => {
        const stream: any = res.data; // 后端用stream返回Excel文件
        const blob: any = new Blob([stream], { type: "application/x-xls" });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `报价.${new Date().getTime()}.xlsx`; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      })
    }
  },
  mutations: {
    outLogin(state, data) {
      state.user = null;
      api.storage('hchelp', null, true);
    },
    getCookie(state, name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    }
  },

  modules: {
  }
})