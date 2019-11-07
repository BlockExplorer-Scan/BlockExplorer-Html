<template>
  <el-table
    :data="tableData"
    style="margin:0 auto 30px;"
    :header-cell-style="{color:'black'}"
    size="mini"
  >
    <template slot="empty">
      <p>{{$t('message.NoData')}}</p>
    </template>
    <el-table-column :label="$t('message.TxHash')" min-width="100" v-if="tableType == 'Transactions'">
      <template slot-scope="scope">
        <div
          slot="reference"
          class="name-wrapper"
          @click="$emit('detail',{val:scope.row.hash,type:'hash'})"
        >{{scope.row.hash}}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.TxHash')" min-width="180" v-if="tableType == 'Erc20'">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper" style="" @click="$emit('detail',{val:scope.row.transactionHash,type:'hash'})">{{scope.row.transactionHash}}</div>
        <!-- @click="$emit('detail',{val:scope.row.blockHash,type:'hash'})" -->
      </template>
    </el-table-column>
    <el-table-column
      :label="$t('message.ParentTxHash')"
      min-width="180"
      v-if="tableType == 'Internal'"
    >
      <template slot-scope="scope">
        <div
          slot="reference"
          class="name-wrapper"
          @click="$emit('detail',{val:scope.row.transactionHash,type:'hash'})"
        >{{scope.row.transactionHash}}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.Block')" min-width="80" v-if="tableType != 'Erc20'">
      <template slot-scope="scope">
        <div
          slot="reference"
          class="name-wrapper"
          @click="$emit('detail',{val:scope.row.blockNumber,type:'blockNumber'})"
        >{{scope.row.blockNumber}}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.Age')" min-width="140">
      <template slot-scope="scope">
        <!-- <div slot="reference">{{scope.row.timestamp || 0}}</div> -->
        <div v-if="showTime" @click="changeTime" class="time-wrapper">{{scope.row.timestampUTC}}</div>
        <div class="time-wrapper" v-else @click="changeTime">
          <span v-if="scope.row.timestamp[0] > 0">
            {{scope.row.timestamp[0]}} {{$t('message.days')}}
            {{scope.row.timestamp[1]}} {{$t('message.hours')}}
          </span>
          <span v-else-if="scope.row.timestamp[1] > 0"> {{scope.row.timestamp[1]}} {{$t('message.hours')}}</span>
          <span v-if="scope.row.timestamp[2] > 0"> {{scope.row.timestamp[2]}} {{$t('message.mins')}}</span>
          <span> {{scope.row.timestamp[3]}} {{$t('message.secsAgo')}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.From')" min-width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px" v-if="scope.row.inOut">{{ scope.row.from }}</span>
        <div
          slot="reference"
          class="name-wrapper"
          @click="$emit('detail',{val:scope.row.from,type:'from'})"
          v-else
        >{{ scope.row.from }}</div>
      </template>
    </el-table-column>
    <el-table-column v-if="tableType == 'Transactions' || tableType == 'Erc20'">
      <template slot-scope="scope">
        <span class="statu" :class="{status : !scope.row.inOut}">{{ scope.row.status == 'IN'? $t('message.InStatu') : $t('message.OutStatu') }}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="tableType == 'Internal'">
      <template slot-scope>
        <span>
          <i class="fa fa-long-arrow-right"></i>
        </span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.To')" min-width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px" v-if="!scope.row.inOut">{{ scope.row.to }}</span>
        <div
          slot="reference"
          class="name-wrapper"
          @click="$emit('detail',{val:scope.row.to,type:'to'})"
          v-else
        >{{ scope.row.to }}</div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.Value')" min-width="140" v-if="!hideValue">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.value/Math.pow(10, 18) || 0}}&nbsp;{{unit}}</span>
      </template>
    </el-table-column>
      <el-table-column :label="$t('message.Quantity')" min-width="80" v-if="hideValue">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.value/Math.pow(10, 18) || 0}}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.TxFee')" min-width="100" v-if="tableType == 'Transactions'">
      <template slot-scope="scope">
        <!-- <span style="margin-left: 10px">{{ (scope.row.gasUsed || 0) | multiple}}</span> -->
        <span style="margin-left: 10px">{{ (scope.row.gasUsed*(scope.row.gasPrice/ Math.pow(10, 18))).toFixed(8)}}</span>
      </template>
    </el-table-column>
    <el-table-column :label="$t('message.Token')" min-width="150" v-if="tableType == 'Erc20'">
      <template slot-scope="scope">
        <div slot="reference" class="name-wrapper">{{scope.row.statusName || 0}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import Bus from "@/bus.js";
export default {
  props: {
    showTime:false,
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    inOut: {
      type: Boolean,
      default: true
    },
    tableType: {
      type: String,
      default: ""
    },
    hideValue:{
      type: Boolean,
      default :false
    }
  },
  data() {
    return {
      tableTitle: {
        TxHash: "TxHash",
        ParentTxHash: "ParentTxHash",
        Block: "Block",
        Age: "Age",
        From: "From",
        To: "To",
        Value: "value",
        Token: "Token",
        TxFee:"TxFee",
        Quantity:"Quantity"
      },
      unit:''
    };
  },
  created() {
    if (this.$i18n.locale == "cn") {
      this.tableTitle = {
        Quantity:"數量",
        TxHash: "交易哈希",
        Block: "區塊",
        ParentTxHash: "父哈希",
        Age: "塊齡",
        From: "發送方",
        To: "接收方",
        Value: "價值",
        Token: "代幣",
        TxFee:"交易費用"
      };
    } else {
      this.tableTitle = {
        Quantity:"Quantity",
        TxHash: "TxHash",
        ParentTxHash: "ParentTxHash",
        Block: "Block",
        Age: "Age",
        From: "From",
        To: "To",
        Value: "value",
        Token: "Token",
        TxFee:"TxFee"
      };
    }
  },
  mounted() {
    this.getUnit()
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tableTitle = {
          TxHash: "交易哈希",
          Block: "區塊",
          ParentTxHash: "父哈希",
          Age: "塊齡",
          From: "發送方",
          To: "接收方",
          Value: "價值",
          Token: "代幣",
          TxFee:"交易費用"
        };
      } else {
        this.tableTitle = {
          TxHash: "TxHash",
          ParentTxHash: "ParentTxHash",
          Block: "Block",
          Age: "Age",
          From: "From",
          To: "To",
          Value: "value",
          Token: "Token",
          TxFee:"TxFee"
        };
      }
    });
  },
  methods: {
    // 改变块龄age显示
    changeTime(){
      this.showTime = !this.showTime
    },
    getUnit(){
      
       this.$fetch("/Socket/getMainCoinName").then(response => {
        if (response.status == 200) {
         this.unit = response.data
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.name-wrapper {
  cursor: pointer;
  color: #3498db;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.time-wrapper{
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
span {
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
}

.statu {
  display: inline-block;
  padding: 0 0.3125rem;
  background-color: #e67e22;
  border-radius: 8px;
  font-size: 12px;
  color: #fff;
}
.status {
  background-color: #5cb85c;
}
</style>
