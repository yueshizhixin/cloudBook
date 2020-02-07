<script>
    export default {
        onLaunch() {
            console.log('App Launch')


        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        },
        mounted() {
            console.log('App mounted')
            let setting=uni.getStorageSync(`setting`) || {}
            if(!setting.font){
                setting.font = {size: 10}
                uni.setStorageSync(`setting`, setting)
            }
        }
    }
</script>

<style lang="scss">
    @import "static/css/icon.css";

    /*公共定义 放在uni.scss里总会下边覆盖上边*/
    /* #ifdef APP-PLUS */
    $height-app-top:30rpx;
    /*#endif */
    /*#ifndef APP-PLUS*/
    $height-app-top:0upx;
    /*#endif */

    uni-image {
        width: 100%;
    }

    .uni-input-placeholder{
        color: #bbbbbb;
    }

    /*根view*/
    .page-comm {
        background-color: $color-bg;
        min-height: 100vh;
    }

    .page-comm.bg-grey {
        background-color: $color-bg-grey;
    }

    .tabber-page {
        min-height: calc(100vh - 100upx) !important;
    }

    //导航栏icon大小
    .tabbar-icon-size {
        font-size: 44rpx;
        padding-top: 20rpx;
    }

    /*导航栏下*/
    .container {
        padding: 30upx;
        padding-top: calc(40upx + #{$header-navbar-height} + #{$height-app-top}); /*30+88(header)*/
        position: relative;
    }

    .container.no-padding-top {
        padding-top: calc(#{$header-navbar-height} + #{$height-app-top}); /*30+88(header)*/
    }

    .container.no-padding-side {
        padding-left: 0;
        padding-right: 0;
    }

    .container.no-padding-top.min-height-wrap {
        min-height: calc(100vh - #{$header-navbar-height} - #{$height-app-top} - 30upx);//100-顶部-底部
    }

    /**
        表单部分
     */
    .form{
        padding-bottom: 120upx;
        color:#777;
        padding-left: 28upx;
        padding-right: 28upx;
        .item{
            border-bottom: 2upx solid #e6e6e6;height: 82upx;padding-top:34upx;font-size: 34upx;position: relative;
            .left{
                display: inline;
            }
            .right.label{
                display: inline;position: absolute;left:160upx;
            }
            .right.input{
                display: inline;float: right;padding-right: 128upx;padding-top: 4upx;
                input{
                    display: inline;width: 400upx;color:#333;
                }
            }
        }
    }

    .from-btn{
        position: absolute;
        left:30upx;
        bottom: 30upx;
        width: 690upx;
        background: $color-primary;
        color:white;
        text-align: center;
        font-size: 40upx;
        line-height: 80upx;
        height: 80upx;
        border-radius: 8upx;

    }


</style>
