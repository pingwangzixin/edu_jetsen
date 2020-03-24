app.controller('teachingStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams',
	function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
		$scope.variablePacket = {
			stateChart:0 ,//默认选中年趋势按钮
			classState:0, //默认选中年级按钮
			provincenav: false,
			citynav: false,
			countynav: false,
			schoolnav: false,
			tabledata: [],
			jiaoanshow: false,
			sum: 123456789,
			tablearea: '牡丹江市'
		};
		var nianjicoum, xuekecoum, zhedata; //柱状图data数据
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
			order:[1,'desc']//第一个不排序,默认降序
		}
		});
		//点击省、市、区、县
		$scope.findCityCount = function(n, type) {
			if(type == "china") {
				$scope.shengdata(); //获取省的数据
				$scope.variablePacket.provincenav = true;
				$scope.variablePacket.provincename = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
				$scope.variablePacket.btnName = "按城市";
				$scope.changeZheline();
			} else if(type == "province") {
				$scope.shidata(); //获取市的数据
				$scope.variablePacket.citynav = true;
				$scope.variablePacket.cityname = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
				$scope.variablePacket.btnName = "按区县";
				$scope.changeZheline();
			} else if(type == "city") {
				$scope.quxiandata(); //获取区县的数据
				$scope.variablePacket.countynav = true;
				$scope.variablePacket.countyname = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
				$scope.variablePacket.btnName = "按学校";
				$scope.changeZheline();
			} else if(type == "county") {
				$scope.variablePacket.schooldata = false;
				$scope.variablePacket.schoolnav = true;
				$scope.variablePacket.restableshow = false;
				$scope.variablePacket.jiaoanshow = true;
				$scope.xuexiaodata(); //获取学校的数据
				$scope.changeZheline();
				//面包屑导航显示的名字
				$scope.variablePacket.schoolname = $scope.variablePacket.tabledata.name;
			}
	
			//表头的省市区县名字
			$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
	
			$timeout(function() {
				$scope.changeGradeColumn();
				$scope.changeZheline();
			}, 500)
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
				"quyu": [{
						"id": 2,
						"name": "黑龙江省",
						"resnum": 240,
						"xiti": 300,
						"shijuan": 400,
						"totle": 500
					},
					{
						"id": 3,
						"name": "江西省",
						"resnum": 240,
					},
					{
						"id": 4,
						"name": "河北省",
						"resnum": 240,
					}
				]
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
				"quyu": [{
						"id": 21,
						"name": "牡丹江市",
						"resnum": 240,
					},
					{
						"id": 31,
						"name": "鹤岗市",
						"resnum": 240,
					},
				]
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
				"quyu": [{
						"id": 211,
						"name": "东安区",
						"resnum": 240,
					},
					{
						"id": 311,
						"name": "西安区",
						"resnum": 240,
					}
				]
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
				"quyu": [{
						"id": 2111,
						"name": "牡丹江第一小学",
						"resnum": 240,
					},
					{
						"id": 3111,
						"name": "牡丹江第二小学",
						"resnum": 240,
					}
				]
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
				"quyu": [{
						"id": 12345,
						"name": "张三",
						"resnum": 240,
					},
					{
						"id": 3111,
						"name": "李四",
						"resnum": 240,
					}
				]
			};
		};
		$scope.shidata();
		
		//年趋势跟月趋势切换
		$scope.changeChartstate = function(n) {
			$scope.variablePacket.stateChart = n;
			if(n == 0) {
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changemonthZheline();
				}, 500)
			}
		};
		//年级学科切换
		$scope.changeClassstate = function(n) {
		$scope.variablePacket.classState = n
			if(n == 0) {
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 500)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeSubjectColum();
				}, 500)
			}
		}
		$timeout(function() {
			$scope.changeGradeColumn();
			$scope.changeZheline();
		}, 500);
		//改变年级柱状图
		$scope.changeGradeColumn = function() {
			var chart_column_02 = {
				"categories": ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": [{
					"color":'#45a3d2',
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 96, 85, 66]
				}, {
					"color":'#f3b442',
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 96, 85, 66]
				}]
			};
			chart_column_base('#containerChart1', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
		}
	
		//改变学科柱状图
		$scope.changeSubjectColum = function() {
			var chart_column_02 = {
				"categories": ["语文", "数学", "英语", "政治", "历史"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": [{
					"color":'#45a3d2',
					"name": '个人教案',
					"data": [49.9, 71.5, 106.4, 86, 95]
				}, {
					"color":'#f3b442',
					"name": '集体教案',
					"data": [83.6, 78.8, 98.5, 100, 30]
				}]
			};
			chart_column_base('#containerChart2', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
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
				"categories": ["2014年", "2015年", "2016年", "2017年", "2018年","2019年"],
				"ytitle": "份数",
				"data": linedata
			};
			chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false);
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
				"categories": ["5月", "6月", "7月", "8月", "9月","10月"],
				"ytitle": "份数",
				"data": linedata,
				"parallel": []
			};
			chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false);
		};
}]);