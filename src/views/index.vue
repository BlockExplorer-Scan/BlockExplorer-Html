<!--<template>
  <div class="index-wrap">
    <div class="section left-one">
      <div class="left-one-title">
        <img src="../assets/icon_block.png" style="vertical-align:middle;margin-right:20px">
        <span class="f30" style="vertical-align:middle">BlockChain-Scan</span>
      </div>
      <div class="block-item">
        <div class="item text-left" @click="jumpTo(blockNum)">
          <h1 class="f14">LAST BLOCK</h1>
          <h4 class="f20">
            <span class="block-num">{{blockNum}}</span>
            <span>({{second}}s)</span> 
          </h4>
        </div>
        <div class="item text-right">
          <h1 @click="jumpTo('tran')" class="f14">TRANSACTIONS</h1>
          <h4 class="f20">
            <span class="block-num">{{tpsNum}} M</span>
            <span>({{tps}} TPS)</span>
          </h4>
        </div>
      </div>
      <div class="block-item">
        <div class="item text-left">
          <h1 class="f14">Hash Rate</h1>
          <h4 class="f20">
            <span>{{gh | thousandFilter}} GH/s</span>
          </h4>
        </div>
        <div class="item text-right">
          <h1 class="f14">Network Difficulty</h1>
          <h4 class="f20">
            <span>{{th | thousandFilter}} TH</span>
          </h4>
        </div>
      </div>
    </div>
    <div class="section right-one">
      <chart ref="simpleChart"/>
    </div>
    <div class="section">
      <blocks :blockdata="blockdata" :newData="newData"/>
    </div>
    <div class="section">
      <transactions :transactiondata="transactiondata" :newData="newData"/>
    </div>
  </div>
</template>
-->
<template>
  <div class="index-wrap">
    <div class="section left-one">
      <div class="left-one-title">
        <img src="../assets/icon_block.png" style="vertical-align:middle;margin-right:20px">
        <span
          class="f30"
          style="vertical-align:middle"
        >BlockChain-Scan</span>
      </div>
      <div class="block-item">
        <div class="item text-left" @click="jumpTo(blockNum)">
          <h1 class="f14">{{$t('message.LASTBLOCK')}}</h1>
          <h4 class="f20">
            <span class="block-num">{{blockNum}}</span>
            <span>({{second}}s)</span>
          </h4>
        </div>
        <div class="item text-right">
          <h1 @click="jumpTo('tran')" class="f14">{{$t('message.TRANSACTIONS')}}</h1>
          <h4 class="f20">
            <span class="block-num" @click="jumpTo('tran')">{{tpsNum}} </span>
            <!-- <span>({{tps}} TPS)</span> -->
          </h4>
        </div>
      </div>
      <div style="height:75px"></div>
      <!-- <div class="block-item">
        <div class="item text-left">
          <h1 class="f14">{{$t('message.HashRate')}}</h1>
          <h4 class="f20">
            <span>{{gh | thousandFilter}} GH/s</span>
          </h4>
        </div>
        <div class="item text-right">
          <h1 class="f14">{{$t('message.NetworkDifficulty')}}</h1>
          <h4 class="f20">
            <span>{{th | thousandFilter}} TH</span>
          </h4>
        </div>
      </div> -->
    </div>
    <div class="section right-one">
      <chart ref="simpleChart"/>
    </div>
    <div class="section">
      <blocks :blockdata="blockdata" :newData="newData" :unit="unit"/>
    </div>
    <div class="section">
      <transactions :transactiondata="transactiondata" :newData="newData" :unit="unit"/>
    </div>
  </div>
</template>
<script>
import chart from "@/components/chart.vue";
import blocks from "@/components/blocks.vue";
import transactions from "@/components/transactions.vue";

export default {
  components: {
    chart,
    blocks,
    transactions
  },
  data() {
    return {
      blockNum: 0,
      second: 14.1,
      tpsNum: 346.82,
      tps: 7.7,
      gh: 220416.83,
      th: 2772.2,
      blockdata: [],
      transactiondata: [],
      newData: {},
      // wsUrl: "ws://10.0.20.144:8080/web3j/v1.0/websocket", //测试服
      wsUrl: "ws://wsxb.haizhutoken.com:80/web3j/v1.0/websocket", //测试服
      lockReconnect: false, //避免ws重复连接
      ws: null,
      time1: 0,
      unit:''
    };
  },
  created() {
    this.getData();
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
          this.getData();
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
    // this.unit ='ava'
  },
  methods: {
    initWebSocket() {
      let _this = this;
      try {
        if (_this.ws == null) {
          if ("WebSocket" in window) {
            _this.ws = new WebSocket(_this.wsUrl);
          } else if ("MozWebSocket" in window) {
            _this.ws = new MozWebSocket(_this.wsUrl);
          } else {
            alert(
              "您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！"
            );
          }
          _this.initEventHandle();
        }
      } catch (e) {
        _this.reconnect(_this.wsUrl);
      }
    },
    initEventHandle() {
      let _this = this;
      _this.ws.onclose = function() {
        _this.reconnect(_this.wsUrl);
        console.log("llws连接关闭!" + new Date().toUTCString());
      };
      _this.ws.onerror = function() {
        _this.reconnect(_this.wsUrl);
        // console.log("llws连接错误!");
      };
      _this.ws.onopen = function() {
        heartCheck.reset().start(); //心跳检测重置
        console.log("llws连接成功!" + new Date().toUTCString());
      };
      _this.ws.onmessage = function(event) {
        //如果获取到消息，心跳检测重置
        heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
        console.log("llws收到消息啦:" + event);
        _this.getTime();
        setTimeout(function() {
          _this.global_callback(event);
        }, 8000);
      };
      //心跳检测
      let heartCheck = {
        timeout: 50000, //50秒发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function() {
          clearTimeout(this.timeoutObj);
          clearTimeout(this.serverTimeoutObj);
          return this;
        },
        start: function() {
          var self = this;
          this.timeoutObj = setTimeout(function() {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            if (_this.ws.readyState == 0) {
              _this.ws.send("ping");
            }
            // console.log("ping!");
            self.serverTimeoutObj = setTimeout(function() {
              //如果超过一定时间还没重置，说明后端主动断开了
              _this.ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout);
          }, this.timeout);
        }
      };
    },
    reconnect(url) {
      let _this = this;
      if (_this.lockReconnect) return;
      _this.lockReconnect = true;
      setTimeout(function() {
        //没连接上会一直重连，设置延迟避免请求过多
        _this.initWebSocket(url);
        _this.lockReconnect = false;
      }, 2000);
    },
    global_callback(e) {
      this.newData = JSON.parse(e.data);
      
      // console.log(JSON.stringify(this.newData) );
      this.newData.block.timestamp = this.$time(
        this.time1 - this.newData.block.timestamp
      );
      // this.newData.block.timestamp = this.$timestampToTime(this.newData.block.timestamp)
      for (let i = 0; i < this.newData.block.transactions.length; i++) {
        this.newData.block.transactions[
          i
        ].timestamp = this.newData.block.timestamp;
      }
      this.blockNum = this.newData.block.number;
    },
    jumpTo(val) {
      if (val == "tran") {
        // this.$router.push({
        //   name: "transactionsPage"
        // });
        this.$router.push({path:'/transtion/transactionsPage',query: { page: 1 }})
      } else {
        this.$router.push({
          name: "blockDetail",
          params: { blockid: val }
        });
      }
    },
    async getTime() {
      let { data } = await this.$fetch("/date");
      this.time1 = data;
    },
    async getData() {
      let param = {
        pageStart: 0,
        pageNum: 10
      };
      await this.getTime();
      // 获取单位
      this.$fetch("/Socket/getMainCoinName", param).then(response => {
        if (response.status == 200) {
         this.unit = response.data
        }
      });
      // 获取总量
      this.$fetch("/getAllTxCounts", param).then(response => {
        if (response.status == 200) {
         this.tpsNum = response.data
        }
      });
      // 查询全部区块
      this.$fetch("/query/block/data", param).then(response => {
        if (response.status == 200) {
          this.blockdata = response.data;
          this.blockNum = response.data[0].number;
          for (let i = 0; i < this.blockdata.length; i++) {
            let newTime = this.blockdata[i].timestamp;
            this.blockdata[i].timestamp = this.$time(this.time1 - newTime);
            // this.blockdata[i].timestamp = this.$timestampToTime(newTime)
          }
        }
      });
      // 查询全部交易
      this.$fetch("/query/transaction/data", param).then(response => {
        if (response.status == 200) {
          this.transactiondata = response.data;
          // console.log(JSON.stringify(response.data))
          for (let i = 0; i < this.transactiondata.length; i++) {
            let newTime = this.transactiondata[i].timestamp;
            this.transactiondata = response.data;
            this.transactiondata[i].timestamp = this.$time(
              this.time1 - newTime
            );
            //  this.transactiondata[i].timestamp = this.$timestampToTime(newTime)
          }
          
        }
      });
      this.initWebSocket();
    }
  },
  destroyed() {
    console.log('进入销毁')
    this.ws.close();
  }
};
</script>
<style lang="scss" scoped>
.active {
  /* 旋转360度 */
  transform: rotate(360deg);
  /* all表示所有属性,1s表示在一秒的时间完成动画 */
  transition: all 1s;
}
.index-wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f7f7f7;
  padding: 20px;
  font-family: PingFangSC-Semibold;
}
.f14 {
  font-size: 14px;
}
.f20 {
  font-size: 20px;
}
.f30 {
  font-size: 30px;
}
h1 {
  margin: 0;
  font-weight: 400;
  margin-bottom: 9px;
}
h4 {
  margin: 0;
  font-weight: 500;
}
.section {
  width: 48%;
  margin-bottom: 20px;
  height: auto;
}
.block-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
}
.left-one-title {
  margin-bottom: 45px;
  text-align: left;
}
.left-one {
  background-image: linear-gradient(-90deg, #3c4857 0%, #7591b5 100%);
  color: #ffffff;
  padding: 35px 30px 11px;
  box-sizing: border-box;
}
h1,
.block-num {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.tip {
  font-size: 0.75rem;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
@media screen and (max-width: 768px) {
  .section {
    width: 100%;
  }
}
</style>

