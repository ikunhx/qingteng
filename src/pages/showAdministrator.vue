<template>
  <div class="show-outbox">
    <div class="administrator">
      <div class="table-container1">
        <el-table
          :data="userData"
          height="870"
          border
          style="width: 100%"
          :default-sort="{ prop: 'ranking', order: 'ascending' }"
        >
          <el-table-column
            prop="ranking"
            label="排名"
            width="180"
            sortable
            :sort-method="customSort"
          >
          </el-table-column>
          <el-table-column prop="user" label="用户" width="210">
            <template slot-scope="scope">
              <div>
                <!-- 使用 scope.row 来引用当前行的数据 -->
                <img class="user-img" :src="scope.row.url" />
                <span>{{ scope.row.name }}</span>
                <div class="user-class">
                  <span class="user-classes">{{ scope.row.classes }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="average" label="考核平均分数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      defaultUrl:
        "https://img2.baidu.com/it/u=3802563531,3604194644&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=500",
      previewUrl: "", // 用于存储头像预览的URL
      userData: [
        // {
        //   ranking: 1,
        //   url: "",
        //   name: "诸雨轩",
        //   classes: "软件2302",
        //   average: 100,
        // },
        // { ranking: 2, name: "方雅雯", classes: "会计2303", average: 99 },
        // { ranking: 3, name: "张思琦", classes: "国贸2302", average: 97 },
        // { ranking: 5, name: "张思琦", classes: "国贸2302", average: 95 },
        // { ranking: 6, name: "张思琦", classes: "国贸2302", average: 94 },
        // { ranking: 9, name: "张思琦", classes: "国贸2302", average: 91 },
        // { ranking: 7, name: "张思琦", classes: "国贸2302", average: 93 },
        // { ranking: 11, name: "张思琦", classes: "国贸2302", average: 89 },
        // { ranking: 10, name: "张思琦", classes: "国贸2302", average: 90 },
        // { ranking: 4, name: "张思琦", classes: "国贸2302", average: 96 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
        // { ranking: 8, name: "方雅雯", classes: "会计2303", average: 92 },
      ],
    };
  },
  mounted() {
    // this.judge();
    this.fetchUsers();
  },
  methods: {
    judge() {
      if (this.$store.state.token === "") {
        if (this.$router.path !== "/User") {
          this.$router.push("/User");
        }
      }
    },
    fetchUsers() {
      axios
        .post(
          "http://121.40.221.40:8080/qingteng-recruitment/root/select_user",
          {},
          {
            headers: {
              token: `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.userData = response.data.data;
        })
        .catch((error) => {
          this.error = error.message;
          console.error("Error fetching users:", error);
        });
    },
  },
  //   beforeDestroy() {
  //     this.$store.dispatch("setToken", "");
  //   },
};
</script>

<style>
.show-outbox {
  width: 100%;
  height: 100%;
  background-image: url("../assets/itr-png/27.jpg");
  background-size: 100% 100%;
}

.table-container1 {
  display: flex;
  width: 800px;
  height: 880px;
  margin-left: 280px;
  margin-top: 40px;
}

.user-classes {
  margin-left: -50px;
}

.user-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.user-class {
  display: flex;
  margin-left: 60px;
  margin-top: -23px;
}

.administrator-button {
  margin-top: 50px;
  margin-left: 980px;
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
</style>