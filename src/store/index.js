// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: 'Bob', // 用户信息存储在这里
    classes:'软件2401',
    studentId:'6020241790',
    avatarUrl:'https://profile-avatar.csdnimg.cn/869f73aba88141568df7e17f17ed575c_qq_56989560.jpg!1',
    
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchUser({ commit }) {
      // 这里可以调用API获取用户信息
      // 假设API返回的数据是 { id: 1, name: 'John Doe' }
      const user = { id: 1, name: 'John Doe' };
      commit('setUser', user);
    },
  },
  getters: {
    getUser: state => state.user,
  },
});