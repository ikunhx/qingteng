<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <div class="first box">
      <img src="@/assets/exam-bck/computer.png" class="computer" />
      <img src="@/assets/exam-bck/computer-ball.png" class="computer-ball" />

      <img src="@/assets/exam-bck/bable1.png" class="bable bable1" />
      <img src="@/assets/exam-bck/bable2.png" class="bable bable2" />
      <img src="@/assets/exam-bck/bable3.png" class="bable bable3" />
      <img src="@/assets/exam-bck/bable4.png" class="bable bable4" />
      <div class="tip">
        <p><i class="el-icon-back"></i>左划返回导航栏</p>
      </div>
      <div class="title">
        <p>青藤工作室</p>
      </div>
      <div class="title2">
        <p>一道青藤考核题，一次成长新机遇，开启成长新契机</p>
      </div>
      <div class="text">
        <div class="text1">大厂之道，就在其中</div>
        <div class="text2">
          邂逅<strong>青藤</strong>考核题，踏上技术<strong>提升</strong>之旅
        </div>
      </div>
      <button class="start hvr-underline-from-center" @click="scrollToDown">
        快速开始
      </button>
      <i class="el-icon-bottom icon-bottom"></i>
    </div>
    <div class="second box">
      <div class="second-title">
        <p :class="{ animate__secondTitle: isSecondTitle }" ref="secondTitle">
          青藤工作室前后端游戏一体化考核平台
        </p>
      </div>
      <div class="second-sentence">
        <p
          :class="{ animate__secondSentence: isSecondSentence }"
          ref="secondSentence"
        >
          青藤工作室前后端游戏一体化考核平台高效集成，精准考核游戏前后端，确保质量；提供实时反馈，迅速发现解决问题；打破前后端开发壁垒，促进团队协作；代表技术创新，为前后端游戏开发提供强大支持。
        </p>
      </div>
      <div
        class="second-TV"
        ref="second-TV"
        :class="{ animate__secondTV: isSecondTV }"
      >
        <div class="left-TV" ref="left-TV">
          <div class="left-item">
            <div class="left-TV-title">
              <p>聚焦多元化考核</p>
            </div>
            <div class="left-TV-sentence">
              <p>
                提升自我，让每个以青藤目标的同学的能力都能始终与企业的要求保持一致
              </p>
            </div>
            <div class="advantageBox">
              <div
                class="advantage-children"
                :class="{ hovered: isAdvantage1 }"
                @mouseover="isAdvantage1 = true"
                @mouseout="isAdvantage1 = false"
              >
                <i class="el-icon-star-on"></i>
                <p>路线规划</p>
              </div>
              <div
                class="advantage-children"
                :class="{ hovered: isAdvantage4 }"
                @mouseover="isAdvantage4 = true"
                @mouseout="isAdvantage4 = false"
              >
                <i class="el-icon-star-on"></i>
                <p>能力强化</p>
              </div>
              <div
                class="advantage-children"
                :class="{ hovered: isAdvantage2 }"
                @mouseover="isAdvantage2 = true"
                @mouseout="isAdvantage2 = false"
              >
                <i class="el-icon-star-on"></i>
                <p>实时排名</p>
              </div>
              <div
                class="advantage-children"
                :class="{ hovered: isAdvantage3 }"
                @mouseover="isAdvantage3 = true"
                @mouseout="isAdvantage3 = false"
              >
                <i class="el-icon-star-on"></i>
                <p>在线评论</p>
              </div>
            </div>
          </div>
        </div>
        <div class="right-TV" key="right-TV">
          <div class="right-item">
            <img src="@/assets/exam-bck/examPage.png" class="right-item-img1" />
            <div class="right-item-rightImg">
              <img
                src="@/assets/exam-bck/rightImg.png"
                class="right-item-right"
                ref="leftImg"
                :style="{ transform: `translateY(${offset2}px)` }"
              />
            </div>
            <div class="right-item-leftImg">
              <img
                src="@/assets/exam-bck/leftImg.png"
                class="right-item-left"
                ref="rightImg"
                :style="{ transform: `translateY(${offset}px)` }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="third box">
      <div class="question" ref="question">
        <p class="question1" :class="{ animate__question1: isQuestion }">
          没有拿得出手的项目？
        </p>
        <p class="question2" :class="{ animate__question2: isQuestion }">
          对学习路线一片迷茫？
        </p>
        <p class="question3" :class="{ animate__question3: isQuestion }">
          不了解Java中接口和抽象类的区别是什么？
        </p>
        <p class="question4" :class="{ animate__question4: isQuestion }">
          不会媒体查询？
        </p>
        <p class="question5" :class="{ animate__question5: isQuestion }">
          不知该如何面试？
        </p>
        <p class="question6" :class="{ animate__question6: isQuestion }">
          学习进度一直落后？
        </p>
        <p class="question7" :class="{ animate__question7: isQuestion }">
          对颜值不自信？
        </p>
        <p class="question8" :class="{ animate__question8: isQuestion }">
          不想Java炒粉Web炒饭？
        </p>
        <p class="question9" :class="{ animate__question9: isQuestion }">
          未曾获得大奖？
        </p>
        <p class="question10" :class="{ animate__question10: isQuestion }">
          渴望力量吗？
        </p>
      </div>
      <div class="answer" ref="answer">
        <p :class="{ animate__answer: isQuestion }" :style="{ color: color }">
          一切答案尽在青藤
        </p>
      </div>
    </div>
    <div class="fourth box">
      <div class="fourth-title">
        <h1>青 藤 工 作 室 考 核</h1>
      </div>
      <div class="exams">
        <div class="exam" v-for="exam in exams" :key="exam.id">
          <div class="information">
            <div class="exam-name">{{ exam.name }}</div>
          </div>
          <div class="time">
            <div class="begin">{{ exam.start_date }}</div>
            <div class="connect-icon">—</div>
            <div class="end">{{ exam.end_time }}</div>
          </div>
          <div class="operate">
            <div class="icon-container">
              <i
                class="iconfont icon-yunxiazai"
                @click="handleDownload(exam)"
              ></i>
            </div>
            <div class="icon-container">
              <i class="iconfont icon-yunshangchuan" @click="addExam(exam)"></i>
            </div>
            <div class="icon-container">
              <i class="iconfont icon-chengji" @click="viewScore(exam)"></i>
            </div>
            <div class="icon-container">
              <i
                class="iconfont icon-rank-full"
                @click="handleRanking(exam)"
              ></i>
            </div>
            <div class="icon-container">
              <i
                class="iconfont icon-pinglun"
                @click="handleComment(exam.id)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交答案 -->
    <el-dialog
      :visible.sync="addExamVisible"
      width="30%"
      title="提交答案"
      @close="closeAdd"
      class="exam-dialog"
    >
      <div style="height: 350px; text-align: center">
        <!--需要弹出的内容部分-->
        <el-form ref="userAnswer" :model="userAnswer" label-width="80px">
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="http://localhost:8080/qingteng-recruitment/user/common/upload"
            multiple
            accept=".zip"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="customUploadEdit"
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
              只能上传zip文件,且不超过400MB
            </div>
          </el-upload>
          <button class="btn-upload btn" @click="submitUpload">提 交</button>
        </el-form>
      </div>
    </el-dialog>
    <!-- 查看分数 -->
    <el-dialog
      :visible.sync="isViewScoreVisible"
      width="30%"
      title="我的分数"
      @close="closeView"
      class="score-box"
    >
      <div style="height: 350px; text-align: center">
        <!--需要弹出的内容部分-->
        <img src="@/assets/exam-bck/score.png" class="score-img" />
        <h1>{{ score }} 分</h1>
      </div>
    </el-dialog>
    <!-- 没出成绩时 -->
    <el-dialog
      :visible.sync="isViewScoreVisible2"
      width="30%"
      title="我的分数"
      @close="closeView2"
      class="score-box"
    >
      <div style="height: 350px; text-align: center">
        <!--需要弹出的内容部分-->
        <h1>成绩还未出炉，再等等吧</h1>
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
    <!-- 预览考核窗口 -->
    <el-drawer
      :with-header="false"
      :visible.sync="examTable"
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
      <button class="btn-uploadScore btn-upload btn" @click="downloadExam">
            下 载
      </button>
    </el-drawer>
  </div>
</template>

<script>
import "@/assets/icon/iconfont.css";
import "@/assets/css/hover.css";

import "animate.css";
import axios from "axios";
import JSZip from "jszip";
import "pdfjs-dist/web/pdf_viewer.css";
export default {
  name: "UserExamine",
  data() {
    return {
      textarea: "", // 输入框中的文字
      isTrue: false,
      isSecondTitle: false,
      isSecondSentence: false,
      isSecondTV: false,
      isLeftTV: false,
      isRightTV: false,
      isRightItemImg2: false,
      isRightItemImg3: false,
      offset: 0, // 初始偏移量
      conditionMet: false, // 标志变量，用于跟踪条件是否已经满足
      isAdvantage1: false,
      isAdvantage2: false,
      isAdvantage3: false,
      isAdvantage4: false,
      isQuestion: false,
      isAnswer: false,
      answerTable: false, //是否展示答案框
      addExamVisible: false, //是否展示添加考核框
      colors: ["#fff", "#2ba257"], // 颜色数组
      currentIndex: 0, // 当前颜色索引
      color: "#fff", // 初始颜色
      score: 99, //分数
      isViewScoreVisible: false, //是否展示分数框
      isViewScoreVisible2: false, //是否展示分数框
      fullscreenLoading: false,
      rankingTable: false, //是否展示排名窗口
      commentTable: false, //是否展示评论窗口
      examTable:false,//是否展示预览考核
      examID: "",
      pdfFiles: [],
      videoFiles: [],
      exams: [
        //考核列表
        {
          id: 875346325,
          name: "第一次考核",
          start_date: 1728613183630,
          end_time: 2728613524152,
          fileUrl:''
        },
        {
          id: 987654334,
          name: "第二次考核",
          start_date: 1728635736858,
          end_time: 1728696238545,
          fileUrl:''
        },
      ],
      examId: "",
      userAnswer: {
        name: "",
        classes: "",
        studentId: "",
      },
      rankingData: [
        {
          userID: 24374635,
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
          userID: 872435235,
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
      comments: [
        // {
        //   id: 374635376,
        //   url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        //   name: "张三",
        //   data: 1729390765572,
        //   expanded: false,
        //   replayVisible: false, //是否展示回复评论窗口
        //   showAllReplays: false, //展示所有回复
        //   content: "考核好难55555555",
        //   dis: 0,
        //   replays: [],
        // },
        // {
        //   id: 98746454,
        //   url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        //   name: "张大三",
        //   data: 1729890765572,
        //   expanded: false,
        //   replayVisible: false, //是否展示回复评论窗口
        //   showAllReplays: false, //展示所有回复
        //   discussNum: 10,
        //   content:
        //     "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
        //   replays: [
        //     {
        //       id: 87426357,
        //       url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        //       name: "张三",
        //       data: 1729390765572,
        //       expanded: false,
        //       replayVisible: false, //是否展示回复评论窗口
        //       discussNum: 0,
        //       content: "考核好难55555555",
        //     },
        //     {
        //       id: 985347342,
        //       url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        //       name: "张大三",
        //       data: 1729890765572,
        //       expanded: false,
        //       replayVisible: false, //是否展示回复评论窗口
        //       discussNum: 0,
        //       content:
        //         "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
        //     },
        //   ],
        // },
        // {
        //   id: 7635234,
        //   url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        //   name: "张大三",
        //   data: 1729890765572,
        //   expanded: false,
        //   replayVisible: false, //是否展示回复评论窗口
        //   discussNum: 2,
        //   showAllReplays: false, //展示所有回复
        //   content:
        //     "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
        //   replays: [
        //     {
        //       id: 8746354,
        //       url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        //       name: "张三",
        //       data: 1729390765572,
        //       expanded: false,
        //       replayVisible: false, //是否展示回复评论窗口
        //       discussNum: 0,
        //       content: "考核好难55555555",
        //     },
        //     {
        //       id: 987354354,
        //       url: "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        //       name: "张大三",
        //       data: 1729890765572,
        //       expanded: false,
        //       replayVisible: false, //是否展示回复评论窗口
        //       discussNum: 0,
        //       content:
        //         "关于主播组织赌博的问题，蓝鲸新闻记者咨询了律师。广东泰伦律师事务所罗建林律师认为，主播夏宁通过建立多个微信群组织赌博的行为，符合《刑法》第三百零三条第二款规定的开设赌场罪，是要追究刑事责任的。同时，根据《关于办理网络赌博犯罪案件适用法律若干问题的意见 》的规定，鉴于夏宁经常换群组织赌博，且从群赌博流水中抽成获利已超过了3万元，赌资金额累计超过30万元，参赌人数可能也累计达到120人以上，已经达到了“情节严重”的情形，将有可能被判处三年以上十年以下有期徒刑，并处罚金。罗建林称：“作为广大参与网络赌博者，一般无需承担刑事责任，因为法律主要是追究组织者或者以赌博为业的人。不过，如今手机及网络发达，广大群众应积极抵制网络赌博的行为，以避免因此遭受财产损失。”",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    offset2() {
      return -this.offset; // offset2 始终等于负的 offset
    },
    iconClass() {
      return {
        "icon-color-empty": this.textarea === "",
        "icon-color-filled": this.textarea !== "",
      };
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
    addExam(exam) {
      let now = Date.now();
      if (now > exam.endTime) {
        this.$message.warning("考核已截至!");
        return;
      } else {
        this.addExamVisible = true;
        this.examId = exam.id;
      }
    },
    submitUpload() {
      //提交文件到服务器
      this.$refs.upload.submit();
    },
    customUploadEdit(options) {
      const formData = new FormData();
      formData.append("file", options.file);

      axios
        .post(options.action, formData, {
          headers: {
            token: `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          // 成功处理
          this.handleSuccessAdd(response.data.data);
        })
        .catch((error) => {
          // 错误处理
          options.onError && options.onError(error);
        });
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
    handleSuccessAdd(fileUrl) {
      // 提交表单
      this.submitFormAdd(fileUrl);
    },
    submitFormAdd(fileUrl) {
      // 这里应该是你的表单提交逻辑
      this.fullscreenLoading = true;
      let timestamp = new Date().getTime();
      const formData = new FormData();
      formData.append("exam_id",this.examId );
      formData.append("time",timestamp);
      formData.append("user_id", this.$store.state.studentId);
      formData.append("fileUrl", fileUrl);
      const url = "http://localhost:8080/qingteng-recruitment/user/examine_upload";
      axios
        .post(url, formData, {
          headers: {
            "token": `${this.$store.state.token}`,
            "Content-Type": "application/json",
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
          this.$message.error("上传失败：" + error.message);
        });
    },
    handleRemove(file, fileList) {
      //移除考核文件
      console.log(file, fileList);
    },
    handlePreview(file) {
      //预览考核文件
      console.log(file);
    },
    beforeAvatarUpload(file) {
      //限制大小
      const isLt400M = file.size / 1024 / 1024 <= 400;

      if (!isLt400M) {
        this.$message.error("上传文档大小不能超过 400MB!");
      }
      return isLt400M;
    },
    closeAdd() {
      this.editExam.name = "";
      this.editExam.beginTime = "";
      this.editExam.endTime = "";
      this.fileList = [];
      this.editExamVisible = false;
      this.editExam.id = "";
    },
    test() {
      console.log(this.$store.state.userName);
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
    //自动往右滚动
    scrollToRight() {
      // 获取窗口的宽度
      const windowWidth = window.innerWidth;
      // 计算30%的宽度
      const scrollPosition = windowWidth * 0.3;
      // 滚动到指定位置
      window.scrollTo(scrollPosition, 0);
    },
    //自动往下滚动
    scrollToDown() {
      // 获取窗口的宽度
      const windowHeight = window.innerHeight;
      // 计算30%的宽度
      const scrollPosition = windowHeight * 3.41;
      // 滚动到指定位置
      window.scrollTo(scrollPosition, scrollPosition);
    },
    //节流函数
    throttle(func, limit) {
      let inThrottle;
      return function (...args) {
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },
    handleScroll() {
      this.checkElementVisibility("secondTitle", "isSecondTitle");
      this.checkElementVisibility("secondSentence", "isSecondSentence");
      this.checkElementVisibility("second-TV", "isSecondTV");
      this.checkElementVisibility("left-TV", "isLeftTV");
      this.checkElementVisibility("right-TV", "isRightTV");
      this.checkElementVisibility("leftImg", "isRightItemImg2");
      this.checkElementVisibility("rightImg", "isRightItemImg3");
      this.checkElementVisibility("question", "isQuestion");
      this.checkElementVisibility("answer", "isAnswer");
    },
    // 元素是否在可视区域
    checkElementVisibility(refName, isVisibleProp) {
      const element = this.$refs[refName];
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight; // 只检测元素是否在视口下方

      if (isInView) {
        if (!this[isVisibleProp]) {
          this[isVisibleProp] = true;
        }
      } else {
        this[isVisibleProp] = false; // 重置动画状态
      }
    },
    handleWheel(event) {
      const isScrollingUp = event.deltaY < 0;

      if (isScrollingUp) {
        if (this.offset == 35) {
        } else {
          this.offset = 35;
        }
      } else {
        if (this.offset == -35) {
        } else {
          this.offset = -35;
        }
      }
    },
    //该变颜色
    changeColor: function () {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      this.color = this.colors[this.currentIndex];
    },
    handleDownload(exam){
      this.examTable=true;
      this.examID=exam.id
      this.pdfFiles.unshift(exam.fileUrl)
    },
    downloadExam() {
      this.fullscreenLoading = true;
      const id = this.examID;
      axios
        .post(
          `http://localhost:8080/qingteng-recruitment/user/examine_download?id=${id}`,
          {},
          {
            headers: {
              "token": `${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          this.fullscreenLoading = false;
          // 下载
          window.location = response.data.link;
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("ERROR：" + error.message);
        });
    },
    showExams() {
      this.fullscreenLoading = true;
      axios
        .post(
          "http://localhost:8080/qingteng-recruitment/user/display_exam",
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
    closeEdit() {
      this.userAnswer.name = "";
      this.userAnswer.classes = "";
      this.userAnswer.studentId = "";
      this.fileList = [];
      this.addExamVisible = false;
    },
    viewScore(exam) {
      let now = Date.now();
      if (now < exam.endTime) {
        this.$message.warning("考核结束才能开始查看成绩");
        return;
      } else {
        this.fullscreenLoading = true;
        axios
          .post(
            "http://localhost:8080//qingteng-recruitment/user/examine_score",
            {id:exam.id},
            {
              headers: {
                "token": `${this.$store.state.token}`,
              },
            }
          )
          .then((response) => {
            this.score = response.data.data;
            //添加判断，出成绩和还没出成绩
            if (this.score.score === null) {
              this.isViewScoreVisible = false;
              this.isViewScoreVisible2 = true;
            } else {
              this.isViewScoreVisible = true;
              this.isViewScoreVisible2 = false;
            }
            this.fullscreenLoading = false;
          })
          .catch((error) => {
            this.isViewScoreVisible = true;
            this.fullscreenLoading = false;
          });
      }
    },
    closeView() {
      this.isViewScoreVisible = false;
    },
    closeView2() {
      this.isViewScoreVisible2 = false;
    },
    handleRanking(exam) {
      let now = Date.now();
      if (now < exam.endTime) {
        this.$message.warning("考核结束才能开始查看排名");
        return;
      } else {
        this.fullscreenLoading = true;
        //查看排名
        this.rankingTable = true;
        axios
          .post(
            "http://localhost:8080//qingteng-recruitment/user/examine_ranking",
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
      }
    },
    handleComment(id) {
      this.commentTable = true;
      this.examID = id;
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
    rowColor({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
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
    toggleExpand(comment) {
      comment.expanded = !comment.expanded;
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
          console.log(666);

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
  },
  mounted() {
    // this.judge();
    this.handleScroll = this.throttle(this.handleScroll, 100); // 节流处理
    this.scrollToRight(); //自动右移
    window.addEventListener("scroll", this.handleScroll);
    this.handleWheel = this.throttle(this.handleWheel, 100);
    window.addEventListener("wheel", this.handleWheel);
    setInterval(this.changeColor, 1200);
    this.showExams();
  },
 
};
</script>


<style scoped>
.box {
  width: 100vw;
  height: 100vh;
}
.first {
  background-color: aqua;
  background: url("@/assets/exam-bck/firstBck.png");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.second {
  position: relative;
  height: 140vh;
}

.third {
  background: url("@/assets/exam-bck/third-bck.jpg");
  position: relative;
}

.fourth {
  background-color: rgb(246, 245, 241);
}
.start {
  width: 180px;
  height: 56px;
  padding: 17px 36px;
  font-size: 20px;
  line-height: 30px;
  color: #2ba257;
  border-radius: 28px;
  box-sizing: border-box !important;
  transition: all 0.3s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  box-shadow: 0 8px 16px 0 rgba(40, 55, 255, 0.4),
    inset 0 -3px 4px 2px rgba(0, 95, 252, 0.3), inset 0 3px 4px 2px #fff;
  position: absolute;
  left: 40vw;
  bottom: 30vh;
  animation: floatUp 1.8s ease-in-out forwards;
}

.computer {
  width: 32vw;
  position: absolute;
  right: 8vw;
  bottom: 16vh;
}

.computer-ball {
  width: 9.5vw;
  position: absolute;
  right: 16vw;
  bottom: 39vh;
  transition: 1s;
  animation: float-ball 4.5s infinite ease-in-out;
}
@keyframes float-ball {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(2vh) scale(1.02);
  }
}
.icon-bottom {
  font-size: 5vw;
  position: absolute;
  bottom: 1vh;
  left: 47vw;
  color: #fff;
  animation: floatUp 1.8s ease-in-out forwards;
}
.text1,
.text2 {
  margin: 0;
  font-size: 53px;
  line-height: 80px;
  transition: all 0.3s ease;
  font-weight: bolder;
  color: #fff;
  white-space: nowrap;
}

.text2 strong {
  color: #ffc400;
  font-weight: inherit;
}
.text {
  position: absolute;
  top: 20vh;
  left: -20vw;
  animation: floatUp 1.5s ease-in-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
  transform: translateY(15px);
}
.text2{
  top: 12vh;
  left: 0vw;
position: absolute;
}
.tip {
  color: #fff;
  animation: floatUp 1.5s ease-in-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
  transform: translateY(15px);
}
@keyframes floatUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.pdf-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
}
.title {
  margin: 0;
  font-size: 40px;
  font-weight: bolder;
  color: #fff;
  white-space: nowrap;
  position: absolute;
  top: 10vh;
  left: 5vw;
  animation: floatUp 1.5s ease-in-out forwards;
}
.title2 {
  /* font-size: 15px; */
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  position: absolute;
  top: 0vh;
  right: 4vw;
  animation: floatUp 1.5s ease-in-out forwards;
}
.bable {
  transform: scale(0);
  position: absolute;
}
.bable1 {
  right: 3vw;
  bottom: 20vh;
  animation: bable1 0.65s 1 ease-in-out forwards;
  animation-delay: 2s;
}
@keyframes bable1 {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(0.355);
  }
  100% {
    transform: scale(0.335);
  }
}
.bable2 {
  right: 14vw;
  bottom: 19vh;
  animation: bable2 0.65s 1 ease-in-out forwards;
  animation-delay: 2.72s;
}

@keyframes bable2 {
  0% {
    transform: scale(0);
    right: 3vw;
    bottom: 20vh;
  }
  80% {
    transform: scale(0.365);
    right: 14.5vw;
    bottom: 19.2vh;
  }
  100% {
    transform: scale(0.335);
    right: 14vw;
    bottom: 19vh;
  }
}
.bable3 {
  right: 25.5vw;
  bottom: 29vh;
  animation: bable3 0.65s 1 ease-in-out forwards;
  animation-delay: 3.52s;
}
@keyframes bable3 {
  0% {
    transform: scale(0);
    right: 15vw;
    bottom: 24vh;
  }
  80% {
    transform: scale(0.365);
    right: 26vw;
    bottom: 29.5vh;
  }
  100% {
    transform: scale(0.335);
    right: 25.5vw;
    bottom: 29vh;
  }
}
.bable4 {
  right: 32vw;
  bottom: 38vh;
  animation: bable4 0.65s 1 ease-in-out forwards;
  animation-delay: 4.3s;
}

@keyframes bable4 {
  0% {
    transform: scale(0);
    right: 25.5vw;
    bottom: 29vh;
  }
  80% {
    transform: scale(0.365);
    right: 32.5vw;
    bottom: 38.5vh;
  }
  100% {
    transform: scale(0.335);
    right: 32vw;
    bottom: 38vh;
  }
}
.second-title {
  max-width: 1440px;
  margin: 160px auto 0;
  padding: 0 80px;
  box-sizing: border-box !important;
  font-weight: 600;
  text-align: center;
}
.second-title p {
  margin-bottom: 11px;
  font-size: 52px;

  line-height: 76px;
  color: #2ba257;
  opacity: 0;
}
@keyframes secondTitle {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes secondTV {
  0% {
    opacity: 0;
    transform: translateY(-10%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate__secondTV {
  animation-name: secondTV;
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);
  animation-fill-mode: forwards;
}

.animate__secondSentence {
  animation-name: secondTitle;
  animation-duration: 1s;
  animation-delay: 1.1s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);
  animation-fill-mode: forwards;
}
.animate__secondTitle {
  animation-name: secondTitle;
  animation-duration: 1s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);
  animation-fill-mode: forwards;
}
.second-sentence p {
  margin-bottom: 52px;
  font-size: 22px;
  line-height: 30px;
  color: #89919f;
  font-weight: 500;
  max-width: 75vw;
  margin: 30px auto 52px;
  text-align: center;
  opacity: 0;
}

.second-TV {
  width: 75vw;
  height: 75vh;
  margin: 0 auto;
  background-color: rgba(40, 121, 255, 0.1);
  border-radius: 50px;
  display: flex;
  opacity: 0;
}
.left-TV {
  width: 50%;
  height: 100%;
  /* background-color: yellow; */
  border-radius: 50px 0 0 50px;
}

.left-item {
  max-width: 496px;
  min-width: 290px;
  height: 100%;
  padding: 104px 0;
  margin-left: 80px;
  box-sizing: border-box !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
.left-TV-title p {
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 600;
  line-height: 56px;
  letter-spacing: 2px;
  color: #2ba257;
  opacity: 1;
}
.left-TV-sentence p {
  margin-bottom: 36px;
  font-size: 20px;
  line-height: 30px;
  color: #6f7886;
  opacity: 1;
}
.advantageBox {
  margin-bottom: 44px;
  display: grid;
  grid-template-columns: 50% 50%;
  word-break: keep-all;
  white-space: nowrap;
}
.advantage-children {
  width: 35%;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 24px;
  color: #141c28;
  display: flex;
}
.advantage-children p {
  margin-top: -3px;
  margin-left: 2px;
}
.advantage-children i {
  color: #2ba257;
}
.right-TV {
  width: 50%;
  height: 100%;
  /* background-color: blue; */
  border-radius: 0 50px 50px 0;
  flex: 1 1;
  min-width: 55%;
}
.right-item {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.right-item-img1 {
  width: 110%;
  position: relative;
}
.right-item-rightImg,
.right-item-leftImg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.right-item-right {
  position: absolute;
  bottom: 4%;
  right: -14%;
  width: 34%;
  transition: transform 2s linear; /* 平滑过渡效果 */
  transform: translateY(0);
}
.right-item-left {
  position: absolute;
  width: 34%;
  left: -5%;
  bottom: 9%;
  transition: transform 2s linear; /* 平滑过渡效果 */
  transform: translateY(0);
}
.hovered {
  animation: rubberBand;
  animation-duration: 0.75s;
}
.question {
  width: 100vw;
  height: 50vh;
  margin-top: 5vh;
  /* background-color: #2ba257; */
  position: relative;
}
.question p {
  color: gray;
  position: absolute;
  transition: 0.7s;
  opacity: 0;
}

.question1 {
  font-size: 2.5vw;
  top: 0vh;
  left: 15vw;
}

.question2 {
  font-size: 3.1vw;
  top: 5vh;
  left: 45vw;
}

.question3 {
  font-size: 2vw;
  top: 14vh;
  left: 2vw;
}

.question4 {
  font-size: 2.5vw;
  top: -2vh;
  left: 70vw;
}

.question5 {
  font-size: 2.8vw;
  top: 28vh;
  left: 12vw;
}

.question6 {
  font-size: 2.2vw;
  top: 20vh;
  left: 70vw;
}

.question7 {
  font-size: 2.7vw;
  top: 40vh;
  left: 25vw;
}

.question8 {
  font-size: 3vw;
  top: 30vh;
  left: 50vw;
}

.question9 {
  font-size: 2.6vw;
  top: 42vh;
  left: 55vw;
}

.question10 {
  font-size: 4vw;
  top: 17vh;
  left: 40vw;
}
.question1:hover,
.question2:hover,
.question3:hover,
.question4:hover,
.question5:hover,
.question6:hover,
.question7:hover,
.question8:hover,
.question9:hover,
.question10:hover {
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
}
.answer p {
  position: absolute;
  font-size: 4vw;
  transition: 0.6s;
  color: #fff;
  left: 32vw;
  bottom: 10vh;
  opacity: 0;
  transition: 1.2s;
}
.answer p:hover {
  cursor: pointer;
}
@keyframes emerge {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes toggleColor {
  0%,
  100% {
    color: #fff;
  }
  50% {
    color: #2ba257;
  }
}

.animate__question1 {
  animation-name: emerge;
  animation-duration: 1.5s;
  animation-delay: 0.2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
.animate__question2 {
  animation-name: emerge;
  animation-duration: 1.5s;
  animation-delay: 0.7s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question3 {
  animation-name: emerge;
  animation-duration: 1.4s;
  animation-delay: 1s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question4 {
  animation-name: emerge;
  animation-duration: 2s;
  animation-delay: 1.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question5 {
  animation-name: emerge;
  animation-duration: 1.8s;
  animation-delay: 1.6s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question6 {
  animation-name: emerge;
  animation-duration: 1.2s;
  animation-delay: 1.9s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question7 {
  animation-name: emerge;
  animation-duration: 1.5s;
  animation-delay: 2.2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question8 {
  animation-name: emerge;
  animation-duration: 1.3s;
  animation-delay: 2.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question9 {
  animation-name: emerge;
  animation-duration: 1.6s;
  animation-delay: 2.8s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.animate__question10 {
  animation-name: emerge;
  animation-duration: 2s;
  animation-delay: 3.3s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}
.animate__answer {
  animation-name: emerge;
  animation-duration: 1.6s;
  animation-delay: 4.5s;
  animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.85);
  animation-fill-mode: forwards;
}
.fourth-title {
  margin: 6vh auto 3vh;
}
.fourth-title h1 {
  color: #2ba257;
  text-align: center;
  padding: 2vh 0;
  font-size: 5vw;
  font-weight: 600;
  font-family: "Courier New", Courier, monospace;
}
.exam {
  width: 80%;
  height: 8vh;
  display: flex;
  margin: 5vh auto 5vh;
  justify-content: center;
  align-items: center;
  border-bottom: rgba(0, 0, 0, 0.15) 1.5px solid;
  position: relative;
}
.information {
  position: absolute;
  left: 3vw;
}
.time {
  display: flex;
  margin: 10px 0 10px;
  position: absolute;
  left: 32vw;
  bottom: 0.2vh;
}
.operate {
  position: absolute;
  right: 3vw;
  bottom: 1vh;
  display: flex;
}
.end,
.begin {
  margin-left: 0.8vw;
  margin-right: 0.8vw;
  color: rgba(0, 0, 0, 0.3);
}
.exam-name {
  font-size: 2vw;
  color: rgba(0, 0, 0, 0.5);
}
.icon-container {
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  color: #2ba257;
  cursor: pointer;
  width: 2vw;
  height: 3vh;
  margin-left: 0.5vw;
  margin-right: 0.5vw;
}
.iconfont {
  font-size: 1.5vw;
  color: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  position: relative;
}
.iconfont:hover {
  color: #2ba257;
}
.icon-container:hover {
  transform: scale(1.2);
  color: #2ba257;
  cursor: pointer;
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
.btn-upload:hover {
  box-shadow: 0 0 8px rgba(43, 162, 87, 0.8);
}
.btn-upload {
  background-color: #2ba257;
  border: none;
  color: #fff;
  width: 70px;
  height: 35px;
  font-size: 17px;
  margin-top: 9vh;
  border-radius: 10px;
}
.btn-edit {
  background-color: #2ba257;
}
.exam-dialog >>> .el-dialog {
  border-radius: 20px;
}
.exam-dialog >>> .el-dialog__headerbtn {
  font-size: 25px;
}
.score-box h1 {
  font-size: 4vw;
}
.score-img {
  width: 20vw;
  margin-left: 8vw;
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
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
} /* 加载动画样式 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.pdf {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
.btn-uploadScore {
  margin-top: 2px;
  float: right;
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
</style>