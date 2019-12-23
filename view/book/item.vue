<template>
    <view>
        <uni-nav-bar left-icon="back" :title="title">
        </uni-nav-bar>

    </view>
</template>

<script>

    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingle from "@/component/book/list-single"

    export default {
        components: {
            uniNavBar, listSingle
        },
        data() {
            return {
                title: '书名'
            }
        },
        onLoad() {

        },
        methods: {}
    }
</script>

<style lang="scss">
    .content {
        margin-top: 88upx;
        padding: 30 upx;
    }
</style>
