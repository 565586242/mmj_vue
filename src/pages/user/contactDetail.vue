<template>
	<div class="content">
		<p class="payment-title">问题类型:{{serviceData.type?'订单问题':'其他问题'}}</p>
		<div class="list">
			<div class="list-top">
				<p></p>
				<p>{{serviceData.add_time}}</p>
			</div>
			<div class="list-content">{{serviceData.content}}</div>
		</div>
		<p class="payment-title" style="margin-top: 0.8rem;">处理结果</p>
		<div class="list">
			<div class="list-top">
				<p>回复:</p>
				<p>{{serviceData.back_time}}</p>
			</div>
			<div class="list-content">{{serviceData.reply}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'adviceDetail',
		data(){
			return {
				serviceData: {}
			}
		},
		methods: {
			getAdviceDetail(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/serviceInfo',{
					data:{
						id: this.$route.query.id
					},
					headers: {
					  token: token
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:function(data){
						if (data.code == 200) {
							_this.serviceData = data.data;
						} else {
							mui.alert(data.msg);
						}
					}
				});
			}
		},
		created() {
			if (this.hasWxCallBack) {
				this.getAdviceDetail();
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
					this.getAdviceDetail();
				}
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 9.306666rem;
		margin: 0.266666rem auto 1.6rem;
	}
	
	.list {
		box-sizing: border-box;
		min-height: 2.866666rem;
		border-radius: 0.133333rem;
		box-shadow: 0 0 0.08rem 0 rgba(0, 0, 0, .15);
		padding: 0.133333rem 0.266666rem;
		font-size: 0.293333rem;
		color: #4C4C4C;
		line-height: 0.4rem;
	}
	
	.list-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 0.8rem;
	}
	
	.list-top>p:first-child {
		font-size: 0.373333rem;
		color: #282828;
	}
	
	.list-top>p:last-child {
		font-size: 0.34rem;
		color: #ACACAC;
	}
	
	.list-content {
		text-indent: 0.533333rem;
	}
</style>
