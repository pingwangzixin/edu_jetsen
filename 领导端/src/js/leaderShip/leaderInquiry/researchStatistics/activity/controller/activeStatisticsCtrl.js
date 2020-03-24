app.controller('activeStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams','$rootScope',
	function($scope, $state, $timeout, $http, $location, $interval, $stateParams,$rootScope) {
		
		//模拟数据
		$scope.variablePacket = {
			typeIfShow:false, //类型收起展开的切换
			stateChart:0,
			state: 0,
			school: true,
			statesType: 0,
			xueduanrange: [],
			xueduanelect: true,
			xueduantype: 5,
			schoolshow: true,
			addtype: 1,
			provincenav: false,
			citynav: false,
			countynav: false,
			schoolnav: false,
			tablearea: '牡丹江市',
			sum: 0,
			scholldatashow:false,
			schoolYear:[],
			year : '',		//从接口中获取学年
			studyyear: '',
			id : '',
			type : '',
//			primaryschoolone : [],
//			primaryschooltwo : []
			dataThead:[],
			dataTbody:[],
			provinceid:'',
			cityid:'',
			countyid:'',
			schoolid:''
		};
		$scope.year='';
		
		$.ajax({
			type:"get",
			url:jeucIp+"statistics/getStuYearList",
			async:false,
			success:function(jdata){
				if(jdata.ret == 200){
					var stuYearList = [{"name":"全部","id":""}];
					angular.forEach(jdata.data,function(e,i){
	                    stuYearList.push({"name":e.id+"学年","id":e.id})
	                })
					$scope.variablePacket.studyyear="全部";
					$scope.variablePacket.schoolYear = stuYearList;
					$scope.year=$scope.variablePacket.schoolYear[0];
				}
			}
		});
		//类型收起展开的切换
		$scope.typeIfShow = function(){
			$scope.variablePacket.typeIfShow = !$scope.variablePacket.typeIfShow; 
		}
		//类型数据
//		$scope.typeData = {
//			dataThead : $scope.variablePacket.dataThead,
//			dataTbody : $scope.variablePacket.dataTbody,
//		}
//		$scope.typeData = {
//			dataThead : [{'name':'学科'},{'name':'语文'},{'name':'数学'},{'name':'英语'},{'name':'美术'},{'name':'音乐'},{'name':'体育'},{'name':'化学'},{'name':'物理'}],
//			dataTbody : [
//				{'name':'活动量','type1':310,'type2':310,"type3":310,"type4":310,"type5":310,"type6":310,"type7":310,"type8":310},
//			],
//		}
		//切换学年时数据重新加载
		$scope.selectChange = function(year) {
			$scope.variablePacket.studyyear=year;
			$scope.getSubsetStatistics($scope.variablePacket.id,$scope.variablePacket.type );
		}
		//年趋势跟月趋势切换
		$scope.changeChartstate = function(n) {
			$scope.variablePacket.stateChart = n;
			if(n == 0) {
				$timeout(function() {
					$scope.changeYearZheline();
				}, 1000)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			}
		}
		$scope.changeYear = function(){
			var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'));
				var scope = managerSearch.scope;
				$scope.variablePacket.provinceid = managerSearch.provinceId;
				$scope.variablePacket.cityid = managerSearch.cityId;
				$scope.variablePacket.countyid= managerSearch.countyId;
				$scope.variablePacket.schoolid= managerSearch.officeId;
				if(scope==0){
					$scope.id = 1;
				}
				if(scope==1){
					$scope.id = managerSearch.provinceId ;
					$scope.type = 'china'
					$rootScope.variableGlobal.crumbs.provincenav = true;
					$rootScope.variableGlobal.crumbs.provincename = managerSearch.provinceName;
				}
				if(scope==2){
					$scope.id = managerSearch.cityId;
					$scope.type = 'province'
					$rootScope.variableGlobal.crumbs.citynav = true;
					$rootScope.variableGlobal.crumbs.cityname = managerSearch.cityName;
				}
				if(scope==3){
					$scope.id = managerSearch.countyId;
					$scope.type = 'city'
					$rootScope.variableGlobal.crumbs.countynav = true;
					$rootScope.variableGlobal.crumbs.countyname = managerSearch.countyName;
				}
				if(scope==4){
					$scope.id = managerSearch.officeId;
					$scope.type = 'county'
					$rootScope.variableGlobal.crumbs.schoolnav = true;
					$rootScope.variableGlobal.crumbs.schoolname = managerSearch.officeName;
				}
		}
		$scope.changeYear();

		var subjectdata, level, level_1, level_2, level_3;
		
		var teachStatistic = interfaceIpAddr+"/teachActivity/";

		$scope.getSubsetStatistics = function(id,type) {
			
			a = "1";
			if (!angular.isDefined(id)) {
				id = $scope.id;
			}
			if (!angular.isDefined(type)) {
				type = $scope.type;
			}
			$scope.variablePacket.id = id;
			$scope.variablePacket.type = type;
			var date = $scope.variablePacket.studyyear.replace("学年","");
			if(date=="全部"){
				date = "";
			}else{
				var j = parseInt(date)+1;
				date=date+"-"+j;
			}
			$http.get(teachStatistic+id+"?date="+date+"&type="+type).success(function (data){
				if(data.ret == 200){
					data = data.data;
					//折线数据
//					var month = $scope.variablePacket.jiaoyandata;
//					var year = $scope.variablePacket.jiaoyandatayear;
//					if(month == undefined &&  year == undefined){
						$scope.variablePacket.jiaoyandata = data.brokenLine.month;
						$scope.variablePacket.jiaoyandatayear = data.brokenLine.year;
//					}
					
					$scope.variablePacket.tabledata.type = data.type;
					if(data.type=="office"){
						$scope.variablePacket.scholldatashow = true;
					}
					//柱状图数据
					level = data.level.level;
					$scope.separateLevel(level);
					level_1 = data.level.level_1;
					level_2 = data.level.level_2;
					level_3 = data.level.level_3;
					//子节点数据
					$scope.variablePacket.sum = 0;
					$scope.variablePacket.tabledata.quyu = data.subset;
					angular.forEach($scope.variablePacket.tabledata.quyu, function(data, index, array) {
						$scope.variablePacket.sum += array[index].totlenum;
					});
				}
				$timeout(function() {
					$scope.changeSubjectColum();
					$scope.changeChartstate(0);
				}, 1000)
				
			});
		}

		$scope.getSubsetStatistics();

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

		$scope.xueduanall = function() {
			$scope.variablePacket.xueduanelect = true;
			$scope.variablePacket.xueduantype = 5;
			$scope.separateLevel(level);
//			$scope.variablePacket.tabledata.primaryschool = level;
			$scope.variablePacket.sum = 0;
				angular.forEach(level, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
			$timeout(function() {
//				$scope.paichartchange();
				$scope.changeSubjectColum();
			}, 1000)
		}
		
		$scope.separateLevel = function(level){
//			$scope.variablePacket.primaryschoolone =  []
//			$scope.variablePacket.primaryschooltwo =  []
//			var i = level.length/2;
//			var j = Math.ceil(i);
//			if(i==0.5){
//				$scope.variablePacket.primaryschoolone = level
//			}else if(i>=1){
//				
//				for (var  i = 0;i < j-1;i++) {
//					$scope.variablePacket.primaryschoolone.push(level[i]);
//				};
////				console.log($scope.variablePacket.primaryschoolone.push(level[i]));
//				for (var  i = j;i < level.length-1;i++) {
//					$scope.variablePacket.primaryschooltwo.push(level[i]);
//				}
////				console.log($scope.variablePacket.primaryschooltwo.push(level[i]));
//			}
			var dataThead = [];
			var subjTempArr = [];
            var subjTempNum = [];
			$scope.variablePacket.categories =  [];
		    $scope.variablePacket.categoriesData =  [];
		    console.log(level.length)
			angular.forEach(level,function(e,j){
				var xueke = {};
				var times = {};
				xueke.name = e.name;
				xueke.type = e.times;
				if($scope.variablePacket.categories.length < 10){
					$scope.variablePacket.categories.push(e.name);
					$scope.variablePacket.categoriesData.push(e.times);
				}
				
				subjTempArr.push(e.name);
                subjTempNum.push(e.times);
                if(j%8 == 7){
                    var obj = {};
                    obj.subjTempArr = subjTempArr;
                    obj.subjTempNum = subjTempNum;
                    subjTempArr = [];
                    subjTempNum = [];
                    dataThead.push(obj);
           		}
			});
			 if(subjTempArr.length > 0){
                    var obj = {};
                    obj.subjTempArr = subjTempArr;
                    obj.subjTempNum = subjTempNum;
                    dataThead.push(obj);
             }
			$scope.variablePacket.dataThead = dataThead;
			console.log(dataThead)
			
		}
		
		$scope.changexueduan = function(n) {
			if (n == 0) {
				$scope.separateLevel(level_1);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_1, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
			} else if (n == 1) {
//				$scope.variablePacket.tabledata.primaryschool = level_2;
				$scope.separateLevel(level_2);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_2, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
			} else if (n == 2) {
				$scope.separateLevel(level_3);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_3, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
			}
			$scope.variablePacket.xueduantype = n;
			$scope.variablePacket.xueduanelect = false;
		}
		//调用dataTable
		app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.variablePacket.tabledata.quyu;
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
		}})
		//点击省、市、区、县
		$scope.findCityCount = function(id,areaName, type) {
			$scope.getSubsetStatistics(id,type);
			if (type == "china") {
				$scope.shengdata(); //获取省的数据
				$rootScope.variableGlobal.crumbs.provincenav = true;
				$rootScope.variableGlobal.crumbs.provincename = areaName; //面包屑导航显示省的名字
				$scope.variablePacket.provinceid = id;
			} else if (type == "province") {
				$scope.shidata(); //获取市的数据
				$rootScope.variableGlobal.crumbs.citynav = true;
				$rootScope.variableGlobal.crumbs.cityname = areaName; //面包屑导航显示城市的名字
				$scope.variablePacket.cityid = id;
			} else if (type == "city") {
				$scope.quxiandata(); //获取区县的数据
				$rootScope.variableGlobal.crumbs.countynav = true;
				$rootScope.variableGlobal.crumbs.countyname = areaName; //面包屑导航显示区县的名字
				$scope.variablePacket.countyid = id;
				$scope.paichartchange();
			} else if (type == "county") {
				$scope.variablePacket.scholldatashow=true;
				$scope.variablePacket.schooldata = false;
				$rootScope.variableGlobal.crumbs.schoolnav = true;
				$scope.xuexiaodata(); //获取学校的数据
				$rootScope.variableGlobal.crumbs.schoolname = areaName; //面包屑导航显示学校的名字
				$scope.variablePacket.schoolid = id;
				$scope.variablePacket.schoolshow = false;
			}
			$scope.variablePacket.tablearea = areaName;  //标题名字
			$scope.variablePacket.tabledata.id = id;
			$scope.changeYearZheline();
		};

		$scope.paichartchange = function() {
			leveldata = $scope.variablePacket.tabledata.primaryschool;
			var pie_data_66 = {
				"title": "<div style='padding-top:25px;font-size:2rem;color:#333333;text-align:center'>教研活动总计 </br>"+$scope.variablePacket.sum+"</div>",
				"subtitle": "",
				"data": leveldata
			};
			chart_pie_tooltip('.chart-pie-66', pie_data_66.title, pie_data_66.subtitle, pie_data_66.data);
		}
		
		
		//导航条点击事件
		$rootScope.breadNav = function(type) {
			if (type == 0) {
				$scope.getSubsetStatistics(0,type);
				$scope.quanguodata();
				$rootScope.variableGlobal.crumbs.provincenav = false;
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.tablearea = "全国"; //标题名字
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
			} else if (type == 1) {
				$scope.type="china";
				$scope.getSubsetStatistics($scope.variablePacket.provinceid,$scope.type);
				$scope.shengdata();
				$rootScope.variableGlobal.crumbs.citynav = false;
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.provincename;//标题名字
			} else if (type == 2) {
				$scope.type="province";
				$scope.getSubsetStatistics($scope.variablePacket.cityid,$scope.type);
				$scope.shidata();
				$rootScope.variableGlobal.crumbs.countynav = false;
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.cityname;//标题名字
			} else if (type == 3) {
				$scope.type="city";
				$scope.getSubsetStatistics($scope.variablePacket.countyid,$scope.type);
				$scope.quxiandata();
				$rootScope.variableGlobal.crumbs.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
				$scope.variablePacket.tablearea = $rootScope.variableGlobal.crumbs.countyname;//标题名字
			} 
			$scope.changeYearZheline();
		}

		//全国的数据
		$scope.quanguodata = function() {
			$scope.variablePacket.tabledata = {
				"name": "全国",
				"type": "china",
				"id": 1,
				"jiaoyan": $scope.variablePacket.jiaoyandata,
				"primaryschoolone": subjectdata,
				"primaryschooltwo": subjectdata,
				"quyu": $scope.variablePacket.quyu,
			}
		};

		

		$scope.shengdata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "province",
				"id": 2,
				"jiaoyan": $scope.variablePacket.jiaoyandata,
				"primaryschoolone": subjectdata,
				"primaryschooltwo": subjectdata,
				"quyu": $scope.variablePacket.quyu,
			}

		};

		//市数据
		$scope.shidata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "city",
				"id": 3,
				"jiaoyan": $scope.variablePacket.jiaoyandata,
				"primaryschoolone": subjectdata,
				"primaryschooltwo": subjectdata,
				"quyu": $scope.variablePacket.quyu,
			}

		};

		//区县数据
		$scope.quxiandata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "county",
				"id": 4,
				"jiaoyan": $scope.variablePacket.jiaoyandata,
				"primaryschoolone": subjectdata,
				"primaryschooltwo": subjectdata,
				"quyu": $scope.variablePacket.quyu
			}

		};

		//学校的数据
		$scope.xuexiaodata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "school",
				"id": 5,
				"jiaoyan": $scope.variablePacket.jiaoyandata,
				"primaryschoolone": subjectdata,
				"primaryschooltwo": subjectdata,
				"quyu": $scope.variablePacket.quyu
			}

		};
		$scope.shidata();
		
		//月份折线图
		$scope.changeZheline = function() {
			var color = ["#44a3d1"];
			var chart_zhexian = {
				"title": "",
				"categories": ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": $scope.variablePacket.jiaoyandata
			};
			chart_line_tech('#containerChart3', color, chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, 1,chart_zhexian.min, true, false);
		};
		//年份折线图
		$scope.changeYearZheline = function() {
			var color = ["#44a3d1"];
			var chart_zhexian = {
				"title": "",
				"categories": ["2015年", "2016年", "2017年", "2018年", "2019年"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": $scope.variablePacket.jiaoyandatayear
			};
			chart_line_tech('#containerChart2', color, chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, 1,chart_zhexian.min, true, false);
		};
		//改变学科柱状图
		$scope.changeSubjectColum = function() {
			var chartData = {
				"categories": $scope.variablePacket.categories,
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": $scope.variablePacket.categoriesData,
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		}
	}
]);