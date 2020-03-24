app.controller('schoolLeaderPersonalCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', '$rootScope', function($scope, $state, $timeout, $http, $location, $interval, $rootScope) {

	var user = JSON.parse(sessionStorage.getItem('user'));
	$scope.term = $location.$$search.term||"上学期";
	//var schoolId = "office_d0ec88aeb9ac4c3d82d623068a2c3fd7";
	//var gradeName = "初一";
	var term = $location.$$search.term||"上学期";

	var schoolId = user.teacherInfo.teaSchoolId;
	var gradeName;
	//var term = "上学期";
	//上一级返回存储地址chooseTermVariable
	$scope.prevPageNo = 'schoolLeaderPersonal';

	//学期列表状态
	$scope.chooseTermVariable = {
		status: true,
		horn: false,
		list: false
	};
	//选择学期按钮
	$scope.chooseTermBtn = function() {
		if($scope.chooseTermVariable.status) {
			$scope.chooseTermVariable.horn = true;
			$scope.chooseTermVariable.list = true;
			$scope.chooseTermVariable.status = false;
		} else {
			$scope.chooseTermVariable.horn = false;
			$scope.chooseTermVariable.list = false;
			$scope.chooseTermVariable.status = true;

		}
	};

	//点击页面其它位置 学期列表隐藏
	var termList = document.querySelector('.icon-jiantou2');
	$(document).on('click', function(e) {
		var tar = e.target;
		if(tar != termList) {
			$scope.$apply(function() {
				$scope.chooseTermVariable.horn = false;
				$scope.chooseTermVariable.list = false;
				$scope.chooseTermVariable.status = true;
			});
		}
	});
	
	//变量包，控制刚进入选中第一个年级
	$scope.chooseTermVariable = {
		status: true,
		horn: false,
		list: false,
		type: 0,
		gradeState: $location.$$search.index || 0,
		roleState : $location.$$search.roleIndex || 0,
		date: '2018-02-20',
		dateStatus: false,
		roleAllName:'',		//区分校领导、年级组长
		termActive : $location.$$search.term == '下学期' ? 1 : 0  //学期取值
	};
	
	//模拟角色
	$scope.roles = [
		
	];
	
	var teaRole = user.teacherInfo.teaRole;
	var strs= new Array(); //定义一数组 
	strs = teaRole.split(",");
	if(strs.indexOf("校领导")!=-1||strs.indexOf("德育主任")!=-1||strs.indexOf("工会主席")!=-1||strs.indexOf("校长")!=-1||strs.indexOf("书记")!=-1||strs.indexOf("教研员")!=-1||strs.indexOf("教务主任")!=-1){
		$scope.roles.push({name:'校领导',role:"校领导",src:""});
	}
	for (i=0;i<strs.length ;i++ ){ 
		//alert(strs[i].indexOf("校长"));
		if(strs[i].indexOf("年级组长")!=-1){
			$scope.roles.push({name:'年级组长',role:strs[i],src:""});
		}
	} 

	/*if(strs.indexOf("班主任")!=-1){
		$scope.roles.push({name:'班主任',role:"班主任",src:"wrap.teacherPersonal"});
	}*/
	if(strs.indexOf("任课教师")!=-1||strs.indexOf("班主任")!=-1){
		$scope.roles.push({name:'任课教师',role:"任课老师",src:""});
	}
	if(teaRole.indexOf("市级应用管理员") !=-1 ){
		$scope.roles.push({name:'市级应用管理员',role:"市级应用管理员",src:""});
	}
	for (j=0;j<$scope.roles.length ;j++ ){
		if($scope.roles[j].name=="校领导"){
			$scope.roles[j].src="wrap.schoolLeaderPersonal({roleIndex:'"+j+"',roleAllName:'"+$scope.roles[j].role+"'})";
//			$scope.chooseTermVariable.roleAllName = $scope.roles[j].role;
		}else if($scope.roles[j].name=="年级组长"){
			$scope.roles[j].src="wrap.schoolLeaderPersonal({roleIndex:'"+j+"',roleAllName:'"+$scope.roles[j].role+"'})";
//			$scope.chooseTermVariable.roleAllName = $scope.roles[j].role;
		}else if($scope.roles[j].name=="任课教师"){
			$scope.roles[j].src="wrap.teacherPersonal({roleIndex:'"+j+"'})";
		}else if($scope.roles[j].name=="市级应用管理员"){
			$scope.roles[j].src="wrap.cityLeaderPersonal({roleIndex:'"+j+"'})";
		}
		
		
	}
	var oneRole = $location.$$search.roleAllName || $scope.roles[0].role;
	$scope.chooseTermVariable.roleAllName = $location.$$search.roleAllName || $scope.roles[0].role;
	
	findGrade(oneRole);

	//角色切换
	$scope.roleChange = function (i){
		$scope.chooseTermVariable.roleState = i;
		if($scope.roles[i].role=="任课老师"){
//			$rootScope.userType = 'teacher';
			sessionStorage.setItem('userType', 'teacher');
		}else{
//			$rootScope.userType = 'leader';
			sessionStorage.setItem('userType', 'leader');
		}
		
	};
	
	//顶部切换年级班级
	$scope.gradeTab = function(tar,i) {
		$scope.chooseTermVariable.gradeState = i;
		gradeName = angular.element(tar.target).html();
		//alert(schoolId);
		//alert(gradeName);
		//alert(term);
		findClass(schoolId, gradeName, term);
	};
	//切换学期下拉
	$scope.chooseTerm = function(tar, i) {
		$scope.term = angular.element(tar.target).html();
		$scope.chooseTermVariable.termActive = i;
		//alert(angular.element(tar.target).html());
		term = angular.element(tar.target).html();
		findClass(schoolId, gradeName, term);
	};

	//年级优良率统计-获取数据
	$http.get('file/gradeStatistics.json').success(function(data) {
		$scope.gradeData = data.data;
	})

	function findGrade(role){
		//获取年级
		$http.post(requireIp + '/teacher/leaDerController/findGradeList.do', {
			schoolId: user.teacherInfo.teaSchoolId,
			teaRole: role
		}).success(function(data) {
			var gradeList = JSON.parse(data);
			if(gradeList.ret == "1") {
				$scope.gradeList = gradeList.subStagesInfo;
				console.info(gradeList.subStagesInfo);
				var index = $location.$$search.index||0;
				$scope.grade = gradeList.subStagesInfo[index].SchoolSubStages;
				gradeName = gradeList.subStagesInfo[index].SchoolSubStages;
				//初始默认进来的
				findClass(schoolId, gradeName, term);
				//findzhu();
			}
		});
	}
	

	//通过学校Id和年级名称查询班级
	function findClass(schoolId, gradeName, term) {
		$http.post(requireIp + 'teacher/leaDerController/findClassSuZhiData.do', {
			schoolId: schoolId,
			gradeName: gradeName,
			term: term
		}).success(function(data) {
			console.info(data);
			$scope.allData = data.data;
			//重新组装数据给图标
			//$scope.jsData = JSON.stringify(data.data);
			//jsData=data.data;
			$scope.gradeName=gradeName;
			findzhu($scope.allData);
		});
	}
	
	function findzhu(jdata) {
		var categories = [];
		/*setTimeout(function() {*/
			//console.info($("#jsData").html());
			//allData = $("#jsData").html();
			//var jdata = eval('(' + allData + ')');
			//alert(jdata);
			//alert(jsData);
			//var jdata =jsData;
			console.info(jdata);
			var allList = new Array();
			var oneObject = jdata[0].data;
			for(var j = 0; j < oneObject.length; j++) {
				categories.push(oneObject[j].className);
			}
			for(var h = 0; h < jdata.length; h++) {
				var oneObject = jdata[h].data;
				var list = new Array();
				var flag = 0;
				for(var m = 0; m < 4; m++) {
					var o = new Object();
					if(m == 0) {
						var listOne = new Array();
						o.name = "优秀";
						o.color = "#32ba54";
						o.level = 1;
						for(var k = 0; k < oneObject.length; k++) {
							var b = new Object();
							b.y = ((parseFloat(oneObject[k].countA)) /
								(parseFloat(oneObject[k].countNum))) * 100;
							b.num = parseInt(oneObject[k].countA); //优秀的人数
							b.count = parseInt(oneObject[k].countNum); //总人数
							listOne[k] = b;
						}
						o.data = listOne;
						list.push(o);
					}
					if(m == 1) {
						var listOne = new Array();
						o.name = "良好";
						o.color = "#3598db";
						o.level = 2;
						for(var k = 0; k < oneObject.length; k++) {
							var b = new Object();
							b.y = ((parseFloat(oneObject[k].countB)) /
								(parseFloat(oneObject[k].countNum))) * 100;
							b.num = parseInt(oneObject[k].countB); //优秀的人数
							b.count = parseInt(oneObject[k].countNum); //总人数
							listOne[k] = b;
						}
						o.data = listOne;
						list.push(o);
					}
					if(m == 2) {
						var listOne = new Array();
						o.name = "及格";
						o.color = "#fdbc2a";
						o.level = 3;
						for(var k = 0; k < oneObject.length; k++) {
							var b = new Object();
							b.y = ((parseFloat(oneObject[k].countC)) /
								(parseFloat(oneObject[k].countNum))) * 100;
							b.num = parseInt(oneObject[k].countC); //优秀的人数
							b.count = parseInt(oneObject[k].countNum); //总人数
							listOne[k] = b;
						}
						o.data = listOne;
						list.push(o);
					}
					if(m == 3) {
						var listOne = new Array();
						o.name = "不及格";
						o.color = "#fb5252";
						o.level = 4;
						for(var k = 0; k < oneObject.length; k++) {
							var b = new Object();
							b.y = ((parseFloat(oneObject[k].countD)) /
								(parseFloat(oneObject[k].countNum))) * 100;
							b.num = parseInt(oneObject[k].countD); //优秀的人数
							b.count = parseInt(oneObject[k].countNum); //总人数
							listOne[k] = b;
						}
						o.data = listOne;
						list.push(o);
					}
				}
				allList.push(list);
			}
			//console.info(allList[0]);
			//console.info(zyx_Data1.data);
			//console.info(allList[0]);
			zyx_Data1.data = allList[0];
			zyx_Data2.data = allList[1];
			zyx_Data3.data = allList[2];
			zyx_Data4.data = allList[3];
			zyx_Data5.data = allList[4];
			//console.info(zyx_Data1.data);
			//alert(1);
			zyx_Data1.categories = categories;
			zyx_Data2.categories = categories;
			zyx_Data3.categories = categories;
			zyx_Data4.categories = categories;
			zyx_Data5.categories = categories;
			//alert(zyx_Data1.categories);
			//图表1的生成
			chart_column_stack('.chart1', zyx_Data1.title, zyx_Data1.categories, zyx_Data1.ytitle, zyx_Data1.data, zyx_Data1.totalName, zyx_Data1.units, false);
			initSingleColumnChart($('.chart1'), zyx_Data1.data);
			$('.chart-column-legend > span').on("click", function() {
				legendUpdate($(this), $('.chart1'), zyx_Data1.data, true);
			});

			//图表2的生成
			chart_column_stack('.chart2', zyx_Data2.title, zyx_Data2.categories, zyx_Data2.ytitle, zyx_Data2.data, zyx_Data2.totalName, zyx_Data2.units, false);
			initSingleColumnChart($('.chart2'), zyx_Data2.data);

			$('.chart-column-legend > span').on("click", function() {
				legendUpdate($(this), $('.chart2'), zyx_Data2.data, true);
			});

			//图表3的生成
			chart_column_stack('.chart3', zyx_Data3.title, zyx_Data3.categories, zyx_Data3.ytitle, zyx_Data3.data, zyx_Data3.totalName, zyx_Data3.units, false);
			initSingleColumnChart($('.chart3'), zyx_Data3.data);

			$('.chart-column-legend > span').on("click", function() {
				legendUpdate($(this), $('.chart3'), zyx_Data3.data, true);
			});

			//图表4的生成
			chart_column_stack('.chart4', zyx_Data4.title, zyx_Data4.categories, zyx_Data4.ytitle, zyx_Data4.data, zyx_Data4.totalName, zyx_Data4.units, false);
			initSingleColumnChart($('.chart4'), zyx_Data4.data);

			$('.chart-column-legend > span').on("click", function() {
				legendUpdate($(this), $('.chart4'), zyx_Data4.data, true);
			});

			//图表5的生成
			chart_column_stack('.chart5', zyx_Data5.title, zyx_Data5.categories, zyx_Data5.ytitle, zyx_Data5.data, zyx_Data5.totalName, zyx_Data5.units, false);
			initSingleColumnChart($('.chart5'), zyx_Data5.data);

			$('.chart-column-legend > span').on("click", function() {
				legendUpdate($(this), $('.chart5'), zyx_Data5.data, true);
			});

			//整体事件的触发
			$('.graph-tabs > a').click(function() {
				var obj = $(this),
					showid = obj.attr("data-name"),
					p = obj.closest('.zyx_tabData');

				obj.addClass('active').siblings().removeClass('active');
				$('.tabcon[data-name]').hide();
				$('.tabcon[data-name="' + showid + '"]').show();
				doReflow(p);
			});
			$('.graph-tabs > a:first').trigger('click');

		/*}, 1600);*/

	}

}]);