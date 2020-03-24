app.controller('teachingStatisticsCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$stateParams',
	function($scope, $state, $timeout, $http, $location, $interval, $stateParams) {
		$scope.variablePacket = {
			stateType: 0,
			stateChart: 0,
			citynav: false,
			provincenav: false,
			citynav: false,
			countynav: false,
			schoolnav: false,
			tabledata: [],
			jiaoanshow: false,
			tablearea: '全国',
			sum: 0,
			scholldatashow:false,
			schoolYear:[],
			year : '',		//从接口中获取学年
			studyyear: '',
		};
		
		$scope.year='';
		
		$.ajax({
			type:"get",
			url:jeucIp+"statistics/getStuYearList",
			async:false,
			success:function(jdata){
				if(jdata.ret == 200){
					$scope.variablePacket.studyyear=jdata.data[0].name;
					var reg = new RegExp('-','g');//g,表示全部替换。
					$scope.variablePacket.schoolYear = jdata.data;
					$scope.year=$scope.variablePacket.schoolYear[0];
				}
			}
		});
		
		//切换学年时数据重新加载
		$scope.selectChange = function(year) {
			$scope.variablePacket.studyyear=year;
			$scope.findCityCount();
			$scope.variablePacket.jiaoanshow = false;
			$scope.variablePacket.scholldatashow = false;
			$timeout(function() {
				$scope.changeZheline();
			}, 1000)
		}
		
		var managerSearch = JSON.parse(sessionStorage.getItem('managerSearch'));
		var scope = managerSearch.scope;
		if(scope==0){
			$scope.id = 1;
			$scope.variablePacket.chinanav = true;
		}
		if(scope==1){
			$scope.id = managerSearch.provinceId ;
			$scope.type = 'china'
		}
		if(scope==2){
			$scope.id = managerSearch.cityId;
			$scope.type = 'province'
		}
		if(scope==3){
			$scope.id = managerSearch.countyId;
			$scope.type = 'city'
		}
		if(scope==4){
			$scope.id = managerSearch.officeId;
			$scope.type = 'county'
		}

		var nianjicoum, xuekecoum, zhedata,courses,courseData,grades,gradeData; //柱状图data数据
		
		var teachStatistic = interfaceIpAddr+"/teachingPlan/";

		//初始化子区域数据
		$scope.getSubsetStatistics = function(id,type) {
			a = "1";
			if (!angular.isDefined(id)) {
				id = $scope.id;
			}
			if (!angular.isDefined(type)) {
				type = $scope.type;
			}
			var date = $scope.variablePacket.studyyear.replace("学年","")
			$http.get(teachStatistic + id + "?date="+date+"&type="+type).success(function (data){
				if(data.ret == 200){
					data = data.data;
					if(data.type=="office"){
						$scope.variablePacket.scholldatashow = true;
					}
					$scope.variablePacket.tabledata.zhedata = data.month;
					$scope.variablePacket.tabledata.type = data.type;
					if(data.level !=null){
						courses = data.level.courses;
						courseData = data.level.courseData;
						grades = data.level.grades;
						gradeData = data.level.gradeData;
					}
					$scope.variablePacket.sum = 0;
					$scope.variablePacket.tabledata.quyu = data.subset;
					angular.forEach($scope.variablePacket.tabledata.quyu, function(data, index, array) {
						$scope.variablePacket.sum += array[index].resnum;
					});
				}
			});
		}
		$scope.getSubsetStatistics();


		//切换选项卡
		$scope.changestate = function(n) {
			$scope.variablePacket.stateType = n;
		};

		$scope.changeChartstate = function(n) {
			$scope.variablePacket.stateChart = n
			if (n == 0) {
				$timeout(function() {
					$scope.changeGradeColumn();
				}, 1000)
			} else if (n == 1) {
				$timeout(function() {
					$scope.changeSubjectColum();
				}, 1000)
			}
		}

		//面包屑导航切换
		$scope.breadNav = function(id,name, type) {
//			$scope.getSubsetStatistics(id);
			if (type == 0) {
				$scope.getSubsetStatistics(id,"");
				$scope.quanguodata();
				$scope.variablePacket.provincenav = false;
				$scope.variablePacket.citynav = false;
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按省份";
				$scope.variablePacket.scholldatashow = false;
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == 1) {
				$scope.type="china";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.shengdata();
				$scope.variablePacket.citynav = false;
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按城市";
				$scope.variablePacket.scholldatashow = false;
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == 2) {
				$scope.type="province";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.shidata();
				$scope.variablePacket.countynav = false;
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按区县";
				$scope.variablePacket.scholldatashow = false;
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == 3) {
				$scope.type="city";
				$scope.getSubsetStatistics(id,$scope.type);
				$scope.quxiandata();
				$scope.variablePacket.schoolnav = false;
				$scope.variablePacket.schooldata = true;
				$scope.variablePacket.btnName = "按学校";
				$scope.variablePacket.scholldatashow = false;
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			}
			//标题名字
			$scope.variablePacket.tablearea = name;
			$scope.variablePacket.jiaoanshow = false;
		}

		//点击省、市、区、县
		$scope.findCityCount = function(id, name, type) {
			$scope.getSubsetStatistics(id,type);

			if (type == "china") {
				$scope.shengdata(); //获取省的数据
				$scope.variablePacket.provincenav = true;
				$scope.variablePacket.provincename = name; //面包屑导航显示的名字
				$scope.variablePacket.provinceid = id;
				$scope.variablePacket.btnName = "按城市";
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == "province") {
				$scope.shidata(); //获取市的数据
				$scope.variablePacket.citynav = true;
				$scope.variablePacket.cityname = name; //面包屑导航显示的名字
				$scope.variablePacket.cityid = id;
				$scope.variablePacket.btnName = "按区县";
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == "city") {
				$scope.quxiandata(); //获取区县的数据
				$scope.variablePacket.countynav = true;
				$scope.variablePacket.countyname = name; //面包屑导航显示的名字
				$scope.variablePacket.countyid = id;
				$scope.variablePacket.btnName = "按学校";
				$timeout(function() {
					$scope.changeZheline();
				}, 1000)
			} else if (type == "county") {
				$scope.variablePacket.schooldata = false;
				$scope.variablePacket.schoolnav = true;
				$scope.variablePacket.restableshow = false;
				$scope.variablePacket.jiaoanshow = true;
				$scope.variablePacket.schoolname = name; //面包屑导航显示的名字
				$scope.variablePacket.schoolid = id;
				$scope.xuexiaodata(); //获取学校的数据
				$scope.variablePacket.scholldatashow=true;
				$timeout(function() {
						$scope.changeZheline();
						$scope.changeGradeColumn();
				}, 1000)
				//面包屑导航显示的名字
			}

			//表头的省市区县名字
			$scope.variablePacket.tablearea = name;
		}
		$timeout(function() {
			$scope.changeGradeColumn();
			$scope.changeZheline();
		}, 1000)

		//改变年级柱状图
		$scope.changeGradeColumn = function() {
			var chart_column_02 = {
				"categories": grades,
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": gradeData
			};
			chart_column_base('#containerChart1', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
		}

		//改变学科柱状图
		$scope.changeSubjectColum = function() {
			var chart_column_02 = {
				"categories": courses,
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": courseData
			};
			chart_column_base('#containerChart2', chart_column_02.categories, chart_column_02.ytitle, chart_column_02.data, true, false, false);
		}

		//全国的数据
		$scope.quanguodata = function() {
			$scope.variablePacket.tabledata = {
				"name": "全国",
				"type": "china",
				"id": 1,
				"zhedata": $scope.variablePacket.tabledata.zhedata,
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};

		$scope.quanguodata();

		$scope.shengdata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "province",
				"id": 2,
				"zhedata": $scope.variablePacket.tabledata.zhedata,
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};

		//市数据
		$scope.shidata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "city",
				"id": 21,
				"zhedata": $scope.variablePacket.tabledata.zhedata,
				"quyu": $scope.variablePacket.tabledata.quyu
			};

		};

		//区县数据
		$scope.quxiandata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "county",
				"id": 211,
				"zhedata": $scope.variablePacket.tabledata.zhedata,
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};

		//学校的数据
		$scope.xuexiaodata = function() {
			$scope.variablePacket.tabledata = {
				"name": name,
				"type": "school",
				"id": 211,
				"zhedata": $scope.variablePacket.tabledata.zhedata,
				"quyu": $scope.variablePacket.tabledata.quyu
			};
		};

		$scope.changeZheline = function() {
			zhedata = $scope.variablePacket.tabledata.zhedata
			var chart_zhexian = {
				"title": "",
				"categories": ["9月", "10月", "11月", "12月", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"],
				"ytitle": "份数",
				"totalName": "",
				"units": "",
				"min": "",
				"data": zhedata
			};
			chart_line_tech('#containerChart3', chart_zhexian.title, chart_zhexian.categories, chart_zhexian.ytitle, chart_zhexian.data, chart_zhexian.totalName, chart_zhexian.units, chart_zhexian.min, true, false, false);
		}

	}
]);