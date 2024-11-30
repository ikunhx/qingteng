<template>
  <div>
    <div v-if="currentPage === 'administrator'" class="administrator">
      <div class="table-container1">
        <el-table
          :data="userData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="ranking"
            label="排名"
            width="180"
            class="ranking"
          ></el-table-column>
          <el-table-column prop="user" label="用户" width="180" class="user">
            <!-- <template>
                            <div>
                                <img :src="scope.row.url" alt="用户头像" width="40" height="40">
                                <span>{{ scope.row.name }}</span>
                                <span>{{ scope.row.classes }}</span>
                            </div>
                        </template> -->
          </el-table-column>
          <el-table-column prop="average" label="考核平均分数" class="average">
            <template slot-scope="scope">
              {{ scope.row.average }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button
        class="superAdministrator-button"
        type="primary"
        @click="toSuperAdministrator"
        >超级管理员</el-button
      >
    </div>
    <div
      v-else-if="currentPage === 'superAdministrator'"
      class="superAdministrator"
    >
      <div class="table-container2">
        <el-table-column>
          <el-input class="inputBox" v-model="email" placeholder="请输入邮箱" />
          <el-button
            class="add-button"
            size="mini"
            type="success"
            @click="handleAdd(scope.$index, scope.row)"
            >添加</el-button
          >
        </el-table-column>
        <el-table :data="administratorData" class="form">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="studentId" label="学号"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button
          class="administrator-button"
          type="primary"
          @click="toAdministrator"
          >返回</el-button
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
      currentPage: "administrator",
      userData: [
        {
          ranking: "1",
          user: "软件2302诸雨轩",
          average: "97",
        },
        {
          ranking: "2",
          user: "会计周雅雯",
          average: "96.9",
        },
        {
          ranking: "3",
          user: "国贸张思琦",
          average: "96.5",
        },
        {
          ranking: "4",
          user: "软件2302方伟萌",
          average: "96",
        },
      ],
      administratorData: [
        {
          name: "诸雨轩",
          studentId: "6020231859",
          email: 3253857376,
        },
        {
          name: "方雅雯",
          studentId: "6020231854",
          email: 3253857377,
        },
        {
          name: "张思琦",
          studentId: "6020231852",
          email: 3253857370,
        },
      ],
    };
  },
  mounted() {
    this.judge();
    this.fetchUsers();
  },
  methods: {
    judge() {
      if (this.$store.state.token === "") this.$router.push("/User");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    toSuperAdministrator() {
      this.currentPage = "superAdministrator";
    },
    toAdministrator() {
      this.currentPage = "administrator";
    },
    handleAdd(index, row) {
      const adminData = {
        name: row.name,
        studentId: row.studentId,
        email: row.email,
      };
      // axios.post('https://qingteng-recruitment/root/add_administrator', adminData)
      //     .then(response => {
      //         this.refreshAdministratorData();
      //         console.log('Admin added:', response.data.data);
      //     })
      //     .catch(error => {
      //         console.error('Error adding admin:', error);
      //     });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .delete(
              `https://qingteng-recruitment/root/delete_administrator/${row.id}`
            )
            .then((response) => {
              this.refreshAdministratorData();
              console.log("Admin deleted:", response.data.data);
            })
            .catch((error) => {
              console.error("Error deleting admin:", error);
            });
        })
        .catch(() => {
          console.log("Delete canceled");
        });
    },
    fetchUsers() {
      axios
        .post("https://qingteng-recruitment/root/select_user")
        .then((response) => {
          this.userData = response.data.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
  },
  beforeDestroy() {
    this.$store.dispatch("setToken", "");
  },
};
</script>

<style>
.table-container1 {
  display: flex;
  width: 800px;
  height: 780px;
  margin-left: 280px;
  margin-top: 40px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.superAdministrator-button {
  margin-left: 280px;
  margin-top: 50px;
}

.administrator-button {
  margin-top: 50px;
  margin-left: 980px;
}

.administrator {
  background-image: url("../assets/itr-png/27.jpg");
}

.inputBox {
  width: 300px;
  margin-left: 50px;
}

.add-button {
  margin-left: 30px;
}

.form {
  width: 1000px;
  margin-top: 50px;
  margin-left: 50px;
}

.superAdministrator {
  background-image: url("../assets/itr-png/27.jpg");
}

.table-container2 {
  width: 100%;
  height: 910px;
}
</style>