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
          prev-text="Prev"
          next-text="Next"
          :page-count='pageCount'
        >
          <!-- <span style="margin:0 10px">Total:{{total}}</span> -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['pageCount'],
  data() {
    return {
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
      currentPage: 1,
    };
  },
  watch:{
          pageCount:function(val){
              console.log(this.pageCount)
              
          }
        },
  methods: {
    //   页面显示数据条数
    // handleSizeChange() {
    //     this.$emit('refreshList',this.pageSize)
    // },
    //   分页
    handleCurrentChange() {
      this.$emit("refreshList",this.currentPage);
    }
  },
  mounted(){
    // console.log('================='+this.pageCount)
  }
};
</script>

<style scoped>
.el-select {
  width: 60px;
  margin: 0 5px;
}
.pager{
  display: flex;
  align-items: center
}

</style>
