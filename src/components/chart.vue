<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Bus from "@/bus.js";
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);

export default {
  name: "highcharts",
  // props:["unit"],
  data() {
    return {
      unit:'',
      chart: null,
      newdata: [],
      options: {
        title: {
          text: this.unit+" Transaction History in 14 days"
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: null
          },
          lineWidth: 2,
          lineColor: "#3498db",
          id: "temperature-axis"
          // labels: {},
          // tickPositions: [] // 指定竖轴坐标点的值
        },
        series: [],
        credits: {
          enabled: false //不显示LOGO
        },
        // tooltip: {
        //   formatter: function() {
        //     return `交易量:${this.series.data} k`;
        //   }
        // }
      }
    };
  },
  created() {},
  mounted() {
    this.initChart();
    //   if(this.$i18n.locale == 'cn'){
    //   this.options.title.text = 'AVA交易歷史14天'
    // }else{
    //   this.options.title.text = 'Ethereum Transaction History in 14 days'
    // }
    //  this.bus.$on('language', function (msg) {
    //       alert(msg)
    //     })
    Bus.$on("language", data => {
      this.newdata=[]
      if (data == "en") {
        this.options.title.text = this.unit+" Transaction History in 14 days";
      } else {
        this.options.title.text = this.unit+"14天内的交易歷史";
      }
      this.initChart();
    });
  },
  methods: {
    async getUnit(){
      let res = await this.$fetch("/Socket/getMainCoinName");
      this.unit = res.data;
      //  this.$fetch("/Socket/getMainCoinName").then(response => {
      //   if (response.status == 200) {
      //    this.unit = response.data
      //   }
      // });
    },
    async initChart() {
      await this.getUnit()
      console.log(this.unit+999999999999)
      let name = ''
      if (this.$i18n.locale == 'en') {
        this.options.title.text = this.unit+ " Transaction History in 14 days";
        name = 'Trading value'
      } else {
        this.options.title.text = this.unit+ "14天内的交易歷史";
        name = '交易量'
      }
      this.chart = new Highcharts.Chart(this.$el, this.options);
      let _this = this;
      this.$fetch("/query/transaction/counts").then(response => {
        // console.log(response);
        if (response.status == 200) {
          let series = response.data[0];
          Object.keys(series).forEach(function(key) {
            let newkey = key.split("-");
            newkey = `${newkey[1]}/${newkey[2]}`;
            _this.tip = series[key];
            series[key] = series[key];
            _this.options.xAxis.categories.push(newkey);
            // _this.newdata.push(parseFloat((series[key] / 1000).toFixed(3)));
            _this.newdata.push(parseFloat(series[key]));
          });
          if (_this.sum(_this.newdata) == 0) {
            let arr = [0, 2000, 4000, 6000, 8000, 10000, 12000];
            for (let j = 0; j < arr.length; j++) {
              _this.options.yAxis.tickPositions.push(arr[j]);
            }
          }
          let nihao = 'laisla '
          _this.chart.addSeries({
            name: name,
            data: _this.newdata,
            color: "#0193C9",
            showInLegend: false,
            tooltip: {
              // valueSuffix: "k"
            }
          });
        }
      });
    },
    sum(arr) {
      var len = arr.length;
      if (len == 0) {
        return 0;
      } else if (len == 1) {
        return arr[0];
      } else {
        return arr[0] + this.sum(arr.slice(1));
      }
    }
  }
};
</script>

<style lang="scss">
.highcharts-container {
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 10px -2px rgba($color: #000000, $alpha: 0.2);
  position: relative;
  &::after {
    content: "";
    display: block;
    height: 100%;
    width: 4px;
    background-image: linear-gradient(-141deg, #6e8df6 0%, #001f3f 100%);
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>