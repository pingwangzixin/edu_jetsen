app.controller('activeStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams',
	function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
		
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
			primaryschoolone : [],
			primaryschooltwo : []
		};
		$scope.year='';
		
		$.ajax({
			type:"get",
			url:jeucIp+"statistics/getStuYearList",
			async:false,
			success:function(jdata){
				if(jdata.ret == 200){
					$scope.variablePacket.studyyear=jdata.data[0].name;
					$scope.variablePacket.schoolYear = jdata.data;
					$scope.year=$scope.variablePacket.schoolYear[0];
				}
			}
		});
		//类型收起展开的切换
		$scope.typeIfShow = function(){
			$scope.variablePacket.typeIfShow = !$scope.variablePacket.typeIfShow; 
		}
		//类型数据
		$scope.typeData = {
			dataThead : [{'name':'学科'},{'name':'语文'},{'name':'数学'},{'name':'英语'}],
			dataTbody : [
			 	{'type':310},
			 	{'type':310},
			 	{'type':110}
			],
		}
		//切换学年时数据重新加载
		$scope.selectChange = function(year) {
			$scope.variablePacket.studyyear=year;
//			$scope.findCityCount();
//			$scope.variablePacket.scholldatashow = false;
			$timeout(function() { 
				$scope.changeSubjectColum();
				$scope.changeYearZheline();
				$scope.xueduanall();
			}, 1500)
//			$scope.variablePacket.provincenav = false;
//			$scope.variablePacket.citynav=false;
//			$scope.variablePacket.countynav=false;
//			$scope.variablePacket.schoolnav=false;
			$scope.getSubsetStatistics($scope.variablePacket.id,$scope.variablePacket.type );
		}
		//年趋势跟月趋势切换
		$scope.changeChartstate = function(n) {
			$scope.variablePacket.stateChart = n;
			if(n == 0) {
				$timeout(function() {
					$scope.changeYearZheline();
				}, 500)
			} else if(n == 1) {
				$timeout(function() {
					$scope.changeZheline();
				}, 500)
			}
		}
		$scope.changeYear = function(){
			var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'));
				var scope = managerSearch.scope;
				if(scope==0){
					$scope.id = 1;
					$scope.variablePacket.chinanav = true;
				}
				if(scope==1){
					$scope.id = managerSearch.provinceId ;
					$scope.type = 'china'
					$scope.variablePacket.provincenav = true;
					$scope.variablePacket.provincename = managerSearch.provinceName;
				}
				if(scope==2){
					$scope.id = managerSearch.cityId;
					$scope.type = 'province'
					$scope.variablePacket.citynav = true;
					$scope.variablePacket.cityname = managerSearch.cityName;
				}
				if(scope==3){
					$scope.id = managerSearch.countyId;
					$scope.type = 'city'
					$scope.variablePacket.countynav = true;
					$scope.variablePacket.countyname = managerSearch.countyName;
				}
				if(scope==4){
					$scope.id = managerSearch.officeId;
					$scope.type = 'county'
					$scope.variablePacket.schoolnav = true;
					$scope.variablePacket.schoolname = managerSearch.officeName;
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
			var date = $scope.variablePacket.studyyear.replace("学年","")
			$http.get(teachStatistic+id+"?date="+date+"&type="+type).success(function (data){
				if(data.ret == 200){
					data = data.data;
					//折线数据
					$scope.variablePacket.jiaoyandata = data.month;
					$scope.variablePacket.tabledata.type = data.type;
					if(data.type=="office"){
						$scope.variablePacket.scholldatashow = true;
					}
					//饼状图数据
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
				$scope.paichartchange();
			}, 1500)
		}
		
		$scope.separateLevel = function(level){
			$scope.variablePacket.primaryschoolone =  []
			$scope.variablePacket.primaryschooltwo =  []
			var i = level.length/2;
			var j = Math.ceil(i);
			if(i==0.5){
				$scope.variablePacket.primaryschoolone = level
			}else if(i>=1){
				
				for (var  i = 0;i < j-1;i++) {
					$scope.variablePacket.primaryschoolone.push(level[i]);
				};
				console.log($scope.variablePacket.primaryschoolone.push(level[i]));
				for (var  i = j;i < level.length-1;i++) {
					$scope.variablePacket.primaryschooltwo.push(level[i]);
				}
				console.log($scope.variablePacket.primaryschooltwo.push(level[i]));
			}
		}

		$scope.changexueduan = function(n) {
			if (n == 0) {
//				$scope.variablePacket.tabledata.primaryschool = level_1;
				$scope.separateLevel(level_1);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_1, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
				$timeout(function() {
					$scope.paichartchange();
				}, 1500)
			} else if (n == 1) {
//				$scope.variablePacket.tabledata.primaryschool = level_2;
				$scope.separateLevel(level_2);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_2, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
				$timeout(function() {
					$scope.paichartchange();
				}, 1500)
			} else if (n == 2) {
//				$scope.variablePacket.tabledata.primaryschool = level_3;
				$scope.separateLevel(level_3);
				$scope.variablePacket.sum = 0;
				angular.forEach(level_3, function(data, index, array) {
					$scope.variablePacket.sum += array[index].times;
				});
				$timeout(function() {
					$scope.paichartchange();
				}, 1500)
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
//			$scope.variablePacket.id = id;
//			$scope.variablePacket.type = type;
			$scope.getSubsetStatistics(id,type);
			if (type == "china") {
				$scope.shengdata(); //获取省的数据
				$scope.variablePacket.provincenav = true;
				$scope.variablePacket.provincename = areaName; //面包屑导航显示省的名字
				$scope.variablePacket.provinceid = id;
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
			} else if (type == "province") {
				$scope.shidata(); //获取市的数据
				$scope.variablePacket.citynav = true;
				$scope.variablePacket.cityname = areaName; //面包屑导航显示城市的名字
				$scope.variablePacket.cityid = id;
				$timeout(function() {
					$scope.paichartchange();
				}, 1500)
			} else if (type == "city") {
				$scope.quxiandata(); //获取区县的数据
				$scope.variablePacket.countynav = true;
				$scope.variablePacket.countyname = areaName; //面包屑导航显示区县的名字
				$scope.variablePacket.countyid = id;
				$scope.paichartchange();
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
			} else if (type == "county") {
				$scope.variablePacket.scholldatashow=true;
				$scope.variablePacket.schooldata = false;
				$scope.variablePacket.schoolnav = true;
				$scope.xuexiaodata(); //获取学校的数据
				$scope.variablePacket.schoolname = areaName; //面包屑导航显示学校的名字
				$scope.variablePacket.schoolid = id;
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
				$scope.variablePacket.schoolshow = false;
			}
			
			//表头的省市区县名字
			$scope.variablePacket.tablearea = areaName;
			$scope.variablePacket.tabledata.id = id;
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
		$timeout(function() {
				$scope.paichartchange();
				$scope.changeYearZheline();
			}, 1500)
		
		
		//导航条点击事件
		$scope.breadNav = function(id,name, type) {
//			$scope.getSubsetStatistics(id,$scope.variablePacket.tabledata.type);
			if (type == 0) {
				$scope.getSubsetStatistics(id,type);
				$scope.quanguodata();
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
				$scope.variablePacket.provincenav = false;
				$scope.variablePacket.citynav = false;
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
			} else if (type == 1) {
				$scope.type="china";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.shengdata();
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
				$scope.variablePacket.citynav = false;
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
			} else if (type == 2) {
				$scope.type="province";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.shidata();
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
			} else if (type == 3) {
				$scope.type="city";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.quxiandata();
				$timeout(function() {
					$scope.paichartchange();
					$scope.changeYearZheline();
				}, 1500)
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.schoolshow = true;
				$scope.variablePacket.scholldatashow = false;
			}
			//标题名字
			$scope.variablePacket.tablearea = name;
			$scope.variablePacket.tabledata.id = id;
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
			chart_line_tech('#containerChart3', color, chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, chart_zhexian.min, true, false, false);
		};
		//年份折线图
		$scope.changeYearZheline = function() {
			var color = ["#44a3d1"];
			var chart_zhexian = {
				"title": "",
				"categories": ["1998年","1999年","2000年","2010年", "2011年", "2012年", "2013年", "2014年", "2015年", "2016年", "2017年", "2018年"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": $scope.variablePacket.jiaoyandata
			};
			chart_line_tech('#containerChart2', color, chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, chart_zhexian.min, true, false, false);
		};
		//改变学科柱状图
		$scope.changeSubjectColum = function() {
			var chartData = {
				"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [49., 71, 106, 96, 85, 66,87,45]
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		}
	}
]);