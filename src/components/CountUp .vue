<template>
  <div class="iCountUp">
    <CountUp :delay="delay" :endVal="endVal" :options="options" />
  </div>
</template>

<script>
import CountUp from "vue-countup-v2";

export default {
  name: "demo",

  components: {
    CountUp,
  },

  data() {
    return {
      delay: 1000,
      endVal: 120500,

      options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "$",
        suffix: "",
      },
    };
  },
};
</script>

<style scoped>
.iCountUp {
  font-size: 12em;
  margin: 0;
  color: #4d63bc;
}
</style>
