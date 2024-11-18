<template>
  <div id="app">
    <Aside class="aside" />
    <!-- <aha /> -->
    <div class="box">
      
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Aside from "./components/Aside.vue";
import aha from "./components/aha.vue";
export default {
  name: "App",
  components: {
    Aside,
    aha,
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
width: 16.05%;
  float: left;
  margin-right: 30px;
}
.box {
  float: left;
  width: 70%;
}
</style>
