app.controller('schoolMottoShowCtrl',['$rootScope','$scope','$state','$timeout','$http','$location','$interval',function($rootScope,$scope,$state,$timeout,$http,$location,$interval) {
		//上传背景显示
//	$rootScope.bgFile = true;
//	$scope.ensconce=true;//是否显示编辑按钮 只有校领导可以修改校训
	//定义变量
	$scope.variable = {
		type:'1',
		officeId:sessionStorage.getItem("officeId"),
		userId:sessionStorage.getItem("userId"),
		userType:sessionStorage.getItem("userType"),
		id:$location.$$search.id,
	};
	console.log(sessionStorage.getItem("userType"));
//	//根据登录的用户查询用户信息
		 $http.get(spaceEaIp + '/ea/api/uc/ucUser/'+sessionStorage.getItem("userId")+'/'+sessionStorage.getItem("userType")).success(function(data){
		 	if (data.ret==200) {
		 		var data = data.data;
				angular.forEach(data.userRole, function(response,index) {
				$scope.variable.cuid=response.uid;
				})
		 	}
		 })
		 //学校管理员老师可以修改学校空间
			$scope.edFlig= "";		 
		 if ($scope.variable.userType=="4") {
		 	$scope.edFlig= false;//显示编辑按钮
		 } else{
		 	$scope.edFlig= true;//显示编辑按钮
		 }
	/**
	 *查询校训
	 */
	var params ='type='+$scope.variable.type+'&relationId='+$scope.variable.officeId;
	$http.get(spaceJeucIp+"/jeuc/api/ea/eaSpaceIntroduce?"+params).success(function (data) {
		if(data.ret==200&&data.data!=null){
			$scope.id = data.data.id;
			$scope.content =data.data.content;
			console.log($scope.content);
			$scope.imagePath = data.data.imagePath;
		}
    });
	
}]);
