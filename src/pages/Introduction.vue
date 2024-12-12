<template>
    <div class="introduction">
        <!-- <div class="first-content">
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
            <img src="../../src/assets/itr-png/14.png">
            <img class="second-content-img" src="../../src/assets/itr-png/15.png">
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
        <div class="fifth-content"></div> -->
    </div>
</template>

<script>
export default {
    name: "Introduction",
    data() {
        return {
        //     currentIndex: 0, // 当前显示的图片索引
        //     images: [
        //         { src: require('../../src/assets/itr-png/11.png') },
        //         { src: require('../../src/assets/itr-png/12.png') },
        //         { src: require('../../src/assets/itr-png/13.png') },
        //     ],
        //     interval: null,
        //     intervalTime: 3000
        };
    },
    // mounted() {
    //     this.startCarousel();
    //     this.addScrollListener();
    // },
    // beforeDestroy() {
    //     this.stopCarousel();
    //     this.removeScrollListener();
    // },
    // methods: {
    //     nextImage() {
    //         this.currentIndex = (this.currentIndex + 1) % this.images.length;
    //     },
    //     prevImage() {
    //         this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    //     },
    //     startCarousel() {
    //         this.interval = setInterval(this.nextImage, this.intervalTime);
    //     },
    //     stopCarousel() {
    //         clearInterval(this.interval);
    //     },
    //     scrollToRight() {
    //         const windowWidth = window.innerWidth;
    //         const scrollPosition = windowWidth * 0.3;
    //         window.scrollTo(scrollPosition, 0);
    //     }
    // },
    // mounted() {
    //     this.scrollToRight();
    //     this.startCarousel();
    // },
    // beforeDestroy() {
    //     this.stopCarousel();
    // }
}
</script>

