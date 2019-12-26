<template>

    <view class="page-comm tabber-page">
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
	.bg{

        z-index: 1;
        position: relative;
        width: 750upx;
        height: 480upx;
        background-color: $color-primary;
        color:white;
        text-align: center;
        font-size: 44upx;
        .icon{
            text-align: right;
            display: block;
            padding: 30upx 30upx 0 0;

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
            top:290upx;
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
        top:400upx;
        right: -50upx;
        width: 850upx;
        height: 160upx;
        content: '';
        transform: rotate(-12deg);
    }
</style>
