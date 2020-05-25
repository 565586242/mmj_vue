<template>
  <div>
    <!-- 地址信息 -->
    <div class="tjadd_box">
      <p>
        <span>收货人姓名</span>
        <input type="text" id v-model="user" placeholder="请输入收货人姓名" />
      </p>
      <p>
        <span>收货手机号</span>
        <input type="text" id v-model="phone" placeholder="请输入收货人手机号" />
      </p>
      <p>
      	<span>请选择地址</span>
      	<input type="text" id v-model="addtext" @click="chooseAdress()" placeholder="请选择地址" readonly="readonly" />
      </p>
      <p>
        <span>详细地址</span>
        <input type="text" id v-model="address" placeholder="请输入详细地址" />
      </p>
    </div>
    <label for class="add_mr">
      <input
        type="checkbox"
        id
        v-bind:true-value="2"
        v-bind:false-value="1"
        class="t_romm_ip"
        v-model="checkedValue"
      />设为默认地址
    </label>
    <button class="sign_out" @click="preservation()">保存修改</button>
    <!-- 城市三级选择 -->
    <div class="EframeWrap" v-if="adddressBol">
      <div class="Eframe">
        <div class="Eframe_title">
          <div>请选择</div>
          <span @click="adddressBol=false"></span>
        </div>
        <div class="Eframe_center">
          <div class="Eframe_center_default" v-if="addressChangeRes.length==0">
          	<h4>热门城市</h4>
          	<ul class="default_list">
          		<li v-for="(item,index) in default_list" :key="index" @click="cityClick(item)">{{item}}</li>
          	</ul>
          </div>
          <div class="Eframe_center_res">
            <div class="left">
              <div></div>
            </div>
            <ul class="right">
            	<li v-for="(item,index) in addressChangeRes" :key="index">
            		<div class="active" @click="againChange(item)">{{item}}</div>
            		<span></span>
            	</li>
            </ul>
          </div>
        </div>
        <div class="Eframe_bottom">
        	<h4>请选择</h4>
        	<ul class="address_list">
        		<li v-for="(item,index) in address_list" :key="index" @click="cityClick(item.text)">{{item.text}}</li>
        	</ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addressData from "../../../static/js/city.data-3.js";
export default {
  name: "modifyAddress",
  data() {
    return {
			adddressBol: false, //是否显示选择地址模态框
			user: "", //姓名
			phone: "", //电话
			address: "",  //详细地址
			addtext: "", //显示的地址
			checkedValue: 1, //是否默认地址
			addressChangeRes: [], //选择的城市列表
			default_list: ["北京市", "天津市", "上海市", "深圳市", "杭州市"], //热门城市显示
			address_list: [] //待选列表
    };
  },
  methods: {
		/* 获取详情地址 */
    changed() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/addressedit", {
        data: {
          address_id: _this.$route.query.addressId
        },
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "get", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
						_this.user = data.data.user_name;
						_this.phone = data.data.user_phone;
						_this.address = data.data.street;
						_this.addressChangeRes = data.data.user_address;
						_this.checkedValue = data.data.is_default;
						for (var i = 0; i < data.data.user_address.length; i++) {
							_this.addtext += data.data.user_address[i];
						}
          } else {
            mui.alert(data.msg);
          }
        }
      });
    },
		/* 保存修改 */
		preservation() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/addressupdate", {
        data: {
          address_id: this.$route.query.addressId,
          user_name: this.user,
          user_phone: this.phone,
          user_address: this.addressChangeRes,
          user_street: this.address,
          is_default: this.checkedValue
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
                path: "/address"
              });
            });
          } else {
            mui.alert(data.msg);
          }
        }
      });
    },
		chooseAdress(){
			this.adddressBol = true;
			this.addtext = '';
			this.addressChangeRes = [];
			this.address_list = addressData.cityData3;
		},
		/* 城市点击 */
		cityClick(val) {
			var data = this.queryShengArrIndex(this.address_list, val);
			this.addressChangeRes.push(data.text);
			this.addtext += data.text;
			if (data.children && data.children.length) {
				this.address_list = data.children;
			} else {
				this.adddressBol = false;
			}
		},
		/* 三级城市列表层层点击 */
		queryShengArrIndex(arr, val) {
			var data;
			if (arr.length) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].text == val) {
						return arr[i];
					} else {
						if (arr[i].children && arr[i].children.length) {
							data = this.queryShengArrIndex(arr[i].children, val);
							if (data) {
								return data;
							}
						}
					}
				}
			}
		}
   },
  created() {
    if (this.hasWxCallBack) {
      this.address_list = addressData.cityData3;
      this.changed();
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
        this.address_list = addressData.cityData3;
        this.changed();
      }
    }
  }
};
</script>


<style scoped>
.tjadd_box {
  background: #fff;
  margin-top: .2rem;
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

.tjadd_box p:nth-child(3) input {
  background: url(../../assets/icon/@2x.png) right center no-repeat;
  background-size: 0.25rem;
}

.t_romm_ip[type="checkbox"] {
  position: relative;
  width: 20px;
  height: 1px;
  margin: 9px 0.05rem 0 0;
}

.t_romm_ip[type="checkbox"]::before,
.t_romm_ip[type="checkbox"]::after {
  position: absolute;
  display: block;
  content: "";
  border-radius: 2px;
  transition: 0.3s all esae;
}

.t_romm_ip[type="checkbox"]::before {
  top: -12px;
  left: 0;
  width: 16px;
  height: 16px;
  background: url(../../assets/icon/btn_xuan_no@2x.png) no-repeat;
  background-size: 100% 100%;
}

.t_romm_ip[type="checkbox"]::after {
  top: -12px;
  left: 0px;
  width: 16px;
  height: 16px;
}

.t_romm_ip[type="checkbox"]:checked::before {
  border-color: 1px solid #fff;
}

.t_romm_ip[type="checkbox"]:checked::after {
  background: url(../../assets/icon/btn_xuan_yes@2x.png) no-repeat;
  background-size: 100% 100%;
}

.add_mr {
  display: block;
  margin: 0.2rem;
  font-size: 0.35rem;
  color: #333;
}

/**
	 * 地址选择弹窗
	 */
.EframeWrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  font-size: 0.38rem;
}

.Eframe {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.25rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: white;
}

.Eframe h4 {
  color: #acacac;
  font-size: 0.35rem;
  font-weight: 300;
  line-height: 0.7rem;
}

/* 弹窗标题 */
.Eframe .Eframe_title {
  text-align: center;
  line-height: 1rem;
  border-bottom: 1px solid #eeeeee;
  position: relative;
}

.Eframe_title span {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url(../../assets/icon/icon_guanbi@2x.png) no-repeat;
  background-size: 0.5rem;
  background-position: top right;
}

/* 弹窗中间内容 */
.Eframe_center {
  padding: 0.2rem 0;
  border-bottom: 1px solid #eeeeee;
}

.Eframe_center_res {
  position: relative;
}

.Eframe_center_res .left {
  position: absolute;
  top: 0;
  left: 0;
  width: 1rem;
  height: 100%;
  padding: 0.5rem 0;
  text-align: center;
}

.Eframe_center_res .left > div {
  width: 2px;
  height: 100%;
  background-color: #e60012;
  display: inline-block;
}

.Eframe_center_res .right li {
  position: relative;
  padding-left: 1rem;
  line-height: 1rem;
}

.Eframe_center_res .right li span {
  width: 5px;
  height: 5px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0.5rem;
  border-radius: 2.5px;
  margin: -2.5px 0 0 -2.5px;
  border: 1px solid #e60012;
  background-color: #e60012;
}

.Eframe_center_res .right li span.active {
  background-color: white;
}

.Eframe_center_res .right li div.active {
  color: #e60012;
}

/* 热门城市 */
.Eframe_center_default .default_list {
  font-size: 0;
}

.Eframe_center_default .default_list li {
  display: inline-block;
  line-height: 0.8rem;
  width: 25%;
  font-size: 0.38rem;
  text-align: center;
}

/* 弹窗底部地址列表选择 */
.Eframe_bottom .address_list {
  height: 8rem;
  overflow-y: auto;
  line-height: 1rem;
}

.Eframe_bottom .address_list li.active {
  color: #e60012;
  background: url(../../assets/icon/icon_gouxuan@2x.png) no-repeat;
  background-size: 0.4rem;
  background-position: right center;
}
</style>
