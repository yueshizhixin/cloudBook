<template>
    <view>
        <view class="container">
            <scroll-view :style="{'background-color': currentTheme.backgroundColor}" @click="contentTapHandler" @scroll="scrollChange" class="scroll" scroll-y="true" >
                <view class="title-section">
                    <text class="title" :style="{'color': currentTheme.color,'font-size': fontSize+6+'px'}">{{chapterTitle}}</text>
                </view>
                <view class="content-section">
                    <text class="content" :style="{'font-size': fontSize+'px', 'color': currentTheme.color}">{{content}}</text>
                </view>
                <view class="bottom-section" v-if="menubarShow">
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
            <view v-if="isFontSizeProcessed" class="set-section" :class="{'set-show-section' :setShow}">
                <ss-setbar :defaultFontSize="fontSize" :isNightTheme="isNight" @brightChange="brightChangeHandler" @fontSizeChange="fontSizeChangeHandler"></ss-setbar>
            </view>
        </view>
    </view>

</template>

<script>
    import ssSliderbar from '@/component/ebook/ss-sliderbar/ss-sliderbar.vue'
    import ssToolbar from '@/component/ebook/ss-toolbar/ss-toolbar.vue'
    import uParse from '@/component/ebook/gaoyia-parse/parse.vue'
    import ssSetbar from '@/component/ebook/ss-setbar/ss-setbar.vue'
    import styleConf from '@/js/css'


    export default {
        components: {
            ssSliderbar,
            ssToolbar,
            uParse,
            ssSetbar
        },
        data () {
            return {
                /**
                 * ---------自带的 start------------
                 */
                chapterList: [],//目录列表
                chapter: {},//当前章节
                sliderShow: false,
                toolShow: false,
                setShow: false,
                screenWidth: 0,
                screenHeight: 0,
                content: '',
                chapterTitle: '',
                currentChapter: 0, // 当前的章节数 默认从0开始
                fontSize: 10,
                nightTheme: {
                    backgroundColor: '#161616',
                    color: '#4f5050'
                },
                dayTheme: {
                    backgroundColor: '#f6f4ec',
                    color: '#000'
                },
                // 默认采用白天的主题样式
                currentTheme: {
                    backgroundColor: styleConf.color_ebook,
                    color: '#000'
                },
                // 是否为夜间模式 默认值为false
                isNight: false,
                lastScrollY: 0, // 用来判断电子书的滑动方向
                /**
                 * end
                 */


                // 阅读模式 page scroll
                readMode:`page`,
                textArr:[],//文字内容数组
                bookId:0,
                chapterId:0,
                //目录title page
                page: {
                    limit: 20,
                    offset: 1,
                    loading: 0,//正在加载中 默认否
                    loaded: 0,//至少加载过一次 默认否
                    loadable: 1,//能否进行加载操作 默认是
                },
                menubarShow:false,//上一页 设置 下一页显示
                isFontSizeProcessed:false,//处理完大体大小再显示
            }
        },
        onLoad(p) {
            this.menubarShow=false;
            this.bookId=p.id || 0
            if(!this.$reg.uintno0.test(this.bookId)){
                this.navBack()
            }
            this.bookId=Number(this.bookId)
            if(p.chapterId){
                this.chapterId=p.chapterId
                if(!this.$reg.uintno0.test(this.chapterId)){
                    this.navBack()
                }
                this.chapterId=Number(this.chapterId)
            }
        },
        onShow() {
        },
        async onReady() {
            this.getEbookChapterList();
            this.getChapterContent()
            this.$nextTick(() => {
                let setting=this.getData({key:`setting`}) || {}
                if(!setting.font){
                    setting.font={
                        size:10
                    }
                }
                this.fontSize=setting.font.size
                this.isFontSizeProcessed=true;
            })
            setTimeout(()=>{
               this.menubarShow=true;
            },7000)

        },
        methods: {

            //自动缓存 先5章
            async autoLoadNextChapter() {
                for (let i = this.chapterId; i <= this.chapterId + 4; i++) {
                    if(this.getData({key:`book${this.bookId}chapter${i}`})){
                        console.log(`本章节已存在 跳过预缓存`,i)
                        continue;
                    }
                    let d = await this.GET(`/api/v1/book/chapter/${i}/content`, {})
                    if (d.ok !== 1 || !d.data || !d.data.content) {
                        console.log(`预缓存失败 ${i}`)
                        continue;
                    }
                    let data = d.data.content
                    this.setData({
                        key: `book${this.bookId}chapter${i}`,
                        data: data.replace(/<br>\r/g, '')
                    })
                    console.log(`预缓存成功 ${i}`)
                }
            },

            //上一章
            prePage() {
                uni.redirectTo({
                    url:`/view/book/item?id=${this.bookId}&chapterId=${this.chapterId-1}`
                })
            },

            //下一章
            nextPage() {
                uni.redirectTo({
                    url:`/view/book/item?id=${this.bookId}&chapterId=${this.chapterId+1}`
                })
            },

            //计算文字数组
            calcTextArr() {
                if(!this.content || !this.fontSize){
                    return;
                }

                // let len=this.$api.getTextLength(this.content,this.$api.getNumberFromStr(this.fontSize))
                // console.log('文字长度',len)

            },


            /**
             * ------------------自带的----------------
             */

            //计算屏幕大小
            calculateScreenSize () {
                let info = uni.getSystemInfoSync();
                console.log('系统信息',JSON.stringify(info));
                this.screenHeight = info.safeArea.height;
                this.screenWidth = info.safeArea.width;
            },

            //获取电子书章节
            async getEbookChapterList() {

                return;

                if (this.page.loadable === 0) {
                    uni.stopPullDownRefresh();
                    return;
                }
                if (this.page.loading === 1) {
                    uni.stopPullDownRefresh();
                    return;
                }
                this.page.loading=1
                this.page.bookId=this.bookId
                let d=await this.GET(`/api/v1/book/${this.bookId}/chapter`,this.page)
                console.log('目录',d)
                this.page.loading=0
                uni.stopPullDownRefresh();
                if(d.ok===1){
                    this.chapterList.push(...d.data)
                    if(d.data.length<this.page.limit){
                        this.page.loadable=0
                    }
                    this.page.offset++
                    this.page.loaded=1
                }

            },

            //获取本章节内容
            async getChapterContent (num=-1) {
                /**
                 * 从书架里进入不传章节 获取书架的缓存
                 */
                if(this.chapterId===0){
                    if(num===-1){
                        let shelf=this.getData({key:`book_shelf`})
                        console.log('书架缓存',shelf)
                        let book=shelf.find(x=>x.bookId===this.bookId)
                        console.log('书架缓存 book',book)
                        num=book.chapterId
                    }
                    this.chapterId=num
                }

                /**
                 * 获取标题
                 * 先临时这样 最终用左侧列表
                 */
                this.GET(`/api/v1/book/chapter/${this.chapterId}/title`,{}).then(d=>{
                    console.log(`标题`,d)
                    if (d.ok === 0) {
                        this.$api.msg(`标题获取失败 ${d.msg}`);
                    }
                    this.chapterTitle=d.data.title
                    uni.setNavigationBarTitle({
                        title:this.chapterTitle
                    })
                    // uni.setNavigationBarColor({
                    //     frontColor:`#000000`,
                    //     backgroundColor:this.$css.color_ebook
                    // })

                }).catch(e=>{
                    console.log(e)
                    this.$api.msg(`标题获取失败`)
                })


                /**
                 * 缓存里有无此书
                 */
                let cache_book_content = this.getData({key: `book${this.bookId}chapter${this.chapterId}`})
                if(cache_book_content){
                    this.content=cache_book_content
                }else{
                    this.showLoading()
                    let d=await this.GET(`/api/v1/book/chapter/${this.chapterId}/content`,{})

                    if(d.ok!==1 || !d.data || !d.data.content){
                        this.$api.msg("获取章节内容失败")
                        return;
                    }

                    let data=d.data.content
                    this.content=data.replace(/<br>\r/g,'')
                    this.hideLoading()

                    this.setData({
                        key: `book${this.bookId}chapter${this.chapterId}`,
                        data:this.content
                    },false)
                }
                /**
                 * 更新阅读记录
                 */
                this.PUT(`/api/v1/book/${this.bookId}/chapter/${this.chapterId}`,{}).then(d=>{
                    if (d.ok === 0) {
                        this.$api.msg(`同步阅读记录失败 ${d.msg}`)
                        return;
                    }
                    console.log('同步阅读记录成功')
                }).catch(e=>{
                    this.$api.msg('同步阅读记录失败')
                })

                this.calcTextArr()
                this.calculateScreenSize();

                this.autoLoadNextChapter()
            },


            //设置菜单上一章下一章
            chapterBtnHandler (btnType) {
                console.log('chapterBtnHandler')
                switch (btnType) {
                    case 'pre':
                        this.prePage()
                        break;
                    case 'next':
                        this.nextPage()
                        break;
                }
            },

            //屏幕点击
            contentTapHandler (e) {

                let x = e.detail.x;
                let y = e.detail.y;

                //上一页、设置、下一页三等分
                let areaWith=Math.floor(this.screenWidth/3)
                if(x<areaWith){
                    if(this.toolShow || this.setShow){
                        this.toolShow = false;
                        this.setShow = false;
                    }else{
                        console.log('上一页')
                    }
                }else if(x>areaWith*2){
                    if(this.toolShow || this.setShow){
                        this.toolShow = false;
                        this.setShow = false;
                    }else{
                        console.log('下一页')
                    }
                }else{
                    this.toolShow = !this.toolShow;
                    this.setShow = false;
                }
            },

            /**
             * 目录点击章节跳转 start
             */
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
            chapterItemHandler (index) {
                console.log('chapterItemHandler',index)
                let chapter = this.chapterList[index];
                this.$api.msg('章节ID:' + chapter.id);
            },
            sliderHandler () {
                console.log('sliderHandler')
            },
            maskHandler () {
                console.log('maskHandler')
                this.sliderShow = false;
            },

            /**
             * end
             */

            //主题变换按钮 点击事件
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
                        this.prePage()
                        break;
                    case 'chapters':
                        this.sliderShow = true;
                        break;
                    case 'next':
                        this.nextPage()
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
                let setting=this.getData({key:`setting`})
                setting.font.size=fontSize
                this.setData({key:`setting`,data:setting})
                this.fontSize = fontSize;
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
                text-align: center;
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
            transition: .2s;
            background-color: rgba(0, 0, 0, 0);
            visibility: hidden;
            animation-delay: .2s;

            .slider-section {
                height: 100%;
                width: 80%;
                transform: translateX(-100%);
                transition: .2s;
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
            transition: .2s;
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
            transition: .2s;
        }

        .tool-show-section {
            transform: translateY(0);
        }
    }
</style>
