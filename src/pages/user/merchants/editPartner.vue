<template>
	<div class="addto_bank">
		<div class="tjadd_box">
		     <p><span>用户姓名</span><input type="text" readonly v-model="user_name" placeholder="请输入用户姓名"></p>
		     <p><span>手机号码</span><input type="text" readonly v-model="user_phone" placeholder="请输入手机号码" oninput = "value=value.replace(/[^\d]/g,'')"></p>
		     <p><span>返佣比例</span><input type="text" v-model="commission" placeholder="请输入返佣比例" oninput = "value=value.replace(/[^\d]/g,'')">%</p>
		</div>
		<button class="sign_out" @click="editMyPartner()">确认修改</button>
	</div>
</template>

<script>
export default {
  name: 'editPartner',
  data () {
    return {
			id: '',
			user_name: '',
			user_phone: '',
			commission: ''
		}
  },
  methods: {
		editMyPartner(){
			let _this = this;
			let token = localStorage.getItem("token");
			mui.ajax(config.host + '/editMyPartner',{
				dataType:'json',//服务器返回json格式数据
				headers: {
				  token: token
				},
				data: {
					userId: this.id,
					commission: this.commission
				},
				type:'POST',//HTTP请求类型
				success:function(data){
					if(data.code == 200){
						mui.toast(data.msg);
						_this.$router.push('/partnerConfig');
					}else{
						mui.toast(data.msg)
					}
				}
			});
		}
  },
	created() {
	  if (this.hasWxCallBack) {
	    var data = JSON.parse(localStorage.getItem('partnerData'));
			this.user_name = data.user_name;
			this.user_phone = data.user_phone;
			this.commission = data.commission;
			this.id = data.id;
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
	      var data = JSON.parse(localStorage.getItem('partnerData'));
	      this.user_name = data.user_name;
	      this.user_phone = data.user_phone;
	      this.commission = data.commission;
	      this.id = data.id;
	    }
		}
	}
}
</script>


<style scoped>
  .tjadd_box{
	background: #fff;
	margin-top: .2rem;
	padding: 0 .2rem;
}
  .sign_out{
    display: block;
    width: 7rem;
    height: 1.1rem;
    background: #e60012;
    color: #fff;
    margin: 1rem auto;
    border-radius: 5px;
    font-size: .5rem;
    border: none;
}
  .tjadd_box p{
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #F1F1F1;
		line-height: 1.2rem;
}
  .tjadd_box p span{
    flex: 1;
    -webkit-flex: 1;
    width: 2.5rem;
    max-width: 2.5rem;
    min-width: 2.5rem;
    font-size: .38rem;
    color: #333;
     height: 1.2rem;
    line-height: 1.2rem;
}
  .tjadd_box p input{
    flex: 5;
    -webkit-flex: 5;
    border: none;
    margin: 0;
    padding: 0;
    height: 1.2rem;
    color: #333;
    font-size: .38rem;
    background: none;
}
</style>
