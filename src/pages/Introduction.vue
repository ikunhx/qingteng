<template>
  <div class="introduction">
    <img src="../assets/logo.png" class="fir-img" />
    <img :src="i" v-for="(i, index) in imgs" :key="index" class="itr-img" />
  </div>
</template>

<script>
export default {
  name: "Introduction",
  data() {
    return {
      imgs: [
        require("@/assets/itr-png/03.jpg"),
        require("@/assets/itr-png/04.jpg"),
        require("@/assets/itr-png/05.jpg"),
        require("@/assets/itr-png/06.jpg"),
        require("@/assets/itr-png/07.jpg"),
        require("@/assets/itr-png/08.jpg"),
        require("@/assets/itr-png/09.jpg"),
        require("@/assets/itr-png/10.jpg"),
        require("@/assets/itr-png/11.jpg"),
      ],
    };
  },
};
</script>

<style>
.fir-img {
  width: 68%;
  margin-left: 15%;
}
.itr-img {
  width: 100%;
  margin-top: -4px;
}
</style>