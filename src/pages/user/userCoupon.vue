<template>
  <div>
    <div class="team_table">
      <!-- 暂无明细 -->
      <div class="no_team" :style="{'display':listData.length?'none':'block'}">
        <img src="../../assets/icon/icon_zanwumingxi@2x.png" alt />
      </div>
      <!-- 明细列表 -->
      <table :style="{'display':listData.length?'table':'none'}">
        <tbody>
        <tr>
          <th>来源/去向</th>
          <th>金额</th>
          <th>状态</th>
          <th>时间</th>
        </tr>
        <tr v-for="(list,index) in listData" :key="index">
          <td style="font-size: .34rem;">{{list.log_note}}</td>
          <td>{{list.amount}}</td>
          <td style="font-size: .34rem;">{{list.type}}</td>
          <td style="width: 2rem;">{{list.add_time}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserCoupon",
    data(){
      return {
        listData: []
      }
    },
    methods: {
      expVcher(){
        let _this = this;
        let token = localStorage.getItem("token");
        mui.ajax(config.host + "/expVcher ", {
          dataType: "json", //服务器返回json格式数据
          headers: {
            token: token
          },
          type: "post", //HTTP请求类型
          success: function(data) {
            if (data.code === 200) {
              _this.listData = data.data;
            } else {
              mui.alert(data.msg);
            }
          }
        });
      }
    },
    created() {
      if (this.hasWxCallBack) {
        this.expVcher();
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
          this.expVcher();
        }
      }
    }
  }
</script>

<style scoped>

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
</style>
