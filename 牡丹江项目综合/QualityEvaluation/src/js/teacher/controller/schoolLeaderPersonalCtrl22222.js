app.controller('schoolLeaderPersonalCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//上一级返回存储地址
	$scope.prevPageNo = 'schoolLeaderPersonal';
	
	
	$LAB
        .script('common/js/highcharts.js')
        .script('common/js/highcharts-functions.js')
        .wait(function(){
        	//柱状图1
            var zyx_Data1 = {"title":"年级优良率堆积柱状图1","categories":["(1)\u73ed","(2)\u73ed","(3)\u73ed","(4)\u73ed","(5)\u73ed","(6)\u73ed","(7)\u73ed","(8)\u73ed","(9)\u73ed","(10)\u73ed"],"ytitle":"\u5360\u6bd4","totalName":"\u603b\u4eba\u6570","units":"\u4eba","data":[{"name":"\u4f18\u79c0","color":"#32ba54","level":1,"data":[{"y":0,"num":0,"count":49,"class_id":52},{"y":15.38,"num":8,"count":52,"class_id":53},{"y":31.37,"num":16,"count":51,"class_id":54},{"y":7.84,"num":4,"count":51,"class_id":55},{"y":16.67,"num":8,"count":48,"class_id":56},{"y":26.53,"num":13,"count":49,"class_id":57},{"y":13.73,"num":7,"count":51,"class_id":58},{"y":16.33,"num":8,"count":49,"class_id":59},{"y":28,"num":14,"count":50,"class_id":60},{"y":3.85,"num":2,"count":52,"class_id":61}]},{"name":"\u826f\u597d","color":"#3598db","level":2,"data":[{"y":14.29,"num":7,"count":49,"class_id":52},{"y":13.46,"num":7,"count":52,"class_id":53},{"y":25.49,"num":13,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":27.08,"num":13,"count":48,"class_id":56},{"y":34.69,"num":17,"count":49,"class_id":57},{"y":45.1,"num":23,"count":51,"class_id":58},{"y":38.78,"num":19,"count":49,"class_id":59},{"y":34,"num":17,"count":50,"class_id":60},{"y":32.69,"num":17,"count":52,"class_id":61}]},{"name":"\u53ca\u683c","color":"#fdbc2a","level":3,"data":[{"y":67.35,"num":33,"count":49,"class_id":52},{"y":30.77,"num":16,"count":52,"class_id":53},{"y":23.53,"num":12,"count":51,"class_id":54},{"y":33.33,"num":17,"count":51,"class_id":55},{"y":45.83,"num":22,"count":48,"class_id":56},{"y":22.45,"num":11,"count":49,"class_id":57},{"y":35.29,"num":18,"count":51,"class_id":58},{"y":32.65,"num":16,"count":49,"class_id":59},{"y":30,"num":15,"count":50,"class_id":60},{"y":38.46,"num":20,"count":52,"class_id":61}]},{"name":"\u4e0d\u53ca\u683c","color":"#fb5252","level":4,"data":[{"y":18.37,"num":9,"count":49,"class_id":52},{"y":40.38,"num":21,"count":52,"class_id":53},{"y":19.61,"num":10,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":10.42,"num":5,"count":48,"class_id":56},{"y":16.33,"num":8,"count":49,"class_id":57},{"y":5.88,"num":3,"count":51,"class_id":58},{"y":12.24,"num":6,"count":49,"class_id":59},{"y":8,"num":4,"count":50,"class_id":60},{"y":25,"num":13,"count":52,"class_id":61}]}]};
            chart_column_stack('.chart1', zyx_Data1.title, zyx_Data1.categories, zyx_Data1.ytitle, zyx_Data1.data, zyx_Data1.totalName, zyx_Data1.units, false);

            initSingleColumnChart($('.chart1'), zyx_Data1.data);

            $('.chart-column-legend > span').on("click",function(){
                legendUpdate($(this), $('.chart1'), zyx_Data1.data, true);
            });

            
            //柱状图2
            var zyx_Data2 = {"title":"年级优良率堆积柱状图2","categories":["(1)\u73ed","(2)\u73ed","(3)\u73ed","(4)\u73ed","(5)\u73ed","(6)\u73ed","(7)\u73ed","(8)\u73ed","(9)\u73ed","(10)\u73ed"],"ytitle":"\u5360\u6bd4","totalName":"\u603b\u4eba\u6570","units":"\u4eba","data":[{"name":"\u4f18\u79c0","color":"#32ba54","level":1,"data":[{"y":0,"num":0,"count":49,"class_id":52},{"y":15.38,"num":8,"count":52,"class_id":53},{"y":31.37,"num":16,"count":51,"class_id":54},{"y":7.84,"num":4,"count":51,"class_id":55},{"y":16.67,"num":8,"count":48,"class_id":56},{"y":26.53,"num":13,"count":49,"class_id":57},{"y":13.73,"num":7,"count":51,"class_id":58},{"y":16.33,"num":8,"count":49,"class_id":59},{"y":28,"num":14,"count":50,"class_id":60},{"y":3.85,"num":2,"count":52,"class_id":61}]},{"name":"\u826f\u597d","color":"#3598db","level":2,"data":[{"y":14.29,"num":7,"count":49,"class_id":52},{"y":13.46,"num":7,"count":52,"class_id":53},{"y":25.49,"num":13,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":27.08,"num":13,"count":48,"class_id":56},{"y":34.69,"num":17,"count":49,"class_id":57},{"y":45.1,"num":23,"count":51,"class_id":58},{"y":38.78,"num":19,"count":49,"class_id":59},{"y":34,"num":17,"count":50,"class_id":60},{"y":32.69,"num":17,"count":52,"class_id":61}]},{"name":"\u53ca\u683c","color":"#fdbc2a","level":3,"data":[{"y":67.35,"num":33,"count":49,"class_id":52},{"y":30.77,"num":16,"count":52,"class_id":53},{"y":23.53,"num":12,"count":51,"class_id":54},{"y":33.33,"num":17,"count":51,"class_id":55},{"y":45.83,"num":22,"count":48,"class_id":56},{"y":22.45,"num":11,"count":49,"class_id":57},{"y":35.29,"num":18,"count":51,"class_id":58},{"y":32.65,"num":16,"count":49,"class_id":59},{"y":30,"num":15,"count":50,"class_id":60},{"y":38.46,"num":20,"count":52,"class_id":61}]},{"name":"\u4e0d\u53ca\u683c","color":"#fb5252","level":4,"data":[{"y":18.37,"num":9,"count":49,"class_id":52},{"y":40.38,"num":21,"count":52,"class_id":53},{"y":19.61,"num":10,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":10.42,"num":5,"count":48,"class_id":56},{"y":16.33,"num":8,"count":49,"class_id":57},{"y":5.88,"num":3,"count":51,"class_id":58},{"y":12.24,"num":6,"count":49,"class_id":59},{"y":8,"num":4,"count":50,"class_id":60},{"y":25,"num":13,"count":52,"class_id":61}]}]};
	        chart_column_stack('.chart2', zyx_Data2.title, zyx_Data2.categories, zyx_Data2.ytitle, zyx_Data2.data, zyx_Data2.totalName, zyx_Data2.units, false);
	
	        initSingleColumnChart($('.chart2'), zyx_Data2.data);
	
	        $('.chart-column-legend > span').on("click",function(){
	            legendUpdate($(this), $('.chart2'), zyx_Data2.data, true);
	        });
	
	        
	        //柱状图3
	        var zyx_Data3 = {"title":"年级优良率堆积柱状图3","categories":["(1)\u73ed","(2)\u73ed","(3)\u73ed","(4)\u73ed","(5)\u73ed","(6)\u73ed","(7)\u73ed","(8)\u73ed","(9)\u73ed","(10)\u73ed"],"ytitle":"\u5360\u6bd4","totalName":"\u603b\u4eba\u6570","units":"\u4eba","data":[{"name":"\u4f18\u79c0","color":"#32ba54","level":1,"data":[{"y":0,"num":0,"count":49,"class_id":52},{"y":15.38,"num":8,"count":52,"class_id":53},{"y":31.37,"num":16,"count":51,"class_id":54},{"y":7.84,"num":4,"count":51,"class_id":55},{"y":16.67,"num":8,"count":48,"class_id":56},{"y":26.53,"num":13,"count":49,"class_id":57},{"y":13.73,"num":7,"count":51,"class_id":58},{"y":16.33,"num":8,"count":49,"class_id":59},{"y":28,"num":14,"count":50,"class_id":60},{"y":3.85,"num":2,"count":52,"class_id":61}]},{"name":"\u826f\u597d","color":"#3598db","level":2,"data":[{"y":14.29,"num":7,"count":49,"class_id":52},{"y":13.46,"num":7,"count":52,"class_id":53},{"y":25.49,"num":13,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":27.08,"num":13,"count":48,"class_id":56},{"y":34.69,"num":17,"count":49,"class_id":57},{"y":45.1,"num":23,"count":51,"class_id":58},{"y":38.78,"num":19,"count":49,"class_id":59},{"y":34,"num":17,"count":50,"class_id":60},{"y":32.69,"num":17,"count":52,"class_id":61}]},{"name":"\u53ca\u683c","color":"#fdbc2a","level":3,"data":[{"y":67.35,"num":33,"count":49,"class_id":52},{"y":30.77,"num":16,"count":52,"class_id":53},{"y":23.53,"num":12,"count":51,"class_id":54},{"y":33.33,"num":17,"count":51,"class_id":55},{"y":45.83,"num":22,"count":48,"class_id":56},{"y":22.45,"num":11,"count":49,"class_id":57},{"y":35.29,"num":18,"count":51,"class_id":58},{"y":32.65,"num":16,"count":49,"class_id":59},{"y":30,"num":15,"count":50,"class_id":60},{"y":38.46,"num":20,"count":52,"class_id":61}]},{"name":"\u4e0d\u53ca\u683c","color":"#fb5252","level":4,"data":[{"y":18.37,"num":9,"count":49,"class_id":52},{"y":40.38,"num":21,"count":52,"class_id":53},{"y":19.61,"num":10,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":10.42,"num":5,"count":48,"class_id":56},{"y":16.33,"num":8,"count":49,"class_id":57},{"y":5.88,"num":3,"count":51,"class_id":58},{"y":12.24,"num":6,"count":49,"class_id":59},{"y":8,"num":4,"count":50,"class_id":60},{"y":25,"num":13,"count":52,"class_id":61}]}]};
            chart_column_stack('.chart3', zyx_Data3.title, zyx_Data3.categories, zyx_Data3.ytitle, zyx_Data3.data, zyx_Data3.totalName, zyx_Data3.units, false);

            initSingleColumnChart($('.chart3'), zyx_Data3.data);

            $('.chart-column-legend > span').on("click",function(){
                legendUpdate($(this), $('.chart3'), zyx_Data3.data, true);
            });

            
            
            //柱状图4
            var zyx_Data4 = {"title":"年级优良率堆积柱状图4","categories":["(1)\u73ed","(2)\u73ed","(3)\u73ed","(4)\u73ed","(5)\u73ed","(6)\u73ed","(7)\u73ed","(8)\u73ed","(9)\u73ed","(10)\u73ed"],"ytitle":"\u5360\u6bd4","totalName":"\u603b\u4eba\u6570","units":"\u4eba","data":[{"name":"\u4f18\u79c0","color":"#32ba54","level":1,"data":[{"y":0,"num":0,"count":49,"class_id":52},{"y":15.38,"num":8,"count":52,"class_id":53},{"y":31.37,"num":16,"count":51,"class_id":54},{"y":7.84,"num":4,"count":51,"class_id":55},{"y":16.67,"num":8,"count":48,"class_id":56},{"y":26.53,"num":13,"count":49,"class_id":57},{"y":13.73,"num":7,"count":51,"class_id":58},{"y":16.33,"num":8,"count":49,"class_id":59},{"y":28,"num":14,"count":50,"class_id":60},{"y":3.85,"num":2,"count":52,"class_id":61}]},{"name":"\u826f\u597d","color":"#3598db","level":2,"data":[{"y":14.29,"num":7,"count":49,"class_id":52},{"y":13.46,"num":7,"count":52,"class_id":53},{"y":25.49,"num":13,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":27.08,"num":13,"count":48,"class_id":56},{"y":34.69,"num":17,"count":49,"class_id":57},{"y":45.1,"num":23,"count":51,"class_id":58},{"y":38.78,"num":19,"count":49,"class_id":59},{"y":34,"num":17,"count":50,"class_id":60},{"y":32.69,"num":17,"count":52,"class_id":61}]},{"name":"\u53ca\u683c","color":"#fdbc2a","level":3,"data":[{"y":67.35,"num":33,"count":49,"class_id":52},{"y":30.77,"num":16,"count":52,"class_id":53},{"y":23.53,"num":12,"count":51,"class_id":54},{"y":33.33,"num":17,"count":51,"class_id":55},{"y":45.83,"num":22,"count":48,"class_id":56},{"y":22.45,"num":11,"count":49,"class_id":57},{"y":35.29,"num":18,"count":51,"class_id":58},{"y":32.65,"num":16,"count":49,"class_id":59},{"y":30,"num":15,"count":50,"class_id":60},{"y":38.46,"num":20,"count":52,"class_id":61}]},{"name":"\u4e0d\u53ca\u683c","color":"#fb5252","level":4,"data":[{"y":18.37,"num":9,"count":49,"class_id":52},{"y":40.38,"num":21,"count":52,"class_id":53},{"y":19.61,"num":10,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":10.42,"num":5,"count":48,"class_id":56},{"y":16.33,"num":8,"count":49,"class_id":57},{"y":5.88,"num":3,"count":51,"class_id":58},{"y":12.24,"num":6,"count":49,"class_id":59},{"y":8,"num":4,"count":50,"class_id":60},{"y":25,"num":13,"count":52,"class_id":61}]}]};
            chart_column_stack('.chart4', zyx_Data4.title, zyx_Data4.categories, zyx_Data4.ytitle, zyx_Data4.data, zyx_Data4.totalName, zyx_Data4.units, false);

            initSingleColumnChart($('.chart4'), zyx_Data4.data);

            $('.chart-column-legend > span').on("click",function(){
                legendUpdate($(this), $('.chart4'), zyx_Data4.data, true);
            });

            
            //柱状图5
            var zyx_Data5 = {"title":"年级优良率堆积柱状图5","categories":["(1)\u73ed","(2)\u73ed","(3)\u73ed","(4)\u73ed","(5)\u73ed","(6)\u73ed","(7)\u73ed","(8)\u73ed","(9)\u73ed","(10)\u73ed"],"ytitle":"\u5360\u6bd4","totalName":"\u603b\u4eba\u6570","units":"\u4eba","data":[{"name":"\u4f18\u79c0","color":"#32ba54","level":1,"data":[{"y":0,"num":0,"count":49,"class_id":52},{"y":15.38,"num":8,"count":52,"class_id":53},{"y":31.37,"num":16,"count":51,"class_id":54},{"y":7.84,"num":4,"count":51,"class_id":55},{"y":16.67,"num":8,"count":48,"class_id":56},{"y":26.53,"num":13,"count":49,"class_id":57},{"y":13.73,"num":7,"count":51,"class_id":58},{"y":16.33,"num":8,"count":49,"class_id":59},{"y":28,"num":14,"count":50,"class_id":60},{"y":3.85,"num":2,"count":52,"class_id":61}]},{"name":"\u826f\u597d","color":"#3598db","level":2,"data":[{"y":14.29,"num":7,"count":49,"class_id":52},{"y":13.46,"num":7,"count":52,"class_id":53},{"y":25.49,"num":13,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":27.08,"num":13,"count":48,"class_id":56},{"y":34.69,"num":17,"count":49,"class_id":57},{"y":45.1,"num":23,"count":51,"class_id":58},{"y":38.78,"num":19,"count":49,"class_id":59},{"y":34,"num":17,"count":50,"class_id":60},{"y":32.69,"num":17,"count":52,"class_id":61}]},{"name":"\u53ca\u683c","color":"#fdbc2a","level":3,"data":[{"y":67.35,"num":33,"count":49,"class_id":52},{"y":30.77,"num":16,"count":52,"class_id":53},{"y":23.53,"num":12,"count":51,"class_id":54},{"y":33.33,"num":17,"count":51,"class_id":55},{"y":45.83,"num":22,"count":48,"class_id":56},{"y":22.45,"num":11,"count":49,"class_id":57},{"y":35.29,"num":18,"count":51,"class_id":58},{"y":32.65,"num":16,"count":49,"class_id":59},{"y":30,"num":15,"count":50,"class_id":60},{"y":38.46,"num":20,"count":52,"class_id":61}]},{"name":"\u4e0d\u53ca\u683c","color":"#fb5252","level":4,"data":[{"y":18.37,"num":9,"count":49,"class_id":52},{"y":40.38,"num":21,"count":52,"class_id":53},{"y":19.61,"num":10,"count":51,"class_id":54},{"y":29.41,"num":15,"count":51,"class_id":55},{"y":10.42,"num":5,"count":48,"class_id":56},{"y":16.33,"num":8,"count":49,"class_id":57},{"y":5.88,"num":3,"count":51,"class_id":58},{"y":12.24,"num":6,"count":49,"class_id":59},{"y":8,"num":4,"count":50,"class_id":60},{"y":25,"num":13,"count":52,"class_id":61}]}]};
            chart_column_stack('.chart5', zyx_Data5.title, zyx_Data5.categories, zyx_Data5.ytitle, zyx_Data5.data, zyx_Data5.totalName, zyx_Data5.units, false);

            initSingleColumnChart($('.chart5'), zyx_Data5.data);

            $('.chart-column-legend > span').on("click",function(){
                legendUpdate($(this), $('.chart5'), zyx_Data5.data, true);
            });

            
            //5种柱状图切换
             $('.graph-tabs > a').click(function (){
	            var obj = $(this),
	                showid = obj.attr("data-name"),
	                p = obj.closest('.zyx_tabData');
	
	            obj.addClass('active').siblings().removeClass('active');
	            $('.tabcon[data-name]').hide();
				$('.tabcon[data-name="'+showid+'"]').show();
	            doReflow(p);
	        });
	        
	        $(function () {
	            $('.graph-tabs > a:first').trigger('click');
	        });
        });
					        
	
	
			       
	
	

}]);


	