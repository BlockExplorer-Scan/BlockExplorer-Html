<template>
  <div class="blocks-wrap">
    <div class="block-title">
      <h1>
        <transition name="rotate">
          <i class="fa fa-cubes"></i>
        </transition>{{$t('message.blocks')}}
      </h1>
      <router-link :to="{path:'/block/blocksPage',query: { page: 1 }}" class="view-all-btn">{{$t('message.viewAll')}}</router-link>
    </div>
    <div class="block-content">
      <p v-if="blockdata.length == 0" style="margin-top:50px;font-size:20px;color:#999">{{$t('message.NoData')}}</p>
      <transition-group tag="ul" name="fade" v-else>
        <li class="blocks-item" v-for="item in newBlockData" :key="item.number" >
          <div class="item-left">
            <p @click="toDetail(item.number, 'number')" class="has-under">{{$t('message.Block')}} {{item.number}}</p>
            <p>
              >
              <span v-if="item.timestamp[0] > 0"> {{item.timestamp[0]}} {{$t('message.days')}} </span>
              <span v-if="item.timestamp[1] > 0"> {{item.timestamp[1]}} {{$t('message.hours')}} </span>
              <span v-if="item.timestamp[2] > 0"> {{item.timestamp[2]}} {{$t('message.mins')}} </span>
              <span>{{item.timestamp[3]}} {{$t('message.secsAgo')}}</span>
              <!-- <span>{{item.timestamp}}</span> -->
            </p>
          </div>
          <div class="item-right">
            <p>
              {{$t('message.MinedBy')}}
              <span @click="toDetail(item.miner, 'miner')" class="jump">{{item.miner}}</span>
            </p>
            <p>
              <span
                @click="toDetail(item.number, 'txns')"
                class="jump"
              >{{item.transactions.length}} {{$t('message.Txns')}}</span>
              {{$t('message.in')}} {{item.secs || 0 }} {{$t('message.secs0')}}
            </p>
            <p> {{$t('message.BlockReward')}} {{item.gasUsed | fixedFive}} {{unit}}</p>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  props: ["blockdata", "newData","unit"],
  data() {
    return {
      mins: 0,
      secs: 0
    };
  },
  computed: {
    // 真正渲染的数据
    newBlockData() {
      return this.blockdata;
    }
  },
  created() {
    let _this = this;
    // 定时器 不删
    setInterval(function() {
      for (let i = 0; i < _this.newBlockData.length; i++) {
        if(_this.newBlockData[i].timestamp[3] < 0){
          _this.$set(_this.newBlockData[i].timestamp, 3, 0);
        }
        if (_this.newBlockData[i].timestamp[3] >= 59) {
          _this.$set(_this.newBlockData[i].timestamp, 3, 0);
          _this.$set(_this.newBlockData[i].timestamp, 2, _this.newBlockData[i].timestamp[2] + 1);
        } else {
          _this.$set(_this.newBlockData[i].timestamp, 3, _this.newBlockData[i].timestamp[3] + 1);
        }
      }
    }, 1000);
  },
  mounted() {},
  watch: {
    // 监听是否有新数据 如果有新数据 则更新数据
    newData: function(newVal, oldVal) {
      let arr = [];
      let blockdata = this.blockdata //保存数据变量
      blockdata.forEach(element => {
        arr.push(element.number);
      });
      // 判断数据是否已经存在
      if (arr.indexOf(newVal.block.number) == -1) {
        if (blockdata.length < 10) {
          blockdata.unshift(newVal.block);
        } else {
          blockdata.splice(0, 0, newVal.block);
          blockdata.pop();
        }
      } else {
        console.log("blockdata already exist data");
      }
    }
  },
  methods: {
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
    }
  },
  filters: {
    fixedFive(val) {
      return (0.1 + val / Math.pow(10, 18)).toFixed(5);
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
li {
  display: flex;
  background-color: #fff;
  width: 100%;
  height: 6.25rem;
  padding: 0.9375rem;
  box-sizing: border-box;
  margin-bottom: 0.125rem;
  align-items: center;
}
.jump {
  color:#0193C9;
  display: inline-block;
  max-width: 9.375rem;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
p {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
}
.item-left {
  background-image: linear-gradient(-90deg, #363F4C 0%, #878789 100%);
  padding: 0.9375rem 0;
  margin-right: 20px;
  color: #fff;
  font-size: 14px;
  flex: 1;
}
.item-right {
  text-align: left;
  color: #666;
  flex: 2;
}
.has-under:hover {
  cursor: pointer;
  text-decoration: underline;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

