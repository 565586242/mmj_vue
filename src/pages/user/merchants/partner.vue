<template>
	<div class="body">
		<div class="index_title">
			<p>姓&nbsp;名</p>
			<p>手机号</p>
			<p>添加日期</p>
		</div>
		<div class="index_list" v-for="item in listData" :key="item.id">
			<p>{{item.user_name}}</p>
			<p>{{item.user_phone}}</p>
			<p>{{item.become_partnet_time}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'partner',
		data(){
			return {
				listData: []  //下级列表
			}
		},
		methods:{
			myPartner(){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + '/myPartner',{
					dataType:'json',//服务器返回json格式数据
					headers: {
					  token: token
					},
					type:'GET',//HTTP请求类型
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
		    this.myPartner();
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
		      this.myPartner();
		    }
		  }
		}
	}
</script>

<style scoped>
	.body{
		width: 100%;
		height: 100vh;
		background-color: #fff;
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
