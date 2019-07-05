import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import './style/font-awesome.min.css'
import './style/animate.css'
import qs from 'qs';
import { post, fetch, patch, put } from './util/http'
import { timestampToTime, timeToTimestamp, time ,timestampToTimeUtc } from './util/util'
import i18n from './i18n/i18n'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$timestampToTime = timestampToTime;
Vue.prototype.$timestampToTimeUtc = timestampToTimeUtc;
Vue.prototype.$timeToTimestamp = timeToTimestamp;
Vue.prototype.$time = time;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false
// 全局过滤器
Vue.filter('thousandFilter', function (val) {
  return parseFloat(val).toLocaleString(); //千位分隔符
})
Vue.filter('toFiexd2', function (val) {
  return parseFloat(val).toFixed(2); 
})
Vue.filter('multiple', function (val) {
  return val * 0.00000002; //TxFee
})
Vue.filter('toFiexd8', function (val) {
  return val * 0.00000001; //TxFee
})
Vue.filter('toUTC',(val)=>{
  return new Date(val) //时间戳转换为utc格式
})
// if (process.env.NODE_ENV !== 'production') {
//   Vue.config.performance = true;
// }
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
