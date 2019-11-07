<template>
  <div class="wrap">
     <transition name="el-fade-in">
      <Search type="transaciton" @getSearchData="changeTableData" @errorMessage="shwoErroer" v-if="searchStatus"></Search>
     </transition>
    <!-- <div class="flex-div">
      <el-input v-model="input" placeholder="From" clearable></el-input>
      <el-input v-model="input" placeholder="To" clearable></el-input>
      <el-input v-model="input" placeholder="AVA金额开始数值" clearable></el-input>
      <el-input v-model="input" placeholder="AVA金额结束数值" clearable></el-input>
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
    </div> -->
    <el-table
      :data="tableData"
      style="margin:5px auto 30px;"
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
          <div slot="reference" class="name-wrapper" @click="toDetail(scope.row.hash,'hash')" style="display:flex">
            <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            <!-- <span style="background:#de4437;color:#fff;width:23px;border-radius:50%;text-align:center;margin:0;margin-right:5px" v-if="scope.row.status == 'Fail'">!</span> -->
            <p class="show-space" style="margin:0"> <span style="display:inline-block;background:#de4437;color:#fff;width:14px;height:14px;line-height:14px;font-size:10px;border-radius:50%;text-align:center;margin:0;margin-right:5px" v-if="scope.row.status == 'Fail'">!</span>{{scope.row.hash}}</p>
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
          <!-- <el-popover trigger="hover" placement="top"> -->
            <div v-if="showTime" @click="changeTime">{{scope.row.timestampUTC}}</div>
            <!-- <div slot="reference" class="time-wrappe"> -->
              <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
            <div v-else @click="changeTime">
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
            <!-- </div> -->
          <!-- </el-popover> -->
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
          :prev-text="$t('message.prev')"
          :next-text="$t('message.next')"
        >
          <!-- <span style="margin:0 10px">Total:{{total}}</span> -->
        </el-pagination>
         <span>{{$t('message.goto')}}</span>
        <input v-model="inputPage" class="page-input" v-on:keyup.13="handleCurrentChange(inputPage)">
        <!-- <el-button type="primary" size="mini" @click="handleCurrentChange(inputPage)">{{$t('message.sure')}}</el-button> -->
        <button type="primary" size="mini" @click="handleCurrentChange(inputPage)" style="color:#fff;outline:none;border:none;background-color:#337ab7;line-height:20px;font-weight:bold;cursor:pointer">{{$t('message.sure')}}</button>
      </div>
    </div>
    <div class="message-box" v-show="messageWord">{{messageWord}}</div>
  </div>
</template>

<script>

import Bus from "@/bus.js";
import Search from "@/components/search.vue"
export default {
  components:{Search},
  data() {
    return {
      showTime:false,
      inputPage:'',
      messageWord:'',
      pageCount:"",
      input:'',
      value3:'',
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
      time1: 0,
      searchData:{},
      searchStatus:false,//搜索显示隐藏
      ifSearch:false//是否进入搜索
    };
  },
  created() {
    let blockid = this.$route.query.blockid;
    if (blockid != null) {
      this.queryTransactionByValue(blockid);
    } else {
      // if(this.$route.query.ifSearch){
      //   this.searchTableData(this.currentPage,this.pageStart,this.pageNum)
      // }else{
        this.querytransaction(this.pageStart, this.pageNum);
      // }
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
    // this.inputPage = this.currentPage
    Bus.$on("changeSearch",data=>{
      this.searchStatus = data
    })
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
    // 改变块龄age显示
    changeTime(){
      this.showTime = !this.showTime
    },
    // 获取搜索报错信息
    shwoErroer(msg){
      this.messageWord = msg
      setTimeout(()=>{
        this.messageWord = ''
      },2000)
    },
    // 搜索数据改变
    changeTableData(data){
      this.currentPage = 1
      this.searchData = data
      if(this.searchData.transferStart ){
        this.searchData.transferStart = this.searchData.transferStart*Math.pow(10, 18);
      }
      if(this.searchData.transferEnd ){
        this.searchData.transferEnd = this.searchData.transferEnd*Math.pow(10, 18);
      }
      // sessionStorage.setItem('rangeQueryOuterData',data)
      this.searchTableData(this.currentPage,this.pageStart,this.pageNum)
    },
    // 查询搜索数据
    async searchTableData(page,pageStart,pageNum){
      await this.getTime()
      this.searchData.pageStart = pageStart
      this.searchData.pageNum = pageNum
      this.ifSearch = true
      // this.$router.push({ path:'/transtion/transactionsPage', query: { page: page,ifSearch:true,data:this.searchData }})
      this.$router.push({ path:'/transtion/transactionsPage', query: { page: page }})
      this.$fetch("/Conditional/rangeQueryOuter", 
        this.searchData
      ).then(response => {
        if (response.status == 200) {
          this.tableData = response.data[0];
          console.log(response.data)
          for (let i = 0; i < response.data[0].length; i++) {
            let newTime = this.tableData[i].timestamp;
            this.tableData[i].timestamp = this.$time(this.time1 - newTime);
            this.tableData[i].timestampUTC = this.$timestampToTimeUtc(newTime);
          }
        }
      });
    },
    // 每页展示条目
    handleSizeChange(val) {
      // 修改展示数目 重置当前页
      this.pageNum = val;
      this.currentPage = 1;
       this.inputPage = this.currentPage
      if(this.ifSearch){
        this.searchTableData(this.currentPage,this.pageStart,this.pageNum)
      }else{
        this.$router.push({ path:'/transtion/transactionsPage', query: { page: this.currentPage }})
        this.querytransaction(0, val);
      }

      // this.$router.push({ path:'/transtion/transactionsPage', query: { page: this.currentPage }})
      // this.querytransaction(0, val);
    },
    // 分页
    handleCurrentChange(val) {
      if(!val){
        return
      }
      val = parseInt(val)
      if(val * this.pageNum > 10000){
        this.$message.error(this.$t('message.noMore10000'));
        return
      }
      this.currentPage = val
      let that = this;
      let pageNum = this.pageNum;
      let pageStart = (val - 1) * pageNum ;
      if(this.ifSearch){
        this.searchTableData(val,pageStart, pageNum)
      }else{
        this.$router.push({ path:'/transtion/transactionsPage', query: { page: this.currentPage }})
        this.querytransaction(pageStart, pageNum);
      }
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
      });
    },

    async queryTransactionByValue(blockid) {
      await this.getTime();
      this.$fetch("/queryTransactionByValue", {
        blockNumber: blockid
      }).then(response => {
        if (response.status == 200) {
          this.tableData = response.data;
          for (let i = 0; i < response.data.length; i++) {
            let newTime = this.tableData[i].timestamp;
            // this.tableData[i].timestamp = this.$timestampToTime(newTime);
            this.tableData[i].timestamp = this.$time(this.time1 - newTime);
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
.message-box{
  position: fixed;
  width: 500px;
  top:50%;
  right: 0;
  left: 0;
  margin:0 auto;
  height: 40px;
  line-height: 40px;
  background-color: #fef0f0;
  color: red;
  z-index: 500;
  text-align: center
}
.flex-div{
  display: flex;
  flex-wrap: wrap;
  margin-bottom:10px
}
.el-input{
  min-width: 170px;
  width: auto;
  margin: 5px ;
}
.el-input .el-input__inner{
  padding: 0 10px
}
.el-range-editor{
   margin: 0 5px ;
}
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
.show-space{
  /* width: 90%; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
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
  width: 70px;
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
@media screen and (max-width: 414px) {
  .message-box{
    width: 100%;
  }
}
</style>
