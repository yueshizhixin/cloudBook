<template>
    <view>
        <view v-for="(item,index) of list" :key="index" @tap="gotoItem(item)" class="book">

            <image src="http://cdn.yueshizhixin.top/cloudbook/book/image/ren_dao_zhi_zun.jpg?imageView2/1/w/600/h/600"
                   alt="" mode="widthFix" class="book-image"

            ></image>
            <view class="desc">
                <view class="desc-container">
                    <image src="http://cdn.yueshizhixin.top/cloudbook/book/author/headImage/zhai_zhu.jpg?imageView2/1/w/300/h/300"
                           mode="widthFix" class="author-img"></image>
                    <view class="title">
                        从前有座灵剑山
                    </view>
                    <view class="author-name">
                        <view class="author-name2">
                            国王陛下
                        </view>
                        <view class="time">
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
                    return [{},{},{}];
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
    .book{
        padding-bottom: 50upx;position: relative;
        .book-image{
            border-radius: 14upx;
        }

        .desc{
            position: absolute;bottom: 60upx;color:white;width: 100%;font-size: 30upx;
            .desc-container{
                padding:0 30upx 40upx 30upx;
                .author-img{
                    width: 100upx;height: 100upx;border: solid 4upx white;border-radius: 20upx;
                    float: left;margin-top: -6upx;
                }
                .title{
                    font-size: 40upx;margin-bottom: 4upx;margin-left: 128upx;
                }

                .author-name{
                    display: inline;vertical-align: bottom;margin-left: 20upx;
                    .author-name2{
                        display: inline;
                    }
                    .time{
                        display: inline;font-size: 22upx;float: right;padding-top: 10upx
                    }
                }
            }
        }
    }
</style>