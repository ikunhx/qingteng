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
// 添加全局的 beforeunload 事件监听器
document.addEventListener('DOMContentLoaded', function () {
  // 设置一个唯一标识符以识别页面刷新
  let pageSessionId = sessionStorage.getItem('pageSessionId');
  
  if (!pageSessionId) {
    // 如果没有找到标识符，表示可能是新的会话或第一次加载
    // 清除 token (可选)
    store.commit('setToken', '');
    store.commit('setAdmin', '');
    
    // 创建一个新的标识符并存入 sessionStorage
    pageSessionId = 'session_' + new Date().getTime();
    sessionStorage.setItem('pageSessionId', pageSessionId);
  }
  
  // 检查是否有 token 需要恢复 (如果您的应用需要的话)
  // 这里可以根据实际情况调整逻辑
});

// 添加全局的 beforeunload 事件监听器
window.addEventListener('beforeunload', function (event) {
  // 不在这里清除 token
  
  // 注意: 直接清除 token 的逻辑被移除了
});