<template>
	<div class="body">
		<div class="index_list" v-for="item in listData" :key="item.id">
			<img :src="item.user_head" alt="">
			<div>
				<p>{{item.user_name}}</p>
				<p>注册手机：{{item.user_phone}}</p>
				<p>注册时间：{{item.add_time}}</p>
				<p>绑定时间：{{item.become_partnet_time}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'accountDetail',
		data(){
			return {
				listData: []  //下级列表
			}
		},
		methods:{
			myDirectLevel(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/myDirectLevel',{
					dataType:'json',//服务器返回json格式数据
					headers: {
					  token: token
					},
					type:'POST',//HTTP请求类型
					data: {
						userId: this.$route.query.id
					},
					success:function(data){
						if(data.code == 200){
							_this.listData = data.data;
						}
					}
				});
			}
		},
		created() {
		  if (this.hasWxCallBack) {
		    this.myDirectLevel();
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
		      this.myDirectLevel();
		    }
		  }
		}
	}
</script>

<style scoped>
	.body{
		min-height: 100vh;
		background-color: #fff;
	}
	.index_list{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 100%;
		height: 2.4rem;
		padding: 0.293333rem 0.346666rem;
		background-color: #fff;
		border-bottom: 1px solid #f1f1f1;
	}
	.index_list img{
		width: 1.813333rem;
		height: 1.813333rem;
		margin-right: 0.266666rem;
	}
	.index_list > div p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.266666rem;
		color: #acacac;
	}
	.index_list > div p:first-child{
		color: #282828;
		font-size: 0.346666rem;
	}
</style>
