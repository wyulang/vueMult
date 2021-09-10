const msgType = ['success', 'warning', 'info', 'error', 'confirm', 'pop']

import { createVNode, render } from '@vue/runtime-dom';
import MessageMsg from './msg.vue';

let container: null | HTMLElement;
let options: any;

const destroy = () => {
  if (container) {
    // 如果没有开启mask 多次点击弹出提示，销毁时容易出错
    render(null, container);
    document.body.removeChild(container);
    container = null;
  }
};

const _render = (props) => {
  if (container) {
    // 清除定时器
    destroy();
  }
  container = document.createElement('div');
  options = {
    ...props,
    onClose: destroy
  };
  const vm = createVNode(MessageMsg, options);
  render(vm, container);
  document.body.appendChild(container);
};

const Message = (opts, callback=null) => {
  if (typeof opts == 'string') {
    opts = {
      message: opts,
      isModel: true
    }
  }
  if (callback) {
    opts.close = callback;
  }
  return _render({ ...opts })
}

msgType.forEach(type => {
  Message[type] = (options, callback) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type,
      }
    } else {
      options.type = type
    }
    if (callback) {
      options.close = callback;
    }
    return Message(options, callback)
  }
})

export const msg=Message;

export default (app) => {
  app.config.globalProperties.$msg = Message
}