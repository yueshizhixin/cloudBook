<template>

    <view class="page-comm tabber-page" style="overflow-x:hidden;">
        <!--标题栏-->

        <view >
            <view class="bg">
                <view class="icon">
                    <view @tap="navTo(`/view/user/setting`)" class="cuIcon-settings"></view>
                </view>
                <view class="name" @tap="navTo(`no`)">
                    {{user.nickName}}
                </view>
                <view class="tip" @tap="navTo(`no`)">
                    趁生命气息逗留
                </view>
                <view class="img-container">
                    <image @tap="navTo(`no`)" :src="user.headImg"
                        class="img"
                    >
                    </image>
                </view>
            </view>
        </view>
    </view>

</template>

<script>
	export default {
		data() {
			return {
			    user:{}
			}
		},
        onLoad(p) {},
        onShow() {
            this.authCheck()
        },
        onReady() {
            this.getMyMessage()
        },
        onPullDownRefresh() {
            this.getMyMessage()
        },
		methods: {
            getMyMessage() {
                this.GET(`/api/v1/user/tag=me`, this.user).then(d => {
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

    /*公共定义 放在uni.scss里总会下边覆盖上边*/
    /* #ifdef APP-PLUS */
    $height-app-top:30rpx;
    /*#endif */
    /*#ifndef APP-PLUS*/
    $height-app-top:0upx;
    /*#endif */

    .bg{

        z-index: 1;
        position: relative;
        width: 750upx;
        height: calc(480upx + #{$height-app-top});
        background-color: $color-primary;
        color:white;
        text-align: center;
        font-size: 44upx;
        .icon{
            text-align: right;
            display: block;
            padding: 30upx 30upx 0 0;
            padding-top: calc(40upx + #{$height-app-top});

        }
        .name{
            padding-top: 30upx;
        }
        .tip{
            font-size: 24upx;
            padding-top: 16upx;
        }
        .img-container{
            position: absolute;
            left: 0;
            top:calc(290upx + #{$height-app-top});
            height: 200upx;
            width: 750upx;
            z-index: 9999;

            .img{
                border-radius: 50%;
                width: 200upx;
                height: 200upx;
            }
        }

	}
    .bg:after{
        /*border: solid 2upx black;*/
        background-color: $color-bg;
        z-index: 99;
        position: absolute;
        top:calc(400upx + #{$height-app-top});
        right: -50upx;
        width: 850upx;
        height: calc(160upx + #{$height-app-top});
        content: '';
        transform: rotate(-12deg);
    }
</style>
