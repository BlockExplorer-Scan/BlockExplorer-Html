<template>
  <div>
    <div class="overview">
      <div class="overview-item-wrap">
        <div class="overview-item noborder">
          <p>
            <el-checkbox checked style="margin-right:5px"></el-checkbox>
            <span style="margin-right:5px">{{$t('message.Summary')}}</span>
            <span style="color:rgb(192, 192, 192)">[ERC-20]</span>
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.TotalSupply')}}:</p>
          <p
            class="flex3"
          >{{tokensCounts.TokenTotalSupply | thousandFilter}} {{tokensCounts.statusName}}</p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Name')}}:</p>
          <p class="flex3">
            <span>{{tokensCounts.statusName}}</span>
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">Holders:</p>
          <p class="flex3">{{HoldersNum}} {{$t('message.addresses')}}</p>
        </div>
      </div>
      <div class="overview-item-wrap">
        <div class="overview-item noborder">
          <p>
            <span style="color:#B3B6B7;margin-right:5px">Rep</span>
            <!-- <i class="fa fa-circle-thin"></i> -->
          </p>
          <div>
            <el-dropdown trigger="click" style="background-color: #337ab7;">
              <el-button
                size="mini"
                type="primary"
                style="background-color: #337ab7;border-color: #2e6da4;"
              >
                Loan
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <div style="text-align:left">
                  <p style="color:#999;text-align:right">Sponsored</p>
                  <p class="text-hide" style="cursor:pointer;color:#3498db">
                    <img src="https://etherscan.io/images/gen/nexo_20.png" alt> Nexo Nexo - Instant
                    Crypto Loans
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
                  <i class="fa fa-history"></i> Check Previous Balance
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Contract')}}:</p>
          <p class="flex3" @click="jump">
            <span class="jump">{{address}}</span>
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Decimals')}}:</p>
          <p class="flex3">
            <span class="text-hide">{{tokensCounts.decimals}}</span>
          </p>
        </div>
        <div class="overview-item">
          <p class="flex2">{{$t('message.Transfers')}}:</p>
          <p class="flex3">
            <span>{{tokensCounts.Transfers}}</span>
          </p>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :label="tabTitle.Transfers" name="first">
        <Transfers :tokens="tokens"></Transfers>
        <Pager @refreshList="getTokens" :pageCount='pageCount'></Pager>
      </el-tab-pane>
      <el-tab-pane :label="tabTitle.Holders" name="second" v-if="hasToken">
        <Holders :holders="holders" :startfrom="startfrom"></Holders>
        <pagingTwo @refreshList="getHolders" :pageCount='HoldersPageCount'></pagingTwo>
      </el-tab-pane>
      <!-- <el-tab-pane :label="tabTitle.Info" name="third">
        <Info></Info>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import Bus from "@/bus.js";
import Transfers from "../components/token/transfers";
import Holders from "../components/token/holders";
import Info from "../components/token/info";
import Pager from "../components/paging";
import pagingTwo from "../components/pagingTwo";
import bigDecimal from "js-big-decimal"; // 精度计算
import md5 from 'js-md5';
export default {
  components: { Transfers, Pager, Holders, pagingTwo},
  data() {
    return {
      hasToken :sessionStorage.getItem('token'),
       tabTitle:{
        Transfers:'Transfers',
        Holders:'Holders',
        Info:'Info',
      },
      activeName: "first",
      isReduce: true,
      pageStart: 0,
      pageNum: 20,
      tokens: [],
      tokensCounts: {},
      holders: [],
      time1: 0,
      // address: '0xc1fe51a933d9bb15eeabadffd81918241121988c',
      address: this.$route.params.blockid,
      startfrom: 0,
      pageCount:0,
      Holders:'',
      HoldersNum:'',
      HoldersPageCount:'',
      token : sessionStorage.getItem('token'),
      timestamp: Date.parse(new Date())
    };
  },
  created() {
    // this.getTokens();
    this.getHolders();
    this.$route.meta.title = this.$route.params.blockid;
    if(this.$i18n.locale == 'cn'){
      // alert(1212)
       this.tabTitle={
        Transfers:'转移',
        Holders:'持有者',
        Info:'知訊',
      }
    }else{
       this.tabTitle={
        Transfers:'Transfers',
        Holders:'Holders',
        Info:'Info',
      }
    }
  },
  mounted(){
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tabTitle={
        Transfers:'转移',
        Holders:'持有者',
        Info:'知訊',
      }
      } else {
        this.tabTitle={
         Transfers:'Transfers',
        Holders:'Holders',
        Info:'Info',
      }
    }});
    Bus.$on("loginOut", data => {
      // alert(12121)
     this.hasToken = ''
    });
  },
  methods: {
    
    async getTokens(val) {
       let params2 = {
        contractAddress: this.address,
      };
       this.$fetch("/ERC20Tokens/queryERC20HoldersCounts", params2).then(res => {
        this.HoldersNum = res.data
        // this.Holders.forEach( ( item, i ) => {
        //     item.rank = i+1 
        // } );
      });
      await this.getTime();
      await this.getTokenCounts()
      
      console.log('------------------'+val)
      let pageNum = this.pageNum;
      let pageStart;
      if (val === undefined || val.toString() === "1") {
        pageStart = 0;
      } else {
        pageStart = (val - 1) * pageNum ;
      }
      let params = {
        contractAddress: this.address,
        pageStart: pageStart,
        pageNum: pageNum
      };
      this.pageCount = Math.ceil(this.tokensCounts.Transfers /pageNum)
      this.$fetch("/ERC20Tokens/queryERC20TokenTransfers", params).then(res => {
        this.tokens = res.data;
        this.tokens.forEach(item => {
          if (item.timestamp) {
            item.timestamp = this.$time(this.time1 - item.timestamp);
          }
          item.data = parseInt(item.data, 16);
        });
        this.address = this.tokens[0].address;
      });
    },
    async getTokenCounts() {
      let params = {
        contractAddress: this.address
      };
      let { data } = await this.$fetch("/ERC20Tokens/queryERC20TokenCounts", params);

      this.tokensCounts = data;
      this.tokensCounts.TokenTotalSupply = new Number(
        this.tokensCounts.TokenTotalSupply
      )
        .toLocaleString()
        .replace(/,/g, "");
      this.tokensCounts.TokenTotalSupply =
        parseInt(this.tokensCounts.TokenTotalSupply) /
        Math.pow(10, this.tokensCounts.decimals);
    },
    async getTime() {
      let { data } = await this.$fetch("/date");
      this.time1 = data;
    },
    jump() {
      this.$router.push({
        name: "address",
        params: { blockid: this.address, type: "from" },
        query: { type: "from" }
      });
    },
    async getHolders(val) {
      // await this.getTokenCounts()
      await this.getTokens()
      if(!this.hasToken){
        return
      }
      let pageNum = 30;
      let pageStart;
      if (val === undefined || val.toString() === "1") {
        pageStart = 0;
      } else {
        pageStart = (val - 1) * pageNum;
      }
      let nihao = "contractAddress=" + this.address + "&timestamp=" + this.timestamp + "&token=" + this.token
      let signStr = md5("contractAddress=" + this.address + "&timestamp=" + this.timestamp + "&token=" + this.token);
      let params = {
        contractAddress: this.address,
        pageStart: pageStart,
        pageNum: pageNum,
        timestamp:this.timestamp,
        token:this.token,
        sign:signStr
      };
      this.HoldersPageCount = Math.ceil(this.HoldersNum /pageNum)
      // console.log('父组件数'+this.HoldersNum)
      // console.log('每页'+pageNum)
      // console.log('父组件的总页数'+this.HoldersPageCount)
      this.$post("/ERC20Tokens/queryERC20Holders", this.$qs.stringify(params)).then(res => {
        this.holders = res.data;
        this.holders.forEach((item,i) => {
          item.rank = val ? i+1+30*(val-1) : i+1 ;
          if(item.Percentage === 0){item.Percentage = 0.000001}
          item.Percentage = bigDecimal.multiply(item.Percentage, 100);
          item.Quantity = new Number(item.Quantity)
            .toLocaleString()
            .replace(/,/g, "");
          item.Quantity =
            parseInt(item.Quantity) / Math.pow(10, this.tokensCounts.decimals);
          // console.log(
          //   item.Quantity,
          //   item.Percentage,
          //   this.tokensCounts.decimals
          // );
          // if(item.Percentage === '0.0000' && item.Quantity !== 0){item.Percentage = 0.0001}
        });
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.colorG {
  color: green;
}

.colorR {
  color: red;
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
  width: 48%;
}

.overview-item {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}

.flex2 {
  flex: 1;
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

.jump {
  color: #0193c9;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

i {
  margin-right: 10px;
}

input[type="text"] {
  height: 28px;
  padding: 1px 1px 1px 10px;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  box-sizing: border-box;
}

input[type="button"] {
  padding: 2px 5px 2px 5px;
  height: 29px;
  width: 45px;
  margin-left: -5px;
  margin-top: -4px;
  background: #95a5a6;
  border: 0;
  color: #fff;
  cursor: pointer;
  box-sizing: border-box;
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
}
@media screen and (max-width: 768px) {
  .overview-item-wrap {
    width: 100%;
  }
}
</style>