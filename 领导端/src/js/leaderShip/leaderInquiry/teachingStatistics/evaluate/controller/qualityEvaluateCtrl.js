app.controller('qualityEvaluateCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams','$rootScope', function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
	$scope.variablePacket = {
		subjectData: [ //科目数据 
			{
				id: "1",
				"name": "思想品德和公民素养"
			},
			{
				id: "2",
				"name": "学业水平和学习素养"
			},
			{
				id: "3",
				"name": "身体和心理健康水平"
			},
			{
				id: "4",
				"name": "兴趣特长及审美素养 "
			},
			{
				id: "5",
				"name": "社会实践和动手能力"
			}
		],
		subjectIndex: 0, //科目选中下标
		countynav: false, //区域显示状态
		schoolnav: false, //学校显示状态
		countyname: false, //区域名称
		schoolname: false, //学校名称
		quanguo: true
	};

	//获取学期数据
	$scope.team = $("#teamName").find(":selected").val();
	$scope.variablePacket.evalSuZhiName = $scope.variablePacket.subjectData[0].name;
	//从接口中获取学年
	$scope.year = '';
	$.ajax({
		type: "get",
		url: jeucIp + "statistics/getYearList",
		async: false,
		success: function(jdata) {
			if(jdata.ret == 200) {
				$scope.variablePacket.schoolYear = jdata.data;
				$scope.year = jdata.data[1].id;
				console.log($scope.year);
			}
		}
	});

	//根据当前用户进来的有角色判断，需按角色查询显示//session中scope的值：1234代表省市区校，0代表全国
	var session_Obj = JSON.parse(sessionStorage.getItem("managerSearch"));
	var session_scope = session_Obj.scope;

	$scope.variablePacket.activeid = $stateParams.activeid; //路由切换状态

	$scope.subjectTab = function(index) { //切换科目
		$scope.variablePacket.subjectIndex = index;
		$scope.variablePacket.evalSuZhiName = $scope.variablePacket.subjectData[index].name;
		console.log($scope.variablePacket.subjectData[index].name);
		findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, $scope.variablePacket.type, $scope.variablePacket.id);
		////$scope.cityData();
		$scope.$apply();
	};
	$scope.cityData = function() {
		$scope.variablePacket.tableData = {
			"name": "市", //名称
			"type": "city", //类型
			"id": 1,
			data: [{
					"id": "1",
					"name": "海淀区", //区名称
					"Apeople": "226", //人数
					"Aratio": "33%", //占比
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				},
				{
					"id": "2",
					"name": "昌平区",
					"Apeople": "226",
					"Aratio": "33%",
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				}
			]

		};

	};
	//$scope.cityData();        
	$scope.schoolData = function() {
		$scope.variablePacket.tableData = {
			"name": "学校", //名称
			"type": "school", //类型
			"id": 1,
			data: [{
					"id": "1",
					"name": "第一中学", //学校名称
					"Apeople": "26", //人数
					"Aratio": "33%", //占比
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				},
				{
					"id": "2",
					"name": "第二中学",
					"Apeople": "26",
					"Aratio": "30%",
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				}
			]

		};

	};
	$scope.classData = function() {
		$scope.variablePacket.tableData = {
			"name": "班级", //名称
			"type": "class", //类型
			"id": 1,
			data: [{
					"id": "1",
					"name": "七年级", //班级名称
					"group": "class", //年级与众不同,加以区分
					"Apeople": "26", //人数
					"Aratio": "33%", //占比
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				},
				{
					"id": "2",
					"name": "(1)班", //班级名称
					"Apeople": "26", //人数
					"Aratio": "33%", //占比
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				},
				{
					"id": "3",
					"name": "(2)班",
					"Apeople": "26",
					"Aratio": "30%",
					"Bpeople": "220",
					"Bratio": "30%",
					"Cpeople": "113",
					"Cratio": "18%",
					"Dpeople": "26",
					"Dratio": "3%",

				}
			]

		};

	};

	$scope.areaTab = function(type, name, id) { //区域切换
		$scope.variablePacket.id = id;
		$scope.variablePacket.name = name;
		$scope.variablePacket.type = type;
		if(type == "1") {
			//$scope.variablePacket.quanguo = true;
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = name;
			$scope.variablePacket.provinceId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		};
		if(type == "2") {
			$rootScope.variableGlobal.crumbs.citynav=true;
			$rootScope.variableGlobal.crumbs.cityname = name;
			$rootScope.variableGlobal.crumbs.cityId = id;
			
			
			
			//$scope.variablePacket.quanguo = true;
//			$scope.variablePacket.provincenav = true;
//			$scope.variablePacket.citynav = true;
//			$scope.variablePacket.cityname = name;
//			$scope.variablePacket.cityId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		};
		if(type == "3") {
			$rootScope.variableGlobal.crumbs.countynav=true;
			$rootScope.variableGlobal.crumbs.countyname = name;
			$rootScope.variableGlobal.crumbs.countyId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, name);
			//$scope.cityData();
		};
		if(type == "4") {
			$rootScope.variableGlobal.crumbs.schoolnav=true;
			$rootScope.variableGlobal.crumbs.schoolname = name;
			$rootScope.variableGlobal.crumbs.schoolId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.classData();
		};
	};
	$rootScope.breadNav = function(type, id, name) { //区域导航切换
		$scope.variablePacket.id = id;
		$scope.variablePacket.name = name;
		$scope.variablePacket.type = type;
		if(type == "0") {
			$rootScope.variableGlobal.crumbs.quanguo = true;
			$rootScope.variableGlobal.crumbs.provincenav = false;
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "1") {
			$rootScope.variableGlobal.crumbs.quanguo = true;
			$rootScope.variableGlobal.crumbs.provincenav = true;
			$rootScope.variableGlobal.crumbs.provincename = name;
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$rootScope.variableGlobal.crumbs.cityname = "";
			$rootScope.variableGlobal.crumbs.countyname = "";
			$rootScope.variableGlobal.crumbs.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "2") {
			$rootScope.variableGlobal.crumbs.quanguo = false;
			$rootScope.variableGlobal.crumbs.provincenav = false;
			$rootScope.variableGlobal.crumbs.citynav = true;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$rootScope.variableGlobal.crumbs.cityname = name;
			$rootScope.variableGlobal.crumbs.cityId = id;
			$rootScope.variableGlobal.crumbs.countyname = "";
			$rootScope.variableGlobal.crumbs.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "3") {
			$rootScope.variableGlobal.crumbs.quanguo = false;
			$rootScope.variableGlobal.crumbs.provincenav = false;
			//如果当前角色==3，则最大显示当前角色
			if(session_scope == type) {
				$rootScope.variableGlobal.crumbs.citynav = false;
			} else {
				$rootScope.variableGlobal.crumbs.citynav = true;
			}

			$rootScope.variableGlobal.crumbs.countynav = true;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$rootScope.variableGlobal.crumbs.countyname = name;
			$rootScope.variableGlobal.crumbs.countyId = id;
			$rootScope.variableGlobal.crumbs.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, name);
			//$scope.cityData();
		} else if(type == "4") {
			$rootScope.variableGlobal.crumbs.quanguo = false;
			$rootScope.variableGlobal.crumbs.provincenav = false;
			//如果当前角色==3，则最大显示当前角色
			if(session_scope == type) {
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
			} else {
				$rootScope.variableGlobal.crumbs.citynav = true;
				$rootScope.variableGlobal.crumbs.countynav = true;
			}
			$rootScope.variableGlobal.crumbs.schoolnav = true;
			$rootScope.variableGlobal.crumbs.schoolname = name;
			$rootScope.variableGlobal.crumbs.schoolId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else {
			return;
		}
	};

	//以下echart
	$scope.chart_column_stack_data = {
		"categories": [],
		"ytitle": "比率",
		"totalName": "总人数",
		"units": "人",
		"data": [{
			"name": "A",
			"color": "#48bd7e",
			"level": 1,
			"data": []
		}, {
			"name": "B",
			"color": "#46a2d2",
			"level": 2,
			"data": []
		}, {
			"name": "C",
			"color": "#f4b242",
			"level": 3,
			"data": []
		}, {
			"name": "D",
			"color": "#f46765",
			"level": 4,
			"data": []
		}]
	};
	chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false);

	initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

	/*$('.chart-column-legends.stack-2 > span').click(function() {
		legendUpdate($(this), $('.chart-column-stack-2'), $scope.chart_column_stack_data.data,true);
	});*/

	if(session_scope == 1) {
		$rootScope.breadNav(session_scope, session_Obj.provinceId, session_Obj.provinceName);
	} else if(session_scope == 2) {
		$rootScope.breadNav(session_scope, session_Obj.cityId, session_Obj.cityName);
	} else if(session_scope == 3) {
		$rootScope.breadNav(session_scope, session_Obj.countyName, session_Obj.countyName);
	} else if(session_scope == 4) {
		$rootScope.breadNav(session_scope, session_Obj.officeId, session_Obj.officeName);
		//$scope.findCityCount(session_Obj.officeId,'county',session_Obj.officeName); 
	} else {
		//全国
		$scope.variablePacket.quanguo = true;
		findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, 0, "");
	}

	//查询课堂全国的数据
	function findData(schoolYear, team, evalWeiduName, type, id) {
		$http.get(interfaceIpAddr + 'suzhi/findAll?type=' + type + '&schoolYear=' + schoolYear + '&team=' + team + '&evalWeiduName=' + evalWeiduName + '&id=' + id).success(function(jdata) {
			var ret = jdata.ret;
			var mycategories = [];
			var dataAll = [];
			var dataJsonA = {};
			var dataJsonB = {};
			var dataJsonC = {};
			var dataJsonD = {};
			var dataA = [];
			var dataB = [];
			var dataC = [];
			var dataD = [];
			var alltableData = {};
			var tableData = [];
			if(ret == 200) {
				angular.forEach(jdata.data.all, function(e, i) {
					var sum = e.levela + e.levelb + e.levelc + e.leveld;
					mycategories.push(e.name);
					//给A值
					var levela = {};
					levela.y = e.levela;
					levela.num = e.levela;
					levela.count = sum;
					dataA.push(levela);

					//给B值
					var levelb = {};
					levelb.y = e.levelb;
					levelb.num = e.levelb;
					levelb.count = sum;
					dataB.push(levelb);

					//给C值
					var levelc = {};
					levelc.y = e.levelc;
					levelc.num = e.levelc;
					levelc.count = sum;
					dataC.push(levelc);

					//给D值
					var leveld = {};
					leveld.y = e.leveld;
					leveld.num = e.leveld;
					leveld.count = sum;
					dataD.push(leveld);

					var tableDataJson = {};
					tableDataJson.id = e.id;
					tableDataJson.name = e.name

					tableDataJson.Apeople = e.levela;
					tableDataJson.Bpeople = e.levelb;
					tableDataJson.Cpeople = e.levelc;
					tableDataJson.Dpeople = e.leveld;
					tableDataJson.Aratio = Math.round(e.levela / sum * 100) + '%';
					tableDataJson.Bratio = Math.round(e.levelb / sum * 100) + '%';
					tableDataJson.Cratio = Math.round(e.levelc / sum * 100) + '%';
					tableDataJson.Dratio = Math.round(e.leveld / sum * 100) + '%';
					if(type == "4") {
						tableDataJson.group = 'class';
					}
					console.log("tableDataJson====" + tableDataJson + "tableDataJson.group====" + tableDataJson.group)
					tableData.push(tableDataJson);
					//年级列表需要添加标志
					if(type == "4") {
						//添加班级列表项
						angular.forEach(e.classes, function(ee, j) {
							var sum2 = ee.levela + ee.levelb + ee.levelc + ee.leveld;
							var tableDataJson2 = {};
							tableDataJson2.id = ee.id;
							tableDataJson2.name = ee.name
							tableDataJson2.Apeople = ee.levela;
							tableDataJson2.Bpeople = ee.levelb;
							tableDataJson2.Cpeople = ee.levelc;
							tableDataJson2.Dpeople = ee.leveld;
							tableDataJson2.Aratio = Math.round(ee.levela / sum2 * 100) + '%';
							tableDataJson2.Bratio = Math.round(ee.levelb / sum2 * 100) + '%';
							tableDataJson2.Cratio = Math.round(ee.levelc / sum2 * 100) + '%';
							tableDataJson2.Dratio = Math.round(ee.leveld / sum2 * 100) + '%';
							tableData.push(tableDataJson2);
						});
					}

				});
				console.log(mycategories);
				$scope.chart_column_stack_data.categories = mycategories;

				dataJsonA.name = "A";
				dataJsonA.color = "#48bd7e";
				dataJsonA.level = 1;
				dataJsonA.data = dataA;

				dataJsonB.name = "B";
				dataJsonB.color = "#46a2d2";
				dataJsonB.level = 2;
				dataJsonB.data = dataB;

				dataJsonC.name = "C";
				dataJsonC.color = "#f4b242";
				dataJsonC.level = 3;
				dataJsonC.data = dataC;

				dataJsonD.name = "D";
				dataJsonD.color = "#f46765";
				dataJsonD.level = 4;
				dataJsonD.data = dataD;

				dataAll.push(dataJsonD);
				dataAll.push(dataJsonC);
				dataAll.push(dataJsonB);
				dataAll.push(dataJsonA);
				console.log(dataAll);
				$scope.chart_column_stack_data.data = dataAll;

				alltableData.name = "名称";
				alltableData.type = jdata.data.type;
				if(type == "4") {
					alltableData.type = "class";
				}
				alltableData.id = id;
				console.log("tableData===" + tableData);
				alltableData.data = tableData;
				$scope.variablePacket.tableData = alltableData;
				console.log($scope.chart_column_stack_data.data)
				console.log(dataC)

				chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false,true);

//				initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

			}

		});
	}

	//切换学年时数据重新加载
	$scope.selectChange = function(n) {

		if($scope.variablePacket.type == "3") {
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, $scope.variablePacket.type, $scope.variablePacket.name);
		} else {
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, $scope.variablePacket.type, $scope.variablePacket.id);
		}

		//$scope.cityData();
	}

	//切换学期时数据重新加载
	$("#teamName").change(function() {
		$scope.team = $(this).find(":selected").val();
		if($scope.variablePacket.type == "3") {
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, $scope.variablePacket.type, $scope.variablePacket.name);
		} else {
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, $scope.variablePacket.type, $scope.variablePacket.id);
		}

		//$scope.cityData();
	});

}]);