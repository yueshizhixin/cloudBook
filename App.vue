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
        background-color: $color_bg;
    }

    /*导航栏下*/
    .container{
        /*#ifdef APP-PLUS*/
        /*加uni-nav-bar的 .uni-navbar__header{padding-top:30upx}*/
        padding: 60upx 30upx 30upx 30upx;
        padding-top: 148upx;/*+88(header)*/
        /*#endif*/
        /*#ifndef APP-PLUS*/
        padding: 30upx;
        padding-top: 118upx;/*+88(header)*/
        /*#endif*/
        position: relative;
    }
</style>
