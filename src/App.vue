<template>
  <div id="app">
    <!-- 中间内容插槽 -->
		<div :class="{'cover-view':hasfooter}">
			<router-view :hasWxCallBack="hasWxCallBack"/>
		</div>

    <!-- 底部导航 -->
    <footer class="footer" v-if="hasfooter">
      <router-link to="/" :class="{'active':toPath=='/'}"></router-link>
      <router-link to="/wholesale" :class="{'active':toPath=='/wholesale'}"></router-link>
      <router-link to="/shopcar" :class="{'active':toPath=='/shopcar'}"></router-link>
      <router-link to="/user" :class="{'active':toPath=='/user'}"></router-link>
    </footer>
  </div>
</template>

<script>
  // 是否显示底部导航
  let footer = {
    "/": true,
    "/wholesale": true,
    "/shopcar": true,
    "/user": true
  };

  //不需要授权的页面
  let notAutho = {
    /* "/": true,
    "/wholesale": true */
  };

	//需要提示完善信息的页面
	let motifyPage = {
		"/experienceDetail": true,
		"/wholesaleDetail": true,
		"/user": true
	}

  export default {
    name: "App",
    data() {
      return {
        hasfooter: false, //是否有底部
        toPath: "",
        formPath: "",
        wxState: "", //父级id  邀请页面
        wxCode: "", //微信授权code
        hasWxCallBack: false, //页面是否微信授权回调
      };
    },
    created() {
			if (this.$route.query.qrcode) {
			  localStorage.setItem('parentQrcode', this.$route.query.qrcode);
			  this.wxState = this.$route.query.qrcode;
			}
			this.toPath = this.$route.path;
			/* 判断授权 */
		  this.chooseAudio();
    },
    methods: {
      //判断是否需要授权
      chooseAudio() {
				this.choiceStatus();
				this.chooseMotify();
        if (!localStorage.getItem("hasWxAudio")) {
          this.getAudioCode();
        } else {
          if (!notAutho[this.$route.path]) {
            if (!localStorage.getItem("hasWxCallBack")) {
              var audioPage = localStorage.getItem("hasWxAudio");
              var parmas = audioPage.substring(1, audioPage.length); //获取参数字符串
              var parmasArr = parmas.split("&"); //分开
              var obj = {};
              for (const i in parmasArr) {
                var arr = parmasArr[i].split("=");
                obj[arr[0]] = arr[1];
              }
              this.wxCode = obj.code;
              this.wxState = obj.state;
              this.wxcallback();
            } else {
              this.hasWxCallBack = true;
              this.checktoken();
            }
          }
        }
      },
      /* 获取token*/
			checktoken() {
        var _this = this;
        mui.ajax(config.host + "/checktoken", {
          type: "post", //HTTP请求类型
          data: {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id')
          },
          success: function(data) {
            if (data.code == 400) {
              mui.alert("登录超时,请重新登录", function() {
                localStorage.clear();
                _this.getAudioCode(_this.$route);
              });
            }
          }
        });
      },
      //授权回调
      wxcallback() {
        var _this = this;
        mui.ajax(config.host + "/homewxcallback", {
          type: "get", //HTTP请求类型
          data: {
            state: _this.wxState,
            code: _this.wxCode
          },
          success: function(data) {
            if (data.code == 200) {
              localStorage.setItem("hasWxCallBack", data);
              localStorage.setItem("token", data.data.token);
              localStorage.setItem("user_id", data.data.user_id);
              localStorage.setItem("is_modify", data.data.is_modify);
              _this.hasWxCallBack = true;
              _this.checktoken();
            }
          }
        });
      },
      //获取微信授权code
      getAudioCode() {
        let href = window.location.href;
        if (href.includes("?code")) {
          var url = href.substring(0, href.length - 2); //vue自动在末尾加了 #/ 符号，截取去掉
          var jingPosit = url.indexOf("?code"); //获取域名结束?的位置
          var parmes = url.substring(jingPosit, url.length);
          localStorage.setItem("hasWxAudio", parmes);
          location.href = config.webHost + "#/" + parmes;
        } else {
          if (!notAutho[this.$route.path]) {
            location.href =
              "https://open.weixin.qq.com/connect/oauth2/authorize?" +
              "appid=wx2eb84ee8ad00bd42" +
              "&redirect_uri=" +
              encodeURIComponent(config.webHost) +
              "&response_type=code&scope=snsapi_userinfo" +
              "&state=" +
              this.wxState +
              "#wechat_redirect";
          }
        }
      },
      //判断是否需要底部导航
      choiceStatus() {
        this.hasfooter = !!footer[this.$route.path];
      },
			/* 判断是否提示完善个人信息 */
			chooseMotify(){
				let _this = this;
				var is_modify = localStorage.getItem('is_modify');
				if(is_modify == 0 && motifyPage[this.$route.path] ){
					mui.confirm('请完善个人信息','提示',['取消','确认'],function (e) {
						if(e.index == 1){
							_this.$router.push('/userDetail');
						}
					},'div')
				}
			}
    },
    watch: {
      $route: function(to, form) {
        document.title = to.meta.title;
				this.toPath = to.path;
        this.formPath = form.path;
        this.chooseAudio();
      }
    }
  };
</script>

<style>
  @import url("../static/css/app.css");
	.cover-view{
		box-sizing: border-box;
		min-height: 100%;
		border-bottom: 1.306666rem solid transparent;
	}
	/* 底部导航 */
	.footer{
		position:fixed;
		height: 1.306666rem;
		bottom: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		border-top: 1px solid #CCCCCC;
		font-size: 0;
		background: #F1F1F1;
	}
	.footer a,.footer span{
		display: inline-block;
		width: 25%;
		height: 100%;
		font-size: 0.35rem;
		text-align: center;
		padding-top: 0.4rem;
	}
	.footer a:nth-child(1){
		background: url(assets/bottom_tab/tab_icon_shouye01@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(2){
		background: url(assets/bottom_tab/tab_icon_fenlei01@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(3){
		background: url(assets/bottom_tab/tab_icon_gouwu01@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(4){
		background: url(./assets/bottom_tab/tab_icon_my01@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(1).active{
		background: url(assets/bottom_tab/tab_icon_shouye02@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(2).active{
		background: url(assets/bottom_tab/tab_icon_fenlei02@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(3).active{
		background: url(assets/bottom_tab/tab_icon_gouwu02@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	.footer a:nth-child(4).active{
		background: url(assets/bottom_tab/tab_icon_my02@2x.png) no-repeat;
		background-size:auto 80%;
		background-position: center center;
	}
	/*加载状态*/
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		line-height: 0.733333rem;
	}
	.loading span:nth-child(1) {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		background: no-repeat url(assets/icon/loading.png) center/0.4rem;
		animation: loadingDH 1s linear infinite;
	}
	@keyframes loadingDH {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.cp_radio{
		display: inline-block;
		width: 0.4rem;
		height: 0.4rem;
		background: no-repeat url(assets/icon/btn_xuan_no@2x.png) center/contain;
		margin-right: 0.133333rem;
	}

	.cp_radio_active{
		background-image: url(assets/icon/btn_xuan_yes@2x.png);
	}
</style>
