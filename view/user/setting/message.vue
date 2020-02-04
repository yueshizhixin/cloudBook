<template>
    <view class="page-comm">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container no-padding-top">

            <view style="text-align: center;">
                <image src="http://cdn.yueshizhixin.top/asset/head/v2-11d7989c38671a72967547a34c4e83e1_r.jpg?imageView2/1/w/300/h/300"
                       style="width: 200upx;height: 200upx;border-radius: 50%;margin-top: 80upx;"
                    @tap="navTo(`no`)"
                ></image>
            </view>

            <view style="color:#777;margin-top: 34upx;">
                <view style="border-bottom: 2upx solid #e6e6e6;height: 82upx;padding-top:34upx;font-size: 34upx;">
                    <view style="display: inline;">
                        账号
                    </view>
                    <view style="display: inline;float: right;padding-left: 100upx;">
                        asdf1asdfsadf
                    </view>
                </view>
                <view style="border-bottom: 2upx solid #e6e6e6;height: 82upx;padding-top:34upx;font-size: 34upx;">
                    <view style="display: inline;">
                        昵称
                    </view>
                    <view style="display: inline;float: right;padding-right: 200upx;padding-top: 4upx;">
                        <input style="display: inline;width: 400upx;color:#333;" maxlength="180" type="text" v-model="title">
                    </view>
                </view>
                <view style="border-bottom: 2upx solid #e6e6e6;height: 82upx;padding-top:34upx;font-size: 34upx;">
                    <view style="display: inline;">
                        简介
                    </view>
                    <view style="display: inline;float: right;padding-right: 200upx;padding-top: 4upx;">
                        <input style="display: inline;width: 400upx;color:#333;" maxlength="180" type="text" placeholder="一句话简短介绍">
                    </view>
                </view>
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
                title: '个人资料',
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