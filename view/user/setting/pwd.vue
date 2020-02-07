<template>
    <view class="page-comm">
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container no-padding-top min-height-wrap">

            <view style="margin-top: 34upx;" class="form">
                <view class="item">
                    <view class="left">
                        原密码
                    </view>
                    <view class="right input">
                        <input v-model="opwd" maxlength="180" type="password" placeholder="请输入原密码">
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        新密码
                    </view>
                    <view class="right input">
                        <input v-model="npwd1" maxlength="180" type="password" placeholder="请输入6-12位数字字母组合">
                    </view>
                </view>
                <view class="item">
                    <view class="left">
                        新密码
                    </view>
                    <view class="right input">
                        <input v-model="npwd2" maxlength="180" type="password" placeholder="请再次输入新密码">
                    </view>
                </view>
            </view>

            <view class="from-btn" @tap="updatePassword">
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
                title: '修改密码',
                opwd:``,
                npwd1:``,
                npwd2:``,
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
            updatePassword() {
                if (!this.$reg.pwd.test(this.opwd)) {
                    this.$api.msg2('原密码')
                    return;
                }
                if (!this.$reg.pwd.test(this.npwd1)) {
                    this.$api.msg2('新密码')
                    return;
                }
                if (this.npwd1 != this.npwd2) {
                    this.$api.msg(`两次新密码不同`)
                    return;
                }
                if (this.opwd == this.npwd1) {
                    this.$api.msg(`新密码不能与老密码相同`)
                    return;
                }

                let t=this;
                this.$refs.modal.handleShow({success})
                function success(d) {
                    if (d.id !== 1) return;
                    t.PUT(`/api/v1/user/me/pwd`,{
                        oldPwd:t.opwd,
                        newPwd:t.npwd1
                    }).then(d => {
                        uni.stopPullDownRefresh();
                        console.log('我的信息', d)
                        if (d.ok === 0) {
                            t.$api.msg(d.msg);
                            return;
                        }
                        t.signOut()
                        t.navToUser()
                    }).catch(e => {
                        uni.stopPullDownRefresh();
                        console.log(e)
                        t.$api.msg(`操作失败`)
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
                    this.$api.msg(`操作失败`)
                })
            },
        }
    }
</script>

<style lang="scss">
</style>