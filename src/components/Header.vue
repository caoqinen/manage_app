<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i :class="!collapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
      <!-- <i v-else class="el-icon-s-unfold"></i> -->
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="userphoto" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <!-- <el-dropdown-menu> -->
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
            <!-- </el-dropdown-menu> -->
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreen: false,
      name: "游客",
      message: 2,
      photo:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  computed: {
    username() {
      let username = JSON.parse(localStorage.getItem("userInfo"));
      return username ? username.lineName : this.name;
    },
    userphoto() {
      let userphoto = JSON.parse(localStorage.getItem("userInfo"));
      return userphoto ? userphoto.photo : this.photo;
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.clear();
        this.$message.success("退出登陆");
        this.$router.push("/login");
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.$store.commit("hadndleCollapse", !this.collapse);
    },
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
