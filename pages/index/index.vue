<template>
	<view class="page-comm tabber-page">
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search tabbar-icon-size" @tap="navTo(`no`)"></view>
        </uni-nav-bar>

        <view class="container">
            <list-single></list-single>
        </view>
	</view>
</template>

<script>

    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingle from "@/component/book/list-single"
    import tabBar from "@/component/comm/ms-tabs/ms-tabs.vue"

	export default {
        components: {
            uniNavBar,listSingle,
        },
		data() {
			return {
                title:'我的书架',
                tabList:[
                    {id:1,title:'本地'},
                    {id:2,title:'网络'},
                ]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
</style>
