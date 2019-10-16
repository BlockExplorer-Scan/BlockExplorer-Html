<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      style="margin:0 auto 30px;"
      :header-cell-style="{color:'black',background:'#f9f9f9'}"
      size="mini"
      :row-style="{fontWeight:600}"
    >
      <template slot="empty">
        <p>{{$t('message.NoData')}}</p>
      </template>
      <el-table-column :label="tableTitle.Height" min-width="80">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
            @click="toDetail(scope.row.number,'number')"
          >{{scope.row.number}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Age" min-width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.timestampUTC}}</p>
            <div slot="reference">
              <span v-if="scope.row.timestamp[0] > 0">
                {{scope.row.timestamp[0]}}  {{$t('message.days')}}
                {{scope.row.timestamp[1]}}  {{$t('message.hours')}}
              </span>
              <span
                v-else-if="scope.row.timestamp[1] > 0"
              >{{scope.row.timestamp[1]}}  {{$t('message.hours')}} </span>
              <span
                v-if="scope.row.timestamp[2] > 0"
              >{{scope.row.timestamp[2]}}  {{$t('message.mins')}} </span>
              <span>{{scope.row.timestamp[3]}} {{$t('message.secsAgo')}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.txn" min-width="50">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
            @click="toDetail(scope.row.number,'transactions')"
          >{{scope.row.transactions.length}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Uncles" min-width="70">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.uncles.length }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Miner" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
            @click="toDetail(scope.row.miner,'miner')"
          >{{scope.row.miner}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.GasUsed" min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gasUsed }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.GasLimit" min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gasLimit }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.AvgGasPrice" min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.AvgGasPrice || 0 }} Gwei</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Reward" min-width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">
            {{scope.row.Reward | changeReward}} 
            {{scope.row.maincoinName}}</span>
          <!-- <span style="margin-left: 10px">{{ scope.row.gasUsed| multiple}} {{scope.row.maincoinName}}</span> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="display:flex;justify-content: space-between">
      <div class="pages">
        <span style="font-size:14px;font-weight:600">{{$t('message.Show')}}</span>
        <el-select v-model="pageSize" size="mini" @change="handleSizeChange">
          <el-option
            v-for="item in pageSizes"
            :key="item.pageSize"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="font-size:14px;font-weight:600">{{$t('message.Page')}}</span>
      </div>
      <div class="pager">
        <!-- <span style="font-size:14px;height:22px;line-height: 22px;">Total:{{total}}</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :layout="layout"
          small
          background
          :prev-text="$t('message.prev')"
          :next-text="$t('message.next')"
        >
          <span style="font-size:14px;margin:0 10px">{{$t('message.Currentpage')}}: {{currentPage}}</span>
        </el-pagination>
        <span>{{$t('message.goto')}}</span>
        <input v-model="inputPage" class="page-input" v-on:keyup.13="handleCurrentChange(inputPage)">
        <!-- <el-button type="primary" size="mini" @click="handleCurrentChange(inputPage)">{{$t('message.sure')}}</el-button> -->
        <button type="primary" size="mini" @click="handleCurrentChange(inputPage)" style="color:#fff;outline:none;border:none;background-color:#337ab7;line-height:20px;font-weight:bold;cursor:pointer">{{$t('message.sure')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "@/bus.js";
export default {
  data() {
    return {
      inputPage:'',
      tableTitle: {
        Height: "Height",
        Age: "Age",
        txn: "txn",
        Uncles: "Uncles",
        Miner: "Miner",
        GasUsed: "GasUsed",
        GasLimit: "GasLimit",
        AvgGasPrice: "Avg.GasPrice",
        Reward: "Reward"
      },
      tableData: [],
      currentPage: parseInt(this.$route.query.page),
      pageStart:
        parseInt(this.$route.query.page) - 1 == 0
          ? 0
          : (parseInt(this.$route.query.page) - 1) * 20 ,
      pageNum: 20,
      pages: 1,
      total: 0,
      height: "40",
      layout: " slot,prev, next",
      time1: 0,
      pageSizes: [
        {
          value: 20,
          label: 20
        },
        {
          value: 30,
          label: 30
        },
        {
          value: 40,
          label: 40
        },
        {
          value: 50,
          label: 50
        }
      ],
      pageSize: 20
    };
  },
  filters: {
    changeReward(val) {
      if(val.toString().includes('.')){
         if(val.toString().includes('.00000')){
          return val.toString().substring(0,1)
        }else{
          return val.toFixed(5)
        }
      }else{
        return val
      }
    }
  },
  created() {
    this.queryblock(this.pageStart, this.pageNum);
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        }
    };
    EventUtil.addHandler(window, "online",  () =>{
         console.log("连上网了！");
          this.queryblock(this.pageStart, this.pageNum);
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
    // this.getTime();
    if (this.$i18n.locale == "cn") {
      // alert(1212)
      this.tableTitle = {
        Height: "高度",
        Age: "塊齡",
        txn: "交易",
        Uncles: "叔區塊",
        Miner: "礦工",
        GasUsed: "燃料用量",
        GasLimit: "燃料上限",
        AvgGasPrice: "平均.燃料價值",
        Reward: "獎勵"
      };
    } else {
      this.tableTitle = {
        Height: "Height",
        Age: "Age",
        txn: "Txn",
        Uncles: "Uncles",
        Miner: "Miner",
        GasUsed: "Gas Used",
        GasLimit: "Gas Limit",
        AvgGasPrice: "Avg Gas Price",
        Reward: "Reward"
      };
    }
  },
  methods: {
    // 每页展示数目
    handleSizeChange(val) {
      // 修改展示数目 重置当前页
      this.pageNum = val;
      this.currentPage = 1;
      this.inputPage = this.currentPage
      this.$router.push({
        path: "/block/blocksPage",
        query: { page: this.currentPage }
      });
      this.queryblock(0, val);
    },
    // 分页
    handleCurrentChange(val) {
      if(!val){
        return
      }
      val = parseInt(val)
      if(val * this.pageNum > 10000){
        this.$message.error(this.$t('message.noMore10000'));
        this.currentPage =  this.currentPage-1
        return
      }
      this.currentPage = val
      let pageNum = this.pageNum;
      let pageStart = (val - 1) * pageNum ;
      this.$router.push({
        path: "/block/blocksPage",
        query: { page: this.currentPage }
      });
      this.queryblock(pageStart, pageNum);
    },
    // 获取block数据
    //  params start:开始数据  number:数据条数
    async queryblock(strat, number) {
      await this.getTime();
      this.$fetch("/query/block/data", {
        pageStart: strat,
        pageNum: number
      }).then(response => {
        if (response.status == 200) {
          this.tableData = response.data;
          for (let i = 0; i < response.data.length; i++) {
            let newTime = this.tableData[i].timestamp;
            this.tableData[i].timestamp = this.$time(this.time1 - newTime);
            this.tableData[i].timestampUTC = this.changeTimeInBlcok(newTime);
            // this.tableData[i].timestampUTC = this.$timestampToTimeUtc(newTime);
            this.tableData[i].Reward = parseFloat(this.tableData[i].blockReward)+this.tableData[i].gasUsed/Math.pow(10,18)
          }
        }
      });
    },
    toDetail(index, type) {
      if (type == "miner") {
        this.$router.push({
          name: "address",
          params: { blockid: index, type: type }
        });
      } else if (type == "transactions") {
        this.$router.push({
          name: "transactionsPage",
          params: { blockid: index },
          query: { blockid: index }// 2019.8.14
        });
      } else {
        this.$router.push({
          name: "blockDetail",
          params: { blockid: index }
        });
      }
    },
    changeTimeInBlcok(timestamp){
      let date = new Date(timestamp * 1000);
      let Y = date.getFullYear() + "-";
      let M =
          date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1) + "-"
              : date.getMonth() + 1 + "-";
      let D =
          date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      let h =
          date.getHours() < 10
              ? "0" + date.getHours() + ":"
              : date.getHours() + ":";
      let m =
          date.getMinutes() < 10
              ? "0" + date.getMinutes() + ":"
              : date.getMinutes() + ":";
      let s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s + ' (UTC)';
    },
    getTime() {
      this.$fetch("/date").then(res => {
        console.log(res);
        this.time1 = res.data;
      });
    }
  },
  mounted() {
    // this.inputPage = this.currentPage
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tableTitle = {
          Height: "高度",
          Age: "塊齡",
          txn: "交易",
          Uncles: "叔區塊",
          Miner: "礦工",
          GasUsed: "燃料用量",
          GasLimit: "燃料上限",
          AvgGasPrice: "平均.燃料價值",
          Reward: "獎勵"
        };
      } else {
        this.tableTitle = {
          Height: "Height",
          Age: "Age",
          txn: "Txn",
          Uncles: "Uncles",
          Miner: "Miner",
          GasUsed: "Gas Used",
          GasLimit: "Gas Limit",
          AvgGasPrice: "Avg Gas Price",
          Reward: "Reward"
        };
      }
    });
  },
  watch: {}
};
</script>
<style scoped>
.el-button--primary{
  background-color: #337ab7 !important;
  /* line-height: 22px;
  height: 22px; */
}
.page-input{
  height: 22px;
  padding: 0 3px;
  border: 1px solid #dcdfe6;
  color: #602666;
  outline: 0;
  text-align: center;
  margin: 0 5px;
  border-radius:4px;
  width: 50px;
}
.name-wrapper {
  width: 100%;
  cursor: pointer;
  color: #3498db;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
}
.el-table {
  width: auto;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: auto;
}
.el-select {
  width: 70px;
  margin: 0 5px;
}
.pager {
  display: flex;
  align-items: center;
}
</style>
