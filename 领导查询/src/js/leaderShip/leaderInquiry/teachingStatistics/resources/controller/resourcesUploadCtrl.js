app.controller('resourcesUploadCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$state,$timeout,$http,$location,$interval,$stateParams) {
	 

	//变量包
    $scope.variablePacket = {
		studyIfShow:false, //学段收起展开的切换
		typeIfShow:false, //类型收起展开的切换
		switchIndex:0,//按类型和按学科切换
		tabIndex:0,//按区县和按角色切换
		name:"牡丹江市",//市区县学校等文字切换表格内容中表头内容的改变
		personalData:false,//控制学生个人页面需要显示的变量
		studentUserIndex:0,//控制学生个人页面--用户切换的索引
		studentGradeIndex:0,//控制学生个人页面--年级切换的索引
		studentSubjectIndex:0,//控制学生个人页面--学科切换的索引
		periodIndex:0,//按学科-学段切换的索引
    };
   
	
	//学段收起展开的切换
	$scope.studyIfShow = function(){
		$scope.variablePacket.studyIfShow = !$scope.variablePacket.studyIfShow; 
	}
	
	//类型收起展开的切换
	$scope.typeIfShow = function(){
		$scope.variablePacket.typeIfShow = !$scope.variablePacket.typeIfShow; 
	}
	
	//按类型和按学科切换
	$scope.switchTab = function(i){
		$scope.variablePacket.switchIndex = i;
		if(i==0){
			$timeout(function() {
				$scope.changeTypeColumn();
			}, 300)
		}else if(i==1){
			$timeout(function() {
				$scope.changeSubjectColumn();
			}, 300)
		}
	}
	
	//按区县和按角色切换
	$scope.switchTable = function(i){
		$scope.variablePacket.tabIndex = i;
	}
	
	//年级的切换
	$scope.studentGradeTab = function(i){
		$scope.variablePacket.studentGradeIndex = i;
	}
	
	//学科的切换
	$scope.studentSubjectTab = function(i){
		$scope.variablePacket.studentSubjectIndex = i;
	}
	
	//学段的切换
	$scope.periodTab = function(i){
		$scope.variablePacket.periodIndex = i;
	}
	
	
	
	//市级的数据
	$scope.city = function() {
		//横向柱状图
		$scope.columnBar = function(){
			var columnBarArr = {
				"target": ".columnBar",
				"categories": ["小学", "初中", "高中", "幼儿园", "职业院校"],
				"data": [{
					"data": [{
						"y": 59,
						"color": "#48bd7e"
					}, {
						"y": 106,
						"color": "#48bd7e"
					}, {
						"y": 101,
						"color": "#48bd7e"
					}, {
						"y": 104,
						"color": "#48bd7e"
					}, {
						"y": 99,
						"color": "#48bd7e"
					}]
				}],
				"labels": true
			};
		    chart_column_bar(columnBarArr);
		};
		//实心饼图
		$scope.pieSolid = function(){
			var pieSolidArr = {
				"target": ".pieSolid",
				"title": "",
				"data": [{
					type: 'pie',
					data: [
						{
							'name':'教师',
							'y':40,
							'color':'#46a2d2',
						},
						{
							'name':'学生',
							'y':50,
							'color':'#f46765',
						},
						{
							'name':'家长',
							'y':20,
							'color':'#f4b242',
						},
					]
				}],
				"labels": true
			};
			pie_solid(pieSolidArr)
		};
		//按类型柱状图
		$scope.changeTypeColumn = function() {
			var chartData = {
				"categories": ["文档", "视频", "音频", "PDF", "EXCEL", "图片", "微课", "其他"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [9, 7, 106, 96, 85, 66,87,45]
				}]
			};
			chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//按学科柱状图
		$scope.changeSubjectColumn = function() {
			var chartData = {
				"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [49,71,16,96,5,66,87,45]
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//数据汇总
		$scope.changeData = {
			//类型
			'type':'city',
			//资源量统计图-表格
			'studyData':{
				'dataThead' : [{'name':'学段'},{'name':'小学'},{'name':'初中'},{'name':'高中'},{'name':'幼儿园'},{'name':'职业院校'}],
				'dataTbody' : [
					{'name':'教师','small':310,'middle':310,"high":310,"child":310,"post":310},
					{'name':'学生','small':310,'middle':310,"high":310,"child":310,"post":310},
					{'name':'家长','small':310,'middle':310,"high":310,"child":310,"post":310},
				],
			},
			//按类型表格数据
			'typeData':{
				'dataThead' : [{'name':'类型'},{'name':'文档'},{'name':'视频'},{'name':'音频'},{'name':'PDF'},{'name':'EXCEL'},{'name':'图片'},{'name':'微课'},{'name':'其他'}],
				'dataTbody' : [
					{'name':'资源量','type1':310,'type2':310,"type3":310,"type4":310,"type5":310,"type6":310,"type7":310,"type8":310},
				],
			},
			//按学科表格数据
			'subjectData':{
				'dataThead' : [{'name':'学科'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
				'dataTbody' : [
					{'name':'资源量','type1':310,'type2':310,"type3":310,"type4":310,"type5":310,"type6":310,"type7":310,"type8":310},
				],
			},
			'period':[{'name':'全部1'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
			//资源量统计表-按区县
			'tabledata_area':[
				{
					'id':0,
					"name": "市直属",
					"totle": 84,
				},{
					'id':1,
					"name": "西安区",
					"totle": 10,
				},{
					'id':2,
					"name": "东安区",
					"totle": 54,
				},{
					'id':3,
					"name": "林口县",
					"totle": 63,
				}
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 54,
				},{
					'id':1,
					"name": "学生",
					"totle": 2,
				},{
					'id':2,
					"name": "家长",
					"totle": 7,
				}
			]

		};
	};
	
	//区县级的数据
	$scope.county = function() {
		//横向柱状图
		$scope.columnBar = function(){
			var columnBarArr = {
				"target": ".columnBar",
				"categories": ["小学", "初中", "高中", "幼儿园", "职业院校"],
				"data": [{
					"data": [{
						"y": 109,
						"color": "#48bd7e"
					}, {
						"y": 101,
						"color": "#48bd7e"
					}, {
						"y": 11,
						"color": "#48bd7e"
					}, {
						"y": 14,
						"color": "#48bd7e"
					}, {
						"y": 9,
						"color": "#48bd7e"
					}]
				}],
				"labels": true
			};
		    chart_column_bar(columnBarArr);
		};
		//实心饼图
		$scope.pieSolid = function(){
			var pieSolidArr = {
				"target": ".pieSolid",
				"title": "",
				"data": [{
					type: 'pie',
					data: [
						{
							'name':'教师',
							'y':80,
							'color':'#46a2d2',
						},
						{
							'name':'学生',
							'y':20,
							'color':'#f46765',
						},
						{
							'name':'家长',
							'y':30,
							'color':'#f4b242',
						},
					]
				}],
				"labels": true
			};
			pie_solid(pieSolidArr)
		};
		//按类型柱状图
		$scope.changeTypeColumn = function() {
			var chartData = {
				"categories": ["文档", "视频", "音频", "PDF", "EXCEL", "图片", "微课", "其他"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [45, 22, 88, 46, 85, 66,87,99]
				}]
			};
			chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//按学科柱状图
		$scope.changeSubjectColumn = function() {
			var chartData = {
				"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [99,71,16,96,5,66,87,45]
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//数据汇总
		$scope.changeData = {
			'type':'county',
			//资源量统计图-表格
			'studyData':{
				'dataThead' : [{'name':'学段'},{'name':'小学'},{'name':'初中'},{'name':'高中'},{'name':'幼儿园'},{'name':'职业院校'}],
				'dataTbody' : [
					{'name':'教师','small':320,'middle':320,"high":320,"child":320,"post":320},
					{'name':'学生','small':320,'middle':320,"high":320,"child":320,"post":320},
					{'name':'家长','small':320,'middle':320,"high":320,"child":320,"post":320},
				],
			},
			//按类型表格数据
			'typeData':{
				'dataThead' : [{'name':'类型'},{'name':'文档'},{'name':'视频'},{'name':'音频'},{'name':'PDF'},{'name':'EXCEL'},{'name':'图片'},{'name':'微课'},{'name':'其他'}],
				'dataTbody' : [
					{'name':'资源量','type1':325,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			//按学科表格数据
			'subjectData':{
				'dataThead' : [{'name':'学科'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
				'dataTbody' : [
					{'name':'资源量','type1':325,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			'period':[{'name':'全部2'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
			//资源量统计表-按区县
			'tabledata_area':[
				{
					'id':0,
					"name": "实验中学",
					"totle": 33,
				},{
					'id':1,
					"name": "第一中学",
					"totle": 12,
				},{
					'id':2,
					"name": "第二中学",
					"totle": 42,
				},{
					'id':3,
					"name": "第三中学",
					"totle":5,
				}
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 460,
				},{
					'id':1,
					"name": "学生",
					"totle": 40,
				},{
					'id':2,
					"name": "家长",
					"totle": 60,
				}
			],
		};

	};
	
	
	//学校的数据
	$scope.school = function() {
		//实心饼图
		$scope.pieSolid = function(){
			var pieSolidArr = {
				"target": ".pieSolid",
				"title": "",
				"data": [{
					type: 'pie',
					data: [
						{
							'name':'教师',
							'y':10,
							'color':'#46a2d2',
						},
						{
							'name':'学生',
							'y':60,
							'color':'#f46765',
						},
						{
							'name':'家长',
							'y':30,
							'color':'#f4b242',
						},
					]
				}],
				"labels": true
			};
			pie_solid(pieSolidArr)
		};
		//按类型柱状图
		$scope.changeTypeColumn = function() {
			var chartData = {
				"categories": ["文档", "视频", "音频", "PDF", "EXCEL", "图片", "微课", "其他"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [15, 15, 5, 46, 15, 66,87,99]
				}]
			};
			chart_column('#changeTypeColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//按学科柱状图
		$scope.changeSubjectColumn = function() {
			var chartData = {
				"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
				"ytitle": "数量",
				"data": [{
					'color':'#46a2d2',
					"data": [9,71,15,96,85,15,87,45]
				}]
			};
			chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
		};
		//数据汇总
		$scope.changeData = {
			'type':'school',
			//资源量统计图-表格
			'studyData':{
				dataTbody : [
					{'name':'教师','num':320},
					{'name':'学生','num':302},
					{'name':'家长','num':310},
				],
			},
			//按类型表格数据
			'typeData':{
				'dataThead' : [{'name':'类型'},{'name':'文档'},{'name':'视频'},{'name':'音频'},{'name':'PDF'},{'name':'EXCEL'},{'name':'图片'},{'name':'微课'},{'name':'其他'}],
				'dataTbody' : [
					{'name':'资源量','type1':15,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			//按学科表格数据
			'subjectData':{
				'dataThead' : [{'name':'学科'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
				'dataTbody' : [
					{'name':'资源量','type1':115,'type2':320,"type3":320,"type4":320,"type5":320,"type6":320,"type7":320,"type8":320},
				],
			},
			//用户，年级，学科数据
			'lineData':{
				'user' : [{'name':'教师'},{'name':'学生'},{'name':'家长'}],
				'grade' : [{'name':'全部'},{'name':'一年级'},{'name':'二年级'},{'name':'三年级'},{'name':'四年级'},{'name':'五年级'},{'name':'六年级'},{'name':'初一'}],
				'subject' : [{'name':'全部'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}]
			},
			'period':[{'name':'全部3'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}],
			//资源量统计表-按区县
			'tabledata_area':[
				{
					'id':0,
					"name": "张三",
					'class':'1班',
					"totle": 120,
				},{
					'id':1,
					"name": "李四",
					'class':'2班',
					"totle": 55,
				},{
					'id':2,
					"name": "王五",
					'class':'3班',
					"totle": 9,
				},{
					'id':3,
					"name": "赵六",
					'class':'4班',
					"totle": 2,
				}
			],
			//资源量统计表-按角色
			'tabledata_user':[
				{
					'id':0,
					"name": "教师",
					"totle": 50,
				},{
					'id':1,
					"name": "学生",
					"totle": 20,
				},{
					'id':2,
					"name": "家长",
					"totle": 46,
				}
			],
		};
	};
	
	
	//判断个人资源详情页面返回调用的数据
	if($stateParams.tableData == "person"){
		$scope.school();
		$scope.variablePacket.personalData = true;
		$timeout(function() {
			$scope.pieSolid();
			$scope.changeTypeColumn();
		}, 300)
	}else{
		$scope.city();
		$scope.variablePacket.personalData = false;
		$timeout(function() {
			$scope.columnBar();
			$scope.pieSolid();
			$scope.changeTypeColumn();
		}, 300)
	}
	
	
	//调用dataTable
	app.controller('tableAreaCtrl', function($scope) {
		var vm = this;
		vm.tabledata_area = $scope.changeData.tabledata_area;
		vm.tabledata_user = $scope.changeData.tabledata_user;
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
			paging: false,
			info: false,
			searching: false, 
			language: {
				emptyTable: "暂无数据"
			},
			columnDefs: [{
				targets: [0,1],
				orderable: false
			}],
			order:[2,'desc']
		}
		//按区县表格里的点击事件
		$scope.findNext = function(id,type){
			if(type=='city'){
				$scope.variablePacket.personalData = false;
				$scope.variablePacket.name = $scope.changeData.tabledata_area[id].name;
				$scope.county();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
				$timeout(function() {
					$scope.columnBar();
					$scope.pieSolid();
					$scope.changeTypeColumn();
				}, 300)
			}else if(type=='county'){
				$scope.variablePacket.personalData = true;
				$scope.variablePacket.name = $scope.changeData.tabledata_area[id].name;
				$scope.school();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
				$timeout(function() {
					$scope.columnBar();
					$scope.pieSolid();
					$scope.changeTypeColumn();
				}, 300)
			}else{
				if($scope.variablePacket.studentUserIndex==0){
					$state.go('secondNav.personalResources',{'user':'teacher'});
				}else{
					$state.go('secondNav.personalResources',{'user':'student'});
				}
			}
		}
		
		//用户的切换
		$scope.studentUserTab = function(i){
			$scope.variablePacket.studentUserIndex = i;
			if(i!=0){
				$scope.variablePacket.tabIndex = -1;
			}else{
				$scope.variablePacket.tabIndex = 0;
			}
			vm.tabledata_area = $scope.changeData.tabledata_area;
			vm.tabledata_user = $scope.changeData.tabledata_user;
		}
	});
	
}]);


