<template>
    <view class="container">
        <scroll-view :style="{'background-color': currentTheme.backgroundColor}" @click="contentTapHandler" @scroll="scrollChange" class="scroll" scroll-y="true" >
            <view class="title-section">
                <text class="title" :style="{'color': currentTheme.color}">{{chapterTitle}}</text>
            </view>
            <view class="content-section">
                <text class="content" :style="{'font-size': fontSize, 'color': currentTheme.color}">{{content}}</text>
                <!-- <u-parse :content="content"/> -->
            </view>
            <view class="bottom-section">
                <button @click="bottomBtnHandler('pre')" class="bottom-btn" :class="{'bottom-night-btn': isNight}" type="primary">上一章</button>
                <button @click="bottomBtnHandler('chapters')" class="bottom-btn" :class="{'bottom-night-btn': isNight}" type="primary">目录</button>
                <button @click="bottomBtnHandler('next')" class="bottom-btn" :class="{'bottom-night-btn': isNight}" type="primary">下一章</button>
            </view>
        </scroll-view>
        <view @click="maskHandler" class="slider-mask" :class="{'slider-show-mask' :sliderShow}">
            <view @click="sliderHandler" class="slider-section" :class="{'slider-show-section' :sliderShow}">
                <ss-sliderbar :isNightTheme="isNight" @chapterItemTap="chapterItemHandler" :currentChapter="currentChapter" :chapterList="chapterList"></ss-sliderbar>
            </view>
        </view>
        <view class="tool-section" :class="{'tool-show-section' :toolShow}">
            <ss-toolbar @toolSliderChange="toolSliderChangeHandler" :chapter="chapter" @themeTap="themeHandler" @functionBtnTap="functionBtnHandler" @chapterBtnTap="chapterBtnHandler"></ss-toolbar>
        </view>
        <view class="set-section" :class="{'set-show-section' :setShow}">
            <ss-setbar :isNightTheme="isNight" @brightChange="brightChangeHandler" @fontSizeChange="fontSizeChangeHandler"></ss-setbar>
        </view>
    </view>
</template>

<script>
    import ssSliderbar from '@/component/ebook/ss-sliderbar/ss-sliderbar.vue'
    import ssToolbar from '@/component/ebook/ss-toolbar/ss-toolbar.vue'
    import Json from '@/Json'
    import uParse from '@/component/ebook/gaoyia-parse/parse.vue'
    import ssSetbar from '@/component/ebook/ss-setbar/ss-setbar.vue'

    export default {
        components: {
            ssSliderbar,
            ssToolbar,
            uParse,
            ssSetbar
        },
        data () {
            return {
                chapterList: [],
                chapter: {},
                sliderShow: false,
                toolShow: false,
                setShow: false,
                screenWidth: 0,
                screenHeight: 0,
                content: '',
                chapterTitle: '',
                currentChapter: 0, // 当前的章节数 默认从0开始
                fontSize: '17px',
                nightTheme: {
                    backgroundColor: '#161616',
                    color: '#4f5050'
                },
                dayTheme: {
                    backgroundColor: '#f7f7f7',
                    color: '#333'
                },
                // 默认采用白天的主题样式
                currentTheme: {
                    backgroundColor: '#f7f7f7',
                    color: '#333'
                },
                // 是否为夜间模式
                // 默认值为false
                isNight: false,
                lastScrollY: 0 // 用来判断电子书的滑动方向
            }
        },
        onLoad (options) {
            this.getEbookChapterList();
            this.calculateScreenSize();
        },
        methods: {
            calculateScreenSize () {
                var info = uni.getSystemInfoSync();
                console.log('相關信息:' + JSON.stringify(info));
                this.screenHeight = info.safeArea.height;
                this.screenWidth = info.safeArea.width;
            },
            getEbookChapterList () {
                this.chapterList = Json.chapterList;
                var chapter = this.chapterList[0];
                this.chapter = chapter;
                this.chapterTitle = chapter.title;
                this.getChapterContent(chapter.number);
            },
            getChapterContent (num) {
                this.content = Json.chapterContent.content;
            },
            chapterItemHandler (index) {
                var chapter = this.chapterList[index];
                this.$api.msg('章节ID:' + chapter.number);
            },
            chapterBtnHandler (btnType) {
                switch (btnType) {
                    case 'pre':
                        this.$api.msg('上一章按钮');
                        break;
                    case 'next':
                        this.$api.msg('下一章按钮');
                        break;
                }
            },
            contentTapHandler (e) {
                console.log('this.toolShow',this.toolShow)
                console.log('this.setShow',this.setShow)


                this.toolShow = false;
                this.setShow = false;

                let x = e.detail.x;
                let y = e.detail.y;

                //上一页、设置、下一页三等分
                let areaWith=Math.floor(this.screenWidth/3)
                if(x<areaWith){
                    console.log('上一页')
                }else if(x>areaWith*2){
                    console.log('下一页')
                }else{
                    this.toolShow = !this.toolShow;
                    this.setShow = false;
                }
            },
            maskHandler () {
                console.log('maskHandler')
                this.sliderShow = false;
            },
            sliderHandler () {
                console.log('sliderHandler')
            },

            functionBtnHandler (type) {
                console.log('functionBtnHandler')
                let that = this;
                switch (type){
                    case 'chapters':
                        this.toolShow = false;
                        setTimeout(function() {
                            that.sliderShow = true;
                        }, 0.7);
                        break;
                    case 'set':
                        this.toolShow = false;
                        setTimeout(function() {
                            that.setShow = true;
                        }, 0.7);
                        break;
                }
            },

            /**
             * 主题变换按钮
             * 点击事件
             */
            themeHandler (isNight) {
                this.isNight = isNight;
                if (isNight) {
                    // 夜间主题模式
                    uni.setNavigationBarColor({
                        frontColor: '#fff',
                        backgroundColor: this.nightTheme.backgroundColor,
                        animation: {
                            duration: 400,
                            timingFunc: 'easeIn'
                        },
                        fail: function (res) {
                            console.log('导航栏颜色失败:' + JSON.stringify(res));
                        }
                    });
                    this.currentTheme = this.nightTheme;
                } else {
                    // 白天主题模式
                    uni.setNavigationBarColor({
                        frontColor: '#000',
                        backgroundColor: this.dayTheme.backgroundColor,
                        animation: {
                            duration: 400,
                            timingFunc: 'easeIn'
                        },
                        fail: function (res) {
                            console.log('导航栏颜色失败:' + JSON.stringify(res));
                        }
                    });
                    this.currentTheme = this.dayTheme;
                }
            },

            //工具栏按钮点击
            bottomBtnHandler (type) {
                switch (type){
                    case 'pre':
                        this.$api.msg('点击了上一章');
                        break;
                    case 'chapters':
                        this.sliderShow = true;
                        break;
                    case 'next':
                        this.$api.msg('点击了下一章');
                        break;
                }
            },

            //设置里章节滑动条滑动
            toolSliderChangeHandler (value) {
                this.$api.msg('该功能暂未开放')
                console.log('我获取的值为:' + value);
            },

            // 监听电子书滑动事件
            scrollChange (e) {
                let laterScrollTop = e.detail.scrollTop;
                let ty = laterScrollTop - this.lastScrollY;
                if (ty < 0) {
                    console.log('向上滑动');
                } else {
                    this.toolShow = false;
                }
                this.lastScrollY = laterScrollTop;
            },

            /**
             * 电子书阅读页面监听
             * 字体变化
             */
            fontSizeChangeHandler (fontSize) {
                this.fontSize = fontSize + 'px';
                console.log('fontSize变化了:' + this.fontSize)
            },

            /**
             * 电子书阅读页面监听
             * 屏幕亮度变化
             */
            brightChangeHandler (bright) {
                let value = bright / 100;
                uni.setScreenBrightness({
                    value: value,
                    success: function () {
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .container {
        position: absolute;
        left: 0upx;
        bottom: 0upx;
        right: 0upx;
        top: 0upx;

        .scroll {
            position: absolute;
            left: 0upx;
            bottom: 0upx;
            right: 0upx;
            top: 0upx;

            .content-section {
                padding: 0upx 40upx;
            }

            .title-section {
                padding: 20upx 40upx;
                font-size: 24px;
                font-weight: 600;
            }

            .bottom-section {
                margin-top: 50upx;
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding-bottom: 20upx;

                .bottom-btn {
                    width: 200upx;
                    height: 70upx;
                    color: #000;
                    line-height: 70upx;
                    border-radius: 10upx;
                    background-color: #fff;
                    font-size: $uni-font-size-lg;
                }

                .bottom-night-btn {
                    background-color: #333;
                    color: #808080;
                }
            }
        }

        .slider-mask {
            position: fixed;
            top: 0upx;
            left: 0upx;
            bottom: 0upx;
            right: 0upx;
            display: flex;
            transition: .7s;
            background-color: rgba(0, 0, 0, 0);
            visibility: hidden;
            animation-delay: .2s;

            .slider-section {
                height: 100%;
                width: 80%;
                transform: translateX(-100%);
                transition: .7s;
            }

            .slider-show-section {
                transform: translateX(0);
            }
        }

        .slider-show-mask {
            visibility: visible;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .set-section {
            position: fixed;
            height: 200upx;
            left: 0upx;
            bottom: 0upx;
            right: 0upx;
            transform: translateY(100%);
            transition: .7s;
        }

        .set-show-section {
            transform: translateY(0);
        }

        .tool-section {
            position: fixed;
            height: 300upx;
            left: 0upx;
            bottom: 0upx;
            right: 0upx;
            transform: translateY(100%);
            transition: .7s;
        }

        .tool-show-section {
            transform: translateY(0);
        }
    }
</style>
