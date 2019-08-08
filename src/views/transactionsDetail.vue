<template>
  <div class="wrap">
    <div class v-if="noData">Unable to find relevant data</div>
    <el-tabs type="border-card" class="detail-wrap" v-else>
      <el-tab-pane>
        <span slot="label">{{$t('message.Overview')}}</span>
        <div class="detail-title">
          <h1>{{$t('message.TransactionInformation')}}</h1>
        </div>
        <div class="detail-content">
          <ul>
            <li class="li-border">
              <p class="text-left">{{$t('message.TxHash')}}:</p>
              <p class="text-right">{{detailItem.hash}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.TxReceiptStatus')}}:</p>
              <p class="text-right" style="color:rgb(0, 128, 0)">{{$t('message.Success')}}</p>
              <!-- <p class="text-right">{{detailItem.txReceipt || Success}}</p> -->
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.BlockHeight')}}:</p>
              <p class="text-right jump"  @click="toDetail(detailItem.blockNumber, 'number')">{{detailItem.blockNumber}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.TimeStamp')}}:</p>
              <p class="text-right">
                <span v-if="detailItem.timestamp[0] > 0">
                  {{detailItem.timestamp[0]}} days
                  {{detailItem.timestamp[1]}} hours
                </span>
                <span v-else-if="detailItem.timestamp[1] > 0">{{detailItem.timestamp[1]}} hours </span>
                <span v-if="detailItem.timestamp[2] > 0">{{detailItem.timestamp[2]}} mins </span>
                <span>{{detailItem.timestamp[3]}} secs ago</span>
                <span>({{detailItem.timestampUTC}})</span>
              </p>
            </li>
            <li class="li-border">
              <p class="text-left" style="align-self:flex-start;">{{$t('message.From')}}:</p>
              <p class="text-right jump" @click="jumpTo(detailItem.from,'from')">{{detailItem.from}}</p>
            </li>
            <li class="li-border">
              <p class="text-left" style="align-self:flex-start;margin:0">{{$t('message.To')}}:</p>
              <div class="text-right" style="align-self:flex-start;">
                <div>
                  <span v-if="detailItem.status == 'IN'">{{$t('message.Contract')}}</span>
                  <span class="jump" @click="jumpTo(detailItem.to,'to')">  {{detailItem.to}}</span>
                </div>
                <div style="font-size:12px;display:flex;align-items:center;flex-wrap:wrap;margin-top:10px" 
                v-for="item in internalTran" :key="item.transactionHash">
                  <img src="../assets/right.jpg" style="width:12px;height:12px">
                  <span class="inline-block" style="color: #77838f!important;font-size:12px">&nbsp;&nbsp; TRANSFER &nbsp;</span>
                  <span class="inline-block" style="font-size:12px">{{item.value/Math.pow(10, 18)}} AVA </span>
                  <span class="inline-block " style="color: #77838f!important;">&nbsp;{{$t('message.From')}} &nbsp;</span>
                  <span class="jump tran-form">{{item.from}}</span>
                  <span class="inline-block" style="color: #77838f!important;">&nbsp;{{$t('message.To')}}&nbsp;</span>
                  <span class="jump tran-form">{{item.to}}</span>
                </div>
              </div>
            </li>
            <li class="li-border" v-if="transferedArr.length != 0">
              <p class="text-left" style="align-self:flex-start;" v-if="tranbool">{{$t('message.TokensTransfered')}}:</p>
              <div
                class="text-right auto-phone"
                style="overflow-y:auto;max-height:200px;box-shadow:0px -10px 30px 20px #fff inset;"
              >
                <div v-for="(item,index) in transferedArr" :key="index" style="margin-bottom:5px;display:flex;align-items:center;flex-wrap:wrap">
                  <i class="fa fa-caret-right"></i>
                  <span class="inline-block">&nbsp;{{$t('message.From')}}</span>
                  <span class="jump tran-form" @click="jumpToAdderss(item.from,'from',true,item.tokenAddress,item.statusName)">&nbsp;{{item.from}}&nbsp;</span>
                  <span class="inline-block">&nbsp;{{$t('message.To')}}</span>
                  <span class="jump tran-form" @click="jumpToAdderss(item.to,'to',true,item.tokenAddress,item.statusName)">&nbsp;{{item.to}}&nbsp;&nbsp;</span>
                  
                  <span class="tran-form">for&nbsp;{{item.data}}</span>
                  <span class="jump tran-form  tran-width auto-max">&nbsp;ERC-20&nbsp;({{item.statusName}})</span>
                </div>
              </div>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Value')}}:</p>
              <p class="text-right">{{detailItem.value/Math.pow(10, 18)}}  {{detailItem.maincoinName}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.GasLimit')}}:</p>
              <!-- <p class="text-right">{{detailItem.gasLimit || 0}}</p> -->
              <p class="text-right">{{detailItem.gas}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.GasUsedByTransaction')}}:</p>
              <!-- <p class="text-right">{{detailItem.gasUsed || 0}}({{((parseFloat(detailItem.gasUsed)/parseFloat(detailItem.gas))*100).toFixed(2)}}%)</p> -->
              <p class="text-right">{{detailItem.gasUsed || 0}}{{detailItem.gasUsed/detailItem.gas | cost}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.GasPrice')}}:</p>
              <!-- <p class="text-right">0.00000002 Ether (2 Gwei)</p> -->
              <p
                class="text-right"
              >
              {{detailItem.gasPrice | science}} 
               {{detailItem.maincoinName}}({{detailItem.gasPrice/ Math.pow(10, 9)}} Gwei)</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.ActualTxCost/Fee')}}:</p>
              <!-- <p class="text-right">{{detailItem.Actual || 0}} Ether</p> -->
              <p class="text-right">{{(detailItem.gasUsed*( detailItem.gasPrice/ Math.pow(10, 18))).toFixed(8)}}  {{detailItem.maincoinName}}</p>
              <!-- <p class="text-right">{{detailItem.gasUsed | multiple}}  {{detailItem.maincoinName}}</p> -->
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Nonce&{Position}')}}:</p>
              <p class="text-right">{{detailItem.nonce || 0}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.InputData')}}:</p>
              <p class="text-right">
                <textarea
                  :placeholder="detailItem.input"
                  readonly="readonly"
                  style="width:80%;background-color: rgb(238, 238, 238)"
                ></textarea>
              </p>
            </li>
            <li  class="li-border">
              <p class="text-left">{{$t('message.PrivateNote')}}:</p>
              <p class="text-right">{{detailItem.Nonce || 0}}</p>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane >
         <span slot="label">{{$t('message.EventLogs')}}</span>
        <div>
          <p class="log-title">{{$t('message.TransactionReceiptEventLogs')}}</p>
          <div>
            <ul v-for="(item,index) in logArr" :key="index">
              <li class="flex-star">
                <p class="log-id margin-p">[{{index}}]</p>
                <p class="log-address margin-p">{{$t('message.address')}}</p>
                <p class="jump margin-p">{{item.address}}</p>
              </li>
              <li class="flex-star" v-for="(top,index1) in item.topics" :key="index1">
                <p class="log-id margin-p"></p>
                <p class="log-address margin-p" v-if="index1 == 0">{{$t('message.Topics')}}</p>
                <p class="log-address margin-p" v-else></p>
                <p class="name-wrapper margin-p">[{{index1}}]&nbsp;&nbsp;{{top}}</p>
              </li>
              <!-- <li class="flex-star" v-for="(tran,index2) in transferedArr" :key="index2"> -->
              <li class="flex-star">
                <p class="log-id margin-p"></p>
                <p class="log-address margin-p">{{$t('message.Data')}}</p>
                <!-- <p class="log-address" v-if="index2 == 0">Data</p> -->
                <!-- <p class="log-address" v-else></p> -->
                <p class="log-data">
                  <el-dropdown
                    v-if="item.status == 'ZEUS'"
                    size="mini"
                    split-button
                    trigger="click"
                    @command="handleCommand"
                  >
                    {{item.cat}}
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="index+'Hex'">Hex</el-dropdown-item>
                      <el-dropdown-item :command="index+'Number'">Number</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <i class="el-icon-back" style="transform:rotate(180deg);"></i>&nbsp;&nbsp;
                  <span>{{item.data}}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        
      >
      <span slot="label">{{$t('message.Comments')}}</span>
      Make sure to use the "Vote Down" button for any spammy posts, and the "Vote Up" for interesting conversations.</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailItem: [],
      detailItemNew: [],
      logArr: [
        {
          // id: 1,
          // address: "0xbcc394d45c3613530a83cae62c716dc23b7f2152",
          // topIcs:[333,444],
          // data:[]
        }
      ],
      transferedArr: [],
      tranbool: false,
      type: "Hex",
      time1: 0,
      noData: false,
      internalTran: []
    };
  },
  filters: {
    science(num) {
      num = num / Math.pow(10, 18);
      // return num
      let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
      return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
    },
    cost(num){
        let per = '('+(num*100).toString().slice(0,5) + '%)'
        return per == '(0%)' ? '(0.00%)' : per == '(100%)' ? '(100.00%)' : per
    }
  },
  created() {
    let blockid = this.$route.params.blockid;
    this.queryTransactionByValue(blockid);
    this.queryERC20ByTransaction(blockid);
    this.getInternalTran(blockid)
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
        this.queryTransactionByValue(blockid);
        this.queryERC20ByTransaction(blockid);
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
  },
  methods: {
     jumpToTokenDetail(val) {
      this.$router.push({
        name: "tokenDetail",
        params: {
          blockid: val
        }
      });
    },
    toDetail(value, target) {
      let name = '';
      let blockid = value;
      if(target === 'number'){name = 'blockDetail'};
      if(target === 'miner'){name = 'address'};
      if(target === 'txns'){name = 'transactionsPage'};
      this.$router.push({
        name: name,
        params: { blockid: blockid, type: target }
      });
    },
    // queryTransactionByValue
    async queryTransactionByValue(blockid) {
      await this.getTime();
      this.$fetch("/queryTransactionByValue", {
        hash: blockid
      }).then(response => {
        if (response.status == 200) {
          if (response.data.length == 0) {
            this.noData = true;
          } else {
            this.detailItem = response.data[0];
            let newTime = this.detailItem.timestamp;
            this.detailItem.timestampUTC = this.$timestampToTimeUtc(newTime);
            this.detailItem.timestamp = this.$time(this.time1 - newTime);
          }
        }
      });
    },
    //获取内部交易
    getInternalTran(blockid){
      this.$fetch("/queryTransactionByContract", {
        hash: blockid,
      }).then(response => {
        console.log('999999999999'+response)
        if (response.status == 200) {
          // response.data[0] ? this.internalTran = response.data[0] : ''
         this.internalTran = response.data
        }
      });
    },
    // queryERC20ByTransaction
    queryERC20ByTransaction(blockid) {
      this.$fetch("/queryERC20ByTransaction", {
        transactionHash: blockid
      }).then(response => {
        if (response.status == 200) {
          for (let first of response.data) {
            first.cat = "Hex";
            first.data2 = first.data;
          }
          this.logArr = response.data;
          for (let item of this.logArr) {
            item.cat = 'Hex'
            if (
              item.topics.length == 3 &&
              item.topics[0] ==
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            ) {
              this.transferedArr.push({
                from: item.from,
                to: item.to,
                data: this.scienceNum(item.data) / Math.pow(10, 18),
                data2: item.data,
                statusName: item.statusName,
                tokenAddress : item.address
              });
              this.tranbool = true;
            }
          }
          console.log(this.transferedArr);
        }
      });
    },
    jumpTo(index, type) {
      this.$router.push({
        name: "address",
        params: { blockid: index },
        query: { type: type }
      });
    },
    jumpToAdderss(index, type, hide,tokenAddress,statusName) {
      this.$router.push({
        name: "address",
        params: { blockid: index },
        query: { type: type , hide: hide ,tokenAddress:tokenAddress,statusName:statusName }
      });
    },
    handleCommand(command) {
      let i = command.substring(0, 1);
      i = parseInt(i);
      if (command.substring(1) == "Number") {
        this.logArr[i].data = this.scienceNum(this.logArr[i].data);
        this.logArr[i].cat = "Number";
      } else {
        this.logArr[i].data = this.logArr[i].data2;
      }
    },
    // 十六进制转换成十进制
    scienceNum(num) {
      // num = parseInt(num.substring(2), 16);
      // let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
      // num = num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
      // num = parseFloat(num).toPrecision(2);
          
      return parseInt(num,16);
      
    },
    async getTime() {
      let timeRes = await this.$fetch("/date");
      this.time1 = timeRes.data;
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.queryTransactionByValue(this.$route.params.blockid);
      this.queryERC20ByTransaction(this.$route.params.blockid);
    }
  }
};
</script>
<style>
.el-tabs--border-card > .el-tabs__content {
  height: auto !important;
  max-height: 700px !important;
  overflow-y: auto !important;
}
</style>

<style scoped lang='scss'>
// .inline-block{
//   display: inline-block;
// }
.margin-p{
  margin: 10px
}
.li-border{
  border-bottom: 1px solid #e7eaf3;
  padding: 10px 0
}
.name-wrapper {
  cursor: pointer;
  color: #3498db;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tran-form {
  display: inline-block;
  max-width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  overflow: hidden;
  vertical-align: middle;
}
.tran-width{
  min-width: 140px;
  text-align: left
}
.log-id {
  width: 2%;
  text-align: left;
}
.log-address {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: 10%;
}
.log-data {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}
.log-title {
  text-align: left;
  padding: 0.5rem;
  font-weight: bold;
}
h1 {
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 2;
  padding-left: 1.25rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
p {
  margin:  0;
}
.flex-star {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // padding: 0.5rem
}
.detail-wrap {
  border: 1px solid #bce8f1;
}
.detail-title {
  background-color: #d9edf7;
  color: #31708f;
  text-align: left;
}
.detail-content {
  background-color: #fff;
  border: 1px solid #bce8f1;
  padding: 1.25rem;
  box-sizing: border-box;
}
.text-left {
  flex: 1;
  text-align: left;
  font-weight: 600;
}
.text-right {
  flex: 4;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // border: 1px solid black
}
.flex-center {
  flex: 1;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jump {
  color: #3498db;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
@media screen and (max-width: 768px) {
  li {
    display: block;
    // margin-bottom: 5px;
    // margin-top: 10px;
  }
  .text-right {
    margin-top: 10px;
  }
  p {
    margin: 0;
  }
  .auto-phone {
    overflow: auto;
  }
  .auto-max{
    max-width: 140px;
  }
}
</style>

