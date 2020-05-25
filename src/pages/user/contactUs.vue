<template>
  <div class="customer_service">
    <div class="recharge_box">
			<h4 style="font-weight: 100;margin-bottom: .4rem;">客服电话:{{servicePhone}}</h4>
      <h5>留言</h5>
      <textarea name v-model="text_ly" id cols="30" rows="8" placeholder="请输入留言内容"></textarea>
      <h5>选择类型</h5>
      <div class="recharge_mode">
        <label for>
          <input type="radio" name="mode" value="1" v-model="checkedValue" class="t_romm_ip" />订单问题
        </label>
        <label for>
          <input type="radio" name="mode" value="2" v-model="checkedValue" class="t_romm_ip" />其他问题
        </label>
      </div>
      <button class="sign_out" @click="submission()">提&nbsp;交</button>
      <button class="sign_out record" @click="$router.push({path: '/contactRecord'})">联系记录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "contactUs",
  data() {
    return {
      check: false,
      checkedValue: 1,
      text_ly: "",
			servicePhone: ''  //客服电话
    };
  },
  methods: {
		getServicePhone(){
			let _this = this;
			let token = localStorage.getItem("token");
			mui.ajax(config.host + "/servicePhone", {
			  dataType: "json", //服务器返回json格式数据
			  headers: {
			    token: token
			  },
			  type: "post", //HTTP请求类型
			  success: function(data) {
			    if (data.code == 200) {
			      _this.servicePhone = data.data.customer_service;
			    } else {
			      mui.alert(data.msg);
			    }
			  }
			});
		},
    submission() {
      let _this = this;
      let token = localStorage.getItem("token");
      //意见反馈
      mui.ajax(config.host + "/service", {
        data: {
          content: _this.text_ly,
          sort: _this.checkedValue
        },
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "post", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            mui.alert(data.msg, function() {
              _this.$router.push({
                path: "/user"
              });
            });
          } else {
            mui.alert(data.msg);
          }
        }
      });
    }
  },
  created() {
    if (this.hasWxCallBack) {
			this.getServicePhone();
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
				this.getServicePhone();
      }
    }
  }
};
</script>

<style scoped>
.recharge_box {
  margin: 1.8rem 0.6rem 0;
}
.recharge_box textarea {
  border-radius: 5px;
}
.recharge_box h5 {
  font-size: 0.38rem;
  color: #333;
  margin-bottom: 0.2rem;
}
.recharge_money {
  border-radius: 5px;
  color: #333;
}
.t_romm_ip[type="radio"] {
  position: relative;
  width: 20px;
  height: 1px;
  margin: 9px 0.05rem 0 0;
}
.t_romm_ip[type="radio"]::before,
.t_romm_ip[type="radio"]::after {
  position: absolute;
  display: block;
  content: "";
  border-radius: 2px;
  transition: 0.3s all esae;
}
.t_romm_ip[type="radio"]::before {
  top: -14px;
  left: 0;
  width: 18px;
  height: 18px;
  background: url(../../assets/icon/btn_xuan_no@2x.png) no-repeat;
  background-size: 100% 100%;
}
.t_romm_ip[type="radio"]::after {
  top: -14px;
  left: 0px;
  width: 18px;
  height: 18px;
}
.t_romm_ip[type="radio"]:checked::before {
  border-color: 1px solid #fff;
}
.t_romm_ip[type="radio"]:checked::after {
  background: url(../../assets/icon/btn_xuan_yes@2x.png) no-repeat;
  background-size: 100% 100%;
}
.sign_out {
  display: block;
  width: 7rem;
  height: 1.1rem;
  background: #e60012;
  color: #fff;
  margin: 1rem auto 0;
  border-radius: 5px;
  font-size: 0.5rem;
  border: none;
}
.record{
	margin-top: .8rem;
	margin-bottom: 1.2rem;
	background-color: #fff;
	border: 1px solid #e60012;
	color: #e60012;
}
.recharge_mode {
  display: flex;
  display: -webkit-flex;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
}
.recharge_mode label {
  flex: 1;
  -webkit-flex: 1;
  font-size: 0.38rem;
  color: #333;
}
</style>
