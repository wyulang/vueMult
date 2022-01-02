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
    if (!isNaN(url.replace(/[^\d]/g, ''))) {
      env = "me";
    }
    if (url.includes('localhost')) {
      env = "me"
    }
    return env;
  }

  envUrl = {
    me: 'http://baikehuicai.com/api',
    // me: 'http://172.16.10.8:8081',
    inte: 'http://localhost.bkhc.com:9090',
    // inte: 'https://api.zy.86edu.net',
    prod: 'http://baikehuicai.com/api',
  }

  setWithCredentials() {
    return true
  }

  getDomainApi() {
    return this.env('envUrl')
  }

  contentType(type) {
    return type ? type : "application/json";
  }

  //请求体BUG提示
  getMessage(err, type) {
    if (type == 'then') {
       if (err.data && err.data.code != 200) {
        msg({ message: err.data.error, type: "error" });
        return;
      }
      return;
    } else {
      msg({ message: err.data.error, type: "error" });
      return;
    }
  }

  setToken(token) {
    return {}
  }

}

export default new webapi();