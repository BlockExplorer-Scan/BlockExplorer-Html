<template>
  <div class="token-wrap">
    <el-table :data="arrData" style="margin:20px 0 15px" border stripe>
      <template slot="empty">
        <p>NoData</p>
      </template>
      <!-- <el-table-column width="50" type="index" :index="indexMethod">
        <template slot="header" slot-scope="scope">
          <div></div>
        </template>
      </el-table-column> -->
      <el-table-column width="50">
        <template slot-scope="scope">
          <div>
            <p>{{scope.row.id}}</p>
          </div>
        </template>
      </el-table-column>
     
      <el-table-column min-width="100">
        <template slot="header" slot-scope="scope">
          <!-- <router-link to tag="font">{{$t('message.Token')}}</router-link> -->
          <div style="color:#000;font-weight:normal">{{$t('message.TokenAddress')}}</div>
        </template>
        <template slot-scope="scope">
          <div>
            <p class="h3" @click="jump(scope.row.name)">{{scope.row.name}}</p>
          </div>
        </template>
      </el-table-column>
       <el-table-column min-width="50">
        <template slot="header" slot-scope="scope">
          <div style="color:#000;font-weight:normal">{{$t('message.Name')}}</div>
        </template>
        <template slot-scope="scope">
          <h3>{{scope.row.val}}</h3>
          <!-- <h3 class="h3" @click="jump(scope.row.val)">{{scope.row.val}}</h3> -->
          <!-- <span
            style="font-size:12px"
          >USDC is a fully collateralized US Dollar stablecoin developed by CENTRE, the open source project and membership consortium, with Circle being the first of several forthcoming issuers.</span> -->
        </template>
      </el-table-column>
      <!-- <el-table-column>
        <template slot="header" slot-scope="scope">
          <router-link to tag="font">{{$t('message.Change')}}</router-link>
        </template>
        <template slot-scope="scope">
          <div style="color:green">
            <i class="fa fa-caret-up"></i>
            <i class="fa fa-caret-down"></i> 
            <span>1</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <router-link to tag="font">{{$t('message.Volume')}}</router-link>
        </template>
        <template slot-scope="scope">
          <div>
            <p>$54,904,338</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <i class="fa fa-angle-down"></i>
          <router-link to tag="font">{{$t('message.MarketCap')}}</router-link>
        </template>
        <template slot-scope="scope">
          <div>
            <p>$898,566,101</p>
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <pager v-if="this.tableData.length >20" @refreshList="refreshTokens" :pageCount='pageCount' :currentPage="currentPage"></pager>
  </div>
</template>

<script>
import pager from "../components/paging";
export default {
  components: { pager },
  data() {
    return {
      tableData: [],
      pageNum: 20,
      pageCount: 0,
      arrData:[],
      currentPage:1
    };
  },
  created() {
    this.getTokens();
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
          this.getTokens();
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
  },
  methods: {
    jump(val) {
      this.$router.push({
        name: "tokenDetail",
        params: {
          blockid: val
        }
      });
    },
    getTokens() {
      this.$fetch("/ERC20Tokens/queryERC20Contracts").then(res => {
        let tableData = this.tableData;
        let name = res.data[0];
        let i = 1 ;
        Object.keys(res.data[0]).forEach(element => {
          // console.log(element)
          let data = {}
          data.name = element;
          data.val = name[element];
          // data.name = name[element];
          // data.val= element,
          data.id = i++
          tableData.push(data)
        });
        let length = this.tableData.length;
        this.pageCount =  Math.ceil(length/this.pageNum)
        // console.log(JSON.stringify(this.tableData))
        for(let i in this.tableData){
        if(i <this.pageNum){
          this.arrData.push(this.tableData[i])
        }
      }

      });
    },
    refreshTokens(num){
      console.log('zheshi'+num)
      this.currentPage = num
      this.arrData =[]
      for(let i in this.tableData){
        if(i >= (num-1)*this.pageNum && i <num*this.pageNum){
          this.arrData.push(this.tableData[i])
        }
      }
    },
    indexMethod(index) {
      return index + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.token-wrap {
  margin-top: 30px;
  margin-bottom: 15px;
}
.el-table {
  margin-bottom: 15px;
}
h3 {
  margin: 6px 0;
}
font,
.h3 {
  color: #0193c9;
  list-style: none;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
}
p {
  margin: 0;
  font-size: 12px;
}
// td {
//   vertical-align: top !important;
// }
.el-table .cell {
  word-break: normal;
  line-height: 18px;
}
.el-table th {
  padding: 0 !important;
}
</style>