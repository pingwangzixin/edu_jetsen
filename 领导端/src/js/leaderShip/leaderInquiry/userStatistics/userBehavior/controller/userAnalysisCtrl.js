app.controller('userAnalysisCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams','$rootScope', function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
//		var obj = {
//		   "userId":"f56e325d1034429e900227dbe7fdb691",
//		   "scope": 3,
//		   "provinceId":"888314e8207f440a8d369ac8aa021120",
//		   "provinceName":"黑龙江省",
//		   "cityId":"78881913d0ce4b05b4a6b6455325a392",
//		   "cityName":"牡丹江市",
//		   "countyId":"37872e8c80374ce2a0a19fb4df7fc0dd",
//		   "countyName":"东安区",
//		   "officeId":"470",
//		   "officeName":"东宁县实验小学"
//	}
//	sessionStorage.setItem("managerSearch",JSON.stringify(obj));
	var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'))
	var scope = managerSearch.scope;
	$rootScope.variableGlobal.crumbs.citynav = false;
	
	/**
	 * 变量
	 */
	$scope.variablePacket = {
		areaType : 'city',
		userType : '1',
		behaviorAvgTable:[],
		schooldata:true,
		tabledata : {quyu : [],areaType:''},
		privinceNavCode : '',
		cityNavCode : '',
		countyNavCode : '',
		officeNavCode : '',
	}
	
	/**
	 * 请求参数
	 */
	$scope.params = {
		areaId : '',
		areaName : '',
		areaType : ''
	}
	
	/**
	 * 加载折线图
	 */
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#399fdf", "#d18604", "#c72036"],
			"title": "",
			"categories": [],
			"ytitle": "活跃率",
			"data": [{
						name: '教师',
						data: []
					}, {
						name: '学生',
						data: []
					}, {
						name: '家长',
						data: []
					}],
			"parallel": []
		};
		$http.get(interfaceIpAddr+"/behavior/area/avg/"+$scope.params.areaId+"?type="+$scope.variablePacket.areaType).success(function(resJson){
			if(resJson.ret==200){
				var data = resJson.data;
				chart_line_user_data.categories = data.yearList;
				chart_line_user_data.data[0].data = data.teaAvgList;
				chart_line_user_data.data[1].data = data.stuAvgList;
				chart_line_user_data.data[2].data = data.parentAvgList;
			}
			chart_line('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data);
		})
	};
	
	/**
	 * 查询学年
	 */
	$http.get(jeucIp+"statistics/getStuYearList").success(
		function(response){
			if(response.ret==200){
				$scope.stuYearList = response.data;
				$scope.selectedItem = $scope.stuYearList[0].startTime+"|"+$scope.stuYearList[0].endTime;
			}
		}
	)
	
	/**
	 * 切换学年
	 */
	$scope.changeStuYear = function(){
		var stuYear = $scope.selectedItem;
		var dates = stuYear.split("|");
		$scope.startTime = dates[0];
		$scope.endTime = dates[1];
		$scope.changepai();
		if(scope!= '4'){
			$scope.getUserAvgOnlineTimeList();
		}
	}
	
	var colors=['#5F9EA0','#f9931f','#CAFF70','#636363','#298e3f',
				'#f9010d','#f9931f','#ffdc04','#94ce48','#298e3f',
				'#FFB6C1','#FF00FF','#EEC591','#E0FFFF','#CDCD00',
				'#AB82FF','#00008B','#8B6508','#9A32CD','#A52A2A',
				'#EEEE00','#F08080','#CD6600','#BBFFFF','#B03060',
				'#7FFFD4','#698B69','#00FA9A','#BBFFFF','#EEEE00']
	/**
	 * 切换饼图
	 */
	$scope.changepai = function() {
		var teadata=[]
		var avg = 0;
		var areaType = 'area';
		var userTypeName = '教师'
		if($scope.variablePacket.areaType == "office"){
			areaType = 'office';
		}
		if($scope.variablePacket.userType == '2'){
			userTypeName = '学生'
		}else if($scope.variablePacket.userType == '3'){
			userTypeName = '家长'
		}
		var avgUrl = interfaceIpAddr+"/behavior/"+areaType+"/"+$scope.variablePacket.userType+"/"+$scope.params.areaId
		if($scope.startTime!=undefined && $scope.endTime!=undefined){
			avgUrl+="?beginDate="+$scope.startTime+"&endDate="+$scope.endTime;
		}
		$scope.variablePacket.behaviorAvgTable = [];
		//查询用户行为分析数据
		$http.get(avgUrl).success(function(resJson){
			if(resJson.ret==200){
				var result = resJson.data.list;
				avg = resJson.data.avg;
				angular.forEach(result,function(obj,index){
					var behaviorObj = {};
					behaviorObj.name = obj.moduleName;
					behaviorObj.times =  obj.avg;
					behaviorObj.pcduan = obj.pc;
					behaviorObj.y = parseFloat(obj.percentage);
					behaviorObj.yidongduan = obj.mobile;
					behaviorObj.bili = Math.floor(obj.percentage*100*100)/100; 
					behaviorObj.color = colors[index];
					$scope.variablePacket.behaviorAvgTable.push(behaviorObj);
				})
			}
			var pie_data = {
				"title": "<div style='font-size:2rem;color:#333333;text-align:center;z-index:-1;'>"+userTypeName+"<br>人均在线时常为<br><span style='color:#007BEC'>"+avg+"小时</span></div>",
				"user": userTypeName,
				"subtitle": "",
				"data": $scope.variablePacket.behaviorAvgTable
			};
			chart_pie_tooltip('.chart_pie_teacher', pie_data.user, pie_data.title, pie_data.subtitle, pie_data.data);
		})
	};
	
	/**
	 * 根据区域编号查询子区域的教师、学生、家长平均在线时长列表
	 * @param {Object} areaId
	 */
	$scope.getUserAvgOnlineTimeList = function(){
		var url = interfaceIpAddr + "/behavior/area/"+$scope.params.areaId;
		if($scope.startTime!=undefined && $scope.endTime!=undefined){
			url+="?beginDate="+$scope.startTime+"&endDate="+$scope.endTime;
		}
		$http.get(url).success(function(data){
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
	
	//选项卡切换
	$scope.changestate = function(n) {
		$scope.variablePacket.userType = $scope.variablePacket.statesType = n;
		$scope.changepai();
	};
	
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
					$scope.variablePacket[$scope.variablePacket.areaType+'NavCode'] =  response.data.id;
				}
				$scope.changeZheline();
				$scope.changestate(1);
				$rootScope.variableGlobal.crumbs[$scope.variablePacket.areaType+'Id']=$scope.params.areaId;
				if(scope!= '4'){
					$scope.getUserAvgOnlineTimeList();
					$scope.variablePacket.schooldata = true;
				}else{
					$scope.variablePacket.schooldata = false;
				}
			}
		)
	}

	
	/**
	 * 初始化数据图表
	 */
	$scope.initChartTable = function(){
		switch (scope){
			case 0:
				$scope.params.areaId = '1';
				$scope.params.areaName = '全国';
				$scope.variablePacket.areaType = 'china';
				$scope.variablePacket.tabledata.areaType = 'province';
				break;
			case 1:
				$scope.params.areaId = managerSearch.provinceId;
				$scope.variablePacket.areaType = 'province';
				$scope.variablePacket.tabledata.areaType = 'city';
				$scope.params.areaName =  managerSearch[$scope.variablePacket.areaType+'Name'];
				break;
			case 2:
				$scope.params.areaId = managerSearch.cityId;
				$scope.variablePacket.areaType = 'city';
				$scope.variablePacket.tabledata.areaType = 'county';
				$scope.params.areaName =  managerSearch[$scope.variablePacket.areaType+'Name'];
				break;
			case 3:
				$scope.params.areaId = managerSearch.countyId;
				$scope.variablePacket.areaType = 'county';
				$scope.variablePacket.tabledata.areaType = 'office';
				$scope.params.areaName =  managerSearch[$scope.variablePacket.areaType+'Name'];
				break;
			case 4:
				$scope.params.areaId = managerSearch.officeId;
				$scope.variablePacket.areaType = 'office';
				$scope.params.areaName =  managerSearch[$scope.variablePacket.areaType+'Name'];
				break;
			default:
				break;
		}
		var areaType = $scope.variablePacket.areaType;
		if(areaType == 'office'){
			areaType = 'school';
		}
		$rootScope.variableGlobal.crumbs[areaType+'name']=$scope.params.areaName;
		$rootScope.variableGlobal.crumbs[areaType+'nav']=true;
		$scope.getAreaIdByCode();
	}
	
	//初始化图表
	$scope.initChartTable(); 
	
	/**
	 * 点击省、市、区、县
	 */
	$scope.findCityCount = function(n, name) {
		$scope.params.areaId = n;
		$scope.params.areaName = name;
		var areaType = $scope.variablePacket.tabledata.areaType;
		if(areaType == 'office'){
			areaType = 'school';
		}
		if($scope.variablePacket.tabledata.areaType != 'office'){
			$scope.getUserAvgOnlineTimeList();
			$scope.variablePacket.schooldata = true;
			$scope.params.areaType = '';
			$scope.variablePacket.areaType = $scope.variablePacket.tabledata.areaType;
		}else{
			$scope.variablePacket.schooldata = false;
			$scope.params.areaType = 'office';
			$scope.variablePacket.areaType = 'office';
		}
		$scope.variablePacket[$scope.variablePacket.areaType+'NavCode'] = n;
		$scope.variablePacket[$scope.variablePacket.areaType+'Name'] = name;
		$scope.changeZheline();
		$scope.changestate(1);
		$rootScope.variableGlobal.crumbs[areaType+'Id']=$scope.params.areaId;
		$rootScope.variableGlobal.crumbs[areaType+'name']=$scope.params.areaName;
		$rootScope.variableGlobal.crumbs[areaType+'nav']=true;
		switch ($scope.variablePacket.tabledata.areaType){
			case 'china':
				$scope.variablePacket.tabledata.areaType = 'province';
				break;
			case 'province':
				$scope.variablePacket.tabledata.areaType = 'city';
				break;
			case 'city':
				$scope.variablePacket.tabledata.areaType = 'county';
				break;
			case 'county':
				$scope.variablePacket.tabledata.areaType = 'office';
				break;
			default:
				break;
		}
	}
	
	/**
	 * 点击导航
	 * @param {Object} type
	 */
	$rootScope.breadNav = function(type,id,name) {
		if(type < scope) {
			return;
		}
		switch (type){
			case 0:
				$rootScope.variableGlobal.crumbs.provincenav = false;
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.tabledata.areaType = 'province';
				break;
			case 1:
				$scope.variablePacket.areaType = 'province';
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.tabledata.areaType = 'city';
				break;
			case 2:
				$scope.variablePacket.areaType = 'city';
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.tabledata.areaType = 'county';
				break;
			case 3:
				$scope.variablePacket.areaType = 'county';
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.tabledata.areaType = 'office';
				break;
			case 4:
				$scope.variablePacket.areaType = 'office';
				break;
			default:
				break;
		}
		$scope.params.areaId = id;//$scope.variablePacket[$scope.variablePacket.areaType+'NavCode'];
		$scope.params.areaName = name;//$scope.variablePacket[$scope.variablePacket.areaType+'Name'];
		$scope.changeZheline();
		$scope.changestate(1);
		if($scope.variablePacket.areaType != 'office'){
			$scope.getUserAvgOnlineTimeList();
			$scope.variablePacket.schooldata = true;
		}else{
			$scope.variablePacket.schooldata = false;
		}
	}
}]);