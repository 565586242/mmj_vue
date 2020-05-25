<template>
	<div class="user">
		<p class="choose_date">
			<input type="month" v-model="yearMonth">
		</p>
		<div class="index_top">
			<div>
				<p>销售额</p>
				<p>{{ Number(totalSales).toFixed(2) }}</p>
			</div>
			<div>
				<p>佣金</p>
				<p>{{ Number(totalRate).toFixed(2) }}</p>
			</div>
		</div>
		<div class="index_title">
			<p>日&nbsp;期</p>
			<p>销售额</p>
			<p>佣 金</p>
		</div>
		<router-link :to="(item.sales||item.rate_money)?{path: '/totalSales',query: {whichDay:key}}:''" v-for="(item,key) in listData" :key="item.id">
			<div class="index_list">
				<p>{{key}}</p>
				<p>{{ Number(item.sales).toFixed(2) || "0.00"}}</p>
				<p>{{ Number(item.rate_money).toFixed(2) || "0.00" }}</p>
			</div>
		</router-link>
	</div>
</template>

<script>
	export default{
		name: 'totalAllSales',
		data(){
			return {
				yearMonth: '',
				totalRate: '',
				totalSales: '',
				listData: []  //下级列表
			}
		},
		methods:{
			tradestatistics(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/tradestatistics',{
					dataType:'json',//服务器返回json格式数据
					headers: {
					  token: token
					},
					data: {
						yearMonth: this.yearMonth
					},
					type:'GET',//HTTP请求类型
					success:function(data){
						if(data.code == 200){
							_this.totalRate = data.data.totalRate;
							_this.totalSales = data.data.totalSales;
							_this.listData = data.data.arr;
						}
					}
				});
			}
		},
		created() {
		  if (this.hasWxCallBack) {
		    const newDate = new Date();
		    const year = newDate.getFullYear();
		    let month = newDate.getMonth() + 1;
		    month = month < 10?'0'+month:month;
		    this.yearMonth = year + '-' + month;
		    this.tradestatistics();
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
		      const newDate = new Date();
		      const year = newDate.getFullYear();
		      let month = newDate.getMonth() + 1;
		      month = month < 10?'0'+month:month;
		      this.yearMonth = year + '-' + month;
		      this.tradestatistics();
		    }
		  },
			yearMonth(val){
				this.tradestatistics(val);
			}
		}
	}
</script>

<style scoped>
	.user {
		box-sizing: border-box;
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
	}

	.choose_date {
		box-sizing: border-box;
		padding: 0.133333rem 0.346666rem;
		text-align: right;
		color: #282828;
		font-size: 0.373333rem;
	}
	
	.choose_date input{
		height: 0.4rem;
		padding: 0;
		margin: 0;
		outline: none;
		border: none;
		text-align: center;
	}

	.index_top {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 9.306666rem;
		height: 2.666666rem;
		background: no-repeat url(../../../assets/my_bg@2x.png) center/cover;
		margin: auto;
		border-radius: 0.133333rem;
	}

	.index_top>div {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 50%;
		height: 1.333333rem;
		border-right: 1px solid rgba(255, 255, 255, .45);
	}

	.index_top>div p {
		color: #fff;
		font-size: 0.373333rem;
	}

	.index_top>div p:last-child {
		font-size: 0.48rem;
	}

	.index_top>div:last-child {
		border-right: none;
	}

	.index_title,
	.index_list {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
		min-height: 1.066666rem;
		width: 100%;
		border-bottom: 1px solid #f1f1f1;
	}

	.index_title p,
	.index_list p {
		width: 33.33333%;
		color: #282828;
		text-align: center;
		font-size: 0.373333rem;
	}

	.index_list p {
		color: #7c7c7c;
	}
</style>
