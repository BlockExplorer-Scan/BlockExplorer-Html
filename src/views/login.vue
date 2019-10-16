<template>
  <div class="login-wrap">
    <div class="index-content">
      <form action method="post" class="login-form" style="margin-top:50px">
        <div class="item item-h">
          <h1>{{$t('message.LoginToYourAccount')}}</h1>
          <!-- <p>
            {{$t('message.Or')}}
            <span class="jump-text">{{$t('message.LoginToYourAccount')}}</span>
          </p> -->
        </div>
        <div class="item" style="display:flex; justify-content:center">
          <i class="fa fa-user iconF"></i>
          <input type="text" :placeholder="$t('message.UserName')" class="ipt-info" ref="username" v-model="username" v-on:keyup.13="login">
        </div>
        <div class="item" style="display:flex; justify-content:center">
          <i class="fa fa-lock iconF"></i>
          <input type="password" :placeholder="$t('message.Password')" class="ipt-info" ref="password" v-model="password" v-on:keyup.13="login">
        </div>
        <div class="item ">
          <!-- <label>
            <input type="checkbox"> Remember
          </label> -->
          <!-- <input type="submit" value="Login" class="login-btn"> -->
          <span class="login-btn" @click="login">{{$t('message.Login')}}</span>
        </div>
        <!-- <div class="item item-f">
          <h1>{{$t('message.ForgotyourPassword')}} ?</h1>
          <p>
            {{$t('message.Noworries')}},
            <span class="jump-text">{{$t('message.Clickhere')}}</span>{{$t('message.toResetYourPassword')}} .
          </p>
        </div> -->
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
 import Bus from '@/bus.js'
export default {
  data() {
    return {
      username: "",
      password: "",
      path:''
    };
  },
  beforeRouteEnter:(to,from,next)=>{
    // console.log("准备进入路由模板");
    // console.log(to);
    console.log(from);
    // from.path ? this.path = from.path : this.path = ''
    sessionStorage.setItem('fullPath',from.fullPath);
    sessionStorage.setItem('name',from.name);
    sessionStorage.setItem('query',from.query);
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    // console.log("准备离开路由模板");
    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    login() {
      let msg;
      let errmsg;
      let sure;
      if(this.$i18n.locale == 'en'){
        msg = "The account or password cannot be empty"
        errmsg = "Wrong account or password"
        sure = "Sure"
      }else{
        msg = "账号或者密码不能为空"
        sure = "确定"
        errmsg = "账号或者密码错误"
      }
      if(!this.username || !this.password){
        this.$alert(msg, '', {
          confirmButtonText: sure,
        });
        return
      }
     this.$post("/login", this.$qs.stringify({
        username: this.username,
        password: this.password
      })).then(response => {
        console.log(response)
        if (response.status == 200) {
          sessionStorage.setItem('token',response.data);
          Bus.$emit('login', response.data)
          if(sessionStorage.getItem('query') != {}){
            // alert(2323)
            console.log(sessionStorage.getItem('query'))
            this.$router.push({
              path: sessionStorage.getItem('fullPath'),
              query: sessionStorage.getItem('query')
            });
          }else{
             this.$router.push({
              path: sessionStorage.getItem('fullPath'),
            });
          }
         
        }else{
          this.$refs.username.blur()
          this.$refs.password.blur()
          this.$alert(errmsg, '', {
            confirmButtonText: sure,
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-wrap {
  margin: 0 auto;
}
h1 {
  font-size: 24px;
  margin-bottom: 15px;
  font-weight: 400;
}
p {
  font-size: 13px;
}
.index-content {
  width: 345px;
  margin: 0 auto;
}
.login-form {
  color: #555;
  padding: 30px;
  background: #fefefe;
  border: solid 2px #eee;
  box-shadow: 0 0 3px #eee;
}
.item {
  margin-bottom: 1.25rem;
}
.item-flex {
  display: flex;
  justify-content: space-between;
  margin-top: 1.875rem;
  margin-bottom: 3.75rem;
  align-items: center;
}
.login-btn {
  background-color: #3498db;
  border: 0;
  color: #fff;
  padding: 8px 13px;
  cursor: pointer;
}
.iconF {
  border: 1px solid #ccc;
  padding: 0.3125rem 0.9375rem;
  color: #b3b3b3;
  height: 34px;
  line-height: 34px;
  border-right: none;
}
.ipt-info {
  height: 34px;
  padding: 0.3125rem 0.75rem;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  vertical-align: top;
  -webkit-appearance: none; 
  border-radius: 0
}
.jump-text {
  color: #3498db;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.item-h {
  border-bottom: 1px solid #eee;
  padding-bottom: 2.5rem;
}
.item-f {
  border-top: 1px solid #eee;
  padding-top: 2.5rem;
}
</style>

