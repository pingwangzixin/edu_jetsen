app.controller('studentSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	$scope.entrance = null;
	$http.get("file/student.json").success((data)=>{
		$scope.entrance =data;
	})
	$scope.jump = function(url){
		if(sessionStorage.userId){
			window.open(url+"&userId="+sessionStorage.userId,'_blank')
		}else{
			alert("请先登录")
		}
		
	}
$scope.userLoggedMsg = {};
		var userId = sessionStorage.getItem('userId') || '';
		var userType = sessionStorage.getItem('userType') || '';
		if(userId){
			$http.get(requireIp + 'jeuc/api/uc/ucUser/'+userId+'/'+userType).success(function(data) {
				if(data.ret==200){
					if(userType=="2"){
						$scope.userLoggedMsg = data.data.stuInfo;
					}else if(userType=="3"){
						$scope.userLoggedMsg = data.data.stuInfo[0];
					}
//					else if(userType=="3"){
//						$scope.userLoggedMsg = data.data.parInfo;
//						$scope.roles = data.data.userRole;
//					}
//					else if(userType=="4"){
//						$scope.userLoggedMsg = data.data.userInfo;
//						$scope.roles = data.data.userRole;
//						for (var i=0;i<$scope.roles.length;i++) {
//							$scope.roles[i].roleName = $scope.roles[i].name;
//							$scope.roles[i].rid = $scope.roles[i].id;
//							if($scope.roles[i].rid == 25){
//								$scope.adminBtn =true;
//							}
//						}
//					}else{
//						
//					}
					$scope.userLoggedMsg.surname = $scope.userLoggedMsg.realname.substring(0,1);
				}
			}).error(function (){
				
			});
		}

}]);

