<template>
  <!-- 面包屑 -->
  <div style="width:100%;background-color: rgb(249, 249, 249)">
    <div class="crumbs">
      <div class="crumbs-content">
        <div class="crumbs-title">
            
        </div>
        <el-breadcrumb separator="/" style="height:50px;line-height:50px;">
          <el-breadcrumb-item v-for="item in crumbsList" :key="item.path">
            <router-link :to="item.redirect||item.path" append="append">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      crumbsList: null
    };
  },
  mounted() {
    this.getCrumbs();
  },
  methods: {
    // 获取面包屑
    getCrumbs() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== "home") {
        matched = [{ path: "/", meta: { title: "Home" } }].concat(matched);
      }
      this.crumbsList = matched;
    }
  },
  watch: {
    // 监听路由跳转
    $route(to, from) {
        console.log('to',to)
      this.getCrumbs();
    }
  }
};
</script>
<style lang="scss" scoped>
.crumbs {
  height: 3.125rem;
  line-height: 3.125rem;
  border-bottom: solid 1px #e6e6e6;
  margin: 0 auto;
}
.crumbs-content {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
}
</style>
