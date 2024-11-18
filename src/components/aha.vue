<template>
  <div class="face-container">
    <div class="eye-container" ref="eyeContainer">
      <div class="eye" v-for="(eye, index) in eyes" :key="index" :class="{ 'enlarged-eye': eye.isEnlarged }" @mouseover="enlargeEye(index)" @mouseout="shrinkEye(index)">
        <div class="pupil" :style="{ transform: `translate(${eye.pupilX}px, ${eye.pupilY}px)` }" :class="{ 'enlarged-pupil': eye.isEnlarged }"></div>
      </div>
    </div>
    <div class="mouth" ref="mouth" :class="{ 'rounded-mouth': isMouthHovered }"></div>
  </div>
</template>

<script>
export default {
  name: 'aha',
  data() {
    return {
      eyes: [
        { pupilX: 0, pupilY: 0, isEnlarged: false },
        { pupilX: 0, pupilY: 0, isEnlarged: false }
      ],
      isMouthHovered: false
    };
  },
  methods: {
    updatePupils(event) {
      this.eyes.forEach((eye, index) => {
        const eyeElement = this.$refs.eyeContainer.children[index];
        const eyeRect = eyeElement.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const dx = (event.clientX - eyeCenterX) / eyeRect.width;
        const dy = (event.clientY - eyeCenterY) / eyeRect.height;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 0.9;
        const clampedDistance = Math.min(distance, maxDistance);

        const angle = Math.atan2(dy, dx);
        const pupilX = Math.cos(angle) * clampedDistance * (eyeRect.width / 2 - 25);
        const pupilY = Math.sin(angle) * clampedDistance * (eyeRect.height / 2 - 25);

        this.$set(this.eyes, index, { ...this.eyes[index], pupilX, pupilY });

        const shadowOffsetX = pupilX / 4;
        const shadowOffsetY = pupilY / 2;
        const shadowBlur = 10;
        eyeElement.style.boxShadow = `inset ${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, 0.4)`;
      });

      // 检查鼠标是否在嘴的区域内
      const mouthRect = this.$refs.mouth.getBoundingClientRect();
      if (
        event.clientX > mouthRect.left &&
        event.clientX < mouthRect.right &&
        event.clientY > mouthRect.top &&
        event.clientY < mouthRect.bottom
      ) {
        this.isMouthHovered = true;
      } else {
        this.isMouthHovered = false;
      }
    },
    resetPupils() {
      this.eyes.forEach((eye, index) => {
        const eyeElement = this.$refs.eyeContainer.children[index];
        this.$set(this.eyes, index, { pupilX: 0, pupilY: 0, isEnlarged: false });
        eyeElement.style.boxShadow = 'inset 0px 0px 10px rgba(0, 0, 0, 0.4)';
      });
      this.isMouthHovered = false;
    },
    enlargeEye(index) {
      this.$set(this.eyes, index, { ...this.eyes[index], isEnlarged: true });
    },
    shrinkEye(index) {
      this.$set(this.eyes, index, { ...this.eyes[index], isEnlarged: false });
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.updatePupils);
    window.addEventListener('mouseleave', this.resetPupils);
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.updatePupils);
    window.removeEventListener('mouseleave', this.resetPupils);
  }
};
</script>

<style scoped>
.face-container {
  width: 255px; /* 缩小了一半 */
  height: 225px; /* 缩小了一半 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%); */
  /* background-color: #d8d1c8; */
  border-radius: 50%;
}
.eye-container {
  width: 100%;
  height: 100px; /* 缩小了一半 */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eye {
  width: 75px; /* 缩小了一半 */
  height: 100px; /* 缩小了一半 */
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 0 5px #000 inset 0px 0px 5px rgba(0, 0, 0, 0.3); /* 减少了阴影效果 */
  transition: all 0.35s ease-out;
}
.enlarged-eye {
  width: 90px; /* 增大后的宽度 */
  height: 120px; /* 增大后的高度 */
}
.pupil {
  width: 25px; /* 缩小了一半 */
  height: 25px; /* 缩小了一半 */
  background-color: #000;
  border-radius: 50%;
  position: relative;
  transition: transform 0.35s ease-out, width 0.35s ease-out, height 0.35s ease-out;
}
.enlarged-pupil {
  width: 35px; /* 增大后的宽度 */
  height: 35px; /* 增大后的高度 */
}
.mouth {
  width: 100px; /* 缩小了一半 */
  height: 25px; /* 缩小了一半 */
  background-color: #000;
  border-radius: 25px / 12.5px; /* 调整了圆角 */
  margin-top: 10px; /* 减少了间距 */
  transition: all 0.4s ease-out;
}
.rounded-mouth {
  border-radius: 50%; /* 完美的圆形 */
  width: 50px; /* 正圆的宽度 */
  height: 50px; /* 正圆的高度 */
}
</style>