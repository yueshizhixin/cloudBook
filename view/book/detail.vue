<template>
    <view class="page-comm ">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container">

            <view>
                <image :src="book.bookImageAlign"  mode="widthFix"
                       style="border-radius: 14upx;width: 690upx;"></image>
            </view>

            <view>
                <view>
                    {{book.name}}
                </view>
                <view>
                    {{book.tag}}
                </view>
            </view>

            <view>
                阅读量等
            </view>
            <view>
                介绍
            </view>
            <view>
                条目介绍
            </view>
        </view>
        <view class="btn-bottom-container" @tap="read">
            <view class="btn">
                开始阅读
            </view>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    export default {
        components: {
            uniNavBar
        },
        data() {
            return {
                title: '书籍详情',
                pageCanLoad:false,
                bookId:0,
                book: {}

            }
        },
        onLoad(p) {
            if (!this.$reg.uintno0.test(p.bookId)) {
                this.$api.msg('参数错误 ');
                setTimeout(this.navBack,700)
                return;
            }
            this.pageCanLoad=true;
            this.bookId=p.bookId;
        },
        onShow() {
            if (!this.pageCanLoad) return;
        },
        onReady() {
            if (!this.pageCanLoad) return;

            this.getBookDetail();
        },
        methods: {
            read() {
                this.navTo(`item`)
            },

            getBookDetail() {
                this.GET(`/api/v1/book/${this.bookId}/detail`, {}).then(d => {
                    console.log(`书籍信息`,d)
                    if (d.ok === 0) {
                        this.$api.msg(d.msg)
                        return;
                    }
                    let x=d.data
                    if(x.tag){
                        let tags=x.tag.split(',')
                        let tag=tags.join(`·`)
                        x.tag=tag.substring(1,tag.length-1)
                    }
                    d.data.tag=x.tag
                    this.book=d.data


                }).catch(e => {
                    this.$api.msg(e.msg || `操作失败`)
                    console.log(e)
                })
            },


        }
    }
</script>

<style lang="scss">


    .btn-bottom-container{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750upx;
        height: 80upx;

        .btn{
            height: 100%;
            background-color: $color-primary;
            color: white;
        }
    }
</style>