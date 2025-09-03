<template>
  <div class="outer">
    <div class="login-box">
      <div class="login-box-top">
        <span @click="toLoginPage">账号登录</span>
        <span @click="toEmailLoginPage">邮箱登录</span>
      </div>
      <div class="login" v-if="currentPage === 'login'">
        <div class="user">
          <el-input
            v-model="user.email"
            placeholder="请输入您的QQ邮箱"
          ></el-input>
        </div>
        <div class="password">
          <el-input
            v-model="user.password"
            placeholder="请输入您的密码"
          ></el-input>
        </div>
        <el-button class="login-button" @click="login" type="primary"
          >登录</el-button
        >
        <div class="register-box">
          <a class="login-a"
            >没有账号？<span class="login-span" @click="toRegister"
              >立即注册</span
            ></a
          >
        </div>
      </div>

      <div class="another-login" v-else-if="currentPage === 'emailLogin'">
        <div class="email1">
          <el-input
            v-model="user.email"
            placeholder="请输入您的QQ邮箱"
          ></el-input>
          <button 
  ref="sendEmailButton" 
  class="send-email primary" 
  :disabled="isCooldown"
  @click="sendVerificationCode">
  发送
</button>
        </div>
        <div class="password">
          <el-input
            v-model="user.code"
            placeholder="请输入您的验证码"
          ></el-input>
        </div>
        <el-button class="emailLogin-button" @click="emailLogin" type="primary"
          >登录</el-button
        >
        <div class="register-box">
          <a class="login-a"
            >没有账号？<span class="login-span" @click="toRegister"
              >立即注册</span
            ></a
          >
        </div>
      </div>
      <div
        class="register"
        v-else-if="currentPage === 'register'"
        @submit.prevent="register"
      >
        <div class="email">
          <el-input
            v-model="user.email"
            placeholder="请输入您的QQ邮箱"
          ></el-input>
          <button 
  ref="sendEmailButton" 
  class="send-email primary" 
  :disabled="isCooldown"
  @click="sendVerificationCode">
  发送
</button>
        </div>
        <div class="password">
          <el-input
            v-model="user.password"
            placeholder="请输入密码（字母加数字）"
          ></el-input>
        </div>
        <div class="password">
          <el-input
            v-model="user.passwords"
            placeholder="请确认您的密码"
          ></el-input>
        </div>
        <div class="password">
          <el-input
            v-model="user.code"
            placeholder="请输入您的验证码"
          ></el-input>
        </div>
        <el-button class="register-button" @click="register" type="primary"
          >注册</el-button
        >
        <div class="register-box">
          <a class="register-a"
            >已有账号？<span class="register-span" @click="toLogin"
              >立即登录</span
            ></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { shallowReactive } from 'vue';
import axios from "axios";
export default {
  data() {
    return {
      currentPage: "login",
      user: {
        email: "",
        password: "",
        passwords: "",
        code: "",
        isCooldown: false,
        cooldownTimer: null,
        cooldownTime: 60, // 冷却时间（秒）
      cooldownInterval: null, // 定时器引用
      },
    };
  },
  watch: {
    currentPage(newVal) {
      if (newVal === "login") {
        this.resetUser();
      }
    },
  },
  methods: {
    judge() {
      if (this.$store.state.token === "") {
        if (this.$router.path !== "/User") {
          this.$router.push("/User");
        }
      }
    },
    resetUser() {
      this.user = {
        email: "",
        password: "",
        passwords: "",
        code: "",
        isCooldown: false,
        cooldownTimer: null,
      };
    },
    toRegister() {
      console.log(this.currentPage);
      this.currentPage = "register";
    },
    toLogin() {
      this.currentPage = "login";
    },
    toLoginPage() {
      this.currentPage = "login";
    },
    toEmailLoginPage() {
      this.currentPage = "emailLogin";
    },
    sendVerificationCode() {
      if (!this.user.email) {
        this.$message.error("请输入邮箱地址");
        return;
      }

      if (this.isCooldown){
        this.$message.warning(`请在${this.cooldownTime}后重新发送！`)
      }else{
        axios
        .post("http://121.40.221.40:8080/qingteng-recruitment/user/sendEmail", {
          email: this.user.email,
        })
        .then((response) => {
          this.$message.success(response.data.message);
          this.startCooldown();
        })
        .catch((error) => {
          console.error("发送验证码失败:", error.message);
          this.$message.error(error.message || "发送验证码失败");
        });
      }

     
    },
    startCooldown() {
      this.isCooldown = true;
      this.cooldownTime = 60;

      if (this.cooldownInterval) {
        clearInterval(this.cooldownInterval);
      }

      this.updateButtonText(); // 初始化按钮文本

      this.cooldownInterval = setInterval(() => {
        if (this.cooldownTime > 0) {
          this.cooldownTime--;
          this.updateButtonText(); // 每秒更新按钮文本
        } else {
          this.stopCooldown();
        }
      }, 1000);
    },
    stopCooldown() {
      clearInterval(this.cooldownInterval);
      this.cooldownInterval = null;
      this.isCooldown = false;
      this.updateButtonText(); // 更新按钮文本为初始状态
    },
    updateButtonText() {
      // 直接在这里更新 cooldownTime 即可，不需要 $nextTick
      // 因为这是响应式的，Vue 会自动处理 DOM 更新
    },
  

    login() {
      axios
        .post(
          "http://121.40.221.40:8080/qingteng-recruitment/user/login",
          this.user
        )
        .then((response) => {
          // 隐藏加载状态
          this.$message.closeAll();

          if (response.data.code === 200) {
            this.$store.dispatch("setToken", response.data.data.token);
            this.$store.dispatch("setAdmin", response.data.data.admin);
            if (response.data.data.admin === 3) {
              this.$router.push({ name: "showUser" });
            } else if (response.data.data.admin === 1) {
              this.$router.push({ name: "showAdministrator" });
            }
            this.$message.success(response.data.message);
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((error) => {
          // 隐藏加载状态
          this.$message.closeAll();
          console.error("Login error:", error.message);
          this.$message.error(error.message);
        });
    },
    emailLogin() {
      axios
        .post(
          "http://121.40.221.40:8080/qingteng-recruitment/user/emailLogin",
          this.user
        )
        .then((response) => {
          // 隐藏加载状态
          this.$message.closeAll();
          console.log("Response:", response); // 调试输出

          if (response.data.data) {
            this.$store.dispatch("setToken", response.data.data.token);
            this.$store.dispatch("setAdmin", response.data.data.admin);
            if (response.data.data.admin === 3) {
              this.$router.push({ name: "showUser" });
            } else if (response.data.data.admin === 1) {
              this.$router.push({ name: "showAdministrator" });
            } else if (response.data.data.admin === 2) {
              this.$router.push({ name: "showSuperAdministrator" });
            }
            this.$message.success(response.data.message);
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((error) => {
          // 隐藏加载状态
          this.$message.closeAll();
          console.error("Login error:", error);
          this.$message.error(error.message);
        });
    },
    async register() {
      try {
        const response = await axios.post(
          "http://121.40.221.40:8080/qingteng-recruitment/user/register",
          {
            email: this.user.email,
            password: this.user.password,
            passwords: this.user.passwords,
            code: this.user.code,
          }
        );
        if (response.data.message == "用户注册成功") {
          // 处理注册成功的情况
          this.$message.success(response.data.message);
          this.resetUser();
          this.currentPage = "login";
        } else {
          // 处理注册失败的情况
          this.$message.error(response.data.message);
        }
      } catch (error) {
        // 处理网络请求失败的情况
        this.$message.error(error.response.message);
      }
    },
    scrollToRight() {
      const windowWidth = window.innerWidth;
      const scrollPosition = windowWidth * 0.3;
      window.scrollTo(scrollPosition, 0);
    },
  },
  mounted() {
    // this.judge();
    this.scrollToRight();
  },
  // beforeDestroy() {
  //   this.$store.dispatch("setToken", "");
  // },
  beforeDestroy() {
    if (this.cooldownTimer) {
      clearTimeout(this.cooldownTimer);
    }
    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }
  },
};
</script>

<style>
.outer {
  width: 100vw;
  height: 920px;
  display: flex;
}

.inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-left: 750px;
}

.login-box {
  background-color: #fefefe;
  width: 450px;
  height: 550px;
  margin-left: 900px;
  margin-top: 150px;
  box-shadow: 2px 2px 2px 2px #dfe5f0;
}

.login-box-top {
  margin-left: 130px;
  margin-top: 80px;
}

.login-box-top span {
  padding: 10px 20px;
  /* 可以根据需要调整内边距 */
  cursor: pointer;
  /* 使 span 具有点击效果 */
}

.login-box-top span:hover {
  color: #8caada;
}

.user {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 80px;
  margin-left: 20px;
}

.el-input {
  width: 200px;
  background-clip: #f0f2fe;
}

.el-input__inner {
  background-color: #f0f2fe;
  /* 改变背景颜色 */
  color: black;
  /* 改变文本颜色 */
}

.password {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-left: 20px;
}

.password input {
  margin-right: 200px;
}

.login-button {
  width: 200px;
  color: white;
  margin-left: 134px;
  margin-top: 30px;
}

.emailLogin-button {
  width: 200px;
  color: white;
  margin-left: 134px;
  margin-top: 30px;
}

.register-button {
  width: 200px;
  color: white;
  margin-left: 134px;
  margin-top: 5px;
}

.register-box {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  margin-left: 100px;
  /* background-color: #F0F2FE; */
}

.email-login {
  display: flex;
  margin-left: 300px;
  margin-top: 20px;
}

.email {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 30px;
  margin-left: 115px;
}

.email1 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 30px;
  margin-top: 80px;
  margin-left: 115px;
}

input {
  width: 200px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
}

.forget-password {
  height: 20px;
  font-size: 18px;
  margin-left: 300px;
  color: #4d4c4c;
  margin-bottom: 10px;
}

.forget-password:hover {
  color: red;
  cursor: pointer;
}

.register-a {
  height: 20px;
  font-size: 18px;
  padding-left: 50px;
  color: #4d4c4c;
}

.login-a {
  height: 20px;
  font-size: 18px;
  padding-left: 50px;
  color: #4d4c4c;
}

.register-a:hover {
  cursor: pointer;
}

.login-a:hover {
  cursor: pointer;
}

.register-span {
  color: #03bb7a;
}

.login-span {
  color: #03bb7a;
}

.register-span:hover {
  color: red;
  cursor: pointer;
}

.login-span:hover {
  color: red;
  cursor: pointer;
}

.outer {
  background-image: url("../assets/itr-png/45.jpg");
  background-size: 100% 100%;
  image-rendering: crisp-edges;
}

.register-detail {
  margin-top: 10px;
}

.send-email {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-left: 10px;
}


</style>