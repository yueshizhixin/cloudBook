<template>
	<view >
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search"></view>
        </uni-nav-bar>

        <view class="content">
            <list-single></list-single>
        </view>
	</view>
</template>

<script>

    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingle from "@/component/book/list-single"

	export default {
        components: {
            uniNavBar,listSingle
        },
		data() {
			return {
                title:'我的书架'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
    .content{
        margin-top: 44px;
        padding: 30upx;
    }
</style>
