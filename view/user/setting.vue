<template>
    <view class="page-comm bg-grey">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container no-padding-top no-padding-side">
            <view class="module">
                <view class="item">
                    <view class="cuIcon-my icon"></view>
                    <view class="text">个人资料</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
                <view class="item">
                    <view class="cuIcon-keyboard icon"></view>
                    <view class="text">修改密码</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
                <view class="item">
                    <view class="cuIcon-phone icon"></view>
                    <view class="text">手机绑定</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
                <view class="item">
                    <view class="cuIcon-mail icon"></view>
                    <view class="text">邮箱绑定</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
            </view>

            <view class="module">
                <view class="item">
                    <view class="cuIcon-down icon"></view>
                    <view class="text">检查更新</view>
                    <view class="cuIcon-right icon-right">

                    </view>
                </view>
                <view class="item">
                    <view class="cuIcon-close icon"></view>
                    <view class="text">注销账号</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
            </view>

            <view class="module">
                <view class="btn">我要退出</view>
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
                title: '设置',
            }
        },
        onLoad(p) {
            this.authorCheck()
        },
        onShow() {
            this.authorCheck()
        },
        onReady() {
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    .page-comm{
        background-color: $color-bg-grey;
    }

    .module{
        font-size: 34upx;
        color: #444;
        background-color: white;
        padding: 0upx 40upx;
        /*margin: 0upx 0 30upx;*/
        border-radius: 8upx;

        .btn{
            margin-top: 40upx;
            color:$color-primary;
            font-size: 40ux;
            line-height: 40upx;
            height: 40upx;
            text-align: center;
            padding: 20upx 0;
        }

        .item{
            font-size: 30upx;
            height: 30upx;
            line-height: 30upx;
            padding: 30upx 0;
            width: 674upx;
            .icon{
                padding-right: 22upx;
                display: inline;
                font-size: calc(100% + 4upx);
                height: calc(100% + 4upx);
                line-height: calc(100% + 4upx);
            }
            .text{
                display: inline;
            }
            /*.text:after{*/
                /*content: '》';*/
                /*font-size: 30upx;*/
                /*opacity: .8;*/
                /*padding-right: 0;*/
            /*}*/
            .icon-right{
                float: right;
                opacity: .8;
                display: inline;
            }
        }
    }
</style>