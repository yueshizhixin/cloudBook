const msg = (title) => {
    uni.showToast({
        title: title || `云之书欢迎你`,
        icon: `none`,
        duration: 1500,
        mask: false,
    });
}
const msg2 = (title) => {
    uni.showToast({
        title: `请按规则填写`+title,
        icon: `none`,
        duration: 1500,
        mask: false,
    });
}

const getTextLength = (text, size) => {
    if (!text) {
        return 0;
    }
    let textLength = 0;
    let l = 0;
    for (let j = 0; j < text.length; j++) {
        let t = text.substr(j, 1);
        if (/[\u4e00-\u9fa5]/.test(t)) {
            l += 1;
        } else {
            if (/[A-Za-z0-9]/.test(t)) {
                l += 0.75;
            } else {
                let c = text.charAt(j);
                if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
                {
                    l += 0.2;
                } else {
                    l += 1;
                }
            }
        }
    }
    textLength = l * size;
    return textLength
}

const getNumberFromStr=(str)=>{
    let reg = /[\d]/g;
    return str.match(reg).join("");
}

export default {
    msg, msg2,getTextLength,getNumberFromStr,
}