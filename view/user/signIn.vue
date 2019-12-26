<template>
    <view class="page-comm">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
            <view slot="right" class="cuIcon-add tabbar-icon-size" @tap="navTo(`no`)"></view>
        </uni-nav-bar>

        <view class="container">
            <view class="form">
                <input v-model="user.phone" type="text" placeholder="账号 | 手机号或邮箱">
                <input v-model="user.pwd" class="no-first" type="password" placeholder="密码 | 6-12位数字字母组合">
            </view>

            <view class="btn" @tap="sign">
                登录
            </view>
            <view class="tip" @tap="navTo(`no`)">
                找回密码
            </view>
            <view class="line">
                <view class="text">其他登录方式</view>
            </view>
            <view class="other" @tap="navTo(`no`)">
                <view class="cuIcon-weixin icon"></view>
                <view class="cuIcon-weibo icon"></view>
                <view class="cuIcon-card icon"></view>

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
                title: '登录',
                user: {
                    phone: '',
                    pwd: '',
                    action: 'in',
                }
            }
        },
        onLoad(p) {
        },
        onShow() {
        },
        onReady() {
        },
        methods: {
            sign() {
                if (!this.$reg.phone.test(this.user.phone)) {
                    this.$api.msg2('手机号')
                    return;
                }
                if (!this.$reg.pwd.test(this.user.pwd)) {
                    this.$api.msg2('密码')
                    return;
                }

                this.showLoading()
                this.POST(`/api/user/tag=sign`, this.user).then((data) => {
                    console.log('登录', data)

                    this.hideLoading()
                    this.$api.msg(data.msg)
                    if (data.ok === 0) {
                        return;
                    }
                    this.setData({
                        key: 'user',
                        data: data.data,
                    })
                    this.navBack()

                }).catch(e => {
                    console.log(e)

                    this.$api.msg(`操作失败`)
                    this.hideLoading()

                })
            },
            read() {
                this.navTo(`item`)
            }

        }
    }
</script>

<style lang="scss">

    .container {
        .form {
            margin-top: 60upx;
            padding: 0 30upx;

            input {
                border-bottom: 2upx solid #ddd;
                height: 50upx;
                padding: 10upx 0;
                line-height: 30upx;
            }

            .no-first {
                margin-top: 20upx;
            }
        }

        .btn {
            width: calc(100% - 60upx);
            background-color: $color-primary;
            color: #fff;
            text-align: center;
            padding: 20upx 0;
            height: 40upx;
            line-height: 40upx;
            margin-top: 100upx;
            margin-left: 30upx;
            border-radius: 10upx;
        }

        .tip {
            width: calc(100% - 60upx);
            color: #999;
            text-align: right;
            padding: 20upx 0;
            height: 20upx;
            line-height: 20upx;
            margin-left: 30upx;
            font-size: 26upx;
        }

        .line {
            width: 100%;
            text-align: center;
            padding: 20upx 0;
            height: 10upx;
            border-bottom: rgba(0, 0, 0, 0.1) solid 2upx;

            .text {
                font-size: 30upx;
                color: #666;
                line-height: 30upx;
                height: 30upx;
                padding: 0upx 10upx;
                padding-top: 14upx;
                background-color: $color-bg;
                /*border: black solid 2upx;*/
                width: 260upx;
                margin-left: 215upx;

            }
        }

        .other {
            width: calc(100% - 60upx);
            color: $color-primary;
            text-align: center;
            padding: 20upx 0;
            margin-top: 30upx;
            margin-left: 90upx;

            .icon {
                display: inline;
                font-size: 70upx;
                padding-right: 150upx;
            }
        }
    }

    .btn-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750upx;
        height: 80upx;

        .btn {
            height: 100%;
            background-color: $color-primary;
            color: white;
        }
    }
</style>