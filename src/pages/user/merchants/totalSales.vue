<template>
	<div class="body">
		<div class="person_table">
			<router-link class="person_list" :to="{path: '/salesDetail',query: {whichDay:$route.query.whichDay,user_id:myInfo.id}}">
				<p class="person_flex person_name">
					<span>{{myInfo.user_name}}</span>
					<span>销售额：</span>
					<span>{{myInfo.allmoney || '0.00'}}</span>
				</p>
				<p class="person_flex person_tel">
					<span>{{myInfo.user_phone}}</span>
					<span>佣金：</span>
					<span>{{myInfo.rate_money || '0.00'}}</span>
				</p>
			</router-link>
			<router-link v-show="myGenUserInfo.length > 0" class="person_list" :to="{path: '/salesDetail',query: {whichDay:$route.query.whichDay,user_id:item.id}}" v-for="item in myGenUserInfo" :key="item.id">
				<p class="person_flex person_name">
					<span>{{item.user_name}}</span>
					<span>销售额：</span>
					<span>{{item.allmoney || '0.00'}}</span>
				</p>
				<p class="person_flex person_tel">
					<span>{{item.user_phone}}</span>
					<span>佣金：</span>
					<span>{{item.rate_money || '0.00'}}</span>
				</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'totalSales',
		data(){
			return {
				myGenUserInfo: [],
				myInfo: {}
			}
		},
		methods:{
			tradeStatisticsOne(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/tradeStatisticsOne',{
					headers: {
					  token: token
					},
					data:{
						whichDay: this.$route.query.whichDay
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:function(data){
						if(data.code == 200){
							_this.myGenUserInfo = data.data.myGenUserInfo;
							_this.myInfo = data.data.user;
						}else{
							mui.toast(data.msg);
						}
					}
				});
			}
		},
		created(){
			if (this.hasWxCallBack) {
				this.tradeStatisticsOne();
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
		      this.tradeStatisticsOne();
		    }
		  }
		}
	}
</script>

<style scoped>
	.body{
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}
	.person_list {
		display: block;
		box-sizing: border-box;
		width: 9.306666rem;
		height: 1.466666rem;
		padding: 0.066666rem 0;
		margin: auto;
		background-color: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.person_flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 0.666666rem;
	}
	
	.person_flex span {
		display: inline-block;
		width: 1.8rem;
		color: #282828;
		font-size: 0.266666rem;
		text-align: right;
	}
	
	.person_name span:first-child {
		flex: 1;
		text-align: left;
		font-size: 0.373333rem;
	}
	
	.person_tel span:first-child {
		flex: 1;
		text-align: left;
		font-size: 0.373333rem;
		color: #ACACAC;
	}
</style>
