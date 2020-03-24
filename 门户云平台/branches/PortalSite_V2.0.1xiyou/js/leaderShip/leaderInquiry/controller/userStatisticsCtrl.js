app.controller('userStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = managerSearch.scope;
	if(scope==0){
		$scope.requestParam =1;
	}
	if(scope==1){
		$scope.requestParam =managerSearch.provinceId ;
		$scope.breadNavCode1 = managerSearch.provinceId;
		$scope.breadNavName1 = managerSearch.provinceName;
	}
	if(scope==2){
		$scope.requestParam = managerSearch.cityId;
		$scope.breadNavCode2 = managerSearch.cityId;
		$scope.breadNavName2 = managerSearch.cityName;
	}
	if(scope==3){
		$scope.requestParam =managerSearch.countyId;
		$scope.breadNavCode3 = managerSearch.countyId;
		$scope.breadNavName3 = managerSearch.countyName;
	}
	if(scope==4){
		$scope.requestParam =managerSearch.officeId;
	}
	//模拟数据
	$scope.variablePacket = {
		state: 0,
		school: true,
		addtype: 1,
		allusernum: 9999,
		activeall: '65%',
		teachnum: 6666,
		teachactive: '87%',
		stunum: 2222,
		stuactive: "63%",
		parnum: 1234,
		paractive: '73%',
		nianjiselect: true,
		xuekeselect: true,
		userrange: [], //用户类型
		nianjirange: [], //循环年级数据
		xuekerange: [], //循环学科数据
		tabledata: [], //表格循环的数据
		tablearea: "全国",
		twoclos: "注册率",
		rowone: "注册数",
		rowtwo: "实际数",
		schooldata: true, //是否显示学校
		addusertype: 1, //默认选老师
		oneuserth: "姓名",
		twouserth: "注册时间",
		threeuserth: "最后登录时间",
		fouruserth: "总登录次数(次)",
		fiveuserth: "总在线时长(小时)",
		userregdata: [],
		subjecthide: true,
		nianjiallselect: true,
		nianjitype: false,
		xuekeallselect: true, //是否显示学科
		provincenav: false,
		citynav: false,
		countynav: false,
		schoolnav: false,
		showschooldata:false,
	};

	var linedata;

	//切换注册率统计查看表格数据
	$scope.changestate = function(n) {
		$scope.statisticsType = n;
		if(n == 0) {
			$scope.variablePacket.twoclos = "注册率";
			$scope.variablePacket.rowone = "注册数";
			$scope.variablePacket.rowtwo = "实际数";
			
		} else if(n == 1) {
			$scope.variablePacket.twoclos = "周活率";
			$scope.variablePacket.rowtwo = "活跃数";
			$scope.variablePacket.rowone = "注册数";
		}
		$scope.breadNav(scope);//TODO
		$scope.variablePacket.state = n;
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
		$scope.variablePacket.showschooldata=false;
	}

	$scope.variablePacket.userregdata = []

	//用户类型切换表格填充
	$scope.changeUseraddtype = function(index) {
		$scope.variablePacket.addusertype = $scope.variablePacket.userrange[index].id;
		$scope.nianjiall();
		$scope.xuekeall();
		//教师的时候
		if(index == 0) {
			$scope.userType = "1";
			$scope.variablePacket.subjecthide = true;
			$scope.variablePacket.oneuserth = "姓名";
			$scope.variablePacket.twouserth = "注册时间";
			$scope.variablePacket.threeuserth = "最后登录时间";
			$scope.variablePacket.fouruserth = "总登录次数(次)";
			$scope.variablePacket.fiveuserth = "总在线时长(小时)";
			$scope.variablePacket.userregdata = []
			$http.get(interfaceIpAddr+"/register/activeState/1?officeId="+$scope.officeId).success(function(data){
				if(data.ret==200){
					var result = data.data;
					$scope.variablePacket.userregdata = [];
					angular.forEach(result,function(obj,index){
						var userData = {};
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = obj.registerDate;
						userData.threeusertd = obj.loginDate;
						userData.fourusertd= obj.loginCount;
						userData.fiveusertd = obj.onlineTime;
						$scope.variablePacket.userregdata.push(userData);
					})
				}
			})
		} else if(index == 1) {
			$scope.userType = "2";
			//学生的时候
			$scope.variablePacket.subjecthide = false;
			$scope.variablePacket.oneuserth = "班级";
			$scope.variablePacket.twouserth = "注册学生人数";
			$scope.variablePacket.threeuserth = "学生周活率";
			$scope.variablePacket.fouruserth = "总在线时长(小时)";
			$scope.variablePacket.fiveuserth = "人均在线时长(小时)";
			$scope.variablePacket.userregdata = []
			$http.get(interfaceIpAddr+"/register/activeState/2?officeId="+$scope.officeId).success(function(data){
				if(data.ret==200){
					var result = data.data;
					$scope.variablePacket.userregdata = [];
					angular.forEach(result,function(obj,index){
						var userData = {};
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = obj.registerDate;
						userData.threeusertd = obj.loginDate;
						userData.fourusertd= obj.loginCount;
						userData.fiveusertd = obj.onlineTime;
						$scope.variablePacket.userregdata.push(userData);
					})
				}
			})
		} else if(index == 2) {
			$scope.userType = "3";
			//家长的时候
			$scope.variablePacket.subjecthide = false;
			$scope.variablePacket.oneuserth = "班级";
			$scope.variablePacket.twouserth = "注册家长人数";
			$scope.variablePacket.threeuserth = "家长周活率";
			$scope.variablePacket.fouruserth = "总在线时长(小时)";
			$scope.variablePacket.fiveuserth = "人均在线时长(小时)";
			$scope.variablePacket.userregdata = []
			$http.get(interfaceIpAddr+"/register/activeState/3?officeId="+$scope.officeId).success(function(data){
				if(data.ret==200){
					var result = data.data;
					$scope.variablePacket.userregdata = [];
					angular.forEach(result,function(obj,index){
						var userData = {};
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = obj.registerDate;
						userData.threeusertd = obj.loginDate;
						userData.fourusertd= obj.loginCount;
						userData.fiveusertd = obj.onlineTime;
						$scope.variablePacket.userregdata.push(userData);
					})
				}
			})
		}
	}
	//切换年级
	$scope.changenianji = function(index,gradeId) {
		$scope.gradeId = gradeId; 
		//根据年级查询学科并修改学科筛选栏数据
		$http.get(jeucIp+"/edu/eduSubject/findSubjectByGradeId?gradeId="+gradeId).success(function(data){
			if(data.ret==200){
				$scope.variablePacket.xuekerange = [];
				angular.forEach(data.data,function(data,index){
					var subjectObj = {};
					subjectObj.id = data.id;
					subjectObj.name = data.name;
					$scope.variablePacket.xuekerange.push(subjectObj);
				})
			}
		})
		$scope.variablePacket.nianjiallselect = false;
		$scope.variablePacket.nianjitype = $scope.variablePacket.nianjirange[index].id;
		$scope.variablePacket.userregdata = []
		$http.get(interfaceIpAddr+"/register/activeState/"+$scope.userType+"?officeId="+$scope.officeId+"&gradeId="+gradeId).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.userregdata = [];
				angular.forEach(result,function(obj,index){
					var userData = {};
					userData.id = obj.id;
					userData.oneusertd = obj.name;
					userData.twousertd = obj.registerDate;
					userData.threeusertd = obj.loginDate;
					userData.fourusertd= obj.loginCount;
					userData.fiveusertd = obj.onlineTime;
					$scope.variablePacket.userregdata.push(userData);
				})
			}
		})
	}
	//年级全部
	$scope.nianjiall = function() {
		$scope.variablePacket.nianjiallselect = true;
		$scope.variablePacket.nianjitype = false;
		$scope.variablePacket.userregdata = []
		
		$http.get(interfaceIpAddr+"/register/activeState/"+$scope.userType+"?officeId="+$scope.officeId).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.userregdata = [];
				angular.forEach(result,function(obj,index){
					var userData = {};
					userData.id = obj.id;
					userData.oneusertd = obj.name;
					userData.twousertd = obj.registerDate;
					userData.threeusertd = obj.loginDate;
					userData.fourusertd= obj.loginCount;
					userData.fiveusertd = obj.onlineTime;
					$scope.variablePacket.userregdata.push(userData);
				})
			}else{
				$scope.variablePacket.userregdata=[];
			}
		})
	}

	//用户类型
	$scope.variablePacket.userrange = [
		{"id": '1',"name": "教师"},
		{"id": '2',"name": "学生"},
		{"id": '3',"name": "家长"}
	]

	//循环年级数据
	$scope.variablePacket.nianjirange = []

	//循环学科数据
	$scope.variablePacket.xuekerange = [];

	$scope.changexueke = function(index,subjectId) {
		$scope.variablePacket.xuekeallselect = false;
		$scope.variablePacket.xueketype = $scope.variablePacket.xuekerange[index].id;
		$scope.variablePacket.userregdata = []
		var officeId = $scope.officeId;
		var userType = $scope.userType;
		var gradeId = $scope.gradeId;
		url = userType+"?officeId="+officeId;
		if(gradeId!=undefined){
			url = url+"&gradeId="+gradeId;
		}
		url = url+"&subjectId="+subjectId;
		$http.get(interfaceIpAddr+"/register/activeState/"+url).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.userregdata = [];
				angular.forEach(result,function(obj,index){
					var userData = {};
					userData.id = obj.id;
					userData.oneusertd = obj.name;
					userData.twousertd = obj.registerDate;
					userData.threeusertd = obj.loginDate;
					userData.fourusertd= obj.loginCount;
					userData.fiveusertd = obj.onlineTime;
					$scope.variablePacket.userregdata.push(userData);
				})
			}else{
				$scope.variablePacket.userregdata=[];
			}
		})

	}
	//学科全部
	$scope.xuekeall = function() {
		$scope.variablePacket.xuekeallselect = true;
		$scope.variablePacket.xueketype = false;
		$scope.variablePacket.userregdata = []
		url = "";
		if($scope.gradeId!=undefined){
			url = "&gradeId="+$scope.gradeId;
		}
		$http.get(interfaceIpAddr+"/register/activeState/1?officeId="+$scope.officeId+url).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.userregdata = [];
				angular.forEach(result,function(obj,index){
					var userData = {};
					userData.id = obj.id;
					userData.oneusertd = obj.name;
					userData.twousertd = obj.registerDate;
					userData.threeusertd = obj.loginDate;
					userData.fourusertd= obj.loginCount;
					userData.fiveusertd = obj.onlineTime;
					$scope.variablePacket.userregdata.push(userData);
				})
			}else{
				$scope.variablePacket.userregdata = []
			}
			
		})
	}

	//点击省、市、区、县
	$scope.findCityCount = function(n, name,type) {
 		if(type == "china") {
			$scope.breadNavCode1 = n;
			$scope.breadNavName1 = name;
			$scope.shengdata(n,name); //获取省的数据
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
		} else if(type == "province") {
			$scope.breadNavCode2 = n;
			$scope.breadNavName2 = name;
			$scope.shidata(n,name); //获取市的数据
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
		} else if(type == "city") {
			$scope.breadNavCode3 = n;
			$scope.breadNavName3 = name;
			$scope.quxiandata(n,name); //获取区县的数据
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = $scope.variablePacket.tabledata.name; //面包屑导航显示的名字
			
			$scope.variablePacket.showschooldata=true;
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
		} else if(type == "county") {
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.xuexiaodata(n,name); //获取学校的数据
			
			
			//面包屑导航显示的名字
			$scope.variablePacket.schoolname = $scope.variablePacket.tabledata.name;
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
		}

		//表头的省市区县名字
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;

	}

	$scope.breadNav = function(type) {
		if(type<scope){
			return;
		}
		if(type == 0) {
			$scope.quanguodata(1);
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata=false;
		} else if(type == 1) {
			$scope.shengdata($scope.breadNavCode2,$scope.breadNavName2);
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata=false;
		} else if(type == 2) {
			$scope.shidata($scope.breadNavCode2,$scope.breadNavName2);
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata=false;
		} else if(type == 3) {
			$scope.quxiandata($scope.breadNavCode3,$scope.breadNavName3);
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata=true;
		}
		//标题名字
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
		$timeout(function() {
				$scope.changeZheline();
			}, 500)
	}

	//全国的数据
	$scope.quanguodata = function(areaId) {
		$scope.areaId = "1";
		$scope.variablePacket.tabledata = {
			"name": "全国",
			"type": "china",
			"id": 1,
			"activeall": "65",
			"allusernum": 999999,
			"teachnum": 66666,
			"teachactive": "80%",
			"stunum": 222222,
			"stuactive": "30%",
			"parnum": 12345,
			"paractive": "68",
			"linedata":[],
			"quyu": []
		};
		//获取全国注册总人数和教师、学生、家长的活跃度
		
		$http.get(interfaceIpAddr+"/register/area/1").success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.allusernum = result.totalRegisterNo;
				$scope.variablePacket.activeall = result.totalWeekActiveRate;
				$scope.variablePacket.teachnum = result.teaRegisterNo;
				$scope.variablePacket.teachactive = result.teaWeekActiveRate;
				$scope.variablePacket.stunum = result.stuRegisterNo;
				$scope.variablePacket.stuactive = result.stuWeekActiveRate;
				$scope.variablePacket.parnum = result.parentRegisterNo
				$scope.variablePacket.paractive = result.parentWeekActiveRate;
			}
		});
		
		$http.get(interfaceIpAddr+"/register/area/activeRate/1").success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.tabledata.categories = result.categories;
				var teaActiveList = result.teaActiveList;
				var teaData = [];
				angular.forEach(teaActiveList,function(obj,index){
					var teaActiveData = {};
					teaActiveData.y = obj;
					teaData.push(teaActiveData);
				})
				var stuActiveList = result.stuActiveList;
				var stuData = [];
				angular.forEach(stuActiveList,function(obj,index){
					var stuActiveData = {};
					stuActiveData.y = obj;
					stuData.push(stuActiveData);
				})
				var parentActiveList = result.parentActiveList;
				var parentData = [];
				angular.forEach(parentActiveList,function(obj,index){
					var parentActiveData = {};
					parentActiveData.y = obj;
					parentData.push(parentActiveData);
				})
				var tea = {};
				tea.name = "教师";
				tea.data = teaData;
				$scope.variablePacket.tabledata.linedata.push(tea);
				var stu = {};
				stu.name = "学生";
				stu.data = stuData;
				$scope.variablePacket.tabledata.linedata.push(stu);
				var parent = {};
				parent.name = "家长";
				parent.data = parentData;
				$scope.variablePacket.tabledata.linedata.push(parent);
			}
		})
		
		
		$http.get(interfaceIpAddr+"/register/rate/1").success(function(data){
			if(data.ret==200){
				var result = data.data;
				var quanguoData = [];
				angular.forEach(result,function(obj,index){
					var objData ={};
					objData.id = obj.areaId;
					objData.name = obj.areaName;
					var regcount = [];
					var regObj ={};
					regObj.schoolRegNum = obj.schoolRegisterNo;
					regObj.schoolRegRate = "--";
					regObj.teaRegNum = obj.teaRegisterNo;
					regObj.teaRegRate = obj.teaRegisterRate;
					regObj.stuRegNum = obj.stuRegisterNo;
					regObj.stuRegRate = obj.stuRegisterRate;
					regObj.parRegNum = obj.parentRegisterNo;
					regObj.parRegRate = "--";
					regcount.push(regObj);
					var amountObj = {};
					amountObj.schoolRealNum = "--";
					amountObj.schoolRegRate = "--";
					amountObj.teaRegNum = obj.teaAmountNo;
					amountObj.teaRegRate = obj.teaRegisterRate;
					amountObj.stuRealNum = obj.stuAmountNo;
					amountObj.stuRegRate = obj.stuRegisterRate;
					amountObj.parRealNum = "--";
					amountObj.parRegRate = "--";
					regcount.push(amountObj);
					objData.regcount=regcount;
					quanguoData.push(objData);
				})
				$scope.variablePacket.tabledata.quyu = quanguoData;
			}
		})
	};

//	$scope.quanguodata();
	if(scope==0){
		$scope.requestParam =1 ;
		$scope.quanguodata();
	}
	if(scope==1){
		$scope.requestParam =managerSearch.provinceId ;
		$http.get(jeucIp+"ea/area/"+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.shengdata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==2){
		$scope.requestParam =managerSearch.cityId;
		$http.get(jeucIp+"ea/area/"+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.shidata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==3){
		$scope.requestParam =managerSearch.countyId;
		$http.get(jeucIp+"/ea/area/"+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.quxiandata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==4){
		$scope.requestParam =managerSearch.officeId;
		$http.get(jeucIp+"/ea/office/"+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.xuexiaodata($scope.requestParam,data.data.name);
			}
		})
	}

	$scope.shengdata = function(code,name) {
		$scope.areaId = code;
		$scope.areaName = name;
		$scope.variablePacket.tabledata = {
			"name": name,
			"type": "province",
			"id": 2,
			"activeall": "65",
			"allusernum": 13567,
			"teachnum": 456787,
			"teachactive": "80%",
			"stunum": 145767,
			"stuactive": "30%",
			"parnum": 1234,
			"paractive": "68",
			"linedata": [],
			"quyu": []
		};
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = false;
		$scope.variablePacket.countynav = false;
		$scope.variablePacket.schoolnav = false;
		
		$scope.variablePacket.tablearea = name;
		$scope.getUserRegisterDataByAreaId(code);
		//获取用户周活跃率折线图数据
		$scope.getUserActiveRateTrend(code);
		
		$scope.getAreaRegisterDataList(code);
	};

	//市数据
	$scope.shidata = function(code,name) {
		$scope.areaId = code;
		$scope.areaName = name;
		$scope.variablePacket.tabledata = {
			"name": name,
			"type": "city",
			"id": 21,
			"activeall": "65",
			"allusernum": 1245,
			"teachnum": 66666,
			"teachactive": "80%",
			"stunum": 2345,
			"stuactive": "30%",
			"parnum": 345,
			"paractive": "68",
			"linedata": [],
			"quyu": []
		};
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = name;
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = false;
		$scope.variablePacket.schoolnav = false;
		
		$scope.variablePacket.tablearea = name;
		
		$scope.getUserRegisterDataByAreaId(code);
		
		$scope.getUserActiveRateTrend(code);
		//获取平台用户注册率
		$scope.getAreaRegisterDataList(code);
	};

	//区县数据
	$scope.quxiandata = function(code,name) {
		$scope.areaId = code;
		$scope.name = name;
		$scope.variablePacket.tabledata = {
			"name": name,
			"type": "county",
			"id": 211,
			"activeall": "65",
			"allusernum": 2345,
			"teachnum": 1345,
			"teachactive": "80%",
			"stunum": 1245,
			"stuactive": "30%",
			"parnum": 1234,
			"paractive": "68",
			"linedata": [],
			"quyu": []
		};
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = managerSearch.cityName;
		$scope.variablePacket.countyname = name;
		
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = false;
		
		$scope.variablePacket.tablearea = name;
		
		$scope.getUserRegisterDataByAreaId(code);
		
		$scope.getUserActiveRateTrend(code);

		
		$http.get(interfaceIpAddr+"/register/rate/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				var quanguoData = [];
				angular.forEach(result,function(obj,index){
					var objData ={};
					objData.id = obj.officeId;
					objData.name = obj.officeName;
					var regcount = [];
					var regObj ={};
					regObj.teaRegNum = obj.teaRegisterNo;
					regObj.teaRegRate = obj.teaRegisterRate;
					
					regObj.stuRegNum = obj.stuRegisterNo;
					regObj.stuRealNum = obj.stuAmountNo;
					regObj.stuRegRate = obj.stuRegisterRate;
					
					regObj.parRegNum = obj.parentRegisterNo;
					regObj.parRealNum = obj.parentAmountNo;
					regObj.parRegRate = obj.parentRegisterRate;
					
					regcount.push(regObj);
					var amountObj = {};
					amountObj.teaRealNum = obj.teaAmountNo;
					amountObj.stuRealNum = obj.stuAmountNo;
					amountObj.parRealNum = "--";
					
					regcount.push(amountObj);
					objData.regcount=regcount;
					quanguoData.push(objData);
				})
				$scope.variablePacket.tabledata.quyu = quanguoData;
			}
		})
	};

	//学校的数据
	$scope.xuexiaodata = function(code,name) {
		$scope.variablePacket.schooldata = false;
		$scope.variablePacket.schoolnav = true;
		$scope.userType = "1";//默认用户类型是教师
		$scope.officeId = code;//保存学校编号，筛选查询需要此参数
		$scope.variablePacket.tabledata = {
			"name": name,
			"type": "school",
			"id": 211,
			"activeall": "65",
			"allusernum": 1234,
			"teachnum": 567,
			"teachactive": "80%",
			"stunum": 678,
			"stuactive": "30%",
			"parnum": 3453,
			"paractive": "68",
			"linedata": [
//				{
//					"name": "教师",
//					"class_id": 52,
//					"data": [{"y": 31},{"y": 22},{"y": 51},{"y": 31},{"y": 62},{"y": 82},{"y": 22}]
//				},
//				{
//					"name": "学生",
//					"class_id": 53,
//					"data": [{"y": 11},{"y": 72},{"y": 51},{"y": 91},{"y": 62},{"y": 62},{"y": 62}]
//				}, 
//				{
//					"name": "家长",
//					"class_id": 54,
//					"data": [{"y": 1},{"y": 32},{"y": 81},{"y": 19},{"y": 26},{"y": 32},{"y": 72}]
//				}
			]
		};
		
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = managerSearch.cityName;
		$scope.variablePacket.countyname = managerSearch.countyName;
		$scope.variablePacket.schoolname = managerSearch.officeName;
		
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = true;
		//根据学校编号查询年级列表
		$http.get(jeucIp+"/ea/grade/?officeId="+code).success(function(data){
			if(data.ret==200){
				angular.forEach(data.data,function(data,index){
					var gradeObj = {};
					gradeObj.id = data.id;
					gradeObj.name = data.name;
					$scope.variablePacket.nianjirange.push(gradeObj);
				})
			}
		})
		//根据学校查询学科列表
		$http.get(jeucIp+"/edu/eduSubject/findSubjectByOid?officeId="+code).success(function(data){
			if(data.ret==200){
				angular.forEach(data.data,function(data,index){
					var subjectObj = {};
					subjectObj.id = data.id;
					subjectObj.name = data.name;
					$scope.variablePacket.xuekerange.push(subjectObj);
				})
			}
		})
		
		$http.get(interfaceIpAddr+"/register/activeState/"+$scope.userType+"?officeId="+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.userregdata = [];
				angular.forEach(result,function(obj,index){
					var userData = {};
					userData.id = obj.id;
					userData.oneusertd = obj.name;
					userData.twousertd = obj.registerDate;
					userData.threeusertd = obj.loginDate;
					userData.fourusertd= obj.loginCount;
					userData.fiveusertd = obj.onlineTime;
					$scope.variablePacket.userregdata.push(userData);
				})
			}
			
		})
		$http.get(interfaceIpAddr+"/register/office/activeRate/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.tabledata.categories = result.categories;
				var teaActiveList = result.teaActiveList;
				var teaData = [];
				angular.forEach(teaActiveList,function(obj,index){
					var teaActiveData = {};
					teaActiveData.y = obj;
					teaData.push(teaActiveData);
				})
				var stuActiveList = result.stuActiveList;
				var stuData = [];
				angular.forEach(stuActiveList,function(obj,index){
					var stuActiveData = {};
					stuActiveData.y = obj;
					stuData.push(stuActiveData);
				})
				var parentActiveList = result.parentActiveList;
				var parentData = [];
				angular.forEach(parentActiveList,function(obj,index){
					var parentActiveData = {};
					parentActiveData.y = obj;
					parentData.push(parentActiveData);
				})
				var tea = {};
				tea.name = "教师";
				tea.data = teaData;
				$scope.variablePacket.tabledata.linedata.push(tea);
				var stu = {};
				stu.name = "学生";
				stu.data = stuData;
				$scope.variablePacket.tabledata.linedata.push(stu);
				var parent = {};
				parent.name = "家长";
				parent.data = parentData;
				$scope.variablePacket.tabledata.linedata.push(parent);
			}
		})
		$http.get(interfaceIpAddr+"/register/office/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.allusernum = result.totalRegisterNo;
				$scope.variablePacket.activeall = result.totalWeekActiveRate;
				$scope.variablePacket.teachnum = result.teaRegisterNo;
				$scope.variablePacket.teachactive = result.teaWeekActiveRate;
				$scope.variablePacket.stunum = result.stuRegisterNo;
				$scope.variablePacket.stuactive = result.stuWeekActiveRate;
				$scope.variablePacket.parnum = result.parentRegisterNo
				$scope.variablePacket.paractive = result.parentWeekActiveRate;
			}
		});
	}

	$timeout(function() {
		$scope.changeZheline();
	}, 1000)

	$scope.changeZheline = function() {

		linedata = $scope.variablePacket.tabledata.linedata;
		var chart_line_user_data = {
			"colors": ["#D48700", "#D01D32", "#4AA1CE"],
			"title": "",
//			"categories": ["11.13-11.19", "11.20-11.26", "11.27-12.03", "12.04-12.10", "12.11-12.17", "12.18-12.24", "12.25-12.31"],
			"categories":$scope.variablePacket.tabledata.categories,
			"ytitle": "活跃率",
			"data": linedata,
			"parallel": []
		};
		chart_line('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data);

	};
	
	
	//获取区域总注册人数、教师注册人数，学生注册人数、家长注册人数
	$scope.getUserRegisterDataByAreaId = function(code){
		$http.get(interfaceIpAddr+"/register/area/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.allusernum = result.totalRegisterNo;
				$scope.variablePacket.activeall = result.totalWeekActiveRate;
				
				$scope.variablePacket.teachnum = result.teaRegisterNo;
				$scope.variablePacket.teachactive = result.teaWeekActiveRate;
				
				$scope.variablePacket.stunum = result.stuRegisterNo;
				$scope.variablePacket.stuactive = result.stuWeekActiveRate;
				
				$scope.variablePacket.parnum = result.parentRegisterNo;
				$scope.variablePacket.paractive = result.parentWeekActiveRate;
			}
		});
	}
	
	
	//获取区域用户周活跃率折现图数据
	$scope.getUserActiveRateTrend = function(code){
		$http.get(interfaceIpAddr+"/register/area/activeRate/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				$scope.variablePacket.tabledata.categories = result.categories;
				var teaActiveList = result.teaActiveList;
				var teaData = [];
				angular.forEach(teaActiveList,function(obj,index){
					var teaActiveData = {};
					teaActiveData.y = obj;
					teaData.push(teaActiveData);
				})
				var stuActiveList = result.stuActiveList;
				var stuData = [];
				angular.forEach(stuActiveList,function(obj,index){
					var stuActiveData = {};
					stuActiveData.y = obj;
					stuData.push(stuActiveData);
				})
				var parentActiveList = result.parentActiveList;
				var parentData = [];
				angular.forEach(parentActiveList,function(obj,index){
					var parentActiveData = {};
					parentActiveData.y = obj;
					parentData.push(parentActiveData);
				})
				var tea = {};
				tea.name = "教师";
				tea.data = teaData;
				$scope.variablePacket.tabledata.linedata.push(tea);
				var stu = {};
				stu.name = "学生";
				stu.data = stuData;
				$scope.variablePacket.tabledata.linedata.push(stu);
				var parent = {};
				parent.name = "家长";
				parent.data = parentData;
				$scope.variablePacket.tabledata.linedata.push(parent);
			}
		})
	}

	//获取省 市平台用户注册率
	$scope.getAreaRegisterDataList = function(code){
		$http.get(interfaceIpAddr+"/register/rate/"+code).success(function(data){
			if(data.ret==200){
				var result = data.data;
				var quanguoData = [];
				angular.forEach(result,function(obj,index){
					var objData ={};
					objData.id = obj.areaId;
					objData.name = obj.areaName;
					var regcount = [];
					var regObj ={};
					regObj.schoolRegNum = obj.schoolRegisterNo;
					regObj.schoolRegRate = "--";
					
					regObj.teaRegNum = obj.teaRegisterNo;
					regObj.teaRegRate = obj.teaRegisterRate;
					
					regObj.stuRegNum = obj.stuRegisterNo;
					regObj.stuRegRate = obj.stuRegisterRate;
					
					regObj.parRegNum = obj.parentRegisterNo;
					regObj.parRegRate = obj.parentRegisterRate;
					regcount.push(regObj);
					var amountObj = {};
					amountObj.schoolRealNum = "--";
					amountObj.schoolRegRate = obj.schoolRegisterRate;
					amountObj.teaRealNum = obj.teaAmountNo;
					amountObj.teaRegRate = obj.teaRegisterRate;
					amountObj.stuRealNum = obj.stuAmountNo;
					amountObj.stuRegRate = obj.stuRegisterRate;
					amountObj.parRealNum = obj.parentAmountNo;
					amountObj.parRegRate = obj.parentRegisterRate;
					if($scope.statisticsType==1){
						amountObj.teaRealNum = obj.teacherWeekActive;
						amountObj.stuRealNum = obj.studentWeekActive;
						amountObj.parRealNum = obj.parentWeekActive;
					}
					regcount.push(amountObj);
					objData.regcount=regcount;
					quanguoData.push(objData);
				})
				$scope.variablePacket.tabledata.quyu = quanguoData;
			}
		})
	}
}]);