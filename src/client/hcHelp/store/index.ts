import { createStore } from 'vuex'
import api from './webapi';
export default createStore({
  state: {
    message: "VUE3"
  },
  actions: {
    getProduct(store, data) {
      let sql=Object.assign({},data);
      delete sql.pageNum;
      delete sql.pageSize;
      return api.post(`/product/list/${data.pageNum}/${data.pageSize}`, sql)
    }
  },
  mutations: {
  },

  modules: {
  }
})