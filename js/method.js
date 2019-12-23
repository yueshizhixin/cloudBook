const msg = (title) => {
    uni.showToast({
        title:title || `云之书欢迎你`,
        icon:`none`,
        duration:1500,
        mask:false,
    });
}

export default {
    msg
}