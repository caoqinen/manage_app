<template>
  <div class="container">
    <div class="handle-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="用户名" v-model="lineName" class="handle-input mr10"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="手机号" maxlength="11" v-model="phone" class="handle-input mr10"></el-input>
        </el-col>
        <!-- <el-col :span="6">
          <el-select v-model="vipTvpeValue" placeholder="请选择">
            <el-option
              v-for="item in vipType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>-->
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="searchAll">全部</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="getInvitation_list" style="width: 100%">
      <el-table-column prop="lineName" label="用户名称" width="120px"></el-table-column>
      <el-table-column label="用户头像">
        <template #default="scope">
          <div class="demo-image">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.photo"
              :alt="scope.row.phone"
              fit="contain"
            ></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="userAddress" label="位置" width="100px">
        <template #default="scope">
          <div v-if="!scope.row.userAddress">无</div>
          <div v-else>{{scope.row.userAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dateTime" label="注册时间"></el-table-column>
      <el-table-column label="会员状态" width="100px">
        <template #default="scope">
          <el-tag v-if="scope.row.lineStatus === '00'" type="primary" disable-transitions>正常</el-tag>
          <el-tag v-else type="danger" disable-transitions>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="vip状态" width="100px">
        <template #default="scope">
          <el-tag v-if="scope.row.vipType === 'General'" type="info" disable-transitions>未开通</el-tag>
          <el-tag v-else type="primary" disable-transitions>已开通</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.userInviteCount == 0 ? '暂未邀请记录' : '查看邀请记录'"
            placement="top"
          >
            <el-button
              plain
              :disabled="scope.row.userInviteCount == 0"
              type="primary"
              icon="el-icon-view"
              size="small"
              @click="seeInvitationLogs(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="current_page"
        :page-size="page_size"
        hide-on-single-page
        :total="getInvitation_listCount"
        @current-change="currentPage"
      ></el-pagination>
    </div>

    <el-dialog title="邀请人信息" v-model="dialogTableVisible">
      <el-table :data="userAbout_list" style="width: 100%">
        <el-table-column property="lineName" label="用户名" width="150"></el-table-column>
        <el-table-column property="phone" label="手机号" width="150"></el-table-column>
        <el-table-column prop="userAddress" label="位置">
          <template #default="scope">
            <div v-if="!scope.row.userAddress">无</div>
            <div v-else>{{scope.row.userAddress}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="dateTime" label="注册时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="current_page_in"
          :page-size="page_size_in"
          hide-on-single-page
          :total="userAbout_list_count"
          @current-change="currentPage_in"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getInvitation } from "@/utils/request.js";
export default {
  data() {
    return {
      current_page: 1,
      page_size: 10,
      current_page_in: 1,
      page_size_in: 10,
      lineName: "",
      phone: "",
      dialogTableVisible: false,
      userAbout_list: [],
      userAbout_list_count: "",
      lineID: "",
    };
  },
  filters: {
    date(params) {
      let year = params.slice(0, 4);
      let mouth = params.slice(4, 6);
      let day = params.slice(6, 8);
      let hour = params.slice(8, 10);
      let minute = params.slice(10, 12);
      return `${year}-${mouth}-${day} ${hour}:${minute}`;
    },
  },

  computed: {
    ...mapGetters({
      getInvitation_list: "invitationList/getInvitation_list",
      getInvitation_listCount: "invitationList/getInvitation_listCount",
    }),
  },

  mounted() {
    this.getInvitation_listActions({
      lineName: "",
      phone: "",
      start: (this.current_page - 1) * this.page_size,
      length: this.page_size,
    });
  },

  methods: {
    ...mapActions({
      getInvitation_listActions: "invitationList/getInvitation_listActions",
    }),

    search() {
      this.getInvitation_listActions({
        lineName: this.lineName,
        phone: this.phone,
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },
    searchAll() {
      this.lineName = "";
      this.phone = "";
      this.getInvitation_listActions({
        lineName: this.lineName,
        phone: this.phone,
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    seeInvitationLogs(data) {
      this.dialogTableVisible = true;
      this.lineID = data.lineId;
      getInvitation({
        daysAgo: 100000,
        daysNow: 0,
        userId: this.lineID,
        start: (this.current_page_in - 1) * this.page_size_in,
        length: this.page_size_in,
      }).then((res) => {
        res.rep.userAbout.forEach((item) => {
          let year = item.dateTime.slice(0, 4);
          let mouth = item.dateTime.slice(4, 6);
          let day = item.dateTime.slice(6, 8);
          let hour = item.dateTime.slice(8, 10);
          let minute = item.dateTime.slice(10, 12);
          item.dateTime = `${year}-${mouth}-${day} ${hour}:${minute}`;
        });
        this.userAbout_list_count = res.rep.userAboutCount[0];
        this.userAbout_list = res.rep.userAbout;
      });
    },

    currentPage(page) {
      this.current_page = page;
      this.getInvitation_listActions({
        lineName: this.lineName,
        phone: this.phone,
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },
    currentPage_in(page) {
      this.current_page_in = page;
      getInvitation({
        daysAgo: 100000,
        daysNow: 0,
        userId: this.lineID,
        start: (this.current_page_in - 1) * this.page_size_in,
        length: this.page_size_in,
      }).then((res) => {
        res.rep.userAbout.forEach((item) => {
          let year = item.dateTime.slice(0, 4);
          let mouth = item.dateTime.slice(4, 6);
          let day = item.dateTime.slice(6, 8);
          let hour = item.dateTime.slice(8, 10);
          let minute = item.dateTime.slice(10, 12);
          item.dateTime = `${year}-${mouth}-${day} ${hour}:${minute}`;
        });
        this.userAbout_list_count = res.rep.userAboutCount[0];
        this.userAbout_list = res.rep.userAbout;
      });
    },
  },
};
</script>


<style scoped lang="scss">
.container {
  .el-input {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  // .el-col {
  //   margin-right: 20px;
  //   &:last-child {
  //     margin-right: 0;
  //   }
  // }
}
.handle-box {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  margin-bottom: 20px;
  .handle-input {
    width: 250px;
    display: inline-block;
  }
}

.handle-select {
  width: 120px;
}

.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
  