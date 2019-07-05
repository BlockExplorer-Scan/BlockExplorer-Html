<template>
  <div style="margin-bottom:15px">
    <el-table :data="holder" style="width: 100%" :header-row-style="{color:'#333'}">
      <template slot="empty">
        <p>NoData</p>
      </template>
      <!--<el-table-column width="50" type="index" :index="indexMethod">-->
      <!--<template slot="header" slot-scope="scope">-->
      <!--<div></div>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column :label="tableTitle.rank" min-width="50">
        <template slot-scope="scope">
          <span class="color333">{{scope.row.rank}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Address" min-width="350">
        <template slot-scope="scope">
          <span class="jump" @click="jump(scope.row.Address)">{{scope.row.Address}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Quantity" min-width="150">
        <template slot-scope="scope">
          <span class="color333">{{scope.row.Quantity}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="tableTitle.Percentage">
        <template slot-scope="scope" min-width="180">
          <span class="color333">{{scope.row.Percentage}}%</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Bus from "@/bus.js";
export default {
  props: ["holders", "startfrom"],
  data() {
    return {
      tableTitle: {
        rank: "rank",
        Address: "Address",
        Quantity: "Quantity",
        Percentage: "Percentage"
      }
    };
  },
  computed: {
    holder() {
      return this.holders;
    }
  },
  created() {
    if (this.$i18n.locale == "cn") {
      // alert(1212)
      this.tableTitle = {
        rank: "排名",
        Address: "地址",
        Quantity: "数量",
        Percentage: "百分率"
      };
    } else {
      this.tableTitle = {
        rank: "rank",
        Address: "Address",
        Quantity: "Quantity",
        Percentage: "Percentage"
      };
    }
  },
  mounted() {
    Bus.$on("language", data => {
      if (data == "cn") {
        this.tableTitle = {
          rank: "排名",
          Address: "地址",
          Quantity: "数量",
          Percentage: "百分率"
        };
      } else {
        this.tableTitle = {
          rank: "rank",
          Address: "Address",
          Quantity: "Quantity",
          Percentage: "Percentage"
        };
      }
    });
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    jump(val) {
      this.$router.push({
        name: "address",
        params: {
          blockid: val,
          type: ""
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.jump {
  color: #0193c9;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
.color333 {
  color: #333;
}
</style>