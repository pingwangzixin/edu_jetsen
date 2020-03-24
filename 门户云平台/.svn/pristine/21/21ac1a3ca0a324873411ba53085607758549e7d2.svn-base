app.controller('registerCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	
	
	//角色列表
	$scope.roles = [
//		{name : '我是家长', href : '', src : 'register_parent', checked: false},
//		{name : '我是老师', href : '', src : 'register_teacher', checked: false},
//		{name : '我是管理者',href : '', src : 'register_manager', checked: false},
//		{name : '我是学生', href : '', src : 'register_student', checked: false}
	];
	//选择角色切换
	$scope.chooseRole = function ($i){
		angular.forEach($scope.roles,function (ele,i){
			ele.checked = false;
		});
		$scope.roles[$i].checked = true;
	};

}]);

