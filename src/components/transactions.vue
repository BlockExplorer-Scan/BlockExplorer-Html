<template>
  <div class="transtions-wrap">
    <div class="block-title">
      <h1>
        <i class="fa fa-list-alt" id="faalt"></i>&nbsp;&nbsp;{{$t('message.newestTransactions')}}
      </h1>
      <router-link :to="{path:'/transtion/transactionsPage',query: { page: 1 }}" class="view-all-btn">{{$t('message.viewAll')}}</router-link>
    </div>
    <div class="block-content">
      <p
        v-if="transactiondata.length == 0"
        style="margin-top:50px;font-size:20px;color:#999"
      >{{$t('message.NoData')}}</p>
      <transition-group tag="ul" name="fade" v-else>
        <li class="blocks-item" v-for="item in newTransactiondata" :key="item.hash">
          <div style="display:flex">
            <p style=""><i class="fa fa-hdd-o" id="faalt" style="font-size:20px"></i></p>
            <div class="item-left">
              <p @click="toDetail(item.hash,'hash')">
                <span>TX#   </span><span class="jump ellipsis hash">{{item.hash}}</span>
              </p>
              <p>
                {{$t('message.From')}}
                <span @click="toDetail(item.from,'from')" class="jump ellipsis">{{item.from}}</span> {{$t('message.To')}}
                <span @click="toDetail(item.to,'to')" class="jump ellipsis">{{item.to}}</span>
              </p>
              <p v-if="item.value || item.value == 0">{{$t('message.amount')}} {{item.value/Math.pow(10, 18)}} {{unit}}</p>
              <p v-if="item.valueStr">{{$t('message.amount')}} {{item.valueStr/Math.pow(10, 18)}} {{unit}}</p>
            </div>
          </div>
          <div class="item-right ellipsis">
            <p class="ellipsis m-time">
              <span v-if="item.timestamp[0] > 0">{{item.timestamp[0]}} {{$t('message.days')}} </span>
              <span v-if="item.timestamp[1] > 0">{{item.timestamp[1]}} {{$t('message.hours')}} </span>
              <span v-if="item.timestamp[2] > 0" >{{item.timestamp[2]}} {{$t('message.mins')}} </span>
              <span>{{item.timestamp[3]}} {{$t('message.secsAgo')}}</span>
              <!-- <span>{{item.timestamp}}</span> -->
            </p>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  props: ["transactiondata", "newData","unit"],
  data() {
    return {};
  },
  computed: {
    newTransactiondata(){
      return this.transactiondata
    }
  },
  created() {
    let _this = this;
    // 定时器 不删
    setInterval(function() {
      for (let i = 0; i < _this.newTransactiondata.length; i++) {
        if(_this.newTransactiondata[i].timestamp[3] < 0){
          _this.$set(_this.newTransactiondata[i].timestamp, 3, 0);
        }
        if(_this.newTransactiondata[i].timestamp[2] > 59){
          _this.$set(_this.newTransactiondata[i].timestamp, 2, 0);
          _this.$set(_this.newTransactiondata[i].timestamp, 1, 1);
        }
        if (_this.newTransactiondata[i].timestamp[3] >= 59) {
          _this.$set(_this.newTransactiondata[i].timestamp, 3, 0);
          _this.$set(_this.newTransactiondata[i].timestamp, 2, _this.newTransactiondata[i].timestamp[2] + 1);
        } else {
          _this.$set(_this.newTransactiondata[i].timestamp, 3, _this.newTransactiondata[i].timestamp[3] + 1);
        }
      }
    }, 1000);
  },
  mounted() {},
  methods: {
    toDetail(blockid, type) {
      if (type == "hash") {
        this.$router.push({
          name: "transactionsDetail",
          params: { blockid: blockid }
        });
      } else {
        this.$router.push({
          name: "address",
          params: { blockid: blockid },
          query: { type: type }
        });
      }
    },
    by(name) {
        return function (o, p) {
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return b < a ? -1 : 1;
                }
                return typeof b < typeof a ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    },
  },
  watch: {
    newData: function() {
      let transactions = this.newData.block.transactions;
      let transactiondata = this.transactiondata;
     
      let arr = [];
      transactiondata.forEach(element => {
        arr.push(element.hash);
      });
      // 判断数据是否已经存在
      for (let i = 0; i < transactions.length; i++) {
        if (arr.indexOf(transactions[i].hash) == -1) {
          // if (transactiondata.length < 10) {
            transactiondata.unshift(transactions[i]);
          // } else {
          //   transactiondata.unshift(transactions[i]);
          //   transactiondata.pop();
          // }
        } else {
          console.log("transactiondata already exist data");
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.block-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
}
.view-all-btn {
  text-decoration: none;
  color: #000;
  border: 1px solid #332f2f;
  padding: 0.625rem;
  cursor: pointer;
  &:hover {
    background-color: #000;
    color: #fff;
  }
}
h1 {
  margin: 0;
  font-weight: 500;
  font-size: 24px;
}
.block-content {
  width: 100%;
}
ul {
  padding: 0;
  list-style: none;
  height: 38.125rem;
  overflow: auto;
  margin-top: 0.3125rem;
}
.blocks-item {
  flex-wrap: nowrap;
  display: flex;
  // justify-content: space-between;
  background-color: #fff;
  width: 100%;
  // height: 6.25rem;
  padding: 20px;
  // padding: 0.9375rem 10px;//原来的
  // padding: 0.9375rem 20px;//解决出现天数pc排版问题
  box-sizing: border-box;
  margin-bottom: 0.125rem;
  position: relative;
  &::before {
    content: "";
    display: block;
    width: 4px;
    // min-height: 6.25rem;
    height: 100%;
    background-image: linear-gradient(-141deg, #6E8DF6 0%, #001F3F 100%);
    position: absolute;
    left: 0;
    top: 0;
  }
}
.jump {
  color: #0193C9;
  display: inline-block;
  max-width: 100px;
  vertical-align: top;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.item-left {
  text-align: left;
  margin-left: 15px
}
.item-right {
  text-align: right;
  margin-left: 15px;
  // width: 220px;
  min-width: 135px;
  p {
    span {
      font-size: 12px;
    }
  }
}
p {
  margin-top: 0;
  margin-bottom: 0.3125rem;
  color: #666;
  font-size: 14px;
}
.hash{
  max-width: 180px
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 2s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
@media screen and (max-width: 768px) {
  .blocks-item{
    flex-wrap: wrap
  }
  .m-time{
    text-align: left;
    margin-left: 15px
  }
}
</style>

