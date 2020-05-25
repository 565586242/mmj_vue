<template>
  <div class="addto_bank">
    <div class="tjadd_box">
      <p>
        <span>手机号码</span>
        <input
          type="text"
          v-model="user_phone"
          placeholder="请输入手机号码"
          oninput="value=value.replace(/[^\d]/g,'')"
        />
      </p>
      <p>
        <span>用户姓名</span>
        <input type="text" v-model="user_name" readonly placeholder="输入手机号自动回填姓名" />
      </p>
      <p>
        <span>返佣比例</span>
        <input
          type="text"
          v-model="commission"
          placeholder="请输入返佣比例"
          oninput="value=value.replace(/[^\d]/g,'')"
        />%
      </p>
    </div>
    <button class="sign_out" @click="addMypartner()">确认添加</button>
  </div>
</template>

<script>
export default {
  name: "partnerConfig",
  data() {
    return {
      user_name: "",
      user_phone: "",
      commission: ""
    };
  },
  methods: {
    addMypartner() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/addMypartner", {
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        data: {
          user_name: this.user_name,
          user_phone: this.user_phone,
          commission: this.commission
        },
        type: "POST", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            mui.toast(data.msg);
            _this.$router.push("/partnerConfig");
          } else {
            mui.toast(data.msg);
          }
        }
      });
    },
    checkPhone(){
			let _this = this;
			let token = localStorage.getItem("token");
			mui.ajax(config.host + '/checkPhone',{
				dataType:'json',//服务器返回json格式数据
				headers: {
				  token: token
				},
				data: {
					phone: this.user_phone
				},
				type:'POST',//HTTP请求类型
				success:function(data){
        	_this.user_name = data.data.user_name;
				}
			});
		}	
  },
  watch: {
    user_phone(val){
      if(val.length == 11){
        this.checkPhone();
      }
    }
  }
};
</script>


<style scoped>
.tjadd_box {
  background: #fff;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}
.sign_out {
  display: block;
  width: 7rem;
  height: 1.1rem;
  background: #e60012;
  color: #fff;
  margin: 1rem auto;
  border-radius: 5px;
  font-size: 0.5rem;
  border: none;
}
.tjadd_box p {
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #f1f1f1;
  line-height: 1.2rem;
}
.tjadd_box p span {
  flex: 1;
  -webkit-flex: 1;
  width: 2.5rem;
  max-width: 2.5rem;
  min-width: 2.5rem;
  font-size: 0.38rem;
  color: #333;
  height: 1.2rem;
  line-height: 1.2rem;
}
.tjadd_box p input {
  flex: 5;
  -webkit-flex: 5;
  border: none;
  margin: 0;
  padding: 0;
  height: 1.2rem;
  color: #333;
  font-size: 0.38rem;
  background: none;
}
</style>
