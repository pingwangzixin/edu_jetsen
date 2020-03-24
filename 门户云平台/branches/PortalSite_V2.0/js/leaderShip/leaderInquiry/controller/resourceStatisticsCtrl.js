app.controller('resourceStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {

	//模拟数据
	$scope.variablePacket = {
		state: 0,
		wx_school_res: true,
		res_state: 0,
		school: true,
		statesType: 0,
		xueduanelect: true,
		xueduanrange:[],
		xueduantype: 50,
		addtype: 1,
		tablearea: '全国',
		provincenav: false,
		citynav: false,
		countynav: false,
		schoolnav: false,
		stateType: 0,
		stateChart: 0,
		restableshow: true,
		btnName: "按省份",
		userstate: 0,
		studyYear: "2017-09-01到2018-07-01",
		guidannavlist:[],
		activeid:"",
		subject:[],
		quzxititAnaly:[],
		extemAnaly:[],
		roleAnaly:[],
		quyu:[],
		resourceCount:'',
		resourceTotal:0,
		quzTotal:0,
		examTotal:0,
		finallyTotal:0,
		roleData:[],
		roleResourceTotal:0,
		roleQuzTotal:0,
		roleExamTotal:0,
		roleFinallyTotal:0,
		userData:[],
		userResourceTotal:0,
		userQuzTotal:0,
		userExamTotal:0,
		userFinallyTotal:0,
		tableState:0,
		changAreaId:'1',
		levelId:'',
		parentareaId:'',
		provinceId:'',
		cityId:'',
		countyId:'',
		schoolId:'',
		userdataId:'',
		schoolYear:[],
		startTime:'',
		endTime:'',
		indexNum:0,
	};
	var xitidata, xitidata, shijuandata;

	var resourceStatistic = interfaceIpAddr+"/resource/";

	console.log(resourceStatistic)

	$scope.variablePacket.xueduanrange = [{
		"id": 0,
		"name": "小学"
	}, {
		"id": 1,
		"name": "初中"
	}, {
		"id": 2,
		"name": "高中"
	}];
	//从接口中获取学年
	$scope.year='';
	$.ajax({
		type:"get",
		url:jeucIp+"ea/office/getStuYearList",
		async:false,
		success:function(jdata){
			if(jdata.ret == 200){
				var reg = new RegExp('-','g');//g,表示全部替换。
				$scope.variablePacket.schoolYear = jdata.data;
				$scope.year=$scope.variablePacket.schoolYear[0];
				console.log($scope.year);
				$scope.variablePacket.startTime = $scope.variablePacket.schoolYear[0].startTime.replace(reg,"");
				$scope.variablePacket.endTime = $scope.variablePacket.schoolYear[0].endTime.replace(reg,"");
				console.log($scope.variablePacket.startTime);
				console.log($scope.variablePacket.endTime);
			}
		}
	});
	
	/**
	 * 改变下拉框
	 */
	$scope.selectChange = function(startTime,endTime){
		var reg = new RegExp('-','g');//g,表示全部替换。
		startTime = startTime.replace(reg,"");
		endTime = endTime.replace(reg,"");
		$scope.variablePacket.startTime = startTime;
		$scope.variablePacket.endTime = endTime;
		console.log($scope.variablePacket.startTime);
		console.log($scope.variablePacket.endTime);
		console.log("导航值："+$scope.variablePacket.state);
		console.log("区域id："+$scope.variablePacket.changAreaId);
		console.log("学段标识："+$scope.variablePacket.levelId);
		console.log("资源量统计表导航标识："+$scope.variablePacket.res_state);
		//查询资源量统计图
		$scope.changestate($scope.variablePacket.state,$scope.variablePacket.changAreaId);
		//查询资源量统计表
		$scope.changeResstate($scope.variablePacket.res_state,$scope.variablePacket.changAreaId,$scope.variablePacket.btnName);
	}
	$scope.xueduanall = function(n,areaId) {
		$scope.variablePacket.xueduanelect = true;
		$scope.variablePacket.xueduantype = 5;
		$scope.variablePacket.levelId='';
		if(n == 0) {
			$scope.variablePacket.tableState = 0;
			$http.get(resourceStatistic+'resource?areaId='+areaId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.resanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.resanaly[i].y=e.counter;
						if(e.counter == 0){
							$scope.variablePacket.tabledata.resanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.resanaly[i].bili=parseFloat((e.counter/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log($scope.variablePacket.tabledata.resanaly)
					console.log(data.data.count)
					//改变资源饼状图
					$scope.changeRsoucepai(data.data.count);
					console.log("资源统计情况：")
					console.info($scope.variablePacket.subject);
				}else{
					$scope.changeRsoucepai(0);
					$scope.variablePacket.tabledata.resanaly=[];
				}
			})
		} else if(n == 1) {
			$scope.variablePacket.tableState = 1;
			//根据区域id查询试题
			$http.get(resourceStatistic+'quz?areaId='+areaId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
//					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.quzxititanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.quzxititanaly[i].counter=e.quz
						$scope.variablePacket.tabledata.quzxititanaly[i].y=e.quz;
						if(e.quz == 0){
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=parseFloat((e.quz/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log(data.data.count)
					//改变习题饼状图
					$scope.changeXitipai(data.data.count);
					console.log("试题统计情况：")
					console.info($scope.variablePacket.tabledata.quzxititanaly);
				}else{
					$scope.changeXitipai(0);
					$scope.variablePacket.tabledata.quzxititanaly=[];
				}
			})
		} else if(n == 2) {
			$scope.variablePacket.tableState = 2;
			$scope.changeShijuanpai(); //改变试卷饼状图
		}
	}

	$scope.changexueduan = function(n,areaId,s) {
		console.log(n+"------" +areaId);
		if(n == 0){
			$scope.variablePacket.levelId='level_1';
		}else if(n == 1){
			$scope.variablePacket.levelId='level_2';
		}
		else if(n == 2){
			$scope.variablePacket.levelId='level_3';
		}
		$scope.variablePacket.xueduantype = n;
		$scope.variablePacket.xueduanelect = false;
		if(s==0){
			$http.get(resourceStatistic+'resource?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.resanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.resanaly[i].y=e.counter;
						if(e.counter == 0){
							$scope.variablePacket.tabledata.resanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.resanaly[i].bili=parseFloat((e.counter/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log($scope.variablePacket.tabledata.resanaly)
					console.log(data.data.count)
					//改变资源饼状图
					$scope.changeRsoucepai(data.data.count);
					console.log("资源统计情况：")
					console.info($scope.variablePacket.subject);
				}else{
					$scope.changeRsoucepai(0);
					$scope.variablePacket.tabledata.resanaly=[];
				}
			})
		}else if(s==1){
			$http.get(resourceStatistic+'quz?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
//					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.quzxititanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.quzxititanaly[i].counter=e.quz
						$scope.variablePacket.tabledata.quzxititanaly[i].y=e.quz;
						if(e.quz == 0){
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=parseFloat((e.quz/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log(data.data.count)
					//改变习题饼状图
					$scope.changeXitipai(data.data.count);
					console.log("试题统计情况：")
					console.info($scope.variablePacket.tabledata.quzxititanaly);
				}else{
					$scope.changeXitipai(0);
					$scope.variablePacket.subject=[];
					$scope.variablePacket.tabledata.quzxititanaly=[];
				}
			})
		}else if(s==2){
			$scope.changeShijuanpai();
		}
	}
	//切换选项卡
	$scope.changestate = function(n,areaId) {
		$scope.variablePacket.state = n;
		if(n == 0) {
			$scope.variablePacket.tableState = 0;
			$http.get(resourceStatistic+'resource?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.resanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.resanaly[i].y=e.counter;
						if(e.counter == 0){
							$scope.variablePacket.tabledata.resanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.resanaly[i].bili=parseFloat((e.counter/data.data.count)*100).toFixed(2)+"%";
						}
					})
					//改变资源饼状图
					$scope.changeRsoucepai(data.data.count);
				}else{
					$scope.changeRsoucepai(0);
					$scope.variablePacket.tabledata.resanaly=[];
				}
			})
		} else if(n == 1) {
			$scope.variablePacket.tableState = 1;
			//根据区域id查询试题
			$http.get(resourceStatistic+'quz?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
//					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.quzxititanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.quzxititanaly[i].counter=e.quz
						$scope.variablePacket.tabledata.quzxititanaly[i].y=e.quz;
						if(e.quz == 0){
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=parseFloat((e.quz/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log(data.data.count)
					//改变习题饼状图
					$scope.changeXitipai(data.data.count);
					console.log("试题统计情况：")
					console.info($scope.variablePacket.tabledata.quzxititanaly);
				}else{
					$scope.changeXitipai(0);
					$scope.variablePacket.tabledata.quzxititanaly=[];
				}
			})
		} else if(n == 2) {
			$scope.variablePacket.tableState = 2;
			$scope.changeShijuanpai(); //改变试卷饼状图
		}
	};
	$scope.changeResstate = function(n,areaId,findType) {
		$scope.variablePacket.res_state = n;
		console.log(n+findType)
		if(findType=="按省份"){
			$scope.variablePacket.tabledata.type="province";
		}else if(findType=="按城市"){
			$scope.variablePacket.tabledata.type="city";
		}else if(findType=="按区县"){
			$scope.variablePacket.tabledata.type="county";
		}else if(findType=="按学校"){
			$scope.variablePacket.tabledata.type="school";
			
		}
		if(n==1){
			$scope.variablePacket.roleResourceTotal = 0;
			$scope.variablePacket.roleQuzTotal = 0;
			$scope.variablePacket.roleExamTotal = 0;
			$scope.variablePacket.roleFinallyTotal = 0;
			//根据区域id查询角色资源情况
			$http.get(resourceStatistic+'role?areaId='+areaId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					console.log("角色统计情况：")
					console.info(data.data.list);
					$scope.variablePacket.roleData=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.roleData[i].totle=e.resource+e.quz+e.exam;
						$scope.variablePacket.roleResourceTotal += e.resource;
						$scope.variablePacket.roleQuzTotal += e.quz;
						$scope.variablePacket.roleExamTotal += e.exam;
					})
					$scope.variablePacket.roleFinallyTotal = $scope.variablePacket.roleResourceTotal + $scope.variablePacket.roleQuzTotal + $scope.variablePacket.roleExamTotal;
				}else{
					$scope.variablePacket.roleData=[];
				}
			})
		}else if(n==0){
			//根据区域父集id查询区域列表
			$http.get(resourceStatistic+'area?parentAreaId='+areaId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.quyu=data.data.list;
					$scope.variablePacket.tabledata.quyu=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.quyu[i].totle=parseInt(e.resource+e.quz+e.exam);
						$scope.variablePacket.tabledata.quyu[i].type=$scope.variablePacket.tabledata.type;
						$scope.variablePacket.resourceTotal += e.resource;
						$scope.variablePacket.quzTotal += e.quz;
						$scope.variablePacket.examTotal += e.exam;
					})
					$scope.variablePacket.finallyTotal = $scope.variablePacket.resourceTotal + $scope.variablePacket.quzTotal + $scope.variablePacket.examTotal;
					console.log("区域统计情况：")
					console.info($scope.variablePacket.tabledata.quyu);
					console.info(angular.element('.resource_count'))
				}else{
					$scope.variablePacket.tabledata.quyu=[];
				}
			})
		}
	};
	
	//面包屑导航切换
	$scope.breadNav = function(index,type,areaId) {
		if(index<$scope.variablePacket.indexNum){
			return;
		}
		console.log($scope.variablePacket.state);
		console.log(type+"----"+areaId+"----"+index)
		if(type == 'china') {
//			$scope.quanguodata();
			$scope.variablePacket.provincenav = false;
			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.userdatanav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按全国";
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.areaDataList(areaId,type);
		} else if(type == "province") {
//			$scope.shengdata();
//			$scope.variablePacket.citynav = false;
			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.userdatanav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按省份";
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.areaDataList(areaId,type);
		} else if(type == "city") {
//			$scope.shidata();
//			$scope.variablePacket.countynav = false;
			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.userdatanav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按城市";
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.areaDataList(areaId,type);
		} else if(type == "county") {
//			$scope.quxiandata();
//			$scope.variablePacket.schoolnav = false;
			$scope.variablePacket.userdatanav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.btnName = "按区县";
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.areaDataList(areaId,type);
		}
		if(type != "school"){
			//标题名字
			$scope.variablePacket.tablearea = $scope.variablePacket.tabledata.name;
			$scope.variablePacket.restableshow = true;
			$scope.changeRsoucepai(); //改变资源饼状图
			$scope.changeXitipai(); //改变习题饼状图
			$scope.changeShijuanpai(); //改变试卷饼状图
		}
	}
	
	
	//切换选项卡
	$scope.getDatalist = function(module,areaId) {
		
		console.log(module+"----"+areaId)
		if(module == 0) {
			$scope.variablePacket.tableState = 0;
			$http.get(resourceStatistic+'resource?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.resanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.resanaly[i].y=e.counter;
						if(e.counter == 0){
							$scope.variablePacket.tabledata.resanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.resanaly[i].bili=parseFloat((e.counter/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log($scope.variablePacket.tabledata.resanaly)
					console.log(data.data.count)
					//改变资源饼状图
					$scope.changeRsoucepai(data.data.count);
					console.log("资源统计情况：")
					console.info($scope.variablePacket.subject);
				}else{
					$scope.changeRsoucepai(0);
					$scope.variablePacket.tabledata.resanaly=[];
				}
			})
		} else if(module == 1) {
			$scope.variablePacket.tableState = 1;
			//根据区域id查询试题
			$http.get(resourceStatistic+'quz?areaId='+areaId+'&&level='+$scope.variablePacket.levelId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					$scope.variablePacket.subject=data.data.list;
//					$scope.variablePacket.resourceCount=data.data.count;
					$scope.variablePacket.tabledata.quzxititanaly=data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.tabledata.quzxititanaly[i].counter=e.quz
						$scope.variablePacket.tabledata.quzxititanaly[i].y=e.quz;
						if(e.quz == 0){
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=0;
						}else{
							$scope.variablePacket.tabledata.quzxititanaly[i].bili=parseFloat((e.quz/data.data.count)*100).toFixed(2)+"%";
						}
					})
					console.log(data.data.count)
					//改变习题饼状图
					$scope.changeXitipai(data.data.count);
					console.log("试题统计情况：")
					console.info($scope.variablePacket.tabledata.quzxititanaly);
				}else{
					$scope.changeXitipai(0);
					$scope.variablePacket.tabledata.quzxititanaly=[];
				}
			})
		} else if(module == 2) {
			$scope.variablePacket.tableState = 2;
			$scope.changeShijuanpai(); //改变试卷饼状图
		}
	};
	
	
	//改变资源饼状图
	$scope.changeRsoucepai = function(s) {
		if(s=="undefined"){
			s=0;
		}
//		resocuedata = $scope.variablePacket.tabledata.resanaly;
		var pie_data_parent = {
			"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>资源<br>资源总量<br><span style='color:#007BEC'>"+s+"个</span></div>",
			"user": '资源',
			"subtitle": "",
			"data": $scope.variablePacket.subject,
		};
		chart_pie_tooltip2('.chart_pie_ziyuan', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
	}

	//改变习题饼状图
	$scope.changeXitipai = function(s) {
		if(s=="undefined" || s == ''){
			s=0;
		}
//		xitidata = $scope.variablePacket.tabledata.quzxititanaly;
		var pie_data_parent = {
			"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>习题<br>资源总量<br><span style='color:#007BEC'>"+s+"个</span></div>",
			"user": '习题',
			"subtitle": "",
			"data": $scope.variablePacket.subject,
		};
		chart_pie_tooltip2('.chart_pie_xiti', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
	}

	//改变试卷饼状图
	$scope.changeShijuanpai = function(s) {
		if(s=="undefined"){
			s=0;
		}
		shijuandata = $scope.variablePacket.tabledata.extemanaly
		var pie_data_parent = {
			"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>试卷<br>资源总量<br><span style='color:#007BEC'>0个</span></div>",
			"user": '试卷',
			"subtitle": "",
			"data": shijuandata
		};
		chart_pie_tooltip2('.chart_pie_shijuan', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
	}
	//刚进页面默认点击资源
	// $scope.changestate(0,areaId)

	//点击省、市、区、县
	$scope.findCityCount = function(areaId, type,parentAreaName) {
		console.info(areaId+"-------"+type+"---------"+parentAreaName)
		if(type == "china") {
//			$scope.shengdata(); //获取省的数据
			$scope.areaDataList(areaId,type);
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.variablePacket.tabledata.type="province";
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = parentAreaName; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按省份";
			$scope.variablePacket.provinceId=areaId;
		} 
		else if(type == "province") {
			$scope.variablePacket.tabledata.type="city";
//			$scope.shidata(); //获取市的数据
			$scope.areaDataList(areaId,type);	
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = parentAreaName; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按城市";
			$scope.variablePacket.cityId=areaId;
		} else if(type == "city") {
			$scope.variablePacket.tabledata.type="county";
			$scope.areaDataList(areaId,type);	
			$scope.getDatalist($scope.variablePacket.state,areaId);
//			$scope.quxiandata(); //获取区县的数据
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = parentAreaName; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按区县";
			$scope.variablePacket.countyId=areaId;
		} else if(type == "county") {
			$scope.variablePacket.tabledata.type="school";
			$scope.areaDataList(areaId,type);	
			$scope.getDatalist($scope.variablePacket.state,areaId);
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.restableshow = true;
			$scope.variablePacket.btnName = "按学校";
//			$scope.xuexiaodata(); //获取学校的数据
			//面包屑导航显示的名字
			$scope.variablePacket.schoolname = parentAreaName;
			$scope.variablePacket.schoolId=areaId;
		}else if(type == 'school'){
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.restableshow = false;
			$scope.userRoleList(areaId,'1');
			$scope.getDatalist($scope.variablePacket.state,areaId);
			console.log(parentAreaName)
			$scope.variablePacket.userdataname = parentAreaName;
			$scope.variablePacket.userdatanav=parentAreaName
			console.log($scope.variablePacket.userdataname)
			$scope.variablePacket.userdataId=areaId;
		}

		//表头的省市区县名字
		$scope.variablePacket.tablearea = parentAreaName;

	}

	//切换用户
	$scope.changeUser = function(areaId,index) {
		$scope.variablePacket.userstate = index;
		console.log("区域id："+areaId+"类型："+index)
		$scope.variablePacket.userResourceTotal = 0;
		$scope.variablePacket.userQuzTotal = 0;
		$scope.variablePacket.userExamTotal = 0;
		$scope.variablePacket.userFinallyTotal = 0;
		if(index == 0) {
			//根据区域id查询角色资源情况
			$http.get(resourceStatistic+'user?areaId='+areaId+'&&userType=1'+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					console.log("用户统计情况：")
					console.info(data.data.list);
					$scope.variablePacket.userData = data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.userData[i].totle=e.resource+e.quz+e.exam;
						$scope.variablePacket.userResourceTotal += e.resource;
						$scope.variablePacket.userQuzTotal += e.quz;
						$scope.variablePacket.userExamTotal += e.exam;
					})
					$scope.variablePacket.userFinallyTotal = $scope.variablePacket.userResourceTotal + $scope.variablePacket.userQuzTotal + $scope.variablePacket.userExamTotal;
				}else{
					$scope.variablePacket.userData=[];
				}
			})
		} else if(index == 1) {
			$http.get(resourceStatistic+'user?areaId='+areaId+'&&userType=2'+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				if(data.code == 200){
					console.log("用户统计情况：")
					console.info(data.data.list);
					$scope.variablePacket.userData = data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.userData[i].totle=e.resource+e.quz+e.exam;
						$scope.variablePacket.userResourceTotal += e.resource;
						$scope.variablePacket.userQuzTotal += e.quz;
						$scope.variablePacket.userExamTotal += e.exam;
					})
					$scope.variablePacket.userFinallyTotal = $scope.variablePacket.userResourceTotal + $scope.variablePacket.userQuzTotal + $scope.variablePacket.userExamTotal;
				}else{
					$scope.variablePacket.userData=[];
				}
			})
			$scope.variablePacket.tablearea.userRole = []
		}
	}
	var colors=['#f9010d','#f9931f',"#ffdc04","#94ce48","#94ce48","#94ce48","#94ce48"]
	//根据区域父集id查询区域列表
	/*$http.get(resourceStatistic+'area?parentAreaId='+areaId).success(function (data){
		if(data.code == 200){
			$scope.variablePacket.quyu=data.data.list;
			$scope.variablePacket.tabledata.quyu=data.data.list;
			angular.forEach(data.data.list,function(e,i){
				$scope.variablePacket.tabledata.quyu[i].totle=parseInt(e.resource+e.quz+e.exam);
				$scope.variablePacket.tabledata.quyu[i].type="province";
				$scope.variablePacket.resourceTotal += e.resource;
				$scope.variablePacket.quzTotal += e.quz;
				$scope.variablePacket.examTotal += e.exam;
			})
			$scope.variablePacket.finallyTotal = $scope.variablePacket.resourceTotal + $scope.variablePacket.quzTotal + $scope.variablePacket.examTotal;
			console.log("区域统计情况：")
			console.info($scope.variablePacket.tabledata.quyu);
			console.info(angular.element('.resource_count'))
		}else{
			$scope.variablePacket.tabledata.quyu=[];
		}
	})*/
	//全国的数据
	$scope.quanguodata = function() {
		$scope.variablePacket.tabledata = {
			"name": "全国",
			"type": "china",
			"id": 1,
			"resanaly": [],
			"quzxititanaly": [],
			"extemanaly": [],
			"quyu": []
		};
	};

	$scope.quanguodata();
//	根据父集id获取子区域集合
	$scope.areaDataList = function(parentAreaId,type){
		if(type=='china'){
			type='province';
		}else if(type == "province") {
			type='city';
		} else if(type == "city") {
			type='county';
		} else if(type == 'county'){
			type='school';
		}
		$scope.variablePacket.changAreaId  = parentAreaId;
		console.log($scope.variablePacket.changAreaId)
		$scope.variablePacket.resourceTotal = 0;
		$scope.variablePacket.quzTotal = 0;
		$scope.variablePacket.examTotal = 0;
		$scope.variablePacket.finallyTotal = 0;
		//根据区域父集id查询区域列表
		$http.get(resourceStatistic+'area?parentAreaId='+parentAreaId+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
			if(data.code == 200){
				$scope.variablePacket.quyu=data.data.list;
				$scope.variablePacket.tabledata.quyu=data.data.list;
				angular.forEach(data.data.list,function(e,i){
					$scope.variablePacket.tabledata.quyu[i].totle=parseInt(e.resource+e.quz+e.exam);
					$scope.variablePacket.tabledata.quyu[i].type=type;
					$scope.variablePacket.resourceTotal += e.resource;
					$scope.variablePacket.quzTotal += e.quz;
					$scope.variablePacket.examTotal += e.exam;
				})
				$scope.variablePacket.finallyTotal = $scope.variablePacket.resourceTotal + $scope.variablePacket.quzTotal + $scope.variablePacket.examTotal;
				console.log("区域统计情况：")
				console.info($scope.variablePacket.tabledata.quyu);
				console.info(angular.element('.resource_count'))
			}else{
				$scope.variablePacket.tabledata.quyu=[];
			}
		})
	}
//	根据学校id获取学生老师状态集合 areaId=officeid
	$scope.userRoleList = function(areaId,userType){
		$scope.variablePacket.changAreaId  = areaId;
		console.log($scope.variablePacket.changAreaId)
		//根据区域id查询角色资源情况
		console.log("areaid=:"+areaId+"-------------usertype=="+userType)
			$http.get(resourceStatistic+'user?areaId='+areaId+'&&userType='+userType+'&&starttime='+$scope.variablePacket.startTime+'&endtime='+$scope.variablePacket.endTime).success(function (data){
				console.log(data)
				if(data.code == 200){
					console.log("用户统计情况：")
					console.info(data.data.list);
					$scope.variablePacket.userData = data.data.list;
					angular.forEach(data.data.list,function(e,i){
						$scope.variablePacket.userData[i].totle=e.resource+e.quz+e.exam;
						$scope.variablePacket.userResourceTotal += e.resource;
						$scope.variablePacket.userQuzTotal += e.quz;
						$scope.variablePacket.userExamTotal += e.exam;
					})
					$scope.variablePacket.userFinallyTotal = $scope.variablePacket.userResourceTotal + $scope.variablePacket.userQuzTotal + $scope.variablePacket.userExamTotal;
				}
			})
	}
	
	$scope.shengdata = function() {
		$scope.variablePacket.tabledata = {
			"name": "黑龙江",
			"type": "province",
			"id": 2,
			"quyu": [{
					"id": 21,
					"name": "牡丹江市",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
				},
				{
					"id": 31,
					"name": "鹤岗市",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
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
			"resanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}, {
				"id": "4",
				"name": "政治",
				"totlenum": '35767',
				"y": 124565,
				"color": "#94ce48",
				"bili": "23%",
			}],
			"quzxititanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"extemanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"quyu": [{
					"id": 211,
					"name": "东安区",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
				},
				{
					"id": 311,
					"name": "西安区",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
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
			"resanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}, {
				"id": "4",
				"name": "政治",
				"totlenum": '35767',
				"y": 124565,
				"color": "#94ce48",
				"bili": "23%",
			}],
			"quzxititanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"extemanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 124565,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '35767',
				"y": 124565,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"quyu": [{
					"id": 2111,
					"name": "牡丹江第一小学",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
				},
				{
					"id": 3111,
					"name": "牡丹江第二小学",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
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
			"resanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '686',
				"y": 686,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '686',
				"y": 686,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '686',
				"y": 686,
				"color": "#ffdc04",
				"bili": "23%",
			}, {
				"id": "4",
				"name": "政治",
				"totlenum": '68',
				"y": 686,
				"color": "#94ce48",
				"bili": "23%",
			}],
			"quzxititanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '68',
				"y": 46,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '35767',
				"y": 167,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '146',
				"y": 124,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"extemanaly": [{
				"id": "1",
				"name": "语文",
				"totlenum": '123',
				"y": 155,
				"color": "#f9010d",
				"bili": "23%",
			}, {
				"id": "2",
				"name": "数学",
				"totlenum": '2345',
				"y": 124,
				"color": "#f9931f",
				"bili": "23%",
			}, {
				"id": "3",
				"name": "英语",
				"totlenum": '2456',
				"y": 123,
				"color": "#ffdc04",
				"bili": "23%",
			}],
			"quyu": [{
					"id": 12345,
					"name": "张三",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
				},
				{
					"id": 3111,
					"name": "李四",
					"resnum": 240,
					"xiti": 300,
					"shijuan": 400,
					"totle": 500
				}
			]
		};
	};


    var str = sessionStorage.getItem('managerSearch');
    var jsonO = $.parseJSON( str );
    var scope = jsonO.scope;
    var areaIdStr = "";
    var typeStr = "";
    var areaNameStr = "";
    if(scope >= 0){
        areaIdStr = 1;
        typeStr = "china";
        $scope.variablePacket.indexNum = 0;
        areaNameStr = "";
    }
    if(scope >= 1){
        if(scope == 2){
            $scope.variablePacket.citynav = true;
            $scope.variablePacket.cityname = jsonO.provinceName;
            $scope.variablePacket.cityId = jsonO.provinceId;
        }
        areaIdStr = jsonO.provinceId;

        typeStr = "province";
        $scope.variablePacket.indexNum = 1;
        areaNameStr = jsonO.provinceName;
    }
    if(scope >= 2){
        if(scope == 3){
            $scope.variablePacket.countynav = true;
            $scope.variablePacket.countyname = jsonO.cityName;
            $scope.variablePacket.countyId = jsonO.cityId;
        }

        areaIdStr = jsonO.cityId;
        typeStr = "city";
        $scope.variablePacket.indexNum = 2;
        areaNameStr = jsonO.cityName;
    }
    if(scope >= 3){
        if(scope == 4){
            $scope.variablePacket.schoolId = true;
            $scope.variablePacket.schoolname = jsonO.countyName;
            $scope.variablePacket.schoolId = jsonO.countyId;
        }
        areaIdStr = jsonO.countyId;
        typeStr = "county";
        $scope.variablePacket.indexNum = 3;
        areaNameStr = jsonO.countyName;
    }
    if(scope >= 4){
        areaIdStr = jsonO.officeId;
        typeStr = "school";
        $scope.variablePacket.indexNum = 4;
        areaNameStr = jsonO.officeName;
    }
    console.log("当前级别"+$scope.variablePacket.indexNum);
    $scope.findCityCount(areaIdStr,typeStr,areaNameStr)


	//饼状图资源
	var resocuedata = $scope.variablePacket.tabledata.resanaly;
	var pie_data_parent = {
		"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>资源<br>资源总量<br><span style='color:#007BEC'>0个</span></div>",
		"user": '资源',
		"subtitle": "",
		"data": resocuedata,
	};
	chart_pie_tooltip2('.chart_pie_ziyuan', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);

	//饼状图习题
	var xitidata = $scope.variablePacket.tabledata.quzxititanaly;
	var pie_data_parent = {
		"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>习题<br>资源总量<br><span style='color:#007BEC'>0个</span></div>",
		"user": '习题',
		"subtitle": "",
		"data": xitidata,
	};
	chart_pie_tooltip2('.chart_pie_xiti', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);

	//饼状图试卷
	var shijuandata = $scope.variablePacket.tabledata.extemanaly;
	var pie_data_parent = {
		"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>试卷<br>资源总量<br><span style='color:#007BEC'>0个</span></div>",
		"user": '试卷',
		"subtitle": "",
		"data": shijuandata
	};
	chart_pie_tooltip2('.chart_pie_shijuan', pie_data_parent.user, pie_data_parent.title, pie_data_parent.subtitle, pie_data_parent.data);
	
	
}]);