<template>
    <view class="page-comm tabber-page">
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search tabbar-icon-size" @tap="navTo(`no`)"></view>
        </uni-nav-bar>

        <view class="container">
            <list-single-short :list="list"></list-single-short>
        </view>

        <uni-load-more :status="loadingStatus"></uni-load-more>
    </view>
</template>

<script>
    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingleShort from "@/component/book/list-single-short"
    import UniLoadMore from "@/component/comm/uni-load-more"

    export default {
        components: {
            uniNavBar, listSingleShort,UniLoadMore,
        },
        data() {
            return {
                title: '书城',
                list:[],
                page: {
                    limit: 10,
                    offset: 1,
                    loading: 0,//正在加载中 默认否
                    loaded: 0,//至少加载过一次 默认否
                    loadable: 1,//能否进行加载操作 默认是
                }
            }
        },
        computed: {
            loadingStatus() {
                let page = this.page
                if (page.loadable === 1 && page.loading === 1) {
                    return `loading`
                }
                if (page.loadable === 1 && page.loading === 0) {
                    return `more`
                }
                if (page.loadable === 0) {
                    return `noMore`;
                }
                return ``
            },
            isEmpty() {
                let page=this.page
                return page.loaded === 1 && page.loadable === 0;
            }
        },
        onLoad(p) {
        },
        onShow() {
        },
        onReady() {
            this.getShopBookList()
        },
        onPullDownRefresh() {
            this.pageInit()
            this.getShopBookList()
        },
        onReachBottom() {
            this.getShopBookList()
        },
        methods: {
            pageInit() {
                this.page={
                    limit: 10,
                    offset: 1,
                    loading: 0,//正在加载中 默认否
                    loaded: 0,//至少加载过一次 默认否
                    loadable: 1,//能否进行加载操作 默认是
                }
                this.list=[]
            },
            getShopBookList() {
                if (this.page.loadable === 0) {
                    uni.stopPullDownRefresh();
                    return;
                }
                if (this.page.loading === 1) {
                    uni.stopPullDownRefresh();
                    return;
                }
                this.page.loading=1
                this.GET(`/api/v1/book/shop`, this.page).then(d => {
                    console.log(d)
                    uni.stopPullDownRefresh();
                    this.page.loading=0
                    if (d.code !== 200 || d.ok === 0) {
                        this.$api.msg(d.msg);
                        return;
                    }
                    d.data.forEach(x=>{
                        x.bookImage=x.bookImageVertical
                        if(x.tag){
                            let tags=x.tag.split(',')
                            let tag=tags.join(`·`)
                            x.tag=tag.substring(1,tag.length-1)
                        }
                    });
                    this.list.push(...d.data)

                    if(d.data.length<this.page.limit){
                        this.page.loadable=0
                    }
                    this.page.offset++
                    this.page.loaded=1
                }).catch(e => {
                    this.$api.msg(e.msg || `操作失败`)
                    console.log(e)
                    this.page.loading=0
                    uni.stopPullDownRefresh();
                })
            }
        }
    }
</script>

<style lang="scss">
</style>
