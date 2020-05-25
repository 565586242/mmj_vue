<template>
	<div class="shop_car">
		<div class="add_address" v-text="btnText" @click="showToggle"></div>
		<div class="change_password_box">
			<!-- 购物车列表 -->
			<div class="order_main_box" v-for="(cart,index) in cart_list" :key="index">
				<div class="order_main">
					<div class="order_shop">
						<div class="order_btn">
							<input type="checkbox" id="" class="t_romm_ip" :value="cart" v-model="check_goods">
						</div>
						<div class="order_shop_img">
							<img :src="cart.cover_image|staticPath" alt="">
						</div>
						<div class="order_shop_text">
							<h6>{{cart.goods_name}}</h6>
							<h4>
								<span v-for="(child_list,child_index) in cart.goods_sku" :key="child_index">{{child_list}}</span>
							</h4>
							<p><i>￥</i>{{cart.price|priceFilters}}
								<ul id="car">
									<li><button v-on:click="reduce(cart,cart.id)">-</button></li>
									<li><input type="text" value="0" size="1" v-model="cart.number"></li>
									<li><button v-on:click="add_num(cart,cart.id)">+</button></li>
								</ul>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="car_bottom">
				<ul>
					<li>
						<input type="checkbox" id="" class="t_romm_ip cart_btn" @click="check_all" :checked="check_goods.length == cart_list.length">全部
					</li>
					<li v-show="!isShow">
						<a :disabled="check_goods.length <= 0" @click="Settlement()">结算({{total_num}})</a>
						<span>合计:<b>￥{{total_price}}</b></span>
					</li>
					<li v-show="isShow">
						<button v-on:click="delete_num()">删&nbsp;除</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shop_car',
		data() {
			return {
				btnText: "管理",
				isShow: false,
				cart_list: [],
				check_goods: [], //已选择的商品
				cart_id:''
			}
		},
		computed: {
			//总价
			total_price() {
				let priced = 0
				this.check_goods.forEach(item => {
					//总价 = 价格 * 数量
					priced += Number(item.price) * Number(item.number)
				})
				return priced
			},
			//数量
			total_num() {
				let t_num = 0;
				this.check_goods.forEach(item => {
					t_num += Number(item.number);
				})
				return t_num
			},			
		},
		filters: {
			staticPath(path) {//图片过滤器
				return path = config.imgHost + path;
			},
			priceFilters(price) { //价格过滤器
				let priceArr = price.toString().split('.');
				let res = ''
				let resArr = [];
				for (var i = priceArr[0].length; i > 0; i -= 3) {
					if (i - 3 < 0) {
						var len = priceArr[0].length % 3;
						resArr.push(priceArr[0].substring(i - len, i))
					} else {
						resArr.push(priceArr[0].substring(i - 3, i));
					}
				}
				for (let i = resArr.length - 1; i >= 0; i--) {
					if (i == 0) {
						res += resArr[i];
					} else {
						res += resArr[i] + ',';
					}
				}
				if (priceArr.length != 1) {
					res += '.' + priceArr[1];
				}
				return res;
			}
		},
		methods: {
			//隐藏显示删除按钮
			showToggle: function() {
				this.isShow = !this.isShow
				if (this.isShow) {
					this.btnText = "完成"
				} else {
					this.btnText = "管理"
				}
			},
			//商品类减减
			reduce(cart) {
				if (cart.number <= 0) {
					cart.number = 0
				} else {
					cart.number--;
					let _this = this;
					let token = localStorage.getItem("token");
					mui.ajax(config.host + '/goodscartnumber', {
						data:{
							cart_id:cart.id,
							type:2
						},
						dataType: 'json', //服务器返回json格式数据
						headers: {
          token: token
        }, 
						type: 'post', //HTTP请求类型
						success: function(data) {
							if (data.code == 200) {							
								
							} else {
								mui.alert(data.msg);
							}
						}
					});			
				}
			},
			//商品累加
			add_num(cart,cart_id) {
				cart.number++;				
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/goodscartnumber', {
					data:{
						cart_id:cart.id,
						type:1
					},
					dataType: 'json', //服务器返回json格式数据
					headers: {
          token: token
        },
					type: 'post', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {							
							
						} else {
							mui.alert(data.msg);
						}
					}
				});				
			},
			//删除选中商品
			delete_num(cart) {
				let remove_list = [];
				for (var i = 0; i < this.check_goods.length; i++) {
					for (var j = 0; j < this.cart_list.length; j++) {
						if (this.check_goods[i].id == this.cart_list[j].id) {
							remove_list.push(this.check_goods[i].id);
						}
					}
				}
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/goodscartdel', {
					data:{
						cart_ids:remove_list
					},
					dataType: 'json', //服务器返回json格式数据
					headers: {
          token: token
        },
					type: 'post', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {							
							for (var i = 0; i < _this.check_goods.length; i++) {
								for (var j = 0; j < _this.cart_list.length; j++) {
									if (_this.check_goods[i].id == _this.cart_list[j].id) {
										_this.cart_list.splice(j, 1);
									}
								}
							};
							mui.alert(data.msg);
						} else {
							mui.alert(data.msg);
						}
					}
				});
				
			},
			//全选
			check_all() {
				if (this.check_goods.length > 0) {
					this.check_goods = []
				} else {
					this.cart_list.forEach(item => {
						this.check_goods.push(item)
					})
				}
			},
			shopcar() {
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/goodscart', {
					dataType: 'json', //服务器返回json格式数据
					headers: {
          token: token
        },
					type: 'get', //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.cart_list = data.data;
							for (let i = 0; i < _this.cart_list.length; i++) {
								_this.cartd_id = _this.cart_list[i].id;
							}							
						} else {
							mui.alert(data.msg);
						}
					}
				});
			},
			//结算跳转订单
			Settlement(){				
				if (this.check_goods.length<=0) {
					mui.alert("请选择结算的订单")
				} else{
					let remove_list = '';
					for (var i = 0; i < this.check_goods.length; i++) {
						for (var j = 0; j < this.cart_list.length; j++) {
							if (this.check_goods[i].id == this.cart_list[j].id) {							
								remove_list += this.check_goods[i].id + ',';							
							}
						}
					}
					this.$router.push({
            path:'/confirm_order',
            query:{
              type:2,
              cart_ids:remove_list
            }
          })
				}
				
			}
		},
  created() {
    if (this.hasWxCallBack) {
      this.shopcar();			
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
        this.shopcar();			
      }
    }
  }
	}
</script>

<style scoped>
	.order_btn {
		flex: .5;
		-webkit-flex: .5;
		text-align: center;
	}

	.add_address {
		position: absolute;
		top: 0rem;
		right: .2rem;
		height: 44px;
		line-height: 44px;
		width: 1.2rem;
		z-index: 99;
		text-align: right;
		color: #e60012;
		font-size: .36rem;

	}

	.change_password_box {
		margin: 1.2rem .3rem 0;
		margin-bottom: 2rem;
	}

	.order_main_box {
		background: #fff;
		margin-top: .2rem;
		border-radius: 5px;
		box-shadow: 1px 1px 2px 1px #eee;
		padding-bottom: .1rem;
	}

	.order_shop {
		display: flex;
		display: -webkit-flex;
		padding: .2rem 0;
	}

	.order_shop_img {
		flex: 1;
		-webkit-flex: 1;
		width: 2.6rem;
		min-width: 2.6rem;
		max-width: 2.6rem;
		text-align: left;
	}

	.order_shop_img img {
		width: 2.3rem;
		height: 2.35rem;
	}

	.order_shop_text {
		flex: 3;
		-webkit-flex: 3;
	}

	.order_shop_text h6 {
		color: #333;
		font-size: .36rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: .5rem;
		padding-right: 0.1rem;
	}

	.order_shop_text h4 {
		height: .5rem;
		line-height: .5rem;
		font-size: .32rem;
		font-weight: normal;
		margin-top: .1rem;
	}

	.order_shop_text h4 span {
		display: inline-block;
		background: #F6F6F6;
		color: #ACACAC;
		font-size: .3rem;
		padding: 0 .15rem;
		border-radius: 3px;
		margin-right: .1rem;
		height: .5rem;
		line-height: .5rem;
	}

	.order_shop_text p {
		color: red;
		font-size: .36rem;
		padding-right: .2rem;
		margin-top: .32rem;
		position: relative;
		height: .55rem;
		line-height: .55rem;
	}

	#car {
		position: absolute;
		right: 0.2rem;
		top: 0;
	}

	#car li {
		float: left;
	}

	#car li button {
		padding: 0;
		border: 0;
		height: .55rem;
		width: .55rem;
		background: #F1F1F1;
		font-weight: 600;
		font-size: .38rem;
		color: #ACACAC;
	}

	#car li input {
		padding: 0;
		height: .55rem;
		margin: 0;
		background: #F1F1F1;
		font-weight: 600;
		font-size: .38rem;
		width: .6rem;
		text-align: center;
		border: none;
		margin: 0 1px;
		color: #333;
	}

	.order_shop_text p i {
		font-style: normal;
		font-size: .3rem;
	}

	.t_romm_ip[type=checkbox] {
		position: relative;
		width: .45rem;
		height: 1px;
		margin: 1.32rem 0 0 0;
	}

	.t_romm_ip[type=checkbox]::before,
	.t_romm_ip[type=checkbox]::after {
		position: absolute;
		display: block;
		content: '';
		border-radius: 2px;
		transition: .3s all esae;
	}

	.t_romm_ip[type=checkbox]::before {
		top: -0.3rem;
		left: 0;
		width: .45rem;
		height: .45rem;
		background: url(../../assets/icon/btn_xuan_no@2x.png)no-repeat;
		background-size: 100% 100%;
	}

	.t_romm_ip[type=checkbox]::after {
		top: -0.3rem;
		left: 0px;
		width: .45rem;
		height: .45rem;
	}

	.t_romm_ip[type=checkbox]:checked::before {
		border-color: 1px solid #fff;
	}

	.t_romm_ip[type=checkbox]:checked::after {
		background: url(../../assets/icon/btn_xuan_yes@2x.png)no-repeat;
		background-size: 100% 100%;
	}

	.car_bottom {
		position: fixed;
		width: 100%;
		height: 1.2rem;
		background: #ffffff;
		bottom: 0;
		left: 0;
	}

	.car_bottom ul {
		display: flex;
		display: -webkit-flex;
		height: 1.2rem;
		line-height: 1.2rem;
		padding: 0 .3rem;
	}

	.car_bottom ul li {
		flex: 1;
		-webkit-flex: 1;
		font-size: .38rem;
		color: #444;
	}

	.cart_btn {
		top: 0.65rem !important;
		margin-right: .1rem !important;
		float: left;
		margin-top: 0 !important;
	}

	.car_bottom ul li span {
		margin-left: .1rem;
		color: #333;
		font-size: .36rem;
	}

	.car_bottom ul li:nth-child(2) {
		text-align: right;
		flex: 2.5;
		-webkit-flex: 2.5;
	}

	.car_bottom ul li:nth-child(2) span {
		color: #000;
		float: right;
		margin-left: 0;
	}

	.car_bottom ul li:nth-child(2) span b {
		font-size: .38rem;
		color: red;
		font-weight: normal;
	}

	.car_bottom ul li:nth-child(2) a {
		display: block;
		float: right;
		height: .8rem;
		line-height: .8rem;
		text-align: center;
		width: 2.5rem;
		margin-top: 0.2rem;
		color: #fff;
		background: #e60012;
		font-size: .36rem;
		border-radius: 25px;
		margin-left: .2rem;
	}

	.car_bottom ul li:nth-child(3) {
		text-align: right;
	}

	.car_bottom ul li:nth-child(3) button {
		height: .8rem;
		line-height: .8rem;
		width: 2.5rem;
		padding: 0;
		text-align: center;
		margin-top: 0.2rem;
		color: #e60012;
		border: 1px solid #e60012;
		font-size: .38rem;
		border-radius: 25px;
	}
</style>
