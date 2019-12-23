<template>
	<view :style="{'background-color': currentThemeColor.backgroundColor}" class="ss-setbar">
		<view class="brightness-section">
			<view :style="{'color': currentThemeColor.color}" class="iconfont iconan"></view>
			<block v-if="!isNightTheme">
				<slider activeColor="#000" block-size="20" block-color="#000" backgroundColor="#f0f0f0" class="brightness-slider" v-model="brightValue" @change="sliderChange" step="10" />
			</block>
			<block v-else>
				<slider activeColor="#808080" block-color="#808080" block-size="20" backgroundColor="gray" class="brightness-slider" v-model="brightValue" @change="sliderChange" step="10" />
			</block>
			<view :style="{'color': currentThemeColor.color}" class="iconfont iconming"></view>
		</view>
		<view :style="{'background-color': currentThemeColor.borderColor}" class="line"></view>
		<view class="font-section">
			<view class="font-title-section">
				<text :style="{'color': currentThemeColor.color}">字号</text>
			</view>
			<view class="font-tool-section">
				<button :style="{'color': currentThemeColor.color}" @click="modifySizeAction('reduce')" class="reduce-btn" type="primary">A-</button>
				<text :style="{'color': currentThemeColor.color}" class="font-size">{{fontSize}}</text>
				<button :style="{'color': currentThemeColor.color}" @click="modifySizeAction('add')" class="add-btn" type="primary">A+</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ss-setbar',
		props: {
			isNightTheme: {
				type: Boolean,
				default () {
					return false;
				}
			}
			
		},
		data () {
			return {
				fontSize: 17,
				minFontSize: 14, // 可以设置的最小字体字号
				maxFontSize: 20, // 可以设置的最字体字号
				brightValue: 50,
				dayThemeColor: {
					backgroundColor: '#fff',
					color: '#333',
					borderColor: '#f0f0f0'
				},
				nightThemeColor: {
					backgroundColor: '#333',
					color: '#808080',
					borderColor: '#808080'
				}
			}
		},
		computed: {
			currentThemeColor: function () {
				return this.isNightTheme ? this.nightThemeColor : this.dayThemeColor;
			}
		},
		methods: {
			modifySizeAction (action) {
				switch (action){
					case 'reduce':
						if (this.fontSize <= this.minFontSize) {
							uni.showToast({
								title: '已是最小字体',
								icon: 'none'
							})
							return;
						}
						this.fontSize -= 1;
						break;
					case 'add':
						if (this.fontSize >= this.maxFontSize) {
							uni.showToast({
								title: '已是最大字体',
								icon: 'none'
							})
							return;
						}
						this.fontSize += 1;
						break;
				}
			},
			sliderChange (e) {
				let value = e.detail.value;
				this.$emit('brightChange', value);
			}
		},
		watch: {
			fontSize () {
				console.log('观察字体大小:' + this.fontSize);
				this.$emit('fontSizeChange', this.fontSize);
			}
		}
	}
</script>

<style lang="scss">
	%font-css {
		font-size: $uni-font-size-lg;
		color: #000;
		background-color: transparent;
	}
	
	.ss-setbar {
		height: 100%;
		
		.line {
			margin: 0 30upx;
			height: 1px;
		}
		
		.brightness-section {
			height: calc(50% - 1px);
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			
			.brightness-slider {
				flex: 1;
			}
		}
		
		.font-section {
			height: 50%;
			display: flex;
			
			.font-title-section {
				width: 50%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 30upx;
			}
			
			.font-tool-section {
				width: 50%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				
				.reduce-btn {
					@extend %font-css;
				}
				
				.add-btn {
					@extend %font-css;
				}
				
				.font-size {
					@extend %font-css;
				}
			}
		}
	}
</style>
