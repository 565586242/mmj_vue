<template>
	<div class="body">
		<div class="no_team" :style="{'display':listData.length?'none':'block'}">
		  <img src="../../assets/icon/icon_zanwuchengyuan@2x.png" alt />
		</div>
		<div class="index_list" v-for="item in listData">
			<img :src="item.user_head" alt="">
			<div>
				<p>{{item.user_name}}</p>
				<p>注册手机：{{item.user_phone}}</p>
				<p>注册时间：{{item.add_time}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "team",
		data() {
			return {
				listData: []
			};
		},
		methods: {
			rebate() {
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/rebate", {
					dataType: "json", //服务器返回json格式数据
					headers: {
						token: token
					},
					type: "get", //HTTP请求类型
					success: function(data) {
						if (data.code == 200) {
							_this.listData = data.data;
						} else {
							mui.alert(data.msg);
						}
					}
				});
			}
		},
		props: {
			hasWxCallBack: {
				type: Boolean,
				default: false
			}
		},
		created() {
			if (this.hasWxCallBack) {
				this.rebate();
			}
		},
		watch: {
			hasWxCallBack: function(val) {
				if (val) {
					this.rebate();
				}
			}
		}
	};
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
	
	.no_team {
		box-sizing: border-box;
	  border-radius: 5px;
	  text-align: center;
	}
	
	.no_team img {
	  height: 2.5rem;
	  margin-top: 2.5rem;
	}
</style>
