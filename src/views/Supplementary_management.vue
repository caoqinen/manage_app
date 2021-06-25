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
        <el-col :span="6">
          <el-select v-model="vipTvpeValue" placeholder="请选择">
            <el-option
              v-for="item in vipType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="searchAll">全部</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="supplementary_list" style="width: 100%">
      <el-table-column prop="lineName" label="用户名称"></el-table-column>
      <el-table-column prop="lineDesc1" label="用户详情"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="userAddress" label="位置">
        <template #default="scope">
          <div v-if="!scope.row.userAddress">无</div>
          <div v-else>{{scope.row.userAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dateTime" label="时间"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.lineStatus === '00'" type="primary" disable-transitions>正常</el-tag>
          <el-tag v-else type="danger" disable-transitions>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- @size-change="currentPage"
    @prev-click="prev_click"
    @next-click="next_click"-->

    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :current-page="current_page"
        :page-size="page_size"
        hide-on-single-page
        :total="supplementary_listCount"
        @current-change="currentPage"
      ></el-pagination>
    </div>

    <el-dialog title="编辑修改" v-model="dialogVisible" width="40%" :before-close="handleClose">
      <el-input placeholder="用户名" v-model="dialogData.lineName" class="handle-input mr10"></el-input>
      <el-input placeholder="用户详情" v-model="dialogData.userdetail" class="handle-input mr10"></el-input>
      <el-input
        placeholder="手机号"
        v-model="dialogData.phone"
        maxlength="11"
        class="handle-input mr10"
      ></el-input>
      <el-input placeholder="位置" v-model="dialogData.userAddress" class="handle-input mr10"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible_method">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { edit_supplementary_list } from "@/utils/request.js";
export default {
  data() {
    return {
      current_page: 1,
      page_size: 10,
      lineName: "",
      phone: "",
      vipType: [
        {
          value: "General",
          label: "General",
        },
        {
          value: "Vip_01",
          label: "Vip_01",
        },
      ],
      vipTvpeValue: "",
      dialogVisible: false,
      dialogData: {
        lineName: "",
        phone: "",
        userAddress: "",
        userdetail: "",
        lineId: "",
      },
    };
  },

  computed: {
    ...mapGetters({
      supplementary_list: "supplementary/supplementary_list",
      supplementary_listCount: "supplementary/supplementary_listCount",
    }),
  },

  mounted() {
    this.supplementary_listActions({
      lineName: "",
      vipType: "",
      phone: "",
      inviteUser: "",
      userAddress: "",
      start: (this.current_page - 1) * this.page_size,
      length: this.page_size,
    });
  },

  methods: {
    ...mapActions({
      supplementary_listActions: "supplementary/supplementary_listActions",
    }),
    handleClick(row) {
      this.dialogVisible = true;
      this.dialogData = {
        lineName: row.lineName,
        phone: row.phone,
        userAddress: row.userAddress,
        userdetail: row.lineDesc,
        lineId: row.lineId,
      };
    },
    //save edit
    dialogVisible_method() {
      this.dialogVisible = false;
      edit_supplementary_list(this.dialogData).then((res) => {
        if (res.result.code.code === "0000") {
          this.current_page = 1;
          this.supplementary_listActions({
            lineName: "",
            vipType: "",
            phone: "",
            inviteUser: "",
            userAddress: "",
            start: (this.current_page - 1) * this.page_size,
            length: this.page_size,
          });
          this.$message.success("修改成功");
        }
      });
    },
    search() {
      this.supplementary_listActions({
        lineName: this.lineName,
        vipType: this.vipTvpeValue,
        phone: this.phone,
        inviteUser: "",
        userAddress: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
      // this.phone = "";
      // this.lineName = "";
      // this.vipTvpeValue = "";
    },
    searchAll() {
      this.supplementary_listActions({
        lineName: "",
        vipType: "",
        phone: "",
        inviteUser: "",
        userAddress: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    currentPage(page) {
      this.current_page = page;
      this.supplementary_listActions({
        lineName: "",
        vipType: "",
        phone: "",
        inviteUser: "",
        userAddress: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch((err) => {
          console.log(err);
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
  