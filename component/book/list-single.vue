<template>
    <view>
        <view v-for="(item,index) of 5" :key="index" @tap="gotoItem(item)"
              style="padding-bottom: 50upx;position: relative;">

            <image src="http://cdn.yueshizhixin.top/cloudbook/book/image/ren_dao_zhi_zun.jpg?imageView2/1/w/600/h/600"
                   alt="" mode="widthFix"
                   style="border-radius: 14upx;"
            ></image>
            <view style="position: absolute;bottom: 60upx;color:white;width: 100%;font-size: 30upx;">

                <view style="padding:0 30upx 40upx 30upx;">
                    <image src="http://cdn.yueshizhixin.top/cloudbook/book/author/headImage/zhai_zhu.jpg?imageView2/1/w/300/h/300"
                           mode="widthFix"
                           style="width: 100upx;height: 100upx;border: solid 4upx white;border-radius: 20upx;
                        float: left;margin-top: -6upx;"
                    ></image>
                    <view style="font-size: 40upx;margin-bottom: 4upx;margin-left: 128upx;">
                        从前有座灵剑山
                    </view>
                    <view style="display: inline;vertical-align: bottom;margin-left: 20upx;">
                        <view style="display: inline;">
                            国王陛下
                        </view>
                        <view style="display: inline;font-size: 22upx;float: right;padding-top: 10upx">
                            123分钟 22.1%已读
                        </view>
                    </view>
                </view>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        name: "list-single",
        props: {
            list: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        methods: {
            gotoItem(item) {
                this.navTo(`/view/book/item`)
            }
        }
    }
</script>

<style lang="scss">

</style>