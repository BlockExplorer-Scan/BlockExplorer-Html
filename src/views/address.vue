<template>
  <div class="address-wrap">
    <!-- <div style="text-align:left;font-size:13px;padding-left:10px">
      <span style="font-weight:600">Etherscan</span> - Sponsored slots available.
      <span class="jump">Book your slot here!</span>
    </div> -->
    <div class="overview">
      <div class="overview-item-wrap">
        <div class="overview-item noborder">
          <p>
            <span v-if="inOut">Contract</span>
            <span>{{$t('message.Overview')}}</span>
          </p>
          <p>
            <!-- <img src="https://etherscan.io/images/qrcode2.png" style="margin-top: -3px"> -->
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Balance')}}:</p>
          <p class="flex3">{{balance}} {{maincoinName}}</p>
        </div>
        <!-- <div class="overview-item">
          <p class="flex2">{{$t('message.EtherValue')}}:</p>
          <p class="flex3">${{value}}</p>
        </div> -->
        <div class="overview-item">
          <p class="flex2">{{$t('message.Transactions')}}:</p>
          <p class="flex3">{{txns}} txns</p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Token')}}:</p>
          <div class="flex3" style="border:1px solid #ddd;padding:5px 0;">
            <el-dropdown @command="handleCommand" :hide-on-click="noHide" trigger="click"  placement="bottom-end">
            <!-- <el-dropdown @command="handleCommand" :hide-on-click="noHide" trigger="click" :split-button="isButton" placement="bottom-end"> -->
              <div class="el-dropdown-link pdd-right" style="display:flex;justify-content: space-between;width:100%;padding:0 20px;box-sizing:border-box">
                <div>
                  $0.00 <span style="padding:3px 5px;background:#3498db;color:#fff;font-weight:bold">{{tokenCount}}</span>
                </div>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a"><input style="width:290px;padding-left:10px" placeholder="Search for Token Name" v-model="searchWord"/></el-dropdown-item>
                <el-dropdown-item command="a"><p style="background:rgba(231,234,243,.5);padding-left:10px;font-weight:bold">>ERC-20 Tokens ({{tokenCount}})</p></el-dropdown-item>
                <el-dropdown-item divided v-if="searchTokenArr.length == 0 && searchWord == ''" v-for="item in tokenArr" :key="item.tokenAddress" command="item.tokenAddress">
                  <div class="select-container">
                    <div>
                      <p class="top-color">{{item.tokenName}}</p>
                      <p class="bottom-color">{{item.tokenNumber| science}}  {{item.tokenName}}</p>
                    </div>
                    <div>
                      <p class="top-color">$0.00</p>
                      <!-- <p class="bottom-color">$0.00</p> -->
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided v-if="searchTokenArr.length>0" v-for="item in searchTokenArr" :key="item.tokenAddress" command="item.tokenAddress">
                  <div class="select-container">
                    <div>
                      <p class="top-color">{{item.tokenName}}</p>
                      <p class="bottom-color">{{item.tokenNumber| science}}</p>
                    </div>
                    <div>
                      <p class="top-color">$0.00</p>
                      <!-- <p class="bottom-color">$0.00</p> -->
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item command="c" divided v-if="searchTokenArr.length == 0 && searchWord == ''">
                  <div class="select-container">
                    <div>
                      <p class="top-color" style="font-weight:bold">Subtotal:</p>
                    </div>
                    <div>
                      <p class="top-color">$0.00</p>
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item command="d" disabled v-if="searchWord != '' && searchTokenArr.length == 0"><p style="text-align:center;font-size:24px;line-height:44px">No Such Data</p></el-dropdown-item>
                <!-- <el-dropdown-item command="e" disabled>蚵仔煎</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <!-- <div class="overview-item" v-if="!inOut">
          <p class="flex2">{{$t('message.TokenTracker')}}:</p>
          <p class="flex3">
            <span
              class="jump text-hide"
              style="max-width:300px"
            >{{$t('message.EthereumPower')}} (EPWR)</span>
          </p>
        </div> -->
      </div>
      <div class="overview-item-wrap hide">
        <div class="overview-item noborder">
          <p>{{$t('message.Misc')}}:</p>
          <p style>
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary">
                Loan
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div style="text-align:left">
                  <p style="color:#999;text-align:right">Sponsored</p>
                  <p class="text-hide" style="cursor:pointer;color:#3498db">
                    <img src="https://etherscan.io/images/gen/nexo_20.png" alt> Nexo Nexo - Instant Crypto Loans
                  </p>
                  <p style="color:#777">Get instant cash in 40+ fiat currencies</p>
                  <p style="color:#777">using crypto as collateral without selling it.</p>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown trigger="click" style="background: #95a5a6;">
              <el-button
                size="mini"
                type="primary"
                style="background: #95a5a6;border-color:#95a5a6"
              >
                <i class="fa fa-align-justify"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  Validate Account Balance
                  <i class="fa fa-check-square"></i>
                </el-dropdown-item>
                <el-dropdown-item disabled>
                  <i class="fa fa-sticky-note-o"></i> View Private Note
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="fa fa-print"></i> Print Account Report
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="fa fa-history"></i> Check Previous Balance
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.AddressWatch')}}:</p>
          <p class="flex3">
            <span class="add-list">{{$t('message.AddToWatchList')}}</span>
          </p>
        </div>
        <div class="overview-item" v-if="inOut">
          <p class="flex2">Contract Creator:</p>
          <p class="flex3">
            <span class="jump text-hide">{{a}}</span> at txn
            <span class="jump text-hide">{{a}}</span>
          </p>
        </div>
        <div class="overview-item" v-if="inOut">
          <p class="flex2">Token Balance:</p>
          <p class="flex3">
            <span class="token-balance">
              View ($0.00)
              <i class="fa fa-caret-down"></i>
            </span>
            <img src="https://etherscan.io/images/expand4.png" alt style="cursor: pointer;">
          </p>
        </div>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="tabTitle.Transactions">
        <itable :tableData="tableData" :inOut="inOut" :tableType="Transactions" @detail="toDetail"/>
        <!-- <iPaging @refreshList="refresTransactionList" /> -->
        <iPaging @refreshList="refresTransactionList" :pageCount='TransactionsNum'/>
      </el-tab-pane>
      <el-tab-pane :label="tabTitle.InternalTxns">
        <itable :tableData="tableData2" :tableType="Internal" @detail="toDetail"/>
        <iPaging @refreshList="refresMainCoinList" :pageCount='intNum'/>
      </el-tab-pane>
      <el-tab-pane :label="tabTitle.Erc20TokenTxns">
        <itable :tableData="tableData3" :tableType="Erc20" @detail="toDetail"/>
        <iPaging @refreshList="refresERC20List" :pageCount='tokenNum'/>
      </el-tab-pane>
      <!-- <el-tab-pane :label="tabTitle.MinedBlocks">Mined Blocks</el-tab-pane>
      <el-tab-pane :label="tabTitle.MinedUncles">Mined Uncles</el-tab-pane>
      <el-tab-pane :label="tabTitle.Comments">Comments (148)</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import Bus from "@/bus.js";
import itable from "@/components/tabel.vue";
import iPaging from "@/components/paging.vue";
export default {
  components: {
    itable,
    iPaging
  },
  data() {
    return {
      searchWord:'',
      tokenCount:0,
      tokenArr:[],
      searchTokenArr:[],
      isButton:true,
      noHide:false,
      tabTitle:{
        Transactions:'Transactions',
        InternalTxns:'Internal Txns',
        Erc20TokenTxns:'Erc20 Token Txns',
        MinedBlocks:'Mined Blocks',
        MinedUncles:'Mined Uncles',
        Comments:'Comments'
      },
      tableData: [],
      Transactions: "Transactions",
      Internal: "Internal",
      Erc20: "Erc20",
      tableData2: [],
      tableData3: [],
      inOut: false,
      a: "0000000",
      blockid: this.$route.params.blockid,
      type: this.$route.query.type,
      pageStart: 0,
      pageNum: 25,
      balance: 0,
      txns: 0,
      value: 0,
      fromOrTo: true,
      maincoinName:'',
      time1:0,
      TransactionsNum:null,
      intNum:null,
      tokenNum:null,
    };
  },
  filters:{
    science(num) {
      num = num / Math.pow(10, 18);
      // return num
      let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
      return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
    },
  },
    watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.blockid= this.$route.params.blockid,
      this.type= this.$route.query.type,
      this.queryTransactionByValue();
      this.queryMainCoin();
      this.queryERC20();
      this.queryTxsCounts();
      this.getTokenBalance();
    },
    searchWord(){
      console.log(this.searchWord)
      if(this.searchWord){
        let arr = []
        for(let item of this.tokenArr){
            if(item.tokenAddress.indexOf(this.searchWord) >-1 || item.tokenNumber.indexOf(this.searchWord) >-1 || item.tokenName.indexOf(this.searchWord) >-1){
              arr.push(item)
            }
        }
        this.searchTokenArr = arr
      }else{
        this.searchTokenArr = []
      }
    }
  },
  created() {
    this.queryTransactionByValue();
    this.queryMainCoin();
    this.queryERC20();
    this.queryTxsCounts();
    this.getTokenBalance();
    if(this.$i18n.locale == 'cn'){
      // alert(1212)
       this.tabTitle={
        Transactions:'交易',
        InternalTxns:'内部交易',
        Erc20TokenTxns:'Erc20代幣交易',
        MinedBlocks:'已挖区块',
        MinedUncles:'已挖叔区块',
        Comments:'评论'
      }
    }else{
       this.tabTitle={
        Transactions:'Transactions',
        InternalTxns:'Internal Txns',
        Erc20TokenTxns:'Erc20 Token Txns',
        MinedBlocks:'Mined Blocks',
        MinedUncles:'Mined Uncles',
        Comments:'Comments'
      }
    }
  },
  mounted(){
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tabTitle={
        Transactions:'交易',
        InternalTxns:'内部交易',
        Erc20TokenTxns:'Erc20代幣交易',
        MinedBlocks:'已挖区块',
        MinedUncles:'已挖叔区块',
        Comments:'评论'
      }
      } else {
        this.tabTitle={
        Transactions:'Transactions',
        InternalTxns:'Internal Txns',
        Erc20TokenTxns:'Erc20 Token Txns',
        MinedBlocks:'Mined Blocks',
        MinedUncles:'Mined Uncles',
        Comments:'Comments'
      }
    }});
  },
  methods: {
    handleCommand(command) {
        // this.$message('click on item ' + command);
      },
    // 页面跳转 value.val 跳转参数  value.type 跳转类型
    toDetail(value) {
      let that = this;
      let blockid = value.val;
      this.blockid = blockid;
      this.type = value.type;
      if (value.type == "to" || value.type == "from") {
        this.queryTransactionByValue();
        this.queryMainCoin();
        this.queryERC20();
        this.queryTxsCounts();
        this.$router.push({
          name: "address",
          params: { blockid: blockid },
          query: { type: value.type }
        });
      }
      if (value.type == "blockNumber") {
        this.$router.push({
          name: "blockDetail",
          params: { blockid: blockid }
        });
      }
      if (value.type == "hash") {
        this.$router.push({
          name: "transactionsDetail",
          params: { blockid: blockid }
        });
      }
    },
    // queryTransactionByValue
    async queryTransactionByValue(val) {
      await this.getTime();
      await this.queryTxsCounts();
      let pageNum = this.pageNum;
      let pageStart = val == undefined ? 0 : (val - 1) * pageNum ;
      let param = {};
      // 判断address的入口参数
      if ("type" in this.$route.params) {
        if (this.fromOrTo) {
          param = {
            from: this.blockid,
            pageStart: pageStart,
            pageNum: pageNum
          };
        } else {
          param = {
            to: this.blockid,
            pageStart: pageStart,
            pageNum: pageNum
          };
        }
      }else{
        param = {
            address: this.blockid,
            pageStart: pageStart,
            pageNum: pageNum
          };
      }
      if (this.type === "from") {
        param = { from: this.blockid, pageStart: pageStart, pageNum: pageNum };
      }
      if (this.type === "to") {
        param = { to: this.blockid, pageStart: pageStart, pageNum: pageNum };
      }
      // console.log(param)
      this.$fetch("/queryTransactionByValue", param).then(response => {
        if (response.status == 200) {
          this.tableData = response.data;
          if (response.data.length == 0 && this.fromOrTo) {
            this.fromOrTo = false;
            this.queryTransactionByValue();
          } else {
            for (let i = 0; i < this.tableData.length; i++) {
              let newTime = this.tableData[i].timestamp;
              if (this.tableData[i].status == "OUT") {
                this.tableData[i].inOut = true;
              } else {
                this.tableData[i].inOut = false;
              }
              this.tableData[i].timestamp = this.$time(this.time1 - newTime);
              // this.tableData[i].timestamp = this.$timestampToTime(newTime);

              this.tableData[i].inOut =
                this.tableData[i].to == this.blockid ? false : true;
              this.tableData[i].status =
                this.tableData[i].to == this.blockid ? "IN" : "OUT";
            }
          }
        }
      });
    },
    // queryMainCoinByContractAddress
    async queryMainCoin(val) {
      await this.getTime();
      let pageNum = this.pageNum;
      let pageStart = val == undefined ? 0 : (val - 1) * pageNum;
      this.$fetch("/queryMainCoinByContractAddress", {
        contractAddress: this.blockid,
        pageStart: pageStart,
        pageNum: pageNum
      }).then(response => {
        if (response.status == 200) {
          this.tableData2 = response.data[0];
          this.intNum = Math.ceil(parseInt(response.data[1][0].total) /this.pageNum);
          for (let i = 0; i < this.tableData2.length; i++) {
            this.tableData2[i].inOut =
              this.tableData2[i].to == this.blockid ? false : true;
            let newTime = this.tableData2[i].timestamp;
            this.tableData2[i].timestamp = this.$time(this.time1 - newTime/ 1000);
          }
        }
      });
    },
    // queryERC20ByContractAddress
    async queryERC20(val) {
      await this.getTime();
      let pageNum = this.pageNum;
      let pageStart = val == undefined ? 0 : (val - 1) * pageNum;
      this.$fetch("/queryERC20ByContractAddress", {
        contractAddress: this.blockid,
        pageStart: pageStart,
        pageNum: pageNum
      }).then(response => {
        if (response.status == 200) {
          this.tableData3 = response.data[0];
          this.tokenNum = Math.ceil(parseInt(response.data[1][0].total) /this.pageNum);
          for (let i = 0; i < this.tableData3.length; i++) {
            if ("timestamp" in this.tableData3[i]) {
              let newTime = this.tableData3[i].timestamp;
              // this.tableData3[i].timestamp = this.$timestampToTime(
              //   newTime / 1000
              // );
              this.tableData3[i].timestamp = this.$time(this.time1 - newTime/ 1000);
            }
            this.tableData3[i].hash = this.tableData3[i].blockHash;
            this.tableData3[i].token = "ERC-20";
            this.tableData3[i].value = this.tableData3[i].data;
            this.tableData3[i].inOut =
              this.tableData3[i].to == this.blockid ? false : true;
            this.tableData3[i].status =
              this.tableData3[i].to == this.blockid ? "IN" : "OUT";
          }
        }
      });
    },
    // 刷新queryTransactionByValue
    refresTransactionList(val) {
      this.queryTransactionByValue(val);
    },
    // 刷新queryMainCoinByContractAddress
    refresMainCoinList(val) {
      this.queryMainCoin(val);
    },
    // 刷新queryERC20ByContractAddress
    refresERC20List(val) {
      this.queryERC20(val);
    },
    // queryTxsCounts?address=
    async queryTxsCounts() {
      this.$fetch("/queryTxsCounts", { address: this.blockid }).then(res => {
        this.balance = res.data.balance;
        // this.TransactionsNum = parseInt(res.data.txns);
        this.TransactionsNum = Math.ceil(parseInt(res.data.txns) /this.pageNum);
        // console.log(typeof this.TransactionsNum)
        this.txns = res.data.txns;
        this.value = res.data.value;
        this.maincoinName = res.data.maincoinName;
      });
    },
    async getTime() {
      let timeRes = await this.$fetch("/date");
      this.time1 = timeRes.data;
    },
    getTokenBalance(){
      this.$fetch("/Token/getTokenBalance", { address: this.blockid }).then(res => {
        console.log(res)
        this.tokenArr = res.data
        this.tokenCount = res.data.length
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.top-color{
  color: #1e2022;
  font-size: 13px;
}
.bottom-color{
  color: #77838f;
  font-size: 12px;
}
.pdd-right{
  padding-right: 200px;
}
@media screen and (max-width: 1200px) {
  .pdd-right{
    padding-right: 170px;
  }
}
@media screen and (max-width: 512px) {
  .pdd-right{
    padding-right: 0;
  }
}
.el-dropdown{
  width: 100%
}
.el-button-group>.el-button:first-child{
  width: 60%;
  text-align: left
}
.el-dropdown-menu{
  max-height: 300px;
  overflow-y: auto
}
.select-container{
  display: flex;
  justify-content: space-between
}
.select-container p{
  line-height: 22px
}
.hide{
  display: none;
}
.overview {
  margin: 20px 0;
}
.overview,
.overview-item {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
p {
  margin: 0;
  font-size: 13px;
}
.overview-item-wrap {
  width: 55%;
}
.overview-item {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.flex2 {
  flex: 2;
  text-align: left;
}
.flex3 {
  flex: 3;
  text-align: left;
}
.noborder {
  border: none;
  font-weight: 600;
}
.text-hide {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.jump {
  display: inline-block;
  cursor: pointer;
  color: #3498db;
  max-width: 130px;
  vertical-align: middle;

  &:hover {
    text-decoration: underline;
  }
}
.add-list {
  border: 1px solid #e67e22;
  padding: 2px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: #e67e22;
    color: #fff;
  }
}
.token-balance {
  display: inline-block;
  width: 200px;
  border: 1px solid #ddd;
  vertical-align: top;
  text-align: left;
  padding: 3px;
  box-sizing: border-box;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
}
.el-dropdown {
  margin-right: 10px;
  vertical-align: top;
}
.el-dropdown-menu {
  padding: 10px 5px;
}
.el-button--mini {
  padding: 3px;
  // box-sizing: border-box
}
@media screen and (max-width: 768px) {
  .overview-item-wrap {
    width: 100%;
  }
}
@media screen and (max-width: 1000px) {
  .overview-item-wrap {
    width: 100%;
  }
}
</style>
