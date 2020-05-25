<template>
	<div class="addto_bank">
		<!-- 银行卡信息 -->
		<div class="tjadd_box">
			<p><span>持卡人姓名</span><input type="text" v-model="user" placeholder="请输入持卡人姓名"></p>
			<p><span>手机号</span><input type="text" v-model="phone" placeholder="请输入持卡人手机号" oninput="value=value.replace(/[^\d]/g,'')"></p>
			<p><span>身份证号</span><input type="text" v-model="IdNumber" placeholder="请输入身份证号"></p>
			<p><span>开户银行</span><input type="text" v-model="bank" placeholder="请填写详细的开户行信息"></p>
			<p><span>银行卡号</span><input type="text" v-model="bank_num" placeholder="请输入银行卡号"></p>
		</div>
		<button class="sign_out" @click="baocun()">保存银行卡</button>
	</div>
</template>

<script>
	export default {
		name: 'addto_bank',
		data() {
			return {
				user: '',
				phone: '',
				bank: '',
				bank_num: '',
				IdNumber: ''  //身份证号
			}
		},
		methods: {
			baocun() {
				let _this = this;
				let token = localStorage.getItem('token');
				//添加银行卡
				mui.ajax(config.host + '/addBankCard', {
					data: {
						name: _this.user,
						phone: _this.phone,
						bank: _this.bank,
						cardNum: _this.bank_num,
						IdNumber: _this.IdNumber
					},
					headers: {
						token: token
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							mui.alert(data.msg, function() {
								_this.$router.replace({
									path: '/bankCard'
								})
							});
						} else {
							mui.alert(data.msg);
						}
					}
				});
			}
		}

	}
</script>


<style scoped>
	.tjadd_box {
		background: #fff;
		margin-top: .2rem;
		padding: 0 .2rem;
	}

	.sign_out {
		display: block;
		width: 7rem;
		height: 1.1rem;
		background: #e60012;
		color: #fff;
		margin: 1rem auto;
		border-radius: 5px;
		font-size: .5rem;
		border: none;
	}

	.tjadd_box p {
		display: flex;
		display: -webkit-flex;
		border-bottom: 1px solid #F1F1F1;
	}

	.tjadd_box p span {
		flex: 1;
		-webkit-flex: 1;
		width: 2.5rem;
		max-width: 2.5rem;
		min-width: 2.5rem;
		font-size: .38rem;
		color: #333;
		height: 1.2rem;
		line-height: 1.2rem;
	}

	.tjadd_box p input {
		flex: 5;
		-webkit-flex: 5;
		border: none;
		margin: 0;
		padding: 0;
		height: 1.2rem;
		color: #333;
		font-size: .38rem;
		background: none;
	}
</style>
