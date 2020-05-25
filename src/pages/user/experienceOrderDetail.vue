<template>
  <div class="order_details">
    <div class="change_password_box">
      <!-- 快递名称及地址 -->
      <div class="express_box">
        <div class="address_list express" v-show="hasSendCompany">
          <div class="address_list_left">
            <h5>
              {{orderData.send_company}}
              <span>{{orderData.send_time}}</span>
            </h5>
            <p>{{orderData.send_num}}</p>
          </div>
        </div>
        <div class="address_list">
          <div class="address_list_left">
            <h5>
              {{address_info.user_name}}
              <span>{{address_info.user_phone}}</span>
            </h5>
            <p>{{address_info.address}}</p>
          </div>
        </div>
      </div>
      <!-- 商品详情 -->
      <div class="order_main_box">
        <div class="order_main">
          <div class="order_shop">
            <div class="order_shop_img">
              <img :src="orderData.goods_image | hostImg" alt />
            </div>
            <div class="order_shop_text">
              <h6>{{orderData.goods_name}}</h6>
              <p>
                <i>￥</i>
                {{orderData.price}}
                <span>X{{orderData.number}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="order_moner">
          <!-- <p>
            运费
            <span>￥{{orderData.send_price}}</span>
          </p> -->
          <p>
            实付款
            <i>￥{{orderData.allmoney}}</i>
          </p>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order_information">
        <h5>订单信息</h5>
        <p>
          订单编号
          <span>{{orderData.order_number}}</span>
        </p>
        <p>
          创建时间
          <span>{{orderData.add_time}}</span>
        </p>
        <p>
          付款时间
          <span>{{orderData.pay_time}}</span>
        </p>
        <p>
          发货时间
          <span>{{orderData.send_time}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order_details",
  data() {
    return {
      hasSendCompany: false,  //是否有快递公司信息
      orderData: {},   //订单信息
			address_info: {}  //地址信息
    };
  },
  methods: {
    orderdetails() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/orderdetails", {
        data: {
          order_id: this.$route.query.id
        },
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "get", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
						_this.orderData = data.data;
						_this.address_info = data.data.address_info;
            if (data.data.send_company == undefined) {
              _this.hasSendCompany = false;
            } else {
              _this.hasSendCompany = true;
            }
          } else {
            mui.alert(data.msg);
          }
        }
      });
    }
  },
  created() {
    if (this.hasWxCallBack) {
      this.orderdetails();
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
        this.orderdetails();
      }
    }
  }
};
</script>

<style scoped>
.change_password_box {
  margin: .2rem 0.3rem 0;
}

.express_box {
  border-radius: 5px;
  box-shadow: 1px 1px 2px #eee;
  overflow: hidden;
}

.address_list {
  background: url(../../assets/icon/icon_dizhi02@2x.png) 0.2rem center #fff
    no-repeat;
  background-size: 0.7rem;
  padding: 0.2rem;
  display: flex;
  display: -webkit-flex;
}

.express {
  background: url(../../assets/icon/icon_kuaidi@2x.png) 0.2rem center #fff
    no-repeat !important;
  background-size: 0.8rem !important;
  border-bottom: 1px solid #eee;
}

.address_list_left {
  flex: 4;
  -webkit-flex: 4;
  padding-left: 1rem;
  padding-right: 0.2rem;
}

.address_list_left h5 {
  font-size: 0.36rem;
  color: #282828;
  margin-top: 0.1rem;
}

.address_list_left h5 span {
  color: #acacac;
  margin-left: 0.2rem;
}

.address_list_left p {
  font-size: 0.34rem;
  color: #282828;
  margin-top: 0.15rem;
}

.order_main_box,
.order_information {
  background: #fff;
  margin-top: 0.2rem;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px #eee;
  padding-bottom: 0.1rem;
}

.order_information h5 {
  font-size: 0.38rem;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #eee;
  padding: 0 0.2rem;
  color: #333;
  margin-bottom: 0.2rem;
}

.order_information p {
  padding: 0 0.2rem;
  height: 0.65rem;
  line-height: 0.65rem;
  color: #333;
  font-size: 0.35rem;
}

.order_information p span {
  margin-left: 0.6rem;
}

.order_shop {
  display: flex;
  display: -webkit-flex;
  padding: 0.2rem 0;
}

.order_shop_img {
  flex: 1;
  -webkit-flex: 1;
  width: 2.8rem;
  min-width: 2.8rem;
  max-width: 2.8rem;
  text-align: center;
}

.order_shop_img img {
  width: 2.3rem;
  height: 2.35rem;
}

.order_shop_text {
  flex: 3;
  -webkit-flex: 3;
	position: relative;
}

.order_shop_text h6 {
  color: #333;
  font-size: 0.36rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 0.5rem;
  padding-right: 0.1rem;
}

.order_shop_text p {
	position: absolute;
	bottom: 0;
	width: 100%;
  padding-right: 0.2rem;
  color: red;
  font-size: 0.36rem;
}

.order_moner p button {
  position: absolute;
  left: 2.4rem;
  top: 0;
  border-radius: 25px;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.32rem;
  padding: 0 0.3rem;
  margin-top: 0.1rem;
}

.order_shop_text p i {
  font-style: normal;
  font-size: 0.3rem;
}

.order_shop_text p span {
  float: right;
  color: #acacac;
  font-size: 0.32rem;
}

.order_moner {
  margin-top: 0.2rem;
  padding: 0 0.2rem;
}

.order_moner p {
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.34rem;
  position: relative;
  color: #333;
}

.order_moner p span {
  float: right;
}

.order_moner p i {
  font-style: normal;
  color: red;
  float: right;
}
</style>
