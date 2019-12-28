<template>
    <view>

        <!--一个系列-->
        <view class="series">
            <view class="bar">
                <view class="left">
                    精选推荐
                </view>
                <view @tap="navTo(`no`)" class="right">
                    更多
                    <view class="cuIcon-right" style="display: inline;"></view>
                </view>
            </view>
            <view v-for="(item,index) of list" :key="index" @tap="gotoItem(item)" class="item" >

                <image :src="item.bookImage"  alt="" mode="widthFix" class="img" ></image>
                <view class="text">
                    <view class="title">
                        {{item.name}}
                    </view>
                    <view class="tag" style="">
                        作者·标签·字数
                    </view>
                    <view class="desc" style="">
                        {{item.shortDescription}}
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
                    return [];
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
    .series{
        .bar{
            vertical-align: bottom;height: 54upx;
            .left{
                display: inline;color: #333;
                font-size:34upx ;
            }
            .right{
                display: inline;float: right;color: #555;font-size: 26upx;padding-top: 14upx;
            }
        }
        .item{
            padding:20upx 0 0 0;position: relative;border-bottom: solid rgba(0, 0, 0, 0.05) 2upx;
            .img{
                border-radius: 4upx;width: 100upx;padding-bottom: 10upx
            }
            .text{
                position: absolute;top:20upx;left:120upx;font-size: 30upx;color: #333;
                .title{

                }
                .tag{
                    color: #777;font-size: 24upx;
                }
                .desc{
                    color: #555;font-size: 24upx;
                }
            }
        }
    }
</style>