$(function(){
	//zxy-2018.5.14
	/*头部学科切换*/
	$(document).on('click','.subject span,.grade span,.Class span',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	/*放大效果*/
	$('.scale_big').click(function(){
		$('.situation').addClass('situation_fixed');
		$('.del_down').show();
		$('.scale_big').hide();
		$('.graph-comments').hide();
		$('.situation_close').show();
	});
	
	/*关闭*/
	$('.situation_close').click(function(){
		$('.situation').removeClass('situation_fixed');
		$('.del_down').hide();
		$('.scale_big').show();
		$('.graph-comments').show();
		$(this).hide();
	});

	/*加载更多*/
	$('.more').click(function(){
		var str = $('.exam-list-item').clone();
		$('.research_con').append(str);
	});
	
	//测试分析切换
	$(".tabBox p a").on("click", function() {
		$(this).addClass("current").siblings("a").removeClass("current");
	});
	
	$(".ichartTits li").on("click", function() {
		$(this).addClass("cur").siblings("li").removeClass("cur");
		if($(this).attr('data-tab') == 1){
			//（单次考试分析/单次测试分析/课中切换）
			$('.research_con').show();
			$('.zyx_TestAnalysis').hide();
			$('.zyx_ClassIn').hide();
			//（考试分析和成绩列表切换）
			$('.zyx_snalysis').show();
			$('.zyx_scoreList').hide();
			//考试测试切换控制上面的图表
			$('.graph-tabs > a[data-name=1]').addClass('active').siblings().removeClass('active');
			$('.tabcon[data-name]').hide();
			$('.tabcon[data-name=1]').show();
		}else if($(this).attr('data-tab') == 2){
			//（单次考试分析/单次测试分析/课中切换）
			$('.research_con').hide();
			$('.zyx_ClassIn').hide();
			$('.zyx_TestAnalysis').show();
			//（考试分析和成绩列表切换）
			$('.zyx_snalysis').hide();
			$('.zyx_scoreList').show();
			//考试测试切换控制上面的图表
			$('.graph-tabs > a[data-name=4]').addClass('active').siblings().removeClass('active');
			$('.tabcon[data-name]').hide();
			$('.tabcon[data-name=4]').show();
		}else if($(this).attr('data-tab') == 3){
			//（单次考试分析/单次测试分析/课中切换）
			$('.research_con').hide();
			$('.zyx_TestAnalysis').hide();
			$('.zyx_ClassIn').show();
		}
		
	});
	
	
	//精准考试 2018.10.31
	$('.zyx_moduleTab span').on("click", function() {
		$(this).addClass("active").siblings("span").removeClass("active");
		if($(this).attr('tab') == 0){
			$('.zyx_examAnalysis').show();
			$('.zyx_accurateExam').hide();
		}else if($(this).attr('tab') == 1){
			$('.zyx_examAnalysis').hide();
			$('.zyx_accurateExam').show();
		}
	});
	
	/*$('.zyx_PreciseDetails .zyx_reportTab span').on("click", function() {
		$(this).addClass("active").siblings("span").removeClass("active");
		if($(this).attr('tab') == 0){
			alert('加载个人报告')
		}else if($(this).attr('tab') == 1){
			alert('加载班级报告')
		}else if($(this).attr('tab') == 2){
			alert('加载年级报告')
		}
	});*/
	
});

