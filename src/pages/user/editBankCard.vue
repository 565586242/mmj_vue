<template>
	<div class="modify_bank">
		<!-- 银行卡信息 -->
		<div class="tjadd_box">
			<p><span>持卡人姓名</span><input type="text" v-model="name" placeholder="请输入持卡人姓名"></p>
			<p><span>手机号</span><input type="text" v-model="phone" placeholder="请输入持卡人手机号" oninput="value=value.replace(/[^\d]/g,'')"></p>
			<p><span>身份证号</span><input type="text" v-model="IdNumber" placeholder="请输入身份证号" readonly></p>
			<p><span>开户银行</span><input type="text" v-model="bank" placeholder="请填写详细的开户行信息"></p>
			<p><span>银行卡号</span><input type="text" v-model="card_num" placeholder="请输入银行卡号"></p>
		</div>
		<button class="sign_out" @click="preservation()">保存修改</button>
	</div>
</template>

<script>
	export default {
		name: 'modify_bank',
		data() {
			return {
				name: '',
				phone: '',
				IdNumber: '',  //身份证号
				bank: '',
				card_num: '',
				id: null
			}
		},
		created() {
			this.id = this.$route.query.id;
			this.changed(this.id);
		},
		methods: {
			changed() {
				let _this = this;
				let token = localStorage.getItem('token');
				mui.ajax(config.host + '/editShow', {
					headers: {
						token: token
					},
					data: {
						id: this.id
					},
					dataType: 'json', //服务器返回json格式数据            		
					type: 'post', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.name = data.data.user_name;
							_this.phone = data.data.user_phone;
							_this.bank = data.data.card_name;
							_this.card_num = data.data.id_card;
							_this.IdNumber = data.data.id_number;
						} else {
							mui.alert(data.msg);
						}
					}
				});
			},
			preservation() {
				let _this = this;
				let token = localStorage.getItem('token');
				mui.ajax(config.host + '/editBankCard', {
					headers: {
						token: token
					},
					data: {
						id: this.id,
						name: _this.name,
						phone: _this.phone,
						bank: _this.bank,
						card_num: _this.card_num,
						IdNumber: _this.IdNumber
					},
					dataType: 'json', //服务器返回json格式数据            		
					type: 'post', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							mui.alert(data.msg, function() {
								_this.$router.push({
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
