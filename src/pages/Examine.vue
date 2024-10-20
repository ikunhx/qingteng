<template>
  <div>
    <h1 class="exam-title">管理员考核</h1>
    <!-- 考核列表 -->
    <el-table
      :data="exams"
      :header-cell-style="{ fontSize: '20px' }"
      :cell-style="{ fontSize: '18px' }"
    >
      <el-table-column prop="name" label="考核" width="200"> </el-table-column>
      <el-table-column prop="beginTime" label="开始时间" width="240">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="240">
      </el-table-column>
      <el-table-column label="操作">
        <button class="btn-edit btn" @click="handleEdit()">编辑</button>
        <button class="btn-delete btn" @click="handleDelete()">删除</button>
        <button class="btn-ranking btn" @click="handleRanking()">排名</button>
        <button class="btn btn-comment" @click="handelComment()">评论</button>
        <el-badge :value="rankingData.length" :max="99" class="item">
          <button class="btn-score btn" @click="handleScore()">评分</button>
        </el-badge>
      </el-table-column>
    </el-table>
    <!-- 编辑考核弹窗 -->
    <el-dialog
      :visible.sync="examVisible"
      width="40%"
      title="编辑考核"
      @close="closeEdit"
    >
      <div style="height: 500px; text-align: center">
        <!--需要弹出的内容部分-->
        <el-form ref="newExam" :model="newExam" label-width="80px">
          <el-form-item label="考核名称" id="exam-name" style="font-size: 20px">
            <el-input v-model="newExam.name"></el-input>
          </el-form-item>
          <el-form-item label="考核时间" id="exam-time">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newExam.beginTime"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newExam.endTime"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            accept=".pdf"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传pdf文件,且不超过400MB
            </div>
          </el-upload>
          <button class="btn-upload btn" @click="submitUpload">发 布</button>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看排名窗口 -->
    <el-drawer
      :with-header="false"
      :visible.sync="rankingTable"
      direction="rtl"
      size="50%"
    >
      <el-table
        :data="rankingData"
        height="100%"
        :row-class-name="rowColor"
        :row-style="rowStyle"
        :header-row-style="headerStyle"
      >
        <el-table-column
          property="name"
          label="姓名"
          width="140"
        ></el-table-column>
        <el-table-column
          property="classes"
          label="班级"
          width="170"
        ></el-table-column>
        <el-table-column
          property="studentID"
          label="学号"
          width="200"
        ></el-table-column>
        <el-table-column property="score" label="分数" width="150">
        </el-table-column>
        <el-table-column
          property="ranking"
          label="排名"
          width="100"
        ></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button
              @click="showAnswer(scope.row)"
              type="text"
              class="btn btn-edit"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <!-- 排名里查看考核答案窗口 -->
    <el-drawer
      :with-header="false"
      :visible.sync="answerTable"
      direction="ltr"
      size="80%"
    >
      <el-image
        v-for="url in answerUrls"
        :key="url"
        :src="url"
        fit="fill"
      ></el-image>
    </el-drawer>
    <!-- 查看待评分列表 -->
    <el-drawer
      :with-header="false"
      :visible.sync="scoreTable"
      direction="rtl"
      size="38%"
    >
      <el-table
        :data="rankingData"
        height="100%"
        :row-class-name="rowColor"
        :row-style="rowStyle"
        :header-row-style="headerStyle"
      >
        <el-table-column
          property="name"
          label="姓名"
          width="150"
        ></el-table-column>
        <el-table-column
          property="classes"
          label="班级"
          width="200"
        ></el-table-column>
        <el-table-column
          property="studentID"
          label="学号"
          width="200"
        ></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <button
              @click="giveScore(scope.row)"
              type="text"
              class="btn btn-delete"
            >
              评分
            </button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
    <!-- 评分窗口 -->
    <el-drawer
      :with-header="false"
      :visible.sync="markTable"
      direction="ltr"
      size="80%"
    >
      <el-image
        v-for="url in answerUrls"
        :key="url"
        :src="url"
        fit="fill"
      ></el-image>
      <el-form ref="examScore" :model="examScore" label-width="80px">
        <div class="scoreItem">
          <el-form-item label="分数" id="exam-score">
            <el-input
              v-model="examScore.score"
              class="scoreInput"
              type="number"
              max="100"
              min="0"
            ></el-input>
          </el-form-item>
          <button class="btn-uploadScore btn-upload btn" @click="submitScore">
            确 认
          </button>
        </div>
      </el-form>
    </el-drawer>
    <!-- 评论区展示 -->
    <el-drawer
      :with-header="false"
      :visible.sync="commentTable"
      direction="rtl"
      size="30%"
      class="commentDrawer"
    >
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <el-avatar :size="40" :src="comment.url"></el-avatar>
        <span class="userName">{{ comment.name }}</span>
        <div class="commentContent" :class="{ expanded: comment.expanded }">
          {{
            comment.expanded ? comment.content : comment.content.slice(0, 100)
          }}
          <span v-if="comment.content.length > 100 && !comment.expanded"
            >...&nbsp;&nbsp;&nbsp;</span
          >
          <el-button
            v-if="comment.content.length > 100"
            type="text"
            @click="toggleExpand(comment)"
          >
            {{ comment.expanded ? "收起" : "展开" }}
          </el-button>
        </div>
        <div class="commentDate">
          {{ showTime(comment.data) }}
          <el-button type="text" class="btn-replay" @click="makeReplay(comment)">回复</el-button>
        </div>
        <div
          v-for="replay in comment.replays"
          :key="replay.id"
          class="comment replayComment"
        >
          <div v-if="replay.replayVisible">
            <el-avatar :size="35" :src="replay.url"></el-avatar>
            <span class="userName">{{ replay.name }}</span>
            <div class="commentContent" :class="{ expanded: replay.expanded }">
              {{
                replay.expanded ? replay.content : replay.content.slice(0, 100)
              }}
              <span v-if="replay.content.length > 100 && !replay.expanded"
                >...&nbsp;&nbsp;&nbsp;</span
              >
              <el-button
                v-if="replay.content.length > 100"
                type="text"
                @click="toggleExpand(replay)"
              >
                {{ replay.expanded ? "收起" : "展开" }}
              </el-button>
            </div>
            <div class="commentDate">
              {{ showTime(replay.data) }}
            </div>
          </div>
        </div>
        <el-button
          type="text"
          class="btn-moreReplay"
          v-if="comment.replays.length"
          @click="toggleReplayVisibility(comment.replays, comment)"
        >
          {{ comment.showAllReplays ? "收起▴" : "展开更多评论▾" }}
        </el-button>
      </div>
      <div class="inputDiv">
        <el-input
         ref="commentInput"
          placeholder="说点啥吧"
          v-model="textarea"
          class="commentInput"
        >
          <el-tooltip
            slot="suffix"
            class="item"
            effect="light"
            content="还没说呢"
            placement="top-end"
            v-show="this.textarea === ''"
          >
            <i :class="iconClass" class="el-icon-s-promotion"></i>
          </el-tooltip>
          <i
            slot="suffix"
            :class="iconClass"
            class="el-icon-s-promotion"
            v-show="this.textarea !== ''"
             @click="sendComment"
          ></i>
        </el-input>
      </div>
      <div style="height: 40px"></div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import { customAlphabet } from "nanoid";
const numberID = customAlphabet("0123456789", 10);
export default {
  name: "Examine",
  data() {
    return {
      textarea: "", // 输入框中的文字
      pending: 118,
      examVisible: false, //是否展示考核编辑框
      rankingTable: false, //是否展示排名框
      scoreTable: false, //是否展示评分框
      answerTable: false, //是否展示答案框
      markTable: false, //是否展示评分窗口
      commentTable: false, //是否展示评论窗口
      answerUrls: [],
      exams: [
        //考核列表
        {
          id: numberID(),
          name: "第一次考核",
          beginTime: this.showDate(1728613183630),
          endTime: this.showDate(1728613524152),
        },
        {
          id: numberID(),
          name: "第二次考核",
          beginTime: this.showDate(1728635736858),
          endTime: this.showDate(1728696238545),
        },
      ],
      newExam: {
        //新考核
        id: numberID(),
        name: "",
        beginTime: "",
        endTime: "",
      },
      rankingData: [
        {
          userID: numberID(),
          name: "张三",
          classes: "软件2401",
          studentID: numberID(),
          score: 81,
          ranking: 1,
          urls: [
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
          ],
        },
        {
          name: "张三",
          classes: "软件2401",
          studentID: numberID(),
          score: 98,
          ranking: 1,
          urls: [
            "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
          ],
        },
      ],
      examScore: {
        score: "",
        userID: "",
      },
      comments: [
        {
          id: numberID(),
          url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          name: "张三",
          data: 1729390765572,
          expanded: false,
          replayVisible: false, //是否展示回复评论窗口
          showAllReplays: false, //展示所有回复
          content: "考核好难55555555",
          replays: [],
        },
        {
          id: numberID(),
          url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
          name: "张大三",
          data: 1729890765572,
          expanded: false,
          replayVisible: false, //是否展示回复评论窗口
          showAllReplays: false, //展示所有回复
          content:
            "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
          replays: [
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
          ],
        },
        {
          id: numberID(),
          url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
          name: "张大三",
          data: 1729890765572,
          expanded: false,
          replayVisible: false, //是否展示回复评论窗口

          showAllReplays: false, //展示所有回复
          content:
            "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
          replays: [
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
          ],
        },
      ],
    };
  },
  methods: {
    showDate(timeString) {
      //传入时间戳，转化为具体时间
      let year = new Date(timeString).getFullYear();
      let month = new Date(timeString).getMonth();
      let day = new Date(timeString).getDate();
      return `${year}-${month + 1}-${day}`;
    },
    showTime(timeString) {
      //传入时间戳，转化为具体时间
      let year = new Date(timeString).getFullYear();
      let month = new Date(timeString).getMonth();
      let day = new Date(timeString).getDate();
      let hour = new Date(timeString).getHours();
      let minute = new Date(timeString).getMinutes();
      let second = new Date(timeString).getSeconds();
      return `${year}-${month + 1}-${day} ${hour}:${minute}:${second}`;
    },
    //点击按钮时,触发弹出效果
    handleEdit() {
      //编辑考核
      //触发点击时,让其显示
      this.examVisible = true;
    },
    handleDelete() {
      //删除考核
      this.$confirm("此操作将永久删除该考核, 是否继续?", "删除考核", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleRanking() {
      //查看排名
      this.rankingTable = true;
    },
    handleScore() {
      this.scoreTable = true;
    },
    handelComment() {
      this.commentTable = true;
    },

    //关闭编辑窗口时事件操作 (表格、表单 同理 需要执行的事件 在此处)
    closeEdit() {
      this.newExam.name = "";
      this.newExam.beginTime = "";
      this.newExam.endTime = "";
      this.fileList = [];
    },
    closeRanking() {},
    handleRemove(file, fileList) {
      //移除考核文件
      console.log(file, fileList);
    },
    handlePreview(file) {
      //预览考核文件
      console.log(file);
    },
    handleExceed(files, fileList) {
      //处理文件超出三个的情况
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      //提示是否移除
      return this.$confirm(`确定移除 ${file.name}?`);
    },
    submitUpload() {
      //提交文件到服务器
      this.$refs.upload.submit();
      // 监听上传完成事件
      this.$refs.upload.addEventListener("success", (url) => {
        // 提交表单
        this.submitForm(url);
      });
    },
    submitForm(url) {
      // 这里应该是你的表单提交逻辑
      console.log("Form submitted with:", this.newExam);
    },
    beforeAvatarUpload(file) {
      //限制大小
      const isLt400M = file.size / 1024 / 1024 <= 400;

      if (!isLt400M) {
        this.$message.error("上传文档大小不能超过 400MB!");
      }
      return isLt400M;
    },
    rowColor({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    rowStyle() {
      return {
        height: "60px",
        fontSize: "17px",
        color: "rgba(0,0,0,0.8)",
        fontWeight: "500",
      };
    },
    headerStyle() {
      return {
        height: "60px",
        fontSize: "18px",
        color: "rgba(0,0,0,0.8)",
      };
    },
    showAnswer(row) {
      this.answerTable = true;
      this.answerUrls = row.urls || [];
    },
    giveScore(row) {
      this.markTable = true;
      this.answerUrls = row.urls || [];
    },
    submitScore() {
      this.examScore.userId = this.rankingData.userId;
      const scoreData = this.examScore;
      //提交表单
      // console.log("Form submitted with:", scoreData);
    },
    toggleExpand(comment) {
      comment.expanded = !comment.expanded;
    },
    showReplay(replays) {
      replays.forEach((replay) => {
        replay.replayVisible = !replay.replayVisible;
      });
    },
    toggleReplayVisibility(replays, comment) {
      if (comment.showAllReplays) {
        // 收起所有回复
        replays.forEach((replay) => {
          replay.replayVisible = false;
        });
        comment.showAllReplays = false;
      } else {
        // 展开所有回复
        replays.forEach((replay) => {
          replay.replayVisible = true;
        });
        comment.showAllReplays = true;
      }
    },
    sendComment(){
      console.log(this.textarea);
      this.textarea=''
    },
    makeReplay(comment){
      this.$refs.commentInput.focus(); // 跳转到输入框
    }
  },
  computed: {
    iconClass() {
      return {
        "icon-color-empty": this.textarea === "",
        "icon-color-filled": this.textarea !== "",
      };
    },
  },
};
</script>

<style lang="css" scoped>
.exam-title {
  font-size: 34px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: #2ba257;
}

.exam {
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.btn {
  margin-right: 15px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.25s;
  color: #fff;
}
.btn:hover {
  transform: scale(1.1);
}
.btn-edit:hover,
.btn-upload:hover {
  box-shadow: 0 0 8px rgba(43, 162, 87, 0.8);
}
.btn-delete:hover {
  box-shadow: 0 0 8px rgba(255, 92, 92, 0.8);
}
.btn-ranking:hover {
  box-shadow: 0 0 8px rgba(246, 194, 62, 0.8);
}

.btn-score:hover {
  box-shadow: 0 0 8px rgba(64, 152, 255, 0.8);
}
.btn-edit {
  background-color: #2ba257;
}

.btn-delete {
  background-color: #ff5c5c;
}

.btn-ranking {
  background-color: #f6c23e;
}
.btn-score {
  background-color: #409eff;
}
.btn-comment {
  background-color: #7550db;
}
/deep/ .el-form-item__label {
  font-size: 17px;
}
.el-upload__text {
  font-size: 18px;
}
.el-upload__tip {
  font-size: 15.5px;
}
.date-picker {
  font-size: 16px;
}
.btn-upload {
  background-color: #2ba257;
  border: none;
  color: #fff;
  width: 70px;
  height: 35px;
  font-size: 17px;
  margin-top: 70px;
  border-radius: 10px;
}
/deep/ .el-dialog {
  border-radius: 20px;
}

/deep/ .el-dialog__headerbtn {
  font-size: 25px;
}
/deep/ .el-badge__content.is-fixed {
  top: 10px;
  right: 25px;
}
.el-table >>> .warning-row {
  background: #ccffcc;
}

.el-table >>> .success-row {
  background: #90ee90;
}
.el-image {
  width: 100%;
}
.scoreItem {
  display: flex;
  justify-content: flex-end;
}
.scoreItem >>> .el-form-item {
  height: 30px;
}
.scoreItem >>> .el-input__inner {
  border-radius: 10px;
  width: 80px;
  font-size: 17px;
  margin-right: 10px;
}
.btn-uploadScore {
  margin-top: 2px;
}
.comment {
  margin-top: 15px;
  margin-left: 25px;
}
.userName {
  font-size: 12px;
  margin-left: 50px;
  display: block;
  margin-top: -42px;
  color: gray;
}
.commentContent {
  margin-left: 49px;
  width: 70%;
  overflow-wrap: break-word; /* 允许长单词和 URL 断开换行 */
  line-height: 27px;
  transition: 2s;
}
.commentDate {
  font-size: 12px;
  color: gray;
  margin-left: 50px;
}
.btn-replay {
  margin-left: 15px;
  font-size: 12px;
}
.btn-moreReplay {
  margin-left: 50px;
}
.replayComment {
  margin-left: 50px;
}
.commentInput >>> .el-input__inner {
  border-radius: 15px;
  background-color: #e0f2e9;
  bottom: 0px;
  position: fixed;
  width: 30%;
}
.el-icon-s-promotion {
  font-size: 30px;
  margin-right: 10px;
  position: fixed;
  right: 0.5%;
  bottom: 4px;
  border-radius: 100%;
  background-color: #fff;
  cursor: pointer;
}
.icon-color-empty {
  color: gray; /* 无文字时的颜色 */
}

.icon-color-filled {
  color: #2ba257; /* 有文字时的颜色 */
}
</style>