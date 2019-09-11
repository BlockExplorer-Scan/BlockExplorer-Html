<template>
  <div>
    <div class="flex-div">
       <input  v-if="type == 'Erc20'" oninput="changeInput"  v-model="tokenName" :placeholder="$t('message.TOKENNAME')" class="search-input" style="border: 1px solid #777777;" v-on:keyup.13="getData()"/>
      <input v-model="from" :placeholder="$t('message.From')" class="search-input" v-on:keyup.13="getData()"/>
      <input v-model="to" :placeholder="$t('message.To')" class="search-input" v-on:keyup.13="getData()"/>
      <input v-model="transferStart" :placeholder="$t('message.TRANSFERSTART')" ref="startInoput" class="search-input" :class="hasEnd ? 'ErrorBorder' : ''" @blur="hasEnd = false" v-on:keyup.13="getData()"/>
      <input v-model="transferEnd" :placeholder="$t('message.TRANSFEREND')" ref="endInoput" class="search-input" :class="hasStart ? 'ErrorBorder' : ''" @blur="hasStart = false" v-on:keyup.13="getData()"/>
      <!-- <el-input v-if="type == 'Erc20'" v-model="tokenName" :placeholder="$t('message.TOKENNAME')" ></el-input> -->
      <div class="search-input mobile-time" :class="timeStartShow ? '' : ' div-color'" style="text-align:left" @click="showTime('start')">{{timeStartShow ? timeStartShow : $t('message.TIMESTART')}}</div>
      <div class="search-input mobile-time" :class="timeEndShow ? '' : ' div-color'" style="text-align:left" @click="showTime('end')">{{timeEndShow ? timeEndShow : $t('message.TIMEEND')}}</div>
      <!-- <input v-model="timeEnd" readonly :placeholder="$t('message.TIMEEND')" class="search-input mobile-time" @click="showTime"/> -->
      <!-- <el-input v-if="type == 'Erc20'" v-model="tokenName" :placeholder="$t('message.TOKENNAME')" clearable ></el-input>
      <el-input v-model="from" :placeholder="$t('message.From')" clearable v-on:keyup.13="getData"></el-input>
      <el-input v-model="to" :placeholder="$t('message.To')" clearable></el-input>
      <el-input v-model="transferStart" :placeholder="$t('message.TRANSFERSTART')" clearable></el-input>
      <el-input v-model="transferEnd" :placeholder="$t('message.TRANSFEREND')" clearable></el-input> -->
      <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" :placeholder="$t('message.TRANSFEREND')"></el-input>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="flex-div">
      <div class="PC-time">
        <el-date-picker
        v-model="timeArr"
        type="datetimerange"
        :range-separator="$t('message.TIMETO')"
        :start-placeholder="$t('message.TIMESTART')"
        :end-placeholder="$t('message.TIMEEND')"
        value-format="yyyy/MM/dd HH:mm:ss"
        @change="change"
      ></el-date-picker>
      </div>
      
      <el-button type="primary" icon="el-icon-search" size="mini" @click="getData()">搜索</el-button>
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
      hasEnd:false,
      hasStart:false,
      searchData: [],
      time1: '',
      tokenName: '',
      from: '',
      to: '',
      transferStart: '',
      transferEnd: '',
      timeStart: '',
      timeEnd: '',
      timeStartShow: '',
      timeEndShow: '',
      pageStart: 0,
      pageNum: 20,
      timeArr: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2019, 10, 1),
      currentDate: new Date()
    };
  },
  watch:{
    from: function (newVal, oldVal) {
      this.from = newVal.replace(/^ +| +$/g,'')
      console.log(this.from)
    },
    to: function (newVal, oldVal) {
      this.to = newVal.replace(/^ +| +$/g,'')
      console.log(this.to)
    }
  },
  mounted() {
    // document.onkeydown =  (event) =>{
    //     var e = event || window.event;
    //     if (e && e.keyCode == 13) { //回车键的键值为13
    //        this.getData()
    //     }
    // }; 
  },
  methods: {
    changeInput(){
      console.log(this.from)
      this.from = this.from.replace(/^ +| +$/g,'')
    },
    // search() {
    //   this.$emit("searchWord", this.value3);
    // },
    showTime(type) {
      if(type == 'start'){
        timeSelect((data)=>{
          this.timeStartShow = data
          this.timeStart = Date.parse(data)/1000
          console.log(this.timeStart)
        },()=>{
          this.timeStartShow = ''
          this.timeStart = ''
          console.log(99999999999999+this.timeEnd)
        })
      }else{
        timeSelect((data)=>{
          this.timeEndShow = data
          this.timeEnd = Date.parse(data)/1000
          console.log(this.timeEnd)
        },()=>{
          this.timeEndShow = ''
          this.timeEnd = ''
          console.log(this.timeEnd)
        })
      }

    },
    change(data){
      console.log(data)
      console.log(this.timeArr)
      if(data){
        this.timeStart = Date.parse(data[0])/1000
        this.timeEnd = Date.parse(data[1])/1000
      }else{
        this.timeStart = ''
        this.timeEnd = ''
      }
      
    },
    hasInput(){
      alert(1212)
    },
    shwoMessage(msg){
      this.$emit("errorMessage", msg);
    },
    async getTime() {
      let timeRes = await this.$fetch("/date");
      this.time1 = timeRes.data;
    },
    async getData(){
      await this.getTime()
      if(this.from && this.from.length <42){
        this.shwoMessage(this.$t('message.rightFrom'))
        return
      }
      if(this.to && this.to.length <42){
        this.shwoMessage(this.$t('message.rightTo'))
        return
      }
      if(this.timeStart != '' && this.timeEnd == '' ){
        this.shwoMessage(this.$t('message.rightTime'))
        return
      }
      if(this.timeEnd != '' && this.timeStart == '' ){
        this.shwoMessage(this.$t('message.rightTime'))
        return
      }
      if(this.transferStart != '' && this.transferEnd == '' ){
        this.$refs.endInoput.focus()
        this.hasStart = true
        this.shwoMessage(this.$t('message.allPrice'))
        return
      }
      if(this.transferStart == '' && this.transferEnd != '' ){
        this.$refs.startInoput.focus()
        this.hasEnd = true

        this.shwoMessage(this.$t('message.allPrice'))
        return
      }
      if(parseFloat(this.transferEnd) < parseFloat(this.transferStart)){
        // this.$message({
        //   message: this.$t('message.rightPrice'),
        //   type: 'error'
        // });
        this.shwoMessage(this.$t('message.rightPrice'))
        return
      }
      if(!this.tokenName && !this.timeStart && !this.timeEnd && !this.transferStart && !this.transferEnd && !this.from && !this.to ){
        // this.$message({
        //   message: this.$t('message.needSearch'),
        //   type: 'error',
        //   duration:0
        // });
        this.shwoMessage(this.$t('message.needSearch'))
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
      this.hasEnd = false
      this.hasStart = false
      this.$emit('getSearchData',data)
    }
  }
};
</script>
<style scoped>
.search-input::-webkit-input-placeholder { /* WebKit browsers */ 
color: #DCDCDC!important;
} 

.search-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
color: #DCDCDC!important;
} 

.search-input::-moz-placeholder { /* Mozilla Firefox 19+ */ 
color: #DCDCDC!important;
} 

.search-input:-ms-input-placeholder { /* Internet Explorer 10+ */ 
color: #DCDCDC!important;
}
.div-color{
  color: #DCDCDC!important;
}
.mobile-time{
  display: none
}
.search-input{
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 10px;
  width:175px;
  /* min-width: 150px; */
  margin: 5px;
}

.search-input::-webkit-input-placeholder { /* WebKit browsers */
    color: rgba(0, 0, 0, 0.3);
}
/* .search-input:focus{
  border: 1px solid #66b1ff;
} */
.ErrorBorder{
  border: 1px solid red!important;
}
.el-form-item__content{
  margin-left:0
}
.flex-div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
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
  margin: 10px 0;
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
@media screen and (max-width: 414px) {
  .PC-time {
    display: none
  }
  .mobile-time{
    display: normal
  }
}
@media screen and (min-width: 415px) {
  .mobile-time{
    display: none
  }
}
</style>
