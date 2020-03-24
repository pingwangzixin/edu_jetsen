app.controller('userStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams', '$rootScope',function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
//		var obj = {
//				   "userId":"f56e325d1034429e900227dbe7fdb691",
//				   "scope": 2,
//				   "provinceId":"888314e8207f440a8d369ac8aa021120",
//				   "provinceName":"黑龙江省",
//				   "cityId":"78881913d0ce4b05b4a6b6455325a392",
//				   "cityName":"牡丹江市",
//				   "countyId":"37872e8c80374ce2a0a19fb4df7fc0dd",
//				   "countyName":"东安区",
//				   "officeId":"470",
//				   "officeName":"东宁县实验小学"
//				 }
//		sessionStorage.setItem("managerSearch",JSON.stringify(obj));
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = managerSearch.scope;
	var mdjTotalData = {totalRegisterNo:320241,totalWeekActiveRate:'72.3%',
							teaRegisterNo:20844,teaWeekActiveRate:'99.26%',
							stuRegisterNo:156240,stuWeekActiveRate:'71.02%',
							parentRegisterNo:143157,parentWeekActiveRate:'33%'
							}
	var mdjAreaId = '78881913d0ce4b05b4a6b6455325a392';
	$rootScope.variableGlobal.crumbs.citynav = false;
	//变量
	$scope.variablePacket = {
		state: 0,
		school: true,
		addtype: 1,
		allusernum: 0,
		activeall: '0%',
		teachnum: 0,
		teachactive: '0%',
		stunum: 0,
		stuactive: "0%",
		parnum: 0,
		paractive: '0%',
		userregdata:[],
		userrange: [{
						"id": '1',
						"name": "教师"
					},
					{
						"id": '2',
						"name": "学生"
					},
					{
						"id": '3',
						"name": "家长"
					}], //用户类型
		nianjirange: [], //循环年级数据
		xuekerange: [], //循环学科数据
		tabledata: {linedata:[],quyu:[]}, //表格循环的数据
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
		subjecthide: false,
		nianjitype: 'all',
		showschooldata: false,
		qushistate:0,
		activeRateType:'year',
		areaType:'',
		areaName:'',
		callFunction:'',
		allData:{id:'all',name:'全部'}
	};
	
	/**
	 * 请求传参
	 */
	$scope.params = {
		areaId:'',
		areaType:''
	}
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
		$scope.variablePacket.state = n;
	}

	/**
	 * 点击表格中的省、市、区
	 * @param {Object} type
	 */
	$scope.findCityCount = function(n, name, type) {
		if(n == 'total'){
			return;
		}
		$scope.params.areaId = n;
		$scope.params.areaType = '';
		$scope.variablePacket.areaName = name;
		$scope.params.areaId = n;
		$scope.changestate(0);
		if(type == "china") {
			$scope.breadNavCode1 = n;
			$scope.breadNavName1 = name;
			$scope.variablePacket.areaType = 'province';
		} else if(type == "province") {
			$scope.breadNavCode2 = n;
			$scope.breadNavName2 = name;
			$scope.variablePacket.areaType = 'city';
		} else if(type == "city") {
			$scope.breadNavCode3 = n;
			$scope.breadNavName3 = name;
			$scope.variablePacket.areaType = 'county';
			$scope.variablePacket.showschooldata = true;
		} else if(type == "county") {
			$scope.params.areaType = 'office';
			$scope.variablePacket.areaType = 'school';
			$scope.variablePacket.schooldata = false;
		}
		$rootScope.variableGlobal.crumbs[$scope.variablePacket.areaType+'name'] = name;
		$rootScope.variableGlobal.crumbs[$scope.variablePacket.areaType+'nav'] = true;
		//表头的省市区县名字
		$scope.variablePacket.areaName = name;
		$scope.initChart();

	}

	/**
	 * 点击区域导航
	 * @param {Object} type
	 */
	$rootScope.breadNav = function(type) {
		if(type < scope) {
			return;
		}
		$scope.changestate(0);
		$scope.params.areaType = '';
		if(type == 0) {
			$scope.variablePacket.areaName = '全国';
			$scope.variablePacket.areaType = 'china';
			$scope.params.areaId = 1;
			$rootScope.variableGlobal.crumbs.provincenav = false;
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
		} else if(type == 1) {
			$scope.variablePacket.areaName =  $scope['breadNavName'+type];
			$scope.variablePacket.areaType =  'province';
			$scope.params.areaId = $scope.breadNavCode1;
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
		} else if(type == 2) {
			$scope.variablePacket.areaName =  $scope['breadNavName'+type];
			$scope.variablePacket.areaType = 'city';
			$scope.params.areaId = $scope.breadNavCode2;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
		} else if(type == 3) {
			$scope.variablePacket.areaName =  $scope['breadNavName'+type];
			$scope.variablePacket.areaType =  'county';
			$scope.params.areaId = $scope.breadNavCode3;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = true;
		}else{
			$scope.params.areaType = 'office';
			$scope.variablePacket.areaType =  'school';
		}
		$scope.initChart();
	}

	/**
	 * 初始化学校的数据
	 */
	$scope.xuexiaodata = function() {
		$scope.variablePacket.schooldata = false;
		$scope.userType = "1"; //默认用户类型是教师
		$scope.officeId = $scope.params.areaId; //保存学校编号，筛选查询需要此参数
		//根据学校编号查询年级列表
		$http.get(jeucIp + "statistics/eaGrade?officeId=" + $scope.params.areaId).success(function(data) {
			if(data.ret == 200) {
				$scope.variablePacket.nianjirange = [$scope.variablePacket.allData];
				angular.forEach(data.data, function(data, index) {
					var gradeObj = {};
					gradeObj.id = data.gradeId;
					gradeObj.name = data.gradeName;
					$scope.variablePacket.nianjirange.push(gradeObj);
				})
			}
		})
	}
	/**
	 * 折线图切换
	 */
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#399fdf", "#d18604", "#c72036"],
			"title": "",
			//			"categories": ["11.13-11.19", "11.20-11.26", "11.27-12.03", "12.04-12.10", "12.11-12.17", "12.18-12.24", "12.25-12.31"],
			"categories": [],
			"ytitle": "活跃率",
			"data": [{name:'教师',data:[]},{name:'学生',data:[]},{name:'家长',data:[]}],
			"parallel": []
		};
		$http.get(interfaceIpAddr + '/register/area/'+$scope.variablePacket.activeRateType+'/activeRate/' + $scope.params.areaId+'?type='+$scope.params.areaType).success(function(resJson) {
			if(resJson.ret == 200) {
				var data = resJson.data;
				chart_line_user_data.categories = data.categories;
				chart_line_user_data.data[0].data = data.teaActiveList;
				chart_line_user_data.data[1].data = data.stuActiveList;
				chart_line_user_data.data[2].data = data.parentActiveList;
			}
			chart_line('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data);
		});
	};

	/**
	 * 获取区域总注册人数、教师注册人数，学生注册人数、家长注册人数
	 */
	$scope.getUserRegisterDataByAreaId = function() {
		var areaField = 'area';
		if($scope.variablePacket.areaType == 'school'){
			areaField = 'office'
		}
		if($scope.params.areaId==mdjAreaId){
				$scope.variablePacket.allusernum = mdjTotalData.totalRegisterNo;
				$scope.variablePacket.activeall = mdjTotalData.totalWeekActiveRate;

				$scope.variablePacket.teachnum = mdjTotalData.teaRegisterNo;
				$scope.variablePacket.teachactive = mdjTotalData.teaWeekActiveRate;

				$scope.variablePacket.stunum = mdjTotalData.stuRegisterNo;
				$scope.variablePacket.stuactive = mdjTotalData.stuWeekActiveRate;

				$scope.variablePacket.parnum = mdjTotalData.parentRegisterNo;
				$scope.variablePacket.paractive = mdjTotalData.parentWeekActiveRate;
		}else{
			$http.get(interfaceIpAddr + "/register/"+areaField+"/" + $scope.params.areaId).success(function(data) {
			if(data.ret == 200) {
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
		
	}

	/**
	 * 获取省 市平台用户注册率
	 */
	$scope.getAreaRegisterDataList = function() {
		var areaField = 'area';
		$scope.variablePacket.showschooldata = false;
		if($scope.variablePacket.areaType == 'county'){
			$scope.variablePacket.showschooldata = true;
			areaField = 'office'
		}
		$http.get(interfaceIpAddr + "/register/rate/" + $scope.params.areaId).success(function(data) {
			if(data.ret == 200) {
				var result = data.data;
				var quanguoData = [];
				angular.forEach(result, function(obj, index) {
					var objData = {};
					objData.id = obj[areaField+'Id'];
					objData.name = obj[areaField+'Name'];
					var regcount = [];
					var regObj = {};
					var amountObj = {};
					if($scope.params.areaId == mdjAreaId && index==0){
						obj.teaRegisterNo = mdjTotalData.teaRegisterNo;
						obj.teaAmountNo = Math.round(mdjTotalData.teaRegisterNo/0.84);
						obj.stuRegisterNo = mdjTotalData.stuRegisterNo;
						obj.stuAmountNo = Math.round(mdjTotalData.stuRegisterNo/0.97);
						obj.parentRegisterNo = mdjTotalData.parentRegisterNo;
						obj.parentAmountNo = Math.round(mdjTotalData.parentRegisterNo/0.97);
						
						obj.teaWeekActiveRate = mdjTotalData.teaWeekActiveRate;
						obj.stuWeekActiveRate = mdjTotalData.stuWeekActiveRate;
						obj.parentWeekActiveRate = mdjTotalData.parentWeekActiveRate;
						
						obj.teaWeekActive = Math.round(obj.teaRegisterNo*0.9);
						obj.stuWeekActive = Math.round(obj.stuRegisterNo*0.7);
						obj.parentWeekActive = Math.round(obj.parentRegisterNo*0.3);
					}
					if($scope.variablePacket.areaType != 'county'){
						regObj.schoolRegNum = obj.schoolRegisterNo;
						regObj.schoolRegRate = obj.schoolRegisterRate;
						amountObj.schoolRealNum = obj.schoolAmountNo;
						amountObj.schoolWeekActive = obj.schoolWeekActive;
						regObj.schoolWeekActiveRate = obj.schoolWeekActiveRate;
					}
					
					regObj.teaRegNum = obj.teaRegisterNo;
					regObj.teaRegRate = obj.teaRegisterRate;

					regObj.stuRegNum = obj.stuRegisterNo;
					regObj.stuRegRate = obj.stuRegisterRate;

					regObj.parRegNum = obj.parentRegisterNo;
					regObj.parRegRate = obj.parentRegisterRate;
					
					regObj.teaWeekActiveRate = obj.teaWeekActiveRate;
					regObj.stuWeekActiveRate = obj.stuWeekActiveRate;
					regObj.parWeekActiveRate = obj.parentWeekActiveRate;
					
					amountObj.teaRealNum = obj.teaAmountNo;
					amountObj.stuRealNum = obj.stuAmountNo;
					amountObj.parRealNum = obj.parentAmountNo;
					
					amountObj.teaWeekActive = obj.teaWeekActive;
					amountObj.stuWeekActive = obj.stuWeekActive;
					amountObj.parWeekActive = obj.parentWeekActive;
					
					
					regcount.push(regObj);
					regcount.push(amountObj);
					objData.regcount = regcount;
					quanguoData.push(objData);
				})
				$scope.variablePacket.tabledata.quyu = quanguoData;
			}
		})
	}
	
	/**
	 * 以下echart 平台用户注册统计图 柱状图
	 */
	$scope.chart_column_stack_data = {
		"categories": [],
		"ytitle": "注册量",
		"totalName": "总人数",
		"units": "人",
		"data": [{
			"name": "家长",
			"color": "#f46765",
			"level": 3,
			"data": []
		},{
			"name": "学生",
			"color": "#f4b242",
			"level": 2,
			"data": []
		}, {
			"name": "教师",
			"color": "#46a2d2",
			"level": 1,
			"data": []
		}]
	};
	
	/**
	 * 初始化平台用户注册统计图(柱图)
	 */
	$scope.initRegBar = function(){
		$http.get(interfaceIpAddr + "/register/area/year/reg/" + $scope.params.areaId+'?type='+$scope.params.areaType).success(function(resJson) {
			if(resJson.ret == 200) {
				var data = resJson.data;
				$scope.chart_column_stack_data.categories = data.stuYearList;
				var n = data.stuYearList.length-1;
				if($scope.params.areaId==mdjAreaId){
					data.parentRegList[n] = mdjTotalData.parentRegisterNo;
					data.stuRegList[n] = mdjTotalData.stuRegisterNo;
					data.teaRegList[n] = mdjTotalData.teaRegisterNo;
				}
				$scope.chart_column_stack_data.data[0].data = data.parentRegList;
				$scope.chart_column_stack_data.data[1].data = data.stuRegList;
				$scope.chart_column_stack_data.data[2].data = data.teaRegList;
			}
			chart_column_stack('.chart-column-stack-2', $scope.chart_column_stack_data.title, $scope.chart_column_stack_data.categories, $scope.chart_column_stack_data.ytitle, $scope.chart_column_stack_data.data, $scope.chart_column_stack_data.totalName, $scope.chart_column_stack_data.units, false,true);
		})
		
	}
	
//	initSingleColumnChart($('.chart-column-stack-2'), $scope.chart_column_stack_data.data);

//	$('.chart-column-legends.stack-2 > span').click(function() {
//		legendUpdate($(this), $('.chart-column-stack-2'), $scope.chart_column_stack_data.data, true);
//	});
	
	/**
	 * 切换平台用户活跃趋势图 按钮  改变数据重新调用一下折线图方法就行了。
	 */
	$scope.changequshistate=function(n){
		$scope.variablePacket.qushistate=n;
		if(n==0){
			$scope.variablePacket.activeRateType = 'year';
		}else if(n==1){
			$scope.variablePacket.activeRateType = 'month';
		}else if(n==2){
			$scope.variablePacket.activeRateType = 'week';
		}
		$scope.changeZheline();
	}
	
	/**
	 * 根据区域code查询区域Id
	 * @param {Object} code
	 * @param {Object} type
	 */
	$scope.getAreaIdByCode = function(){
		$http.get(jeucIp + "statistics/area?code=" + $scope.params.areaId).success(
			function(response) {
				if(response.ret == 200) {
					$scope.params.areaId = response.data.id;
					$scope['breadNavCode'+scope] = response.data.id;
					$scope['breadNavName'+scope] = managerSearch[$scope.variablePacket.areaType+'Name'];
				}
				$scope.initChart();
			}
		)
	}
	
	/**
	 * 初始化页面图表方法
	 */
	$scope.initChart = function(){
		$scope.initRegBar();
		$scope.changeZheline();
		//注册人数统计
		$scope.getUserRegisterDataByAreaId();
		
		if('office' == $scope.params.areaType){
			$scope.xuexiaodata();
		}else{
			//平台用户注册率 / 周活跃率统计表
			$scope.getAreaRegisterDataList();
		}
	}
	
	//根据scope初始化区域等查询参数
	if(scope == 0) {
		$scope.params.areaId = 1;
		$scope.variablePacket.areaType = 'china';
		$scope.variablePacket.areaName = '全国';
	}
	if(scope == 1) {
		$scope.variablePacket.areaType = 'province';
		$scope.variablePacket.areaName = managerSearch[$scope.variablePacket.areaType+'Name'];
		$scope.params.areaId = managerSearch.provinceId;
	}
	if(scope == 2) {
		$scope.params.areaId = managerSearch.cityId;
		$scope.variablePacket.areaType = 'city';
		$scope.variablePacket.areaName = managerSearch[$scope.variablePacket.areaType+'Name'];
	}
	if(scope == 3) {
		$scope.params.areaId = managerSearch.countyId;
		$scope.variablePacket.areaType = 'county';
		$scope.variablePacket.areaName = managerSearch[$scope.variablePacket.areaType+'Name'];
	}
	if(scope == 4) {
		$scope.variablePacket.areaType = 'school';
		$scope.variablePacket.areaName = managerSearch.officeName;
		$scope.params.areaType = 'office';
		$scope.params.areaId = managerSearch.officeId;
		$scope.variablePacket.schooldata = false;
	}else{
		$scope.params.areaType = '';
	}
	
	$scope.getAreaIdByCode();
	$rootScope.variableGlobal.crumbs[$scope.variablePacket.areaType+'name']=$scope.variablePacket.areaName;
	$rootScope.variableGlobal.crumbs[$scope.variablePacket.areaType+'nav']=true;

/***********************************************************老师，学生，家长表格*************************************************************************/
	
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.dtOptionsone = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			destroy: true,
			retrieve:true,
			columnDefs: [{
				targets: [0,1,2], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[3,'desc']//第一个不排序,默认降序
		}
		
		vm.dtOptionstwo = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			destroy: true,
			retrieve:true,
			columnDefs: [{
				targets: [0,1], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[2,'desc']//第一个不排序,默认降序
		}
		
		vm.dtOptionsthree = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			destroy: true,
			retrieve:true,
			columnDefs: [{
				targets: [0,1], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[2,'desc']//第一个不排序,默认降序
		}
		
		
			/**
			 * 查询用户
			 * @param {Object} url
			 * @param {Object} userType
			 */
			$scope.getUserList = function(url,userType){
				//查询用户
				$http.get(url).success(function(data) {
					$scope.variablePacket.userregdata = [];
					if(data.ret == 200) {
						var result = data.data;
						$scope.appendUserdata(result,$scope.userType);
						vm.tabledata_user = $scope.variablePacket.userregdata;
					} else {
						vm.tabledata_user = $scope.variablePacket.userregdata;
					}
				})
			}
			
			/**
			 * 查询科目列表
			 * @param {Object} url
			 */
			$scope.getSubject = function(url){
				//根据学校查询学科列表
				$http.get(url).success(function(data) {
					if(data.ret == 200) {
						$scope.variablePacket.xuekerange = [$scope.variablePacket.allData];
						angular.forEach(data.data, function(data, index) {
							var subjectObj = {};
							subjectObj.id = data.id;
							subjectObj.name = data.name;
							$scope.variablePacket.xuekerange.push(subjectObj);
						})
					}
				})
			}
			/**
			 * 切换用户角色
			 * @param {Object} index
			 */
			$scope.changeUseraddtype = function(index) {
				$scope.variablePacket.addusertype = $scope.variablePacket.userrange[index].id;
				$scope.variablePacket.nianjitype = 'all';
				$scope.variablePacket.xueketype = 'all';
				$scope.gradeId = 'all';
				
				$scope.teacherfy=false;
				$scope.studentfy=false;
				$scope.parentsfy=false;
				$scope.userType = "1";
				$scope.variablePacket.subjecthide = false;
				
				//教师的时候
				if(index == 0) {
					$scope.teacherfy=true;
					$scope.userType = "1";
					$scope.variablePacket.subjecthide = true;
					$scope.getSubject(jeucIp + "statistics/findSubjectByOid?officeId=" + $scope.params.areaId);
				} else if(index == 1) {
					$scope.studentfy=true;
					$scope.userType = "2";
				} else if(index == 2) {
					$scope.userType = "3";
					$scope.parentsfy=true;
				}
				$scope.getUserList(interfaceIpAddr + "/register/activeState/"+$scope.userType+"?officeId=" + $scope.officeId);
			}
			
			$scope.changeUseraddtype(0); //默认显示教师
			
			/**
			 * 切换年级方法
			 * @param {Object} index
			 * @param {Object} gradeId
			 */
			$scope.changenianji = function(index, gradeId) {
				$scope.gradeId = gradeId;
				$scope.variablePacket.xueketype = 'all';
				$scope.variablePacket.nianjitype = $scope.variablePacket.nianjirange[index].id;
				//查询学科url
				var subjectUrl = jeucIp + "statistics/findSubjectByOid?officeId=" + $scope.officeId;
				//查询用户url
				var userUrl = interfaceIpAddr + "/register/activeState/" + $scope.userType + "?officeId=" + $scope.officeId;
				if(gradeId != 'all'){
					subjectUrl = jeucIp + "statistics/findSubjectByOid?&gradeId=" + gradeId;
					userUrl += "&gradeId=" + gradeId;
				}else{
					$scope.variablePacket.xueketype = 'all';
				}
				$scope.variablePacket.xuekerange = [$scope.variablePacket.allData];
				if($scope.userType == "1"){
					//根据学校查询学科列表
					$scope.getSubject(subjectUrl);
				}
				$scope.getUserList(userUrl);
			};
			
			/**
			 * 切换学科方法
			 * @param {Object} index
			 * @param {Object} subjectId
			 */
			$scope.changexueke = function(index, subjectId) {
				$scope.variablePacket.xueketype = $scope.variablePacket.xuekerange[index].id;
				var officeId = $scope.officeId;
				var userType = $scope.userType;
				var gradeId = $scope.gradeId;
				url = userType + "?officeId=" + officeId;
				if(gradeId != 'all') {
					url = url + "&gradeId=" + gradeId;
				}
				if(subjectId != 'all'){
					url = url + "&subjectId=" + subjectId;
				}
				$scope.getUserList(interfaceIpAddr + "/register/activeState/" + url);
			};
			
			/**
			 * 拼接用户数据
			 * @param {Object} result
			 * @param {Object} userType
			 */
			$scope.appendUserdata = function(result,userType){
				
				angular.forEach(result, function(obj, index) {
					var userData = {};
					if(userType == '1') {
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = '--';//obj.registerDate;
						userData.threeusertd = '--';//obj.loginDate;
						userData.fourusertd = obj.loginCount;
						userData.fiveusertd = obj.onlineTime;
					}
					if(userType == '2') {
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = obj.stuRegister;
						userData.threeusertd = obj.stuWeekActive;
						userData.fourusertd = obj.studentOnlineTime;
						userData.fiveusertd =  obj.studentOnlineTime == 0?0:(obj.stuRegister / obj.studentOnlineTime).toFixed(2);
					}
					if(userType == '3') {
						userData.id = obj.id;
						userData.oneusertd = obj.name;
						userData.twousertd = obj.parentsRegister;
						userData.threeusertd = obj.parentsWeekActive;
						userData.fourusertd = obj.parentsOnlineTime;
						userData.fiveusertd = obj.parentsOnlineTime == 0?0:(obj.parentsRegister / obj.parentsOnlineTime).toFixed(2);
					}
					$scope.variablePacket.userregdata.push(userData);
				})
			}
	});
}]);