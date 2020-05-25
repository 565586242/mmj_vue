<template>
	<div class="confirm_order">
		<div class="change_password_box">
			<!-- 暂无地址 -->
			<div class="no_address" v-show="no_address">
				<a href="javascript:;" @click="chooseAddress()">暂无地址，快去添加吧！</a>
			</div>
			<!-- 用户地址 -->
			<div class="express_box" v-show="!no_address">
				<a href="javascript:;" @click="chooseAddress()">
					<div class="address_list">
						<div class="address_list_left">
							<h5>
								{{address.user_name}}
								<span>{{address.user_phone}}</span>
							</h5>
							<p>{{address.addressPinS}}</p>
						</div>
						<div class="address_list_right">
							<img src="../../assets/icon/@2x.png" alt />
						</div>
					</div>
				</a>
			</div>
			<!-- 商品详情 -->
			<div class="order_main_box">
				<div class="order_main">
					<div class="order_shop">
						<div class="order_shop_img">
							<img :src="listData.goods_image|hostImg" alt />
						</div>
						<div class="order_shop_text">
							<h6>{{listData.goods_name}}</h6>
							<h4>
								<span></span>
							</h4>
							<p>
								<i>￥</i>
								{{listData.goods_price}}
							</p>
						</div>
					</div>
				</div>
				<div class="order_text">
					<p>
						<b>商品规格</b>
						<span>{{listData.goods_specifications}}</span>
					</p>
          <p>
            <b>购买数量</b>
            <span>X{{listData.goods_number}}</span>
          </p>
          <p>
            <b>可用券数</b>
            <span>{{$route.query.user_coupon}}</span>
          </p>
          <p>
            <b>使用券数</b>
            <span>{{$route.query.coupon}}</span>
          </p>
				</div>
				<div class="order_moner">
					<p>
						<b>共{{listData.goods_number}}件</b>
						<span>小计：</span>
						<i>￥{{listData.goods_number*listData.goods_price}}</i>
					</p>
				</div>
			</div>
			<div class="confir_bottom">
				共{{listData.goods_number}}件,
				<span>合计</span>
				<b>￥{{listData.goods_number * listData.goods_price}}</b>
				<input type="button" value="提交订单" @click="isblock = true" />
			</div>
		</div>
		<!-- 确认付款弹窗 -->
		<div class="confirm_pay_tan" v-show="isblock">
			<div class="confirm_pay">
				<h3>
					确认付款
					<img src="../../assets/icon/icon_guanbi@2x.png" alt @click="isblock = false" />
				</h3>
				<h2>
					<span>￥</span>
					{{listData.goods_number * listData.goods_price}}
				</h2>
				<h5>付款方式</h5>
				<p @click="selectSortActive = 2" :class="selectSortActive==2?'active':''">
					<img src="../../assets/icon/img_yue02@2x.png" alt />
					账户余额(剩余:￥{{user_gold}})
				</p>
				<p @click="selectSortActive = 1" :class="selectSortActive==1?'active':''">
					<img src="../../assets/icon/img_weixin@2x.png" alt />
					微信支付
				</p>
				<p @click="selectSortActive = 3" :class="selectSortActive==3?'active':''">
					<img src="../../assets/icon/yinlian.png" alt />
					银联支付
				</p>
				<input type="button" value="立即付款" @click="payNow()" />
			</div>
		</div>
		<!-- 支付密码 -->
		<section class="pay-mask" v-show="payshow">
			<div class="pay_password">
				<div class="container">
					<div class="pay_title">
						请输入支付密码
						<img src="../../assets/icon/icon_guanbi@2x.png" alt @click="payshow = false" />
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
		name: "confirm_order",
		data() {
			return {
				listData: [], //商品信息
				index: -1, //密码输入的第几位
				isblock: false, //确认付款弹窗
				user_gold: '', //账户余额
				selectSortActive: 2, //支付方式  1微信  2余额  3银联
				payshow: false, //密码弹窗是否显示
				no_address: false, //无地址
				address: {} //地址信息
			};
		},
		methods: {
			/* 确认订单信息 */
			exconfirmOrder() {
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/exconfirmOrder", {
					data: {
						sku_id: this.$route.query.goodsId,
						number: this.$route.query.buyNumber
					},
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "get", //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.listData = data.data.list;
							_this.user_gold = data.data.user_gold;
							/* 无地址 */
							if (data.data.address == undefined) {
								_this.no_address = true;
							} else {
								_this.no_address = false;
								if (localStorage.getItem('chooseAddress')) {
									var chooseAddress = JSON.parse(localStorage.getItem('chooseAddress'));
									_this.address = chooseAddress;
									_this.address.addressPinS = '';
									for (var i = 0; i < chooseAddress.user_address.length; i++) {
										_this.address.addressPinS += chooseAddress.user_address[i];
									}
									_this.address.addressPinS += chooseAddress.street;
									localStorage.removeItem('chooseAddress');
								} else {
									_this.address = data.data.address;
									_this.address.addressPinS = data.data.addressPinS;
								}
							}
						}
					}
				});
			},
			/* 选择地址 */
			chooseAddress() {
				localStorage.setItem('wholesaleOrderData', JSON.stringify({
					goodsId: this.$route.query.goodsId,
					buyNumber: this.$route.query.buyNumber
				}))
				this.$router.push({
					path: '/address'
				});
			},
			/* 立即付款 */
			payNow(){
				this.payshow = true;
				this.index = -1;
				$(".ipt_pay input").val('');
			},
			//点击数字键盘
			btnpassword(text) {
				var payinput = $(".ipt_pay input");
				if (this.index < 5) {
					this.index++;
					$(payinput[this.index]).val(text);
				}
				if (this.index == 5) {
					var pay_pwd = "";
					var payinput = $(".ipt_pay input");
					for (var i = 0; i < payinput.length; i++) {
						pay_pwd += $(payinput[i]).val();
					}
					//这就是密码输入完
					this.whsubmitorder(pay_pwd);
				}
			},
			/* 支付 */
			whsubmitorder(pwd){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/whsubmitorder", {
					data: {
						sku_id: this.$route.query.goodsId,
						number: this.$route.query.buyNumber,
						address_id: this.address.id,
						pay_password: pwd || '',
						type: this.selectSortActive
					},
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "post", //HTTP请求类型
					success: function(data) {
						_this.index = -1;
						$(".ipt_pay input").val('');
						if (data.code == 200) {
							if (data.data.type == 1) {
								_this.addres(data.data.res);
							} else if(data.data.type == 3){
								window.location.href = data.data.url;
							} else {
								mui.alert(data.msg, '', function() {
									_this.$router.push({
										path: '/'
									});
								})
							}
						} else {
							mui.alert(data.msg);
						}
					}
				});
			},
			//点击删除支付密码
			btndelete() {
				var payinput = $(".ipt_pay input");
				if (this.index >= 0) {
					$(payinput[this.index]).val("");
					this.index--;
				}
			},
			/* 微信支付公用方法*/
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
								path: "/"
							});
						});
					} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						//取消支付
					} else {
						//支付失败
						mui.alert("支付失败");
					}
				});
			}
		},
		created() {
			if (this.hasWxCallBack) {
				this.exconfirmOrder();
				localStorage.removeItem('wholesaleOrderData');
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
					this.exconfirmOrder();
					localStorage.removeItem('wholesaleOrderData');
				}
			}
		}
	};
</script>

<style scoped>
	@import url("../../style/css/goods-confirm.css");
</style>
