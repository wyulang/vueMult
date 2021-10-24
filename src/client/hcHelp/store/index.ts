import { createStore } from 'vuex'
import api from './webapi';
export default createStore({
  state: {
    message: "VUE3",
    picUrl: `${api.env('envUrl')}/file/downloadFile/`
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
      return api.post(`/user/update`,data)
    },
    getOrder(store, data) {
      let sql = Object.assign({}, data);
      delete sql.pageNum;
      delete sql.pageSize;
      return api.post(`/order/list/${data.pageNum}/${data.pageSize}`, sql)
    },
    login(store, data) {
      return api.get('/umc/login/in', data)
    },
    pcRegedit(store, data) {
      return api.post('/umc/login/register', data)
    }
  },
  mutations: {
  },

  modules: {
  }
})