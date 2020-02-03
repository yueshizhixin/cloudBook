<template>
    <view class="page-comm bg-grey">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container no-padding-top no-padding-side">
            <view class="module" @tap="navTo(`no`)">
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
                    <view class="icon-right icon-right-no-first">13127043375</view>

                </view>
                <view class="item">
                    <view class="cuIcon-mail icon"></view>
                    <view class="text">邮箱绑定</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
            </view>

            <view class="module" @tap="navTo(`no`)">
                <view class="item">
                    <view class="cuIcon-down icon"></view>
                    <view class="text">检查更新</view>
                    <view class="cuIcon-right icon-right"></view>
                    <view class="icon-right icon-right-no-first">v0.0.1</view>

                </view>
                <view class="item">
                    <view class="cuIcon-close icon"></view>
                    <view class="text">注销账号</view>
                    <view class="cuIcon-right icon-right"></view>
                </view>
            </view>

            <view class="module">
                <view class="btn" @tap="signOut">我要退出</view>
            </view>

        </view>

        <min-modal ref="modal"></min-modal>

    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import minModal from '@/component/comm/min-modal/min-modal'

    export default {
        components: {
            uniNavBar, minModal
        },
        data() {
            return {
                title: '设置',
            }
        },
        onLoad(p) {
            this.authCheck()
        },
        onShow() {
            this.authCheck()
        },
        onReady() {
        },
        methods: {
            //退出
            signOut() {
                this.$refs.modal.handleShow({success})
                function success(d) {
                    if (d.id !== 1) return;
                    this.signOut()
                    this.navBack()
                }
            },
        }
    }
</script>

<style lang="scss">

    .module {
        font-size: 34upx;
        color: #444;
        background-color: white;
        padding: 0upx 40upx;
        /*margin: 0upx 0 30upx;*/
        border-radius: 8upx;

        .btn {
            margin-top: 40upx;
            color: $color-primary;
            font-size: 40 ux;
            line-height: 40upx;
            height: 40upx;
            text-align: center;
            padding: 20upx 0;
        }

        .item {
            font-size: 30upx;
            height: 30upx;
            line-height: 30upx;
            padding: 30upx 0;
            width: 674upx;

            .icon {
                padding-right: 22upx;
                display: inline;
                font-size: calc(100% + 4upx);
                height: calc(100% + 4upx);
                line-height: calc(100% + 4upx);
            }

            .text {
                display: inline;
            }

            /*.text:after{*/
            /*content: '》';*/
            /*font-size: 30upx;*/
            /*opacity: .8;*/
            /*padding-right: 0;*/
            /*}*/
            .icon-right {
                float: right;
                opacity: .8;
                display: inline;
                padding-top: 4upx;
            }

            .icon-right.icon-right-no-first {
                padding-right: 10upx;
            }
        }
    }
</style>