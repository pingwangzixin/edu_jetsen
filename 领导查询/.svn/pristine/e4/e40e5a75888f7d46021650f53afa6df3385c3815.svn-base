app.controller('resourcesGrantCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$state,$timeout,$http,$location,$interval, $stateParams) {
//模拟数据
	$scope.variablePacket = {
		state: 0,
		classState:0,
		school: true,
		statesType: 0,
		addtype: 1,
		sum: 123456789,
		tablearea: '',
		provincenav: false,
		citynav: false,
		countynav: false,
		schoolnav: false,
		stateType: 0,
		stateChart: 0,
		btnName: "按区县",
		guidanceArea: true,
		guidannavlist:[],
		activeid:"",
		jiaoanshow:false
	};
	var nianjicoum, xuekecoum, zhedata; //柱状图data数据
	$scope.variablePacket.activeid =$stateParams.activeid;
	$scope.variablePacket.tablearea = "牡丹江市";
	
	//切换选项卡
	$scope.changestate = function(n) {
		$scope.variablePacket.stateType = n;
	};
	//年级跟科目切换
	$scope.changeClassstate = function(n) {
			$scope.variablePacket.classState = n;
			if(n == 0) {
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 500)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeSubjectColum();
				}, 500)
			}
	};
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
	}
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.variablePacket.tabledata.quyu;
		vm.tabledata_user = $scope.variablePacket.tabledata.roleguidance;
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
		vm.OptionsTwo = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0,1], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[2,'desc']//第一个不排序,默认降序
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
			"jiaoyan": [{
				"name": "下发总量",
				"data": [
					7770,
					8770,
					17700,
					9779,
					1874,
					2175,
					2572,
					2675,
					2373,
					1873,
					1379,
				]
			}],
			"roleguidance": [{
				"id": "1",
				"name": "张三",
				"school": "牡丹江小学",
				"guidance": "100"
			}, {
				"id": "2",
				"name": "李四",
				"school": "河北第一实验小学",
				"guidance": "100"
			}, {
				"id": "3",
				"name": "王五",
				"school": "景德镇小学",
				"guidance": "100"
			}, {
				"id": "4",
				"name": "赵六",
				"school": "阿勒泰小学",
				"guidance": "100"
			}],
			"quyu": [{
					"id": 2,
					"name": "黑龙江省",
					"totle": 240,
				},
				{
					"id": 3,
					"name": "江西省",
					"totle": 240,
				},
				{
					"id": 4,
					"name": "河北省",
					"totle": 240,
				}
			]
		};
	};


	$scope.shengdata = function() {
		$scope.variablePacket.tabledata = {
			"name": "黑龙江",
			"type": "province",
			"id": 2,
			"jiaoyan": [{
				"name": "下发总量",
				"data": [
					70,
					80,
					100,
					99,
					184,
					21.5,
					252,
					26.5,
					233,
					18.3,
					13.9,
				]
			}],
			"roleguidance": [{
				"id": "1",
				"name": "小李",
				"school": "牡丹江第一小学",
				"guidance": "100"
			}, {
				"id": "2",
				"name": "小张",
				"school": "鹤岗第二小学",
				"guidance": "100"
			}, {
				"id": "3",
				"name": "小王",
				"school": "哈尔滨第三小学",
				"guidance": "100"
			}, {
				"id": "4",
				"name": "小赵",
				"school": "齐齐哈尔第一小学",
				"guidance": "100"
			}],
			"quyu": [{
					"id": 21,
					"name": "牡丹江市",
					"totle": 240,
				},
				{
					"id": 31,
					"name": "鹤岗市",
					"totle": 240,
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
			"jiaoyan": [{
				"name": "下发总量",
				"data": [
					70,
					80,
					100,
					99,
					184,
					21.5,
					252,
					265,
					23.3,
					18.3,
					13.9,
				]
			}],
			"roleguidance": [{
				"id": "1",
				"name": "刘亚辉",
				"school": "西安区第一小学",
				"guidance": "100"
			}, {
				"id": "2",
				"name": "李四",
				"school": "东安区第二小学",
				"guidance": "100"
			}, {
				"id": "3",
				"name": "王五",
				"school": "牡丹江市实验小学",
				"guidance": "100"
			}, {
				"id": "4",
				"name": "赵六",
				"school": "牡丹江第四小学",
				"guidance": "100"
			}],
			"quyu": [{
					"id": 211,
					"name": "东安区",
					"totle": 240,
				},
				{
					"id": 311,
					"name": "西安区",
					"totle": 240,
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
			"jiaoyan": [{
				"name": "下发总量",
				"data": [
					70,
					80,
					100,
					99,
					18.4,
					215,
					25.2,
					26.5,
					233,
					18.3,
					13.9,
				]
			}],
			"roleguidance": [{
				"id": "1",
				"name": "张三",
				"school": "东安区第一小学",
				"guidance": "100"
			}, {
				"id": "2",
				"name": "李四",
				"school": "东安区第二小学",
				"guidance": "100"
			}, {
				"id": "3",
				"name": "王五",
				"school": "东安区第三小学",
				"guidance": "100"
			}, {
				"id": "4",
				"name": "赵六",
				"school": "东安区第四小学",
				"guidance": "100"
			}],
			"quyu": [{
					"id": 2111,
					"name": "牡丹江第一小学",
					"totle": 240,
				},
				{
					"id": 3111,
					"name": "牡丹江第二小学",
					"totle": 240,
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
			"jiaoyan": [{
				"name": "下发总量",
				"data": [
					70,
					80,
					100,
					99,
					18.4,
					21.5,
					252,
					26.5,
					23.3,
					18.3,
					139,
				]
			}],
			"roleguidance": [{
				"id": "1",
				"name": "张三",
				"school": "东安区第一小学",
				"guidance": "100"
			}, {
				"id": "2",
				"name": "李四",
				"school": "东安区第一小学",
				"guidance": "100"
			}, {
				"id": "3",
				"name": "王五",
				"school": "东安区第一小学",
				"guidance": "100"
			}, {
				"id": "4",
				"name": "赵六",
				"school": "东安区第一小学",
				"guidance": "100"
			}],
			"quyu": [{
					"id": 12345,
					"name": "张三",
					"totle": 240,
				},
				{
					"id": 3111,
					"name": "李四",
					"totle": 240,
				}
			]
		};
	};
	$scope.shidata();
	$timeout(function() {
		$scope.changeZheline();
	}, 500)


	//年度趋势折线图
	var linedata = [{
		name:'下发量',
		data: [43934, 52503, 57177, 69658, 97031, 9731]
	}]
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#399fdf"],
			"title": "",
			"categories": ["2014年", "2015年", "2016年", "2017年", "2018年","2019年"],
			"ytitle": "数量",
			"data": linedata,
			"parallel": []
		};
		chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,false);
	};
	//月度趋势折线图
	var monthlinedata = [{
		name:'下发量',
		data: [3934, 2503, 5177, 9658, 7031, 6231]
	}]
	$scope.changemonthZheline = function() {
		var chart_line_user_data = {
			"colors": ["#399fdf"],
			"title": "",
			"categories": ["2月", "3月", "4月", "5月", "6月","7月"],
			"ytitle": "数量",
			"data": monthlinedata,
			"parallel": []
		};
		chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,false);
	};
	//改变年级柱状图
	$scope.changeGradeColumn = function() {
		var chartData = {
			"categories": ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"],
			"ytitle": "数量",
			"data": [{
				'color':'#46a2d2',
				"data": [49, 71.5, 106, 96, 85, 66]
			}]
		};
		chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
	}

	//改变学科柱状图
	$scope.changeSubjectColum = function() {
		var chartData = {
			"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
			"ytitle": "数量",
			"data": [{
				'color':'#46a2d2',
				"data": [49., 71, 106, 96, 85, 66,87,45]
			}]
		};
		chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
	}
}]);
