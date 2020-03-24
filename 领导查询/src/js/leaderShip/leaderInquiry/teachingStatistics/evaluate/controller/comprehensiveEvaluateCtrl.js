app.controller('comprehensiveEvaluateCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
	$scope.variablePacket = {
		subjectData: [ //科目数据
			{
				id: "1",
				"name": "语文"
			},
			{
				id: "2",
				"name": "数学"
			},
			{
				id: "3",
				"name": "英语"
			},
			{
				id: "4",
				"name": "历史"
			},
			{
				id: "5",
				"name": "心理科学"
			},
			{
				id: "6",
				"name": "体育"
			},
			{
				id: "7",
				"name": "美术"
			},
			{
				id: "8",
				"name": "信息技术"
			},
			{
				id: "9",
				"name": "兴趣特长"
			},
			{
				id: "10",
				"name": "品德"
			},
			{
			   id:"11",
			  "name":"品德发展"
			},
			{
			   id:"12",
			  "name":"综合实践"
			},
			{
			   id:"13",
			  "name":"音乐"
			},
			{
			   id:"13",
			  "name":"身心发展"
			}
		],
		xueyename:"学业发展水平",
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
		url: jeucIp + "statistics/getStuYearList",
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
		if($scope.variablePacket.subjectData[index].name == '品德发展'){
			$scope.variablePacket.xueyename="品德发展水平";
		}else if($scope.variablePacket.subjectData[index].name == '兴趣特长'){
			$scope.variablePacket.xueyename="兴趣特长养成";
		}else if($scope.variablePacket.subjectData[index].name == '身心发展'){
			$scope.variablePacket.xueyename="身心发展水平";
		}else{
			$scope.variablePacket.xueyename=$scope.variablePacket.subjectData[index].name+"学业发展水平";
		}
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
			$scope.variablePacket.quanguo = true;
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = name;
			$scope.variablePacket.provinceId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		};
		if(type == "2") {
			$scope.variablePacket.quanguo = true;
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = name;
			$scope.variablePacket.cityId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		};
		if(type == "3") {
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = name;
			$scope.variablePacket.countyId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, name);
			//$scope.cityData();
		};
		if(type == "4") {
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.schoolname = name;
			$scope.variablePacket.schoolId = id;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.classData();
		};
	};
	$scope.areaNav = function(type, id, name) { //区域导航切换
		$scope.variablePacket.id = id;
		$scope.variablePacket.name = name;
		$scope.variablePacket.type = type;
		if(type == "0") {
			$scope.variablePacket.quanguo = true;
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "1") {
			$scope.variablePacket.quanguo = true;
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = name;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.cityname = "";
			$scope.variablePacket.countyname = "";
			$scope.variablePacket.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "2") {
			$scope.variablePacket.quanguo = false;
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.cityname = name;
			$scope.variablePacket.cityId = id;
			$scope.variablePacket.countyname = "";
			$scope.variablePacket.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, id);
			//$scope.cityData();
		} else if(type == "3") {
			$scope.variablePacket.quanguo = false;
			$scope.variablePacket.provincenav = false;
			//如果当前角色==3，则最大显示当前角色
			if(session_scope == type) {
				$scope.variablePacket.citynav = false;
			} else {
				$scope.variablePacket.citynav = true;
			}

			$scope.variablePacket.countynav = true;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.countyname = name;
			$scope.variablePacket.countyId = id;
			$scope.variablePacket.schoolname = "";
			findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, type, name);
			//$scope.cityData();
		} else if(type == "4") {
			$scope.variablePacket.quanguo = false;
			$scope.variablePacket.provincenav = false;
			//如果当前角色==3，则最大显示当前角色
			if(session_scope == type) {
				$scope.variablePacket.citynav = false;
				$scope.variablePacket.countynav = false;
			} else {
				$scope.variablePacket.citynav = true;
				$scope.variablePacket.countynav = true;
			}
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.schoolname = name;
			$scope.variablePacket.schoolId = id;
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
			"name": "stars4",
			"color": "#48bd7e",
			"level": 1,
			"data": []
		}, {
			"name": "stars3",
			"color": "#46a2d2",
			"level": 2,
			"data": []
		}, {
			"name": "stars2",
			"color": "#f4b242",
			"level": 3,
			"data": []
		}, {
			"name": "stars1",
			"color": "#f46765",
			"level": 4,
			"data": []
		}, {
			"name": "stars0",
			"color": "#c67df0",
			"level": 5,
			"data": []
		}]
	};
	chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false);

	//							initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

	/*$('.chart-column-legends.stack-2 > span').click(function() {
		legendUpdate($(this), $('.chart-column-stack-2'), $scope.chart_column_stack_data.data, true);
	});*/

	if(session_scope == 1) {
		$scope.areaNav(session_scope, session_Obj.provinceId, session_Obj.provinceName);
	} else if(session_scope == 2) {
		$scope.areaNav(session_scope, session_Obj.cityId, session_Obj.cityName);
	} else if(session_scope == 3) {
		$scope.areaNav(session_scope, session_Obj.countyId, session_Obj.countyName);
	} else if(session_scope == 4) {
		$scope.areaNav(session_scope, session_Obj.officeId, session_Obj.officeName);
		//$scope.findCityCount(session_Obj.officeId,'county',session_Obj.officeName); 
	} else {
		//全国
		$scope.variablePacket.quanguo = true;
		findData($scope.year, $scope.team, $scope.variablePacket.evalSuZhiName, 0, "");
	}

	//查询课堂全国的数据
	function findData(schoolYear, team, evalWeiduName, type, id) {
		$http.get(interfaceIpAddr + 'eval/findAll?type=' + type + '&schoolYear=' + schoolYear + '&team=' + team + '&evalWeiduName=' + evalWeiduName + '&id=' + id).success(function(jdata) {
			var ret = jdata.ret;
			var mycategories = [];
			var dataAll = [];
			var dataStarJson0 = {};
			var dataStarJson1 = {};
			var dataStarJson2 = {};
			var dataStarJson3 = {};
			var dataStarJson4 = {};
			var dataStar0 = [];
			var dataStar1 = [];
			var dataStar2 = [];
			var dataStar3 = [];
			var dataStar4 = [];
			var alltableData = {};
			var tableData = [];
			if(ret == 200) {
				angular.forEach(jdata.data.all, function(e, i) {
					var sum = e.zeroSum + e.oneSum + e.twoSum + e.threeSum + e.fourSum;
					mycategories.push(e.name);
					//给0颗星的值
					var start0 = {};
					start0.y = e.zeroSum;
					start0.num = e.zeroSum;
					start0.count = sum;
					dataStar0.push(start0);

					//给1颗星的值
					var start1 = {};
					start1.y = e.oneSum;
					start1.num = e.oneSum;
					start1.count = sum;
					dataStar1.push(start1);

					//给2颗星的值
					var start2 = {};
					start2.y = e.twoSum;
					start2.num = e.twoSum;
					start2.count = sum;
					dataStar2.push(start2);

					///给3颗星的值
					var start3 = {};
					start3.y = e.threeSum;
					start3.num = e.threeSum;
					start3.count = sum;
					dataStar3.push(start3);
					
					///给4颗星的值
					var start4 = {};
					start4.y = e.fourSum;
					start4.num = e.fourSum;
					start4.count = sum;
					dataStar4.push(start4);

					var tableDataJson = {};
					tableDataJson.id = e.id;
					tableDataJson.name = e.name

					tableDataJson.Apeople = e.zeroSum;
					tableDataJson.Bpeople = e.oneSum;
					tableDataJson.Cpeople = e.twoSum;
					tableDataJson.Dpeople = e.threeSum;
					tableDataJson.Epeople = e.fourSum;
					tableDataJson.Aratio = Math.round(e.zeroSum / sum * 100) + '%';
					tableDataJson.Bratio = Math.round(e.oneSum / sum * 100) + '%';
					tableDataJson.Cratio = Math.round(e.twoSum / sum * 100) + '%';
					tableDataJson.Dratio = Math.round(e.threeSum / sum * 100) + '%';
					tableDataJson.Eratio = Math.round(e.fourSum / sum * 100) + '%';
					if(type == "4") {
						tableDataJson.group = 'class';
					}
					console.log("tableDataJson====" + tableDataJson + "tableDataJson.group====" + tableDataJson.group)
					tableData.push(tableDataJson);
					//年级列表需要添加标志
					if(type == "4") {
						//添加班级列表项
						angular.forEach(e.classes, function(ee, j) {
							var sum2 = ee.zeroSum + ee.oneSum + ee.twoSum + ee.threeSum+ ee.fourSum;
							var tableDataJson2 = {};
							tableDataJson2.id = ee.id;
							tableDataJson2.name = ee.name
							tableDataJson2.Apeople = ee.zeroSum;
							tableDataJson2.Bpeople = ee.oneSum;
							tableDataJson2.Cpeople = ee.twoSum;
							tableDataJson2.Dpeople = ee.threeSum;
							tableDataJson2.Epeople = ee.fourSum;
							tableDataJson2.Aratio = Math.round(ee.zeroSum / sum2 * 100) + '%';
							tableDataJson2.Bratio = Math.round(ee.oneSum / sum2 * 100) + '%';
							tableDataJson2.Cratio = Math.round(ee.twoSum / sum2 * 100) + '%';
							tableDataJson2.Dratio = Math.round(ee.threeSum / sum2 * 100) + '%';
							tableDataJson2.Eratio = Math.round(ee.fourSum / sum2 * 100) + '%';
							tableData.push(tableDataJson2);
						});
					}

				});
				console.log(mycategories);
				$scope.chart_column_stack_data.categories = mycategories;

				dataStarJson0.name = "0颗星";
				dataStarJson0.color = "#48bd7e";
				dataStarJson0.level = 1;
				dataStarJson0.data = dataStar0;

				dataStarJson1.name = "1颗星";
				dataStarJson1.color = "#46a2d2";
				dataStarJson1.level = 2;
				dataStarJson1.data = dataStar1;

				dataStarJson2.name = "2颗星";
				dataStarJson2.color = "#f4b242";
				dataStarJson2.level = 3;
				dataStarJson2.data = dataStar2;

				dataStarJson3.name = "3颗星";
				dataStarJson3.color = "#f46765";
				dataStarJson3.level = 4;
				dataStarJson3.data = dataStar3;
				
				dataStarJson4.name = "4颗星";
				dataStarJson4.color = "#c67df0";
				dataStarJson4.level = 5;
				dataStarJson4.data = dataStar4;



				dataAll.push(dataStarJson4);
				dataAll.push(dataStarJson3);
				dataAll.push(dataStarJson2);
				dataAll.push(dataStarJson1);
				dataAll.push(dataStarJson0);
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