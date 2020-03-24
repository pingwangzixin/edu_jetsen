app.controller('userAnalysisCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = managerSearch.scope;
	if(scope==0){
		$scope.requestParam =1;
	}
	if(scope==1){
		$scope.requestParam =managerSearch.provinceId ;
	}
	if(scope==2){
		$scope.requestParam = managerSearch.cityId;
	}
	if(scope==3){
		$scope.requestParam =managerSearch.countyId;
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
		if(type == "china") {
			$scope.shengdata(n,name); //获取省的数据
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = $scope.variablePacket.tabledata.name; //面包屑导航显示省的名字
			$timeout(function() {
				$scope.changepai();
				$scope.changestudent();
				$scope.changepar();
			}, 500)
			
//			$scope.changepai();
//			$scope.changestudent();
//			$scope.changepar();
		} else if(type == "province") {
			$scope.shidata(n,name); //获取市的数据
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = $scope.variablePacket.tabledata.name; //面包屑导航显示城市的名字
			$timeout(function() {
				$scope.changepai();
				$scope.changestudent();
				$scope.changepar();
			}, 500)
//			$scope.changepai();
//			$scope.changestudent();
//			$scope.changepar();
		} else if(type == "city") {
			$scope.quxiandata(n,name); //获取区县的数据
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = $scope.variablePacket.tabledata.name; //面包屑导航显示区县的名字
			$timeout(function() {
				$scope.changepai();
				$scope.changestudent();
				$scope.changepar();
			}, 500)
//			$scope.changepai();
//			$scope.changestudent();
//			$scope.changepar();
		} else if(type == "county") {
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.xuexiaodata(n,name); //获取学校的数据
			$scope.variablePacket.schoolname = $scope.variablePacket.tabledata.name; //面包屑导航显示学校的名字
			$timeout(function() {
				$scope.changepai();
				$scope.changestudent();
				$scope.changepar();
			}, 500)
//			$scope.changepai();
//			$scope.changestudent();
//			$scope.changepar();
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
			$scope.changepai();
			$scope.changestudent();
			$scope.changepar();
		} else if(type == 1) {
			$scope.shengdata($scope.breadNavCode1);
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.changepai();
			$scope.changestudent();
			$scope.changepar();
		} else if(type == 2) {
			$scope.shidata($scope.breadNavCode2);
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.changepai();
			$scope.changestudent();
			$scope.changepar();
		} else if(type == 3) {
			$scope.quxiandata($scope.breadNavCode3);
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.changepai();
			$scope.changestudent();
			$scope.changepar();
		}
		//标题名字
		$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
	}
	
	var colors=['#5F9EA0','#f9931f','#CAFF70','#636363','#298e3f',
				'#f9010d','#f9931f','#ffdc04','#94ce48','#298e3f',
				'#FFB6C1','#FF00FF','#EEC591','#E0FFFF','#CDCD00',
				'#AB82FF','#00008B','#8B6508','#9A32CD','#A52A2A',
				'#EEEE00','#F08080','#CD6600','#BBFFFF','#B03060',
				'#7FFFD4','#698B69','#00FA9A']
	//根据区域编号和用户类型查询相关类型的用户行为数据列表
	$scope.getUserBehaviorListByAreaId = function(userType,areaId){
		//查询用户行为分析数据
		$http.get(interfaceIpAddr+"/behavior/area/"+userType+"/"+areaId).success(function(data){
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
						behaviorObj1.bili = Math.floor(obj.percentage*100*100)/100 +"%"
						behaviorObj1.color = colors[index];
						behavior1.push(behaviorObj1);
					}else{
						var behaviorObj2 = {};
						behaviorObj2.name = obj.moduleName;
						behaviorObj2.times =  obj.avg;
						behaviorObj2.pcduan = obj.pc;
						behaviorObj2.y = obj.percentage;
						behaviorObj2.yidongduan = obj.mobile;
						behaviorObj2.bili = Math.floor(obj.percentage*100*100)/100 +"%"
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
		$http.get(interfaceIpAddr+"/behavior/area/"+areaId).success(function(data){
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
			"teacheranaly": [
//				{   //教师行为分析
//					"id": "1",
//					"name": "备课", //模块名称
//					"color": colors[0], //图表的颜色
//					"y": 20, 
//					"times": "4.8", //时长
//					"bili": "23%", //比例
//					"pcduan": "4.8",//pc端
//					"yidongduan": "4.6" //移动端
//				}
			],
			"studentanaly": [
//				{ //学生行为分析
//					"id": "1",
//					"name": "备课",
//					"y": 20,
//					"color": "#f9010d",
//					"times": "4.8",
//					"bili": "23%",
//					"pcduan": "4.8",
//					"yidongduan": "4.6"
//				}
			],
			"parentsanaly": [
//				{ //家长行为分析
//					"id": "1",
//					"name": "备课",
//					"y": 20,
//					"color": "#f9010d",
//					"times": "4.8",
//					"bili": "23%",
//					"pcduan": "4.8",
//					"yidongduan": "4.6"
//				}
			],
			"quyu": [
//				{  //表格数据
//					"id": 2,
//					"name": "黑龙江省",
//					"teachtimes": 24,
//					"stutimes": 30,
//					"partimes": 40,
//				}
			]
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
		$http.get(jeucIp+"/ea/area/"+$scope.requestParam).success(function(data){
			if(data.ret==200){
				$scope.areaName = data.data.name;
				$scope.shengdata($scope.requestParam,data.data.name);
			}
		})
	}
	if(scope==2){
		$scope.requestParam =managerSearch.cityId;
		$http.get(jeucIp+"/ea/area/"+$scope.requestParam).success(function(data){
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
		
		$scope.variablePacket.provincenav = true;
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
		$scope.variablePacket.provincenav = true;
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
		$scope.variablePacket.countyname = managerSearch.countyName;
		
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = false;
		
		$scope.getUserBehaviorListByAreaId(1,areaId);
		$scope.getUserBehaviorListByAreaId(2,areaId);
		$scope.getUserBehaviorListByAreaId(3,areaId);
		
		$scope.getUserAvgOnlineTimeList(areaId);
	};

	//根据学校编号和用户类型查询学校维度的用户行为数据列表
	$scope.getUserBehaviorListByOfficeId = function(userType,officeId){
		$http.get(interfaceIpAddr+"/behavior/office/"+userType+"/"+officeId).success(function(data){
			if(data.ret==200){
				result = data.data;
				var behavior = [];
				angular.forEach(result,function(obj,index){
					var behaviorObj = {};
					behaviorObj.name = obj.moduleName;
					behaviorObj.times =  obj.avg;
					behaviorObj.pcduan = obj.pc;
					behaviorObj.y = obj.avg;
					behaviorObj.yidongduan = obj.mobile;
					behaviorObj.bili = obj.percentage*100 +"%"
					behaviorObj.color = colors[index];
					behavior.push(behaviorObj);
				})
				if(userType=='1'){
					$scope.variablePacket.tabledata.teacheranaly = behavior;
				}
				if(userType=='2'){
					$scope.variablePacket.tabledata.studentanaly = behavior;
				}
				if(userType=='3'){
					$scope.variablePacket.tabledata.parentsanaly = behavior;
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
		$scope.variablePacket.countyname = managerSearch.countyName;
		$scope.variablePacket.schoolname = managerSearch.officeName;
		
		$scope.variablePacket.provincenav = true;
		$scope.variablePacket.citynav = true;
		$scope.variablePacket.countynav = true;
		$scope.variablePacket.schoolnav = true;
		
		$scope.getUserBehaviorListByOfficeId(1,officeId);
		$scope.getUserBehaviorListByOfficeId(2,officeId);
		$scope.getUserBehaviorListByOfficeId(3,officeId);
	};

//	$timeout(function() {
//		$scope.changepai();
//		$scope.changestudent();
//		$scope.changepar();
//	}, 500)

	//饼状图
	$scope.changepai = function() {
		teadata = $scope.variablePacket.tabledata.teacheranaly;
		var avg = 0;
		if($scope.listType=="office"){
			$http.get(interfaceIpAddr+"/behavior/office/avg/1/"+$scope.officeId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
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
			$http.get(interfaceIpAddr+"/behavior/area/avg/1/"+$scope.areaId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
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
		var avg = 0;
		if($scope.listType=="office"){
			$http.get(interfaceIpAddr+"/behavior/office/avg/2/"+$scope.officeId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
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
			$http.get(interfaceIpAddr+"/behavior/area/avg/2/"+$scope.areaId).success(function(data){
				if(data.ret==200){
					avg = data.data.avg;
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

	
	
}]);