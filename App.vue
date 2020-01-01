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
            let setting=this.getData({key:`setting`}) || {}
            if(!setting.font){
                setting.font = {size: 10}
                this.setData({key:`setting`,data:setting})
            }

        }
    }
</script>

<style lang="scss">
    @import "static/css/icon.css";

    uni-image {
        width: 100%;
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


</style>
