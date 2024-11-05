<template>
  <div>
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
        <p class="text1">大厂之道，就在其中</p>
        <p class="text2">
          邂逅<strong>青藤</strong>考核题，踏上技术<strong>提升</strong>之旅
        </p>
      </div>
      <img src="@/assets/exam-bck/doughnut.png" class="doughnut" />
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
    <div class="fourth box"></div>
    <div class="fifth box"></div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "UserExamine",
  data() {
    return {
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
      colors: ["#fff", "#2ba257"], // 颜色数组
      currentIndex: 0, // 当前颜色索引
      color: "#fff", // 初始颜色
    };
  },
  computed: {
    offset2() {
      return -this.offset; // offset2 始终等于负的 offset
    },
  },
  methods: {
    test() {
      console.log(666);
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
        console.log(this.offset);
      } else {
        if (this.offset == -35) {
        } else {
          this.offset = -35;
        }

        console.log(this.offset);
      }
    },
    //该变颜色
    changeColor: function () {
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
      this.color = this.colors[this.currentIndex];
    },
  },
  mounted() {
    this.handleScroll = this.throttle(this.handleScroll, 100); // 节流处理
    this.scrollToRight();
    window.addEventListener("scroll", this.handleScroll);
    this.handleWheel = this.throttle(this.handleWheel, 100);
    window.addEventListener("wheel", this.handleWheel);
    setInterval(this.changeColor, 1200);
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
  background-color: blue;
}

.fifth {
  background-color: purple;
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
  top: 40vh;
  left: 5vw;
  animation: floatUp 1.5s ease-in-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
  transform: translateY(15px);
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
.doughnut {
  position: absolute;
  transform: scale(0.3);
  left: -15.9vw;
  bottom: -21.7vh;
  animation: doughnut 0.7s 1 ease-in-out forwards;
  animation-delay: 5s;
}
@keyframes doughnut {
  0% {
    left: -15.9vw;
    bottom: -21.7vh;
  }
  100% {
    left: -9.9vw;
    bottom: -15.7vh;
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
</style>