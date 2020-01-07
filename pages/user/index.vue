<template>

    <view class="page-comm tabber-page" style="overflow-x:hidden;">
        <!--标题栏-->

        <view >
            <view class="bg">
                <view class="icon">
                    <view @tap="navTo(`/view/user/setting`)" class="cuIcon-settings"></view>
                </view>
                <view class="name" @tap="navTo(`no`)">
                    大乘期修士
                </view>
                <view class="tip" @tap="navTo(`no`)">
                    趁生命气息逗留
                </view>
                <view class="img-container">
                    <image @tap="navTo(`no`)" src="http://cdn.yueshizhixin.top/asset/bg/e365d2e9a70828414ff0ff30b6f9f4df.jpg?imageView2/1/w/300/h/300"
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
