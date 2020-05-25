<template>
  <div class="address">
    <!-- 暂无地址 -->
    <div class="no_address" :style="{'display':address_list.length?'none':'block'}">
      <img src="../../assets/icon/icon_zanwudizhi@2x.png" alt />
    </div>
    <!-- 地址列表 -->
    <div class="address_list_box">
      <div class="address_list" v-for="address in address_list" :key="address.id" @click="confirmAdress(address)">
        <div class="address_list_left">
          <h5>
            {{address.user_name}}
            <span>{{address.user_phone}}</span>
          </h5>
          <p>
            <span class="add_mr">{{address.is_default}}</span>
            {{address.user_address|add_address_fil}}{{address.street}}
          </p>
        </div>
        <div class="address_list_right">
          <div @click.stop="$router.push({path:'/modifyAddress',query:{addressId: address.id}})">
            <img src="../../assets/icon/icon_xiugai@2x.png" alt />修改
          </div>
          <p @click.stop="shanchu(address.id)">
            <img src="../../assets/icon/icon_delete@2x.png" alt />删除
          </p>
        </div>
      </div>
    </div>
    <div class="add_address">
      <p @click="$router.push({path: '/addtoAddress'})">添加地址</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "addressList",
  data() {
    return {
      address_list: []
    };
  },
  methods: {
		/* 点击地址跳转 */
    confirmAdress(address){
      var experienceOrderData = JSON.parse(localStorage.getItem('experienceOrderData'));
      var wholesaleOrderData = JSON.parse(localStorage.getItem('wholesaleOrderData'));
			localStorage.setItem('chooseAddress',JSON.stringify(address));
			if(experienceOrderData){
				this.$router.push({
					path: '/experienceConfirm',
					query: {
						goodsId: experienceOrderData.goodsId,
						buyNumber: experienceOrderData.buyNumber
					}
				});
			}else if(wholesaleOrderData){
				this.$router.push({
					path: '/wholesaleConfirm',
					query: {
						goodsId: wholesaleOrderData.goodsId,
						buyNumber: wholesaleOrderData.buyNumber
					}
				});
			}
    },
    /* 获取地址列表*/
		showaddress() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/showaddress", {
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "get", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            _this.address_list = data.data.addressList;
          } else {
            mui.alert(data.msg);
          }
        }
      });
    },
		/* 删除地址 */
		shanchu(id) {
      let _this = this;
      let token = localStorage.getItem("token");
			mui.confirm('确认删除地址吗?','删除确认',['取消','确认'],function (e) {
				if(e.index != 0){
					mui.ajax(config.host + "/addressdel", {
					  data: {
					    address_id: id
					  },
					  dataType: "json", //服务器返回json格式数据
					  headers: {
					    token: token
					  },
					  type: "post", //HTTP请求类型
					  success: function(data) {
					    if (data.code == 200) {
					      mui.alert(data.msg,function(){
									location.reload();
								});
					    } else {
					      mui.alert(data.msg);
					    }
					  }
					});
				}
			},'div')
    }
  },
  filters: {
    add_address_fil(add_list) {
      let add_address = "";
      for (var i = 0; i < add_list.length; i++) {
        add_address += add_list[i];
      }
      return add_address;
    }
  },
  created() {
    if (this.hasWxCallBack) {
      this.showaddress();
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
        this.showaddress();
      }
    }
  }
};
</script>


<style scoped>
.add_address {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  background-color: #fff;
  z-index: 99;
}

.add_address p {
  width: 9.306666rem;
  height: 0.9rem;
  background-color: #e60012;
  border-radius: 0.45rem;
  margin: 0.146666rem auto 0;
  line-height: 0.9rem;
  text-align: center;
  font-size: .44rem;
  color: #fff;
}

.no_address {
  margin-top: .2rem;
  text-align: center;
}

.no_address img {
  height: 2.5rem;
  margin-top: 3rem;
}

.address_list_box {
  margin: .2rem auto 0;
  border-bottom: 1.2rem solid transparent;
}

.address_list {
  background: url(../../assets/icon/icon_dizhi02@2x.png) 0.2rem center #fff
    no-repeat;
  background-size: 0.7rem;
  padding: 0.2rem;
  display: flex;
  display: -webkit-flex;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px #eee;
  margin-bottom: 0.3rem;
}

.address_list_left {
  flex: 4;
  -webkit-flex: 4;
  padding-left: 1rem;
  border-right: 1px solid #f1f1f1;
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

.add_mr {
  background: #f1f1f1;
  color: red;
  margin-right: 0.1rem;
}

.address_list_right {
  flex: 1;
  -webkit-flex: 1;
  text-align: center;
  width: 2rem;
  min-width: 2rem;
  max-width: 2rem;
}

.address_list_right img {
  height: 0.35rem;
  vertical-align: text-top;
  margin-right: 0.12rem;
}

.address_list_right > div {
  display: block;
  font-size: 0.34rem;
  color: #4c4c4c;
  margin-bottom: 0.5rem;
}

.address_list_right p {
  font-size: 0.34rem;
  color: #4c4c4c;
}
</style>
