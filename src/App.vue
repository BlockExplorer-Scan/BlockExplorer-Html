<template>
  <div id="app">
    
<!-- <p>{{$t('message.hello')}}</p>  -->
    <iHeader class="header-wrap" />
    <router-view class="page"></router-view>
  </div>
</template>
<script>
import iHeader from "@/components/header.vue";
import index from "@/views/index.vue";
export default {
  components: {
    iHeader
  },
  data(){
    return{
      // ifHidden:''
    }
  },
  created(){
    //  this.ifHidden = this.$route.query.ifHidden == 'true' || this.$route.query.ifHidden == true ? true :false
    // console.log(typeof this.$route.query.ifHidden)
    // console.log( this.$route.query.ifHidden)
    // console.log(typeof this.ifHidden)
  },
  mounted(){
  //    this.ifHidden = this.$route.query.ifHidden == 'true' || this.$route.query.ifHidden == true ? true :false
  // console.log(typeof this.$route.query.ifHidden)
  // console.log( this.$route.query.ifHidden)
    // console.log(typeof this.ifHidden)
  }
};
</script>

<style lang="scss" >
.el-message--error .el-message{
  top:50%;
}
html * {
  font-size: 13px;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: PingFangSC-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #000;
}
.page {
  // width:1170px;
  margin: 0 auto;
  padding: 10px 0;
  box-sizing: border-box;
}
.ellipsis {
  // 文字超出省略号
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.under-l {
  text-decoration: underline;
}
.el-menu-item,
.el-submenu__title {
  height: 38px;
  line-height: 38px;
  text-align: left;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #337ab7 !important;
  color: #fff !important;
}
.el-table .cell,
.el-table th div {
  padding-right: 0 !important;
}
.el-table .cell > span {
  margin-left: 0 !important;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: none !important;
}
.el-tabs__header {
  margin: 0 !important;
}
.el-tabs__content {
  border: 1px solid #eee !important;
  padding: 10px;
}
.el-table td,
.el-table th {
  padding: 5px 0 !important;
}
@media screen and (min-width: 768px) {
  .page {
    width: 750px;
  }
}
@media screen and (min-width: 992px) {
  .page {
    width: 970px;
  }
}
@media screen and (min-width: 1200px) {
  .page {
    width: 1170px;
  }
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
