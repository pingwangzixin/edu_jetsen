app.controller('safeIndexCtrl',['$scope','$state','$stateParams','$timeout','$http','$location','$interval',function($scope,$state, $stateParams,$timeout,$http,$location,$interval) {
	//变量包
    $scope.variablePacket = {
    	late : '' //迟到人数  用来页面判断显示哪部分内容
    }
    //今日出勤统计表 数据模拟
    $scope.todayData = [
    	{'name':'到校时间',startTime:'7:30',endTime:'8:00'},
    	{'name':'午休时间',startTime:'11:30',endTime:'13:00'},
    	{'name':'离校时间',startTime:'15:00',endTime:'15:30'},
    	{'name':'活动时间',startTime:'16:00',endTime:'18:00'}
    ];
    //表格数据模拟
    $scope.studentData = [
    	{'name':'孙若镤','time':'07:38:53','behavior':'进校','performance':'正常'},
    	{'name':'孙国宝','time':'08:02:53','behavior':'离校','performance':'早退'},
    	{'name':'任凯琪','time':'12:45:34','behavior':'午休','performance':'正常'},
    	{'name':'朱恩瑜','time':'13:02:33','behavior':'活动','performance':'午休异常'},
    	{'name':'李智学','time':'07:41:02','behavior':'活动','performance':'早退'},
    	{'name':'孙若镤','time':'07:38:53','behavior':'进校','performance':'正常'},
    	{'name':'孙国宝','time':'08:02:53','behavior':'离校','performance':'早退'},
    	{'name':'任凯琪','time':'12:45:34','behavior':'午休','performance':'正常'},
    	{'name':'朱恩瑜','time':'13:02:33','behavior':'活动','performance':'午休异常'},
    	{'name':'李智学','time':'07:41:02','behavior':'活动','performance':'早退'}
    ];
    //历史出勤率折线图
	var linedata = [{
		name: '学生到校率',
		data: [43, 55, 77, 58, 97, 73]
	}, {
		name: '学生迟到率',
		data: [4, 2, 9, 2, 3, 1]
	}, {
		name: '学生早退率',
		data: [11, 17, 16, 1, 2, 9]
	}]
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#46a2d2", "#c72036", "#d18604"],
			"title": "",
			"categories": ["周一", "周二", "周三", "周四", "周五","周六"],
			"ytitle": "",
			"tip_type":2,
			"data": linedata
		};
		chart_line('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,true,true,chart_line_user_data.tip_type,false);
	};
	$scope.changeZheline();
	//今日出勤情况 实心饼图
	var pieSolidArr = {
			"target": ".pieSolid",
			"title": "",
			"enabled":false,
			"data": [{
				type: 'pie',
				data: [
					{
						'name':'迟到学生',
						'y':3,
						'color':'#f4b242',
					},
					{
						'name':'在校学生',
						'y':45,
						'color':'#48bd7e',
					}
				]
			}],
			"labels": true
		};
		pie_solid(pieSolidArr);
		
		var pieSolidArr = {
			"target": ".pieSolid1",
			"title": "",
			"enabled":false,
			"data": [{
				type: 'pie',
				data: [
					{
						'name':'迟到学生',
						'y':0,
						'color':'#e0e0e0',
					},
					{
						'name':'在校学生',
						'y':48,
						'color':'#48bd7e',
					}
				]
			}],
			"labels": true
		};
		pie_solid(pieSolidArr)
		$scope.variablePacket.late = pieSolidArr.data[0].data[0].y;
		var pieSolidArr = {
			"target": ".pieSolid2",
			"title": "",
			"enabled":false,
			"data": [{
				type: 'pie',
				data: [
					{
						'name':'离校学生',
						'y':20,
						'color':'#46a2d2',
					},
					{
						'name':'在校学生',
						'y':28,
						'color':'#48bd7e',
					}
				]
			}],
			"labels": true
		};
		pie_solid(pieSolidArr)
}]);