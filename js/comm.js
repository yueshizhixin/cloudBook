import api from './method'

const method = {

    //缓存数据 默认同步
    getDate(item, sync = true) {
        if (!item.key) return null;
        if (sync) { //同步
            return uni.getStorageSync(item.key)
        } else { //异步
            return uni.getStorage(item)
        }
    },
    //缓存数据 默认同步
    setData(item, sync = true) {
        if (!item.key || !item.data) return null;
        if (sync) { //同步
            return uni.setStorageSync(item.key, item.data)
        } else { //异步
            return uni.setStorage(item)
        }
    },
    //页面跳转
    navTo(url) {
        if (url == 'no') {
            api.msg('该功能开发中')
            return;
        }
        if (url.indexOf('/pages') === 0) {
            uni.switchTab({
                url: url
            })
        } else {
            uni.navigateTo({
                url: url
            })
        }
    },
    //跳转首页
    navToIndex() {
        method.navTo(`/pages/index/index`)
    },
    //页面回退
    navBack() {
        let pages = getCurrentPages();
        if (pages.length > 1) {
            //是登录页
            if(pages[pages.length-1].route==`view/user/signIn`){
                method.navToIndex()
            }else{
                uni.navigateBack()
            }
        } else {
            method.navToIndex()
        }
    },
    //权限检测
    authorCheck() {
        let user = method.getDate({key: 'user'})
        console.log('user',user)
        if (!user || user.id == 0) {
            method.navTo(`/view/user/signIn`)
        }
    }
};

const util = {
    install: (Vue) => {
        Vue.prototype.navTo = method.navTo
        Vue.prototype.navBack = method.navBack
        Vue.prototype.navToIndex = method.navToIndex

        Vue.prototype.authorCheck = method.authorCheck

    }
};

export default {
    util,
}