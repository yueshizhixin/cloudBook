<template>
	<view class="tabBlock">
		<scroll-view scroll-x="true" :scroll-left="scrollLeft" @scroll="scroll">
			<view class="tab" id="tab_list">
				<view v-for="(item, index) in list"
					  :key="index"
					  :class="['tab__item', {'tab__item--active': currentIndex === index}]"
					  :style="{color: (currentIndex === index ? `${itemColor}`: '')}"
					  id="tab_item"
					  @click="select(item, index)"
				>
					<view class="tab__item-title">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="tab__line" 
				  :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
			</view>
		</scroll-view>
	</view>
</template>

<script>
    import styleConf from '@/js/css'

    export default {
		props: {
			value: Number,
			list: { // 传值
				type: Array,
				default: ()=> {
					return []
				}
			},
			itemColor: {
			    type:String,
				default:styleConf.color_primary
			}, // tab主色调
			lineColor:  {
                type:String,
                default:styleConf.color_primary
            } // 下划线主色调
		},
		data() {
			return {
				currentIndex: 0,
				lineStyle: {},
				scrollLeft: 0,
				duration: 0.3
			}
		},
		watch: {
			value() {
				this.currentIndex = this.value
			}
		},
		mounted() {
			this.currentIndex = this.value
			this.setLine()
			this.scrollIntoView()
		},
		methods: {
			select(item, index) {
				this.currentIndex = index
				this.setLine()
				this.scrollIntoView()
				this.$emit('input', this.currentIndex)
			},
			setLine() {
				let lineWidth = 0, lineLeft = 0
				this.getElementData(`#tab_item`, (data)=> {
					let el = data[this.currentIndex]
					lineWidth = el.width / 2
					// lineLeft = el.width * (this.currentIndex + 0.5)
					lineLeft = el.width / 2 + (-data[0].left) + el.left
					this.lineStyle = {
						width: `${lineWidth}px`,
						transform: `translateX(${lineLeft}px) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			scrollIntoView() {  // item滚动
				let count = 0;
				let frames = 30;
				let lineLeft = 0;
				let self = this
				
				this.getElementData('#tab_list', (data)=> {
					let list = data[0]
					this.getElementData(`#tab_item`, (data)=> {
						let el = data[this.currentIndex]
						// lineLeft = el.width * (this.currentIndex + 0.5) - list.width / 2 - this.scrollLeft
						lineLeft = el.width / 2 + (-data[0].left) + el.left - list.width / 2 - this.scrollLeft
						animate();
					})
				})
				
				function animate() {
					self.scrollLeft += lineLeft / frames;
				    if (++count < frames) {
						setTimeout(animate, self.duration / frames);
					}
				}
			},
			getElementData(el, callback){
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			},
			scroll(e) {
				this.scrollLeft = e.detail.scrollLeft;
			}
		}
	}
</script>

<style lang="scss">
	.tabBlock {
		position: relative;
		background: #fff;
		.tab {
			position: relative;
			display: flex;
			font-size: 28rpx;
			padding-bottom: 15rpx;
			white-space: nowrap;
			&__item {
				flex: 1;
				text-align: center;
				line-height: 90rpx;
				color: $uni-text-color;
				&--active {
					color: $uni-color-primary;
				}
				&-title {
					margin: 0 40rpx;
				}
			}
		}
		.tab__line {
			display: block;
			height:6rpx;
			position: absolute;
			bottom: 15rpx;
			left: 0;
			z-index: 1;
			border-radius: 3rpx;
			position: relative;
			background: $uni-color-primary;
		}
	}
</style>
