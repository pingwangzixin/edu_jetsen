app.controller('teachingStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams','$rootScope',
	function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
		$scope.variablePacket = {
			stateChart:0 ,//默认选中年趋势按钮
			classState:0, //默认选中年级按钮
			provincenav: false,
			citynav: false,
			countynav: false,
			schoolnav: false,
			tabledata: [],
			jiaoanshow: false,
			scholldatashow:false,
			sum: 0,
			tablearea: '牡丹江市',
			schoolYear:[],
			year : ''	//从接口中获取学年
		};
		var nianjicoum, xuekecoum; //柱状图data数据
		//调用dataTable
		app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.variablePacket.tabledata.quyu;
		vm.OptionsOne = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[1]
		}});
		
		
		$scope.year='';
		
		$.ajax({
			type:"get",
			url:jeucIp+"statistics/getStuYearList",
			async:false,
			success:function(jdata){
				if(jdata.ret == 200){
					var stuYearList = [{"name":"全部","id":""}];
					angular.forEach(jdata.data,function(e,i){
	                    stuYearList.push({"name":e.id+"学年","id":e.id})
	                })
					$scope.variablePacket.studyyear="全部";
					$scope.variablePacket.schoolYear = stuYearList;
					$scope.year=$scope.variablePacket.schoolYear[0];
				}
			}
		});
		
		//切换学年时数据重新加载
		$scope.selectChange = function(year) {
			$scope.variablePacket.studyyear=year;
//			$scope.findCityCount();
			$scope.getSubsetStatistics($scope.variablePacket.id,$scope.variablePacket.type );
//			$scope.variablePacket.jiaoanshow = false;
//			$scope.variablePacket.scholldatashow = false;
			
		}
		
		var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'));
		var scope = managerSearch.scope;
		$scope.variablePacket.provinceid = managerSearch.provinceId;
				$scope.variablePacket.cityid = managerSearch.cityId;
				$scope.variablePacket.countyid= managerSearch.countyId;
				$scope.variablePacket.schoolid= managerSearch.officeId;
		if(scope==0){
			$scope.id = 1;
			$scope.variablePacket.chinanav = true;
		}
		if(scope==1){
			$scope.id = managerSearch.provinceId ;
			$scope.type = 'china'
			$rootScope.variableGlobal.crumbs.provincenav = true;
			$rootScope.variableGlobal.crumbs.provincename = managerSearch.provinceName;
		}
		if(scope==2){
			$scope.id = managerSearch.cityId;
			$scope.type = 'province'
			$rootScope.variableGlobal.crumbs.citynav = true;
			$rootScope.variableGlobal.crumbs.cityname = managerSearch.cityName;
		}
		if(scope==3){
			$scope.id = managerSearch.countyId;
			$scope.type = 'city'
			$rootScope.variableGlobal.crumbs.countynav = true;
			$rootScope.variableGlobal.crumbs.countyname = managerSearch.countyName;
		}
		if(scope==4){
			$scope.id = managerSearch.officeId;
			$scope.type = 'county'
			$rootScope.variableGlobal.crumbs.schoolnav = true;
			$rootScope.variableGlobal.crumbs.schoolname = managerSearch.officeName;
		}

		var nianjicoum, xuekecoum,courses,courseData,grades,gradeData; //柱状图data数据
		
		var teachStatistic = interfaceIpAddr+"/teachingPlan/";

		//初始化子区域数据
		$scope.getSubsetStatistics = function(id,type) {
			a = "1";
			if (!angular.isDefined(id)) {
				id = $scope.id;
			}
			if (!angular.isDefined(type)) {
				type = $scope.type;
			}
			$scope.variablePacket.id = id;
			$scope.variablePacket.type = type;
			var date = $scope.variablePacket.studyyear.replace("学年","");
			if(date=="全部"){
				date = "";
			}else{
				var j = parseInt(date)+1;
				date=date+"-"+j;
			}
			$http.get(teachStatistic + id + "?date="+date+"&type="+type).success(function (data){
				if(data.ret == 200){
					data = data.data;
					if(data.type=="office"){
						$scope.variablePacket.scholldatashow = true;
					}
//					var month = $scope.variablePacket.tabledata.zhemonth;
//					var year = $scope.variablePacket.tabledata.zheyear;
//					if(month == undefined && year == undefined){
						$scope.variablePacket.tabledata.zhemonth = data.brokenLine.month;
						$scope.variablePacket.tabledata.zheyear = data.brokenLine.year;
						$scope.variablePacket.tabledata.time = data.brokenLine.time;
//					}
					$scope.variablePacket.tabledata.type = data.type;
					if(data.level !=null){
						courses = data.level.courses;
						courseData = data.level.courseData;
						grades = data.level.grades;
						gradeData = data.level.gradeData;
					}
					$scope.variablePacket.sum = 0;
					$scope.variablePacket.tabledata.quyu = data.subset;
					angular.forEach($scope.variablePacket.tabledata.quyu, function(data, index, array) {
						$scope.variablePacket.sum += array[index].resnum;
					});
				}
				$timeout(function() {
					$scope.changeGradeColumn();
					$scope.changeSubjectColum();
					$scope.changeChartstate(0);
				}, 1000)
				
			});
		}
		$scope.getSubsetStatistics();
		
		
		//点击省、市、区、县
		$scope.findCityCount = function(id,name, type) {
			$scope.getSubsetStatistics(id,type);
			if(type == "china") {
				$scope.shengdata(); //获取省的数据
				$rootScope.variableGlobal.crumbs.provincenav = true;
				$rootScope.variableGlobal.crumbs.provincename = name; //面包屑导航显示的名字
				$scope.variablePacket.provinceid = id;
				$scope.variablePacket.btnName = "按城市";
				$scope.variablePacket.jiaoanshow = false;
			} else if(type == "province") {
				$scope.shidata(); //获取市的数据
				$rootScope.variableGlobal.crumbs.citynav = true;
				$rootScope.variableGlobal.crumbs.cityname = name; //面包屑导航显示的名字
				$scope.variablePacket.cityid = id;
				$scope.variablePacket.btnName = "按区县";
				$scope.variablePacket.jiaoanshow = false;
			} else if(type == "city") {
				$scope.quxiandata(); //获取区县的数据
				$rootScope.variableGlobal.crumbs.countynav = true;
				$rootScope.variableGlobal.crumbs.countyname = name; //面包屑导航显示的名字
				$scope.variablePacket.countyid = id;
				$scope.variablePacket.btnName = "按学校";
				$scope.variablePacket.jiaoanshow = false;
			} else if(type == "county") {
				$scope.variablePacket.schooldata = false;
				$rootScope.variableGlobal.crumbs.schoolnav = true;
				$scope.variablePacket.restableshow = false;
				$scope.variablePacket.jiaoanshow = true;
				$scope.variablePacket.scholldatashow = false;
				$scope.xuexiaodata(); //获取学校的数据
				//面包屑导航显示的名字
				$rootScope.variableGlobal.crumbs.schoolname = name;
				$scope.variablePacket.schoolid = id;
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 1000)
			}
			//表头的省市区县名字
			$scope.variablePacket.tablearea = name;
			$scope.variablePacket.tabledata.id = id;
//			$scope.changeZheline();
		}
			
			//面包屑导航切换
		$rootScope.breadNav = function(type,id,name) {
//			$scope.getSubsetStatistics(id);
			if (type == 0) {
				$scope.getSubsetStatistics(0,type);
				$scope.quanguodata();
				$rootScope.variableGlobal.crumbs.provincenav = false;
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按省份";
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = "全国"; //标题名字
				$scope.variablePacket.jiaoanshow = false;
			} else if (type == 1) {
				$scope.type="china";
				$scope.getSubsetStatistics($scope.variablePacket.provinceid,$scope.type);
				$scope.shengdata();
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按城市";
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.provincename;//标题名字
				$scope.variablePacket.jiaoanshow = false;
			} else if (type == 2) {
				$scope.type="province";
				$scope.getSubsetStatistics($scope.variablePacket.cityid,$scope.type);
				$scope.shidata();
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按区县";
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.cityname;//标题名字
				$scope.variablePacket.jiaoanshow = false;
			} else if (type == 3) {
				$scope.type="city";
				$scope.getSubsetStatistics($scope.variablePacket.countyid,$scope.type);
				$scope.quxiandata();
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按学校";
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.countyname;//标题名字
				$scope.variablePacket.jiaoanshow = false;
			}
			$scope.variablePacket.tablearea = name;
//			$scope.changeZheline();
		}
	
		//全国的数据
		$scope.quanguodata = function() {
			$scope.variablePacket.tabledata = {
				"name": "全国",
				"type": "china",
				"id": 1,
				"zhedata": [{
					"name": "教案量",
					"data": [
						76578,
						64534,
						54677,
						546745,
						184,
						215,
						252,
						265,
						233,
						183,
						139,
					]
				}],
				"coumnianjidata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}],
				"coumxuekedata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}],
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};
	
		
	
		$scope.shengdata = function() {
			$scope.variablePacket.tabledata = {
				"name": "黑龙江",
				"type": "province",
				"id": 2,
				"zhedata": [{
					"name": "教案量",
					"data": [
						7,
						69,
						95,
						145,
						184,
						215,
						252,
						265,
						233,
						183,
						139,
					]
				}],
				"coumnianjidata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}],
				"coumxuekedata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}],
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};
	
		//市数据
		$scope.shidata = function() {
			$scope.variablePacket.tabledata = {
				"name": "牡丹江市",
				"type": "city",
				"id": 21,
				"zhedata": [{
					"name": "教案量",
					"data": [
						7567,
						69,
						95,
						14.5,
						184,
						215,
						252,
						265,
						233,
						18.3,
						13.9,
					]
				}],
				"coumnianjidata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}],
				"coumxuekedata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}],
				"quyu": $scope.variablePacket.tabledata.quyu
			};
	
		};
	
		//区县数据
		$scope.quxiandata = function() {
			$scope.variablePacket.tabledata = {
				"name": "东安区",
				"type": "county",
				"id": 211,
				"zhedata": [{
					"name": "教案量",
					"data": [
						7,
						6.9,
						9.5,
						14.5,
						184,
						21.5,
						252,
						26.5,
						23.3,
						183,
						13.9,
					]
				}],
				"coumnianjidata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}],
				"coumxuekedata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}],
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};
	
		//学校的数据
		$scope.xuexiaodata = function() {
			$scope.variablePacket.tabledata = {
				"name": "东安区直属第一小学",
				"type": "school",
				"id": 211,
				"zhedata": [{
					"name": "教案量",
					"data": [
						7,
						6.9,
						9.5,
						14.5,
						184,
						21.5,
						252,
						26.5,
						23.3,
						183,
						13.9,
					]
				}],
				"coumnianjidata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}],
				"coumxuekedata": [{
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}],
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};
//		$scope.shidata();
		
		//年趋势跟月趋势切换
		$scope.changeChartstate = function(n) {
			$scope.variablePacket.stateChart = n;
			if(n == 0) {
			$timeout(function() {
				$scope.changeZheline();
			}, 1000)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changemonthZheline();
				}, 1000)
			}
		};
		//年级学科切换
		$scope.changeClassstate = function(n) {
		$scope.variablePacket.classState = n
			if(n == 0) {
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 1000)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeSubjectColum();
				}, 1000)
			}
		}
		//改变年级柱状图
		$scope.changeGradeColumn = function() {
			var color = ['#45a3d2','#f3b442'];
			var chart_column_02 = {
				"categories": grades,
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": gradeData
			};
			chart_column_base('#containerChart1',color,chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
		}

		//改变学科柱状图
		$scope.changeSubjectColum = function() {
			var color = ['#45a3d2','#f3b442'];
			var chart_column_02 = {
				"categories": courses,
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": courseData
			};
			chart_column_base('#containerChart2',color,chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
		}
		//年度趋势折线图
		var linedata = [{
			name:'个人教案',
			data: [10, 3, 5, 58, 31, 91]
		}, {
			name: '集体教案',
			data: [249, 64, 242, 251, 490, 701]
		}]
		$scope.changeZheline = function() {
			var chart_line_user_data = {
				"colors": ["#399fdf", "#d18604", "#c72036"],
				"title": "",
				"categories": $scope.variablePacket.tabledata.time,
				"ytitle": "份数",
				"data": $scope.variablePacket.tabledata.zheyear
			};
			chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,1);
		};
		//月度趋势折线图
		var monthlinedata = [{
			name:'个人教案',
			data: [10, 3, 5, 58, 31, 91]
		}, {
			name: '集体教案',
			data: [249, 64, 242, 251, 490, 701]
		}]
		$scope.changemonthZheline = function() {
			var chart_line_user_data = {
				"colors": ["#399fdf", "#d18604", "#c72036"],
				"title": "",
				"categories": ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
				"ytitle": "份数",
				"data": $scope.variablePacket.tabledata.zhemonth,
				"parallel": []
			};
			chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,1);
		};
}]);