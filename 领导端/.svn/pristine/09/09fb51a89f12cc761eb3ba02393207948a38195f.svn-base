app.controller('classroomCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$interval, $stateParams,$rootScope) {
	//模拟数据
	$scope.variablePacket = {
		state: 0,
		classState:0,
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
		btnName: "按区县",
		guidanceArea: true,
		guidannavlist:[],
		activeid:"",
		sum: 123456789,
		jiaoanshow:false,
		jiaoshishow:false,
		type:"",
		id:""
	};

    //根据当前用户进来的有角色判断，需按角色查询显示//session中scope的值：1234代表省市区校，0代表全国
    var session_Obj = JSON.parse(sessionStorage.getItem("managerSearch"));
    var session_scope = session_Obj.scope;
    $scope.year = '';
    $.ajax({
        type: "get",
        url: jeucIp + "statistics/getStuYearList",
        async: false,
        success: function(jdata) {
            if(jdata.ret == 200) {
                $scope.variablePacket.schoolYear = jdata.data;
                 $scope.year = jdata.data[0].id;
                console.log($scope.year);
            }
        }
    });

    //切换学年时数据重新加载
    $scope.selectChange = function(years) {
        cityData(years,$scope.variablePacket.id,$scope.variablePacket.type);
        subjectGradeData(years,$scope.variablePacket.id);
        topThirty($scope.variablePacket.type,$scope.variablePacket.id,years);
        // monthDataFun($scope.variablePacket.id,$scope.variablePacket.type);
    }


    $rootScope.breadNav = function(sscope, id, name,type) { //区域导航切换

        if($.isEmptyObject(type)){
            if(sscope == "1"){
                // id = session_Obj.provinceId;
                // name = session_Obj.provinceName;
                type = "province";
			}else if(sscope == "2") {
                // id = session_Obj.cityId
                // name = session_Obj.cityName;
                type = "city";
			}else if(sscope == "3") {
                // id = session_Obj.countyId
                // name = session_Obj.countyName;
                type = "county";
			}else if(sscope == "4") {
                // id = session_Obj.officeId
                // name = session_Obj.officeName;
                type = "school";
			}

		}

        $scope.variablePacket.id = id;
        $scope.variablePacket.name = name;
        $scope.variablePacket.type = type;
        if(sscope == "0") {
            $rootScope.variableGlobal.crumbs.quanguo = true;
            $rootScope.variableGlobal.crumbs.provincenav = false;
            $rootScope.variableGlobal.crumbs.citynav = false;
            $rootScope.variableGlobal.crumbs.countynav = false;
            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $scope.variablePacket.jiaoanshow = false;
            //$scope.cityData();
        } else if(sscope == "1") {
            $rootScope.variableGlobal.crumbs.quanguo = true;
            $rootScope.variableGlobal.crumbs.provincenav = true;
            $rootScope.variableGlobal.crumbs.provincename = name;
            $rootScope.variableGlobal.crumbs.citynav = false;
            $rootScope.variableGlobal.crumbs.countynav = false;
            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $rootScope.variableGlobal.crumbs.cityname = "";
            $rootScope.variableGlobal.crumbs.countyname = "";
            $rootScope.variableGlobal.crumbs.schoolname = "";
            $scope.variablePacket.jiaoanshow = false;
            //$scope.cityData();
        } else if(sscope == "2") {
            $rootScope.variableGlobal.crumbs.quanguo = false;
            $rootScope.variableGlobal.crumbs.provincenav = false;
            $rootScope.variableGlobal.crumbs.citynav = true;
            $rootScope.variableGlobal.crumbs.countynav = false;
            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $rootScope.variableGlobal.crumbs.cityname = name;
            $rootScope.variableGlobal.crumbs.cityId = id;
            $rootScope.variableGlobal.crumbs.countyname = "";
            $rootScope.variableGlobal.crumbs.schoolname = "";
            $scope.variablePacket.jiaoanshow = false;
            //$scope.cityData();
        } else if(sscope == "3") {
            $rootScope.variableGlobal.crumbs.quanguo = false;
            $rootScope.variableGlobal.crumbs.provincenav = false;
            //如果当前角色==3，则最大显示当前角色
            if(session_scope == sscope) {
                $rootScope.variableGlobal.crumbs.citynav = false;
            } else {
                $rootScope.variableGlobal.crumbs.citynav = true;
            }
            $scope.variablePacket.jiaoanshow = false;
            $rootScope.variableGlobal.crumbs.countynav = true;
            $rootScope.variableGlobal.crumbs.schoolnav = false;
            $rootScope.variableGlobal.crumbs.countyname = name;
            $rootScope.variableGlobal.crumbs.countyId = id;
            $rootScope.variableGlobal.crumbs.schoolname = "";

            //$scope.cityData();
        } else if(sscope == "4") {
            $rootScope.variableGlobal.crumbs.quanguo = false;
            $rootScope.variableGlobal.crumbs.provincenav = false;
            //如果当前角色==3，则最大显示当前角色
            if(session_scope == sscope) {
                $rootScope.variableGlobal.crumbs.citynav = false;
                $rootScope.variableGlobal.crumbs.countynav = false;
            } else {
                $rootScope.variableGlobal.crumbs.citynav = true;
                $rootScope.variableGlobal.crumbs.countynav = true;
            }
            $rootScope.variableGlobal.crumbs.schoolnav = true;
            $rootScope.variableGlobal.crumbs.schoolname = name;
            $rootScope.variableGlobal.crumbs.schoolId = id;

            //$scope.cityData();
        } else {
            return;
        }
        yearData(id,type);
        cityData($scope.year,id,type);
    };
    if(session_scope == 1) {
        $rootScope.breadNav(session_scope, session_Obj.provinceId, session_Obj.provinceName,"province");
    } else if(session_scope == 2) {
        $rootScope.breadNav(session_scope, session_Obj.cityId, session_Obj.cityName,"city");
    } else if(session_scope == 3) {
        $rootScope.breadNav(session_scope, session_Obj.countyId, session_Obj.countyName,"county");
    } else if(session_scope == 4) {
        $rootScope.breadNav(session_scope, session_Obj.officeId, session_Obj.officeName,"school");
    } else {
        //全国
        $scope.variablePacket.quanguo = true;
        cityData($scope.year);
    }
	var nianjicoum, xuekecoum, zhedata; //柱状图data数据
	$scope.variablePacket.activeid =$stateParams.activeid;
	$scope.variablePacket.tablearea = "牡丹江市";
    //从接口中获取学年

	//切换选项卡
	$scope.changestate = function(n) {
		$scope.variablePacket.stateType = n;
		if(n == 1){
            topThirty($scope.variablePacket.type,$scope.variablePacket.id,$scope.year)
		}
	};
	//年级跟科目切换
	$scope.changeClassstate = function(n) {
			$scope.variablePacket.classState = n;
			$scope.variablePacket.guidanceArea = false;
			$scope.variablePacket.jiaoshishow = true;
			if(n == 0) {
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 500)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeSubjectColum();
				}, 500)
			}
	};
	//年趋势跟月趋势切换
	$scope.changeChartstate = function(n,id,type) {
		$scope.variablePacket.stateChart = n;
		if(n == 0) {
			$timeout(function() {
				$scope.changeZheline();
			}, 500)
		} else if(n == 1) {
			$timeout(function() {
                monthDataFun(id,type);
			}, 500)
		}
	}
    $scope.variablePacket.tabledata = {
        "name": "全国",
        "type": "china",
        "id": 1,
        "jiaoyan": [{
            "name": "课堂总量",
            "data": [
            ]
        }],
        "roleguidance": [],
        "quyu": [
        ]
    };
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.variablePacket.tabledata.quyu;
		vm.tabledata_user = $scope.variablePacket.tabledata.roleguidance;
		vm.OptionsOne = {
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
			order:[1,'desc']//第一个不排序,默认降序
		}
		vm.OptionsTwo = {
			paging: false, // 不分页
			info: false, // 不显示info
			searching: false, // 不显示搜索框
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0,1], //设置不需要排序的列，从0开始
				orderable: false
			}],
			order:[2,'desc']//第一个不排序,默认降序
		}
		})



    //点击省、市、区、县
	$scope.findCityCount = function(n,id, type,name) {
		if($.isEmptyObject(type) || type=="school"){
			return;
		}
		if(type == "china") {
			cityData($scope.year,id,"province");
			$scope.variablePacket.provincenav = true;
			$scope.variablePacket.provincename = name; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按城市";
            $scope.variablePacket.jiaoanshow = false;
            yearData(id,"province");
		} else if(type == "province") {

            cityData($scope.year,id,"city");
			$scope.variablePacket.citynav = true;
			$scope.variablePacket.cityname = name; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按区县";
            $scope.variablePacket.jiaoanshow = false;
            $rootScope.variableGlobal.crumbs.citynav=true;
            $rootScope.variableGlobal.crumbs.cityname = name;
            $rootScope.variableGlobal.crumbs.cityId = id;
            yearData(id,"city");
		} else if(type == "city") {
            cityData($scope.year,id,"county");
			$scope.variablePacket.countynav = true;
			$scope.variablePacket.countyname = name; //面包屑导航显示的名字
			$scope.variablePacket.btnName = "按学校";
            $scope.variablePacket.jiaoanshow = false;
            $rootScope.variableGlobal.crumbs.countynav=true;
            $rootScope.variableGlobal.crumbs.countyname = name;
            $rootScope.variableGlobal.crumbs.countyId = id;
            yearData(id,"county");
		} else if(type == "county") {
            cityData($scope.year,id,"school");
            subjectGradeData($scope.year,id);
			$scope.variablePacket.schooldata = false;
			$scope.variablePacket.schoolnav = true;
			$scope.variablePacket.restableshow = false;
			$scope.variablePacket.jiaoanshow = true;
			// $scope.variablePacket.guidanceArea = false;


            $rootScope.variableGlobal.crumbs.schoolnav=true;
            $rootScope.variableGlobal.crumbs.schoolname = name;
            $rootScope.variableGlobal.crumbs.schoolId = id;
            yearData(id,"school");
			//面包屑导航显示的名字
			$scope.variablePacket.schoolname = name;
		}

		//表头的省市区县名字
		$scope.variablePacket.tablearea = name;
        $scope.variablePacket.id=id;
        $scope.variablePacket.type=type;
		$timeout(function() {
			$scope.changeGradeColumn();
			$scope.changeZheline();
		}, 500)
	}


	//全国的数据
	$scope.quanguodata = function() {
		$scope.variablePacket.tabledata = {
			"name": "全国",
			"type": "china",
			"id": 1,
			"jiaoyan": [{
				"name": "课堂总量",
				"data": [
				]
			}],
			"roleguidance": [],
			"quyu": [
			]
		};
	};






	//区县数据
	// $scope.quxiandata = function() {
	// 	$scope.variablePacket.tabledata = {
	// 		"name": "东安区",
	// 		"type": "county",
	// 		"id": 211,
	// 		"jiaoyan": [{
	// 			"name": "课堂总量",
	// 			"data": [
	// 				70,
	// 				80,
	// 				100,
	// 				99,
	// 				18.4,
	// 				215,
	// 				25.2,
	// 				26.5,
	// 				233,
	// 				18.3,
	// 				13.9,
	// 			]
	// 		}],
	// 		"roleguidance": [{
	// 			"id": "1",
	// 			"name": "张三",
	// 			"school": "东安区第一小学",
	// 			"guidance": "100"
	// 		}, {
	// 			"id": "2",
	// 			"name": "李四",
	// 			"school": "东安区第二小学",
	// 			"guidance": "100"
	// 		}, {
	// 			"id": "3",
	// 			"name": "王五",
	// 			"school": "东安区第三小学",
	// 			"guidance": "100"
	// 		}, {
	// 			"id": "4",
	// 			"name": "赵六",
	// 			"school": "东安区第四小学",
	// 			"guidance": "100"
	// 		}],
	// 		"quyu": [{
	// 				"id": 2111,
	// 				"name": "牡丹江第一小学",
	// 				"totle": 240,
	// 			},
	// 			{
	// 				"id": 3111,
	// 				"name": "牡丹江第二小学",
	// 				"totle": 240,
	// 			}
	// 		]
	// 	};
    //
	// };



	$timeout(function() {
		$scope.changeZheline();
	}, 500)

	//年度趋势折线图
	var linedata = [{
		name:'课堂量',
		data: []
	}]
	var year=[];
	$scope.changeZheline = function() {
		var chart_line_user_data = {
			"colors": ["#d28703"],
			"title": "",
			"categories": year,
			"ytitle": "节次",
			"data": linedata,
			"parallel": []
		};
		chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,false,3);
	};
	//月度趋势折线图
	var monthlinedata = [{
		name:'课堂量',
		data: []
	}]
	var month =[];
	$scope.changemonthZheline = function() {


		var chart_line_user_data = {
			"colors": ["#d28703"],
			"title": "",
			"categories": month,
			"ytitle": "节数",
			"data": monthlinedata,
			"parallel": []
		};
		chart_line_tech('.chart_line_user', chart_line_user_data.colors, chart_line_user_data.title, chart_line_user_data.categories, chart_line_user_data.ytitle, chart_line_user_data.data,false,false,3);
	};


	//改变年级柱状图
	var gradeC=[];
	var gradeData=[];
	$scope.changeGradeColumn = function() {
		var chartData = {
			"categories": gradeC,
			"ytitle": "数量",
			"data": [{
				'color':'#f3b442',
				"data": gradeData
			}]
		};
		chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
	}

	//改变学科柱状图
	var subjectC=[];
    var subjectData=[];
	$scope.changeSubjectColum = function() {
		var chartData = {
			"categories": subjectC,
			"ytitle": "数量",
			"data": [{
				'color':'#f3b442',
				"data": subjectData
			}]
		};
		chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
	}
	
	function  yearData(id,type) {
		if ($.isEmptyObject(id)){
			id="";
		}
		if($.isEmptyObject(type)){
            type="";
		}
		var params = {id:id,type:type};
		$http.get(interfaceIpAddr+"lesson/yearData",{params:params}).success(function (jdata) {
			console.log(jdata);
			if (jdata.ret ==200){
                year = [];
                linedata[0].data = []
                angular.forEach(jdata.data,function (e,i) {
                    year.push(e.yearDay+"年");
                    linedata[0].data.push(e.count);
                });
			}
            $scope.changeZheline();
        })

    }

    function monthDataFun(id,type) {
        if ($.isEmptyObject(id)){
            id="";
        }
        if($.isEmptyObject(type)){
            type="";
        }
        var params = {id:id,type:type};
        $http.get(interfaceIpAddr+"lesson/monthData",{params:params}).success(function (jdata) {
            console.log(jdata);
            if (jdata.ret ==200){
                month = [];
                monthlinedata[0].data=[]
                angular.forEach(jdata.data,function (e,i) {
                    month.push(e.monthDay+"月");
                    monthlinedata[0].data.push(e.count);
                });
            }
            $scope.changemonthZheline()
        })
    }
    function cityData(year,id,type){
        var params = {schoolYear:year,id:id,type:type};
        $http.get(interfaceIpAddr+"lesson/cityAll",{params:params}).success(function (jdata) {
            $scope.variablePacket.tabledata.type = type;
            console.log(jdata);
            $scope.variablePacket.tabledata.quyu = jdata.data;
			var sum =0;
			angular.forEach(jdata.data,function (e,i) {
				sum+=e.totle;
			})
            $scope.variablePacket.sum =sum;
            $scope.variablePacket.type = type;
        })
	}
	function subjectGradeData(year,id) {
        var params = {schoolYear:year,id:id};
        $http.get(interfaceIpAddr+"lesson/subjectGrade",{params:params}).success(function (jdata) {
			console.log(jdata);
            gradeC = [];
            gradeData = [];
			angular.forEach(jdata.data.grade,function (e,i) {
                gradeC.push(e.grade);
                gradeData.push(e.count);
            });
            subjectC = [];
            subjectData = [];
            angular.forEach(jdata.data.subject,function (e,i) {
                subjectC.push(e.subject);
                subjectData.push(e.count);
            })
            $scope.changeGradeColumn();
        })
    }

    function topThirty(type,id,year) {
        var params = {type:type,schoolYear:year,id:id};
        $http.get(interfaceIpAddr+"lesson/topThree",{params:params}).success(function (jdata) {
			console.log(jdata);
            $scope.variablePacket.tabledata.roleguidance=jdata.data;
        })
    }
}]);
