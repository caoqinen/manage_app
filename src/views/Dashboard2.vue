<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <el-card shadow="hover" style="height: 252px">
          <div class="user-info">
            <img :src="userphoto" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ username }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <div class="user-info-list">
            上次登录地点：
            <span>郑州</span>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ userCount }}</div>
                  <div>用户总量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-s-help grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ appActive1 }}</div>
                  <div>当日app活跃人数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-share grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ todayUserCount }}</div>
                  <div>当日注册数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-sort grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ zero_point_three_RMB }}</div>
                  <div>提现红包0.3元</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-sort grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ two_RMB }}</div>
                  <div>2元支出</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-sort grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{ eight_RMB }}</div>
                  <div>8元支出</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mgb20">
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-1">
            <i class="el-icon-sort grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ share_zero_point_three_RMB }}</div>
              <div>每日随后邀请0.3元</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-2">
            <i class="el-icon-pie-chart grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ reaTotal }}</div>
              <div>当日总支出 (元)</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="grid-content grid-con-3">
            <i class="el-icon-share grid-con-icon"></i>
            <div class="grid-cont-right">
              <div class="grid-num">{{ today_Invitation }}</div>
              <div>当日邀请人数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="12">
        <el-card shadow="hover" class="card_">
          <template #header>
            <div class="clearfix">
              <span>近七天红包支出</span>
            </div>
          </template>
          <div class="schart-box" style="height: 300px">
            <i
              class="el-icon-loading"
              v-if="isloding"
              style="font-size: 50px; text-align: center; display: block"
            ></i>
            <schart
              class="schart"
              v-else
              canvasId="bar"
              :options="options1"
              style="width: 100%"
            ></schart>
            <!-- <near-seven-days width="100%" height="100%"></near-seven-days> -->
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>最近七天用户注册</span>
            </div>
          </template>
          <i
            class="el-icon-loading"
            v-if="isloding"
            style="font-size: 50px; text-align: center; display: block"
          ></i>
          <schart
            ref="line"
            v-else
            class="schart"
            canvasId="line"
            :options="options2"
            style="width: 600px"
          ></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
// import NearSevenDays from "@/components/near-seven-days";
import {
  shareCount,
  redCount,
  getAppActive,
  getInvitation,
} from "@/utils/request";
export default {
  components: {
    // NearSevenDays,
    Schart,
  },
  name: "dashboard",
  data() {
    return {
      name: "游客",
      todayUserCount: "加载中...",
      userCount: "加载中...",
      zero_point_three_RMB: "加载中...",
      two_RMB: "加载中...",
      eight_RMB: "加载中...",
      reaTotal: "加载中...",
      share_zero_point_three_RMB: "加载中...",
      appActive1: "加载中...",
      today_Invitation: "加载中...",
      photo:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isloding: true,

      options2: {
        type: "line",
        labels: [],
        datasets: [
          {
            label: "历史注册量",
            data: [],
          },
          {
            label: "历史邀请人数",
            data: [],
          },
        ],
      },
      options1: {
        type: "bar",
        bgColor: "#fbfbfb",
        datasets: [
          {
            label: "提现0.3元",
            data: [],
          },
          {
            label: "首次邀请2元",
            data: [],
          },
          {
            label: "vip提现8元",
            data: [],
          },
          {
            label: "每日邀请0.3元",
            fillColor: "#64D572",
            data: [],
          },
        ],
      },
    };
  },
  async mounted() {
    let todayUserCount = await shareCount({ daysAgo: 0, daysNow: 0 });
    let userCount = await shareCount({ daysAgo: 100000, daysNow: 0 });
    let red = await redCount({ daysAgo: 0, daysNow: 0 });
    let appActive = await getAppActive({ daysAgo: 0, daysNow: 0 });
    let today_result = await getInvitation({
      daysAgo: 0,
      daysNow: 0,
      start: 0,
      length: 10000,
    });
    this.appActive1 = appActive.rep.userAbout.length;
    this.zero_point_three_RMB = red.rep.readItem[0].redCount;
    this.share_zero_point_three_RMB = red.rep.readItem[3].redCount;
    this.two_RMB = red.rep.readItem[2].redCount;
    this.eight_RMB = red.rep.readItem[1].redCount;
    this.todayUserCount = todayUserCount.rep.userAboutCount[0].userAboutCount;
    this.userCount = userCount.rep.userAboutCount[0].userAboutCount;
    this.reaTotal =
      (30 * this.zero_point_three_RMB) / 100 +
      2 * this.two_RMB +
      8 * this.eight_RMB;
    this.today_Invitation = today_result.rep.userAboutCount[0];
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
    this.options2.datasets[1].data = JSON.parse(
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
      this.options1.datasets[0].data.push(item[0].redCount);
      this.options1.datasets[1].data.push(item[2].redCount);
      this.options1.datasets[2].data.push(item[1].redCount);
      this.options1.datasets[3].data.push(item[3].redCount);
    });

    // 右边图表
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
    this.options2.datasets[0].data = JSON.parse(sessionStorage.getItem("arr"));
    this.options2.labels = JSON.parse(sessionStorage.getItem("date"));
    this.options1.labels = JSON.parse(sessionStorage.getItem("date"));

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
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()}`;
      });
    },
  },
};
</script>

<style scoped>
.el-row {
  /* margin-bottom: 20px; */
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

.schart {
  width: 100%;
  height: 300px;
}
</style>
