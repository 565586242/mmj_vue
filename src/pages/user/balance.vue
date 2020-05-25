<template>
  <div class="balance">
    <div class="balance_top">
      <div class="balance_top_left">
        <h5>
          <img src="../../assets/icon/icon_yue03@2x.png" alt />余额
        </h5>
        <p>￥{{money}}</p>
      </div>
      <div class="balance_top_right">
        <router-link to="/recharge">充值</router-link>
        <router-link to="/cash_withdrawal">提现</router-link>
      </div>
    </div>
    <div class="team_table">
      <h5>
        余额明细
        <router-link to="/balance_detailed">全部>></router-link>
      </h5>
      <!-- 暂无明细 -->
      <div class="no_team" :style="{'display':balance_list.length?'none':'block'}">
        <img src="../../assets/icon/icon_zanwumingxi@2x.png" alt />
      </div>
      <!-- 明细列表 -->
      <table :style="{'display':balance_list.length?'table':'none'}">
        <tbody>
          <tr>
            <th>来源/去向</th>
            <th>金额</th>
            <th>状态</th>
            <th>时间</th>
          </tr>
          <tr v-for="(balance,index) in balance_list" :key="index">
            <td style="font-size: .34rem;">{{balance.log_note}}</td>
            <td>{{balance.amount}}</td>
            <td style="font-size: .34rem;">{{balance.type}}</td>
            <td style="width: 2rem;">{{balance.add_time}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "balance",
  data() {
    return {
      money: "",
      balance_list: [],
      showPrise: false
    };
  },
  methods: {
    mygold() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/mygold", {
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "get", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            _this.money = data.data.user_gold;
            _this.balance_list = data.data.gold_log;
          } else {
            mui.alert(data.msg);
          }
        }
      });
    }
  },
  created() {
    if (this.hasWxCallBack) {
      this.mygold();
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
        this.mygold();
      }
    }
  }
};
</script>

<style scoped>
.balance {
  margin-top: .2rem;
}
.team_table {
  margin: 0.3rem;
}

.team_table h5 {
  font-size: 0.4rem;
  font-weight: normal;
  color: #4c4c4c;
}

.team_table table {
  background: #fff;
  width: 100%;
  text-align: center;
  margin-top: 0.2rem;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px #eee;
}

.team_table table tr {
  border-bottom: 1px solid #f1f1f1;
}

.team_table table tr th {
  color: #acacac;
  font-size: 0.36rem;
  font-weight: normal;
  padding: 0.15rem 0;
}

.team_table table tr td {
  line-height: 0.45rem;
  color: #282828;
  font-size: 0.36rem;
  padding: 0.12rem 0;
}

.team_table table tr td:last-child {
  font-size: 0.32rem;
}

.no_team {
  background: #fff;
  height: 12rem;
  border-radius: 5px;
  text-align: center;
  margin-top: 0.2rem;
  box-shadow: 1px 1px 2px 1px #eee;
}

.no_team img {
  height: 2.5rem;
  margin-top: 4.5rem;
}

.team_table h5 {
  font-size: 0.36rem;
  color: #4c4c4c;
  margin-bottom: 0.1rem;
}

.team_table h5 a {
  float: right;
  font-size: 0.32rem;
  color: #acacac;
}

.balance_top {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 9.3067rem;
  height: 2.4rem;
  margin: 0.2667rem auto 0;
  background: no-repeat url(../../assets/img_yue@2x.png) center/cover;
}

.balance_top_left {
  flex: 3;
  -webkit-flex: 3;
  text-align: center;
}

.balance_top_left h5 {
  font-size: 0.36rem;
  color: #fff;
  margin: 0.2rem 0;
}

.balance_top_left h5 img {
  height: 0.35rem;
  margin-right: 0.2rem;
}

.balance_top_left p {
  font-size: 0.5rem;
  color: #fff;
  margin-bottom: 0.2rem;
  margin-top: 0.35rem;
}

.balance_top_right {
  flex: 2;
  text-align: center;
}

.balance_top_right a {
  display: block;
  width: 1.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #fff;
  font-size: 0.36rem;
  border: 1px solid #fff;
  border-radius: 3px;
  margin: 0.1rem auto 0;
}

.balance_top_right a:first-child {
  margin-bottom: 0.25rem;
}
</style>
