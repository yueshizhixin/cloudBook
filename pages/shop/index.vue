<template>
    <view class="page-comm tabber-page">
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search" @tap="navTo(`no`)"></view>
        </uni-nav-bar>

        <view class="container">
            <list-single-short :list="list"></list-single-short>
        </view>
    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingleShort from "@/component/book/list-single-short"

    export default {
        components: {
            uniNavBar, listSingleShort
        },
        data() {
            return {
                title: '书城',
                list:[],
            }
        },
        onLoad(p) {
        },
        onShow() {
        },
        onReady() {
            this.getShopBookList()
        },
        methods: {
            getShopBookList() {
                this.get(`/api/book`, {}).then(d => {
                    console.log(d)
                    this.list=d.data
                }).catch(e => {
                    console.log(e)
                })
            }
        }
    }
</script>

<style lang="scss">
</style>
