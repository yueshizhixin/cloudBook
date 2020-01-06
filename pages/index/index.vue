<template>
	<view class="page-comm tabber-page">
        <uni-nav-bar :title="title">
            <view slot="right" class="cuIcon-search tabbar-icon-size" @tap="navTo(`no`)"></view>
        </uni-nav-bar>

        <view class="container">
            <list-single :list="list"></list-single>
        </view>

        <uni-load-more :status="loadingStatus"></uni-load-more>

    </view>
</template>

<script>

    import uniNavBar from "@/component/comm/uni-nav-bar/uni-nav-bar.vue"
    import listSingle from "@/component/book/list-single"
    import UniLoadMore from "@/component/comm/uni-load-more"

	export default {
        components: {
            uniNavBar,listSingle,UniLoadMore,
        },
		data() {
			return {
                title:'我的书架',
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
		onLoad() {

		},
        onShow() {
            let isNeedReload_page_index=this.getData({key:`isNeedReload_page_index`}) || 0
            console.log('isNeedReload_page_index',isNeedReload_page_index)
            if (isNeedReload_page_index && this.page.loaded) {
                console.log('需要重新加载')
                this.pageInit()
                this.getBookList()
                uni.setStorageSync(`isNeedReload_page_index`, 0)
            }
        },
        onReady() {
            this.getBookList()
        },
        onPullDownRefresh() {
            this.pageInit()
            this.getBookList()
        },
        onReachBottom() {
            this.getBookList()
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
            getBookList() {
                if (this.page.loadable === 0) {
                    uni.stopPullDownRefresh();
                    return;
                }
                if (this.page.loading === 1) {
                    uni.stopPullDownRefresh();
                    return;
                }
                this.page.loading=1
                this.GET(`/api/v1/book/shelf`, this.page).then(d => {
                    console.log(d)
                    d.data.forEach(x=>{
                        x.bookImage=x.bookImageAlign
                    })
                    this.list.push(...d.data)
                    this.setData({
                        key:'book_shelf',
                        data:this.list,
                    },false)

                    if(d.data.length<this.page.limit){
                        this.page.loadable=0
                    }
                    this.page.offset++
                    this.page.loading=0
                    this.page.loaded=1
                    uni.stopPullDownRefresh();
                }).catch(e => {
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
