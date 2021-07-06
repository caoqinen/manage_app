<template>
  <router-view v-loading.fullscreen.lock="$store.state.isLoading" />
</template>

<script>
export default {
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
</style>
