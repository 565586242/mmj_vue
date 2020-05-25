<template>
	<div>
		<div class="shop-list" v-for="item in queuegoodslist" :key="item.id" @click="seeDetail(item)">
			<img :src="item.cover_img|hostImg" alt="">
			<div>
				<p>{{item.goods_name}}</p>
				<p>前方还有：<span>{{item.front}}</span></p>
				<p>排队总量：<span>{{item.total}}</span></p>
				<p>待收货款：<span>{{item.wait_money}}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "user",
		data() {
			return {
				queuegoodslist: []  //商品列表
			};
		},
		methods: {
			/* 获取排队商品 */
			getQueueGoodsList(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/queuegoodslist',{
					dataType:'json',//服务器返回json格式数据
					type:'post',//HTTP请求类型
					headers: {
						token: token
					},
					success:function(data){
						if(data.code == 200){
							_this.queuegoodslist = data.data;
						}else{
							mui.alert(data.msg);
						}
					}
				});
			},
			/* 查看详情 */
			seeDetail(data){
				this.$router.push({
					path: '/queueGoodsDetails',
					query:{
						id: data.id
					}
				})
			}
		},
		mounted() {
			if (this.hasWxCallBack) {
			  this.getQueueGoodsList();
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
					this.getQueueGoodsList();
				}
			}
		}
	};
</script>

<style scoped>
	.shop-list{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 2.4rem;
		padding: 0.293333rem 0.346667rem;
		background-color: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	.shop-list > img{
		width: 1.813333rem;
		height: 1.813333rem;
		margin-right: 0.266666rem;
	}
	.shop-list > div{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 7.3rem;
		height: 100%;
		line-height: 0.366666rem;
	}
	.shop-list p{
		font-size: 0.266666rem;
		color: #acacac;
	}
	.shop-list p:first-child{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.346666rem;
		color: #282828;
	}
	.shop-list p span{
		color: #e60012;
	}
</style>
