<template>
	<div>
		<div class="list" v-for="item in serviceData" @click="listDetail(item.id)">
			<div class="list-top">
				<p>{{item.status?'已处理':'未处理'}}</p>
				<p>{{item.add_time}}</p>
			</div>
			<div class="list-content">{{item.content}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "adviceRecord",
		data() {
			return {
				serviceData: {}
			}
		},
		methods: {
			getAdviceRecord() {
				let _this = this;
				let token = localStorage.getItem("token");
				mui.ajax(config.host + "/servicelist", {
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					headers: {
					  token: token
					},
					success: function(data) {
						if (data.code == 200) {
							_this.serviceData = data.data;
						} else {
							mui.alert(data.msg);
						}
					}
				});
			},
			listDetail(id){
				this.$router.push({
					path:'/contactDetail',
					query:{
						id: id
					},
				})
			}
		},
		created() {
			if (this.hasWxCallBack) {
				this.getAdviceRecord()
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
					this.getAdviceRecord()
				}
			}
		}
	}
</script>

<style scoped>
	.list {
		display: block;
		box-sizing: border-box;
		width: 9.306666rem;
		height: 2rem;
		padding: 0 0.266666rem;
		border-radius: 0.133333rem;
		box-shadow: 0 0 0.08rem 0 rgba(0, 0, 0, .15);
		margin: 0.266666rem auto;
		font-size: 0.293333rem;
		color: #4C4C4C;
		line-height: 0.4rem;
	}

	.list-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 0.8rem;
	}

	.list-top>p:first-child {
		font-size: 0.373333rem;
		color: #282828;
	}

	.list-top>p:last-child {
		font-size: 0.34rem;
		color: #ACACAC;
	}

	.list-content {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-indent: 0.533333rem;
		line-height: .5rem;
	}
</style>
