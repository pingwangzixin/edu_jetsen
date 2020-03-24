app.controller('resourcesGrantCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$interval, $stateParams,$rootScope) {
	$scope.variablePacket = {
		state: 0,
		classState:0,
		school: true,
		statesType: 0,
		addtype: 1,
		sum: 0,
		tablearea:[],
		tabledata:{},
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
		areaId:'',
		scopeType:JSON.parse(sessionStorage.getItem('managerSearch')).scope,
		year:2018,
		chinaCode:"",
		provinceCode:"",
		cityCode:"",
		countyCode:"",
		areaCode:'',
		jiaoanshow:false
	};
	var nianjicoum, xuekecoum, zhedata; //柱状图data数据
	$scope.variablePacket.activeid =$stateParams.activeid;
	$scope.stuYearList = [];
	
	var sendStatistic = interfaceIpAddr+"resource";
	
	/**
	 * 查询学年
	 */
	$http.get(jeucIp+"statistics/getStuYearList").success(
		function(response){
			if(response.ret==200){
				$scope.stuYearList = response.data;
				$scope.selectedItem = $scope.stuYearList[0].id;
				$scope.variablePacket.year = $scope.stuYearList[0].id;
			}
		}
	)
	
	// 根区域id 查询区域下的区县数据
	$scope.findSendYearByParentAreaId = function(params) {
		$http.get(sendStatistic+"/sendResource",{params:params}).success(function(res) {
			if(res.code == 200) {
				$scope.variablePacket.tabledata.quyu = res.data.list;
				$scope.variablePacket.sum = res.data.count;
			}else {
				console.info("findSendYearByParentAreaId():获取数据失败");
			}
		})
	}
	
	// 倒叙 查询 学校老师的xiafa数量
	$scope.findTeaSendResource = function(par) {
		$http.get(sendStatistic+"/sendResourceTea",{params:par})
		.success(function(res) {
			if(res.code == 200) {
				$scope.variablePacket.tabledata.roleguidance = res.data;
			}else {
				console.info("findTeaSendResource():"+res.code);
			}
			
		})
	}
	
	// 根据学年查询
	$scope.changeStuYear = function(type,selectedItem) {
		if(type == 0) {
			$scope.variablePacket.year = selectedItem;
			var params = {type:'1',parentAreaId:$scope.variablePacket.areaCode,createTime:selectedItem};
			$scope.findSendYearByParentAreaId(params);
			var par = {areaId:$scope.variablePacket.areaCode,teaYear:selectedItem};
			$scope.findTeaSendResource(par);
		}else {
			var params = {type:'1',year:selectedItem,officeCode:$scope.variablePacket.areaCode};
			$scope.changeGradeColumn(params);
			var par = {type:'2',year:selectedItem,officeCode:$scope.variablePacket.areaCode};
			$scope.changeSubjectColum(par);
		}
		
	}
	
	//切换选项卡
	$scope.changestate = function(n,selectedItem) {
		$scope.variablePacket.stateType = n;
		if($scope.variablePacket.stateType == 0) {
			$timeout(function() {
				var params = {type:'1',parentAreaId:$scope.variablePacket.areaCode,createTime:selectedItem};
				$scope.findSendYearByParentAreaId(params);
			}, 500)
		}else {
			$timeout(function() {
				var par = {areaId:$scope.variablePacket.areaCode,teaYear:selectedItem};
				$scope.findTeaSendResource(par);
			}, 500)
		}
		$(".wx_table_userstic").width("100%")
	};
	//年级跟科目切换
	$scope.changeClassstate = function(n) {
		$scope.variablePacket.classState = n;
		if(n == 0) {
			$timeout(function() {
				var params = {type:'1',year:$scope.variablePacket.year,officeCode:$scope.variablePacket.areaCode};
				$scope.changeGradeColumn(params);
			}, 500)
		} else if(n == 1) {
			$timeout(function() {
				var params = {type:'2',year:$scope.variablePacket.year,officeCode:$scope.variablePacket.areaCode};
				$scope.changeSubjectColum(params);
			}, 500)
		}
	};
	//年趋势跟月趋势切换
	$scope.changeChartstate = function(n) {
		$scope.variablePacket.stateChart = n;
		if(n == 0) {
			$timeout(function() {
				var nianDate = {type:'1',areaId:$scope.variablePacket.areaCode};
				// 查询年
				$scope.findSendYear(nianDate);
			}, 500)
		} else if(n == 1) {
			$timeout(function() {
				var yueDate = {type:'2',areaId:$scope.variablePacket.areaCode,createTime:$scope.variablePacket.year,startTime:12};
				// 查询月  
				$scope.findSendMonth(yueDate);
			}, 500)
		}
	}
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.variablePacket.tabledata.quyu;
		vm.tabledata_user = $scope.variablePacket.tabledata.roleguidance;
		vm.dtOptions = {
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
			order:[1]
		}
	});
	
	
	//改变年级柱状图
	$scope.changeGradeColumn = function(params) {
		
		$http.get(sendStatistic+"/sendResourceGradeAndSubject",{params:params})
		.success(function(res) {
			var list = res.data;
			var gradeName = [];
			var gradeNo = [];
            angular.forEach(list, function(data){
            	gradeName.push(data.gradeName);
            	gradeNo.push(data.count);
            })
			$scope.insertGradeAndSubject(gradeName,gradeNo,0);
			
		})
		.error(function(e) {
			error(e)
		})
	}

	//改变学科柱状图
	$scope.changeSubjectColum = function(params) {
		
		$http.get(sendStatistic+"/sendResourceGradeAndSubject",{params:params})
		.success(function(res) {
			var list = res.data;
			var subjName = [];
			var subjNo = [];
            angular.forEach(list, function(data){
            	subjName.push(data.subjectName);
            	subjNo.push(data.count);
            })
			$scope.insertGradeAndSubject(subjName,subjNo,1);
			
		})
		.error(function(e) {
			error(e)
		})
		
	}

// 查询年度统计	
	$scope.findSendYear = function(params) {
		$http.get(sendStatistic+"/sendResource",{params:params})
			.success(function(res) {
				if(res.code == 200) {
					var list = res.data.list;
					var years = [];
					var count = [];
		            angular.forEach(list, function(data){
		            	years.push(data.createTime);
		            	count.push(data.count);
		            })
					
					//年度趋势折线图
					var linedata = [{
						name:'下发量',
						data: count
					}]
					$scope.insertYearAndMonth(linedata,years);
				}else {
					console.info("findSendYear():未获取数据");
				}
			})
	}
	
// 查询月度统计	
	$scope.findSendMonth = function(params) {
		$http.get(sendStatistic+"/sendResource",{params:params})
			.success(function(res) {
				console.info(res);
				if(res.code == 200) {
					var list = res.data.list;
					var yue = [];
					var count = [];
		            angular.forEach(list, function(data){
		            	var str = parseInt(data.createTime.substring(4))+"月"; 
		            	yue.push(str);
		            	count.push(data.count);
		            })
					//月度趋势折线图
					var monthlinedata = [{
						name:'下发量',
						data: count
					}]
					$scope.insertYearAndMonth(monthlinedata,yue);
				}else {
					console.info("findSendMonth():"+res.code);
				}
			})
	}
	
	
	// 点击区域  调用下一级操作
	$scope.findCityCountDate = function(areaId,areaName,type) {
		$scope.variablePacket.areaCode = areaId;
		getBtnName(areaId,areaName,type);
	}

	// 添加到年级 和学科统计图中
	$scope.insertGradeAndSubject = function(name,count,type) {
			var chartData = {
				"categories": name,
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": count
				}]
			};
			if(type == 0) {
            	chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
            }else {
            	chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
            }
	}
	
	
	
	// 年度统计 月度统计
	$scope.insertYearAndMonth = function(typeData,data) {
		var chart_line_user_data = {
			"colors": ["#399fdf"],
			"title": "",
			"categories":data,
			"ytitle": "次数",
			"data": typeData,
			"parallel": []
		};
		chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,false,2,);
	}
	
	
	// 根据学校areaID查询 学校下教师下发数据
	$scope.findTeaSendResourceByOaid = function(params) {
		$http.get(sendStatistic+"/sendResourceTea",{params:params})
		.success(function(res) {
			var list = [];
			var count = 0;
			angular.forEach(res.data,function(data) {
				count += data.resource;
				var pojo = {'areaId':data.userId,'areaName':data.userName,'count':data.resource};
				list.push(pojo);
			})
			$scope.variablePacket.sum = count;
			$scope.variablePacket.tabledata.quyu = list;
		})
		.error(function(e) {
			error(e)
		})
	}
	
	
	// 根据登录者 显示不同的登入者
	switch ($scope.variablePacket.scopeType) {
		case 0:
			$scope.variablePacket.tabledata.type = "province";
			break;
		case 1:
			$scope.variablePacket.areaId = JSON.parse(sessionStorage.getItem('managerSearch')).provinceId;
			$scope.variablePacket.areaCode = JSON.parse(sessionStorage.getItem('managerSearch')).provinceId;
			$scope.variablePacket.tablearea = JSON.parse(sessionStorage.getItem('managerSearch')).provinceName;
			
			$rootScope.variableGlobal.crumbs.provincenav = true;
			$rootScope.variableGlobal.crumbs.provincename = JSON.parse(sessionStorage.getItem('managerSearch')).provinceName;
			$scope.variablePacket.tabledata.name = JSON.parse(sessionStorage.getItem('managerSearch')).provinceName;
			$scope.variablePacket.tabledata.type = "city";
			$scope.variablePacket.provinceCode = $scope.variablePacket.areaId;
			
			var params = {type:'1',parentAreaId:$scope.variablePacket.areaId,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);
			var nianDate = {type:'1',areaId:$scope.variablePacket.areaId};
			$scope.changeChartstate($scope.variablePacket.stateChart);
			break;
		case 2:
			$scope.variablePacket.areaId = JSON.parse(sessionStorage.getItem('managerSearch')).cityId;
			$scope.variablePacket.areaCode = JSON.parse(sessionStorage.getItem('managerSearch')).cityId;
			$scope.variablePacket.tablearea = JSON.parse(sessionStorage.getItem('managerSearch')).cityName;
			$rootScope.variableGlobal.crumbs.provincenav = false; 	// 省 导航
			$rootScope.variableGlobal.crumbs.citynav = true;		// 市 导航
			$rootScope.variableGlobal.crumbs.cityname = JSON.parse(sessionStorage.getItem('managerSearch')).cityName;
			$scope.variablePacket.tabledata.name = JSON.parse(sessionStorage.getItem('managerSearch')).cityName;
			$scope.variablePacket.tabledata.type = "county";
			$scope.variablePacket.cityCode = $scope.variablePacket.areaId;
			
			var params = {type:'1',parentAreaId:$scope.variablePacket.areaId,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var nianDate = {type:'1',areaId:$scope.variablePacket.areaId};
			$scope.changeChartstate($scope.variablePacket.stateChart);
			break;
		case 3:
			$scope.variablePacket.areaId = JSON.parse(sessionStorage.getItem('managerSearch')).countyId;
			$scope.variablePacket.areaCode = JSON.parse(sessionStorage.getItem('managerSearch')).countyId;
			$scope.variablePacket.tablearea = JSON.parse(sessionStorage.getItem('managerSearch')).countyName;
			$rootScope.variableGlobal.crumbs.provincenav = false; 	// 省 导航
			$rootScope.variableGlobal.crumbs.citynav = false;		// 市 导航
			$rootScope.variableGlobal.crumbs.countynav = true;		// 县 导航
			$rootScope.variableGlobal.crumbs.countyname = JSON.parse(sessionStorage.getItem('managerSearch')).countyName;
			$scope.variablePacket.tabledata.name = JSON.parse(sessionStorage.getItem('managerSearch')).countyName;
			$scope.variablePacket.tabledata.type = "school";
			$scope.variablePacket.countyCode = $scope.variablePacket.areaId;
			
			var params = {type:'1',parentAreaId:$scope.variablePacket.areaId,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var nianDate = {type:'1',areaId:$scope.variablePacket.areaId};
			$scope.changeChartstate($scope.variablePacket.stateChart);
			break;
		case 4:
			$scope.variablePacket.areaId = JSON.parse(sessionStorage.getItem('managerSearch')).officeCode;
			$scope.variablePacket.areaCode = JSON.parse(sessionStorage.getItem('managerSearch')).officeCode;
			$scope.variablePacket.tablearea = JSON.parse(sessionStorage.getItem('managerSearch')).officeName;
			$rootScope.variableGlobal.crumbs.provincenav = false; 	// 省 导航
			$rootScope.variableGlobal.crumbs.citynav = false;		// 市 导航
			$rootScope.variableGlobal.crumbs.countynav = false;		// 县 导航
			$rootScope.variableGlobal.crumbs.schoolnav = true;
			$rootScope.variableGlobal.crumbs.schoolname = JSON.parse(sessionStorage.getItem('managerSearch')).officeName;
			$scope.variablePacket.tabledata.name = JSON.parse(sessionStorage.getItem('managerSearch')).officeName;
			$scope.variablePacket.tabledata.type = "";
			$scope.variablePacket.btnName = "";
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.restableshow = false;
			$scope.variablePacket.jiaoanshow = true;
			$scope.variablePacket.tabledata.type= "";
			
			var param = {areaId:$scope.variablePacket.areaId,teaYear:$scope.variablePacket.year};
			$scope.findTeaSendResourceByOaid(param);//获取学校的数据
			var nianDate = {type:'1',areaId:$scope.variablePacket.areaId};
			$scope.changeChartstate($scope.variablePacket.stateChart);
			var params = {type:'1',year:$scope.variablePacket.year,officeCode:$scope.variablePacket.areaId};
			$scope.changeGradeColumn(params);		// 年级统计
			break;
	}
	
	
	
	function getBtnName(areaId,areaName,type) {
			switch (type) {
				case "china":
					$scope.variablePacket.btnName = "按省";
					$scope.variablePacket.tabledata.type = "province";
					$scope.variablePacket.chinaCode = areaId;
					var params = {type:'1',parentAreaId:areaId,createTime:$scope.variablePacket.year};
					$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
					var nianDate = {type:'1',areaId:areaId};
					$scope.changeChartstate($scope.variablePacket.stateChart);
//					$scope.findSendYear(nianDate);				// 年度统计
					break;
				case "province":
					$rootScope.variableGlobal.crumbs.provincenav = true;
					$rootScope.variableGlobal.crumbs.provincename = areaName;
					$scope.variablePacket.tabledata.name = areaName;
					$scope.variablePacket.btnName = "按城市";
					$scope.variablePacket.tabledata.type = "city";
					$scope.variablePacket.provinceCode = areaId;
					var params = {type:'1',parentAreaId:areaId,createTime:$scope.variablePacket.year};
					$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
					var nianDate = {type:'1',areaId:areaId};
					$scope.changeChartstate($scope.variablePacket.stateChart);
//					$scope.findSendYear(nianDate);				// 年度统计
					break;
				case "city":
					$scope.variablePacket.btnName = "按区县";
					$rootScope.variableGlobal.crumbs.citynav = true;
					$rootScope.variableGlobal.crumbs.cityname = areaName;
					$scope.variablePacket.tabledata.name = areaName;
					$scope.variablePacket.tabledata.type = "county";
					$scope.variablePacket.cityCode = areaId;
					var params = {type:'1',parentAreaId:areaId,createTime:$scope.variablePacket.year};
					$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
					var par = {type:'1',areaId:areaId};
					$scope.changeChartstate($scope.variablePacket.stateChart);
//					$scope.findSendYear(par);				// 年度统计
					break;
				case "county":
					$scope.variablePacket.btnName = "按学校";
					$rootScope.variableGlobal.crumbs.countynav = true;	// 县 导航
					$rootScope.variableGlobal.crumbs.countyname = areaName;
					$scope.variablePacket.tabledata.name = areaName;
					$scope.variablePacket.tabledata.type = "school";
					$scope.variablePacket.countyCode = areaId;
					var params = {type:'1',parentAreaId:areaId,createTime:$scope.variablePacket.year};
					$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
					var nianDate = {type:'1',areaId:areaId};
//					$scope.findSendYear(nianDate);				// 年度统计
					$scope.changeChartstate($scope.variablePacket.stateChart);
					break;
				case "school":
					$scope.variablePacket.btnName = "";
					$scope.variablePacket.schooldata = false;
					$rootScope.variableGlobal.crumbs.schoolnav = true;
					$rootScope.variableGlobal.crumbs.schoolname = areaName;
					$scope.variablePacket.tabledata.name = areaName;
					$scope.variablePacket.restableshow = false;
					$scope.variablePacket.jiaoanshow = true;
					$scope.variablePacket.tabledata.type= "";
					var param = {areaId:areaId,teaYear:$scope.variablePacket.year};
					$scope.findTeaSendResourceByOaid(param);//获取学校的数据
					var nianDate = {type:'1',areaId:areaId};
//					$scope.findSendYear(nianDate);				// 年度统计
					$scope.changeChartstate($scope.variablePacket.stateChart);
					var params = {type:'1',year:$scope.variablePacket.year,officeCode:areaId};
					$scope.changeGradeColumn(params);		// 年级统计
					break;
			}
	}
	
	
	/**
	 * 点击区域导航
	 * @param {Object} type
	 */
	$rootScope.breadNav = function(type) {
		if($scope.variablePacket.scopeType > type){
            return ;
        }
		if(type == 0) {
			$scope.variablePacket.tabledata.name = '全国';
			$scope.variablePacket.tabledata.type = 'province';
			$rootScope.variableGlobal.crumbs.provincenav = false;
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
			$scope.variablePacket.jiaoanshow = false;
			$scope.variablePacket.btnName = "按省";
			$scope.variablePacket.areaCode = $scope.variablePacket.chinaCode;
			var params = {type:'1',parentAreaId:$scope.variablePacket.chinaCode,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var par = {type:'1',areaId:$scope.variablePacket.chinaCode};
			$scope.changeChartstate($scope.variablePacket.stateChart);
//			$scope.findSendYear(par);					// 年度统计
		} else if(type == 1) {
//			$scope.variablePacket.tabledata.name =  $scope['breadNavName'+type];
			$scope.variablePacket.tabledata.name =  $rootScope.variableGlobal.crumbs.provincename;
			$scope.variablePacket.tabledata.type =  'city';
			$rootScope.variableGlobal.crumbs.citynav = false;
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
			$scope.variablePacket.jiaoanshow = false;
			$scope.variablePacket.btnName = "按城市";
			$scope.variablePacket.areaCode = $scope.variablePacket.provinceCode;
			var params = {type:'1',parentAreaId:$scope.variablePacket.provinceCode,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var par = {type:'1',areaId:$scope.variablePacket.provinceCode};
			$scope.changeChartstate($scope.variablePacket.stateChart);
//			$scope.findSendYear(par);					// 年度统计
		} else if(type == 2) {
			$scope.variablePacket.tabledata.name =  $rootScope.variableGlobal.crumbs.cityname;
			$scope.variablePacket.tabledata.type = 'county';
			$rootScope.variableGlobal.crumbs.countynav = false;
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = false;
			$scope.variablePacket.jiaoanshow = false;
			$scope.variablePacket.btnName = "按区县";
			$scope.variablePacket.areaCode = $scope.variablePacket.cityCode;
			var params = {type:'1',parentAreaId:$scope.variablePacket.cityCode,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var par = {type:'1',areaId:$scope.variablePacket.cityCode};
//			$scope.findSendYear(par);					// 年度统计
			$scope.changeChartstate($scope.variablePacket.stateChart);
		} else if(type == 3) {
			$scope.variablePacket.tabledata.name =  $rootScope.variableGlobal.crumbs.countyname;
			$scope.variablePacket.tabledata.type =  'school';
			$rootScope.variableGlobal.crumbs.schoolnav = false;
			$scope.variablePacket.schooldata = true;
			$scope.variablePacket.showschooldata = true;
			$scope.variablePacket.jiaoanshow = false;
			$scope.variablePacket.btnName = "按学校";
			$scope.variablePacket.areaCode = $scope.variablePacket.countyCode;
			var params = {type:'1',parentAreaId:$scope.variablePacket.countyCode,createTime:$scope.variablePacket.year};
			$scope.findSendYearByParentAreaId(params);	// 查询区域下的数据
			var par = {type:'1',areaId:$scope.variablePacket.countyCode};
//			$scope.findSendYear(par);					// 年度统计
			$scope.changeChartstate($scope.variablePacket.stateChart);
		}
	}
}]);