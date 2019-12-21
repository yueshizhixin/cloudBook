
const f=()=>{

}

const method={
    navTo(url){
        if(url.indexOf('/pages')===0){
            uni.switchTab({
                url: url
            })
        }else{
            uni.navigateTo({
                url: url
            })
        }
    }
}

const util={
    install:(Vue)=>{
        Vue.prototype.navTo = method.navTo
    }
}

export {
    util
}