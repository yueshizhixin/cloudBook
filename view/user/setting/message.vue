<template>
    <view class="page-comm">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container no-padding-top min-height-wrap">

            <view style="text-align: center;">
                <image :src="user.headImg"
                       style="width: 200upx;height: 200upx;border-radius: 50%;margin-top: 80upx;"
                    @tap="navTo(`no`)"
                ></image>
            </view>

            <view style="margin-top: 34upx;" class="form">
                <view class="item">
                    <view class="left">
                        账号
                    </view>
                    <view class="right label">
                        {{user.phone || user.email}}
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        昵称
                    </view>
                    <view class="right input">
                        <input maxlength="180" type="text" v-model="user.nickName">
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        简介
                    </view>
                    <view class="right input">
                        <input maxlength="180" type="text" placeholder="一句话简短介绍">
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        性别
                    </view>
                    <view class="right label">
                        暂不可设置
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        出生日期
                    </view>
                    <view class="right label">
                        暂不可设置
                    </view>
                </view>
            </view>

            <view class="from-btn" @tap="updateMyMessage">
                保 存
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
                user: {},
            }
        },
        onLoad(p) {
            this.authCheck()
        },
        onShow() {},
        onReady() {
            this.getMyMessage()
        },
        methods: {
            //更新我的信息
            updateMyMessage() {
                let t=this
                this.$refs.modal.handleShow({success})
                function success(d) {
                    if (d.id !== 1) return;
                    t.PUT(`/api/v1/user/me`,t.user).then(d => {
                        uni.stopPullDownRefresh();
                        console.log('我的信息', d)
                        if (d.ok === 0) {
                            t.$api.msg(d.msg);
                            return;
                        }
                        uni.setStorageSync(`isNeedReload_user`, 1)
                        t.navBack()
                    }).catch(e => {
                        uni.stopPullDownRefresh();
                        console.log(e)
                        t.$api.msg(e.msg || `操作失败`)
                    })
                }
            },
            //获取信息
            getMyMessage() {
                this.GET(`/api/v1/user/tag=me`,{}).then(d => {
                    uni.stopPullDownRefresh();
                    console.log('我的信息', d)
                    if (d.ok === 0) {
                        this.$api.msg(d.msg);
                        return;
                    }
                    this.user=d.data;
                }).catch(e => {
                    uni.stopPullDownRefresh();
                    console.log(e)
                    this.$api.msg(e.msg || `操作失败`)
                })
            },
        }
    }
</script>

<style lang="scss">
</style>