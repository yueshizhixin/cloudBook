<template>
    <view>

        <!--一个系列-->
        <view>
            <view style="vertical-align: bottom;height: 54upx;">
                <view style="display: inline;color: #333;">
                    精选推荐
                </view>
                <view @tap="navTo(`no`)" style="display: inline;float: right;color: #555;font-size: 26upx;padding-top: 14upx;">
                    更多
                    <view class="cuIcon-right" style="display: inline;"></view>
                </view>
            </view>
            <view v-for="(item,index) of list" :key="index" @tap="gotoItem(item)"
                  style="padding:20upx 0 0 0;position: relative;border-bottom: solid rgba(0, 0, 0, 0.05) 2upx;">

                <image src="http://cdn.yueshizhixin.top/cloudbook/book/image/ren_dao_zhi_zun.jpg?imageView2/1/w/200/h/300"
                       alt="" mode="widthFix"
                       style="border-radius: 4upx;width: 100upx;padding-bottom: 10upx"
                ></image>
                <view style="position: absolute;top:20upx;left:120upx;font-size: 30upx;color: #333;">
                    <view>
                        书名
                    </view>
                    <view style="color: #777;font-size: 24upx;">
                        作者·标签·字数
                    </view>
                    <view style="color: #555;font-size: 24upx;">
                        一句话描述一句话描述一句话描述一句话描述一句话描述一句话描述
                    </view>
                </view>

            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "list-single-short",
        props: {
            list: {
                type: Array,
                default: () => {
                    return [{},{},{}];
                }
            }
        },
        methods: {
            gotoItem(item) {
                this.navTo(`/view/book/detail`)
            }
        }
    }
</script>

<style lang="scss">

</style>