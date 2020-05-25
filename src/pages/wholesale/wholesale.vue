<template>
	<div>
		<div class="swiper-container top-banner">
			<div class="swiper-wrapper">
				<img class="swiper-slide" v-for="(item,key) in bannerList" :key="key" :src="item.banner_path|hostImg" alt="">
			</div>
		</div>
		<div class="swiper-container top-panic" :class="{'bar-fixed':navBarFixed}">
			<div class="swiper-wrapper">
				<div class="swiper-slide panic-list" v-for="item in timeList" :key="item.id" @click="homeindex(item.id,item.status)">
					<p class="panic-title">{{item.start_time}}</p>
					<p class="panic-status" :class="{'panic-now':(timeId?item.id==timeId:item.status == 1)}">
						{{item.status|statusShow}}
					</p>
				</div>
			</div>
		</div>
		<div class="index-shop">
			<div class="index-shop-list" :class="{'not-shop':((item.can_rob == 0) && isCanRob)}" v-for="item in goodsList" :key="item.id" @click="shopClick(item)">
				<img class="shop-img" :src="item.cover_image|hostImg" alt="">
				<div class="shop-data">
					<div>
						<p class="shop-title">{{item.goods_name}}</p>
						<p class="shop-ticket"><img src="../../assets/icon_yong@2x.png" class="">{{item.coupon}}</p>
					</div>
					<div class="shop-money">
						<div class="shop-price"><span>￥</span>{{item.price}}</div>
						<div class="shop-content">
							<p class="has-panic">可抢:<span>{{item.can_rob}}</span></p>
							<p class="has-number">库存:<span>{{item.stock}}</span></p>
						</div>
					</div>
				</div>
				<div class="shop-handle">
					<button v-if="(item.can_rob != 0) && isCanRob">立即购买</button>
					<button v-else-if="(item.can_rob == 0) && isCanRob" class="has-none">已抢光</button>
					<button v-else>即将开抢</button>
					<p class="shop-status" :class="{'has-none':item.can_rob == 0}">
						<span class="status-title">{{(item.can_rob + item.finish_rob_num) == 0?'已抢100%':'已抢'+(item.finish_rob_num/(item.can_rob+item.finish_rob_num)).toFixed(2)*100+'%'}}</span>
						<span class="shop-progress" :style="{'width':(1-(item.finish_rob_num/(item.can_rob+item.finish_rob_num))).toFixed(2)*100+'%'}"></span>
					</p>
				</div>
			</div>
			<div class="loading" v-if="loading">
				<span></span>
				<span>加载中. . .</span>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper"; //引入swiper
export default {
  name: "home",
  data() {
    return {
			bannerList: [],  //轮播图数据
			goodsList: [],  //商品列表
			timeList: [],  //时间列表
			timeId: '',  //目前的时间id,用于添加class
			timeIndex: '',  //目前时间选择的第几个
			loading: true, //加载状态
			isCanRob: true,  //是否可抢,用于tab时间与当前时间的对比
			interval: ''  ,//定时器
			navBarFixed: false //是否吸顶
    };
  },
  methods: {
		/* 商品点击 */
		shopClick(data){
			if(data.can_rob != 0 && this.isCanRob){
				this.goodsDetail(data,'has');
			}else if(data.can_rob == 0 && this.isCanRob){
				this.goodsDetail(data,'not-has');
			}else{
				this.goodsDetail(data,'will-has');
			}
		},
		/* 首页数据 */
		homeindex(id,status){
			let _this = this;
			let token = localStorage.getItem("token");
			this.goodsList = [];
			this.loading = true;
			this.timeId = id || '';
			this.isCanRob = status != 2;
			mui.ajax(config.host + '/wholesale',{
				data: {
					time_interval: id || ''
				},
				headers: {
					token: token
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					_this.loading = false;
					if(id){
						_this.goodsList = data.data.goodsList;
					}else{
						_this.bannerList = data.data.bannerList;
						_this.goodsList = data.data.goodsList;
						_this.timeList = data.data.timeList;
						for (var i = 0; i < data.data.timeList.length; i++) {
							if(data.data.timeList[i].status == 1){
								_this.timeIndex = i;
								_this.timeId = data.data.timeList[i].id;
								break
							}
						}
						if(!_this.timeIndex && !_this.timeId){_this.timeId = _this.timeList[0].id;_this.timeIndex = 0;_this.isCanRob = false}
						_this.$nextTick(function(){
							_this.initPanicSwiper();
							_this.initBannerSwiper();
							_this.interval = setInterval(function(){
								_this.wholeChangeData();
							},2000)
						})
					}
				}
			});
		},
    //初始化抢购时间swiper
    initPanicSwiper() {
      new Swiper('.top-panic', {
      	freeMode: true,
      	slidesPerView: 3.5,
      	initialSlide: this.timeIndex || 0   //默认第几个开始
      });
    },
    //初始化轮播图swiper
    initBannerSwiper() {
      new Swiper('.top-banner', {
    		loop: true,
    		direction: "horizontal",
    		observer: true,
    		observeParents: true,
    		autoplay: {
    		  delay: 3000,
    		  stopOnLastSlide: false,
    		  disableOnInteraction: true
    		}
    	});
    },
		/* 立即购买 */
		goodsDetail(data,type){
			this.$router.push({
				path: '/wholesaleDetail',
				query: {
					id: data.id,
					can_rob: data.can_rob,
					timeId: this.timeId,
          type: (type == 'has'?true:false)
				}
			})
		},
		wholeChangeData(){
			let _this = this;
			let token = localStorage.getItem("token");
			mui.ajax(config.host + '/wholeChangeData',{
				data: {
					timeId: this.timeId
				},
				headers: {
					token: token
				},
				dataType:'json',//服务器返回json格式数据
				type:'post',//HTTP请求类型
				success:function(data){
					if(data.code == 200){
						for (var i = 0; i < data.data.length; i++) {
							if(_this.goodsList[i].id = data.data[i].id){
								_this.goodsList[i].can_rob = data.data[i].can_rob;
								_this.goodsList[i].stock = data.data[i].stock;
							}
						}
					}
				}
			});
		},
		/* 检测滚动高度 */
		hidemenu() {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			const offsetTop = document.querySelector('.top-banner').clientHeight;
			if (scrollTop > offsetTop) {
				this.navBarFixed = true
			} else {
				this.navBarFixed = false
			}
		}
  },
  filters: {
		/* 抢购状态 */
		statusShow(status){
			if(status == 0){
				return '已开抢'
			}else if(status == 1){
				return '抢购中'
			}else if(status == 2){
				return '即将开始'
			}
		}
  },
  mounted() {
		if (this.hasWxCallBack) {
			window.addEventListener("scroll", this.hidemenu); //监听滚动事件
			this.homeindex();
		}
  },
	destroyed() {
		clearInterval(this.interval);
		window.removeEventListener('scroll', this.hidemenu);
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
				window.addEventListener("scroll", this.hidemenu); //监听滚动事件
				this.homeindex();
			}
		}
	}
};
</script>

<style scoped="scoped">
	@import url("../../style/css/home-wholesale.css");

  .index-shop-list {
    position: relative;
  }

  .not-shop:after {
    position: absolute;
    top: 0.293333rem;
    left: 0.346666rem;
    z-index: 99;
    content: '';
    width: 2rem;
    height: 2rem;
    background: no-repeat url(../../assets/icon_qiangguang@2x.png) center/cover;
  }
</style>
