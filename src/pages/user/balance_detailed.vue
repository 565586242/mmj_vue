<template>
  <div class="balance_detailed">
    <div class="team_table">
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
  name: "balance_detailed",
  data() {
    return {
      balance_list: []
    };
  },
  methods: {
    mygold() {
      let _this = this;
      let token = localStorage.getItem("token");
      mui.ajax(config.host + "/mygoldlog", {
        dataType: "json", //服务器返回json格式数据
        headers: {
          token: token
        },
        type: "get", //HTTP请求类型
        success: function(data) {
          if (data.code == 200) {
            _this.balance_list = data.data;
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
.team_table {
  margin-top: .2rem;
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
  width: 9.3067rem;
  height: 12rem;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  box-shadow: 1px 1px 2px 1px #eee;
}
.no_team img {
  height: 2.5rem;
  margin-top: 2.5rem;
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
</style>
