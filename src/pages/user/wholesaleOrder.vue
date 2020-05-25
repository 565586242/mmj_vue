<template>
  <div class="shop_order">
    <div class="change_password_box">
      <ul class="tabs">
        <li
          class="li-tab"
          v-for="(item,index) in tabsParam"
          :key="index"
          @click="toggleTabs(index)"
          :class="{active:index==noworder}"
        >
          <span>{{item}}</span>
        </li>
      </ul>
			<div class="loading" v-if="loading">
				<span></span>
				<span>加载中. . .</span>
			</div>
      <!-- 暂无明细 -->
      <div :class="!not_shop_order?'has_team':'no_team'">
        <img src="../../assets/icon/icon_zanwumingxi@2x.png" alt />
      </div>
      <!-- 全部 -->
      <div class="divTab">
        <div class="order_main_box" v-for="(item,index) in shop_order" :key="index">
          <div class="order_main">
            <h5>
              订单号：{{item.order_number}}
              <span>{{item.status}}</span>
            </h5>
            <router-link :to="{path:'/wholesaleOrderDetail',query:{ id:item.id}}">
              <div class="order_shop">
                <div class="order_shop_img">
                  <img :src="item.cover_img|hostImg" alt />
                </div>
                <div class="order_shop_text">
                  <h6>{{item.goods_name}}</h6>
                  <p><i>￥</i>{{item.price}}<span>X{{item.number}}</span></p>
                </div>
              </div>
            </router-link>
          </div>
          <div class="order_moner">
            <p>
              <button
                style="position: absolute;margin-left: -2.2rem;"
                v-show="item.status=='已完成'"
                @click="deleteOrder(item.id)"
              >删除订单</button>
              <button
                style="position: absolute;"
                v-show="item.status=='待付款'"
                @click="cancelOrder(item.id)"
              >取消订单</button>
             <!-- <button
                style="position: absolute;margin-left: -2.2rem;"
                v-show="item.status=='待付款'"
                @click="payMoney(item.id)"
              >确认付款</button> -->
              <button
                style="position: absolute;margin-left: -2.2rem;"
                v-show="item.status=='待收货'"
                @click="wait(item.id)"
              >确认收货</button>
							<button
							  style="position: absolute;"
							  v-show="item.status=='排队中'"
							  @click="pickUpGoods(item.id)"
							>申请提货</button>
              共{{item.number}}件
              <span>小计：</span>
              <i>￥{{item.allmoney}}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付密码 -->
		<div id="pay-view" v-show="payshow">
			<section class="pay-mask">
			  <div class="pay_password" style="position: fixed;">
			    <div class="container">
			      <div class="pay_title">
			        请输入支付密码
			        <img src="../../assets/icon/icon_guanbi@2x.png" alt @click="payshow=false" />
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
  </div>
</template>
<script>
export default {
  name: "shop_order",
  data() {
    return {
      tabsParam: ["全部", "待付款", "已付款", "已出售", "待收货"],
      noworder: 0, //默认第一个tab为激活状态
      shop_order: [], //商品订单数组
			not_shop_order: false, //是否无数据
			loading: false,  //加载中
			payshow: false, //是否显示支付弹窗
			orderid: "", //支付时订单id
			password: "" ,//支付时支付密码
			index: -1 //输入第几个密码
    };
  },
  methods: {
		//获取订单数据
		getWholesaleOrder() {
		  let _this = this;
		  let token = localStorage.getItem("token");
			_this.loading = true;
			_this.shop_order = [];
			_this.not_shop_order = false;
		  mui.ajax(config.host + "/wMallOrder", {
		    dataType: "json", //服务器返回json格式数据
		    headers: {
		      token: token
		    },
		    data: {
		      type: _this.noworder || ''
		    },
		    type: "post", //HTTP请求类型
		    success: function(data) {
					_this.loading = false;
		      if (data.code == 200) {
						_this.shop_order = data.data;
						if(!data.data.length){
							_this.not_shop_order = true;
						}
		      }
		    }
		  });
		},
		//tab切换
		toggleTabs: function(index) {
		  if (this.noworder != index) {
		    this.noworder = index;
		    this.getWholesaleOrder();
		  }
		},
    //取消订单
    cancelOrder: function(id) {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.confirm("您确定取消订单吗?", "", ["取消", "确认"], function(e) {
        if (e.index != 0) {
          mui.ajax(config.host + "/cancelOrder", {
            dataType: "json", //服务器返回json格式数据
            headers: {
              token: token
            },
            data: {
              id: id
            },
            type: "POST", //HTTP请求类型
            success: function(data) {
              if (data.code == 200) {
                mui.alert(data.msg, function() {
                  location.reload();
                });
              }
            }
          });
        }
      });
    },
		//点击删除订单弹窗
		deleteOrder: function(id) {
			let _this = this;
			let token = localStorage.getItem("token");
			mui.confirm("您确定删除订单吗?", "", ["取消", "确认"], function(e) {
			  if (e.index != 0) {
			    mui.ajax(config.host + "/wholeSaleDel", {
			      dataType: "json", //服务器返回json格式数据
			      headers: {
			        token: token
			      },
			      data: {
			        id: id
			      },
			      type: "POST", //HTTP请求类型
			      success: function(data) {
			        if (data.code == 200) {
			          mui.alert(data.msg, function() {
			            location.reload();
			          });
			        }
			      }
			    });
			  }
			});
		},
		//支付密码弹窗显示
		payMoney(id) {
			$(".ipt_pay input").val('');
		  this.orderid = id;
		  this.password = "";
		  this.index = -1;
		  this.payshow = !this.payshow;
		},
		//点击数字键盘
		btnpassword(text) {
		  var payinput = $(".ipt_pay input");
		  if (this.index < 5) {
		    this.index++;
		    $(payinput[this.index]).val(text);
		  }
		  if (this.index == 5) {
		    var payinput = $(".ipt_pay input");
		    for (var i = 0; i < payinput.length; i++) {
		      this.password += $(payinput[i]).val();
		    }
		    let _this = this;
		    let token = localStorage.getItem("token");
		    mui.ajax(config.host + "/whsubmitorder", {
		      data: {
		        id: _this.orderid,
		        password: _this.password
		      },
		      dataType: "json", //服务器返回json格式数据
		      headers: {
		        token: token
		      },
		      type: "post", //HTTP请求类型
		      success: function(data) {
		        _this.password = "";
		        _this.index = -1;
		        $(".ipt_pay input").val("");
		        if (data.code == 200) {
		          if (data.data.type == 1) {
		            window.location.href = data.data.res;
		          } else {
		            mui.alert(data.msg,function(){
									location.reload();
								});
		          }
		        } else {
		          mui.alert(data.msg);
		        }
		      }
		    });
		  }
		},
    //确认收货按钮
    wait: function(id) {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/wholeSaleConfirm", {
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        data: {
          id: id
        },
        type: "POST", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            mui.alert(data.msg, function() {
              location.reload();
            });
          }
        }
      });
    },
    /* 待提货 */
		pickUpGoods(id){
      let _this = this;
      let token = localStorage.getItem("token");
			mui.confirm('确认申请提货吗？','提示',['取消','确认'],function (e) {
				if(e.index == 1){
					mui.ajax(config.host + "/pickUpGoods",{
						headers: {
						  token: token
						},
						data:{id: id},
						dataType:'json',//服务器返回json格式数据
						type:'post',//HTTP请求类型
						success:function(data){
							if (data.code == 200) {
								mui.alert(data.msg, function() {
								  location.reload();
								});
							}
						}
					});
				}
			},'div')
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
  mounted() {
    if (this.hasWxCallBack) {
      this.noworder = this.$route.query.type || 0;
      this.getWholesaleOrder();
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
        this.noworder = this.$route.query.type || 0;
        this.getWholesaleOrder();
      }
    }
  }
};
</script>
<style scoped>
.change_password_box {
  margin: .9rem 0.3rem 0.2rem;
}

.tabs {
  display: flex;
  display: -webkit-flex;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #f6f6f6;
  z-index: 2;
}

.tabs li {
  flex: 1;
  -webkit-flex: 1;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.38rem;
  color: #4c4c4c;
}

.active {
  color: red !important;
}

.active span {
  display: inline-block;
  height: 100%;
  border-bottom: 1px solid red;
}

.order_main_box {
  background: #fff;
  margin-top: 0.2rem;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px #eee;
  padding-bottom: 0.1rem;
}

.order_main h5 {
  font-size: 0.38rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #eee;
  padding: 0 0.2rem;
  color: #333;
}

.order_main h5 span {
  float: right;
  color: #e60012;
}

.order_shop {
  display: flex;
  display: -webkit-flex;
  padding-top: 0.2rem;
}

.order_shop_img {
  flex: 1;
  -webkit-flex: 1;
  width: 2.8rem;
  min-width: 2.8rem;
  max-width: 2.8rem;
  text-align: center;
}

.order_shop_img img {
  width: 2.3rem;
  height: 2.35rem;
}

.order_shop_text {
  flex: 3;
  -webkit-flex: 3;
  position: relative;
}

.order_shop_text h6 {
  color: #333;
  font-size: 0.36rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 0.5rem;
  padding-right: 0.1rem;
}

.order_shop_text p {
  color: red;
  font-size: 0.36rem;
  padding-right: 0.2rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0.2rem;
}

.order_moner p button {
  position: absolute;
  left: 2.4rem;
  top: 0;
  border-radius: 25px;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  padding: 0 0.3rem;
  margin-top: 0.1rem;
}

.order_shop_text p i {
  font-style: normal;
  font-size: 0.3rem;
}

.order_shop_text p span {
  float: right;
  color: #acacac;
  font-size: 0.32rem;
}

.order_moner {
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}

.order_moner p {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.34rem;
  text-align: right;
  position: relative;
}

.order_moner p span {
  color: #333;
  margin-left: 0.15rem;
  font-size: 0.32rem;
}

.order_moner p i {
  font-style: normal;
  color: red;
}

.order_tan_box {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}

.order_tan {
  position: absolute;
  width: 9.5rem;
  padding: 0.2rem 0.2rem 0.4rem 0.2rem;
  top: 3.5rem;
  left: 50%;
  background: #fff;
  border-radius: 5px;
  margin-left: -4.75rem;
  text-align: center;
}

.order_tan h5 {
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.36rem;
}

.order_tan h5 span {
  float: right;
  height: 0.6rem;
}

.order_tan h5 span img {
  height: 100%;
}

.order_tan p {
  font-size: 0.4rem;
  color: #000;
  padding: 1.5rem 0 1.2rem;
}

.order_btn input {
  width: 2rem;
  font-size: 0.37rem;
  margin: 0 1.2rem;
  color: #fff;
  border: none;
}

.order_btn input:first-child {
  background: #acacac;
}

.order_btn input:last-child {
  background: #e60012;
}
.has_team {
  display: none;
}
.no_team {
  height: 12rem;
  background: #fff;
  line-height: 12rem;
  border-radius: 5px;
  text-align: center;
  margin-top: 0.2rem;
  -webkit-box-shadow: 1px 1px 2px 1px #eee;
  box-shadow: 1px 1px 2px 1px #eee;
}
.no_team img {
  height: 2.5rem;
  margin-top: 3.5rem;
}

#pay-view{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);
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
.pay_password {
  background: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70vh;
  border-radius: 5px 5px 0 0;
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
