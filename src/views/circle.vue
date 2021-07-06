<template>
  <div class="container">
    <div class="handle-box">
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="栏目归属"
            disabled
            v-model="lineName"
            clearable
            class="handle-input mr10"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-input
            placeholder="圈子描述"
            maxlength="11"
            v-model="lineDesc"
            clearable
            class="handle-input mr10"
          ></el-input>
        </el-col>
        <el-col :span="5">
          <el-select v-model="value" filterable clearable placeholder="请选择" @focus="change">
            <el-option
              v-for="item in seleList"
              :key="item.lineId"
              :label="item.lable"
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
    <el-table :data="publicList.circle" style="width: 100%">
      <el-table-column prop="lineName" label="栏目归属"></el-table-column>
      <el-table-column prop="lineDesc1" label="圈子描述"></el-table-column>
      <el-table-column prop="circleType" label="圈子类型"></el-table-column>
      <el-table-column prop="circleAddress" label="位置">
        <template #default="scope">
          <div v-if="!scope.row.circleAddress">无</div>
          <div v-else>{{scope.row.circleAddress}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="dateTime" label="发布时间"></el-table-column>
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
                <el-button
                  plain
                  type="primary"
                  icon="el-icon-view"
                  size="small"
                  @click="seeLanmu(scope.row)"
                ></el-button>
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
        :total="publicListCount"
        @current-change="currentPage"
      ></el-pagination>
    </div>
    <!-- 弹框 -->
    <el-dialog title="编辑修改" v-model="dialogVisible" width="40%" :before-close="handleClose">
      <el-input placeholder="圈子名称" v-model="dialogData.lineName" class="handle-input mr10"></el-input>
      <el-input placeholder="圈子描述" v-model="dialogData.lineDesc" class="handle-input mr10"></el-input>
      <el-input
        placeholder="圈子类型"
        v-model="dialogData.circleType"
        disabled
        class="handle-input mr10"
      ></el-input>
      <el-input placeholder="位置" v-model="dialogData.circleAddress" class="handle-input mr10"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1_method">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="新增圈子" v-model="dialogVisible1" width="40%" :before-close="handleClose">
      <!-- <el-input placeholder="栏目名称" v-model="imgData.name" class="handle-input mr10"></el-input> -->
      <el-select
        v-model="imgData.titleId"
        filterable
        placeholder="栏目名称"
        style="width:100%;"
        disabled
      >
        <el-option
          v-for="item in seleList"
          :key="item.lineId"
          :label="item.lable"
          :value="item.lineId"
        ></el-option>
      </el-select>
      <el-input placeholder="圈子描述" v-model="imgData.desc" class="handle-input mr10"></el-input>
      <el-select
        v-model="imgData.titleId"
        filterable
        allow-create
        clearable
        placeholder="请选择栏目"
        style="width:100%;"
        @focus="change"
      >
        <el-option
          v-for="item in seleList"
          :key="item.lineId"
          :label="item.lable"
          :value="item.lineId"
        ></el-option>
      </el-select>
      <el-input placeholder="位置" v-model="imgData.address" class="handle-input mr10"></el-input>
      <!-- <el-button type="primary" @click="uploadBtn(true)">上传视频</el-button>
      <el-button type="success" @click="uploadBtn(false)">上传图片</el-button>-->
      <!-- 图片上传 -->
      <el-upload
        action="/api/file/circle/insert"
        :headers="headers"
        :data="imgData"
        :limit="limit"
        list-type="picture-card"
        ref="upload"
        name="files"
        multiple
        :on-change="on_change"
        :auto-upload="false"
        :file-list="handleFileList"
        :on-remove="on_remove"
        :http-request="http_request"
        :on-exceed="on_exceed"
        :before-upload="before_upload"
        accept=".jpg, .jpeg, .png, .gif, .mp4"
      >
        <template #default>
          <i class="el-icon-plus"></i>
        </template>
        <template #file="{file}">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible3_method">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisibleImg">
      <img width="680" :src="dialogImageUrl" alt />
    </el-dialog>

    <!-- imgUrl:[],
    videoUrl:''-->
    <el-dialog title="圈子详情" v-model="circle_dialogVisible" width="40%" :before-close="handleClose">
      <el-input v-model="creator" disabled>
        <template #prepend>发布者名称:</template>
      </el-input>
      <el-input v-model="colum_belong" disabled>
        <template #prepend>栏目归属:</template>
      </el-input>
      <el-input v-model="circleLabel" disabled>
        <template #prepend>圈子描述:</template>
      </el-input>
      <el-input v-model="create_time" disabled>
        <template #prepend>发布时间:</template>
      </el-input>
      <h3 style="margin-bottom: 20px;" :gutter="20" v-if="imgUrl.length > 0">发布内容：</h3>
      <video
        v-if="videoUrl.length > 0 && videoUrl.substring(videoUrl.length - 4) == '.mp4'"
        width="500"
        height="300"
        controls
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
      <el-row :gutter="20" v-else-if="imgUrl.length > 0">
        <el-col v-for="item in imgUrl" :key="item.groupId" :span="8" style="margin-bottom: 20px;">
          <el-image style="width: 150px; height: 150px" :src="item.fileItemLink" fit="fit"></el-image>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="circle_dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="circle_dialogVisible_close">关 闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>



  

<script>
import { mapGetters, mapActions } from "vuex";
import { uploadFile, editCircle, getCircleDetail } from "@/utils/request.js";
export default {
  data() {
    return {
      circle_dialogVisible: false,
      limit: 9,
      headers: {
        Authorization: "",
        "Content-Type": "multipart/form-data",
        "Resource-Id": "f859b248-0ce5-4e28-abf6-a3fd6205bfba",
      },
      imgData: {
        name: "",
        desc: "",
        belong: "8b008f34-3c51-493d-86f4-cfcf1b55fe84",
        type: "General",
        titleId: "",
        region: "",
        lat: "1",
        lng: "1",
        address: "郑州市",
      },
      current_page: 1,
      page_size: 10,
      lineName: "",
      lineDesc: "",
      value: "",
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogData: {
        lineName: "",
        circleType: "",
        circleAddress: "",
        lineDesc: "",
        lineId: "",
      },
      dialogData1: {
        lineName: "",
        circleType: "",
        circleAddress: "",
        lineDesc: "",
        titleLat: "1",
        titleLng: "1",
      },
      fileSize: "",
      dialogImageUrl: "",
      disabled: false,
      handleFileList: [], //文件数组
      dialogVisibleImg: false,
      hideUploadAdd: "display:none;",
      hideUploadAdd1: "display:none;", //视频显示
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      creator: "",
      colum_belong: "",
      circleLabel: "",
      create_time: "",
      imgUrl: [],
      videoUrl: "",
    };
  },

  computed: {
    ...mapGetters({
      seleList: "selectList/seleList",
      titlecount: "selectList/titlecount",
      publicList: "circle/publicList",
      publicListCount: "circle/publicListCount",
    }),
  },

  mounted() {
    this.publicListActions({
      lineName: "",
      lineDesc: "",
      titleId: "",
      circleBelong: "",
      circleType: "",
      start: (this.current_page - 1) * this.page_size,
      length: this.page_size,
    });

    this.selectListActions({
      lineName: "",
      lineDesc: "",
      titleBelong: "",
      titleType: "",
      start: 0,
      length: 10,
    });
  },

  methods: {
    ...mapActions({
      publicListActions: "circle/publicListActions",
      selectListActions: "selectList/selectListActions",
    }),
    init() {
      this.publicListActions({
        lineName: "",
        lineDesc: "",
        titleId: "",
        circleBelong: "",
        circleType: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    // 上传文件
    http_request(file) {
      // this.fileData.append('files', file.file);
      console.log(file);
    },

    handleRemove(file) {
      let index = this.handleFileList.findIndex(
        (item) => item.name == file.name
      );
      this.handleFileList.splice(index, 1);
      this.$message.warning(`已删除名为：${file.name}的文件`);
    },
    handlePictureCardPreview(file) {
      // this.$message.info(`暂未开启`);
      this.dialogVisibleImg = true;
      this.dialogImageUrl = file.url;
    },
    handleDownload(file, fileList) {
      console.log(file, fileList);
    },
    before_upload(file) {
      console.log(file);
    },
    on_remove(file) {
      this.$message.warning(`已删除名为：${file.name}的文件`);
    },
    on_change(file, fileList) {
      this.handleFileList = fileList;
      // fileList.forEach((item) => {
      //   if (item.raw.name.split(".")[1].toLowerCase() == "mp4") {
      //     this.$message.warning("图片中不能包含视频");
      //   }
      // });
    },
    on_exceed() {
      this.$message.warning("图片上传最多9张");
      return false;
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
        circleAddress: row.circleAddress,
        circleType: row.circleType,
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
      editCircle(this.dialogData).then((res) => {
        if (res.result.code.code === "0000") {
          this.init();
          this.$message.success("修改成功");
        } else if (res.result.code.code === "0204") {
          this.$message.warning(
            `${res.result.code.info}${res.result.code.massage}`
          );
        }
      });
    },

    dialogVisible3_method() {
      this.seleList.forEach((item) => {
        if (item.lineId == this.imgData.titleId) this.imgData.name = item.lable;
      });
      var formData = new FormData();
      if (this.handleFileList.length <= 0) formData.append("files", "[]");
      else {
        this.handleFileList.forEach((item) => {
          formData.append("files", item.raw);
        });
      }
      formData.append("name", this.imgData.name);
      formData.append("desc", this.imgData.desc);
      formData.append("titleId", this.imgData.titleId);
      formData.append("belong", localStorage.getItem("user"));
      formData.append("type", "General");
      formData.append("region", "circle");
      formData.append("lat", "1");
      formData.append("lng", "1");
      formData.append("address", this.imgData.address);
      uploadFile(formData)
        .then((res) => {
          if (res.result.code.code === "0000") {
            this.dialogVisible1 = false;
            this.$refs.upload.clearFiles();
            this.init();
            this.$message.success("添加成功");
            this.imgData = {
              name: "",
              desc: "",
              belong: localStorage.getItem("user"),
              type: "General",
              titleId: "",
              region: "",
              lat: "1",
              lng: "1",
              address: "ADDRESS",
            };
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
      // }
    },

    seeLanmu(data) {
      this.circle_dialogVisible = true;
      getCircleDetail({ lineId: data.lineId }).then((res) => {
        this.colum_belong = res.rep.circle[0].lineName;
        this.creator = res.rep.circle[0].circleBelong[0].lineName;
        this.circleLabel = res.rep.circle[0].lineDesc;
        let year = res.rep.circle[0].dateTime.slice(0, 4);
        let mouth = res.rep.circle[0].dateTime.slice(4, 6);
        let day = res.rep.circle[0].dateTime.slice(6, 8);
        let hour = res.rep.circle[0].dateTime.slice(8, 10);
        let minute = res.rep.circle[0].dateTime.slice(10, 12);
        this.create_time = `${year}-${mouth}-${day} ${hour}:${minute}`;
        this.imgUrl = res.rep.circle[0].circleFile;
        this.videoUrl = res.rep.circle[0].circleFile[0].fileItemLink;
        // console.log(this.videoUrl);
      });
    },
    circle_dialogVisible_close() {
      this.circle_dialogVisible = false;
      this.videoUrl = "";
    },
    search() {
      this.publicListActions({
        lineName: this.lineName,
        lineDesc: this.lineDesc,
        titleId: this.value,
        circleBelong: "",
        circleType: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },
    searchAll() {
      this.current_page = 1;
      this.init();
    },

    currentPage(page) {
      this.current_page = page;
      this.publicListActions({
        lineName: this.lineName,
        lineDesc: this.lineDesc,
        titleId: this.value,
        circleBelong: "",
        circleType: "",
        start: (this.current_page - 1) * this.page_size,
        length: this.page_size,
      });
    },

    change() {
      console.log(this.seleList.length);
      this.selectListActions({
        lineName: "",
        lineDesc: "",
        titleBelong: "",
        titleType: "",
        start: 0,
        length: this.titlecount,
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
          editCircle(data).then((res) => {
            if (res.result.code.code === "0000") {
              this.init();
              this.$message.success("删除成功");
            }
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

  .hide .el-upload--picture-card {
    display: none !important;
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
</style>
  