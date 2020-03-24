app.controller('userAnalysisCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams','$rootScope', function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
//	var obj = {
//		   "userId":"f56e325d1034429e900227dbe7fdb691",
//		   "scope": "2",
//		   "provinceId":"888314e8207f440a8d369ac8aa021120",
//		   "provinceName":"黑龙江省",
//		   "cityId":"78881913d0ce4b05b4a6b6455325a392",
//		   "cityName":"牡丹江市",
//		   "countyId":"37872e8c80374ce2a0a19fb4df7fc0dd",
//		   "countyName":"东安区",
//		   "officeId":"470",
//		   "officeName":""
//	}
//	sessionStorage.setItem("managerSearch",JSON.stringify(obj));
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = managerSearch.scope;
	if(scope==0){
		$scope.requestParam =1;
	}
	if(scope==1){
		$http.get(jeucIp+"statistics/area?code="+managerSearch.provinceId).success(
			function(response){
				if(response.ret==200){
					$scope.requestParam = response.data.id;
					$scope.breadNavCode1 = response.data.id;
					$scope.breadNavName1 = managerSearch.provinceName;
				}
			}
		)
	}
	if(scope==2){
		$http.get(jeucIp+"statistics/area?code="+managerSearch.cityId).success(
			function(response){
				if(response.ret==200){
					$scope.requestParam = response.data.id;
					$scope.breadNavCode2 = response.data.id;
					$scope.breadNavName2 = managerSearch.cityName;
				}
			}
		)
	}
	if(scope==3){
		$http.get(jeucIp+"statistics/area?code="+managerSearch.countyId).success(
			function(response){
				if(response.ret==200){
					$scope.requestParam = response.data.id;
					$scope.breadNavCode3 = response.data.id;
					$scope.breadNavName3 = managerSearch.countyName;
				}
			}
		)
	}
	if(scope==4){
		$scope.requestParam =managerSearch.officeId;
	}
	//模拟数据
	$scope.variablePacket = {
		state: 0,
		school: true,
		statesType: 0,
		studyYear: '09-01到07-01',
		addtype: 1,
		schooldata: true, //是否显示学校
		addusertype: 1, //默认选老师
		oneuserth: "姓名",
		twouserth: "注册时间",
		threeuserth: "最后登录时间",
		fouruserth: "总登录次数(次)",
		fiveuserth: "总在线时长(小时)",
		provincenav: false,
		citynav: false,
		countynav: false,
		schoolnav: false,
		tablearea: '全国',
	};
	
	$rootScope.variableGlobal.crumbs.countyname="东安区";
	$rootScope.variableGlobal.crumbs.schoolname="捷成世纪小学";
	$rootScope.variableGlobal.crumbs.countynav=false;
	$rootScope.variableGlobal.crumbs.schoolnav=false;

	//选项卡切换
	$scope.changestate = function(n) {
		$scope.variablePacket.statesType = n;
		$timeout(function() {
				$scope.changepai();
				$scope.changestudent();
				$scope.changepar();
			}, 500)
	};
	//点击省、市、区、县
	$scope.findCityCount = function(n, name,type) {
		$scope.type = type;
		if(type == "china") {
			$scope.shengdata(n,name); //获取省的数据
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.provincename = $scope.variablePacket.tabledata.name; //面包屑导航显示省的名字
		} else if(type == "province") {
			$scope.type = "province";
			$scope.shidata(n,name); //获取市的数据
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = $scope.variablePacket.tabledata.name; //面包屑导航显示城市的名字
		} else if(type == "city") {
			console.log("点击区县")
			$scope.requestParam = n;
			$scope.type = "city";
			$scope.quxiandata(n,name); //获取区县的数据
			console.log("点击区县后类型为"+$scope.type);
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = $scope.variablePacket.tabledata.name; //面包屑导航显示区县的名字
		} else if(type == "county") {
			
			$scope.requestParam = n;
			$scope.type = "county";
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.xuexiaodata(n,name); //获取学校的数据
			$scope.variablePacket.schoolname = $scope.variablePacket.tabledata.name; //面包屑导航显示学校的名字
		}
		//表头的省市区县名字
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
	}

	$rootScope.breadNav = function(type) {
		alert(type)
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
		} else if(type == 1) {
			$scope.shengdata($scope.breadNavCode1);
			$scope.requestParam = $scope.breadNavCode1;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
		} else if(type == 2) {
			$scope.type="province"
			$scope.shidata($scope.breadNavCode2);
			$scope.requestParam = $scope.breadNavCode2;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
		} else if(type == 3) {
			$scope.type="city";
			$scope.requestParam = $scope.breadNavCode3;
			$scope.quxiandata($scope.breadNavCode3,$scope.variablePacket.countyname);
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
		}
		//标题名字
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
	}
	
	var colors=['#f9010d','#f9931f','#ffdc04','#94ce48','#298e3f',
				'#00b0ee','#0373ba','#f2008d','#007273','#1abc9c',
				'#b8d8ff','#91268c','#817dcf']
	//根据区域编号和用户类型查询相关类型的用户行为数据列表
	$scope.getUserBehaviorListByAreaId = function(userType,areaId){
		url = "/behavior/area/"+userType+"/"+areaId;
		if($scope.startTime!=undefined && $scope.endTime!=undefined){
			url+="?beginDate="+$scope.startTime+"&endDate="+$scope.endTime;
		}
		//查询用户行为分析数据
		$http.get(interfaceIpAddr+url).success(function(data){
			if(data.ret==200){
				result = data.data;
				var behavior1 = [];
				var behavior2 = [];
				angular.forEach(result,function(obj,index){
					if(index<15){
						var behaviorObj1 = {};
						behaviorObj1.name = obj.moduleName;
						behaviorObj1.times =  obj.avg;
						behaviorObj1.pcduan = obj.pc;
						behaviorObj1.y = obj.percentage;
						behaviorObj1.yidongduan = obj.mobile;
						behaviorObj1.bili = Math.floor(obj.percentage*100*100)/100 
						behaviorObj1.color = colors[index];
						behavior1.push(behaviorObj1);
					}else{
						var behaviorObj2 = {};
						behaviorObj2.name = obj.moduleName;
						behaviorObj2.times =  obj.avg;
						behaviorObj2.pcduan = obj.pc;
						behaviorObj2.y = obj.percentage;
						behaviorObj2.yidongduan = obj.mobile;
						behaviorObj2.bili = Math.floor(obj.percentage*100*100)/100 
						behaviorObj2.color = colors[index];
						behavior2.push(behaviorObj2);
					}
				})
				if(userType=='1'){
					$scope.variablePacket.tabledata.teacheranaly1 = behavior1;
					$scope.variablePacket.tabledata.teacheranaly2 = behavior2;
				}
				if(userType=='2'){
					$scope.variablePacket.tabledata.studentanaly1 = behavior1;
					$scope.variablePacket.tabledata.studentanaly2 = behavior2;
				}
				if(userType=='3'){
					$scope.variablePacket.tabledata.parentsanaly1 = behavior1;
					$scope.variablePacket.tabledata.parentsanaly2 = behavior2;
				}
			}
		})
	}

	//根据区域编号查询子区域的教师、学生、家长平均在线时长列表
	$scope.getUserAvgOnlineTimeList = function(areaId){
		url = "/behavior/area/"+areaId;
		if($scope.startTime!=undefined && $scope.endTime!=undefined){
			url+="?beginDate="+$scope.startTime+"&endDate="+$scope.endTime;
		}
		$http.get(interfaceIpAddr+url).success(function(data){
			if(data.ret==200){
				result = data.data;
				var quyu = [];
				angular.forEach(result,function(data,index){
					var userAvgOnline = {};
					userAvgOnline.id = data.id;
					userAvgOnline.name = data.name;
					userAvgOnline.teachtimes = data.teaTotal;
					userAvgOnline.stutimes = data.stuTotal;
					userAvgOnline.partimes = data.parentTotal;
					quyu.push(userAvgOnline);
				})
				$scope.variablePacket.tabledata.quyu = quyu;
			}
		})
	}
	//全国的数据
	$scope.quanguodata = function(areaId) {
		$scope.areaId = "1";
		$scope.variablePacket.tabledata = {
			"name": "全国",
			"type": "china",
			"id": 1,
			"teacheranaly": [],
			"studentanaly": [],
			"parentsanaly": [],
			"quyu": []
		}
		$scope.getUserBehaviorListByAreaId(1,areaId);
		$scope.getUserBehaviorListByAreaId(2,areaId);
		$scope.getUserBehaviorListByAreaId(3,areaId);
		$scope.getUserAvgOnlineTimeList(1);
	};

//	$scope.quanguodata(1);
	if(scope==0){
		$scope.requestParam =1 ;
		$scope.quanguodata($scope.requestParam);
	}
	if(scope==1){
		$scope.requestParam =managerSearch.provinceId;
		$http.get(jeucIp+"statistics/area?code="+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.shengdata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==2){
//		$scope.type="province";
		$scope.requestParam =managerSearch.cityId;
		$http.get(jeucIp+"statistics/area?code="+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.shidata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==3){
//		$scope.type="city";
		$scope.requestParam =managerSearch.countyId;
		$http.get(jeucIp+"statistics/area?code="+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.quxiandata($scope.requestParam,data.data.name,scope);
			}
		})
	}
	if(scope==4){
//		$scope.type="county";
		$scope.requestParam =managerSearch.officeId;
		$http.get(jeucIp+"statistics/eaOffice?officeId="+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.xuexiaodata($scope.requestParam,data.data.school.name,scope);
			}
		})
	}

	$scope.shengdata = function(areaId,areaName) {
		$scope.variablePacket.tablearea = areaName;
		
		$scope.areaId = areaId;
		$scope.breadNavCode1 = areaId;
		$scope.variablePacket.tabledata = {
			"name": areaName,
			"type": "province",
			"teacheranaly": [],
			"studentanaly": [],
			"parentsanaly": [],
			"quyu": []
		}
		$scope.variablePacket.provincename =managerSearch.provinceName;
		
		$scope.variablePacket.provincenav = false;
		$scope.variablePacket.citynav = false;
		$scope.variablePacket.countynav = false;
		$scope.variablePacket.schoolnav = false;
		
		$scope.getUserBehaviorListByAreaId(1,areaId);
		$scope.getUserBehaviorListByAreaId(2,areaId)
		$scope.getUserBehaviorListByAreaId(3,areaId)
		
		$scope.getUserAvgOnlineTimeList(areaId);
	};

	//市数据
	$scope.shidata = function(areaId,areaName) {
		$scope.variablePacket.tablearea = areaName;
		$scope.areaId = areaId;
		$scope.breadNavCode2 = areaId;
		$scope.variablePacket.tabledata = {
			"name": areaName,
			"type": "city",
			"teacheranaly": [],
			"studentanaly": [],
			"parentsanaly": [],
			"quyu": []
		}
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = managerSearch.cityName;
		$scope.variablePacket.provincenav = false;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = false;
		$scope.variablePacket.schoolnav = false;
		
		$scope.getUserBehaviorListByAreaId(1,areaId);
		$scope.getUserBehaviorListByAreaId(2,areaId);
		$scope.getUserBehaviorListByAreaId(3,areaId);
		
		$scope.getUserAvgOnlineTimeList(areaId);
	};

	//区县数据
	$scope.quxiandata = function(areaId,areaName) {
		$scope.variablePacket.tablearea = areaName;
		$scope.areaId = areaId;
		$scope.breadNavCode3 = areaId;
		$scope.variablePacket.tabledata = {
			"name": areaName,
			"type": "county",
			"teacheranaly": [],
			"studentanaly": [],
			"parentsanaly": [],
			"quyu": []
		}
		
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = managerSearch.cityName;
		$scope.variablePacket.countyname = areaName;
		
		$scope.variablePacket.provincenav = false;
		if(scope==2){
			$scope.variablePacket.citynav = true;
		}else if(scope==3){
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = true;
		}else if(scope==4){
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
		}
//		$scope.variablePacket.citynav = true
//		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = false;
		
		$scope.getUserBehaviorListByAreaId(1,areaId);
		$scope.getUserBehaviorListByAreaId(2,areaId);
		$scope.getUserBehaviorListByAreaId(3,areaId);
		
		$scope.getUserAvgOnlineTimeList(areaId);
	};

	//根据学校编号和用户类型查询学校维度的用户行为数据列表
	$scope.getUserBehaviorListByOfficeId = function(userType,officeId){
		var url = interfaceIpAddr+"/behavior/office/"+userType+"/"+officeId
		if($scope.startTime!=undefined && $scope.endTime!=undefined){
			url+="?beginDate="+$scope.startTime+"&endDate="+$scope.endTime;
		}
		$http.get(url).success(function(data){
			if(data.ret==200){
				result = data.data;
				var behavior1 = [];
				var behavior2 = [];
				angular.forEach(result,function(obj,index){
					if(index<15){
						var behaviorObj1 = {};
						behaviorObj1.name = obj.moduleName;
						behaviorObj1.times =  obj.avg;
						behaviorObj1.pcduan = obj.pc;
						behaviorObj1.y = obj.percentage*100;
						behaviorObj1.yidongduan = obj.mobile;
						behaviorObj1.bili = (obj.percentage*100).toFixed(2);
						behaviorObj1.color = colors[index];
						behavior1.push(behaviorObj1);
					}else{
						var behaviorObj2 = {};
						behaviorObj2.name = obj.moduleName;
						behaviorObj2.times =  obj.avg;
						behaviorObj2.pcduan = obj.pc;
						behaviorObj2.y = obj.percentage*100;
						behaviorObj2.yidongduan = obj.mobile;
						behaviorObj2.bili = (obj.percentage*100).toFixed(2);
						behaviorObj2.color = colors[index];
						behavior2.push(behaviorObj2);
					}
				})
				if(userType=='1'){
					$scope.variablePacket.tabledata.teacheranaly1 = behavior1;
					$scope.variablePacket.tabledata.teacheranaly2 = behavior2;
				}
				if(userType=='2'){
					$scope.variablePacket.tabledata.studentanaly1 = behavior1;
					$scope.variablePacket.tabledata.studentanaly2 = behavior2;
				}
				if(userType=='3'){
					$scope.variablePacket.tabledata.parentsanaly1 = behavior1;
					$scope.variablePacket.tabledata.parentsanaly2 = behavior2;
				}
			}
		})
	}
	//学校的数据
	$scope.xuexiaodata = function(officeId,officeName) {
		$scope.officeId = officeId;
		$scope.listType = "office";
		$scope.variablePacket.tabledata = {
			"name": officeName,
			"type": "school",
			"teacheranaly": [],
			"studentanaly": [],
			"parentsanaly": [],
			"quyu": []
		}
		
		$scope.variablePacket.provincename =managerSearch.provinceName;
		$scope.variablePacket.cityname = managerSearch.cityName;
//		$scope.variablePacket.countyname = managerSearch.countyName;
		$scope.variablePacket.schoolname = officeName;
		
		$scope.variablePacket.provincenav = false;
		if(scope==2){
			$scope.variablePacket.citynav = true;
//			$scope.variablePacket.schooldata = true;
		}else if(scope==3){
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = true;
//			$scope.variablePacket.schooldata = false;
		}else if(scope==4){
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schooldata = false;
		}
//		$scope.variablePacket.citynav = true;
//		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = true;
		
		$scope.getUserBehaviorListByOfficeId(1,officeId);
		$scope.getUserBehaviorListByOfficeId(2,officeId);
		$scope.getUserBehaviorListByOfficeId(3,officeId);
	};

	//饼状图
	var colors=['#f9010d','#f9931f','#ffdc04','#94ce48','#298e3f',
				'#00b0ee','#0373ba','#f2008d','#007273','#1abc9c',
				'#b8d8ff','#91268c','#817dcf']
	$timeout(function(){
		$scope.changepai();
	},1000)
	
	//教师饼状图
	$scope.changepai = function() {
		teadata = $scope.variablePacket.tabledata.teacheranaly;
		
		//假数据，套数据的时候记得删除！！！！！！！！！！！！！！！！！！！！！！！！
		teadata=[{
			name: '个人资源',
			y: 61.41,
			times:61.41,
			sliced: true,
			selected: true,
			bili:"20%",
			color:'#f9010d'
		}, {
			name: '公共资源',
			y: 11.84,
			times:11.84,
			bili:"20%",
			color:'#f9931f'
		}, {
			name: '教研中心',
			y: 10.85,
			times:10.85,
			bili:"20%",
			color:'#ffdc04'
		}, {
			name: '作业中心',
			y: 4.67,
			times:4.67,
			bili:"20%",
			color:'#94ce48'
		}, {
			name: '课堂记录',
			y: 4.18,
			times:4.18,
			bili:"20%",
			color:'#298e3f'
		}, {
			name: '综合评价',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#00b0ee'
		}, {
			name: '德育活动',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#0373ba'
		}, {
			name: '营养餐',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#f2008d'
		}, {
			name: '学情分析',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#007273'
		}, {
			name: '体质健康',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#1abc9c'
		}, {
			name: '教育院线',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#b8d8ff'
		}, {
			name: '素质评价',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#91268c'
		}, {
			name: '学生档案',
			y: 7.05,
			times:7.05,
			bili:"20%",
			color:'#817dcf'
		}]
		
		
		var avg = 0;
		if($scope.listType=="office"){
			$http.get(interfaceIpAddr+"/behavior/office/avg/1/"+$scope.officeId).success(function(reponse){
				if(reponse.ret==200){
					avg = reponse.data.avg;
					var pie_data_teacher = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>教师<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '教师',
						"subtitle": "",
						"data": teadata
					};
					chart_pie_tooltip('.chart_pie_teacher', pie_data_teacher.user, pie_data_teacher.title, pie_data_teacher.subtitle, pie_data_teacher.data);
				}
			})
		}else{
			$http.get(interfaceIpAddr+"/behavior/area/avg/1/"+$scope.areaId).success(function(reponse){
				if(reponse.ret==200){
					avg = reponse.data.avg;
					var pie_data_teacher = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>教师<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '教师',
						"subtitle": "",
						"data": teadata
					};
					chart_pie_tooltip('.chart_pie_teacher', pie_data_teacher.user, pie_data_teacher.title, pie_data_teacher.subtitle, pie_data_teacher.data);
				}
		})
			
		}
		
	};

	$scope.changestudent = function() {
		studata = $scope.variablePacket.tabledata.studentanaly;
		
		//这是假数据，套数据的时候记得删除！！！！！！！！！！！！！！！！！！！！！！！！
		studata=[{
			name: '个人资源',
			y: 61.41,
			sliced: true,
			selected: true,
			color:'#f9010d'
		}, {
			name: '公共资源',
			y: 11.84,
			color:'#f9931f'
		}, {
			name: '教研中心',
			y: 10.85,
			color:'#ffdc04'
		}, {
			name: '作业中心',
			y: 4.67,
			color:'#94ce48'
		}, {
			name: '课堂记录',
			y: 4.18,
			color:'#298e3f'
		}, {
			name: '综合评价',
			y: 7.05,
			color:'#00b0ee'
		}, {
			name: '德育活动',
			y: 7.05,
			color:'#0373ba'
		}, {
			name: '营养餐',
			y: 7.05,
			color:'#f2008d'
		}, {
			name: '学情分析',
			y: 7.05,
			color:'#007273'
		}, {
			name: '体质健康',
			y: 7.05,
			color:'#1abc9c'
		}, {
			name: '教育院线',
			y: 7.05,
			color:'#b8d8ff'
		}, {
			name: '素质评价',
			y: 7.05,
			color:'#91268c'
		}, {
			name: '学生档案',
			y: 7.05,
			color:'#817dcf'
		}];
		
		
		var avg = 0;
		if($scope.listType=="office"){
			$http.get(interfaceIpAddr+"/behavior/office/avg/2/"+$scope.officeId).success(function(reponse){
				if(reponse.ret==200){
					avg = reponse.data.avg;
					var pie_data_student = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>学生<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '学生',
						"subtitle": "",
						"data": studata
					};
					chart_pie_tooltip('.chart_pie_student', pie_data_student.user, pie_data_student.title, pie_data_student.subtitle, pie_data_student.data);
				}
			})
		}else{
			$http.get(interfaceIpAddr+"/behavior/area/avg/2/"+$scope.areaId).success(function(reponse){
				if(reponse.ret==200){
					avg = reponse.data.avg;
					var pie_data_student = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>学生<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '学生',
						"subtitle": "",
						"data": studata
					};
					chart_pie_tooltip('.chart_pie_student', pie_data_student.user, pie_data_student.title, pie_data_student.subtitle, pie_data_student.data);
				}
			})
			
		}
	};

	$scope.changepar = function() {
		pardata = $scope.variablePacket.tabledata.parentsanaly;
		
		//这是假数据，套数据的时候记得删除！！！！！！！！！！！！！！！！！！！！！！！！
		pardata=[{
			name: '个人资源',
			y: 61.41,
			sliced: true,
			selected: true,
			color:'#f9010d'
		}, {
			name: '公共资源',
			y: 11.84,
			color:'#f9931f'
		}, {
			name: '教研中心',
			y: 10.85,
			color:'#ffdc04'
		}, {
			name: '作业中心',
			y: 4.67,
			color:'#94ce48'
		}, {
			name: '课堂记录',
			y: 4.18,
			color:'#298e3f'
		}, {
			name: '综合评价',
			y: 7.05,
			color:'#00b0ee'
		}, {
			name: '德育活动',
			y: 7.05,
			color:'#0373ba'
		}, {
			name: '营养餐',
			y: 7.05,
			color:'#f2008d'
		}, {
			name: '学情分析',
			y: 7.05,
			color:'#007273'
		}, {
			name: '体质健康',
			y: 7.05,
			color:'#1abc9c'
		}, {
			name: '教育院线',
			y: 7.05,
			color:'#b8d8ff'
		}, {
			name: '素质评价',
			y: 7.05,
			color:'#91268c'
		}, {
			name: '学生档案',
			y: 7.05,
			color:'#817dcf'
		}];
		
		
		var avg = 0;
		if($scope.listType=="office"){
			$http.get(interfaceIpAddr+"/behavior/office/avg/3/"+$scope.officeId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
					var pie_data_parent = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>家长<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '家长',
						"subtitle": "",
						"data": pardata
					};
					chart_pie_tooltip('.chart_pie_parent', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
				}
			})
		}else{
			$http.get(interfaceIpAddr+"/behavior/area/avg/3/"+$scope.areaId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
					var pie_data_parent = {
						"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>家长<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
						"user": '家长',
						"subtitle": "",
						"data": pardata
					};
					chart_pie_tooltip('.chart_pie_parent', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
				}
			})
		}
		
	}


	//查询学年
	$http.get(jeucIp+"statistics/getStuYearList").success(
		function(response){
			if(response.ret==200){
				$scope.stuYearList = response.data;
				$scope.selectedItem = $scope.stuYearList[0].startTime+"|"+$scope.stuYearList[0].endTime;
			}
		}
	)
	
	//折线图
	
	$timeout(function() {
		$scope.changeZheline();
	}, 1000)
	
	//这是假数据，套数据的时候记得删掉！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	var linedata = [{
		name: '教师',
		data: [20, 30, 40, 50, 60, 70]
	}, {
		name: '学生',
		data: [10, 20, 30, 40, 50, 60]
	}, {
		name: '家长',
		data: [30, 20, 10, 90, 80, 100]
	}]
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#399fdf", "#d18604", "#c72036"],
			"title": "",
			"categories": ["2014年", "2015年", "2016年", "2017年", "2018年","2019年"],
//			"categories": $scope.variablePacket.tabledata.categories,
			"ytitle": "活跃率",
			"data": linedata,
			"parallel": []
		};
		chart_line('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data);
	};
	
	$scope.changeStuYear = function(){
		var stuYear = $scope.selectedItem;
		var dates = stuYear.split("|");
		$scope.startTime = dates[0];
		$scope.endTime = dates[1];
		console.log("changeStuYear方法"+$scope.type);
		console.log("changeStuYear方法"+$scope.requestParam);
		if($scope.type=="province" || $scope.type == undefined){
			console.log("执行province");
			$http.get(jeucIp+"statistics/area?code="+$scope.requestParam).success(function(data){
				if(data.ret==200){
					$scope.areaName = data.data.name;
					$scope.shidata($scope.requestParam,data.data.name);
					$scope.variablePacket.citynav = true;
				}
			})
		}
		if($scope.type == "city") {
			console.log("执行city");
			$http.get(jeucIp+"statistics/area?code="+$scope.requestParam).success(function(data){
				if(data.ret==200){
					$scope.areaName = data.data.name;
					$scope.quxiandata($scope.requestParam,data.data.name);
					$scope.variablePacket.countynav = true;
				}
			})
			$scope.variablePacket.countyname = $scope.variablePacket.tabledata.name; //面包屑导航显示区县的名字
		} else if($scope.type == "county") {
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$http.get(jeucIp+"statistics/eaOffice?officeId="+$scope.requestParam).success(function(data){
				if(data.ret==200){
					$scope.xuexiaodata($scope.requestParam,data.data.school.name);
				}
			})
		}
	};
	
	
	
	//这是假数据，给后台套数据展示用，套完数据之后请及时删除！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
	$timeout(function(){
		$scope.variablePacket.tabledata.teacheranaly2=[{
				"id": "1",
				"name": "个人资源",
				"hours": '3.6',
				"y": 20,
				"color": "#f9010d",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "2",
				"name": "公共资源",
				"hours": '3.6',
				"y": 20,
				"color": "#f9931f",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "3",
				"name": "教研中心",
				"hours": '3.6',
				"y": 20,
				"color": "#ffdc04",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "4",
				"name": "作业中心",
				"hours": '3.6',
				"y": 20,
				"color": "#94ce48",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "5",
				"name": "课堂记录",
				"hours": '3.6',
				"y": 20,
				"color": "#298e3f",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "6",
				"name": "综合评价",
				"hours": '3.6',
				"y": 20,
				"color": "#00b0ee",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "7",
				"name": "德育活动",
				"hours": '3.6',
				"y": 20,
				"color": "#0373ba",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "8",
				"name": "营养餐",
				"hours": '3.6',
				"y": 20,
				"color": "#f2008d",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "9",
				"name": "学情分析",
				"hours": '3.6',
				"y": 20,
				"color": "#007273",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "10",
				"name": "体质健康",
				"hours": '3.6',
				"y": 20,
				"color": "#1abc9c",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "11",
				"name": "教育院线",
				"hours": '3.6',
				"y": 20,
				"color": "#b8d8ff",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "12",
				"name": "素质评价",
				"hours": '3.6',
				"y": 20,
				"color": "#91268c",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}, {
				"id": "13",
				"name": "学生档案",
				"hours": '3.6',
				"y": 20,
				"color": "#817dcf",
				"times": "4.8",
				"bili": "23%",
				"pcduan": "4.8",
				"yidongduan": "4.6"
			}]
	},1500);
	
	
	
}]);