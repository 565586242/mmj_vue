<template>
	<div class="body">
		<div class="index_title">
			<p>姓&nbsp;名</p>
			<p>手机号</p>
			<p>返佣比例(%)</p>
			<p>操作</p>
		</div>
		<div class="index_list" v-for="item in listData">
			<p>{{item.user_name}}</p>
			<p>{{item.user_phone}}</p>
			<p>{{item.commission}}</p>
			<p>
				<a href="javascript:;" class="del" @click="del(item.id)">删除</a>
				<a href="javascript:;" @click="edit(item)">编辑</a>
			</p>
		</div>
		<router-link class="add_fixed" :to="{path: '/addPartner'}">添加合伙人</router-link>
	</div>
</template>

<script>
	export default{
		name: 'partnerConfig',
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
			},
			/* 删除合伙人 */
			del(id){
				let _this = this;
				let token = localStorage.getItem("token");
				mui.confirm('确定删除吗?','提示',['取消','确认'],function (e) {
					if(e.index == 1){
						mui.ajax(config.host + '/deletePartner',{
							dataType:'json',//服务器返回json格式数据
							headers: {
							  token: token
							},
							data: {
								userId: id
							},
							type:'GET',//HTTP请求类型
							success:function(data){
								if(data.code == 200){
									_this.listData = data.data;
									mui.toast('删除成功');
								}
							}
						});
					}
				},'div')
			},
			edit(data){
				localStorage.setItem('partnerData',JSON.stringify(data));
				this.$router.push('/editPartner');
			}
		},
		created() {
		  if (this.hasWxCallBack) {
		    this.myPartner();
				if(localStorage.getItem('partnerData')){
					localStorage.removeItem('partnerData');
				}
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
					if(localStorage.getItem('partnerData')){
						localStorage.removeItem('partnerData');
					}
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
		width: 25%;
		color: #282828;
		text-align: center;
		font-size: 0.373333rem;
	}
	
	.index_list p {
		color: #7c7c7c;
	}
	.index_list a{
		display: inline-block;
		width: 1.066666rem;
		height: 0.533333rem;
		background-color: #e60012;
		padding: 0;
		border: none;
		border-radius: 0.066666rem;
		outline: none;
		font-size: 0.32rem;
		color: #fff;
		line-height: 0.533333rem;
		text-align: center;
	}
	.index_list a.del{
		background-color: #B6BEC5;
	}
	.body .add_fixed{
		display: block;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1.333333rem;
		background-image: linear-gradient(160deg,#f66,#f00);
		color: #fff;
		font-size: 0.48rem;
		text-align: center;
		line-height: 1.3333333rem;
	}
</style>
