import { createVNode, render } from '@vue/runtime-dom';
import spinnerel from './spinne.vue';

let container: null | HTMLElement;

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
  const vm = createVNode(spinnerel, props);
  render(vm, container);
  document.body.appendChild(container);
};

let Spinners = {
  show(opts) {
    _render(opts)
  },
  close() {
    destroy()
  }
}
Spinners


export const spinner = Spinners;

export default (app) => {
  app.config.globalProperties.spinner = Spinners
}