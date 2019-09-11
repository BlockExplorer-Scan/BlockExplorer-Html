<template>
  <div class="paging">
    <!-- 分页 -->
    <div style="display:flex;justify-content: flex-end">
      <!-- <div class="pages">
        <span>Show</span>
        <el-select v-model="pageSize" size="mini" @change="handleSizeChange">
          <el-option
            v-for="item in pageSizes"
            :key="item.pageSize"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span>Page</span>
      </div>-->
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
          :page-count='pageCount'
        >
          <!-- <span style="margin:0 10px">Total:{{total}}</span> -->
        </el-pagination>
        <span>{{$t('message.goto')}}</span>
        <input v-model="inputPage" class="page-input" v-on:keyup.13="handleCurrentChange(inputPage)">
        <!-- <el-button type="primary" size="mini" @click="handleCurrentChange(inputPage)">{{$t('message.sure')}}</el-button> -->
        <button type="primary" size="mini" @click="handleCurrentChange(inputPage)" style="color:#fff;outline:none;border:none;background-color:#337ab7;line-height:20px;font-weight:bold;cursor:pointer">{{$t('message.sure')}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['pageCount','currentPage'],
  data() {
    return {
      inputPage:'',
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
      // currentPage: 1,
      selfPage:this.currentPage
    };
  },
  watch:{
          pageCount:function(val){
              // console.log(this.pageCount)
              
          }
        },
  methods: {
    //   页面显示数据条数
    // handleSizeChange() {
    //     this.$emit('refreshList',this.pageSize)
    // },
    //   分页
    handleCurrentChange(val) {
      console.log(val)
      this.$emit("refreshList",val);
      // this.currentPage = parseInt(this.inputPage)
    }
  },
  mounted(){
    //  this.inputPage = this.currentPage
    // console.log('================='+this.pageCount)
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
.el-select {
  width: 60px;
  margin: 0 5px;
}
.pager{
  display: flex;
  align-items: center
}

</style>
<style >
/* .el-button--primary{
  background-color: #337ab7 !important;
  line-height: 22px;
  height: 22px;
} */
</style>
