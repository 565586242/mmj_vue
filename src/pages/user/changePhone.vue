<template>
  <div class="change_phone">
    <div class="change_password_box">
      <!--修改手机号码-->
      <div class="login_zh">
        <p>
          <span>原手机号</span>
          <input
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            readonly
            v-model="phone"
            placeholder="请输入原手机号码"
          />
        </p>
        <p class="login_yzm">
          <span>验证码</span>
          <input type="password" name id v-model="code" placeholder="请输入验证码" />
          <button @click="getPhoneCode(1,'countdown_text1')">{{countdown_text1}}</button>
        </p>
        <p class="login_pass">
          <span>新手机号</span>
          <input
            type="text"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="phone1"
            placeholder="请确认新手机号码"
          />
        </p>
        <p class="login_yzm">
          <span>验证码</span>
          <input type="password" name id v-model="code1" placeholder="请输入验证码" />
          <button @click="getPhoneCode(2,'countdown_text2')">{{countdown_text2}}</button>
        </p>
        <button class="sign_out" @click="preservation()">保存修改</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change_phone",
  data() {
    return {
      countdown_text1: "获取验证码",
      countdown_text2: "获取验证码",
      phone: "",
      phone1: "",
      code: "",
      code1: ""
    };
  },
  methods: {
    changephone() {
      var user_info = JSON.parse(localStorage.getItem("user_info"));
      this.phone = user_info.user_phone;
    },
    //原手机获取验证码倒计时
    countdown(num, name) {
      //倒计时
      let _this = this;
      _this[name] = num + "秒后重新发送";
      let timer = setInterval(function() {
        num--;
        _this[name] = num + "秒后重新发送";
        if (num <= 0) {
          clearInterval(timer);
          _this[name] = "重新获取";
          return false;
        }
      }, 1000);
    },
    getPhoneCode(type, name) {
      let _this = this;
      let token = localStorage.getItem("token");
      if (this[name] == "获取验证码" || this[name] == "重新获取") {
        let phone = null;
        if (type == 1) {
          phone = _this.phone;
        } else {
          phone = _this.phone1;
        }
        mui.ajax(config.host + "/getphonecode", {
          data: {
            phone: phone
          },
          dataType: "json", //服务器返回json格式数据
          headers: {
            token: token
          },
          type: "post", //HTTP请求类型
          success: function(data) {
            if (data.code == 200) {
              mui.toast(data.msg);
              _this.countdown(60, name);
            } else {
              mui.alert(data.msg);
            }
          }
        });
      } else {
        mui.alert(this[name], function() {}, "div");
      }
    },
    preservation() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/changephone", {
        data: {
          user_phone: _this.phone,
          code: _this.code,
          new_phone: _this.phone1,
          new_code: _this.code1
        },
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "post", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            mui.toast(data.msg);
            _this.$router.push({ path: "/user" });
          } else {
            mui.alert(data.msg);
          }
        }
      });
    }
  },
  created() {
    if (this.hasWxCallBack) {
      this.changephone();
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
        this.changephone();
      }
    }
  }
};
</script>

<style scoped>
.change_phone {
  margin-top: 1.8rem;
}
.change_password_box {
  margin: 0.4rem 0.8rem;
}
.login_zh {
  margin: 0.8rem 0rem;
  position: relative;
}
.login_zh p {
  display: flex;
  display: -webkit-flex;
  height: 1rem;
  line-height: 1rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.login_zh p span {
  flex: 1;
  -webkit-flex: 1;
  width: 1.8rem;
  min-width: 1.8rem;
  max-width: 1.8rem;
  color: #333;
  font-size: 0.4rem;
	text-align-last: justify;
}
.login_zh p input {
  flex: 3.5;
  -webkit-flex: 3.5;
  border: none;
  background: none;
  height: 0.9rem;
  line-height: 0.9rem;
  margin: 0;
  color: #333;
  font-size: 0.36rem;
}
.login_yzm button {
  position: absolute;
  right: 0;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 5px;
  top: 0rem;
  background: #e60012;
  padding: 0 0.3rem;
  color: #fff;
  border: none;
  font-size: 0.32rem;
}
.auth_text_blue {
  color: #fff !important;
  font-size: 0.32rem !important;
}
.sign_out {
  display: block;
  width: 7rem;
  height: 1.1rem;
  background: #e60012;
  color: #fff;
  margin: 2rem auto;
  border-radius: 5px;
  font-size: 0.5rem;
  border: none;
}
</style>
