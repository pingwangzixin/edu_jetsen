<template>
  <div>
    <div class="loginDiv">
      <p class="loginTitle">登录</p>
      <div class="inputWrapper">
        <i class="iconfont iconyonghuming"></i>
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="inputWrapper">
        <i class="iconfont iconmima"></i>
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
      <div class="inputWrapper">
        <i class="iconfont iconyanzhengma"></i>
        <input type="text" placeholder="请输入验证码" v-model="code" class="sidentify_input" />
        <div class="container">
          <Sidentify :identifyCode="identifyCode" class="fl" />
          <i class="iconfont iconshuaxin fl" @click="newSidentify"></i>
        </div>
      </div>
      <div class="loginBn" @click="loginHandle">登录</div>
      <div class="forgetDiv">
        <p class="fr pointer">忘记密码？</p>
      </div>
    </div>
  </div>
</template>

<script>
import { wordRelevant } from "@/api";
import Sidentify from "./part/sidentify";
import {  mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      code: "", //验证码
      identifyCodes: "1234567890", //生成验证码范围
      identifyCode: "" //验证码
    };
  },
  components: {
    Sidentify
  },
 
  methods: {
    ...mapMutations({
      recordInfo:"record"
    }),
    //点击登录按钮
    loginHandle() {
      if(this.code !== this.identifyCode ){
        this.$parent.timingFn("warning", "验证码输入错误");
        this.clean()
        return
      }
      wordRelevant
        .login({username:this.username,password:this.password})
        .then(res => {
          if (res.data.ret == 200) {
             this.recordInfo(res.data.data);
            this.$router.push("/index/list");
          }else{
             this.$parent.timingFn("warning", "用户名或密码错误");
          }
        })
        .catch(e => {});
      
    },
    //验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    //验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    // 验证码
    newSidentify() {
      this.refreshCode();
    },
    clean(){
           this.username= "", 
           this.password= "", 
           this.code= "", 
    this.refreshCode();
    },
    
  },
  created() {
   
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
};
</script>
<style scoped>
.loginDiv {
  position: absolute;
  width: 450px;
  height: 410px;
  background: rgba(256, 256, 256, 0.1);
  right: 0;
  top: 194px;
}
.loginTitle {
  font-size: 22px;
  color: #fff;
  text-align: center;
  margin: 38px 0 33px;
}
.loginDiv input {
  outline: none;
  border: none;
  background: none;
}
.inputWrapper {
  height: 36px;
  width: 345px;
  border: 1px solid #dadad8;
  margin: 0 auto 9px;
  border-radius: 8px;
  line-height: 36px;
}
.inputWrapper input::-webkit-input-placeholder,
.inputWrapper input {
  color: #dadad8;
}
.inputWrapper i {
  font-size: 18px;
  margin: 0 11px 0 17px;
  color: #dadad8;
}
.inputWrapper .iconyanzhengma {
  font-size: 23px;
  margin: 0 11px 0 13px;
}
.loginBn {
  width: 347px;
  line-height: 37px;
  background: #1f7efe;
  text-align: center;
  margin: 20px auto 8px;
  letter-spacing: 9px;
  color: #fff;
  cursor: pointer;
}
.container {
  float: right;
}
.sidentify_input {
  width: 100px;
}
.container .iconshuaxin {
  font-size: 20px;
  font-size: 26px;
  margin: 0 5px;
  cursor: pointer;
}
.forgetDiv {
  width: 345px;
  margin: 0 auto;
  color: #fff;
}
</style>
