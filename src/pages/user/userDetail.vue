<template>
  <div class="people_information">
    <div class="people_top">
      <div class="user-header">
        <img :src="user_info.user_head" class="user-header-img user-header-com" />
      </div>
    </div>
    <!-- 用户信息 -->
    <div class="people_main">
      <p>
        <span>昵称</span>
        <input type="text" v-model="user_info.user_name" readonly />
      </p>
      <p>
        <span>手机号</span>
        <input type="text" v-model="user_phone" placeholder="请输入您的手机号" />
      </p>
      <p>
        <span>真实姓名</span>
        <input type="text" v-model="true_name" placeholder="请输入您的真实姓名"/>
      </p>
    </div>
    <div class="people_main" v-if="!user_info.is_modify">
      <p>
        <span>支付密码</span>
        <input type="password" v-model="pay_password" @click="payInputClick('pay_password')" readonly placeholder="请输入支付密码" />
      </p>
      <p>
        <span>确认密码</span>
        <input type="password" v-model="repassword" @click="payInputClick('repassword')" readonly placeholder="请确认支付密码" />
      </p>
    </div>
    <div class="people_main" v-if="user_info.is_modify">
      <p>
        <span>支付密码</span>
        <input type="password" readonly value="000000" placeholder="请输入支付密码" />
      </p>
    </div>
    <button class="sign_out" @click="submitInfo()">保存资料</button>
		
		<!-- 支付密码 -->
		<section class="pay-mask" v-show="payshow">
			<div class="pay_password">
				<div class="container">
					<div class="pay_title">
						请输入支付密码
						<img src="../../assets/icon/icon_guanbi@2x.png" alt @click="payshow = false" />
					</div>
					<div class="flex f-d-r pay_content">
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
						<div class="ipt_pay">
							<input type="password" maxlength="1" disabled />
						</div>
					</div>
					<router-link to="/changePwd">忘记密码？</router-link>
				</div>
				<footer>
					<ul class="pay_btn">
						<li @click="btnpassword('1')">1</li>
						<li @click="btnpassword('2')">2</li>
						<li @click="btnpassword('3')">3</li>
						<li @click="btnpassword('4')">4</li>
						<li @click="btnpassword('5')">5</li>
						<li @click="btnpassword('6')">6</li>
						<li @click="btnpassword('7')">7</li>
						<li @click="btnpassword('8')">8</li>
						<li @click="btnpassword('9')">9</li>
						<li class="b9"></li>
						<li @click="btnpassword('0')">0</li>
						<li class="b9" @click="btndelete">
							<img src="../../assets/icon/delete.png" alt />
						</li>
						<div class="mui-clearfix"></div>
					</ul>
				</footer>
			</div>
		</section>
  </div>
</template>

<script>
export default {
  name: "people_information",
  data() {
    return {
			user_phone: '', //昵称
			true_name: '',  //真实姓名
      user_info: {},  //个人信息
      pay_password: "", //密码1
      repassword: "", //密码2
			payClickType: '',  //是哪个密码被点击了
			payshow: false, //密码弹窗是否显示
			index: -1, //密码输入的第几位
    };
  },
  methods: {
		/* 判断是谁点击了输入密码 */
		payInputClick(type){
			this.payClickType = type;
			this.index = -1;
		  $(".ipt_pay input").val('');
			type == 'pay_password'?this.pay_password = '':this.repassword = '';
			this.payshow = true;
		},
		//点击数字键盘
		btnpassword(text) {
			var payinput = $(".ipt_pay input");
			if (this.index < 5) {
				this.index++;
				$(payinput[this.index]).val(text);
			}
			if (this.index == 5) {
				var pay_pwd = "";
				var payinput = $(".ipt_pay input");
				for (var i = 0; i < payinput.length; i++) {
					pay_pwd += $(payinput[i]).val();
				}
				//这就是密码输入完
				this.payClickType == 'pay_password'?(this.pay_password = pay_pwd):(this.repassword = pay_pwd);
				this.payshow = false;
			}
		},
		//点击删除支付密码
		btndelete() {
			var payinput = $(".ipt_pay input");
			if (this.index >= 0) {
				$(payinput[this.index]).val("");
				this.index--;
			}
		},
    submitInfo() {
      var submitData = {
        true_name: this.true_name,
        pay_password: this.pay_password,
        repassword: this.repassword,
        user_phone: this.user_phone
      };
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/homemyinfo", {
        data: submitData,
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "post", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
						var is_modify = localStorage.setItem('is_modify','1');
            mui.alert(data.msg, function() {
              _this.$router.push({
								path: '/user'
							})
            });
          } else {
            mui.alert(data.msg);
          }
        }
      });
    }
  },
  mounted() {
    if (this.hasWxCallBack) {
      this.user_info = JSON.parse(localStorage.getItem('user_info'));
      this.true_name = this.user_info.true_name;
      this.user_phone = this.user_info.user_phone;
      this.pay_password = this.user_info.pay_password;
      this.repassword = this.user_info.pay_password;
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
        this.user_info = JSON.parse(localStorage.getItem('user_info'));
        this.true_name = this.user_info.true_name;
        this.user_phone = this.user_info.user_phone;
        this.pay_password = this.user_info.pay_password;
        this.repassword = this.user_info.pay_password;
      }
    }
  }
};
</script>


<style scoped>
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

.people_top {
  text-align: center;
  background: #fff;
  padding: 1.4rem 0 0;
  border-bottom: 1px solid #f6f6f6;
}

.user-header {
  position: relative;
  display: inline-block;
}

.user-header-com {
  width: 1.4rem;
  height: 1.4rem;
  display: inline-block;
  border-radius: 50%;
}

.header-upload-btn {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  /* 通过定位把input放在img标签上面，通过不透明度隐藏 */
}

.user-header p {
  color: #e60012;
  font-size: 0.34rem;
  margin-top: 0.1rem;
}

.people_main {
  background: #fff;
  padding: 0 0.2rem;
}

.people_main p,
.wechat_ewm_box {
  display: flex;
  display: -webkit-flex;
  border-bottom: 1px solid #f6f6f6;
}

.people_main p span,
.wechat_ewm_box span {
  flex: 1;
  -webkit-flex: 1;
  width: 2.3rem;
  max-width: 2.3rem;
  min-width: 2.3rem;
  font-size: 0.38rem;
  color: #333;
  height: 1.2rem;
  line-height: 1.2rem;
}

.people_main p input {
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

.people_margin {
  margin: 0.3rem 0;
}

.wechat_ewm {
  flex: 5;
  -webkit-flex: 5;
  margin-top: 0.2rem;
  margin-left: 0.1rem;
  padding-bottom: 0.3rem;
}

.wechat_ewm img {
  height: 3rem;
  width: 3rem;
  border: 1px solid #ccc;
  border-radius: inherit;
  padding: 0.6rem;
}

.wechat_ewm input {
  width: 3rem;
  height: 3rem;
}
.pay_password {
		background: #fff;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 70vh;
		border-radius: 5px 5px 0 0;
	}

	section {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 998;
		background: rgba(0, 0, 0, 0.6);
	}

	.container {
		position: absolute;
		top: 0;
		background: #fff;
		border-radius: 5px;
		margin: 0;
		padding-bottom: 0.266667rem;
	}

	.pay_title {
		position: relative;
		font-size: 0.4rem;
		text-align: center;
		color: #282828;
		height: 1.2rem;
		line-height: 1.2rem;
		border-bottom: 1px solid #eee;
	}

	.pay_title img {
		position: absolute;
		right: 0.2rem;
		height: 0.6rem;
		top: 0.25rem;
	}

	.pay_content {
		border-bottom: 1px solid #acacac;
		border-top: 1px solid #acacac;
		border-right: 1px solid #acacac;
		margin: 0.4rem 0.3rem 0.2rem 0.3rem;
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		display: -webkit-flex;
	}
	
	.container a {
		text-align: center;
		color: #e60012;
		display: block;
		width: 100%;
		font-size: 0.37rem;
	}

	.ipt_pay {
		width: 100%;
		height: 1.2rem;
		border-left: 1px solid #acacac;
	}

	.ipt_pay input {
		border: 0;
		height: 100%;
		width: 100%;
		text-align: center;
		font-size: 0.88rem;
		background: #fff;
		margin: 0;
	}

	footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-weight: 600;
	}

	.pay_btn {
		background: #acacac;
	}

	.pay_btn li {
		width: 31.3333%;
		float: left;
		height: 1.1rem;
		line-height: 1.1rem;
		text-align: center;
		background: #fff;
		font-size: 0.55rem;
		border-right: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		margin: 0.1rem 1%;
		border-radius: 5px;
		font-weight: normal;
		color: #000;
	}

	.pay_btn li:active {
		background: #c2c2c2;
	}

	.b9:active {
		background: #c2c2c2 !important;
		border: none !important;
	}

	.b9 {
		background: none !important;
		border: none !important;
	}

	.b9 img {
		height: 0.5rem;
		display: block;
		margin: 0.25rem auto;
	}
</style>
