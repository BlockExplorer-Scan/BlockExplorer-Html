<template>
  <div style="margin-bottom:15px">
    <el-table
      :data="transfers"
      style="margin:0 auto 30px;"
      :header-cell-style="{color:'black',background:'#f9f9f9'}"
      :header-row-style="{color:'#333'}"
      size="mini"
      :row-style="{fontWeight:600}"
    >
      <template slot="empty">
        <p>NoData</p>
      </template>
      <el-table-column :label="tableTitle.TxHash" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span
            class="ellipsis jump name-wrapper"
            slot="reference"
            style="font-size:10.5px"
            @click="toDetail(scope.row.transactionHash,'hash')"
          >{{scope.row.transactionHash}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Age" min-width="240">
        <template slot-scope="scope">
          <!-- <div slot="reference" class="color333 name-wrapper" v-if='scope.row.timestamp'> -->
          <div v-if="showTime" @click="changeTime">{{scope.row.timestampUTC}}</div>
          <div class="color333 name-wrapper" slot="reference" v-else @click="changeTime">
          <!-- <div class="color333 name-wrapper" slot="reference" v-if="scope.row.timestamp"> -->
            <span v-if="scope.row.timestamp[0] > 0">
              {{scope.row.timestamp[0]}} days
              {{scope.row.timestamp[1]}} hours
            </span>
            <span v-else-if="scope.row.timestamp[1] > 0">{{scope.row.timestamp[1]}} hours</span>
            <span v-if="scope.row.timestamp[2] > 0">{{scope.row.timestamp[2]}} mins</span>
            <span>{{scope.row.timestamp[3]}} secs ago</span>
          </div>
          <!-- <div v-else>0</div> -->
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.From" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span slot="reference"
            class="ellipsis jump name-wrapper"
            @click="jump(scope.row.from,'from')"
          >{{scope.row.from}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="50">
        <template slot-scope="scope">
          <div style="text-align: center;line-height: 1;}">
            <img src="../../assets/right_arrow.png" width="20px" class='imgC'>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column :label="tableTitle.to" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="ellipsis jump name-wrapper" slot="reference" @click="jump(scope.row.to,'to')">{{scope.row.to}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Quantity" min-width="180">
        <template slot-scope="scope">
          <!-- <span class="color333 name-wrapper" slot="reference">{{scope.row.data/Math.pow(10, 18)}}</span> -->
          <span class="color333 name-wrapper" slot="reference">{{scope.row.data}}</span>
          <!-- <span class="color333 name-wrapper" slot="reference">{{parseInt(scope.row.data,16)/Math.pow(10, 18)}}</span> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Bus from "@/bus.js";
export default {
  props: ["tokens"],
  created() {},
  data() {
    return {
      showTime:false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableTitle: {
        TxHash: "TxHash",
        Age: "Age",
        From: "From",
        to: "to",
        Quantity: "Quantity"
      }
    };
  },
  created() {
    if (this.$i18n.locale == "cn") {
      // alert(1212)
      this.tableTitle = {
        TxHash: "交易哈希",
        Age: "块龄",
        From: "发送方",
        to: "接收方",
        Quantity: "數量"
      };
    } else {
      this.tableTitle = {
        TxHash: "TxHash",
        Age: "Age",
        From: "From",
        to: "to",
        Quantity: "Quantity"
      };
    }
  },
  mounted() {
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tableTitle = {
          TxHash: "交易哈希",
          Age: "块龄",
          From: "发送方",
          to: "接收方",
          Quantity: "數量"
        };
      } else {
        this.tableTitle = {
          TxHash: "TxHash",
          Age: "Age",
          From: "From",
          to: "to",
          Quantity: "Quantity"
        };
      }
    });
  },
  computed: {
    transfers() {
      return this.tokens;
    }
  },
  methods: {
    // 改变块龄age显示
    changeTime(){
      this.showTime = !this.showTime
    },
    jump(val, type) {
      this.$router.push({
        name: "address",
        params: { blockid: val },
        query: { type, type }
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
  }
};
</script>
<style scoped lang='scss'>
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
.jump {
  color: #0193c9;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.color333 {
  color: #333;
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
