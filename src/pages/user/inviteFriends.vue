<template>
	<div class="invite_index">
		<div class="body" v-show="!imgBase">
			<div class="invite_content">
				<p>扫描二维码</p>
				<div id="qrcode"></div>
				<p>赶快加入吧</p>
			</div>
			<p class="shareImg">长按分享图片！</p>
		</div>
		<img id="imageBg" v-show="imgBase">
	</div>
</template>
<script>
	import QRCode from 'qrcodejs2'
	import html2canvas from '../../../static/js/html2canvas.min.js'
	export default {
		name: 'inviteFriends',
		data() {
			return {
				invitation_link: '',
				imgBase: ''
			}
		},
		methods: {
			createQrcode() {
				let _this = this;
				new QRCode('qrcode', {
					text: _this.invitation_link,
					width: 120,
					height: 120,
					colorDark: "#000",
					colorLight: "#fff",
				})
				this.$nextTick(function(){
					_this.createImg()
				})
			},
			homeinvite(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/homeinvite',{
					dataType:'json',//服务器返回json格式数据
					type:'get',//HTTP请求类型
					headers: {
					  token: token
					},
					success:function(data){
						if(data.code == 200){
							_this.invitation_link = data.data.invitation_link;
							_this.$nextTick(function(){
								_this.createQrcode();
							})
						}
					}
				});
			},
			createImg(){
				var _this = this;
				var c_width = $('.invite_index').outerWidth();
				var c_height = $('.invite_index').outerHeight();
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				var devicePixelRatio = window.devicePixelRatio || 2;
				var backingStoreRatio = context.webkitBackingStorePixelRatio ||
				    context.mozBackingStorePixelRatio ||
				    context.msBackingStorePixelRatio ||
				    context.oBackingStorePixelRatio ||
				    context.backingStorePixelRatio || 1;
				var ratio = devicePixelRatio / backingStoreRatio;
				canvas.width = c_width * ratio;
				canvas.height = c_height * ratio;
				canvas.style.width = c_width + "px";
				canvas.style.height = c_height + "px";
				var transTop = $(document).scrollTop() - $('.invite_index').offset().top;
				context.scale(ratio, ratio);
				context.translate((c_width - $(window).width()) / 2, transTop);
				
				html2canvas($('.invite_index'), {
				    width: c_width,
				    height: c_height,
				    canvas: canvas,
				    onrendered: function (canvas) {
							var dataURL = canvas.toDataURL("image/png");
							$('#imageBg').attr('src', dataURL);
							_this.imgBase = dataURL;
				    }
				});
			}
		},
		mounted() {
			if (this.hasWxCallBack) {
				this.homeinvite();
			}
		},
		props: {
		  hasWxCallBack: {
		    type: Boolean,
		    default: false
		  }
		},
		watch: {
		  hasWxCallBack: function(val) {
		    if (val) {
					this.homeinvite();
		    }
		  }
		}
	}
</script>

<style scoped>
	.invite_index {
		width: 100%;
		height: 100vh;
		background-color: #FF7418;
	}

	.body {
		width: 10rem;
		height: 16.08rem;
		background: no-repeat url(../../assets/bg.png) center/contain;
	}

	.invite_content {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 8.533333rem;
		left: 0;
		right: 0;
		width: 8.08rem;
		height: 4.066666rem;
		margin: auto;
	}

	.invite_content p {
		width: 0.48rem;
		text-align: center;
		font-size: 0.373333rem;
		color: #282828;
		line-height: 0.4rem;
	}

	.invite_content>div {
		width: 120px;
		height: 120px;
		margin: 0 0.14rem;
	}
	
	#imageBg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}

	.shareImg{
		position: absolute;
		top: 13rem;
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: .48rem;
	}
</style>
