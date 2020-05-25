<template>
	<div>
		<div class="order_main_box">
		  <div class="order_main">
		    <h5>
		      订单日期:{{queueGoodsData.add_time}}
		      <span>已排天数:{{queueGoodsData.days}}</span>
		    </h5>
		    <router-link :to="{path:'/queueOrderTwoDetails',query:{id:order_info.id}}">
		      <div class="order_shop">
		        <div class="order_shop_img">
		          <img :src="queueGoodsData.cover_img|hostImg" alt />
		        </div>
		        <div class="order_shop_text">
		          <h6>{{queueGoodsData.goods_name}}</h6>
		          <p><i>￥</i>{{order_info.price}}<span>X{{order_info.number}}</span></p>
		        </div>
		      </div>
		    </router-link>
		  </div>
		  <div class="order_moner">
		    <p>
		      共{{order_info.number}}件
		      <span>小计：</span>
		      <i>￥{{order_info.allmoney}}</i>
		    </p>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "shop_order",
		data() {
		  return {
		    queueGoodsData: {},  //详情
				order_info: {} //订单详情
		  };
		},
		methods: {
			queueOrderDetails(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/queueOrderDetails',{
					data:{
						id: this.$route.query.id
					},
					headers: {
						token: token
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:function(data){
						if(data.code == 200){
							_this.queueGoodsData = data.data;
							_this.order_info = data.data.order_info;
						}else{
							mui.alert(data.msg);
						}
					}
				});
			}
		},
		mounted(){
			if (this.hasWxCallBack) {
				this.queueOrderDetails();
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
		      this.queueOrderDetails();
		    }
		  }
		}
	}
</script>

<style scoped>
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
</style>
