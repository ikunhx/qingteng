<template>
  <div id="app">
    <Aside class="aside" />
    <div class="box">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Aside from "./components/Aside.vue";
export default {
  name: "App",
  components: {
    Aside,
  },
  methods: {
    changePath(url) {//路由跳转
      if (url == "Introduction") {//首页兼简介页
        if (this.$route.path !== '/Introduction' && this.$router.path !== '/') {
          this.$router.push({
            name: url,
          });
        }
      } else if (this.$route.path !== `/${url}`) {//其他页面
        this.$router.push({
          name: url,
        });
      }
    },

  },
  mounted() {
      this.$bus.$on("change", this.changePath);
  },
};
</script>

<style>
.aside {
width: 300px;
  float: left;
}
.box {
  float: left;
  width: 70vw;
}
</style>
