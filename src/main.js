import Vue from 'vue'
import App from './App.vue'
import store from './store';
//引入UI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入更改后的主题
import '../theme/index.css'

//引入路由
import VueRouter from 'vue-router'
import router from './router'

//引入懒加载库
import VueLazyload from 'vue-lazyload';

//使用UI组件库
Vue.use(ElementUI);
Vue.use(VueRouter);

//使用懒加载库

Vue.use(VueLazyload, {
  preLoad: 1.3, // 预加载倍数，当图片距离视口 1.3 倍高度时开始加载
  attempt: 2 // 尝试加载的次数
});

Vue.config.productionTip = false
Vue.prototype.$globalVar = {
  admin: 1  // 初始化为 null 或者 0/1
}
new Vue({
  store,
  el: '#app',
  render: h => h(App),
  router: router,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
});
