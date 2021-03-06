import api from './api'
import conf from './conf'

const method = {
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
    navToUser() {
        method.navTo(`/pages/user/index`)
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
                if (method.authCheck(false)) {
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
    authCheck(autoRedirect = true) {
        // let user = uni.getStorageSync(`user`)
        // if (!user || user.id == 0) {
        //     if (autoRedirect) {
        //         method.navToSign();
        //     } else {
        //         return false;
        //     }
        // }
        // return true;
        let jwt = uni.getStorageSync(`jwt`);
        if (!jwt) {
            if (autoRedirect) {
                method.navToSign();
            }
            return false;
        }
        return true;
    },
    //登出
    signOut() {
        uni.setStorageSync('user', null,)
        uni.setStorageSync('jwt', null,)

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
    async httpRequest(url, data, type, autoRedirect) {
        let jwt = uni.getStorageSync(`jwt`) || ``
        let header = {
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "authorization": jwt,
            "clientVersion":conf.clientVersion
        }
        let ar = autoRedirect
        if (!ar) {
            ar = {
                http401: true,
            }
        }
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
                                if (ar.http401) {
                                    api.msg(`请登录`)
                                    setTimeout(method.navToSign(), 1000)
                                } else {
                                    resolve({
                                        code: 401,
                                        ok: 1,
                                        msg: `请登录`
                                    })
                                }
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
    GET(url, data = {}, autoRedirect) {
        return method.httpRequest(url, data, 'GET', autoRedirect)
    },
    POST(url, data = {}, autoRedirect) {
        return method.httpRequest(url, data, 'POST', autoRedirect)
    },
    PUT(url, data = {}, autoRedirect) {
        return method.httpRequest(url, data, 'PUT', autoRedirect)
    },
    DELETE(url, data = {}, autoRedirect) {
        return method.httpRequest(url, data, 'DELETE', autoRedirect)
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
        Vue.prototype.navToUser = method.navToUser
        Vue.prototype.GET = method.GET
        Vue.prototype.POST = method.POST
        Vue.prototype.PUT = method.PUT
        Vue.prototype.DELETE = method.DELETE

        Vue.prototype.authCheck = method.authCheck
        Vue.prototype.signOut = method.signOut

        Vue.prototype.showLoading = method.showLoading
        Vue.prototype.hideLoading = method.hideLoading

    }
};

export default {
    util,
}