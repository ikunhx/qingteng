<template>
  <div class="outBox">
    <div class="innerBox">
      <div>
        <div class="top">
          <div class="top-middle">
            <img v-if="!isEditing" class="top-img" :src="userInformation.avatar || defaultUrl" />
            <div class="top-img2" v-else>
              <img class="top-img" :src="userInformation.avatar || defaultUrl">
              <el-button class="change-button" type="primary" plain @click="showFileInput"
                v-if="isEditing">上传头像</el-button>
              <input type="file" accept="image/*" @change="handleFileUpload" ref="fileInput" style="display: none;" />
            </div>
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
              <img class="detail-img" src="../../src/assets/itr-png/4.png" />
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
        avatar: "",
        name: "",
        classes: "",
        studentId: "",
        qq: "",
        phone: "",
        direction: "",
        advantage: "",
      },
      originalUser: {},
      direction: "",
      qq: "",
      selectedFile: null, // 用于存储用户选择的文件
      defaultUrl: 'https://q7.itc.cn/q_70/images03/20240613/38e50443a3a148b287d1d13bd43ebd69.jpeg',
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
          this.direction = this.userInformation.direction;
          this.avatar = this.userInformation.avatar;
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
      this.selectedFile = null;
    },
    showFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      if(this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
      }
    },
    async saveChanges() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        try {
          const response = await axios.post("http://localhost:8080/qingteng-recruitment/user/common/upload", formData, {
            headers: {
              "token": `${this.$store.state.token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.data.code === 200) {
            this.userInformation.avatar = response.data.data;
            this.$store.dispatch("setAvatarUrl", response.data.data);
          } else {
            this.$message.error(response.data.message);
            return;
          }
        } catch (error) {
          this.$message.error("头像上传失败");
          console.error("头像上传失败:", error);
          return;
        }
      }

      this.userInformation.direction = this.direction;
      this.userInformation.qq = this.qq;
      this.$store.dispatch("setDirection", this.direction);
      this.$store.dispatch("setQQnum", this.qq);
      this.$store.dispatch("setUserName", this.userInformation.name);
      this.$store.dispatch("setClasses", this.userInformation.classes);
      this.$store.dispatch("setStudentId", this.userInformation.studentId);
      this.$store.dispatch("setPhone", this.userInformation.phone);
      this.$store.dispatch("setAdvantage", this.userInformation.advantage);
      axios.post("http://localhost:8080/qingteng-recruitment/user/detail/edit", this.userInformation, {
        headers: {
          "token": `${this.$store.state.token}`,
        },
      })
        .then((response) => {
          if (response.data.code === 200) {
            this.$message.success(response.data.message);
            this.isEditing = false;
          } else {
            this.$message.error(response.data.message);
            this.userInformation = { ...this.originalUser };
          }
        })
        .catch((error) => {
          this.$message.error("用户信息更新失败");
          console.error("用户信息更新失败:", error);
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
  margin-top: 20px;
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
  margin-top: 35px;
  width: 80%;
  height: 670px;
  box-shadow: 1px 1px 1px 1px #65646774;
}

.top-img {
  width: 100px;
  height: 100px;
  margin-left: 50px;
  border-radius: 50%;
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
  margin-top: 30px;
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
  margin-left: 640px;
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