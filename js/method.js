import api from './api'
import conf from './conf'

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
                if (method.getDate({key: 'user'})) {
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
        let user = method.getDate({key: 'user'})
        if (!user || user.id == 0) {
            method.navToSign()
        }
    },
    //登出
    signOut() {
        method.setData({
            key: 'user',
            data: null,
        })
    },

    //公共请求
    async httpRequest(url, data, type, header) {
        try {
            return new Promise((resolve, reject) => {
                uni.request({
                    url: conf.api + url,
                    data: data,
                    header: header,
                    method: type,
                    success: (res) => {
                        if (res.statusCode === 200) {
                            let data = JSON.parse(res.data)
                            if (data.code === 401) {
                                console.log('httpRequest 401')
                                method.navToSign()
                            } else if (data.code === 403) {
                                console.log('httpRequest 403')
                                api.msg(`无权限`)
                                setTimeout(method.navToIndex(), 500)
                            } else if (data.code === 500) {
                                console.log('httpRequest 500')
                                api.msg('网络连接错误')
                                setTimeout(method.navToIndex(), 500)
                            } else if (data.code === 200) {
                                resolve(data)
                            }
                        } else {
                            console.log('httpRequest status<>200', res)
                            api.msg('请求失败')
                        }
                    },
                    error: (e) => {
                        console.log('httpRequest error', e)
                        reject({
                            code: 200,
                            ok: 0,
                            msg: '请求失败',
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
    get(url, data = {}, type, header = {
        "content-type": "application/x-www-form-urlencoded"
    }) {
        return method.httpRequest(url, data, 'GET', header)
    },
    post(url, data = {}, type, header = {
        "content-type": "application/x-www-form-urlencoded"
    }) {
        return method.httpRequest(url, data, 'POST', header)
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
        Vue.prototype.get = method.get
        Vue.prototype.post = method.post

        Vue.prototype.authorCheck = method.authorCheck
        Vue.prototype.signOut = method.signOut
        Vue.prototype.getDate = method.getDate
        Vue.prototype.setData = method.setData


    }
};

export default {
    util,
}