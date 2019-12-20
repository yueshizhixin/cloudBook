<template>
    <view>
        <view v-for="(item,index) of 5" :key="index" style="padding-bottom: 50upx;position: relative;">

            <image src="http://cdn.yueshizhixin.top/asset/head/59ff1851e7bce736a953bba2.jpg?imageView2/1/w/750/h/750" alt="" mode="widthFix"
                style="border-radius: 14upx;"
            ></image>
            <view style="position: absolute;bottom: 60upx;color:white;width: 100%;font-size: 30upx;">
                <view style="display: inline-block;padding:0 0 20upx 20upx;">
                    <view style="font-size: 40upx">
                        从前有座灵剑山
                    </view>
                    <view>
                        国王陛下
                    </view>
                </view>
                <view style="float: right; padding: 0 20upx 20upx 0;">
                    <view style="" class="cuIcon-search">
                        22.1% 已读
                    </view>
                    <view style="">
                        123 分钟
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
            list:{
                type:Array,
                default:()=>{
                    return [];
                }
            }
        },
    }
</script>

<style lang="scss">

</style>