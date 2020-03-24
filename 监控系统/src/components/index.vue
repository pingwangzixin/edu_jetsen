<template>
  <div class="g_indexPage">
    <!--视图-->
    <div class="g_mainWrapper" :class="globalParam.mainWidth?'':'g_loginWrapper'">
      <!--登录页面头部-->
      <div class="g_header" v-if="!globalParam.mainWidth">
        <div class="headerMain" v-if="!globalParam.mainWidth">
          <div>
            <img src="../assets/img/logo.png" alt />
            <span>监控系统管理端</span>
          </div>
        </div>
      </div>
      <!--主页面头部-->
      <div class="g_header indexHead" v-if="globalParam.mainWidth">
        <div class="indexMain" v-if="globalParam.mainWidth">
          <div class="fl">
            <img src="../assets/img/logo.png" alt />
            <span>监控系统管理端</span>
          </div>
          <p class="fr" @click="navigateTo">
            <i class="iconfont iconjinru pointer"></i>
            <span class="pointer">进入捷成智慧教育大数据可视化平台</span>
          </p>
        </div>
      </div>
      <img src="../assets/img/star.png" alt class="fr" v-show="!globalParam.mainWidth" />
      <router-view :class="globalParam.mainWidth?'g_main':'g_login'"></router-view>
    </div>

    <div class="g_prompt prompt">
      <!--
		        prompt_box public_box : 公共类名 禁止删除
		        j_ : js专用类名前缀，勿占用
      -->
      <!--等待遮罩-->
      <div class="prompt_box public_box waiting_box" v-show="promptData.loadingBox.load">
        <div class="hide"></div>
        <div class="con">
          <div class="main_cont">
            <img src="../assets/img/loading.gif" />
            <p>数据加载中...</p>
          </div>
        </div>
      </div>

      <!--确认删除框-->
      <div
        class="prompt_box public_box confirm_box j_confirm_box"
        v-show="promptData.confirmBox.open"
      >
        <div class="hide"></div>
        <div class="con">
          <div class="tit">
            <span class="fl">提示</span>
            <span class="fr">
              <i class="iconfont iconyooxi warning pointer" @click="promptClose"></i>
            </span>
          </div>
          <div class="main_cont">
            <div class="iWrapper">
              <i class="iconfont iconjinggao1 warning"></i>
            </div>
            <p>{{promptData.confirmBox.tipWord}}</p>
          </div>
          <div class="btn_group">
            <button class="sure">确认</button>
            <button class="cancel">取消</button>
          </div>
        </div>
      </div>

      <!--定时提示框-->
      <div class="prompt_box public_box timing_box" v-show="promptData.timingBox.open">
        <div class="hide"></div>
        <div class="con">
          <div class="main_cont timing_cont">
            <div class="iWrapper">
              <i
                class="iconfont iconduihao2 success"
                v-show="promptData.timingBox.type == 'success'"
              ></i>
              <i
                class="iconfont iconjinggao1 warning"
                v-show="promptData.timingBox.type == 'warning'"
              ></i>
            </div>

            <i class="iconfont iconcuowu fail" v-show="promptData.timingBox.type == 'fail'"></i>
            <p>{{promptData.timingBox.tipWord}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "index",
  data() {
    return {
      globalParam: {
        mainWidth: true //登录页面false
      },
      //弹框类数据
      promptData: {
        //定时提示框
        timingBox: {
          open: false,
          type: "",
          tipWord: ""
        },
        //确认框
        confirmBox: {
          open: false,
          tipWord: "",
          callBack: null
        },
        //等待加载框
        loadingBox: {
          load: false,
          tipWord: ""
        }
      }
    };
  },
  //函数
  methods: {
    /*
     * 提示框1.5ms
     * @param  {string} type  提示图片  success/fail/warning
     * @param  {string} tipWord 提示框文字
     */
    timingFn(type, tipWord) {
      this.promptData.timingBox.open = true;
      this.promptData.timingBox.type = type;
      this.promptData.timingBox.tipWord = tipWord;
      let _this = this;
      setTimeout(function() {
        _this.promptData.timingBox.open = false;
      }, 1500);
    },
    /*
     * 确认框
     * @param  {string} tipWord 提示框文字
     * @param  {function}  callback  回调函数
     */
    confirmFn(tipWord, callback) {
      this.promptData.confirmBox.open = true;
      this.promptData.confirmBox.tipWord = tipWord;
      let _this = this;
      $(".j_confirm_box .btn_group button")
        .off("click")
        .on("click", function() {
          _this.promptData.confirmBox.open = false;
          callback($(this).attr("class"));
        });
    },
    /*
     * 加载框
     * @param  {boolean}  load  成功/失败 true/false
     * @param  {string}  tipWord  提示文字
     */
    loadingFn(load, tipWord) {
      this.promptData.loadingBox.load = load;
    },
    promptClose() {
      this.promptData.confirmBox.open = false;
    },
    navigateTo(){
      window.open("http://111.207.13.88:8030/bigdata/")
    }
  },


  //结构加载之后
  mounted() {},
  //路由守卫
  beforeRouteEnter (to, from, next) {
    next()
  },
  watch: {
    //监听路由
    $route(to, from) {
      this.globalParam.mainWidth = to.path == "/index/login" ? false : true;
    }
  },
  //架构加载之前
  created() {
    //页面宽度大于主架构宽度
    this.globalParam.mainWidth =
      this.$route.path == "/index/login" ? false : true;
  },
};
</script>

<style>
.g_indexPage {
  height: 100%;
}
.headerMain {
  width: 1234px;
  margin: 0 auto;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
}
.headerMain img {
  margin-top: 11px;
  margin-right: 60px;
}
.indexMain {
  width: 1200px;
  margin: 0 auto;
  line-height: 50px;
  overflow: hidden;
  color: #fff;
}
.indexMain img {
  margin: 11px 60px 0 70px;
}
.indexMain p {
  color: #1daceb;
  font-size: 12px;
}
.indexMain p i {
  margin-right: 5px;
  font-size: 18px;
}
.g_indexPage .indexHead {
  background: none;
  border-bottom: 2px solid #031e49;
}
.g_indexPage .confirm_box .con {
  background: #021132;
}
.timing_cont{
  
}
</style>
