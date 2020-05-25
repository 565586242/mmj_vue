<template>
	<div class="user">
		<div class="user_top" :style="(user_level == 3 || user_level ==2)?{'padding-top':'1.266666rem','height':'4rem'}:{'padding-top':'0.466666rem','height':'3.4rem'}">
			<div class="change_model" @click="chageModel()" v-if="user_level == 3 || user_level == 2">{{modelText}}</div>
			<router-link class="user_top_next" to="/userDetail">
				<img :src="userInfo.user_head" alt />
				<div>
					<h5>{{userInfo.user_name}}</h5>
					<p>{{userInfo.user_phone}}</p>
				</div>
			</router-link>
			<div class="my-ticket" v-show="modelIndex == 1">
				<router-link to="/userCoupon">
					<p>体验券</p>
					<p>{{userInfo.user_coupon || 0}}</p>
				</router-link>
				<router-link to="/balance">
					<p>当前余额</p>
					<p>{{userInfo.user_gold || 0}}</p>
				</router-link>
				<router-link to="/lineupgoods">
					<p>排队商品</p>
					<p>{{userInfo.queue_goods || 0}}</p>
				</router-link>
			</div>
		</div>
		<div class="my-order-title" style="margin-top: 1.066666rem;" v-show="modelIndex == 1">
			<p style="color: #282828;font-size: 0.373333rem;">体验订单</p>
			<p @click="$router.push({path: '/experienceOrder'})">查看全部订单></p>
		</div>
		<div class="mine-table" v-show="modelIndex == 1">
			<router-link to="/experienceOrder?type=1">
				<img src="../../assets/user/my_icon_dfk@2x.png" alt="">
				<p>待付款</p>
				<span v-if="userInfo.ex_wait_pay">{{userInfo.ex_wait_pay}}</span>
			</router-link>
			<router-link to="/experienceOrder?type=2">
				<img src="../../assets/user/my_icon_dfh@2x.png" alt="">
				<p>待发货</p>
				<span v-if="userInfo.ex_wait_send">{{userInfo.ex_wait_send}}</span>
			</router-link>
			<router-link to="/experienceOrder?type=3">
				<img src="../../assets/user/my_icon_dsh@2x.png" alt="">
				<p>待收货</p>
				<span v-if="userInfo.ex_wait_receive">{{userInfo.ex_wait_receive}}</span>
			</router-link>
			<router-link to="/experienceOrder?type=4">
				<img src="../../assets/user/my_icon_dpj@2x.png" alt="">
				<p>已完成</p>
				<span v-if="userInfo.ex_finish">{{userInfo.ex_finish}}</span>
			</router-link>
		</div>
		<div class="my-order-title" v-show="modelIndex == 1">
			<p style="color: #282828;font-size: 0.373333rem;">批发订单</p>
			<p @click="$router.push({path: '/wholesaleOrder'})">查看全部订单></p>
		</div>
		<div class="mine-table" v-show="modelIndex == 1">
			<router-link to="/wholesaleOrder?type=1">
				<img src="../../assets/user/my_icon_dfk@2x.png" alt="">
				<p>待付款</p>
				<span v-if="userInfo.w_wait_pay">{{userInfo.w_wait_pay}}</span>
			</router-link>
			<router-link to="/wholesaleOrder?type=2">
				<img src="../../assets/user/my_icon_yfk@2x.png" alt="">
				<p>已付款</p>
				<span v-if="userInfo.w_pay">{{userInfo.w_pay}}</span>
			</router-link>
			<router-link to="/wholesaleOrder?type=3">
				<img src="../../assets/user/my_icon_ycs@2x.png" alt="">
				<p>已出售</p>
				<span v-if="userInfo.w_sell">{{userInfo.w_sell}}</span>
			</router-link>
			<router-link to="/wholesaleOrder?type=4">
				<img src="../../assets/user/my_icon_dsh@2x.png" alt="">
				<p>待收货</p>
				<span v-if="userInfo.w_wait_receive">{{userInfo.w_wait_receive}}</span>
			</router-link>
		</div>
		<div class="user_nav" v-show="modelIndex == 1">
			<h5>更多服务</h5>
			<ul>
				<li>
					<router-link to="/address">
						<img src="../../assets/icon/my_icon_shouhuodizhi@2x.png" alt />
						<p>收货地址</p>
					</router-link>
				</li>
				<li>
					<router-link to="/team">
						<img src="../../assets/icon/my_icon_mytuandui@2x.png" alt />
						<p>我的好友</p>
					</router-link>
				</li>
				<li>
					<router-link to="/bankCard">
						<img src="../../assets/icon/my_icon_yinhangk@2x.png" alt />
						<p>我的银行卡</p>
					</router-link>
				</li>
				<li>
					<router-link to="/inviteFriends">
						<img src="../../assets/icon/my_icon_yaoqinghaoyou@2x.png" alt />
						<p>邀请好友</p>
					</router-link>
				</li>
				<li>
					<router-link to="/changePhone">
						<img src="../../assets/icon/my_icon_xiugaishoujihao@2x.png" alt />
						<p>修改手机</p>
					</router-link>
				</li>
				<li>
					<router-link to="/changePwd">
						<img src="../../assets/icon/my_icon_xiugaimima@2x.png" alt />
						<p>修改密码</p>
					</router-link>
				</li>
				<li>
					<router-link to="/contactUs">
						<img src="../../assets/icon/my_icon_lianxikefu@2x.png" alt />
						<p>联系客服</p>
					</router-link>
				</li>
				<li>
					<a href="javascript:void(0);" @click="changeCode()">
						<img src="../../assets/icon/my_icon_tuichu@2x.png" alt />
						<p>退出登录</p>
					</a>
				</li>
			</ul>
		</div>

		<!-- 商户模式 -->
		<div class="shop_model" v-show="modelIndex == 2">
			<router-link to="/totalAccount">
				<img src="../../assets/user/icon_kaihutj@2x.png" alt="">
				<p>开户统计</p>
				<img class="right" src="../../assets/icon/@2x.png" alt="">
			</router-link>
			<router-link to="/totalAllSales">
				<img src="../../assets/user/icon_xiaoshoutj@2x.png" alt="">
				<p>销售统计</p>
				<img class="right" src="../../assets/icon/@2x.png" alt="">
			</router-link>
			<router-link to="/partner" v-if="user_level == 3">
				<img src="../../assets/user/icon_tuiguang@2x.png" alt="">
				<p>推广合伙人</p>
				<img class="right" src="../../assets/icon/@2x.png" alt="">
			</router-link>
			<router-link to="/partnerConfig" v-if="user_level == 3">
				<img src="../../assets/user/icon_shezhi@2x.png" alt="">
				<p>合伙人设置</p>
				<img class="right" src="../../assets/icon/@2x.png" alt="">
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "user",
		data() {
			return {
				user_level: 1,  //合伙人  3城市合伙人 2推广合伙人  1关闭
				modelText: '切换商户模式',
				modelIndex: 1, //模式序号  1 普通模式  2商户模式
				userInfo: {} //个人信息
			};
		},
		methods: {
			//切换模式
			chageModel(){
				if(this.modelText == '切换商户模式'){
					localStorage.setItem('modelIndex',2);
					this.modelText = '切换普通模式';
					this.modelIndex = 2;
				}else{
					localStorage.setItem('modelIndex',1);
					this.modelText = '切换商户模式';
					this.modelIndex = 1;
				}
			},
			/* 退出账户 */
			changeCode() {
				var _this = this;
				mui.confirm('确认退出账户吗?', '退出提示', ['取消', '确认'], function(e) {
					if (e.index != 0) {
						mui.alert("退出成功", function() {
							localStorage.clear();
							_this.$router.push({
								path: "/"
							});
						});
					}
				}, 'div')
			},
			/* 账户信息 */
			user_init() {
				var _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/homemine", {
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "get", //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							localStorage.setItem("user_info", JSON.stringify(data.data));
							localStorage.setItem("is_modify", data.data.is_modify);
							_this.userInfo = data.data;
							_this.user_level = data.data.user_level;
						}
					}
				});
			}
		},
		mounted() {
			if (this.hasWxCallBack) {
				var modelIndex = localStorage.getItem('modelIndex');
				if(modelIndex){
					this.modelIndex = modelIndex;
					this.modelText = modelIndex == 1?'切换商户模式':'切换普通模式';
				}
				this.user_init();
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
					var modelIndex = localStorage.getItem('modelIndex');
					if(modelIndex){
						this.modelIndex = modelIndex;
						this.modelText = modelIndex == 1?'切换商户模式':'切换普通模式';
					}
					this.user_init();
				}
			}
		}
	};
</script>

<style scoped>
	.user_top {
		position: relative;
		box-sizing: border-box;
		width: 10rem;
		height: 4rem;
		padding: 1.266666rem 0.346666rem 0;
		background: no-repeat url(../../assets/my_bg@2x.png) center/cover;
	}
	.change_model{
		position: absolute;
		top: 0.266666rem;
		left: 0;
		right: 0;
		width: 4rem;
		height: 0.666666rem;
		margin: auto;
		background: no-repeat url(../../assets/user/img_moshi@2x.png) center/cover;
		text-align: center;
		color: #fff;
		line-height: 0.666666rem;
		font-size: 0.4rem;
	}
	.user_top_next {
		display: flex;
		align-items: center;
		width: 100%;
		height: 1.5rem;
		background: no-repeat url(../../assets/icon/my_icon_xiayiye@2x.png) right center/0.186666rem 0.32rem;
	}

	.user_top_next img {
		width: 1.333333rem;
		height: 1.333333rem;
		border-radius: 50%;
		margin-right: 0.4rem;
	}

	.user_top_next div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}

	.user_top_next h5 {
		line-height: 0.8rem;
		color: #fff;
		font-size: 0.48rem;
	}

	.user_top_next p {
		color: #fff;
		font-size: 0.346666rem;
	}

	.user_top_next span {
		font-size: 0.32rem;
	}

	.my-ticket {
		position: relative;
		top: 0.4rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 9.306666rem;
		height: 1.6rem;
		margin: auto;
		border-radius: 0.133333rem;
		background-color: #fff;
	}

	.my-ticket>a {
		width: 33.333333%;
		text-align: center;
	}

	.my-ticket>a p:first-child {
		color: #282828;
		font-size: 0.373333rem;
	}

	.my-ticket>a p:last-child {
		color: #e60012;
		font-size: 0.373333rem;
	}

	.my-order-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		height: 1.066666rem;
		padding: 0 0.333333rem;
		background-color: #fff;
		border-bottom: 1px solid #f6f6f6;
		margin-top: 0.133333rem;
	}

	.my-order-title p {
		color: #7C7C7C;
		font-size: 0.24rem;
	}

	.mine-table {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 1.933333rem;
		background-color: #fff;
	}

	.mine-table a {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
		height: 100%;
	}

	.mine-table a img {
		height: 0.693333rem;
	}

	.mine-table a p {
		color: #4C4C4C;
		font-size: 0.32rem;
	}

	.mine-table span {
		position: absolute;
		top: 0.2rem;
		right: .7rem;
		width: 0.4rem;
		height: 0.4rem;
		background-color: #e60012;
		border-radius: 50%;
		line-height: 0.4rem;
		color: #fff;
		text-align: center;
		font-size: .32rem;
	}

	.user_nav {
		margin-top: 0.133333rem;
		background: #fff;
	}

	.user_nav h5 {
		box-sizing: border-box;
		height: 1.066666rem;
		border-bottom: 1px solid #eee;
		line-height: 1.066666rem;
		font-size: 0.373333rem;
		color: #282828;
		font-weight: bold;
		padding-left: 0.346666rem;
	}

	.user_nav ul {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-around;
		height: 4.8rem;
	}

	.user_nav ul li {
		width: 25%;
		height: 2.4rem;
		text-align: center;
	}

	.user_nav ul li a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.user_nav ul li img {
		height: 0.8rem;
	}

	.user_nav ul li p {
		color: #333;
		font-size: 0.35rem;
		margin-top: 0.15rem;
	}
	/* 商户模式 */
	.shop_model a{
		display: block;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 1.066666rem;
		padding: 0 0.346666rem;
		background-color: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	.shop_model a img{
		width: 0.426666rem;
		height: auto;
		margin-right: 0.266666rem;
	}
	.shop_model a p{
		flex: 1;
		color: #282828;
		font-size: 0.373333rem;
	}
	.shop_model a img.right{
		width: 0.186666rem;
		height: 0.2rem;
		margin: 0;
	}
</style>
