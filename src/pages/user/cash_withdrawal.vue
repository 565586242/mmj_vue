<template>
	<div class="cash_withdrawal">
		<div class="recharge_box">
			<h5>提现金额</h5>
			<input type="text" id @input="Serviced" v-model="amount" placeholder="请输入提现金额" class="recharge_money"/>
			<h5>选择提现银行卡</h5>
			<div class="recharge_mode">
				<div @click="bankIndex = (index+1)" v-for="(item,index) in bankInfo" :key="item.id">
					<div>
						<span class="cp_radio" :class="bankIndex == (index+1)?'cp_radio_active':''"></span>{{item.card_name}}
						<div style="text-indent: .5rem;">银行卡号:{{item.id_card}}</div>
					</div>
				</div>
			</div>
			<!-- <h5>选择提现方式</h5>
			<div class="recharge_mode">
				<div @click="radioClick(1)">
					<span class="cp_radio" :class="checkedValue == 1?'cp_radio_active':''"></span>微信
				</div>
				<div @click="radioClick(3)">
					<span class="cp_radio" :class="checkedValue == 3?'cp_radio_active':''"></span>银联
				</div>
			</div> -->
			<h5>提现手续费</h5>
			<p>
				￥
				<span v-text="Service"></span>
			</p>
			<button class="sign_out" @click="submission()">提&nbsp;现</button>
		</div>
		<!-- 支付密码 -->
		<section class="pay-mask" v-show="payshow">
			<div class="pay_password" style="position: fixed;">
				<div class="container">
					<div class="pay_title">
						请输入支付密码
						<img src="../../assets/icon/icon_guanbi@2x.png" alt @click="close_mask" />
					</div>
					<div class="flex f-d-r pay_content">
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
					</div>
					<router-link to="/changePwd">忘记密码？</router-link>
				</div>
				<footer>
					<ul class="pay_btn">
						<li @click="btnpassword('1')">1</li>
						<li @click="btnpassword('2')">2</li>
						<li @click="btnpassword('3')">3</li>
						<li @click="btnpassword('4')">4</li>
						<li @click="btnpassword('5')">5</li>
						<li @click="btnpassword('6')">6</li>
						<li @click="btnpassword('7')">7</li>
						<li @click="btnpassword('8')">8</li>
						<li @click="btnpassword('9')">9</li>
						<li class="b9"></li>
						<li @click="btnpassword('0')">0</li>
						<li class="b9" @click="btndelete">
							<img src="../../assets/icon/delete.png" alt />
						</li>
						<div class="mui-clearfix"></div>
					</ul>
				</footer>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "cash_withdrawal",
		data() {
			return {
				amount: "", //提现金额
				pay_password: "", //支付密码
				Service: 0, //提现手续费
				checkedValue: 3, //	提现类型 1微信 2余额 3银行卡
				exchangeRate: 0, //提现利率
				payshow: false, //是否显示支付弹窗
				index: -1, //输入个数
				bankInfo: [],  //银行卡信息
				bankIndex: 1  //选择的银行卡信息
			}
		},
		methods: {
			radioClick(type){
				this.checkedValue = type;
			},
			btnpassword(text) {
				var payinput = $(".ipt_pay input");
				if (this.index < 5) {
					this.index++;
					$(payinput[this.index]).val(text);
				}
				if (this.index == 5) {
					var payinput = $(".ipt_pay input");
					for (var i = 0; i < payinput.length; i++) {
						this.pay_password += $(payinput[i]).val();
					}
					//提现请求
					this.golddowithdraw();
				}
			},
			Serviced() {
				this.Service = (this.amount * this.exchangeRate) / 100;
			},
			/* 提现 */
			golddowithdraw(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/golddowithdraw ", {
					data: {
						amount: _this.amount,
						pay_password: _this.pay_password,
						type: _this.checkedValue,
						poundage: _this.Service,
						type_name: _this.bankInfo[_this.bankIndex - 1].card_name,
						type_value: _this.bankInfo[_this.bankIndex - 1].id_card
					},
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "post", //HTTP请求类型
					success: function(data) {
						_this.close_mask();
						mui.alert(data.msg);
					}
				});
			},
			//利率请求
			goldwithdraw() {
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/goldwithdraw", {
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "get", //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.exchangeRate = data.data.poundage;
							_this.bankInfo = data.data.bankInfo;
							if(_this.bankInfo.length == 0){
								mui.alert('暂无提现的银行卡',function(){
									_this.$router.push({
										path: '/bankCard'
									})
								});
							}
						} else {
							mui.alert(data.msg);
						}
					}
				});
			},
			//提现
			submission() {
				if (this.amount == "") {
					mui.alert("请输入提现金额");
				} else {
					this.payshow = true;
				}
			},
			/* 关闭支付弹窗 */
			close_mask() {
				this.payshow = false;
				this.index = -1;
				this.pay_password = "";
				$(".ipt_pay input").val('');
			},
			//点击删除支付密码
			btndelete() {
				var payinput = $(".ipt_pay input");
				if (this.index >= 0) {
					$(payinput[this.index]).val("");
					this.index--;
				}
			}
		},
		created() {
			if (this.hasWxCallBack) {
				this.goldwithdraw();
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
					this.goldwithdraw();
				}
			}
		}
	};
</script>

<style scoped>
	.cash_withdrawal {
		margin-top: 1.8rem;
	}

	.recharge_box {
		margin: 0.5rem 0.6rem;
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

	.t_romm_ip[type="radio"] {
		position: relative;
		width: 20px;
		height: 1px;
		margin: 9px 0.05rem 0 0;
	}

	.t_romm_ip[type="radio"]::before,
	.t_romm_ip[type="radio"]::after {
		position: absolute;
		display: block;
		content: "";
		border-radius: 2px;
		transition: 0.3s all esae;
	}

	.t_romm_ip[type="radio"]::before {
		top: -14px;
		left: 0;
		width: 18px;
		height: 18px;
		background: url(../../assets/icon/btn_xuan_no@2x.png) no-repeat;
		background-size: 100% 100%;
	}

	.t_romm_ip[type="radio"]::after {
		top: -14px;
		left: 0px;
		width: 18px;
		height: 18px;
	}

	.t_romm_ip[type="radio"]:checked::before {
		border-color: 1px solid #fff;
	}

	.t_romm_ip[type="radio"]:checked::after {
		background: url(../../assets/icon/btn_xuan_yes@2x.png) no-repeat;
		background-size: 100% 100%;
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
		flex-direction: column;
		align-items: center;
		min-height: .4rem;
		margin-top: 0.4rem;
		margin-bottom: 0.4rem;
	}

	.recharge_mode > div {
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 0.38rem;
		color: #333;
	}

	.recharge_box p {
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #333;
		font-size: 0.38rem;
		background: #fff;
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.2);
	}

	.pay_password {
		background: #fff;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 70vh;
		border-radius: 5px 5px 0 0;
	}

	.ipt_pay {
		width: 100%;
		height: 1.2rem;
		border-left: 1px solid #acacac;
	}

	.ipt_pay input {
		border: 0;
		height: 100%;
		width: 100%;
		text-align: center;
		font-size: 0.88rem;
		background: #fff;
		margin: 0;
	}

	.container a {
		text-align: center;
		color: #e60012;
		display: block;
		width: 100%;
		font-size: 0.37rem;
	}

	.container {
		position: absolute;
		top: 0;
		background: #fff;
		border-radius: 5px;
		margin: 0;
		padding-bottom: 0.266667rem;
	}

	.pay_title {
		position: relative;
		font-size: 0.4rem;
		text-align: center;
		color: #282828;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: 1px solid #eee;
	}

	.pay_title img {
		position: absolute;
		right: 0.2rem;
		height: 0.6rem;
		top: 0.25rem;
	}

	.pay_content {
		border-bottom: 1px solid #acacac;
		border-top: 1px solid #acacac;
		border-right: 1px solid #acacac;
		margin: 0.4rem 0.3rem 0.2rem 0.3rem;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
	}

	.pay_btn {
		background: #acacac;
	}

	.pay_btn li {
		width: 31.3333%;
		float: left;
		height: 1.1rem;
		line-height: 1.1rem;
		text-align: center;
		background: #fff;
		font-size: 0.55rem;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		margin: 0.1rem 1%;
		border-radius: 5px;
		font-weight: normal;
		color: #000;
	}

	.pay_btn li:active {
		background: #c2c2c2;
	}

	.b9:active {
		background: #c2c2c2 !important;
		border: none !important;
	}

	.b9 {
		background: none !important;
		border: none !important;
	}

	.b9 img {
		height: 0.5rem;
		display: block;
		margin: 0.25rem auto;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-weight: 600;
	}
</style>
