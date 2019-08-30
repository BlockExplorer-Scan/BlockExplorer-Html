<template>
  <div>
    <div class="flex-div">
      <el-input v-if="type == 'Erc20'" v-model="tokenName" :placeholder="$t('message.TOKENNAME')" clearable></el-input>
      <el-input v-model="from" :placeholder="$t('message.From')" clearable></el-input>
      <el-input v-model="to" :placeholder="$t('message.To')" clearable></el-input>
      <el-input v-model="transferStart" :placeholder="$t('message.TRANSFERSTART')" clearable></el-input>
      <el-input v-model="transferEnd" :placeholder="$t('message.TRANSFEREND')" clearable></el-input>
    </div>
    <div class="flex-div">
      <el-date-picker
        v-model="value3"
        type="datetimerange"
        :range-separator="$t('message.TIMETO')"
        :start-placeholder="$t('message.TIMESTART')"
        :end-placeholder="$t('message.TIMEEND')"
        value-format="yyyy/MM/dd HH:mm:ss"
        @change="change"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="getData">搜索</el-button>
    </div>
    <div class="border-div"></div>
    <!-- <span @click="showTime">点击这里选择银行</span>  -->
    <!-- <div class="moblie-date">
      <van-datetime-picker
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
    />
    </div>-->
    <!-- <div class="form-item item-line"> -->
    <!-- <label>请选择银行</label> -->
    <!-- <div class="pc-box"> -->
    <!-- <input type="hidden" name="bank_id" id="bankId" value /> -->
    <!-- <span id="showBank">点击这里选择银行</span> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- <div class="container"></div> -->
  </div>
</template>
<script>
import "../style/iosSelect.css";
import "../util/bank";
import "../util/zepto";
import "../util/iosSelect";
import {timeSelect} from '../util/time'
export default {
  name: "search",
  props: ["type"],
  data() {
    return {
      searchData: [],
      time1: '',
      tokenName: '',
      from: '',
      to: '',
      transferStart: '',
      transferEnd: '',
      timeStart: '',
      timeEnd: '',
      pageStart: 0,
      pageNum: 20,
      value3: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date()
    };
  },
  mounted() {
    // console.log(this.type);
    let  obj1 = {
      name:'xiaoli',
      age:'54',
      gender:"boy"
    }
    delete obj1.age
    console.log(obj1)
    let obj2 = { name:'xiaoli',
      age:'54',}
  },
  methods: {
    search() {
      this.$emit("searchWord", this.value3);
    },
    showTime() {
      timeSelect()
    },
    change(data){
      this.timeStart = Date.parse(data[0])/1000
      this.timeEnd = Date.parse(data[1])/1000
    },
    async getTime() {
      let timeRes = await this.$fetch("/date");
      this.time1 = timeRes.data;
    },
    async getData(){
      await this.getTime()
      if(this.transferStart != '' && this.transferEnd == '' ){
        this.$message({
          message: '转账金额范围必须完整',
          type: 'warning'
        });
        return
      }
      if(this.transferStart == '' && this.transferEnd != '' ){
        this.$message({
          message: '转账金额范围必须完整',
          type: 'warning'
        });
        return
      }
      if(this.transferEnd < this.transferStart){
        this.$message({
          message: '转账金额范围有误',
          type: 'warning'
        });
        return
      }
      if(!this.tokenName && !this.timeStart && !this.timeEnd && !this.transferStart && !this.transferEnd && !this.from && !this.to ){
        this.$message({
          message: '至少需要一个搜索条件',
          type: 'warning'
        });
        return
      }
      let data = {
        // pageStart: this.pageStart,
        // pageNum: this.pageNum,
      }
      if(this.tokenName)data.tokenName = this.tokenName
      if(this.timeStart)data.timeStart = this.timeStart
      if(this.timeEnd)data.timeEnd = this.timeEnd
      if(this.transferStart)data.transferStart = this.transferStart
      if(this.transferEnd)data.transferEnd = this.transferEnd
      if(this.from)data.from = this.from
      if(this.to)data.to = this.to
      console.log(data)
      this.$emit('getSearchData',data)
    }
  }
};
</script>
<style scoped>
.flex-div {
  display: flex;
  flex-wrap: wrap;
  /* padding-bottom:10px; */
  /* border-bottom:1px solid black */
}
.el-input {
  min-width: 150px;
  width: auto;
  margin: 5px;
}
.el-input .el-input__inner {
  padding: 0 10px;
}
.el-range-editor {
  margin: 0 5px;
}
.border-div {
  width: 100%;
  height: 1px;
  margin: 10px;
  background-color: #dcdfe6;
}
.moblie-date {
  height: 100%;
  width: 100%;
  background: #000;
}
@media screen and (max-width: 768px) {
  .el-range-editor {
    margin: 5px;
  }
  .el-button--mini {
    margin: 5px;
  }
}
</style>