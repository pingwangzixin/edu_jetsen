
$(document).ready(function(){
	/******************************  作业列表   *********************************************/
	//作业列表切换
	$('.main_right .list_tit li a').on('click',function(){
		$(this).addClass('list_tit_active').parent().siblings().find('a').removeClass('list_tit_active');
	});



	//星星打分事件
	$(".star_rate").raty({
		path:"../img",
		score: 3
	});



	//选择题
	$(document).on('click','.question .question_daan li span',function(){
		$(this).addClass('judge').parent().siblings().find('span').removeClass('judge');
	});

	/*我的题库切换*/
	$(".my_question .tabs li").on('click',function(){
		$(this).addClass('tabs_active').siblings().removeClass('tabs_active');
	});

	
	//收藏-取消收藏
	$('.submit_btn').click(function(){
		$('#shoucang').show();
		setTimeout(function(){
			$('#shoucang').hide();
		},2000);
		if($(this).text()=='收藏'){
			$('.text-text').text('收藏成功');
		}else if($(this).text()=='取消收藏'){
			$('.text-text').text('取消收藏成功');
		}
		
	});


	/*删除事件*/
	$('.del_red').on('click',function(){
		$('.del').show();
	});

	
	/*确认，取消,关闭按钮*/
	$('.ok,.no,.close').on('click',function(){
		$('.del').hide();
	});

	//上传
	$('.file').click(function(){
		$('.Up_flie').show();
	});
	
	
	//作业提交页面 倒计时
	/*var nTime = "2017-1-11 17:59:59";
	countDown(nTime,null,"#clock .hour","#clock .minute","#clock .second")
	
	function countDown(time,day_elem,hour_elem,minute_elem,second_elem){
		//if(typeof end_time == "string")
		var end_time = new Date(time).getTime(),//月份是实际月份-1
		//current_time = new Date().getTime(),
		sys_second = (end_time-new Date().getTime())/1000;
		var timer = setInterval(function(){
			if (sys_second > 0) {
				sys_second -= 1;
				var day = Math.floor((sys_second / 3600) / 24);
				var hour = Math.floor((sys_second / 3600) % 24);
				var minute = Math.floor((sys_second / 60) % 60);
				var second = Math.floor(sys_second % 60);
				day_elem && $(day_elem).text(day);//计算天
				$(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
				$(minute_elem).text(minute<10?"0"+minute:minute);//计算分
				$(second_elem).text(second<10?"0"+second:second);// 计算秒
			} else { 
				clearInterval(timer);
			}
		}, 1000);
	}*/
	
	//作业提交页面 任务完成页面 累计计时
	var nNum = 0;				//单位秒
	var nTotalTime = 3600000;	//总时长 单位毫秒
	var nActualTime = 0;		//实际用时
	clearInterval(timer);
	var timer = setInterval(function (){
		nNum ++;
		var h = Math.floor((nNum / 3600) % 24);
		var m = Math.floor((nNum / 60) % 60);
		var s = nNum % 60;
		$('em.hour').text(h<10 ? '0'+h : '' +h);
		$('em.minute').text(m<10 ? '0'+m : ''+m);
		$('em.second').text(s<10 ? '0'+s : ''+s);
		nActualTime = ($('.new_clock em.hour').text()*3600*1000) + ($('.new_clock em.minute').text()*60*1000) + ($('.new_clock em.second').text()*1000);
		
		//超时停止计时
		if(nActualTime >= nTotalTime){
			clearInterval(timer);
		}
	},1000);
	
	//提交按钮 停止计时
	$('span.submit_btn').on('click',function (){
		clearInterval(timer);
	});
	
	
	//填空点击 特殊符号弹框显示
	$(document).on('click','.math_insert',function (){
		$(this).next('.math_bomb').show();
	});
	
	/*$(document).on('blur','.math_insert',function (){
		$(this).next('.math_bomb').hide();
	});*/
	
	//填空题插入特殊符号弹框
	$(document).on('click','.math_bomb',function (){
		$('.math_box').show();
	});
	//填空题插入特殊符号弹框关闭
	$('.math_box .off,.btn_group .cancel').on('click',function (){
		$('.math_box').hide();
	});
	
	
	//2017.6.9  zyx
	LebalFor();
	function LebalFor(){
		$('.Zlines input[type="radio"]').each(function(index, element){
			$(this).attr("id","input"+ index +"");
		});
		$('.Zlines label').each(function(index, element){
			$(this).attr("for","input"+ index +"");
		});
	}

	$('.Z-file').on('click',function(){
		$('.Up_flie').show();
	});


});
