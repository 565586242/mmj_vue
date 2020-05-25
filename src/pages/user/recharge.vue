<template>
	<div class="recharge">
		<div class="recharge_box">
			<h5>充值金额</h5>
			<input type="text" id v-model="money" placeholder="请输入充值金额" class="recharge_money" />
			<h5>选择充值方式</h5>
			<div class="recharge_mode">
				<p @click="radioClick(1)">
					<span class="cp_radio" :class="checkedValue == 1?'cp_radio_active':''"></span>微信
				</p>
				<p @click="radioClick(2)">
					<span class="cp_radio" :class="checkedValue == 2?'cp_radio_active':''"></span>银联
				</p>
			</div>
			<button class="sign_out" @click="recharge()">充&nbsp;值</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "recharge",
		data() {
			return {
				money: "",
				check: false,
				checkedValue: 1, //1微信  2银联
			};
		},
		methods: {
			radioClick(type){
				this.checkedValue = type;
			},
			recharge() {
				if (this.money == "") {
					mui.toast("请输入充值金额!");
				} else {
					let _this = this;
					let token = localStorage.getItem("token");
					//意见反馈
					mui.ajax(config.host + "/recharge", {
						data: {
							amount: _this.money,
							type: _this.checkedValue
						},
						dataType: "json", //服务器返回json格式数据
						headers: {
							token: token
						},
						type: "post", //HTTP请求类型
						success: function(data) {
							if (data.code == 200) {
								if (data.data.type == 1) {
									_this.addres(data.data.res);
								} else if (data.data.type == 2) {
									window.location.href = data.data.url;
								}
							}
						},
						error(data){
							console.log(data)
						}
					});
				}
			},
			addres(data) {
				var _this = this;
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener(
							"WeixinJSBridgeReady",
							_this.onBridgeReady,
							false
						);
					} else if (document.attachEvent) {
						document.attachEvent("WeixinJSBridgeReady", _this.onBridgeReady);
						document.attachEvent("onWeixinJSBridgeReady", _this.onBridgeReady);
					}
				} else {
					_this.onBridgeReady(data);
				}
			},
			onBridgeReady(data) {
				var _this = this;
				WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						//支付成功
						mui.alert("支付成功", "", function() {
							_this.$router.push({
								path: "/user"
							});
						});
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						//取消支付
					} else {
						//支付失败
						mui.alert("支付失败", "", function() {
							_this.$router.push({
								path: "/user"
							});
						});
					}
				});
			}
		}
	};
</script>

<style scoped>
	.recharge_box {
		margin: 1.8rem 0.6rem 0;
	}

	.recharge_box h5 {
		font-size: 0.38rem;
		color: #333;
		margin-bottom: 0.2rem;
	}

	.recharge_money {
		border-radius: 5px;
		color: #333;
	}

	.sign_out {
		display: block;
		width: 7rem;
		height: 1.1rem;
		background: #e60012;
		color: #fff;
		margin: 2rem auto;
		border-radius: 5px;
		font-size: 0.5rem;
		border: none;
	}

	.recharge_mode {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		height: .4rem;
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
	}

	.recharge_mode p {
		flex: 1;
		-webkit-flex: 1;
		display: flex;
		align-items: center;
		font-size: 0.38rem;
		color: #333;
	}
</style>
