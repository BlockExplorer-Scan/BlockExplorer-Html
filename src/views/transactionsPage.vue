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
      <el-table-column :label="tableTitle.TxHash"  show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <div slot="reference" class="name-wrapper" @click="toDetail(scope.row.hash,'hash')">
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            {{scope.row.hash}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Block" min-width="80">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
            @click="toDetail(scope.row.blockNumber,'number')"
          >
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            {{scope.row.blockNumber}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Age" min-width="160" >
        <template slot-scope="scope" >
          <el-popover trigger="hover" placement="top">
            <p>{{scope.row.timestampUTC}}</p>
            <div slot="reference" class="time-wrappe">
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
              <span v-if="scope.row.timestamp[0] > 0">
                {{scope.row.timestamp[0]}} {{$t('message.days')}}
                {{scope.row.timestamp[1]}} {{$t('message.hours')}}
              </span>
              <span
                v-else-if="scope.row.timestamp[1] > 0"
              >{{scope.row.timestamp[1]}} {{$t('message.hours')}} </span>
              <span
                v-if="scope.row.timestamp[2] > 0"
              >{{scope.row.timestamp[2]}} {{$t('message.mins')}} </span>
              <span>{{scope.row.timestamp[3]}} {{$t('message.secsAgo')}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.From"  show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <div slot="reference" class="name-wrapper" @click="toDetail(scope.row.from,'from')">
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            {{scope.row.from}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.To"  show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper" @click="toDetail(scope.row.to,'to')">
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            {{scope.row.to}}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Value">
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.value">{{ scope.row.value /Math.pow(10, 18) }} {{scope.row.maincoinName}} </span>
          <span style="margin-left: 10px" v-else>{{ scope.row.valueStr /Math.pow(10, 18) }} {{scope.row.maincoinName}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.TxFee" min-width="150">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <!-- <span style="margin-left: 10px">{{ (scope.row.gasUsed*0.00000002).toFixed(8) }}</span> -->
          <span style="margin-left: 10px">{{(scope.row.gasUsed*(scope.row.gasPrice/ Math.pow(10, 18))).toFixed(8)}}</span>
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
        <span style="font-size:14px;font-weight:600">{{$t('message.Currentpage')}}: {{currentPage}}</span>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :layout="layout"
          small
          background
          prev-text="prev"
          next-text="next"
        >
          <!-- <span style="margin:0 10px">Total:{{total}}</span> -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>

import Bus from "@/bus.js";
export default {
  data() {
    return {
      tableTitle: {
        TxHash: "TxHash",
        Block: "Block",
        Age: "Age",
        From: "From",
        To: "To",
        Value: "value",
        TxFee: "[TxFee]"
      },
      tableData: [],
      currentPage: parseInt(this.$route.query.page),
      pageStart: (parseInt(this.$route.query.page)-1) == 0 ? 0 : (parseInt(this.$route.query.page)-1)*20,
      pageNum: 20,
      pages: 1,
      layout: "prev, next",
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
      pageSize: 20,
      time1: 0
    };
  },
  created() {
    let blockid = this.$route.params.blockid;
    if (blockid != null) {
      this.queryTransactionByValue(blockid);
    } else {
      this.querytransaction(this.pageStart, this.pageNum);
    }
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
      if (blockid != null) {
        this.queryTransactionByValue(blockid);
      } else {
        this.querytransaction(this.pageStart, this.pageNum);
      }
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
    if(this.$i18n.locale == 'cn'){
      // alert(1212)
       this.tableTitle = {
          TxHash: "交易哈希",
          Block: "區塊",
          Age: "块龄",
          From: "发送方",
          To: "接收方",
          Value: "价值",
        TxFee: "[交易费用]"
        };
    }else{
      this.tableTitle = {
          TxHash: "TxHash",
          Block: "Block",
          Age: "Age",
          From: "From",
          To: "To",
          Value: "value",
        TxFee: "[TxFee]"
        };
    }
  },
  mounted() {
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tableTitle = {
          TxHash: "交易哈希",
          Block: "區塊",
          Age: "块龄",
          From: "发送方",
          To: "接收方",
          Value: "价值",
        TxFee: "[交易费用]"
        };
      } else {
        this.tableTitle = {
          TxHash: "TxHash",
          Block: "Block",
          Age: "Age",
          From: "From",
          To: "To",
          Value: "value",
        TxFee: "[TxFee]"
        };
      }
    });
  },
  methods: {
    // 每页展示条目
    handleSizeChange(val) {
      // 修改展示数目 重置当前页
      this.pageNum = val;
      this.currentPage = 1;
      this.$router.push({ path:'/transtion/transactionsPage', query: { page: this.currentPage }})
      this.querytransaction(0, val);
    },
    // 分页
    handleCurrentChange(val) {
      let that = this;
      let pageNum = this.pageNum;
      let pageStart = (val - 1) * pageNum ;
      this.$router.push({ path:'/transtion/transactionsPage', query: { page: this.currentPage }})
      this.querytransaction(pageStart, pageNum);
    },
    // 获取数据 params start :开始数据 number :数据条目
    async querytransaction(start, number) {
      await this.getTime();
      this.$fetch("/query/transaction/data", {
        pageStart: start,
        pageNum: number
      }).then(response => {
        if (response.status == 200) {
          this.tableData = response.data;
          for (let i = 0; i < response.data.length; i++) {
            let newTime = this.tableData[i].timestamp;
            this.tableData[i].timestamp = this.$time(this.time1 - newTime);
            this.tableData[i].timestampUTC = this.$timestampToTimeUtc(newTime);
          }
        }
        console.log(this.tableData)
      });
    },

    queryTransactionByValue(blockid) {
      this.$fetch("/queryTransactionByValue", {
        blockNumber: blockid
      }).then(response => {
        if (response.status == 200) {
          this.tableData = response.data;
          for (let i = 0; i < response.data.length; i++) {
            let newTime = this.tableData[i].timestamp;
            this.tableData[i].timestamp = this.$timestampToTime(newTime);
          }
        }
      });
    },
    toDetail(index, type) {
      // console.log(e)
      if (type == "hash") {
        this.$router.push({
          name: "transactionsDetail",
          params: { blockid: index }
        });
      } else if (type == "number") {
        this.$router.push({
          name: "blockDetail",
          params: { blockid: index }
        });
      } else {
        this.$router.push({
          name: "address",
          params: { blockid: index },
          query: { type: type }
        });
      }
    },
    async getTime() {
      let timeRes = await this.$fetch("/date");
      this.time1 = timeRes.data;
    }
  }
};
</script>
<style scoped>
.cell{
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.blue {
  cursor: pointer;
  color: #3498db;
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
.el-select {
  width: 60px;
  margin: 0 5px;
}
.pager {
  display: flex;
  align-items: center;
}
.el-table {
  width: auto;
}
.el-table__body-wrapper,
.el-table__footer-wrapper,
.el-table__header-wrapper {
  width: auto;
}
</style>
