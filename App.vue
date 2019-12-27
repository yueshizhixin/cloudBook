<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
    @import "static/css/icon.css";

    uni-image{
        width: 100%;
    }

    /*根view*/
    .page-comm{
        background-color: $color-bg;
        min-height: 100vh;
    }
    .page-comm.bg-grey{
        background-color: $color-bg-grey;
    }
    .tabber-page{
        min-height: calc(100vh - 100upx) !important;
    }

    //导航栏icon大小
    .tabbar-icon-size{
        font-size: 44upx;
    }

    /*导航栏下*/
    .container{
        padding: 30upx;
        padding-top: calc(30upx + #{$header-navbar-height} + #{$height-app-top});/*30+88(header)*/
        position: relative;
    }
    .container.no-padding-top{
        padding-top: calc(#{$header-navbar-height} + #{$height-app-top});/*30+88(header)*/
    }
    .container.no-padding-side{
        padding-left: 0;
        padding-right: 0;
    }




</style>
