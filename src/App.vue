<template>
  <!-- <v-app> -->
  <router-view v-loading.fullscreen.lock="$store.state.isLoading" />
  <!-- </v-app> -->
</template>

<script>
export default {
  // updated() {
  //   const dom = document.getElementById("loading");
  //   if (dom) {
  //     dom.remove();
  //   }
  // },
  mounted() {
    // window.onbeforeunload = function () {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  },
};
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";
@import "./assets/css/custom.css";
@import "./assets/css/scrollbar.css";
</style>
