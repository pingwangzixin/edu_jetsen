$(document).ready(function(){

	/*查看教师弹框样式*/
	$(".classRecordBox table tr td a.look").on("click",function(){
		$(".clock_teacher").show();
	});
	/*查看教师弹框样式关闭*/
	$(".clock_teacher img.close").on("click",function(){
		$(".clock_teacher").hide();
	});
	/*展开折叠回复信息*/ //需求变更不要了
	/*$("a[data-a='hfxx']").on("click",function(){
		$(this).children("i").addClass("on").removeClass("under");
		$(this).parent("div.text").siblings("div.viewBox").show();
	});*/
	/*发表信息*/
	$(".publicationBox .btn button").on("click",function(){
		var texts=$(this).parent(".btn").siblings("textarea");
				
		$.ajax({
			type:"get",
			url:"",
			async:true,
			success:function(data){
						
			}
		});
				
	var htmls='<li>'+
		        '<strong>张老师：</strong><p>'+texts.val()+'</p>'+
		        '</li>';
		        var vals=texts.val();
	if(vals!=""){
		texts.val("");
		if(vals.length>255){
			$(".dowPromptBox").show();
			$(".dowPromptBox span.text").html("字数过长请重新输入！");
			setTimeout(function(){
				$(".dowPromptBox").hide();
			},2000);
			texts.focus();
		}else{
			$(".postReply .dialogueBox ul").append(htmls);
		}
	}else{
		$(".dowPromptBox").show();
		$(".dowPromptBox span.text").html("请输入内容！");
		setTimeout(function(){
			$(".dowPromptBox").hide();
		},2000);
		texts.focus();
	}
	});
		 	
		 	
		 	
	/*选择学生成绩等级*/
	$("strong[data-i='dj'] i").on("click",function(){
		var num=$(this).index();
		switch(num){
			case 0:
				$(this).addClass("best").siblings("i").removeClass("good").removeClass("bad");
			break;
			case 1:
				$(this).addClass("good").siblings("i").removeClass("best").removeClass("bad");
			break;
			case 2:
				$(this).addClass("bad").siblings("i").removeClass("good").removeClass("best");
			break;
		}	
	});
	/*学生互动*/
	$("span.interactive").on("click",function(){
		$(this).addClass("current");
		$(".interactiveEvaluation").show();
	});
	/*互动弹框关闭*/
	$(".interactiveEvaluation img.close").on("click",function(){
		$(".interactiveEvaluation").hide();
	});
	/*互动弹框取消*/
	$(".interactiveEvaluation .btn a.cancel").on("click",function(){
		$(".interactiveEvaluation").hide();
	});
	/*互动弹框保存*/
	$(".interactiveEvaluation .btn a.save").on("click",function(){
		/*数据插入到数据库*/
		$.ajax({
			type:"get",
			url:"",
			async:true,
			success:function(data){
				
			}
		});
		
		$(document).ajaxStart(function(){
			alert("正在保存...");
		}).ajaxStop(function(){
			alert("已经保存...");
		});
	});
	
	/*互动弹框中共的查看*/
	$(document).on("click",".interactiveEvaluation .con table tbody tr td a.clock",function(){
		$(".videoBox").show();
		$.ajax( {
	        url: '../5-ketangjilu/zyx.html',
	        type: "GET", //如果是html静态页面要用get方法
	        success: function(data){
	            $(".zyx_html").html(data);
        	}
		});
	});
	
	$(document).on("click",".videoBox img.close",function(){
		$(".videoBox").hide();
	});
	
	//2017.06.16 zy
	//课堂活跃度弹
	$('.Yliveness').on('click',function (){
		$('.YLivenessBox').show();
	});
    //课堂活跃度弹关闭
   	$('.YLivenessClose').on('click',function (){
		$('.YLivenessBox').hide();
  	});
   
   
	//2017.6.20 zy 课堂分组页面
	//小组成员详情展开
	$(document).on('click','.YgroupName',function (){
		var _thisPar = $(this).parent().siblings('.YlistContainer');
		if(_thisPar.css('display') == 'block'){
			_thisPar.hide();
			$(this).removeClass('Yactive');
		}else{
			_thisPar.show();
			$(this).addClass('Yactive');
		}
	});
	   
	//新建小组弹窗开
	$('.YnewPpacket').on('click',function (){
		$('.YnewGroup').show();
	});
	//新建小组弹窗关
	$('.YnewGroup .close,.YcancelBtn').on('click',function (){
		$('.YnewGroup').hide();
	});
	
	//确认添加组员
	var sMember = '';
	$('.YaddSure').on('click',function (){
		$('.Yifadd>div>p label').each(function (i,v){
			if($(this).children('input').prop('disabled') == false && $(this).children('input').is(':checked')){
				sMember += $(this).prop('outerHTML');
				$(this).children().prop('disabled','ture');
			}
		});
		$('.Yifremove>div>p') ? $('.Yifremove>div>p').append(sMember) : $('.Yifremove>div>p').html(sMember);
		sMember = '';
	});
	
	//确认移除组员
	$('.YremoveSure').on('click',function (){
		$('.Yifremove>div>p label').each(function (i,v){
			var _thisInp = $(this).children('input:checked');
			$('.Yifadd>div>p label').each(function (i,v){
				if(_thisInp.attr('id') == $(v).children('input').attr('id')){
					$(v).children('input').prop({'disabled':false, 'checked':false});
					_thisInp.parent().remove();
				}
			});
		});
	});
	
	
	//解散小组确认框
	$('.Yheadline .YdissGroup').on('click',function (){
		$('.YifDel').show();
		$('.YifDel .text-text').text('确认要删除该小组吗？');
		var oDelGroup = $(this).parents('.Yheadline').parent();
		
		//确认删除 移除小组
		$('.YifDel .YsubSure').on('click',function (){
			$('.YifDel').hide();
			oDelGroup.remove();
		});
		
	});
	
	//删除组员弹框
	$('.YlistContainer>li>img').on('click',function (){
		$('.YifDel').show();
		$('.YifDel .text-text').text('确认要删除该组员吗？');
		var oDelmember = $(this).parent();
		
		//确认删除 删除组员
		$('.YifDel .YsubSure').on('click',function (){
			$('.YifDel').hide();
			oDelmember.remove()
		});
	});
	
	//解散小组/删除组员确认框关
	$('.YifDel .delClose,.YifDel .YsubCanael').on('click',function (){
		$('.YifDel').hide();
	});
	
	
	//新建分组确定弹框验证
	$('.YbtnBox .YsureBtn').on('click',function (){
		$('.YJWarnBox').show();
		$('.YJWarnBox .con span').text('lalsdajldk');
		setTimeout(function (){
			$('.YJWarnBox').hide();
		},1500);
	});
	
});
