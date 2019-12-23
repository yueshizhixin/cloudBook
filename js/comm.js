import api from './method'

const method = {
    navTo(url) {
        if(url=='no'){
            api.msg('该功能开发中')
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
    navBack() {
        let pages = getCurrentPages();
        if(pages.length>1){
            uni.navigateBack()
        }else{
            method.navTo(`/pages/index/index`)
        }
    }
}

const util = {
    install: (Vue) => {
        Vue.prototype.navTo = method.navTo
        Vue.prototype.navBack = method.navBack

    }
}

export default {
    util,
}