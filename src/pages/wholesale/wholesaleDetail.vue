<template>
  <div class="shop_details">
    <div class="address_list_box">
      <!-- 顶部banner轮播图 -->
      <div class="swiper_banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in banner_list" :key="index">
            <img :src="item.img_path|hostImg" alt />
          </div>
        </div>
      </div>
			<div class="details_title">
        <p>{{goodsInfo.goods?goodsInfo.goods.goods_desc:''}}</p>
        <h5>
					<span>￥</span>{{goodsInfo.price}}
					<p><img src="../../assets/icon_yong@2x.png" class="">{{goodsInfo.coupon}}</p>
				</h5>
      </div>
      <div class="details_top">
        <h5>
          <span>规格</span>
          <b>{{goodsInfo.goods?goodsInfo.goods.goods_specifications:''}}</b>
        </h5>
				<h5>
				  <span>物流无法到达地区</span>
				  <b>{{goodsInfo.goods.no_send?goodsInfo.goods.no_send:'无'}}</b>
				</h5>
      </div>
      <div class="details_img">
        <h5>————<span>宝贝详情</span>————</h5>
        <img v-for="(item,index) in goodsInfo.detials_img" :key="index" :src="item.img_path|hostImg" />
      </div>
    </div>
    <!-- 底部功能 -->
    <div class="details_footer">
      <div class="details_car">
        <input type="button" :disabled="!$route.query.type" value="立即购买" @click="isblock=true" />
      </div>
    </div>
    <!-- 购买弹窗 -->
    <div class="confirm_pay_tan" v-show="isblock">
      <div class="confirm_pay">
				<div class="buy_title">
					今日可购数量:{{goodsInfo.people_day_can_rob || 0}}
					<img src="../../assets/icon/icon_guanbi@2x.png" class="closed" alt @click="isblock = false" />
				</div>
        <div class="detail_tan_top">
          <img :src="goodsInfo.image?goodsInfo.image[0].img_path:''|hostImg" alt />
          <h5>￥<span>{{goodsInfo.price}}</span></h5>
          <p>{{goodsInfo.goods?goodsInfo.goods.goods_specifications:''}}</p>
        </div>
				<div class="details_num">
					<h4>
						购买数量
						<ul id="car">
							<li>
								<button v-on:click="number==1?1:number--">-</button>
							</li>
							<li>
								<input type="text" v-model="number" readonly/>
							</li>
							<li>
								<button v-on:click="numberUp()">+</button>
							</li>
						</ul>
					</h4>
				</div>
        <button class="details_paybtn" @click="confirmsub()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"; //引入滚动插件
import Swiper from "swiper"; //引入swiper
export default {
  name: "shop_details",
  data() {
    return {
			banner_list: [], //轮播图
			goodsInfo: {}, //商品对象
			isblock: false,  //购买弹窗是否显示
			type: "" ,//点击购买 还是 加入购物车
      number: 1, //购买数量
    };
  },
  methods: {
		//获取商品详情
		shopDetailsInit() {
		  let _this = this;
			let token = localStorage.getItem("token");
		  mui.ajax(config.host + "/goodsDetails", {
		    data: {
		      sku_id: this.$route.query.id
		    },
				headers: {
					token: token
				},
		    dataType: "json", //服务器返回json格式数据
		    type: "post", //HTTP请求类型
		    success: function(data) {
		      if (data.code == 200) {
						_this.banner_list = data.data.goodsSku.image;
						_this.goodsInfo = data.data.goodsSku;
						_this.$nextTick(function() {
						  _this.initSwiper();
						});
		      }
		    }
		  });
		},
		//轮播图初始化
		initSwiper() {
      //初始化swiper
      var swiper_banner = new Swiper(".swiper_banner", {
        loop: true,
        direction: "horizontal",
        observer: true,
        autoplay: {
          delay: 3500,
          stopOnLastSlide: false,
          disableOnInteraction: false
        }
      });
    },
		/* 商品加1 */
		numberUp(){
			let dayCanGo = this.goodsInfo.goods?this.goodsInfo.goods.day_can_rob:0;
			if(this.$route.query.can_rob == this.number || this.number == dayCanGo){
				this.number = this.number;
			}else{
				this.number++;
			}
		},
    /* 立即购买*/
		confirmsub() {
			var userInfo = JSON.parse(localStorage.getItem('user_info'));
			if(userInfo.user_coupon < this.goodsInfo.coupon * this.number){
				mui.alert('赠券不足!');
			}else{
				this.$router.push({
					path: '/wholesaleConfirm',
					query: {
						goodsId: this.goodsInfo.id,
						buyNumber: this.number,
            coupon: this.goodsInfo.coupon * this.number,
            user_coupon: userInfo.user_coupon
					}
				})
			}
    },
		/* 账户信息 */
		user_init() {
			var _this = this;
			let token = localStorage.getItem("token");
			mui.ajax(config.host + "/homemine", {
				dataType: "json", //服务器返回json格式数据
				headers: {
					token: token
				},
				type: "get", //HTTP请求类型
				success: function(data) {
					if (data.code == 200) {
						localStorage.setItem("user_info", JSON.stringify(data.data));
						localStorage.setItem("is_modify", data.data.is_modify);
					}
				}
			});
		}
  },
  created() {
		if (this.hasWxCallBack) {
			this.shopDetailsInit();
			this.user_init();
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
				this.shopDetailsInit();
				this.user_init();
			}
		}
	}
};
</script>


<style scoped>
	@import url("../../style/css/goods-detail.css");
</style>
