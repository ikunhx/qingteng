// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '', // 用户信息存储在这里
    classes: '',
    studentId: '',
    avatarUrl: '',
    admin: null,
    token:"",
    phone:'',
    QQnum:'',
    direction:'',
    advantage:'',
    userData: {
      ranking: '',
      user: '',
      average: '',
    },
  },
  mutations: {
    setUser(state, userName) {
      state.userName = userName;
    },
    setClasses(state, classes) {
      state.classes = classes;
    },
    setStudentId(state, studentId) {
      state.studentId = studentId;
    },
    setAvatarUrl(state, avatarUrl) {
      state.avatarUrl = avatarUrl;
    },
    setToken(state, token) {
      state.token = token;
    },
    setAdmin(state, admin) {
      state.admin = admin;
    },
    setUserInfo(state, userInformation) {
      state.userInformation = userInformation;
    },
    setPhone(state, phone) {
      state.phone = phone;
    },
    setQQnum(state, QQnum) {
      state.QQnum = QQnum;
    },
    setDirection(state, direction) {
      state.direction = direction;
    },
    setAdvantage(state, advantage) {
      state.advantage = advantage;
    }
  },
  actions: {
    fetchUser({ commit }) {
      // 这里可以调用API获取用户信息
      // 假设API返回的数据是 { id: 1, name: 'John Doe' }
      const user = { id: 1, name: 'John Doe' };
      commit('setUser', user);
    },
    setToken({ commit }, token) {
      commit('setToken', token);  // 提交 mutation
    },
    setAdmin({ commit }, admin) {
      commit('setAdmin', admin);  // 提交 mutation
    },
    setUser({ commit }, userName) {
      commit('setUser', userName);  // 提交 mutation
    },
    setClasses({ commit }, classes) {
      commit('setClasses', classes);  // 提交 mutation
    },
    setStudentId({ commit }, studentId) {
      commit('setStudentId', studentId);  // 提交 mutation
    },
    setAvatarUrl({ commit }, avatarUrl) {
      commit('setAvatarUrl', avatarUrl);  // 提交 mutation
    },
    setPhone({ commit }, phone) {
      commit('setPhone', phone);  // 提交 mutation
    },
    setQQnum({ commit }, QQnum) {
      commit('setQQnum', QQnum);  // 提交 mutation
    },
    setDirection({ commit }, direction) {
      commit('setDirection', direction);  // 提交 mutation
    },
    setAdvantage({ commit }, advantage) {
      commit('setAdvantage', advantage);  // 提交 mutation
    },
    clearToken({ commit }) {
      commit('setToken', '');
    }

  },
  plugins: [persistedState()],
  getters: {
    getUser: state => state.user,
    getToken: (state) => state.token,
    getAdmin: (state) => state.admin,
  },
});