<template>
  <div class="homepage-container">
    <el-row class="home-total">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        class="home-total-item"
        v-for="(item, index) of homeTotalData"
        :key="'line-' + index"
      >
        <div class="wrapper-item">
          <template v-if="item.title1">
            <p class="title">
              {{ item.title1 }}
              <span class="value digital-number">{{ item.value1 }}</span>
            </p>
            <p class="title">
              {{ item.title }}
              <span class="value digital-number">{{ item.value }}</span>
            </p>
          </template>
          <template v-else>
            <p class="title">
              {{ item.title }}
            </p>
            <p class="value digital-number">{{ item.value }}</p>
          </template>

          <color-line
            :id="'main' + index"
            :color="item.color"
            :optionData="item.data"
            width="180px"
            height="70px"
          ></color-line>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="24" :lg="24" :xl="24">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>本日财务支出详情</span>
            </div>
          </template>
          <div class="detail-item-wrapper">
            <div class="home-detail-item" style="background: rgb(236, 64, 122)">
              <div class="name">当日总支出 (元)</div>
              <div class="value">
                <span class="num">{{ reaTotal }}</span
                >元
              </div>
            </div>
            <div class="home-detail-item" style="background: rgb(171, 71, 188)">
              <div class="name">提现红包0.3元</div>
              <div class="value">
                <span class="num">{{ zero_point_three_RMB }}</span
                >个
              </div>
            </div>
            <div class="home-detail-item" style="background: rgb(33, 150, 243)">
              <div class="name">每日邀请0.3元</div>
              <div class="value">
                <span class="num">{{ share_zero_point_three_RMB }}</span
                >个
              </div>
            </div>
            <div class="home-detail-item" style="background: rgb(0, 150, 136)">
              <div class="name">2元支出</div>
              <div class="value">
                <span class="num">{{ two_RMB }}</span
                >个
              </div>
            </div>
            <div class="home-detail-item" style="background: #fdcb6e">
              <div class="name">8元支出</div>
              <div class="value">
                <span class="num">{{ eight_RMB }}</span
                >个
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24">
        <el-card shadow="hover" class="card_">
          <template #header>
            <div class="clearfix">
              <span>近七天数据走势</span>
            </div>
          </template>
          <div class="schart-box" style="height: 300px">
            <i
              class="el-icon-loading"
              v-if="isloding"
              style="font-size: 50px; text-align: center; display: block"
            ></i>
            <near-seven-days
              v-else
              width="100%"
              height="100%"
              :alldata="alldata"
            ></near-seven-days>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NearSevenDays from "@/components/near-seven-days";
import ColorLine from "@/components/color-line";
// import CountUp from "countup.js";
import {
  shareCount,
  redCount,
  getAppActive,
  getInvitation,
} from "@/utils/request";
export default {
  components: {
    NearSevenDays,
    ColorLine,
    // CountUp,
  },
  name: "dashboard",
  data() {
    return {
      name: "游客",
      zero_point_three_RMB: "加载中...",
      two_RMB: "加载中...",
      eight_RMB: "加载中...",
      reaTotal: "加载中...",
      share_zero_point_three_RMB: "加载中...",
      photo:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isloding: true,

      homeTotalData: [
        {
          title: "用户总数",
          value: "加载中...",
          color: "#f279d9",
          data: [5, 44, 38, 105, 64, 115, 87],
        },
        {
          title: "本日app活跃人数",
          title1: "本日累计在线人数",
          value: "加载中...",
          value1: "加载中...",
          color: "#79f2e7",
          data: [52, 39, 113, 21, 87, 114, 28],
        },
        {
          title: "当日注册数量",
          value: "加载中...",
          color: "#f2c479",
          data: [107, 21, 103, 6, 34, 49, 57],
        },
        {
          title: "当日邀请人数",
          value: "加载中...",
          color: "#a079f2",
          data: [3, 14, 100, 92, 99, 26, 105],
        },
      ],
      alldata: {
        date_03: [],
        date_tixian03: [],
        date_2: [],
        date_8: [],
        historyRedCount: [],
      },
    };
  },

  async mounted() {
    shareCount({ daysAgo: 0, daysNow: 0 }).then((res) => {
      this.homeTotalData[2].value = res.rep.userAboutCount[0].userAboutCount;
      // console.log(res.rep.userAboutCount[0].userAboutCount);
      // 活跃人数暂时用随机数
      this.homeTotalData[1].value = Math.floor(
        Math.random() * (100 - this.homeTotalData[2].value) +
          this.homeTotalData[2].value
      );
    });
    shareCount({ daysAgo: 100000, daysNow: 0 }).then((res) => {
      this.homeTotalData[0].value = res.rep.userAboutCount[0].userAboutCount;
    });
    redCount({ daysAgo: 0, daysNow: 0 }).then((res) => {
      this.zero_point_three_RMB = res.rep.readItem[0].redCount;
      this.share_zero_point_three_RMB = res.rep.readItem[3].redCount;
      this.two_RMB = res.rep.readItem[2].redCount;
      this.eight_RMB = res.rep.readItem[1].redCount;
      this.reaTotal = (
        (30 * this.zero_point_three_RMB) / 100 +
        (30 * this.share_zero_point_three_RMB) / 100 +
        2 * this.two_RMB +
        8 * this.eight_RMB
      ).toFixed(1);
    });

    getAppActive({ daysAgo: 0, daysNow: 0 })
      .then((res) => {
        if (res.result.code.code == "0000")
          this.homeTotalData[1].value1 = res.rep.userAbout.length;
        // 活跃人数暂时用随机数
        // this.homeTotalData[1].value = Math.floor(
        //   Math.random() * (100 - this.homeTotalData[2].value) +
        //     this.homeTotalData[2].value
        // );
      })
      .catch(() => {
        this.$message.error("在线人数获取失败,刷新后重试!");
        this.homeTotalData[1].value1 = "获取失败";
      });
    getInvitation({
      daysAgo: 0,
      daysNow: 0,
      start: 0,
      length: 10000,
    }).then((res) => {
      // 暂时
      this.homeTotalData[3].value = res.rep.userAboutCount[0];
    });

    if (!sessionStorage.getItem("InvitationData")) {
      let new_result1 = await getInvitation({
        daysAgo: 1,
        daysNow: 1,
        start: 0,
        length: 10000,
      });
      let new_result2 = await getInvitation({
        daysAgo: 2,
        daysNow: 2,
        start: 0,
        length: 10000,
      });
      let new_result3 = await getInvitation({
        daysAgo: 3,
        daysNow: 3,
        start: 0,
        length: 10000,
      });
      let new_result4 = await getInvitation({
        daysAgo: 4,
        daysNow: 4,
        start: 0,
        length: 10000,
      });
      let new_result5 = await getInvitation({
        daysAgo: 5,
        daysNow: 5,
        start: 0,
        length: 10000,
      });
      let new_result6 = await getInvitation({
        daysAgo: 6,
        daysNow: 6,
        start: 0,
        length: 10000,
      });
      let new_result7 = await getInvitation({
        daysAgo: 7,
        daysNow: 7,
        start: 0,
        length: 10000,
      });
      let new_resultAll = [
        new_result7,
        new_result6,
        new_result5,
        new_result4,
        new_result3,
        new_result2,
        new_result1,
      ];
      let arr = [];
      new_resultAll.forEach((item) => {
        arr.push(item.rep.userAboutCount[0]);
      });
      sessionStorage.setItem("InvitationData", JSON.stringify(arr));
    }

    this.alldata.InvitationData = JSON.parse(
      sessionStorage.getItem("InvitationData")
    );

    if (!sessionStorage.getItem("left_data")) {
      let red_result1 = await await redCount({ daysAgo: 1, daysNow: 1 });
      let red_result2 = await await redCount({ daysAgo: 2, daysNow: 2 });
      let red_result3 = await await redCount({ daysAgo: 3, daysNow: 3 });
      let red_result4 = await await redCount({ daysAgo: 4, daysNow: 4 });
      let red_result5 = await await redCount({ daysAgo: 5, daysNow: 5 });
      let red_result6 = await await redCount({ daysAgo: 6, daysNow: 6 });
      let red_result7 = await await redCount({ daysAgo: 7, daysNow: 7 });

      let ind = [
        red_result7.rep.readItem,
        red_result6.rep.readItem,
        red_result5.rep.readItem,
        red_result4.rep.readItem,
        red_result3.rep.readItem,
        red_result2.rep.readItem,
        red_result1.rep.readItem,
      ];
      sessionStorage.setItem("left_data", JSON.stringify(ind));
    }

    JSON.parse(sessionStorage.getItem("left_data")).forEach((item) => {
      this.alldata.date_03.push(item[3].redCount);
      this.alldata.date_2.push(item[2].redCount);
      this.alldata.date_8.push(item[1].redCount);
      this.alldata.date_tixian03.push(item[0].redCount);
    });

    if (!sessionStorage.getItem("arr")) {
      let result1 = await shareCount({ daysAgo: 1, daysNow: 1 });
      let result2 = await shareCount({ daysAgo: 2, daysNow: 2 });
      let result3 = await shareCount({ daysAgo: 3, daysNow: 3 });
      let result4 = await shareCount({ daysAgo: 4, daysNow: 4 });
      let result5 = await shareCount({ daysAgo: 5, daysNow: 5 });
      let result6 = await shareCount({ daysAgo: 6, daysNow: 6 });
      let result7 = await shareCount({ daysAgo: 7, daysNow: 7 });
      let allResult = [
        result7,
        result6,
        result5,
        result4,
        result3,
        result2,
        result1,
      ];
      let arr = [];
      let date = [];
      allResult.forEach((item) => {
        arr.push(item.rep.userAboutCount[0].userAboutCount);
        date.push(item.rep.userAboutCount[0].date.substring(5, 10));
      });
      sessionStorage.setItem("arr", JSON.stringify(arr));
      sessionStorage.setItem("date", JSON.stringify(date));
    }
    this.alldata.date = JSON.parse(sessionStorage.getItem("date"));
    this.alldata.zhuce = JSON.parse(sessionStorage.getItem("arr"));

    if (!sessionStorage.getItem("historyRedCount")) {
      let redCount1 = await redCount({ daysAgo: 1, daysNow: 1 });
      let redCount2 = await redCount({ daysAgo: 2, daysNow: 2 });
      let redCount3 = await redCount({ daysAgo: 3, daysNow: 3 });
      let redCount4 = await redCount({ daysAgo: 4, daysNow: 4 });
      let redCount5 = await redCount({ daysAgo: 5, daysNow: 5 });
      let redCount6 = await redCount({ daysAgo: 6, daysNow: 6 });
      let redCount7 = await redCount({ daysAgo: 7, daysNow: 7 });
      let redCountArr = [
        redCount7.rep.readItem,
        redCount6.rep.readItem,
        redCount5.rep.readItem,
        redCount4.rep.readItem,
        redCount3.rep.readItem,
        redCount2.rep.readItem,
        redCount1.rep.readItem,
      ];
      let historyRedCount = [];
      redCountArr.forEach((item) => {
        historyRedCount.push(
          (
            (30 * item[0].redCount +
              800 * item[1].redCount +
              200 * item[2].redCount +
              30 * item[3].redCount) /
            100
          ).toFixed(1)
        );
      });
      sessionStorage.setItem(
        "historyRedCount",
        JSON.stringify(historyRedCount)
      );
    }
    this.alldata.historyRedCount = JSON.parse(
      sessionStorage.getItem("historyRedCount")
    );
    this.isloding = false;
  },

  computed: {
    role() {
      return sessionStorage.getItem("user") ===
        "377e9ed0-3a55-4cd6-aaf6-2cf1a2935613"
        ? "超级管理员"
        : "普通用户";
    },
    userphoto() {
      let userphoto = JSON.parse(sessionStorage.getItem("userInfo"));
      return userphoto ? userphoto.photo : this.photo;
    },
    username() {
      let username = JSON.parse(sessionStorage.getItem("userInfo"));
      return username ? username.lineName : this.name;
    },
  },

  methods: {
    // changeDate() {
    //   const now = new Date().getTime();
    //   this.data.forEach((item, index) => {
    //     const date = new Date(now - (6 - index) * 86400000);
    //     item.name = `${date.getFullYear()}/${
    //       date.getMonth() + 1
    //     }/${date.getDate()}`;
    //   });
    // },
  },
};
</script>

<style scoped lang='scss'>
.homepage-container {
  background: #fff;
  height: 100%;
  min-width: 580px;
  .home-total {
    width: 100%;
    height: 160px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 0 15px 0;

    .home-total-item {
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      padding: 15px 0;
      vertical-align: top;

      .wrapper-item {
        height: 100%;
        padding: 0 20px;
        border-right: 1px solid #ccc;
        text-align: center;

        .title {
          margin: 0px 0;
        }

        .value {
          margin: 5px 0;
          font-size: 28px;
          color: #ffc107;
        }
      }

      &:last-child {
        .wrapper-item {
          border: none;
        }
      }
    }
  }
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

// .schart {
//   width: 100%;
//   height: 300px;
// }

.detail-item-wrapper {
  display: flex;
  // height: 400px;
  // overflow: hidden;
  // flex-wrap: wrap;
  // flex-flow: row wrap;
  // justify-content: space-around;
  // align-content: space-around;
  // padding: 0 10px;
  color: #fff;

  .home-detail-item {
    // flex: 0 0 48%;
    width: 20%;
    height: 145px;
    border: 1px solid #eee;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.3)
    ) !important;
    cursor: pointer;
  }

  .home-detail-item:hover {
    background-image: none !important;
  }

  // .home-detail-item:nth-child(3),
  // .home-detail-item:nth-child(4) {
  //   margin-top: 10px;
  // }

  .home-detail-item {
    .name {
      padding: 30px 0 10px 0;
      text-align: center;
      font-size: 20px;
    }

    .value {
      text-align: center;

      .num {
        font-size: 28px;
      }
    }
  }
}
</style>
