<template>
	<div class="banks">
		<!-- 暂无地址 -->
		<div :class="bank_list.length?'hide_bank':'no_address'">
			<img src="../../assets/icon/icon_zanwuyinhangka@2x.png" alt="">
		</div>
		<!-- 银行卡列表 -->
		<div class="banks-content">
			<div class="address_list_box" v-for="(bank,index) in bank_list" :key="index">
				<div class="address_list">
					<div class="address_list_left">
						<img src="../../assets/icon/img_zhonghang@2x.png" alt="">
						<h5>{{bank.card_name}}</h5>
						<p>{{bank.id_card}}</p>
					</div>
					<div class="address_list_right">
						<router-link :to="{path:'/editBankCard',query:{ id:bank.id}}"><img src="../../assets/icon/icon_xougai02@2x.png" alt="">修改</router-link>
						<p @click="shanchu(index,bank.id)"><img src="../../assets/icon/icon_delete02@2x.png" alt="">删除</p>
					</div>
				</div>
			</div>
		</div>
		<router-link class="addBankCard" to="/addBankCard">添加银行卡</router-link>
	</div>
</template>

<script>
	export default {
		name: 'banks',
		data() {
			return {
				bank_list: [],
			}
		},
		created() {
			this.showBankCard();			
		},
		methods: {
			showBankCard() {
				let _this = this;
				let token = localStorage.getItem('token');
				mui.ajax(config.host + '/showBankCard', {
					headers: {
						token: token
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'get', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.bank_list = data.data;							
						} else {
							_this.bank_list = [];
						}
					}
				});
			},
			shanchu(index,id) {	
				let _this = this;
				let token = localStorage.getItem('token');
				mui.ajax(config.host+'/delBankCard ',{
					data:{
						id:id
					},
					headers:{
						token:token,
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:function(data){
						if (data.code == 200) {
							mui.alert(data.msg);
							_this.bank_list.splice(index, 1);
						} else{
							mui.alert(data.msg);
						}
					}
				});
			},
		}
	}
</script>


<style scoped>
	.hide_bank{
		display: none;
	}
	.banks{
		overflow: hidden;
		width: 100%;
		height: 100vh;
	}
	.banks-content{
		overflow: scroll;
		box-sizing: border-box;
		height: 100%;
		border-bottom: 3rem solid transparent;
	}
	.addBankCard {
		position: fixed;
		bottom: 1rem;
		right: 0;
		left: 0;
		z-index: 99999999;
		width: 6rem;
		height: 1rem;
		border: 1px solid #e60012;
		border-radius: 0.133333rem;
		background-color: #fff;
		margin: auto;
		line-height: 1rem;
		text-align: center;
		color: #e60012;
	}

	.no_address {
		padding-top: 4rem;
		text-align: center;
	}
	
	.no_address img{
		width: 3.2rem;
		height: 2.213333rem;
	}

	.address_list_box {
		margin: .2rem .3rem;
	}

	.address_list {
		display: flex;
		display: -webkit-flex;
		padding: .4rem .2rem;
		border-radius: 5px;
		box-shadow: 1px 1px 2px 1px #eee;
		margin-bottom: .3rem;
		background-image: linear-gradient(to right,rgb(243,91,104),rgb(230,0,18));
	}

	.address_list_left {
		position: relative;
		flex: 4;
		-webkit-flex: 4;
		padding-left: 1.5rem;
		border-right: 1px solid #F1F1F1;
		padding-right: .2rem;
	}
	
	.address_list_left img{
		position: absolute;
		left: 0;
		top: 50%;
		width: 1.28rem;
		height: 0.906666rem;
		margin-top: -0.453333rem;
	}

	.address_list_left h5 {
		font-size: .4rem;
		color: #fff;
		margin-top: .2rem;
	}

	.address_list_left p {
		font-size: .36rem;
		color: #fff;
		margin-top: .4rem;
	}

	.add_mr {
		background: #F1F1F1;
		color: red;
		margin-right: .1rem;
	}

	.address_list_right {
		flex: 1;
		-webkit-flex: 1;
		text-align: center;
		width: 2rem;
		min-width: 2rem;
		max-width: 2rem;
	}

	.address_list_right img {
		height: .35rem;
		vertical-align: text-top;
		margin-right: .12rem;
	}

	.address_list_right a {
		display: block;
		font-size: .34rem;
		color: #fff;
		margin-bottom: .5rem;
	}

	.address_list_right p {
		font-size: .34rem;
		color: #fff;
	}
</style>
