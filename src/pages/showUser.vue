<template>
  <div class="outBox">
    <div class="innerBox">
      <div>
        <div class="top">
          <div class="top-middle">
            <img class="top-img" src="../../src/assets/itr-png/29.jpg" />
            <div class="top-aside">
              <input
                v-if="isEditing"
                class="input-style"
                v-model="userInformation.name"
                placeholder="请输入姓名"
              />
              <span
                v-else
                class="detail-text"
                v-text="userInformation.name"
              ></span>
              <h4 class="slogan">编程世界，我为王！</h4>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/20.png" />
              <h4>班级</h4>
            </div>
            <input
              v-if="isEditing"
              class="input-style"
              v-model="userInformation.classes"
              placeholder="请输入班级"
            />
            <span
              v-else
              class="detail-text"
              v-text="userInformation.classes"
            ></span>
          </div>
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/20.png" />
              <h4>学号</h4>
            </div>
            <input
              v-if="isEditing"
              class="input-style"
              v-model="userInformation.studentId"
              placeholder="请输入学号"
            />
            <span
              v-else
              class="detail-text"
              v-text="userInformation.studentId"
            ></span>
          </div>
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/21.png" />
              <h4>电话</h4>
            </div>
            <input
              v-if="isEditing"
              class="input-style"
              v-model="userInformation.phone"
              placeholder="请输入电话"
            />
            <span
              v-else
              class="detail-text"
              v-text="userInformation.phone"
            ></span>
          </div>
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/22.png" />
              <h4>QQ</h4>
            </div>
            <input
              v-if="isEditing"
              class="input-style"
              v-model="qq"
              placeholder="请输入QQ"
            />
            <span v-else class="detail-text" v-text="qq"></span>
          </div>
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/23.png" />
              <h4>学习方向</h4>
            </div>
            <div class="select">
              <strong
                ><span v-if="!isEditing">{{ direction }}</span></strong
              >
              <div v-if="isEditing">
                <el-radio v-model="direction" label="前端"></el-radio>
                <el-radio v-model="direction" label="后端"></el-radio>
                <el-radio v-model="direction" label="游戏开发"></el-radio>
              </div>
            </div>
          </div>
          <div class="detail">
            <div class="detail-aside">
              <img class="detail-img" src="../../src/assets/itr-png/24.png" />
              <h4>个人优势</h4>
            </div>
            <input
              v-if="isEditing"
              class="input-style"
              v-model="userInformation.advantage"
              placeholder="请输入个人优势"
            />
            <span
              v-else
              class="detail-text"
              @click="startEditing"
              v-text="userInformation.advantage"
            ></span>
          </div>
        </div>
        <el-button
          class="edit-button"
          type="primary"
          plain
          @click="startEditing"
          v-if="!isEditing"
          >编辑</el-button
        >
        <el-button
          class="edit-button"
          type="primary"
          plain
          @click="cancelEdit"
          v-if="isEditing"
          >取消</el-button
        >
        <el-button
          class="edit-button"
          type="primary"
          plain
          @click="saveChanges"
          v-if="isEditing"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isEditing: false,
      userInformation: {
        url: "",
        name: "",
        classes: "",
        studentId: "",
        qq: "",
        phone: "",
        direction: "",
        advantage: "",
      },
      originalUser: {},
      direction: "前端",
      qq: "",
    };
  },
  mounted() {
    // this.judge();
    this.fetchUserInfo();
  },
  methods: {
    judge() {
      if (this.$store.state.token === "") {
        if (this.$router.path !== "/User") {
          this.$router.push("/User");
        }
      }
    },
    fetchUserInfo() {
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/user/detail/show",
          {}, // 如果没有请求体，可以保留为空对象
          {
            headers: {
              "token": `${this.$store.state.token}`, // 设置 Authorization 头
            },
          }
        )
        .then((response) => {
          this.userInformation = response.data.data;
          this.qq = this.userInformation.qq;
        })
        .catch((error) => {
          this.error = error.message;
          console.error("Error fetching user info:", error);
        });
    },
    startEditing() {
      this.originalUser = this.userInformation;
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    saveChanges() {
      this.userInformation.direction = this.direction;

      this.isEditing = false;
      this.userInformation.qq = this.qq;
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/user/detail/edit",
          this.userInformation,
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.code == 200) {
            this.$message.success("用户信息保存成功");
          } else {
            this.$message.error(response.data.message);
            this.userInformation = this.originalUser;
          }
        })
        .catch((error) => {
          // 更新失败
          this.$message.error("用户信息更新失败");
          console.error("更新用户信息失败:", error);
          // 如果需要，可以在这里恢复到编辑前的状态
          this.userInformation = { ...this.originalUser };
        });
    },
  },
//   beforeDestroy() {
//     this.$store.dispatch("setToken", "");
//   },
};
</script>

<style>
.outBox {
  width: 100%;
  height: 100%;
  display: flex;
  background: url(../../src/assets/itr-png/27.jpg);
  background-size: 100% 100%;
}

.innerBox {
  width: 100%;
  height: 100%;
  margin-left: 200px;
  margin-top: 50px;
}

.top-middle {
  display: flex;
  width: 80%;
  height: 150px;
  align-items: center;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px #65646774;
  background-color: #ffffff;
}

.top-middle-img {
  width: 100px;
  height: 100px;
  margin-left: 50px;
}

h2 {
  margin-left: 50px;
  display: flex;
  /* 使用flex布局来水平排列子元素 */
  align-items: center;
  /* 垂直居中子元素 */
}

.main {
  background-color: #fff;
  border: solid 1px #ddd;
  border-radius: 15px;
  margin-top: 40px;
  width: 80%;
  height: 645px;
  box-shadow: 1px 1px 1px 1px #65646774;
}

.top-img {
  width: 100px;
  height: 100px;
  margin-left: 50px;
}

.top {
  width: 100%;
  height: 125px;
  display: flex;
}

h4 {
  line-height: 2.5;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #75737a;
  margin-left: 20px;
}

h3 {
  margin-top: 25px;
  margin-left: 30px;
}

.detail {
  display: flex;
  margin-top: 40px;
  align-items: center;
  margin-left: 20px;
}

.main span {
  display: inline-block;
  padding: 2px 5px;
  border: 1px solid transparent;
  transition: border-color 0.3s ease-in-out;
}

/* span {
    font-family: Courier, monospace;
} */

.main span.editable {
  border-color: #fff;
  background-color: #fff;
  cursor: text;
  outline: none;
}

.detail-aside {
  display: flex;
  margin-left: 10px;
  width: 150px;
  align-items: center;
  justify-content: center;
  font-family: Courier, monospace;
}

.detail-text {
  margin-left: 50px;
  color: black;
}

.detail-img {
  width: 30px;
  height: 30px;
}

.edit-button {
  margin-top: 20px;
  margin-left: 700px;
}

.cancel-button {
  margin-top: 20px;
}

.message {
  margin-left: 100px;
}

.top-aside {
  margin-left: 40px;
  width: 400px;
  margin-top: 30px;
}

.top-aside span.editable {
  border-color: #fff;
  background-color: #fff;
  cursor: text;
  outline: none;
}

.slogan {
  color: #f46388;
  margin-left: 50px;
  font-family: Courier, monospace;
}

.input {
  width: 300px;
  margin-left: 50px;
}

.input-style {
  margin-left: 50px;
}

.select {
  margin-left: 50px;
  font-family: Courier, monospace;
}

.el-radio {
  color: red;
}
</style>