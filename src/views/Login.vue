<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="user">
          <el-input v-model="param.user" placeholder="请输入用户名">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            disabled
            type="password"
            placeholder="password"
            v-model="param.password"
            @keyup.enter="submitForm()"
          >
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { adminLogin, getUserInfo } from "@/utils/request";
export default {
  data() {
    return {
      param: {
        password: "saluoweiya",
        user: "",
        client: "web_client",
        secret: "saluoweiya1A",
      },
      rules: {
        user: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.$store.commit("clearTags");
  },
  methods: {
    async submitForm() {
      if (!this.param.user) {
        this.$message.error("请输入用户名");
        return;
      }
      let result = await adminLogin(this.param);
      if (result.result.code.code != "0000")
        this.$message.error(result.result.code.massage);
      let { token, user } = result.rep;
      getUserInfo({ groupId: user }).then((res) => {
        // console.log(res);
        if (res.rep.userAbout.length >= 1) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          localStorage.setItem(
            "userInfo",
            JSON.stringify(res.rep.userAbout[0])
          );
          this.$message.success("登录成功");
          this.$router.push("/");
        } else this.$message.error("获取用户信息失败");
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(https://static.zhongkangronghua.cn/img/manage/1.png);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>