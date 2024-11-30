<template>
  <div
    class="exam-box"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="header">
      <h1 class="exam-title">管理员考核</h1>
      <el-popover
        placement="top-start"
        width="100"
        trigger="hover"
        content="添加考核"
      >
        <i
          class="el-icon-circle-plus-outline"
          slot="reference"
          @click="addExam"
        ></i>
      </el-popover>
    </div>
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
        <template slot-scope="scope">
          <button class="btn-edit btn" @click="handleEdit(scope.row)">
            编辑
          </button>
          <button class="btn-delete btn" @click="handleDelete(scope.row)">
            删除
          </button>
          <button class="btn-ranking btn" @click="handleRanking(scope.row)">
            排名
          </button>
          <button class="btn btn-comment" @click="handleComment(scope.row)">
            评论
          </button>
          <el-badge :value="rankingData.length" :max="99" class="item">
            <button class="btn-score btn" @click="handleScore(scope.row)">
              评分
            </button>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑考核弹窗 -->
    <el-dialog
      :visible.sync="editExamVisible"
      width="40%"
      title="编辑考核"
      @close="closeEdit"
      class="exam-dialog"
    >
      <div style="height: 500px; text-align: center">
        <!--需要弹出的内容部分-->
        <el-form ref="editExam" :model="editExam" label-width="80px">
          <el-form-item label="考核名称" id="exam-name" style="font-size: 20px">
            <el-input v-model="editExam.name"></el-input>
          </el-form-item>
          <el-form-item label="考核时间" id="exam-time">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="editExam.beginTime"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="editExam.endTime"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="http://localhost/qingteng-recruitment/user/common/upload"
            multiple
            accept=".pdf"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccessEdit"
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
    <!-- 添加考核弹窗 -->
    <el-dialog
      :visible.sync="addExamVisible"
      width="40%"
      title="新建考核"
      @close="closeAdd"
      class="exam-dialog"
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
                v-model="newExam.start_date"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="newExam.end_time"
                style="width: 100%"
                class="date-picker"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="http://localhost/qingteng-recruitment/user/common/upload"
            multiple
            accept=".pdf"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccessAdd"
            :before-remove="beforeRemove"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
             :http-request="customUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传pdf文件,且不超过400MB
            </div>
          </el-upload>
        </el-form>
        <button class="btn-upload btn" @click="submitUpload">提 交</button>
      </div>
    </el-dialog>
    <!-- 查看排名窗口 -->
    <el-drawer
      :with-header="false"
      :visible.sync="rankingTable"
      direction="rtl"
      size="41.5%"
    >
      <el-table
        :data="rankingData"
        height="100%"
        :row-class-name="rowColor"
        :row-style="rowStyle"
        :header-row-style="headerStyle"
      >
        <el-table-column property="avatarUrl" label="" width="50">
          <template slot-scope="scope">
            <el-avatar
              :size="40"
              :src="scope.row.avatarUrl"
            ></el-avatar> </template
        ></el-table-column>
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
      <!-- 加载动画 -->
      <div
        v-if="!pdfFiles.length && !videoFiles.length"
        class="loading-container"
      >
        <div class="spinner"></div>
      </div>

      <video
        v-for="(videoFile, index) in videoFiles"
        :key="index"
        :src="videoFile.url"
        fit="fill"
        controls
        style="width: 100%"
      ></video>
      <div
        v-for="(pdfFile, index) in pdfFiles"
        :key="index"
        class="pdf-container"
      >
        <embed
          :src="pdfFile.url"
          type="application/pdf"
          width="100%"
          height="80vh"
          class="pdf"
        />
      </div>
    </el-drawer>
    <!-- 查看待评分列表 -->
    <el-drawer
      :with-header="false"
      :visible.sync="scoreTable"
      direction="rtl"
      size="29%"
    >
      <el-table
        :data="scoreData"
        height="100%"
        :row-class-name="rowColor"
        :row-style="rowStyle"
        :header-row-style="headerStyle"
      >
        <el-table-column property="avatarUrl" label="" width="50">
          <template slot-scope="scope">
            <el-avatar
              :size="40"
              :src="scope.row.avatarUrl"
            ></el-avatar> </template
        ></el-table-column>
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
      <!-- 加载动画 -->
      <div
        v-if="!pdfFiles.length && !videoFiles.length"
        class="loading-container"
      >
        <div class="spinner"></div>
      </div>
      <video
        v-for="(videoFile, index) in videoFiles"
        :key="index"
        :src="videoFile.url"
        fit="fill"
        controls
        style="width: 100%"
      ></video>
      <div
        v-for="(pdfFile, index) in pdfFiles"
        :key="index"
        class="pdf-container"
      >
        <embed
          :src="pdfFile.url"
          type="application/pdf"
          width="100%"
          height="80vh"
          class="pdf"
        />
      </div>
      <el-form
        ref="examScore"
        :model="examScore"
        label-width="80px"
        v-if="pdfFiles.length && videoFiles.length"
      >
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
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="comment"
        :style="colors[colorId(comment.id)]"
      >
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
          <el-button type="text" class="btn-replay" @click="makeReplay(comment)"
            >回复</el-button
          >
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
          v-if="comment.discussNum > 0 || comment.replays.length > 0"
          @click="getReplays(comment.id, comment)"
        >
          {{ comment.discussNum <= 0 ? "收起▴" : "查看回复▾" }}
        </el-button>
      </div>
      <el-button type="text" class="btn-moreReplay" @click="getComments">
        查看更多评论▾
      </el-button>
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
            @click="sendComment()"
          ></i>
        </el-input>
      </div>
      <div style="height: 40px"></div>
    </el-drawer>
  </div>
</template>

<script>
import axios from "axios";
import JSZip from "jszip";
import "pdfjs-dist/web/pdf_viewer.css";
import { customAlphabet } from "nanoid";
const numberID = customAlphabet("0123456789", 10);
export default {
  name: "Examine",
  data() {
    return {
      textarea: "", // 输入框中的文字
      pending: 118,
      addExamVisible: false, //是否展示添加考核框
      editExamVisible: false, //是否展示考核编辑框
      rankingTable: false, //是否展示排名框
      scoreTable: false, //是否展示评分框
      answerTable: false, //是否展示答案框
      markTable: false, //是否展示评分窗口
      commentTable: false, //是否展示评论窗口
      examID: "",
      commentType: "0",
      lastTime: "",
      answerUrl: "",
      // pdfFiles: ["http://localhost:8080/fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg","http://localhost:8080/fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"],
      // videoFiles: ['http://localhost:8080/www.w3schools.com/html/mov_bbb.mp4'],
      pdfFiles: [],
      videoFiles: [],
      fullscreenLoading: false,
      colors: [
        "background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);",
        "background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);",
        "background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);",
        "background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);",
      ],
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
      editExam: {
        //新考核
        id: "",
        name: "",
        beginTime: "",
        endTime: "",
      },
      newExam: {
        //新考核
        id: numberID(),
        name: "",
        start_date: "",
        end_time: "",
      },
      rankingData: [
        {
          userID: numberID(),
          name: "张三",
          classes: "软件2401",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          score: 81,
          ranking: 1,
          answerUrl:
            "https://raw.githubusercontent.com/ikunhx/test/master/video.zip",
        },
        {
          userID: numberID(),
          name: "张三",
          classes: "软件2401",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          score: 98,
          ranking: 1,
          answerUrl:
            "https://raw.githubusercontent.com/ikunhx/test/master/video.zip",
        },
      ],
      scoreData: [
        {
          userID: numberID(),
          name: "张三",
          classes: "软件2401",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          fileUrl: [
            "https://raw.githubusercontent.com/ikunhx/test/master/video.zip",
          ],
        },
        {
          userID: numberID(),
          name: "张三",
          classes: "软件2401",
          avatarUrl:
            "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
          fileUrl: [
            "https://raw.githubusercontent.com/ikunhx/test/master/video.zip",
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
          discussNum: 0,
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
          discussNum: 12,
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
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content:
                "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
              name: "张三",
              data: 1729390765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
              content: "考核好难55555555",
            },
            {
              id: numberID(),
              url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
              name: "张大三",
              data: 1729890765572,
              expanded: false,
              replayVisible: false, //是否展示回复评论窗口
              discussNum: 0,
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
          discussNum: 2,
          showAllReplays: false, //展示所有回复
          content:
            "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
          replays: [
            // {
            //   id: numberID(),
            //   url: "http://localhost:8080/fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
            //   name: "张三",
            //   data: 1729390765572,
            //   expanded: false,
            //   replayVisible: false, //是否展示回复评论窗口
            //   discussNum:0 ,
            //   content: "考核好难55555555",
            // },
            // {
            //   id: numberID(),
            //   url: "http://localhost:8080/fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
            //   name: "张大三",
            //   data: 1729890765572,
            //   expanded: false,
            //   replayVisible: false, //是否展示回复评论窗口
            //   discussNum:0 ,
            //   content:
            //     "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
            // },
          ],
        },
      ],
    };
  },
  methods: {
    judge() {
      console.log('Checking token:', this.$store.state.Token); // 使用 getter 获取 token
      if (this.$store.state.Token === '') {
        if (this.$router.path !== "/User") {
          this.$router.push("/User");
        }
        
      }
    },
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
    handleEdit(row) {
      //编辑考核
      //触发点击时,让其显示
      this.editExamVisible = true;
      this.editExam.id = row.id;
    },
    handleDelete(row) {
      // 删除考核
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return this.deleteExam(row.id); // 返回 Promise
        })
        .then(() => {})
        .catch((error) => {
          console.error("删除失败:", error);
        });
    },
    handleRanking(row) {
      this.fullscreenLoading = true;
      //查看排名
      this.rankingTable = true;
      axios
        .post(
          `http://localhost:8080/qingteng-recruitment/examine_ranking`,
          {},
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.rankingData = response.data.data;
          this.fullscreenLoading = false;
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
        });
    },
    handleScore(row) {
      this.scoreTable = true;
      this.fullscreenLoading = true;
      axios
        .post(
          `http://localhost:8080/qingteng-recruitment/ranking`,
          {},
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          this.scoreData = response.data.data;
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
        });
    },
    handleComment(row) {
      this.commentTable = true;
      this.examID = row.id;
      getComments();
    },
    getComments() {
      this.fullscreenLoading = true;
      const endTime = this.comments.length ? this.lastTime : Date.now();
      const discussId = 0;
      const formData = new FormData();
      formData.append("examID", this.examID);
      formData.append("end_time", endTime);
      formData.append("discussId", discussId);
      axios
        .post("http://localhost:8080/qingteng-recruitment/root/discuss/select", formData, {
          headers: {
            "token": `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.comments.unshift(...response.data.data.discussVOList);
          this.lastTime = response.data.data.endTime;
          this.fullscreenLoading = false;
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
        });
    },
    // toggleReplayVisibility(comment) {
    //   if (comment.discussNum <= 0) {
    //     // 收起所有回复
    //     comment.discussNum = comment.originalDiscussNum; // 还原 discussNum
    //     comment.replays.forEach((replay) => {
    //       replay.replayVisible = false;
    //     });
    //     comment.showAllReplays = false;
    //     comment.replays = [];
    //     this.num = 0;
    //     console.log(
    //       comment.discussNum,
    //       "----------",
    //       this.num,
    //       "-----",
    //       comment.replays.length
    //     );
    //   } else {
    //     // 展开所有回复
    //     if (comment.originalDiscussNum === undefined) {
    //       comment.originalDiscussNum = comment.discussNum;
    //     }
    //     comment.discussNum -= 10;
    //     comment.replays.forEach((replay) => {
    //       replay.replayVisible = true;
    //     });
    //     comment.showAllReplays = true;
    //     console.log(
    //       comment.discussNum,
    //       "----------",
    //       this.num,
    //       "-----",
    //       comment.replays.length
    //     );
    //   }
    // },
    getReplays(id, comment) {
      if (comment.discussNum > 0) {
        this.fullscreenLoading = true;
        const targetId = this.comments.findIndex((item) => item.id === id);
        const endTime = this.comments[targetId].replays.length
          ? this.lastTime
          : Date.now();
        const discussId = id;
        const formData = new FormData();
        formData.append("examID", this.examID);
        formData.append("end_time", endTime);
        formData.append("discussId", discussId);
        axios
          .post(
            "http://localhost:8080/qingteng-recruitment/root/discuss/select",
            formData,
            {
              headers: {
                "token": `${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.fullscreenLoading = false;
            this.comments[targetId].replays.unshift(
              ...response.data.data.discussVOList
            );
            this.lastTime = response.data.data.endTime;
            // 展开所有回复
            if (comment.originalDiscussNum === undefined) {
              comment.originalDiscussNum = comment.discussNum;
            }
            comment.discussNum -= 10;
            comment.replays.forEach((replay) => {
              replay.replayVisible = true;
            });
            comment.showAllReplays = true;
            console.log(
              comment.discussNum,
              "----------",
              this.num,
              "-----",
              comment.replays.length
            );
          })
          .catch((error) => {
            this.fullscreenLoading = false;
            this.$message.error("ERROR：" + error.message);
            // 展开所有回复
            if (comment.originalDiscussNum === undefined) {
              comment.originalDiscussNum = comment.discussNum;
            }
            comment.discussNum -= 10;
            comment.replays.forEach((replay) => {
              replay.replayVisible = true;
            });
            comment.showAllReplays = true;
            console.log(
              comment.discussNum,
              "----------",
              this.num,
              "-----",
              comment.replays.length
            );
          });
      } else {
        // 收起所有回复
        comment.discussNum = comment.originalDiscussNum; // 还原 discussNum
        comment.replays.forEach((replay) => {
          replay.replayVisible = false;
        });
        comment.showAllReplays = false;
        comment.replays = [];
        this.num = 0;
        console.log(
          comment.discussNum,
          "----------",
          this.num,
          "-----",
          comment.replays.length
        );
      }
    },

    //关闭编辑窗口时事件操作 (表格、表单 同理 需要执行的事件 在此处)

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
    customUpload(options) {
      const formData = new FormData();
      formData.append('file', options.file);

      axios.post(options.action, formData, {
        headers: {
          "token": `${this.$store.state.token}`,
        }
      })
      .then(response => {
        // 成功处理
        options.onSuccess && options.onSuccess(response.data);
      })
      .catch(error => {
        // 错误处理
        options.onError && options.onError(error);
      });
    },
    submitUpload() {
      //提交文件到服务器
      this.$refs.upload.submit();
    console.log
    (this.editExam);
      
    },
    handleSuccessEdit(response) {
      const fileUrl = response.data.data.fileUrl;
      // 提交表单
      this.submitFormEdit(fileUrl);
    },
    handleSuccessAdd(response) {
      const fileUrl = response.data.data.fileUrl;
      // 提交表单
      this.submitFormAdd(fileUrl);
    },
    submitFormEdit(fileUrl) {
      // 这里应该是你的表单提交逻辑
      this.fullscreenLoading = true;
      const formData = new FormData();
      const beginTime=this.showTime(new Date(this.editExam.beginTime).getTime());
      const endTime=this.showTime(new Date(this.editExam.endTime).getTime());
      formData.append("name", this.editExam.name);
      formData.append("beginTime",beginTime);
      formData.append("endTime", endTime);
      formData.append("fileUrl", fileUrl);
      const url = "http://localhost:8080/qingteng-recruitment/root/edit_exam";
      axios
        .post(url, formData, {
          headers: {
            "token": `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "添加成功!",
          });
          this.closeEdit();
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("考核发布失败：" + error.message);
        });
    },
    submitFormAdd(fileUrl) {
      // 这里应该是你的表单提交逻辑
      this.fullscreenLoading = true;
      const formData = new FormData();
      const beginTime = this.showTime(new Date(this.newExam.start_date).getTime())
      const endTime= this.showTime(new Date(this.newExam.end_time).getTime())
      formData.append("name", this.newExam.name);
      formData.append("beginTime",beginTime);
      formData.append("endTime",endTime);
      formData.append("fileUrl", fileUrl);
      const url ="http://localhost:8080/qingteng-recruitment/root/edit_exam";
      axios
        .post(url, formData, {
          headers: {
            "token": `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.closeEdit();
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("考核添加失败：" + error.message);
        });
    },
    closeEdit() {
      this.newExam.name = "";
      this.newExam.start_date = "";
      this.newExam.end_time = "";
      this.fileList = [];
      this.addExamVisible = false;
    },
    closeAdd() {
      this.editExam.name = "";
      this.editExam.beginTime = "";
      this.editExam.endTime = "";
      this.fileList = [];
      this.editExamVisible = false;
      this.editExam.id = "";
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
      this.fetchAndUnzip(row.answerUrl);
    },
    giveScore(row) {
      this.markTable = true;
      this.examScore.userID = row.userID;
      this.fetchAndUnzip(row.fileUrl);
    },

    submitScore() {
      this.fullscreenLoading = true;
      const scoreData = this.examScore;
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/root/score",
          scoreData,
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "评分成功",
          });
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("评分失败：" + error.message);
        });
    },
    toggleExpand(comment) {
      comment.expanded = !comment.expanded;
    },
    // showReplay(replays) {
    //   replays.forEach((replay) => {
    //     replay.replayVisible = !replay.replayVisible;
    //   });
    // },
    // toggleReplayVisibility(replays, comment) {
    //   comment.discussNum -= 10;
    //   this.num+=10;
    //   console.log(comment.discussNum,'-----',num);

    //   if (replays.length > 0 && comment.discussNum + 10 <= 0) {
    //     console.log(8);
    //     // 收起所有回复
    //     replays.forEach((replay) => {
    //       replay.replayVisible = false;
    //     });
    //     comment.showAllReplays = false;
    //   } else {
    //     // 展开所有回复
    //     console.log(6);

    //     replays.forEach((replay) => {
    //       replay.replayVisible = true;
    //     });
    //     comment.showAllReplays = true;
    //   }
    // },

    //   toggleReplayVisibility(replays, comment) {
    //   if (comment.showAllReplays) {
    //     // 收起所有回复
    //     replays.forEach((replay) => {
    //       replay.replayVisible = false;
    //     });
    //     comment.showAllReplays = false;
    //     comment.discussNum = comment.replays.length; // 重置 discussNum
    //   } else {
    //     // 展开最多 10 条回复
    //     const maxReplaysToShow = Math.min(10, comment.replays.length);
    //     comment.replays.slice(0, maxReplaysToShow).forEach((replay) => {
    //       replay.replayVisible = true;
    //     });
    //     comment.showAllReplays = true;

    //     if (maxReplaysToShow < comment.replays.length) {
    //       // 如果还有更多回复，设置 discussNum 为剩余回复数
    //       comment.discussNum = comment.replays.length - maxReplaysToShow;
    //     } else {
    //       // 如果没有更多回复，重置 discussNum
    //       comment.discussNum = 0;
    //     }
    //   }
    // },
    sendComment() {
      this.fullscreenLoading = true;
      const commentData = {
        content: this.textarea,
        discussId: this.commentType,
        examId: this.examID,
      };
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/root/discuss/save",
          commentData,
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "评论成功!",
          });
          this.commentType = "0";
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
          this.commentType = "0";
        });
      this.textarea = "";
    },
    makeReplay(comment) {
      this.$refs.commentInput.focus(); // 跳转到输入框
      this.commentType = comment.id;
    },
    showExams() {
      this.fullscreenLoading = true;
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/root/display_exam",
          {},
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          this.exams = response.data.data;
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
        });
    },
    getRanking() {},
    addExam() {
      this.addExamVisible = true;
    },
    deleteExam(id) {
      console.log(id);

      this.fullscreenLoading = true;
      axios
        .post(
          `http://localhost:8080/qingteng-recruitment/root/examine_delete?id=${id}`,
          {},
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.showExams();
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("删除失败：" + error.message);
        });
    },

    async fetchAndUnzip(zipUrl) {
      try {
        // 使用 axios 下载文件
        const response = await axios({
          url: zipUrl,
          method: "GET",
          responseType: "arraybuffer", // 获取二进制数据
        });

        if (response.status !== 200) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }

        // 使用 JSZip 解压压缩包
        const zip = new JSZip();
        const content = await zip.loadAsync(response.data);

        // 清空现有的文件列表
        this.pdfFiles = [];
        this.videoFiles = [];

        // 遍历压缩包中的文件
        content.forEach((relativePath, file) => {
          if (file.dir) return; // 忽略目录

          // 将文件转换为 Blob 对象，并指定 MIME 类型
          file.async("blob").then(async (blob) => {
            const fileUrl = URL.createObjectURL(blob);
            console.log(`Generated URL for ${file.name}: ${fileUrl}`); // 打印生成的 URL
            const fileType = file.name.split(".").pop().toLowerCase();

            let mimeType;
            if (fileType === "pdf") {
              mimeType = "application/pdf";
            } else if (["mp4", "avi", "mov", "mkv"].includes(fileType)) {
              mimeType = "video/" + fileType;
            } else {
              mimeType = "application/octet-stream"; // 默认 MIME 类型
            }

            const typedBlob = new Blob([blob], { type: mimeType });
            const typedFileUrl = URL.createObjectURL(typedBlob);

            if (fileType === "pdf") {
              this.pdfFiles.push({ name: file.name, url: typedFileUrl });
            } else if (["mp4", "avi", "mov", "mkv"].includes(fileType)) {
              this.videoFiles.push({ name: file.name, url: typedFileUrl });
            }
          });
        });
      } catch (error) {
        console.error("解压失败:", error.message);
      }
    },
    colorId(id) {
      return id % 4;
    },
  },
  computed: {
    iconClass() {
      return {
        "icon-color-empty": this.textarea === "",
        "icon-color-filled": this.textarea !== "",
      };
    },
  },
  mounted() {
    this.judge();
    this.showExams();
  },
  beforeDestroy() {
    this.$store.dispatch("setToken", "");
  },
};
</script>

<style lang="css" scoped>
.pdf-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
}

.pdf-canvas {
  width: 100%;
  height: 100%;
}
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
.el-form >>> .el-form-item__label {
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
.exam-dialog >>> .el-dialog {
  border-radius: 20px;
}
.exam-dialog >>> .el-dialog__headerbtn {
  font-size: 25px;
}
.item >>> .el-badge__content.is-fixed {
  top: 10px;
  right: 25px;
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
.el-icon-circle-plus-outline {
  font-size: 40px;
  font-weight: 0;
  margin-top: -50px;
  margin-right: 10px;
  float: right;
  transition: 0.4s;

  color: #90ee90;
  cursor: pointer;
}
.el-icon-circle-plus-outline:hover {
  color: #2ba257;
  transform: scale(1.1);
}
.pdf {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
/* 加载动画样式 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>