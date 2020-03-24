app.controller('cityLeaderPersonalCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//变量包，控制刚进入选中第一个年级
	$scope.chooseTermVariable = {
		gradeState: $location.$$search.index || 0,
		roleState : $location.$$search.roleIndex || 0,
//		roleAllName:'',		//区分校领导、年级组长
		exportBox : false,		//导出数据弹框
		uploadBox : false,		//上传数据弹框
		tipState : {
			tipBox : {			//提示弹框： 是否显示/提示图片/提示文字
				ifShow : false,
				tipRed : false,
				tipsWord : '老是看得见'
			}
		}
	};
	$scope.stuObject = [];
	//模拟角色
	$scope.roles = [		
	];
	
	//登录用户信息
 	$scope.gradeInfo = JSON.parse(sessionStorage.getItem('user'));
 	//sessionStorage.setItem('user',angular.toJson($scope.gradeInfo));
 	var teaRole = JSON.parse(sessionStorage.getItem('user')).teacherInfo.teaRole;
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
	
	
	$scope.locUrl = resourceIp+'/resource/evalbackup';
	//导出数据事件
	$scope.exportFn = function (){
		$scope.chooseTermVariable.exportBox = true;
	};
	
	//导入数据事件
	$scope.uploadFn = function (){
		$scope.chooseTermVariable.uploadBox = true;
	};
	
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
	//查询列表type=99表示查询时不加这个条件查询
	$scope.findAll = function (){	
		$http.post(requireIp + 'teacher/suZhiController/findBackup.do', {
			type: 99,
			pageNo:$scope.contentpageConfig.currentPage,
			pageSize:$scope.contentpageConfig.pagesLength
		}).success(function(jdata) {	
	        console.info(jdata);	
	        $scope.stuObject = jdata.data;
	        $scope.contentpageConfig.totalItems = jdata.total;
		});
	}
	
	
	var teaId = JSON.parse(sessionStorage.getItem('user')).teacherInfo.teaId;
	var teaName = JSON.parse(sessionStorage.getItem('user')).teacherInfo.teaName;
	var filename = "";
	//确认导出事件 type=1是导出，type=0导入
	$scope.exportAdd = function (type){
		if(type == 0){		
			var fileMessage = window.frames["uploadResource"].document.getElementById("uploadJsonStr").value;
			if(fileMessage ==""){
				$scope.timer(false,'请上传压缩包！');			
			}
			filename = JSON.parse(fileMessage)[0].newfilename;
		}
		$http.post(requireIp + 'teacher/suZhiController/addBackup.do', {
			createId: teaId,
			createName:teaName,
			type:type,
			filename:filename
		}).success(function(jdata) {	         
	        if(jdata == 1){
	        	$scope.findAll();
	        	if(type == 1){
	        		$scope.chooseTermVariable.exportBox = false;
	        	}else{
	        		$scope.chooseTermVariable.uploadBox = false;
	        	}
	        }
 		
		});
	}
	
	
	//查询备课包列表
	$scope.contentpageConfig={
		pagesLength:10,
		itemsPerPage: 10,
		perPageOptions: [5],
		currentPage:1,
		totalItems:0,
		onChange: function() {
			$scope.findAll();
		}
	};
	
	$scope.findAll();
}]);


	