<template>
    <view>
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search"></view>
        </uni-nav-bar>

        <view class="container">
            <list-single-short></list-single-short>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingleShort from "@/component/book/list-single-short"

    export default {
        components: {
            uniNavBar,listSingleShort
        },
		data() {
			return {
                title:'书城'
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
