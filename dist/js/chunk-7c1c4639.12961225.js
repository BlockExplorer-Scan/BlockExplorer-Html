(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c1c4639"],{"01b9":function(e,t,a){"use strict";var s=a("c33e"),n=a.n(s);n.a},7331:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrap"},[a("transition",{attrs:{name:"el-fade-in"}},[e.searchStatus?a("Search",{attrs:{type:"transaciton"},on:{getSearchData:e.changeTableData,errorMessage:e.shwoErroer}}):e._e()],1),a("el-table",{staticStyle:{margin:"5px auto 30px"},attrs:{data:e.tableData,"header-cell-style":{color:"black",background:"#f9f9f9"},size:"mini","row-style":{fontWeight:600}}},[a("template",{slot:"empty"},[a("p",[e._v(e._s(e.$t("message.NoData")))])]),a("el-table-column",{attrs:{label:e.tableTitle.TxHash,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",staticStyle:{display:"flex"},attrs:{slot:"reference"},on:{click:function(a){e.toDetail(t.row.hash,"hash")}},slot:"reference"},[a("p",{staticClass:"show-space",staticStyle:{margin:"0"}},["Fail"==t.row.status?a("span",{staticStyle:{display:"inline-block",background:"#de4437",color:"#fff",width:"14px",height:"14px","line-height":"14px","font-size":"10px","border-radius":"50%","text-align":"center",margin:"0","margin-right":"5px"}},[e._v("!")]):e._e(),e._v(e._s(t.row.hash))])])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.Block,"min-width":"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},on:{click:function(a){e.toDetail(t.row.blockNumber,"number")}},slot:"reference"},[e._v("\n          "+e._s(t.row.blockNumber)+"\n        ")])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.Age,"min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showTime?a("div",{on:{click:e.changeTime}},[e._v(e._s(t.row.timestampUTC))]):a("div",{on:{click:e.changeTime}},[t.row.timestamp[0]>0?a("span",[e._v("\n              "+e._s(t.row.timestamp[0])+" "+e._s(e.$t("message.days"))+"\n              "+e._s(t.row.timestamp[1])+" "+e._s(e.$t("message.hours"))+"\n            ")]):t.row.timestamp[1]>0?a("span",[e._v(e._s(t.row.timestamp[1])+" "+e._s(e.$t("message.hours"))+" ")]):e._e(),t.row.timestamp[2]>0?a("span",[e._v(e._s(t.row.timestamp[2])+" "+e._s(e.$t("message.mins"))+" ")]):e._e(),a("span",[e._v(e._s(t.row.timestamp[3])+" "+e._s(e.$t("message.secsAgo")))])])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.From,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},on:{click:function(a){e.toDetail(t.row.from,"from")}},slot:"reference"},[e._v("\n          "+e._s(t.row.from)+"\n        ")])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.To,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},on:{click:function(a){e.toDetail(t.row.to,"to")}},slot:"reference"},[e._v("\n          "+e._s(t.row.to)+"\n        ")])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.Value},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.value?a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.value/Math.pow(10,18))+" "+e._s(t.row.maincoinName)+" ")]):a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.valueStr/Math.pow(10,18))+" "+e._s(t.row.maincoinName))])]}}])}),a("el-table-column",{attrs:{label:e.tableTitle.TxFee,"min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s((t.row.gasUsed*(t.row.gasPrice/Math.pow(10,18))).toFixed(8)))])]}}])})],2),a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("div",{staticClass:"pages"},[a("span",{staticStyle:{"font-size":"14px","font-weight":"600"}},[e._v(e._s(e.$t("message.Show")))]),a("el-select",{attrs:{size:"mini"},on:{change:e.handleSizeChange},model:{value:e.pageSize,callback:function(t){e.pageSize=t},expression:"pageSize"}},e._l(e.pageSizes,function(e){return a("el-option",{key:e.pageSize,attrs:{label:e.label,value:e.value}})})),a("span",{staticStyle:{"font-size":"14px","font-weight":"600"}},[e._v(e._s(e.$t("message.Page")))])],1),a("div",{staticClass:"pager"},[a("span",{staticStyle:{"font-size":"14px","font-weight":"600"}},[e._v(e._s(e.$t("message.Currentpage"))+": "+e._s(e.currentPage))]),a("el-pagination",{attrs:{"current-page":e.currentPage,layout:e.layout,small:"",background:"","prev-text":e.$t("message.prev"),"next-text":e.$t("message.next")},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}}),a("span",[e._v(e._s(e.$t("message.goto")))]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.inputPage,expression:"inputPage"}],staticClass:"page-input",domProps:{value:e.inputPage},on:{keyup:function(t){if(!("button"in t)&&13!==t.keyCode)return null;e.handleCurrentChange(e.inputPage)},input:function(t){t.target.composing||(e.inputPage=t.target.value)}}}),a("button",{staticStyle:{color:"#fff",outline:"none",border:"none","background-color":"#337ab7","line-height":"20px","font-weight":"bold",cursor:"pointer"},attrs:{type:"primary",size:"mini"},on:{click:function(t){e.handleCurrentChange(e.inputPage)}}},[e._v(e._s(e.$t("message.sure")))])],1)]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.messageWord,expression:"messageWord"}],staticClass:"message-box"},[e._v(e._s(e.messageWord))])],1)},n=[],r=(a("96cf"),a("1da1")),i=(a("cadf"),a("551c"),a("097d"),a("f5ef")),o=a("067f"),l={components:{Search:o["a"]},data:function(){return{showTime:!1,inputPage:"",messageWord:"",pageCount:"",input:"",value3:"",tableTitle:{TxHash:"TxHash",Block:"Block",Age:"Age",From:"From",To:"To",Value:"value",TxFee:"[TxFee]"},tableData:[],currentPage:parseInt(this.$route.query.page),pageStart:parseInt(this.$route.query.page)-1==0?0:20*(parseInt(this.$route.query.page)-1),pageNum:20,pages:1,layout:"prev, next",pageSizes:[{value:20,label:20},{value:30,label:30},{value:40,label:40},{value:50,label:50}],pageSize:20,time1:0,searchData:{},searchStatus:!1,ifSearch:!1}},created:function(){var e=this,t=this.$route.query.blockid;null!=t?this.queryTransactionByValue(t):this.querytransaction(this.pageStart,this.pageNum);var a={addHandler:function(e,t,a){e.addEventListener?e.addEventListener(t,a,!1):e.attachEvent?e.attachEvent("on"+t,a):e["on"+t]=a}};a.addHandler(window,"online",function(){console.log("连上网了！"),null!=t?e.queryTransactionByValue(t):e.querytransaction(e.pageStart,e.pageNum)}),a.addHandler(window,"offline",function(){console.log("网络不给力，请检查网络设置!")}),"cn"==this.$i18n.locale?this.tableTitle={TxHash:"交易哈希",Block:"區塊",Age:"块龄",From:"发送方",To:"接收方",Value:"价值",TxFee:"[交易费用]"}:this.tableTitle={TxHash:"TxHash",Block:"Block",Age:"Age",From:"From",To:"To",Value:"value",TxFee:"[TxFee]"}},mounted:function(){var e=this;i["a"].$on("changeSearch",function(t){e.searchStatus=t}),i["a"].$on("language",function(t){e.tableTitle="cn"==t?{TxHash:"交易哈希",Block:"區塊",Age:"块龄",From:"发送方",To:"接收方",Value:"价值",TxFee:"[交易费用]"}:{TxHash:"TxHash",Block:"Block",Age:"Age",From:"From",To:"To",Value:"value",TxFee:"[TxFee]"}})},methods:{changeTime:function(){this.showTime=!this.showTime},shwoErroer:function(e){var t=this;this.messageWord=e,setTimeout(function(){t.messageWord=""},2e3)},changeTableData:function(e){this.currentPage=1,this.searchData=e,this.searchData.transferStart&&(this.searchData.transferStart=this.searchData.transferStart*Math.pow(10,18)),this.searchData.transferEnd&&(this.searchData.transferEnd=this.searchData.transferEnd*Math.pow(10,18)),this.searchTableData(this.currentPage,this.pageStart,this.pageNum)},searchTableData:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a,s){var n=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getTime();case 2:this.searchData.pageStart=a,this.searchData.pageNum=s,this.ifSearch=!0,this.$router.push({path:"/transtion/transactionsPage",query:{page:t}}),this.$fetch("/Conditional/rangeQueryOuter",this.searchData).then(function(e){if(200==e.status){n.tableData=e.data[0],console.log(e.data);for(var t=0;t<e.data[0].length;t++){var a=n.tableData[t].timestamp;n.tableData[t].timestamp=n.$time(n.time1-a),n.tableData[t].timestampUTC=n.$timestampToTimeUtc(a)}}});case 7:case"end":return e.stop()}},e,this)}));return function(t,a,s){return e.apply(this,arguments)}}(),handleSizeChange:function(e){this.pageNum=e,this.currentPage=1,this.inputPage=this.currentPage,this.ifSearch?this.searchTableData(this.currentPage,this.pageStart,this.pageNum):(this.$router.push({path:"/transtion/transactionsPage",query:{page:this.currentPage}}),this.querytransaction(0,e))},handleCurrentChange:function(e){if(e)if(e=parseInt(e),e*this.pageNum>1e4)this.$message.error(this.$t("message.noMore10000"));else{this.currentPage=e;var t=this.pageNum,a=(e-1)*t;this.ifSearch?this.searchTableData(e,a,t):(this.$router.push({path:"/transtion/transactionsPage",query:{page:this.currentPage}}),this.querytransaction(a,t))}},querytransaction:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t,a){var s=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getTime();case 2:this.$fetch("/query/transaction/data",{pageStart:t,pageNum:a}).then(function(e){if(200==e.status){s.tableData=e.data;for(var t=0;t<e.data.length;t++){var a=s.tableData[t].timestamp;s.tableData[t].timestamp=s.$time(s.time1-a),s.tableData[t].timestampUTC=s.$timestampToTimeUtc(a)}}});case 3:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}(),queryTransactionByValue:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getTime();case 2:this.$fetch("/queryTransactionByValue",{blockNumber:t}).then(function(e){if(200==e.status){a.tableData=e.data;for(var t=0;t<e.data.length;t++){var s=a.tableData[t].timestamp;a.tableData[t].timestamp=a.$time(a.time1-s)}}});case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),toDetail:function(e,t){"hash"==t?this.$router.push({name:"transactionsDetail",params:{blockid:e}}):"number"==t?this.$router.push({name:"blockDetail",params:{blockid:e}}):this.$router.push({name:"address",params:{blockid:e},query:{type:t}})},getTime:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$fetch("/date");case 2:t=e.sent,this.time1=t.data;case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}},c=l,u=(a("01b9"),a("2877")),h=Object(u["a"])(c,s,n,!1,null,"a788ecd2",null);h.options.__file="transactionsPage.vue";t["default"]=h.exports},c33e:function(e,t,a){}}]);
//# sourceMappingURL=chunk-7c1c4639.12961225.js.map