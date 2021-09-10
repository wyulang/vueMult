import dig from '@component/dig.vue';
import radio from '@component/radio.vue';
import page from '@component/page.vue';
import date from '@component/date.vue';
import drawer from '@component/drawer.vue';
import scroll from '@component/scroll.vue';
import inputs from '@component/inputs.vue';
import upfile from '@component/upfile.vue';
import selects from '@component/selects.vue';
import spinner from '@component/spinners/spinner.ts';
import message from '@component/message/message';
import directive from '@lib/vue.directive';

export default function (app) {
  app.component('dig', dig)
  app.component('radio', radio)
  app.component('scroll', scroll)
  app.component('page', page)
  app.component('date', date)
  app.component('upfile', upfile)
  app.component('selects', selects)
  app.component('inputs', inputs)
  app.component('drawer', drawer)
  spinner(app);
  message(app);
  directive(app);
}