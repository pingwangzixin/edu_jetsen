app.controller('classMottoShowCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//定义变量
	$scope.variable = {
		type:'2',
		userId:sessionStorage.getItem("userId"),
		cuid:sessionStorage.getItem("cuid"),
		classId:sessionStorage.getItem("classId"),
		editFlag : false,
		userType:sessionStorage.getItem("userType"),
	};
	//根据登录的用户查询用户信息
		$scope.$watch('$viewContentLoaded', function() {
		 $http.get(jeucIp + 'uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRole, function(response, index) {
					$scope.roleName=response.roleName;
//				alert(123);
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
	 *查询班训
	 */
	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.classId;
	$http.get(jeucIp+"/ea/eaSpaceIntroduce?"+params)
	.success(function (data) {
		console.log(data);
		if(data.ret==200&&data.data!=null){
			$scope.id = data.data.id;
			$scope.content =data.data.content;
			$scope.imagePath = data.data.imagePath;
		}
    });
}]);
