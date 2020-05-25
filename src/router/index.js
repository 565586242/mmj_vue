import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/home' //首页
import ExperienceDetail from '@/pages/home/experienceDetail' //体验商品
import ExperienceConfirm from '@/pages/home/experienceConfirm' //体验详情
import ExperienceOrder from '@/pages/user/experienceOrder' //体验订单
import ExperienceOrderDetail from '@/pages/user/experienceOrderDetail' //订单详情
import Wholesale from '@/pages/wholesale/wholesale' //批发
import WholesaleDetail from '@/pages/wholesale/wholesaleDetail' //批发商品
import WholesaleConfirm from '@/pages/wholesale/wholesaleConfirm' //批发商品
import WholesaleOrder from '@/pages/user/wholesaleOrder' //批发订单
import WholesaleOrderDetail from '@/pages/user/wholesaleOrderDetail' //批发订单
import Shopcar from '@/pages/shopcar/shopcar' //购物车
import User from '@/pages/user/user' //用户
import UserDetail from '@/pages/user/userDetail' //用户详情
import ChangePhone from '@/pages/user/changePhone' //修改手机号
import ChangePwd from '@/pages/user/changePwd' //修改密码
import Lineupgoods from '@/pages/user/lineupgoods' //排队商品
import QueueGoodsDetails from '@/pages/user/queueGoodsDetails' //排队商品详情
import QueueOrderTwoDetails from '@/pages/user/queueOrderTwoDetails' //排队商品详情
import Address from '@/pages/user/address' //收货地址
import AddtoAddress from '@/pages/user/addtoAddress' //添加收货地址
import ModifyAddress from '@/pages/user/modifyAddress' //修改收货地址
import Balance from '@/pages/user/balance' //我的余额
import UserCoupon from '@/pages/user/userCoupon' //我的余额
import BankCard from '@/pages/user/bankCard' //我的银行卡
import AddBankCard from '@/pages/user/addBankCard' //添加银行卡
import EditBankCard from '@/pages/user/editBankCard' //修改银行卡
import Balancedetailed from '@/pages/user/balance_detailed' //余额明细
import Recharge from '@/pages/user/recharge' //充值
import Cashwithdrawal from '@/pages/user/cash_withdrawal' //提现
import Team from '@/pages/user/team' //我的好友
import ContactUs from '@/pages/user/contactUs' //联系客服
import ContactRecord from '@/pages/user/contactRecord' //联系记录
import ContactDetail from '@/pages/user/contactDetail' //联系详情
import TotalAccount from '@/pages/user/merchants/totalAccount' //开户统计
import AccountDetail from '@/pages/user/merchants/accountDetail' //开户统计详情
import TotalAllSales from '@/pages/user/merchants/totalAllSales' //所有销售统计
import TotalSales from '@/pages/user/merchants/totalSales' //销售统计
import SalesDetail from '@/pages/user/merchants/salesDetail' //销售详情
import Partner from '@/pages/user/merchants/partner' //推广合伙人
import PartnerConfig from '@/pages/user/merchants/partnerConfig' //合伙人设置
import AddPartner from '@/pages/user/merchants/addPartner' //添加合伙人
import EditPartner from '@/pages/user/merchants/editPartner' //编辑合伙人
import InviteFriends from '@/pages/user/inviteFriends' //邀请好友


Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
			meta: {
				title: '买卖街商城'
			}
    },
		{
      path: '/experienceDetail',
      name: 'ExperienceDetail',
      component: ExperienceDetail,
			meta: {
				title: '商品展示'
			}
    },
		{
      path: '/experienceConfirm',
      name: 'ExperienceConfirm',
      component: ExperienceConfirm,
			meta: {
				title: '确认订单'
			}
    },
    {
      path: '/wholesale',
      name: 'Wholesale',
      component: Wholesale,
			meta: {
				title: '批发'
			}
    },
		{
      path: '/wholesaleDetail',
      name: 'WholesaleDetail',
      component: WholesaleDetail,
			meta: {
				title: '商品展示'
			}
    },
    {
      path: '/wholesaleConfirm',
      name: 'WholesaleConfirm',
      component: WholesaleConfirm,
			meta: {
				title: '确认订单'
			}
    },
    {
      path: '/shopcar',
      name: 'Shopcar',
      component: Shopcar,
			meta: {
				title: '购物车'
			}
    },
    {
      path: '/user',
      name: 'User',
      component: User,
			meta: {
				title: '我的'
			},
    },
    {
      path: '/userCoupon',
      name: 'UserCoupon',
      component: UserCoupon,
			meta: {
				title: '体验券明细'
			},
    },
    {
      path: '/changePhone',
      name: 'ChangePhone',
      component: ChangePhone,
			meta: {
				title: '修改手机号'
			},
    },
    {
      path: '/changePwd',
      name: 'ChangePwd',
      component: ChangePwd,
			meta: {
				title: '修改密码'
			},
    },
    {
      path: '/userDetail',
      name: 'UserDetail',
      component: UserDetail,
			meta: {
				title: '个人信息'
			},
    },
    {
      path: '/lineupgoods',
      name: 'Lineupgoods',
      component: Lineupgoods,
			meta: {
				title: '排队商品'
			},
    },
    {
      path: '/queueGoodsDetails',
      name: 'QueueGoodsDetails',
      component: QueueGoodsDetails,
			meta: {
				title: '排队订单'
			},
    },
    {
      path: '/queueOrderTwoDetails',
      name: 'QueueOrderTwoDetails',
      component: QueueOrderTwoDetails,
			meta: {
				title: '订单详情'
			},
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
			meta: {
				title: '收货地址'
			},
    },
    {
      path: '/addtoAddress',
      name: 'AddtoAddress',
      component: AddtoAddress,
			meta: {
				title: '添加地址'
			},
    },
    {
      path: '/modifyAddress',
      name: 'ModifyAddress',
      component: ModifyAddress,
			meta: {
				title: '修改地址'
			}
    },
    {
      path: '/balance',
      name: 'Balance',
      component: Balance,
			meta: {
				title: '我的余额'
			}
    },
    {
      path: '/bankCard',
      name: 'BankCard',
      component: BankCard,
			meta: {
				title: '银行卡'
			}
    },
    {
      path: '/addBankCard',
      name: 'AddBankCard',
      component: AddBankCard,
			meta: {
				title: '添加银行卡'
			}
    },
    {
      path: '/editBankCard',
      name: 'EditBankCard',
      component: EditBankCard,
			meta: {
				title: '修改银行卡'
			}
    },
    {
      path: '/balance_detailed',
      name: 'Balancedetailed',
      component: Balancedetailed,
			meta: {
				title: '余额明细'
			}
    },
    {
      path: '/recharge',
      name: 'Recharge',
      component: Recharge,
			meta: {
				title: '充值'
			}
    },
    {
      path: '/cash_withdrawal',
      name: 'Cashwithdrawal',
      component: Cashwithdrawal,
			meta: {
				title: '提现'
			}
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
			meta: {
				title: '我的好友'
			}
    },
    {
      path: '/experienceOrder',
      name: 'ExperienceOrder',
      component: ExperienceOrder,
			meta: {
				title: '体验订单'
			}
    },
    {
      path: '/wholesaleOrder',
      name: 'WholesaleOrder',
      component: WholesaleOrder,
			meta: {
				title: '批发'
			}
    },
    {
      path: '/wholesaleOrderDetail',
      name: 'WholesaleOrderDetail',
      component: WholesaleOrderDetail,
			meta: {
				title: '订单详情'
			}
    },
    {
      path: '/experienceOrderDetail',
      name: 'ExperienceOrderDetail',
      component: ExperienceOrderDetail,
			meta: {
				title: '订单详情'
			}
    },
    {
      path: '/contactUs',
      name: 'ContactUs',
      component: ContactUs,
			meta: {
				title: '联系客服'
			}
    },
    {
      path: '/contactRecord',
      name: 'ContactRecord',
      component: ContactRecord,
			meta: {
				title: '联系记录'
			}
    },
    {
      path: '/contactDetail',
      name: 'ContactDetail',
      component: ContactDetail,
			meta: {
				title: '联系详情'
			}
    },
    {
      path: '/totalAccount',
      name: 'TotalAccount',
      component: TotalAccount,
			meta: {
				title: '开户统计'
			}
    },
    {
      path: '/accountDetail',
      name: 'AccountDetail',
      component: AccountDetail,
			meta: {
				title: '开户统计详情'
			}
    },
    {
      path: '/totalSales',
      name: 'TotalSales',
      component: TotalSales,
			meta: {
				title: '销售统计'
			}
    },
    {
      path: '/totalAllSales',
      name: 'TotalAllSales',
      component: TotalAllSales,
			meta: {
				title: '销售统计'
			}
    },
    {
      path: '/salesDetail',
      name: 'SalesDetail',
      component: SalesDetail,
			meta: {
				title: '销售详情'
			}
    },
    {
      path: '/partner',
      name: 'Partner',
      component: Partner,
			meta: {
				title: '推广合伙人'
			}
    },
    {
      path: '/partnerConfig',
      name: 'PartnerConfig',
      component: PartnerConfig,
			meta: {
				title: '合伙人设置'
			}
    },
    {
      path: '/addPartner',
      name: 'AddPartner',
      component: AddPartner,
			meta: {
				title: '添加合伙人'
			}
    },
    {
      path: '/editPartner',
      name: 'EditPartner',
      component: EditPartner,
			meta: {
				title: '修改合伙人'
			}
    },
    {
      path: '/inviteFriends',
      name: 'InviteFriends',
      component: InviteFriends,
			meta: {
				title: '邀请好友'
			}
    }
  ]
})
