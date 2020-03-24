app.controller('classHeadTeacherShowCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {
	//定义变量
	$scope.variable = {
		type:'5',
		classId:sessionStorage.getItem("classId"),
		userId: sessionStorage.getItem("userId"),
		editFlag : false,
		userType:sessionStorage.getItem("userType"),
	};
	//根据登录的用户查询用户信息
		$scope.$watch('$viewContentLoaded', function() {
		 $http.get(spaceEaIp + '/ea/api/uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRoleInfo, function(response, index) {
					$scope.roleName=response.roleName;
				})
		 	}
		 })
		})
		if(sessionStorage.classLeader == 1){
			$scope.variable.editFlag = false;//不隐藏
		}else{
			$scope.variable.editFlag= true;//隐藏编辑按钮
		}
		if (sessionStorage.getItem("visiter")==1) {
			console.log("访客模式")
			$scope.variable.editFlag = true;//隐藏编辑按钮
			$scope.variable.classId = sessionStorage.getItem('visiterClassId')
		}
	/**
	 * 查询班主任介绍信息 
	 */
	var params ='&type='+$scope.variable.type+'&relationId='+$scope.variable.classId;
	$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceIntroduce?"+params).success(function (data) {
		console.log(" 数据："+JSON.stringify(data))
		if(data.ret==200&&data.data!=null){
			$scope.id = data.data.id;
			$scope.content =data.data.content;
			$scope.imagePath = data.data.imagePath;
		}
    });
}]);
