app.controller('testQuestionsCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams',function($scope,$state,$timeout,$http,$location,$interval, $stateParams) {

	//变量包
    $scope.variablePacket = {
    	xueduanrange: [],    // 学段
		xueduanelect: true,  //学段 全部
		xueduantype: 5,
		typeIfShow:false, //类型收起展开的切换
		switchIndex:0,//按类型和按学科切换
		tabIndex:0,//按区县和按角色切换
		name:"牡丹江市",//市区县学校等文字切换表格内容中表头内容的改变
		personalData:false,//控制学生个人页面需要显示的变量
		studentUserIndex:0,//控制学生个人页面--用户切换的索引
		studentGradeIndex:0,//控制学生个人页面--年级切换的索引
		studentSubjectIndex:0,//控制学生个人页面--学科切换的索引
		periodIndex:0//按学科-学段切换的索引
    };
    //学段数据
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
	//全选
	$scope.xueduanall = function() {
		$scope.variablePacket.xueduanelect = true;
		$scope.variablePacket.xueduantype = 5;
	}
    //学段切换
	$scope.changexueduan = function(n) {
		$scope.variablePacket.xueduantype = n;
		$scope.variablePacket.xueduanelect = false;
		$scope.changeSubjectColum();
	}
	
	//改变学科柱状图
	$scope.changeSubjectColum = function() {
		var chartData = {
			"categories": ["数学", "语文", "英语", "物理", "化学", "政治", "生物", "美术"],
			"ytitle": "数量",
			"data": [{
				'color':'#e06978',
				"data": [49., 71, 106, 96, 85, 66,87,45]
			}]
		};
		chart_column('#changeSubjectColumn', chartData.categories, chartData.ytitle, chartData.data);
	}
	$scope.changeSubjectColum();
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
	};
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
		$scope.changeData = {
			'type':'city',
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
	$scope.city();
	
	//区县级的数据
	$scope.county = function() {
		$scope.changeData = {
			'type':'county',
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
		$scope.changeData = {
			'type':'school',
			//用户，年级，学科数据
			'lineData':{
				'user' : [{'name':'教师'},{'name':'学生'},{'name':'家长'}],
				'grade' : [{'name':'全部'},{'name':'一年级'},{'name':'二年级'},{'name':'三年级'},{'name':'四年级'},{'name':'五年级'},{'name':'六年级'},{'name':'初一'}],
				'subject' : [{'name':'全部'},{'name':'数学'},{'name':'语文'},{'name':'英语'},{'name':'物理'},{'name':'化学'},{'name':'政治'},{'name':'生物'},{'name':'美术'}]
			},
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
		//按区县表格里的点击事件
		$scope.findNext = function(id,type){
			if(type=='city'){
				$scope.variablePacket.personalData = false;
				$scope.variablePacket.name = $scope.changeData.tabledata_area[id].name;
				$scope.county();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
			}else if(type=='county'){
				$scope.variablePacket.personalData = true;
				$scope.variablePacket.name = $scope.changeData.tabledata_area[id].name;
				$scope.school();
				vm.tabledata_area = $scope.changeData.tabledata_area;
				vm.tabledata_user = $scope.changeData.tabledata_user;
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
