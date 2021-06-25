<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img :src="userphoto" class="user-avator" alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{ username }}</div>
              <div>{{ role }}</div>
            </div>
          </div>
          <!-- <div class="user-info-list">
            上次登录时间：
            <span>2021-06-07</span>
          </div>-->
          <div class="user-info-list">
            上次登录地点：
            <span>郑州</span>
          </div>
        </el-card>
        <!-- <el-card shadow="hover" style="height:252px;">
          <template #header>
            <div class="clearfix">
              <span>人均年龄</span>
            </div>
          </template>
          50~70（岁）
          <el-progress :percentage="71.3" color="#42b983"></el-progress>40~50（岁）
          <el-progress :percentage="24.1" color="#f1e05a"></el-progress>20~30（岁）
          <el-progress :percentage="13.7"></el-progress>其他
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
          <schart class="schart3" canvasId="pie" :options="options3"></schart>
        </el-card>-->
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">6666</div>
                  <div>用户总量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-1">
                <i class="el-icon-user-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">6666</div>
                  <div>用户总量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message-solid grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-3">
                <i class="el-icon-s-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5000</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- <el-card shadow="hover" style="height:267px;">
          <template #header>
            <div class="clearfix">
              <span>最近一周注册情况</span>
            </div>
          </template>
        </el-card>-->
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>最近一周购买商品</span>
            </div>
          </template>
          <div class="schart-box">
            <schart class="schart" canvasId="pie" :options="options1" style="width: 500px;"></schart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>最近一周购下载走势</span>
            </div>
          </template>
          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from "vue-schart";
export default {
  name: "dashboard",
  data() {
    return {
      name: "游客",
      photo:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      todoList: [
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: false,
        },
        {
          title: "今天要修复100个bug",
          status: true,
        },
        {
          title: "今天要写100行代码加几个bug吧",
          status: true,
        },
      ],
      data: [
        {
          name: "2018/09/04",
          value: 1083,
        },
        {
          name: "2018/09/05",
          value: 941,
        },
        {
          name: "2018/09/06",
          value: 1139,
        },
        {
          name: "2018/09/07",
          value: 816,
        },
        {
          name: "2018/09/08",
          value: 327,
        },
        {
          name: "2018/09/09",
          value: 228,
        },
        {
          name: "2018/09/10",
          value: 1065,
        },
      ],

      options2: {
        type: "line",
        labels: ["6月", "7月", "8月", "9月", "10月"],
        datasets: [
          {
            label: "下载量",
            data: [234, 278, 270, 190, 230],
          },
        ],
      },
      options1: {
        type: "pie",
        legend: {
          position: "left",
        },
        bgColor: "#fbfbfb",
        labels: ["T恤", "牛仔裤", "连衣裙", "毛衣", "七分裤", "短裙", "羽绒服"],
        datasets: [
          {
            data: [334, 278, 190, 235, 260, 200, 141],
          },
        ],
      },
    };
  },
  components: {
    Schart,
  },
  computed: {
    role() {
      return this.name === "developer" ? "超级管理员" : "普通用户";
    },
    userphoto() {
      let userphoto = JSON.parse(localStorage.getItem("userInfo"));
      return userphoto ? userphoto.photo : this.photo;
    },
    username() {
      let username = JSON.parse(localStorage.getItem("userInfo"));
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
  margin-bottom: 20px;
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

.schart-box {
  display: inline-block;
  margin: 20px;
}
</style>
