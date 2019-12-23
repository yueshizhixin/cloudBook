<template>
    <view>
        <uni-nav-bar left-icon="back" @clickLeft="navBack()" :title="title">
        </uni-nav-bar>

        <view class="container">
            <view>
                本书介绍
            </view>

        </view>

        <view class="btn-container" @tap="read">
            <view class="btn">
                开始阅读
            </view>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    export default {
        components: {
            uniNavBar
        },
        data() {
            return {
                title: '书名'
            }
        },
        onLoad(p) {},
        onShow() {},
        onReady() {},
        methods: {
            read() {
                this.navTo(`item`)
            }

        }
    }
</script>

<style lang="scss">


    .btn-container{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 750upx;
        height: 80upx;

        .btn{
            height: 100%;
            background-color: $color-primary;
            color: white;
        }
    }
</style>