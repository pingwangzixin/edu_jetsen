<template>
    <div class="">
        <div class="g_header">
            <div class="nav clearfix">
                <div class="logo_group fl">
                    <img src="../assets/img/logo.png" alt="" srcset="">
                </div>
                <p class="fl">{{globalParam.tit}}</p>
                <div class="user_info fr">
                    <span>示例教师</span>
                    <b>[已登录]</b>
                </div>
            </div>
        </div>
        <router-view class="g_main"></router-view>
        
        <div class="g_prompt prompt">
		    <!--
		        prompt_box public_box : 公共类名 禁止删除
		        j_ : js专用类名前缀，勿占用
		    -->
		    <!--等待遮罩-->
		    <div class="prompt_box public_box waiting_box j_waiting_box" v-show="promptData.loadingBox.load">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="main_cont">
		                <img src="../assets/img/loading.gif"/>
		                <p>数据加载中...</p>
		            </div>
		        </div>
		    </div>
		    
		    <!--定时提示框-->
		    <!--<div class="prompt_box public_box timing_box j_timing_box" style="display: block;">-->	
		    <div class="prompt_box public_box timing_box j_timing_box" v-show="promptData.timingBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="main_cont">
		                <i class="iconfont iconduihao2 success" v-show="promptData.timingBox.type == 'success'"></i>
		                <i class="iconfont iconjinggao1 warning" v-show="promptData.timingBox.type == 'warning'"></i>
		                <i class="iconfont iconcuowu fail" v-show="promptData.timingBox.type == 'fail'"></i>
		                <p>{{promptData.timingBox.tipWord}}</p>
		            </div>
		        </div>
		    </div>
		    
		    <!--确认删除框-->
		    <div class="prompt_box public_box confirm_box j_confirm_box" v-show="promptData.confirmBox.open">	
		        <div class="hide"></div>
		        <div class="con">
		            <div class="tit">
		                <span>提示</span>
		            </div>
		            <div class="main_cont">
		                <i class="iconfont iconjinggao1 warning"></i>
		                <p>{{promptData.confirmBox.tipWord}}</p>
		            </div>
		            <div class="btn_group">
		                <button class="sure">确认</button>
		                <button class="cancel">取消</button>
		            </div>
		        </div>
		    </div>
		</div>
    </div>
</template>

<script>
import $ from 'jquery'
	
export default {
    name : 'index',
    data () {
    	return {
    		globalParam : {
    			tit : ''		//导航左侧提示
    		},
    		//弹框类数据
    		promptData : {
    			//定时提示框
				timingBox : {
					open : false,
					type : '',
					tipWord : ''
				},
				//确认框
				confirmBox : {
					open : false,
					tipWord : '',
					callBack : null
				},
				//等待加载框
				loadingBox : {
					load : false,
					tipWord : ''
				}
            }
    	}
    },
    methods : {
    	/*
	     * 提示框1.5ms
	     * @param  {string} type  提示图片  success/fail/warning
		 * @param  {string} tipWord 提示框文字
		 */
    	timingFn (type,tipWord){
			this.promptData.timingBox.open = true;
			this.promptData.timingBox.type = type;
			this.promptData.timingBox.tipWord = tipWord;
			let _this = this;
			setTimeout(function (){
				_this.promptData.timingBox.open = false;
			},1500);
		},
		/* 
	     * 确认框
	     * @param  {string} tipWord 提示框文字
	     * @param  {function}  callback  回调函数
	     */
	    confirmFn (tipWord,callback){
			this.promptData.confirmBox.open = true;
			this.promptData.confirmBox.tipWord = tipWord;
			let _this = this;
			$('.j_confirm_box .btn_group button').off('click').on('click',function(){
	            _this.promptData.confirmBox.open = false;
				callback($(this).attr('class'));
	        });
	    },
	   	/* 
	     * 加载框
	     * @param  {boolean}  load  成功/失败 true/false
	     * @param  {string}  tipWord  提示文字
	     */
	    loadingFn (load,tipWord){
			this.promptData.loadingBox.load = load;
	    }
    },
    watch :{
    	//监听路由
    	$route(to,from){
    		this.globalParam.tit = (to.path == '/index/studentRecord' || to.path ==　'/index/studentStatusCard') ? '学籍卡' : '成长档案';
    	}
    },
    created () {
    	//导航左侧标题
    	this.globalParam.tit = (this.$route.path == '/index/studentRecord' || this.$route.path ==　'/index/studentStatusCard') ? '学籍卡' : '成长档案';
    }
}
</script>

<style lang="">
  
</style>