<template>
    <div class="introduction">
        <div class="first-content">
            <div class="cusom-link">
                <img class="ani1"
                    src="https://yx-web-nosdn.netease.im/quickhtml/assets/yunxin/node-website/res/image/im/banner_ani1@2x.png">
                <img class="ani2"
                    src="https://yx-web-nosdn.netease.im/quickhtml/assets/yunxin/node-website/res/image/im/banner_ani2@2x.png">
                <img class="ani3"
                    src="https://yx-web-nosdn.netease.im/quickhtml/assets/yunxin/node-website/res/image/im/banner_ani3@2x.png">
            </div>
            <span class="text">青藤工作室</span>
            <div class="first-content-messages">
                <span class="message1">前路迷茫？</span>
                <span class="message2">想得到技术上的提升？</span>
            </div>
            <h1 class="text2">来青藤寻找答案吧！</h1>
        </div>
        <div class="page-1">
            <img src="https://yx-web-nosdn.netease.im/quickhtml/assets/yunxin/node-website/res/image/im/advantage@2x.png"
                alt="advantage">
            <div class="content">
                <h1>工作室不乏优秀的学长学姐</h1>
                <h1>在<span>阿里</span>、<span>字节</span>、<span>京东</span>等大公司就职</h1>
                <h1>还有学长学姐保研考研到双一流大学。</h1>
            </div>
        </div>
        <div class="second-content">
            <img src="../../src/assets/itr-png/34.png">
            <img class="second-content-img" src="../../src/assets/itr-png/35.png">
        </div>
        <div class="third-content">
            <h1 class="third-content-text">主要方向</h1>
            <div class="carousel-container">
                <div class="carousel-images">
                    <img :src="images[currentIndex].src" :alt="`Image ${currentIndex + 1}`" class="carousel-image" />
                    <div class="carousel-indicators">
                        <img v-for="(indicator, index) in images" :key="index" :src="indicator.indicatorSrc"
                            :class="{ 'active': currentIndex === index }" class="carousel-indicators-img"
                            @click="currentIndex = index" />
                    </div>
                </div>
                <button class="carousel-control left" @click="prevImage">‹</button>
                <button class="carousel-control right" @click="nextImage">›</button>
            </div>
        </div>
        <div class="forth-content">
        </div>
        <div class="fifth-content"></div>
    </div>
</template>

<script>
export default {
    name: "Introduction",
    data() {
        return {
            currentIndex: 0, // 当前显示的图片索引
            images: [
                { src: require('../../src/assets/itr-png/30.png') },
                { src: require('../../src/assets/itr-png/31.png') },
                { src: require('../../src/assets/itr-png/32.png') },
            ],
            interval: null,
            intervalTime: 3000
        };
    },
    mounted() {
        this.startCarousel();
        this.addScrollListener();
    },
    beforeDestroy() {
        this.stopCarousel();
        this.removeScrollListener();
    },
    methods: {
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        startCarousel() {
            this.interval = setInterval(this.nextImage, this.intervalTime);
        },
        stopCarousel() {
            clearInterval(this.interval);
        }
    },
    mounted() {
        this.startCarousel();
    },
    beforeDestroy() {
        this.stopCarousel();
    }
}
</script>

<style>
.introduction {
    width: 1350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
}

.first-content {
    width: 100%;
    height: 900px;
    background: url(https://yx-web-nosdn.netease.im/quickhtml/assets/yunxin/node-website/res/image/im/banner_bg@2x.jpg) no-repeat 50% #201b44;
    background-size: 100% 1000px;
}

.ani1 {
    position: absolute;
    width: 28px;
    height: 166px;
    left: 50%;
    top: -170px;
    margin-left: -345px;
    animation: banner1 1.2s linear .6s infinite;
}

@keyframes banner1 {
    0% {
        top: -170px;
    }

    50% {
        top: 850px;
    }

    100% {
        top: 850px;
    }
}

.ani2 {
    position: absolute;
    width: 5px;
    height: 99px;
    left: 50%;
    margin-left: 334px;
    animation: banner1 1.2s linear 1ms infinite;
}

.ani3 {
    position: absolute;
    width: 20px;
    height: 255px;
    left: 50%;
    margin-left: 520px;
    animation: banner2 1.2s linear 1ms infinite;
}

@keyframes banner2 {
    0% {
        top: 850px;
    }

    50% {
        top: -255px;
    }

    100% {
        top: -255px;
    }
}

.text {
    display: flex;
    text-align: center;
    margin-left: 27vw;
    margin-top: 15vh;
    width: 150%;
    color: #2BA257;
    font-size: 80px;
    opacity: 0;
    animation: fadeIn 2s ease forwards;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.first-content-messages {
    margin-top: 10vh;
}

.message1 {
    font-size: 40px;
    margin-left: 20vw;
    color: #fff;
}

.message2 {
    font-size: 40px;
    margin-top: -5vh;
    margin-left: 15vw;
    color: #fff;
}

.text2 {
    font-size: 60px;
    margin-top: 10vw;
    margin-left: 25vw;
    color: #fff;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.first-content-messages span.message1 {
    animation: fadeIn 2s ease-out forwards;
    opacity: 0;
    animation-delay: 1s;
}

.first-content-messages span.message2 {
    animation: fadeIn 2s ease-out forwards;
    opacity: 0;
    animation-delay: 2s;
}

.first-content h1.text2 {
    animation: fadeIn 2s ease-out forwards;
    opacity: 0;
    animation-delay: 3s;
}

.page-1 {
    color: #2c2d48;
    height: 700px;
    width: 100%;
    overflow: hidden;
    position: relative;
}

.page-1 img {
    height: 558px;
    width: 656px;
    position: absolute;
    right: 80%;
}

.content h1 {
    font-size: 40px;
    margin-top: 120px;
    margin-left: 30vw;
}

.content span {
    color: #2BA257;
}

.content-img1 {
    width: 30px;
    height: 30px;
    margin-top: 50px;
    margin-left: 100px;
}

.content-img2 {
    width: 30px;
    height: 30px;
    margin-top: 100px;
    margin-left: 500px;
}

.second-content {
    width: 100%;
    height: 900px;
    margin-top: 200px;
    margin-left: 30px;
}

.third-content {
    width: 100%;
    height: 900px;
    margin-top: 30px;
    margin-left: 10px;
    background-image: url('../../src/assets/itr-png/41.png');
    background-size: 100% 1000px;
}


.carousel-image {
    width: 900px;
    height: 600px;
}

.carousel-container {
    position: relative;
    overflow: hidden;
    margin-top: 300px;
    max-width: 800px;
    margin: auto;
}

.carousel-images img.carousel-image {
    width: 100%;
}

.carousel-images img.carousel-image.active {
    display: block;
}

.carousel-indicators {
    position: absolute;
    transform: translateX(-50%);
    display: flex;
}

.carousel-indicators-img {
    width: 20px;
    height: 20px;
    margin: 5 5px;
    border-radius: 50%;
    cursor: pointer;
}

.carousel-indicators-img.active {
    background-color: #333;
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 100;
}

.carousel-control.left {
    left: 10px;
}

.carousel-control.right {
    right: 10px;
}

.third-content-text {
    margin-left: 550px;
    font-size: 60px;
    color: black;
}

.third-content-img {
    width: 300px;
    height: 300px;
}

.forth-content {
    width: 100%;
    height: 900px;
    margin-left: 30px;
    background-image: url('../../src/assets/itr-png/39.png');
    background-size: 100% 900px;
}

.fifth-content {
    width: 100%;
    height: 900px;
    margin-left: 20px;
    background-image: url('../../src/assets/itr-png/11.jpg');
    background-size: 100% 900px;
    transition: opacity 1s ease-in-out;
}
</style>