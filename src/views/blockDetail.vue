<template>
  <div class="wrap" v-loading="loading">
    <div class v-if="this.$route.params.status === '1'">Unable to find relevant data</div>
    <el-tabs type="border-card" class="detail-wrap" v-else>
      <el-tab-pane>
        <span slot="label">{{$t('message.Overview')}}</span>
        <div class="detail-title">
          <h1>{{$t('message.BlockInformation')}}</h1>
        </div>
        <div class="detail-content">
          <ul>
            <li class="li-border">
              <p class="text-left">{{$t('message.Height')}}:</p>
              <p class="text-right">{{detailItem.number || 0}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.TimeStamp')}}:</p>
              <p class="text-right">
                <span
                  v-if="detailItem.timestamp[0] > 0"
                >{{detailItem.timestamp[0]}} days {{detailItem.timestamp[1]}} hours </span>
                <span v-else-if="detailItem.timestamp[1] > 0">{{detailItem.timestamp[1]}} hours </span>
                <span v-if="detailItem.timestamp[2] > 0">{{detailItem.timestamp[2]}} mins </span>
                <span>{{detailItem.timestamp[3]}} secs ago </span>
                <span>({{detailItem.timestampUTC}})</span>
              </p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Transactions')}}:</p>
              <p
                class="text-right jump" @click="toDetail(detailItem.number,'txns')"
              >{{detailItem.transactions == [] ? 0 : detailItem.transactions.length}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.BlockHash')}}:</p>
              <p class="text-right">{{detailItem.hash}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.ParentHash')}}:</p>
              <p
                class="text-right jump"
                @click="jumpTo(detailItem.parentHash,'hash')"
              >{{detailItem.parentHash}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Sha3Uncles')}}:</p>
              <p class="text-right">{{detailItem.sha3Uncles}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.MinedBy')}}:</p>
              <p
                class="text-right jump"
                @click="jumpTo(detailItem.miner,'address')"
              >{{detailItem.miner}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Difficulty')}}:</p>
              <p class="text-right">{{detailItem.difficulty | thousandFilter}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.TotalDifficulty')}}:</p>
              <p class="text-right">{{detailItem.totalDifficulty | thousandFilter}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Size')}}:</p>
              <p class="text-right">{{detailItem.size}}&nbsp;bytes</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.GasUsed')}}:</p>
              <p
                class="text-right"
              >{{detailItem.gasUsed | thousandFilter}} {{detailItem.gasUsed / detailItem.gasLimit | cost}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.GasLimit')}}:</p>
              <p class="text-right">{{detailItem.gasLimit | thousandFilter}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.Nonce')}}:</p>
              <p class="text-right">{{detailItem.nonce}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.BlockReward')}}:</p>
              <!-- <p class="text-right">'3ETH+'+{{detailItem.size}}</p> -->
              <p
                class="text-right"
              >{{3+detailItem.gasUsed/Math.pow(10,18)}} {{detailItem.maincoinName}}&nbsp;&nbsp;(3&nbsp; {{detailItem.maincoinName}}+{{detailItem.gasUsed/Math.pow(10,18)}})</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.UnclesReward')}}:</p>
              <p class="text-right">{{detailItem.uncles = [] ? 0 : detailItem.uncles.length}}</p>
            </li>
            <li class="li-border">
              <p class="text-left">{{$t('message.ExtraData')}}:</p>
              <p class="text-right-two">{{detailItem.extraData}}</p>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Comments">Comments</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailItem: {},
      loading: false,
      time1: "0"
    };
  },
  filters:{
     cost(num){
        let per = '('+(num*100).toString().slice(0,5) + '%)'
        return per == '(0%)' ? '(0.00%)' : per == '(100%)' ? '(100.00%)' : per
    }
  },
  created() {
    this.getInfo();
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
         this.getInfo();
    });
    EventUtil.addHandler(window, "offline", () =>{ 
         console.log("网络不给力，请检查网络设置!");
    });
  },
  methods: {
    async getInfo() {
      let blockid = this.$route.params.blockid;
      let status = this.$route.params.status;
      let param = {}; //参数
      if (blockid.toString().indexOf("0x") != -1) {
        param = { hash: blockid };
      } else {
        param = { number: blockid };
      }
      if (status === "1") {
        return "";
      }
      if (status === "0" || !status) {
        await this.getTime()
        this.$fetch("/queryBlockByValue", param).then(response => {
          if (response.status == 200) {
            if (response.data.length != 0) {
              this.loading = false;
              this.detailItem = response.data[0];
              // 处理时间戳为时间差
              let newTime = this.detailItem.timestamp;
              this.detailItem.timestampUTC = this.$timestampToTimeUtc(newTime);
              this.detailItem.timestamp = this.$time(this.time1 - newTime);
            } else {
              this.loading = true;
              this.getInfo();
            }
          }
        });
      }
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
    jumpTo(number, type) {
      if (type == "hash") {
        this.$router.push({
          name: "blockDetail",
          params: { blockid: number }
        });
        this.getInfo();
      } else {
        this.$router.push({
          name: "address",
          params: { blockid: number, type: "miner" }
        });
      }
    },
    async getTime() {
      let { data } = await this.$fetch("/date");
      this.time1 = data;
    }
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.getInfo();
    }
  }
};
</script>
<style scoped lang='scss'>
.li-border{
  border-bottom: 1px solid #e7eaf3;
  padding: 10px 0
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
}
p {
  margin: 0;
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
  padding-left: 1.25rem;
  font-size: 14px;
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
  padding-right: 1.25rem;
}
.text-right-two {
  flex: 4;
  text-align: left;
  // overflow: hidden;
  // white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 1.25rem;
  word-break: break-all;
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
  p {
    margin: 0;
  }
  .text-right,.text-right-two {
    margin-top: 10px
  }
}
</style>

