<template>
  <div class="container">
    <div class="handle-box">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input placeholder="栏目名称" v-model="lineName" clearable class="handle-input mr10"></el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="栏目描述"
            maxlength="11"
            v-model="lineDesc"
            clearable
            class="handle-input mr10"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="value" filterable clearable placeholder="请选择" @focus="change">
            <el-option
              v-for="item in colSelectList.arr"
              :key="item.index"
              :label="item.lineName"
              :value="item.lineId"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="dialogVisible1 = true"
          >新增</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="searchAll">全部</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="columnList" style="width: 100%">
      <el-table-column prop="lineName" label="栏目名称"></el-table-column>
      <el-table-column prop="lineDesc1" label="栏目描述"></el-table-column>
      <el-table-column prop="titleType" label="栏目类型"></el-table-column>
      <el-table-column prop="titleAddress" label="位置">
        <template #default="scope">
          <div v-if="!scope.row.titleAddress">无</div>
          <div v-else>{{scope.row.titleAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dateTime" label="时间"></el-table-column>
      <el-table-column label="状态" width="130">
        <template #default="scope">
          <el-tag v-if="scope.row.lineStatus === '00'" type="primary" disable-transitions>正常</el-tag>
          <el-tag v-else type="danger" disable-transitions>已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-tooltip class="item" effect="dark" content="编辑内容" placement="top">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="handleClick(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="8">
              <el-tooltip class="item" effect="dark" content="上传背景图" placement="top">
                <el-button type="primary" size="small" @click="uploadImg(scope.row)">
                  上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="5">
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="deleteLanmu(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-col>
            <el-col :span="4">
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <el-button plain type="primary" icon="el-icon-view" size="small" @click="seeLanmu"></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
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
        :total="columnListCount"
        @current-change="currentPage"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog title="编辑修改" v-model="dialogVisible" width="40%" :before-close="handleClose">
      <el-input placeholder="栏目名称" v-model="dialogData.lineName" class="handle-input mr10"></el-input>
      <el-input placeholder="栏目描述" v-model="dialogData.lineDesc" class="handle-input mr10"></el-input>
      <el-input
        placeholder="栏目类型"
        v-model="dialogData.titleType"
        disabled
        class="handle-input mr10"
      ></el-input>
      <el-input placeholder="位置" v-model="dialogData.titleAddress" class="handle-input mr10"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1_method">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="新增栏目" v-model="dialogVisible1" width="40%" :before-close="handleClose">
      <el-input placeholder="栏目名称" v-model="dialogData1.lineName" class="handle-input mr10"></el-input>
      <el-input placeholder="栏目描述" v-model="dialogData1.lineDesc" class="handle-input mr10"></el-input>
      <el-select
        v-model="dialogData1.titleType"
        filterable
        clearable
        placeholder="请选择"
        style="width:100%;"
      >
        <el-option
          v-for="item in xinzenglanmu"
          :key="item.index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input placeholder="位置" v-model="dialogData1.titleAddress" class="handle-input mr10"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible2_method">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="上传背景图" v-model="dialogVisible2" width="40%" :before-close="handleClose">
      <el-upload
        :headers="headers"
        :data="imgData"
        action="/api/file/title/updateFileIdByLineId"
        :auto-upload="false"
        :on-change="on_change"
        :on-remove="on_remove"
        :on-success="on_success"
        :on-error="on_error"
        :on-exceed="on_exceed"
        class="upload-demo"
        ref="upload"
        limit="1"
        name="files"
        multiple
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">只能上传图片，且不超过 10MB</div>
        </template>
      </el-upload>
      <!-- <el-progress :text-inside="true" :stroke-width="24" :percentage="percent" status="success"></el-progress> -->

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <!-- @click="submitUpload" -->
          <el-button type="primary" @click="dialogVisible3_method">上 传</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uploadCol, editColumn } from "@/utils/request.js";
export default {
  data() {
    return {
      headers: {
        Authorization: "",
        "Resource-Id": "2ef21c9d-dfa8-4370-9aa8-ab912f7fba88",
      },
      imgData: { lineId: "", belong: "" },
      current_page: 1,
      page_size: 10,
      lineName: "",
      lineDesc: "",
      value: "",
      xinzenglanmu: [
        {
          value: "Circle",
          label: "圈子栏目",
        },
        {
          value: "Recommend",
          label: "圈子推荐栏目",
        },
      ],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogData: {
        lineName: "",
        titleType: "",
        titleAddress: "",
        lineDesc: "",
        lineId: "",
      },
      dialogData1: {
        lineName: "",
        titleType: "",
        titleAddress: "",
        lineDesc: "",
        titleLat: "1",
        titleLng: "1",
      },
      fileSize: "",
    };
  },

  computed: {
    ...mapGetters({
      columnList: "column/columnList",
      columnListCount: "column/columnListCount",
      colSelectList: "columnSelect/colSelectList",
    }),
  },

  mounted() {
    this.columnListActions({
      lineName: "",
      lineDesc: "",
      titleType: "",
      lineId: "",
      titleAddress: "",
      start: (this.current_page - 1) * this.page_size,
      length: this.page_size,
    });

    this.colListActions({
      start: 0,
      length: 5,
    });
  },

  methods: {
    ...mapActions({
      columnListActions: "column/columnListActions",
      colListActions: "columnSelect/colListActions",
    }),
    init() {
      this.columnListActions({
        lineName: "",
        lineDesc: "",
        titleType: "",
        lineId: "",
        titleAddress: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    on_remove(file) {
      this.$message.warning(`已删除名为：${file.name}的文件`);
    },
    on_change(file) {
      this.fileSize = file.raw.size / 1024;
    },
    on_exceed() {
      this.$message.warning("只能上传一张图片");
    },
    on_success() {
      this.$message.success("上传成功");
      this.$refs.upload.clearFiles();
      this.dialogVisible2 = false;
    },
    on_error(err) {
      this.$message.error("上传失败");
      throw err;
    },

    handleClick(row) {
      this.dialogVisible = true;
      this.dialogData = {
        lineName: row.lineName,
        titleAddress: row.titleAddress,
        titleType: row.titleType,
        lineDesc: row.lineDesc,
        lineId: row.lineId,
      };
    },

    uploadImg(data) {
      this.dialogVisible2 = true;
      this.imgData = {
        lineId: data.lineId,
        belong: localStorage.getItem("user"),
      };
      this.headers.Authorization = localStorage.getItem("token");
    },
    //save edit
    dialogVisible1_method() {
      this.dialogVisible = false;
      editColumn(this.dialogData).then((res) => {
        if (res.result.code.code === "0000") {
          this.init();
          this.$message.success("修改成功");
        }
      });
    },
    //add  edit
    dialogVisible2_method() {
      this.dialogVisible1 = false;
      this.dialogData1.titleBelong = localStorage.getItem("user");
      uploadCol(this.dialogData1).then((res) => {
        if (res.result.code.code === "0000") {
          this.init();
          this.$message.success("新增成功");
          this.dialogData1 = {
            lineName: "",
            titleType: "",
            titleAddress: "",
            lineDesc: "",
            titleLat: "1",
            titleLng: "1",
          };
        } else if (res.result.code.code === "0206") {
          this.$message.warning(res.result.code.massage);
        } else if (res.result.code.code === "0207") {
          this.$message.warning(res.result.code.massage);
        }
      });
    },

    dialogVisible3_method() {
      if (this.fileSize > 10000) {
        this.$message.warning("文件大小超出限制");
        return;
      }
      this.$refs.upload.submit();
    },

    seeLanmu() {
      this.$message.info("暂未开启");
    },
    search() {
      this.columnListActions({
        lineName: this.lineName,
        lineDesc: this.lineDesc,
        titleType: "",
        lineId: this.value,
        titleAddress: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },
    searchAll() {
      this.init();
    },

    currentPage(page) {
      this.current_page = page;
      this.init();
    },

    change() {
      this.colListActions({
        start: 0,
        length: this.colSelectList.userAboutCount[0],
      });
    },

    deleteLanmu(data) {
      if (data.lineStatus === "01") {
        this.$message.warning("请勿重复删除!");
        return;
      }
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          data.lineStatus = "01";
          editColumn(data).then((res) => {
            if (res.result.code.code === "0000")
              this.$message.success("删除成功!");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
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
  .el-input,
  .el-select {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.handle-box {
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
  margin-bottom: 20px;
  .handle-input {
    width: 220px;
    display: inline-block;
  }
}

// .handle-select {
//   width: 120px;
// }

.table {
  width: 100%;
  font-size: 14px;
}
// .red {
//   color: #ff0000;
// }
// .mr10 {
//   margin-right: 10px;
// }
// .table-td-thumb {
//   display: block;
//   margin: auto;
//   width: 40px;
//   height: 40px;
// }
</style>
  