$(function(){
	$(document).on('click','.subjectsWrap span,.nianjiWrapIn span',function(){
	    $(this).addClass('cur').siblings().removeClass('cur');
	})
	
    $('.testListWrap li:last-child').css('border','0 none');
    
    /*zxy-查看科目页面*/
	$('.testDetail_ichartTits li').on('click',function(){
	    var num=$(this).index();
	    $(this).addClass('cur').siblings('li').removeClass('cur');
	    $('.notesWrap').eq(num).show().siblings('.notesWrap').hide();
	    if($(this).attr('data-tab') == 1){
	    	$('.icharts').show();
	    	$('.student_report').hide();
	    }else if($(this).attr('data-tab') == 2){
	    	$('.icharts').show();
	    	$('.student_report').hide();
	    }else if($(this).attr('data-tab') == 3){
	    	$('.icharts').hide();
	    	$('.notesWrap').hide();
	    	$('.student_report').show();
	    }
	})
	
	/*zxy-历次考试变化趋势切换*/
	$(document).on('click','.subsAllIchart .ichartTits li',function(){
	    var num=$(this).index();
	    $(this).addClass('cur').siblings().removeClass('cur');
	    $('.ichartWrap .notesWrap').eq(num).show().siblings('.notesWrap').hide();
	    if(num==4){
	    	//控制自己的5个切换
	    	$('.zyx_contrast').show();
	    	$('.zyx_BrokenLine').hide();
	    	$('.chart4').highcharts().reflow();
	    	//控制下面考试测试的切换
	    	$('.testListWrap').hide();
			$('.zyx_TestAnalysis').show();
			$(".zyx_subject .ichartTits li:nth-child(2)").addClass('cur').siblings().removeClass('cur');
	    }else{
	    	console.log(num)
	    	//控制自己的5个切换
	    	$('.zyx_contrast').hide();
	    	$('.zyx_BrokenLine').show();
	    	//控制下面考试测试的切换
	    	$('.testListWrap').show();
			$('.zyx_TestAnalysis').hide();
			$(".zyx_subject .ichartTits li:first-child").addClass('cur').siblings().removeClass('cur');
	    }
	
	})
	
	/*zxy-单科选项卡点击*/
	$(document).on('click','.subsSingleIchart .ichartTits li',function(){
	    var num=$(this).index();
	    $(this).addClass('cur').siblings().removeClass('cur');
	    $('.notesWrap').eq(num).show().siblings('.notesWrap').hide();
	})
	
	//zxy-单次考试分析/单次测试分析/课中测试切换
	$(".zyx_subject .ichartTits li").on("click", function() {
		$(this).addClass("cur").siblings("li").removeClass("cur");
		if($(this).attr('data-tab') == 1){
			//控制自己的切换
			$('.testListWrap').show();
			$('.zyx_TestAnalysis').hide();
			$('.zyx_ClassIn').hide();
			//控制5个图表的切换
			$('.zyx_contrast').hide();
	    	$('.zyx_BrokenLine').show();
	    	$(".ichartWrap .ichartTits li:first-child").addClass('cur').siblings().removeClass('cur');
		}else if($(this).attr('data-tab') == 2){
			//控制自己的切换
			$('.testListWrap').hide();
			$('.zyx_ClassIn').hide();
			$('.zyx_TestAnalysis').show();
			//控制5个图表的切换
			$('.zyx_BrokenLine').hide();
			$('.zyx_contrast').show();
			$('.chart4').highcharts().reflow();
			$(".ichartWrap .ichartTits li:last-child").addClass('cur').siblings().removeClass('cur');
		}else if($(this).attr('data-tab') == 3){
			//控制自己的切换
			$('.testListWrap').hide();
			$('.zyx_TestAnalysis').hide();
			$('.zyx_ClassIn').show();
			$(".ichartWrap .ichartTits li:last-child").addClass('cur').siblings().removeClass('cur');
			//控制5个图表的切换
			$('.zyx_BrokenLine').hide();
			$('.zyx_contrast').show();
			$('.chart4').highcharts().reflow();
			$(".ichartWrap .ichartTits li:last-child").addClass('cur').siblings().removeClass('cur');
		}
	});
	
	
	/*zxy-各科目考试成绩统计表/学生报告*/
	$('.zyx_reportTab li').on('click',function(){
	    var num=$(this).index();
	    $(this).addClass('cur').siblings('li').removeClass('cur');
	    if($(this).attr('data-tab') == 1){
	    	$('.zyx_tableData').show();
	    	$('.student_report').hide();
	    }else if($(this).attr('data-tab') == 2){
	    	$('.zyx_tableData').hide();
	    	$('.student_report').show();
	    }
	})
	
	
})



$(function(){
    function scrollBar(){
        var w=$(window).outerWidth(true);
        if(w>=1183){
            $('body').css('overflow-x','hidden');
        }else{
            $('body').css('overflow-x','auto');
        }
    }
    scrollBar();
    $(window).resize(scrollBar);
})

