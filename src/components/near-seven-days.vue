<template>
  <div></div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "near-seven-days",
  props: {
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
    alldata: Object,
  },
  data() {
    return {
      legendData: [
        "提现0.3元",
        "邀请0.3元",
        "首次邀请2元",
        "vip提现8元",
        "注册量",
        "邀请人数",
        "总支出 (元)",
      ],
    };
  },
  methods: {
    initChart() {
      let charts = echarts.init(this.$el);
      charts.setOption({
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "50px",
          right: "10px",
          bottom: "30px",
          top: "10px",
        },
        legend: {
          data: this.legendData,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.alldata.date,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "提现0.3元",
            type: "line",
            data: this.alldata.date_tixian03,
          },
          {
            name: "邀请0.3元",
            type: "line",
            data: this.alldata.date_03,
          },
          {
            name: "首次邀请2元",
            type: "line",
            data: this.alldata.date_2,
          },
          {
            name: "vip提现8元",
            type: "line",
            data: this.alldata.date_8,
          },
          {
            name: "注册量",
            type: "line",
            data: this.alldata.zhuce,
          },
          {
            name: "邀请人数",
            type: "line",
            data: this.alldata.InvitationData,
          },
          {
            name: "总支出 (元)",
            type: "line",
            data: this.alldata.historyRedCount,
          },
        ],
      });
    },
  },
  mounted() {
    this.$el.style.width = this.width;
    this.$el.style.height = this.height;
    this.initChart();
    window.addEventListener("resize", this.__resizeHanlder);
  },
};
</script>
