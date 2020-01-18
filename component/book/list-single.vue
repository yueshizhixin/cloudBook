<template>
    <view>
        <view v-for="(item,index) of list" :key="index" @tap="gotoItem(item)" class="book2">
            <image :src="item.bookImage" alt="" mode="widthFix" class="book-image"></image>
            <view class="desc">
                <view class="desc-container">
                    <image :src="item.bookAuthorImage" mode="widthFix" class="author-img"></image>
                    <view class="title">
                        <view>
                            {{item.bookName}}
                        </view>

                        <view class="updateTime">
                            {{item.updateTime.substring(0,16)}}
                        </view>
                    </view>
                    <view class="author-name">
                        <view class="author-name2">
                            {{item.bookAuthor}}
                        </view>
                        <view class="time">
                            {{item.readDuration}}分钟 {{getReadPercent(item)}}已读
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
            //阅读百分比
            getReadPercent(item) {
                if (item.bookChapterCount <= 0) {
                    return 0;
                }
                return (Number(item.chapterNo/item.bookChapterCount)*100).toFixed(1)+'%'
            },

            gotoItem(item) {
                this.navTo(`/view/book/item?id=${item.id}`)
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
                    width: 100upx;height: 100upx;border: solid 4upx white;border-radius: 50%;
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

    .book2{
        padding-top: 30upx;
        padding-bottom: 150upx;
        position: relative;
        .book-image{
            border-radius: 14upx;
            width: 690upx;
        }
        border-bottom: 2upx solid #ebebeb;

        .desc{
            position: absolute;
            bottom: 30upx;
            color:#333;
            width: 100%;
            font-size: 30upx;
            .desc-container{
                padding:0 0upx 0upx 0upx;
                .author-img{
                    width: 100upx;height: 100upx;border-radius: 50%;
                    float: left;margin-top: -6upx;
                    /*border: solid 4upx white;*/
                }
                .title{
                    font-size: 40upx;
                    margin-bottom: 4upx;
                    margin-left: 128upx;
                    color:#333;
                    .updateTime{
                        float: right;font-size: 22upx;margin-top: -30upx;color:#888;
                    }
                }

                .author-name{
                    color: #555;
                    display: inline;
                    vertical-align: bottom;
                    margin-left: 20upx;
                    .author-name2{
                        display: inline;
                    }
                    .time{
                        display: inline;font-size: 22upx;float: right;padding-top: 10upx;
                        color:#888;
                    }
                }
            }
        }
    }
</style>