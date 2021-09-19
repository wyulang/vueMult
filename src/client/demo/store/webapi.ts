'use strict';
import baseApi from '../../../../lib/baseApi';
import { msg } from '@component/message/message';

class webapi extends baseApi {
  constructor() {
    super();
  }
  getEnvName() {
    let env = 'prod';
    let url: any = window.location.hostname;
    // if (!isNaN(url.replace(/[^\d]/g, ''))) {
    //   env = "me";
    // }
    if (url.includes('172.16')) {
      env = "me";
    }
    if (url.includes('localhost')) {
      env = "inte"
    }
    return env;
  }

  envUrl = {
    me: 'http://172.16.20.33:8081',
    // me: 'http://172.16.10.8:8081',
    inte: 'http://10.35.65.214:8081',
    // inte: 'https://api.zy.86edu.net',
    prod: 'http://10.32.30.174:8089',
  }

  getDomainApi() {
    return this.env('envUrl')
  }

  contentType(type) {
    return type ? type : "application/json";
  }

  //请求体BUG提示
  getMessage(err, type) {
    if (err?.code) {
      if (err.code == 404) {
        msg({ message: err.data, type: "error" })
        window.location.href = "#/"
        return
      }
      else if (err.code == 400) {
        msg({ message: '未找到接口：' + err.data.path, type: "error" });
        return;
      }
    }
    if (type == 'then') {
      if (!err?.data) {
        msg({ message: 'CORS跨域出错或连接失败', type: "error" })
      } else if (err.data && err.data.code == 5001) {
        msg({ message: err.data.tip, type: "error" })
        window.location.href = "#/";
      }
      else if (err.data && err.data.code != 2000) {
        msg({ message: err.data.tip, type: "error" })
      }
    } else {
      msg({ message: err.data, type: "error" })
    }
  }

  setToken(token) {
    return {}
  }

}

export default new webapi();