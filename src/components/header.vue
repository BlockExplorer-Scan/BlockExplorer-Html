<template>
  <div style="width:100%;border-bottom: solid 1px #e6e6e6;padding:0 5px;box-sizing:border-box">
    <!-- pc头部 -->
    <div class="header" v-if="isPc">
      <router-link :to="{name:'index'}">
        <img :src="imgSrc">
      </router-link>
      <div style="display: flex;align-items: center;justify-content: flex-start;">
        <!-- <router-link to="/login" class="login" v-if="!hasToken">
          <span >{{$t('message.LOGIN')}}   <i class="fa fa-male"></i></span>
        </router-link>
        <div v-else style="display:flex;justify-content:center;align-items:centere;line-height:20px;cursor: pointer;" @click="outLogin">
           <p>{{$t('message.LOGOUT')}}</p>
          <img src="../assets/head.jpg" alt="" style="width:20px;height:20px;margin-top:11.5px;margin-left:10px;margin-right:10px">
        </div> -->
        <!-- <form action method="post"> -->
          <input v-if="this.$i18n.locale == 'en'"
            type="text"
            placeholder="Search by Address / Txn Hash / Block"
            maxlength="66"
            class="search"
            v-model="search"
            v-on:keyup.13="searchData"
          >
            <input v-else
            type="text"
            placeholder="通過地址、Tx哈希、區塊值搜索"
            maxlength="66"
            class="search"
            v-model="search"
            v-on:keyup.13="searchData"
          >
          <input type="button" value="GO" class="s-btn" @click="searchData"  v-if="this.$i18n.locale == 'en'">
          <input type="button" value="搜索" class="s-btn" @click="searchData" v-else>
        <!-- </form> -->
        <el-dropdown class="language"  @command="changeLanguage">
          <span class="el-dropdown-link">
            <i class="fa fa-globe" style="font-size:20px"></i>  {{$t('message.Language')}}
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item :command="'en'">
              ENGLISH
              <i class="fa fa-check" v-if="this.$i18n.locale == 'en'"></i>
            </el-dropdown-item>
            <el-dropdown-item :command="'cn'">中文 <i class="fa fa-check" v-if="this.$i18n.locale == 'cn'"></i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 移动端头部 -->
    <div class="header" v-else>
      <!-- <span style="font-weight:bold;color:#3498db;font-size:30px; ">BlockChain-Scan</span> -->
       <router-link :to="{name:'index'}">
        <img src="../assets/logo.png" style="height:65px;">
      </router-link>
      <div>
      <!-- <span class="el-dropdown-link mobile-meun" @click="showMeun">
        <i class="fa fa-bars" style="color:#fff;width:20px;"></i>
      </span> -->
       <el-dropdown class="language"  @command="changeLanguage">
          <span class="el-dropdown-link">
            <i class="fa fa-globe" style="font-size:20px"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item :command="'cn'">
              ENGLISH
              <i class="fa fa-check" v-if="this.$i18n.locale == 'en'"></i>
            </el-dropdown-item>
            <el-dropdown-item :command="'en'">中文 <i class="fa fa-check" v-if="this.$i18n.locale == 'cn'"></i></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </div>
    </div>
    <!-- 公用导航栏 -->
    <!-- <div class="nav" v-if="isPc || showNav"> -->
    <div class="nav" >
      <el-menu
        :default-active="activeIndex"
        :class="[isPc ? 'el-menu-demo' : 'el-menu-vertical-demo']"
        :mode="navDecoration"
        @select="select"
      >
        <el-menu-item index="1">
          <router-link to="/"> {{$t('message.Home')}}</router-link>
        </el-menu-item>

        <el-submenu index="2">
          <template slot="title">
            <router-link to> {{$t('message.BlockChain')}}</router-link>
          </template>
          <el-menu-item index="2-1">
            <router-link :to="{path:'/transtion/transactionsPage',query: { page: 1 }}">
              <i class="fa fa-list-alt"></i>  {{$t('message.ViewTxns')}}
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="2-2" disabled>
            <i class="fa fa-tasks"></i>  {{$t('message.ViewPendingTxns')}}
          </el-menu-item>
          <el-menu-item index="2-3" disabled>
            <i class="fa fa-puzzle-piece"></i>  {{$t('message.ViewContractInternalTxns')}}
          </el-menu-item> -->
          <!-- <el-submenu index="2-4">
            <template slot="title">
              <router-link :to="{name:'blocksPage'}">
                <i class="fa fa-cubes"></i> View Blocks
              </router-link>
            </template>
            <el-menu-item index="2-4-1" disabled>FORKED Blocks (Reorgs)</el-menu-item>
          </el-submenu>-->
          <el-menu-item index="2-4">
            <router-link :to="{path:'/block/blocksPage',query: { page: 1 }}">
              <i class="fa fa-cubes"></i> {{$t('message.ViewBlocks')}}
            </router-link>
          </el-menu-item>
          <!-- <el-menu-item index="2-5" disabled>
            <i class="fa fa-cube"></i> {{$t('message.ViewUncles')}}
          </el-menu-item>
          <el-menu-item index="2-6" disabled>
            <i class="fa fa-building"></i> {{$t('message.TopAccounts')}}
          </el-menu-item>
          <el-menu-item index="2-7" disabled>
            <i class="fa fa-check-circle-o"></i> {{$t('message.VerifiedContracts')}}
          </el-menu-item> -->
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <router-link to>{{$t('message.Tokens')}}</router-link>
          </template>
          <el-menu-item index="3-1" >
            <!-- <i class="fa fa-certificate"></i> {{$t('message.ERC-20TopTokens')}} -->
            <router-link :to="{name:'tokens'}">{{$t('message.ERC-20TopTokens')}}</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="3-2" disabled>
            <i class="fa fa-bars"></i> {{$t('message.ViewERC-20Transfers')}}
          </el-menu-item>
          <el-menu-item index="3-3" disabled>
            <i class="fa fa-ticket"></i> {{$t('message.ERC-721TopTokens')}}
          </el-menu-item>
          <el-menu-item index="3-4" disabled>
            <i class="fa fa-bars"></i> {{$t('message.ViewERC-721Transfers')}}
          </el-menu-item> -->
        </el-submenu>

        <!-- <el-submenu index="4">
          <template slot="title" disabled>
            <router-link to>{{$t('message.RESOURCES')}}</router-link>
          </template>
          <el-menu-item index="4-1" disabled>
            <i class="fa fa-book"></i>{{$t('message. EthereumDirectory')}}
          </el-menu-item>
          <el-menu-item index="4-2" disabled>
            <i class="fa fa-bar-chart-o"></i> {{$t('message.ChartsAndStats')}}
          </el-menu-item>
          <el-menu-item index="4-3" disabled>
            <i class="fa fa-line-chart">{{$t('message.InteractiveChartandStats')}}</i> 
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="5">
          <router-link to>{{$t('message.MORE')}}</router-link>
        </el-menu-item> -->

        <!-- 10.11隐藏登录入口 -->
        <!-- <el-menu-item index="6" v-if="!isPc && !hasToken">
          <router-link to="/login">LOGIN</router-link>
        </el-menu-item>
        <el-menu-item index="6" v-if="hasToken">
          <span @click="outLogin">{{$t('message.LOGOUT')}}</span>
        </el-menu-item> -->

        <!-- <el-submenu index="7" v-if="!isPc">
          <template slot="title">
            <router-link to>LANGUAGE</router-link>
          </template>
          <el-menu-item index="7-1">English</el-menu-item>
          <el-menu-item index="7-2">中文</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </div>
    <!-- 移动端搜索框 -->
    <div class="search-large" v-if="!isPc">
      <!-- <input type="text" placeholder="Search For Account, TxHash Or Data"> -->
       <!-- <form action method="post"> -->
         <div class="m-div">
          <input v-if="this.$i18n.locale == 'en'"
            type="text"
            placeholder="Search by Address / Txn Hash / Block"
            maxlength="66"
            class="search"
            v-model="search" 
            @keyup.enter ="searchData"
          >
          <input v-else
            type="text"
            placeholder="通過地址、Tx哈希、區塊值搜索"
            maxlength="66"
            class="search"
            v-model="search" 
            @keyup.enter="searchData"
          >
          <div class="s-btn m-s-btn" @click="searchData"  style="color:#FFf" v-if="this.$i18n.locale == 'en'">GO</div>
          <div class="s-btn m-s-btn" @click="searchData"  style="color:#FFf" v-else>搜索</div>
          <!-- <input type="button" value="GO" class="s-btn m-s-btn" @click="searchData"  style="color:#FFf" v-if="this.lang == 'cn'">
          <input type="button" value="搜索" class="s-btn m-s-btn" @click="searchData" style="color:#FFf" v-else> -->
        </div>
        <!-- </form> -->
    </div>
    <!-- 面包屑 -->
    <div style="width:100%;background-color: rgb(249, 249, 249)" v-if="crumbsList.length > 1">
      <div class="crumbs" v-if="isPc">
        <div class="crumbs-content">
          <div class="crumbs-title">
            <span style="color: #777;font-size: 20px;margin-top: 8px;font-weight:bold">{{pageName}}</span>
            <span style="color:#999;font-size: 20px;" v-if="this.$route.query.hide">{{pageNumber}}</span>
            <span style="color:#999" v-if="!this.$route.query.hide">{{pageNumber}}</span>
            <i class="el-icon-search" style="font-size:20px;background-color:#777777;color:#ffffff;margin-left:5px" @click="showSearch" v-if='(this.pageName == "交易  " && this.pageNumber == "") || (this.pageName == "Transactions  "&& this.pageNumber == "") '></i>
          </div>
          <el-breadcrumb separator="/" style="height:50px;line-height:50px;">
            <el-breadcrumb-item v-for="item in crumbsList" :key="item.path" v-if="item.meta.title">
              <!-- <router-link :to="item.redirect||item.path" v-if="lang == 'cn'">{{item.meta.title}}</router-link> -->
              <router-link :to="item.redirect||item.path" v-if="$i18n.locale == 'en'">{{item.meta.title}}</router-link>
              <router-link :to="item.redirect||item.path" v-else>{{item.meta.CNtitle}}</router-link>
              <!-- <router-link :to="item.redirect||item.path" v-else>{{item.meta.CNtitle}}</router-link> -->
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>

      <div class v-else>
        <!-- <div class="crumbs-content"> -->
        <div>
          <p style="color: #777;font-size: 20px;margin-top: 8px;">{{pageName}}</p>
          <p style="color:#999" class="over">{{pageNumber}}</p> 
          <i class="el-icon-search" style="font-size:20px;background-color:#ADD8E6;color:#ffffff;margin-left:5px" @click="showSearch" v-if='(this.pageName == "交易  " && this.pageNumber == "") || (this.pageName == "Transactions  "&& this.pageNumber == "") '></i>
        </div>
        <el-breadcrumb separator="/" style="height:50px;line-height:50px;">
          <el-breadcrumb-item v-for="(item,index) in crumbsList" :key="item.path" v-if="item.meta.title">
            <router-link :to="item.redirect||item.path" v-show="index != 2 && !isPc">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Bus from '@/bus.js'
export default {
  data() {
    return {
      hasToken :sessionStorage.getItem('token'),
      activeIndex: "1",
      crumbsList: [],
      showNav: false,
      screenWidth: document.body.clientWidth,
      isPc: true,
      navDecoration: "horizontal",
      pageName: "",
      pageNumber: "",
      search: "",
      lang:sessionStorage.getItem("nowLanguage") ? (sessionStorage.getItem("nowLanguage") ==  'en' ? 'cn' : 'en') : 'en',
      routerName:'',
      imgSrc:require("../assets/logo.png"),
      searchStatus:false,
      ifContract:false
    };
  },
  created() {
    if (this.screenWidth <= 992) {
      this.isPc = false;
      this.navType = false;
      // this.navDecoration = "vertical";
    }
  },
  mounted() {
    // console.log('888888'+sessionStorage.getItem('token'))
    // console.log('999'+this.hasToken)
    // alert(sessionStorage.getItem("nowLanguage"))
    this.$i18n.locale = sessionStorage.getItem("nowLanguage") ? sessionStorage.getItem("nowLanguage") : 'en'
    this.getCrumbs();
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    Bus.$on("login", data => {
     this.hasToken = data
    });
    Bus.$on("contractStatus", data => {
      console.log('是否合约'+data)
      this.ifContract = data
      this.getRouterName()
    });
  },
  methods: {
    // nihao(){
    //   alert('wo出发了回车')
    // },
    showSearch(){
      Bus.$emit('changeSearch', !this.searchStatus)
      this.searchStatus = !this.searchStatus
    },
    // 退出登录
    outLogin(){
      let msg;
      let sure;
      let quit;
      let out
      if(this.$i18n.locale == 'en'){
        msg = "Log out, whether to continue"
        quit = "cancel"
        sure = "Sure"
        out = "Log out"
      }else{
        msg = "退出登录, 是否继续?"
        sure = "确定"
        quit = "取消"
        out = "退出登录!"
      }
      sessionStorage.removeItem("token");
          this.hasToken =''
          
          Bus.$emit('loginOut', '')
          this.$message({
            type: 'success',
            message: out
          });
          console.log(this.hasToken)
      // this.$confirm(msg, '', {
      //     confirmButtonText: sure,
      //     cancelButtonText: quit,
      //     type: 'warning'
      //   }).then(() => {
      //     sessionStorage.removeItem("token");
      //     this.hasToken =''
          
      //     Bus.$emit('loginOut', '')
      //     this.$message({
      //       type: 'success',
      //       message: out
      //     });
      //     console.log(this.hasToken)
      //   }).catch(() => {
                    
      //   });
    },
    //语言切换
    changeLanguage(command){
      console.log('当前语言'+this.$i18n.locale)
      console.log('要切换成'+command)
      this.$i18n.locale = command
      this.lang = this.$i18n.locale
      Bus.$emit('language', this.$i18n.locale)
      sessionStorage.setItem("nowLanguage", this.$i18n.locale);
      // if(command != this.lang){
      //   this.$i18n.locale = this.lang 
      //   this.lang == "cn" ? (this.lang = "en") : (this.lang = "cn");
      //   Bus.$emit('language', this.$i18n.locale)
      //   sessionStorage.setItem("nowLanguage", this.$i18n.locale);
      // }
      this.getRouterName()
    },
    // 获取面包屑
    getCrumbs() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== "index") {
        matched = [{ path: "/", meta: { title: "Home",CNtitle: '主頁' } }].concat(matched);
      }
      this.crumbsList = matched;
    },
    // 展开导航栏
    showMeun() {
      this.showNav = !this.showNav;
    },
    select(e) {
      this.showNav = !this.showNav;
    },
    searchData() {
      this.$fetch("/search", {
        data: this.search.replace(/\s+/g,"")
        // data: this.search
      })
      .then(response => {
        if (response.status == 200) {
          this.search = "";
          let type = response.data.type;
          let blockid = response.data.data;
          let status = response.data.status;
          if (type === "blockNumber") {
            this.$router.push({
              name: "blockDetail",
              params: {
                blockid: blockid,
                status: status
              },
            });
          }
          if (type === "transaction") {
            this.$router.push({
              name: "transactionsDetail",
              params: { blockid: blockid }
            });
          }
          if (type === "address") {
            this.$router.push({
              name: "address",
              params: { blockid: blockid, type: type },
              query: { type: type },
            });
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    getRouterName(name){
      // alert(sessionStorage.getItem('routerName'))
      // alert(this.lang)
      if(name === undefined){
        name = sessionStorage.getItem('routerName');
      }
      // alert(name)
      switch (name) {
        case "login":
          this.$i18n.locale == 'cn'? this.pageName = "登錄  " :this.pageName = "Login  ";
          break;
        case "blocksPage":
          this.$i18n.locale == 'cn'? this.pageName = "區塊  " :this.pageName = "Blocks  ";
          break;
        case "blockDetail":
           this.$i18n.locale == 'cn'? this.pageName = "區塊  " :this.pageName = "Block  ";
          this.pageNumber = `#${to.params.blockid}`;
          break;
        case "transactionsPage":
           this.$i18n.locale == 'cn'? this.pageName = "交易  " :this.pageName = "Transactions  ";
          this.pageNumber = "";
          break;
        case "transactionsDetail":
           this.$i18n.locale == 'cn'? this.pageName = "交易  " :this.pageName = "Transaction  ";
          this.pageNumber = `#${to.params.blockid}`;
          break;
        case "address":
          if(this.ifContract){
            console.log('获取有合约')
             this.$i18n.locale == 'cn'? this.pageName = "合约  " :this.pageName = "Contract  ";
          }else{
             console.log('获取无合约')
             this.$i18n.locale == 'cn'? this.pageName = "地址  " :this.pageName = "Address  ";
          }
          // this.pageNumber = `#${to.params.blockid}`;    10.15号注释
          break;
        case "index":
          this.pageName = "";
          this.pageNumber = "";
          break;
        case "tokens":
          this.pageName = "Token Tracker";
          this.$i18n.locale == 'cn'? this.pageName = "代幣  " :this.pageName = "Token Tracker  ";
          this.pageNumber = "";
          break;
        case "tokenDetail":
          this.pageName = "Token ";
          this.$i18n.locale == 'cn'? this.pageName = "代幣  " :this.pageName = "Token  ";
          // this.pageNumber = `${to.query.blockid}`;
          
          // this.pageNumber = `${to.params.blockid}`; 10.15号注释
      }
      this.getCrumbs();
    }
  },
  watch: {
    // 监听路由跳转
    $route(to, from) {
      // console.log(this.$route.query)
      if(this.$route.query.language){
        this.$i18n.locale = this.$route.query.language
      }
      this.routerName = to.name;
      sessionStorage.setItem('routerName', this.routerName);
      // alert(to.name)
      switch (to.name) {
        case "login":
          this.$i18n.locale == 'cn'? this.pageName = "登錄  " :this.pageName = "Login  ";
          break;
        case "blocksPage":
          this.$i18n.locale == 'cn'? this.pageName = "區塊  " :this.pageName = "Blocks  ";
          break;
        case "blockDetail":
           this.$i18n.locale == 'cn'? this.pageName = "區塊  " :this.pageName = "Block  ";
          this.pageNumber = `#${to.params.blockid}`;
          break;
        case "transactionsPage":
           this.$i18n.locale == 'cn'? this.pageName = "交易  " :this.pageName = "Transactions  ";
          this.pageNumber = "";
          break;
        case "transactionsDetail":
           this.$i18n.locale == 'cn'? this.pageName = "交易  " :this.pageName = "Transaction  ";
          this.pageNumber = `#${to.params.blockid}`;
          break;
        case "address":
          if(this.$route.query.hide){
            this.$i18n.locale == 'cn'? this.pageName = "代幣  " :this.pageName = "Token  ";
            this.pageNumber = `${to.query.statusName}`;
          }else{
            // if(this.ifContract){//是否合约的判断
            //  console.log('路由有合约')
            //   this.lang == 'en'? this.pageName = "合约  " :this.pageName = "Contract  ";
            //   this.pageNumber = `#${to.params.blockid}`;
            // }else{
            //   console.log('路由无合约')
            //   this.lang == 'en'? this.pageName = "地址  " :this.pageName = "Address  ";
            //  this.pageNumber = `#${to.params.blockid}`;
            // }
            this.pageNumber = `#${to.params.blockid}`;
             
          }
          
          break;
        case "index":
          this.pageName = "";
          this.pageNumber = "";
          break;
        case "tokens":
          this.pageName = "Token Tracker";
          this.$i18n.locale == 'cn'? this.pageName = "代幣  " :this.pageName = "Token Tracker  ";
          this.pageNumber = "";
          break;
        case "tokenDetail":
          this.pageName = "Token ";
          // this.pageNumber = `${to.query.blockid}`;
          this.$i18n.locale == 'cn'? this.pageName = "代幣  " :this.pageName = "Token  ";
          this.pageNumber = `${to.params.blockid}`;
      }
      this.getCrumbs();
    },
    // 监听页面宽度变化
    screenWidth(val) {
      if (val <= 992) {
        this.isPc = false;
        this.navType = false;
        this.navDecoration = "vertical";
      } else {
        this.isPc = true;
        this.navType = true;
        this.navDecoration = "horizontal";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.over {
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
  width: 80%;
  margin: 0 auto;
}
.header {
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav {
  padding: 0;
  margin: 0 auto;
}
.crumbs {
  height: 3.125rem;
  line-height: 3.125rem;
  border-bottom: solid 1px #e6e6e6;
  margin: 0 auto;
}
.crumbs-content {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.content {
  width: 80%;
  margin: 0 auto;
  padding-bottom: 1.25rem;
}
.login {
  color: #7c8082;
  text-decoration: none;
  margin: 0 1.25rem;
}
.language {
  color: #7c8082;
  cursor: pointer;
  margin: 0 1.25rem;
}
.s-btn {
  background-image: linear-gradient(141deg, #6e8df6 0%, #001f3f 100%);
  height: 2.3125rem;
  width: 41px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.search {
  width: 20.625rem;
  height: 1.9375rem;
  padding-left: 0.625rem;
}

.mobile-meun {
  padding: 0.625rem;
  background-color: #3498db;
  border: 1px solid #000;
  &:hover {
    background-color: #2980b9;
    cursor: pointer;
  }
}
.search-large {
  // display: flex;
  // flex-direction: space-between;
  margin-bottom: 10px;
  // background-color: #2980b9;
  input {
    display: block;
    width: 100%;
    margin: 0 auto;
    border: 1px solid #ccc;
    // padding: 6px 12px;
    box-sizing: border-box;
    // text-align: center;
    color: #555;
    height: 40px;
    line-height: 40px;
    outline: none
  }
  .m-s-btn{
    position: absolute;
    right: 0;
    top:0;
    // padding: 6px 12px;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
  }
}
.m-div{
  width: 90%;
  margin: 0 auto;
  // box-sizing: border-box;
  // border: 1px solid red;
  position: relative;
  // background-color: #2980b9;
  // padding:5px;
  // border-radius: 5px
}
.el-menu-vertical-demo {
  // margin-top: 30px;
  // height: auto;
  // width: 100%;
  // display: flex;
  // justify-content: flex-start;
}
.el-menu {
  border-right: none;
}

.el-submenu .el-menu-item {
  height: 38px;
  line-height: 38px;
}
.el-menu-demo {
  display: flex;
  justify-content: flex-end;
}
.el-menu.el-menu--horizontal {
  border: none;
}
@media screen and (min-width: 768px) {
  .header,
  .nav,
  .crumbs {
    width: 750px;
  }
}
@media screen and (min-width: 992px) {
  .header,
  .nav,
  .crumbs {
    width: 970px;
  }
}
@media screen and (min-width: 1200px) {
  .header,
  .nav,
  .crumbs {
    width: 1170px;
  }
}
 .el-menu--horizontal>.el-submenu .el-submenu__title{
    line-height: 30px!important;
    height: 30px!important;
    color: red!important
    // padding-bottom: 15px!important;
  }
@media screen and (max-width: 768px) {
  // .el-menu{
  //   margin-bottom: 30px
  // }
}
</style>
<style >
  @media screen and (max-width: 768px) {
  .el-menu{
    /* margin-bottom: 30px */
  }
  .el-menu-item, .el-submenu__title{
    line-height: 0!important;
    height: 0!important;
    padding-top: 10px!important;
    padding-bottom: 20px!important;
  }
  /* .el-menu--horizontal>.el-submenu .el-submenu__title{
    line-height: 40px!important;
    height: 40px!important;
    padding-bottom: 15px!important;
  } */
}
</style>
