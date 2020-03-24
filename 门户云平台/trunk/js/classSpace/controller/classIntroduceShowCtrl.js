app.controller('classIntroduceShowCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval','templateServer',function($rootScope,$scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//上传背景显示
	$rootScope.bgFileClass = false;
	
	//定义变量
	$scope.variable = {
		type:'4',
		classId:sessionStorage.getItem("classId"),
		cuid:sessionStorage.getItem("cuid"),
		userId:sessionStorage.getItem("userId"),
		editFlag : false,
		userType:sessionStorage.getItem("userType"),
	};
	//根据登录的用户查询用户信息
		$scope.$watch('$viewContentLoaded', function() {
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRoleInfo, function(response, index) {
					$scope.roleName=response.roleName;
				})
		 	}
		 })
		})
		if($scope.variable.userType=="1"){
			$scope.variable.editFlag = false;//不隐藏
		}else{
			$scope.variable.editFlag= true;//隐藏编辑按钮
		}
	/**
	 * 查询班级介绍数据
	 */
	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.classId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params)
		 .success(function (data) {
		 	if (data.ret==200) {
		 		$scope.id = data.data.id;
		 		$scope.imagePath = data.data.imagePath;
		 		$scope.content =data.data.content;
		 	}
	     });
	
}]);
