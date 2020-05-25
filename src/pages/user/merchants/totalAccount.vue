<template>
	<div class="user">
		<div class="index_top">
			<div>
				<p>注册人数</p>
				<p>{{registerNum}}</p>
			</div>
			<div>
				<p>交易人数</p>
				<p>{{tradeNum}}</p>
			</div>
		</div>
		<div class="person_table">
			<router-link class="person_list" :to="{path:'/accountDetail',query: {id:myInfo.id}}">
				<p class="person_flex person_name">
					<span>{{myInfo.user_name}}</span>
					<span>注册人数：</span>
					<span>{{myInfo.register_num}}</span>
				</p>
				<p class="person_flex person_tel">
					<span>{{myInfo.user_phone}}</span>
					<span>成交人数：</span>
					<span>{{myInfo.buy_num}}</span>
				</p>
			</router-link>
			<router-link class="person_list" :to="{path:'/accountDetail',query: {id:item.id}}" v-for="item in userInfo" :key="item.id">
				<p class="person_flex person_name">
					<span>{{item.user_name}}</span>
					<span>注册人数：</span>
					<span>{{item.register_num}}</span>
				</p>
				<p class="person_flex person_tel">
					<span>{{item.user_phone}}</span>
					<span>成交人数：</span>
					<span>{{item.buy_num}}</span>
				</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'totalAccount',
		data(){
			return {
				registerNum: 0,  //注册人数
				tradeNum: 0, //交易人数
				myInfo: {},
				userInfo: {}
			}
		},
		methods:{
			openAccount(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/openAccount',{
					dataType:'json',//服务器返回json格式数据
					headers: {
					  token: token
					},
					type:'GET',//HTTP请求类型
					success:function(data){
						if(data.code == 200){
							_this.myInfo = data.data.myInfo;
							_this.registerNum = data.data.registerNum;
							_this.tradeNum = data.data.tradeNum;
							_this.userInfo = data.data.userInfo;
						}
					}
				});
			}
		},
		created() {
		  if (this.hasWxCallBack) {
		    this.openAccount();
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
		      this.openAccount();
		    }
		  }
		}
	}
</script>

<style scoped>
	.user {
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
		padding-top: 0.266666rem;
		background-color: #fff;
	}

	.index_top {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 9.306666rem;
		height: 2.666666rem;
		background: no-repeat url(../../../assets/my_bg@2x.png) center/cover;
		margin: auto;
		border-radius: 0.133333rem;
	}

	.index_top>div {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 50%;
		height: 1.333333rem;
		border-right: 1px solid rgba(255, 255, 255, .45);
	}

	.index_top>div p {
		color: #fff;
		font-size: 0.373333rem;
	}

	.index_top>div p:last-child {
		font-size: 0.48rem;
	}

	.index_top>div:last-child {
		border-right: none;
	}
	.person_table{
		margin-top: 0.266666rem;
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
