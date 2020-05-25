<template>
	<div>
		<div class="order_main_box">
		  <div class="order_main">
		    <h5>
		      <span>排队中</span>
		    </h5>
		    <a href="javascript:;">
		      <div class="order_shop">
		        <div class="order_shop_img">
		          <img :src="queueOrderTwoData.cover_img|hostImg" alt />
		        </div>
		        <div class="order_shop_text">
		          <h6>{{queueOrderTwoData.goods_name}}</h6>
		          <p><i>￥</i>{{queueOrderTwoData.price}}<span>X{{queueOrderTwoData.number}}</span></p>
		        </div>
		      </div>
		    </a>
				<div class="order-msg">
					<p>订单编号：<span>{{queueOrderTwoData.add_time}}</span></p>
					<p>下单时间：<span>{{queueOrderTwoData.total_order_number}}</span></p>
				</div>
		  </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "shop_order",
		data() {
		  return {
		    queueOrderTwoData: {},  //详情
		  };
		},
		methods: {
			queueOrderTwoDetails(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/queueOrderTwoDetails',{
					data:{
						order_id: this.$route.query.id
					},
					headers: {
						token: token
					},
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					success:function(data){
						if(data.code == 200){
							_this.queueOrderTwoData = data.data;
						}else{
							mui.alert(data.msg);
						}
					}
				});
			}
		},
		mounted(){
			if (this.hasWxCallBack) {
				this.queueOrderTwoDetails();
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
		      this.queueOrderTwoDetails();
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
	
	.order_shop_text p i {
	  font-style: normal;
	  font-size: 0.3rem;
	}
	
	.order_shop_text p span {
	  float: right;
	  color: #acacac;
	  font-size: 0.32rem;
	}
	.order-msg{
		box-sizing: border-box;
		padding: 0.266666rem 0 0;
		margin: 0.266666rem 0.266666rem;
		border-top: 1px solid #f1f1f1;
	}
	.order-msg > p{
		color: #acacac;
		font-size: 0.38rem;
		line-height: 0.7rem;
	}
	.order-msg > p span{
		color: #282828;
	}
</style>
