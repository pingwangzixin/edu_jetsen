app.controller('guidanceStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
	$scope.month = [];
	$scope.top = [];
	$scope.all = [];
	//模拟数据
	$scope.variablePacket = {
		state: 0,
		school: true,
		statesType: 0,
		addtype: 1,
		tablearea: '',
		provincenav: false,
		citynav: false,
		countynav: false,
		schoolnav: false,
		stateType: 0,
		stateChart: 0,
		btnName: "按省份",
		guidanceArea: true,
		guidannavlist: [],
		activeid: "",
		linetitle: "",
		tabledata: [],
		gradeNames: [],
		gradeTotals: [],
		subjectNames: [],
		subjectTotals: [],
		schoolName: '',
		schoolYear: [],
		id: '0',
		type: '0',
		quanguo: true
	};

	$scope.variablePacket.activeid = $stateParams.activeid;

	$scope.variablePacket.tablearea = "全国";

	//从接口中获取学年
	$scope.year = '';
	$.ajax({
		type: "get",
		url: jeucIp + "ea/office/getStuYearList",
		async: false,
		success: function(jdata) {
			if(jdata.ret == 200) {
				$scope.variablePacket.schoolYear = jdata.data;
				$scope.year = jdata.data[0].id;
				console.log($scope.year);
			}
		}
	});

	//切换选项卡
	$scope.changestate = function(n) {
		$scope.variablePacket.stateType = n;
	};

	$scope.changeChartstate = function(n) {
		$scope.variablePacket.stateChart = n;

		$timeout(function() {
			$scope.changeZheline();
			$scope.changeGradeColumn();
			$scope.changeSubjectColum();
		}, 500)

	}

	$scope.breadNav = function(type, id, name) {
		$scope.variablePacket.id = id;
		$scope.variablePacket.type = type;
		if(type == '0') {
			typeHomework = 0;
			if($stateParams.state == "zuoye") {
				findHomeworkData("1", $scope.year);
			} else {
				findData($scope.year, id, type);
			}
			$scope.quanguodata();
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按省份";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "china") {
			typeHomework = 1;
			if($stateParams.state == "zuoye") {
				findHomeworkData(id, $scope.year);
			} else {
				findData($scope.year, id, type);
			}
			$scope.shengdata();
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按城市";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "province") {
			typeHomework = 2;
			if($stateParams.state == "zuoye") {
				findHomeworkData(id, $scope.year);
			} else {
				findData($scope.year, id, type);
			}
			$scope.shidata();
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按区县";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "city") {
			typeHomework = 3;
			if($stateParams.state == "zuoye") {
				findHomeworkData(id, $scope.year);
			} else {
				findData($scope.year, id, type);
			}
			$scope.quxiandata();
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按学校";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else {
			typeHomework = 4;
			return false;
		}
		//标题名字
		$scope.variablePacket.tablearea = name;
		$scope.variablePacket.guidanceArea = true;
	}

	//点击省、市、区、县
	$scope.findCityCount = function(n, type, name) {
		typeHomework = 1;
		$scope.variablePacket.id = n;
		$scope.variablePacket.type = type;
		//表头的省市区县名字
		$scope.variablePacket.tablearea = name;
		if(type == "china") {
			if($stateParams.state == "zuoye") {
				findHomeworkData(n, $scope.year);
			} else {
				findData($scope.year, n, type);
			}
			$scope.shengdata(); //获取省的数据
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = name; //面包屑导航显示的名字
			$scope.variablePacket.provinceId = n;
			$scope.variablePacket.btnName = "按城市";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "province") {
			if($stateParams.state == "zuoye") {
				findHomeworkData(n, $scope.year);
			} else {
				findData($scope.year, n, type);
			}
			$scope.shidata(); //获取市的数据
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = name; //面包屑导航显示的名字
			$scope.variablePacket.cityId = n;
			$scope.variablePacket.btnName = "按区县";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "city") {
			if($stateParams.state == "zuoye") {
				findHomeworkData(n, $scope.year);
			} else {
				findData($scope.year, n, type);
			}
			$scope.quxiandata(); //获取区县的数据
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = name; //面包屑导航显示的名字
			$scope.variablePacket.countyId = n;
			$scope.variablePacket.btnName = "按学校";
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		} else if(type == "county") {
			typeHomework = 4;
			if($stateParams.state == "zuoye") {
				findHomeworkData(n, $scope.year);
			} else {
				findData($scope.year, n, type);
			}
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.guidanceArea = false;
			$scope.xuexiaodata(); //获取学校的数据
			//面包屑导航显示的名字
			$scope.variablePacket.schoolname = name;
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		}

	}

	//全国的数据
	$scope.quanguodata = function() {
		$scope.variablePacket.tabledata = {
			"name": "全国",
			"type": "china",
			"id": 1,
			"jiaoyan": [{
				"name": "导学量",
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

	$scope.quanguodata();

	$scope.shengdata = function() {
		$scope.variablePacket.tabledata = {
			"name": "黑龙江",
			"type": "province",
			"id": 2,
			"jiaoyan": [{
				"name": "导学量",
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
				"name": "导学量",
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
				"name": "导学量",
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
				"name": "导学量",
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

	//	$timeout(function() {	
	//		$scope.changeZheline();
	//		$scope.changeGradeColumn();
	//		$scope.changeSubjectColum();
	//	}, 500)

	//改变年级柱状图
	$scope.changeGradeColumn = function() {
		var chart_column_02 = {
			"categories": $scope.variablePacket.gradeNames,
			"ytitle": "次",
			"totalName": "",
			"units": "",
			"min": "",
			"data": $scope.variablePacket.gradeTotals
		};
		chart_column_base('#containerChart1', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
	}

	//改变学科柱状图
	$scope.changeSubjectColum = function() {
		var chart_column_02 = {
			"categories": $scope.variablePacket.subjectNames,
			"ytitle": "次",
			"totalName": "",
			"units": "",
			"min": "",
			"data": $scope.variablePacket.subjectTotals
		};
		chart_column_base('#containerChart2', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
	}

	//折线图
	$scope.changeZheline = function() {
		jiaoyandata = $scope.variablePacket.tabledata.jiaoyan
		var chart_zhexian = {
			"title": "",
			"categories": ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
			"ytitle": "份数",
			"totalName": "",
			"units": "",
			"min": "",
			"data": jiaoyandata
		};
		chart_line_tech('#containerChart3', chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, chart_zhexian.min, true, false, false);
	};
	var typeHomework = 0;
	if($stateParams.state == "daoxue") {
		$scope.variablePacket.linetitle = "导学量";
	} else if($stateParams.state == "ketang") {
		$scope.variablePacket.linetitle = "课堂量";
		//循环显示学年的月份
		$scope.monthSort = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
		//如果用户进来的有角色时，需按角色查询显示//session中scope的值：1234代表省市区校，0代表全国
		var session_Obj = JSON.parse(sessionStorage.getItem("managerSearch"));
		var session_scope = session_Obj.scope;
		if(session_scope == 1) {
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.provinceId, 'china', session_Obj.provinceName);
		} else if(session_scope == 2) {
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.cityId, 'province', session_Obj.cityName);
		} else if(session_scope == 3) {
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.countyId, 'city', session_Obj.countyName);
		} else if(session_scope == 4) {
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.officeId, 'county', session_Obj.officeName);
		} else {
			findData($scope.year, '0', '0');
		}
	} else if($stateParams.state == "zuoye") {
		$scope.variablePacket.linetitle = "作业量";
		//如果用户进来的有角色时，需按角色查询显示//session中scope的值：1234代表省市区校，0代表全国
		var session_Obj = JSON.parse(sessionStorage.getItem("managerSearch"));
		var session_scope = session_Obj.scope;
		if(session_scope == 1) {
			typeHomework = 1;
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.provinceId, 'china', session_Obj.provinceName);
		} else if(session_scope == 2) {
			typeHomework = 2;
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.cityId, 'province', session_Obj.cityName);
		} else if(session_scope == 3) {
			typeHomework = 3;
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.countyId, 'city', session_Obj.countyName);
		} else if(session_scope == 4) {
			typeHomework = 4;
			$scope.variablePacket.quanguo = false;
			$scope.findCityCount(session_Obj.officeId, 'county', session_Obj.officeName);
		} else {
			findHomeworkData("1", $scope.year);
		}
	}

	//查询作业全国数据
	function findHomeworkData(areaId, year, type) {
		$http.get(interfaceIpAddr + 'homework/monthHomework/' + areaId + '/' + year).success(function(jdata) {
			console.log(jdata);
			//月份统计数据
			var myMonthCount = [];
			angular.forEach(jdata.one, function(e, i) {
				myMonthCount.push(e.count);
			});
			var monthData = [{
				"name": "作业次数",
				"data": myMonthCount
			}];
			$scope.variablePacket.tabledata.jiaoyan = monthData;

			var teacherCount = [];
			angular.forEach(jdata.four, function(e, i) {
				if(e.count != 0) {
					var teaInfo = {};
					teaInfo.guidance = e.count;
					teaInfo.school = e.areaName;
					teaInfo.name = e.teacherName;
					teaInfo.id = e.teacherId;
					teacherCount.push(teaInfo);

				}
			});
			$scope.variablePacket.tabledata.roleguidance = teacherCount;

			//如果type == 'county'以学校id查询学校里的年级和学科
			if(typeHomework != 4) {
				var cityCount = [];
				angular.forEach(jdata.two, function(e, i) {
					if(e.count != 0) {
						var cityInfo = {};
						cityInfo.id = e.areaId;
						cityInfo.name = e.areaName;
						cityInfo.totle = e.count;
						cityCount.push(cityInfo);

					}
				});
			}else{
				var cityCount = [];
				angular.forEach(jdata.four, function(e, i) {
					if(e.count != 0) {
						var cityInfo = {};
						cityInfo.id = e.teacherId;
						cityInfo.name = e.teacherName;
						cityInfo.totle = e.count;
						cityCount.push(cityInfo);

					}
				});
			}
			if(typeHomework == 4) {
				//点击学校加载年级
				var gradeAllNames = [];
				angular.forEach(jdata.two, function(e, i) {
					if(e.count != 0) {
						gradeAllNames.push(e.gradeName);
					}
				});

				$scope.gradeAll = gradeAllNames;

				var gradeNames = [];
				var gradeCounts = [];
				angular.forEach(jdata.two, function(e, i) {
					if(e.count != 0) {
						gradeNames.push(e.gradeName);
						gradeCounts.push(e.count);
					}
				});
				var gradeDataAll = [];
				var gradeCountsData = {};
				gradeCountsData.name = '作业次数';
				gradeCountsData.data = gradeCounts;
				gradeDataAll.push(gradeCountsData);
				$scope.variablePacket.gradeNames = gradeNames;
				$scope.variablePacket.gradeTotals = gradeDataAll;
				//学科
				var subjectNames = [];
				var subjectCounts = [];
				angular.forEach(jdata.three, function(e, i) {
					if(e.count != 0) {
						subjectNames.push(e.subjectName);
						subjectCounts.push(e.count);
					}
				});
				var subjectDataAll = [];
				var subjectCountsData = {};
				subjectCountsData.name = '作业次数';
				subjectCountsData.data = subjectCounts;
				subjectDataAll.push(subjectCountsData);
				$scope.variablePacket.subjectNames = subjectNames;
				$scope.variablePacket.subjectTotals = subjectDataAll;

				//top数据
				$scope.variablePacket.tabledata.quyu = cityCount;
			} else {
				//	     		$scope.variablePacket.tabledata.type=jdata.data.type;     		
				$scope.variablePacket.tabledata.quyu = cityCount;

			}
			//求统计数据的总量
			$scope.variablePacket.lessonSum = sumArr(cityCount);
			$scope.changeZheline();
			$scope.changeGradeColumn();
			$scope.changeSubjectColum();
		})
	}
	//查询课堂全国的数据
	function findData(schoolYear, id, type) {
		$http.get(interfaceIpAddr + 'lesson/all?schoolYear=' + schoolYear + "&id=" + id + "&type=" + type).success(function(jdata) {
			$scope.month = jdata.data.month;
			console.log($scope.month);
			//月份统计数据
			var myMonthCount = [];
			angular.forEach($scope.monthSort, function(e, i) {
				var flag = 0;
				angular.forEach($scope.month, function(ee, ii) {
					if(e == ee.monthDay) {
						myMonthCount.push(ee.count);
						flag = 1;
					}
				});
				if(flag == 0)
					myMonthCount.push(0);
			});

			//给月统计折线图赋值
			var monthData = [{
				"name": "课堂次数",
				"data": myMonthCount
			}];
			console.log(monthData)
			$scope.variablePacket.tabledata.jiaoyan = monthData;
			$scope.variablePacket.tabledata.roleguidance = jdata.data.top;
			console.log(jdata.data.top);
			//如果type == 'county'以学校id查询学校里的年级和学科
			if(type == 'county') {
				findAllGreadBySchoolId(id, jdata.data.grade);
				findAllSubjectBySchoolId(id, jdata.data.subject);
				//top数据
				$scope.variablePacket.tabledata.quyu = jdata.data.all;
				console.log(jdata.data.all);
			} else {
				$scope.variablePacket.tabledata.type = jdata.data.type;
				$scope.variablePacket.tabledata.quyu = jdata.data.all;
				console.log(jdata.data.type);
				console.log(jdata.data.all);
			}
			//求统计数据的总量
			$scope.variablePacket.lessonSum = sumArr(jdata.data.all);
			console.log(sumArr(jdata.data.all));
			$timeout(function() {
				$scope.changeZheline();
				$scope.changeGradeColumn();
				$scope.changeSubjectColum();
			}, 500)
		});
	}

	//求数据的总数
	function sumArr(allArr) {
		var total = 0;
		angular.forEach(allArr, function(e, i) {
			total += e.totle;
		});
		return total;
	}

	//根据学校id查询学校下所有的年级列表
	function findAllGreadBySchoolId(schoolId, gradeData) {
		$http.get(jeucIp + 'ea/eaGrade?officeId=' + schoolId).success(function(jdata) {
			var gradeAllNames = [];
			if(jdata.ret == 200) {
				angular.forEach(jdata.data, function(e, i) {
					gradeAllNames.push(e.gradeName);
				});
			}
			$scope.gradeAll = gradeAllNames;

			var gradeNames = [];
			var gradeCounts = [];
			if(jdata.ret == 200) {
				if(jdata.data != '') {
					angular.forEach(jdata.data, function(e, i) {
						gradeNames.push(e.gradeName);
						var flag = 0;
						angular.forEach(gradeData, function(ee, ii) {
							if(e.gradeName == ee.grade) {
								gradeCounts.push(ee.count);
								flag = 1;
							}
						});
						if(flag == 0)
							gradeCounts.push(0);
					});
				}
			}
			if(gradeNames == '' || gradeCounts == '') {
				angular.forEach(gradeData, function(ee, ii) {
					gradeCounts.push(ee.count);
					gradeNames.push(ee.grade);
				});
			}
			var gradeDataAll = [];
			var gradeCountsData = {};
			gradeCountsData.name = '课堂次数';
			gradeCountsData.data = gradeCounts;
			gradeDataAll.push(gradeCountsData);
			console.log(gradeDataAll)
			$scope.variablePacket.gradeNames = gradeNames;
			$scope.variablePacket.gradeTotals = gradeDataAll;
		});
	}

	//根据学校id查询学校下所有的课程列表
	function findAllSubjectBySchoolId(schoolId, subjectData) {
		$http.get(jeucIp + 'edu/eduSubject?officeId=' + schoolId).success(function(jdata) {
			var subjectNames = [];
			var subjectCounts = [];
			if(jdata.ret == 200) {
				if(jdata.data != '') {
					angular.forEach(jdata.data, function(e, i) {
						subjectNames.push(e.name);
						var flag = 0;
						angular.forEach(subjectData, function(ee, ii) {
							if(e.name == ee.subject) {
								subjectCounts.push(ee.count);
								flag = 1;
							}
						});
						if(flag == 0)
							subjectCounts.push(0);
					});
				}
			}
			if(subjectNames == '' || subjectCounts == '') {
				angular.forEach(subjectData, function(ee, ii) {
					subjectCounts.push(ee.count);
					subjectNames.push(ee.subject);
				});
			}
			var subjectDataAll = [];
			var subjectCountsData = {};
			subjectCountsData.name = '课堂次数';
			subjectCountsData.data = subjectCounts;
			subjectDataAll.push(subjectCountsData);
			console.log("===yyyyy=====" + subjectDataAll);
			$scope.variablePacket.subjectNames = subjectNames;
			$scope.variablePacket.subjectTotals = subjectDataAll;
		});
	}

	//切换学年时数据重新加载
	$scope.selectChange = function(n) {
		if($stateParams.state == "ketang") {
			findData($scope.year, $scope.variablePacket.id, $scope.variablePacket.type);

		} else if($stateParams.state == "zuoye") {
			findHomeworkData($scope.variablePacket.id, $scope.year);
		}
	}
}]);