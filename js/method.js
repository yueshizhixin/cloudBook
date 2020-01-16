import api from './api'
import conf from './conf'

const method = {

    //缓存数据 默认同步
    getData(item, sync = true) {
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
            uni.setStorageSync(item.key, item.data)
        } else { //异步
            uni.setStorage(item)
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
    navToSign() {
        method.navTo(`/view/user/signIn`)
    },
    //页面回退
    navBack() {
        let pages = getCurrentPages();
        if (pages.length > 1) {
            //是登录页
            if (pages[pages.length - 1].route == `view/user/signIn`) {
                //是否登录
                if (method.getData({key: 'user'})) {
                    uni.navigateBack()
                } else {
                    method.navToIndex()
                }
            } else {
                uni.navigateBack()
            }
        } else {
            method.navToIndex()
        }
    },
    //权限检测
    authorCheck() {
        // let user = method.getData({key: 'user'})
        // if (!user || user.id == 0) {
        //     method.navToSign()
        // }
    },
    //是否登录
    authorIsign() {
        return true;
    },
    //登出
    signOut() {
        method.setData({
            key: 'user',
            data: null,
        })
    },

    showLoading() {
        uni.showLoading({
            title: '',
            mask: true
        });
    },
    hideLoading() {
        uni.hideLoading();
    },

    //公共请求
    async httpRequest(url, data, type) {
        let header= {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
        try {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: conf.api + url,
                    data: data,
                    header: header,
                    method: type,
                    // timeout:10000,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            let data = JSON.parse(res.data)
                            if (data.code === 401) {
                                console.log('httpRequest 401')
                                api.msg(`请登录`)
                                setTimeout(method.navToSign(),1000)
                            } else if (data.code === 403) {
                                console.log('httpRequest 403')
                                api.msg(`无权限`)
                                setTimeout(method.navToIndex, 500)
                            } else if (data.code === 500) {
                                console.log('httpRequest 500')
                                api.msg('网络连接错误')
                                setTimeout(method.navToIndex, 500)
                            } else if (data.code === 200) {
                                resolve(data)
                            }
                        } else {
                            console.log('httpRequest status<>200', res)
                            method.hideLoading()
                            api.msg('网络请求失败了')
                        }
                    },
                    fail: (e) => {
                        console.log('httpRequest fail', e)
                        reject({
                            code: 200,
                            ok: 0,
                            msg: '请求失败啦',
                        })
                    }
                });
            })
        } catch (e) {
            console.log('httpRequest error catch', e)
            return {
                code: 200,
                ok: 0,
                msg: '请求失败',
            }
        }
    },

    /**
     * http请求
     */
    GET(url, data = {}) {
        return method.httpRequest(url, data, 'GET')
    },
    POST(url, data = {}) {
        return method.httpRequest(url, data, 'POST')
    },
    PUT(url, data = {}) {
        return method.httpRequest(url, data, 'PUT')
    },
    DELETE(url, data = {}) {
        return method.httpRequest(url, data, 'DELETE')
    }
    /**
     * end
     */
};

const util = {
    install: (Vue) => {
        Vue.prototype.navTo = method.navTo
        Vue.prototype.navBack = method.navBack
        Vue.prototype.navToIndex = method.navToIndex
        Vue.prototype.GET = method.GET
        Vue.prototype.POST = method.POST
        Vue.prototype.PUT = method.PUT
        Vue.prototype.DELETE = method.DELETE

        Vue.prototype.authorCheck = method.authorCheck
        Vue.prototype.authorIsign = method.authorIsign
        Vue.prototype.signOut = method.signOut

        Vue.prototype.getData = method.getData
        Vue.prototype.setData = method.setData

        Vue.prototype.showLoading = method.showLoading
        Vue.prototype.hideLoading = method.hideLoading

    }
};

export default {
    util,
}