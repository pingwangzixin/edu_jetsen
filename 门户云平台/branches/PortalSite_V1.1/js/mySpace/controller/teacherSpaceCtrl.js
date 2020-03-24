app.controller('teacherSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
		$scope.entrance = null;
		$http.get("file/teacher.json").success((data)=>{
			$scope.entrance =data;
		})
		$scope.jump = function(url){
			if(sessionStorage.userId){
				window.open(url+"&userId="+sessionStorage.userId,'_blank')
			}else{
				alert("请先登录")
			}
		}
		$scope.roles = [];
		$scope.rules = [];
		$scope.userLoggedMsg = {};
		var userId = sessionStorage.getItem('userId') || '';
		var userType = sessionStorage.getItem('userType') || '';
		if(userId){
			$http.get(requireIp + 'jeuc/api/uc/ucUser/'+userId+'/'+userType).success(function(data) {
				if(data.ret==200){
					if(userType=="1"){
						$scope.userLoggedMsg = data.data.userInfo;
						let bol1 =  data.data.userRole.some((e,i)=>{
							return e.rid == 18
						})
						let bol2 =  data.data.userRole.some((e,i)=>{
							return e.rid == 1
						})
						let bol3 =  data.data.userRole.some((e,i)=>{
							return e.rid == 14
						})
						if(bol1){
							$scope.roles.push("管理");
							data.data.userRole.forEach((e,i)=>{
								if(e.rid == 18){
									$scope.rules.push("校级领导组")
								}
							})
						}
						if(bol2){
							$scope.roles.push("班主任");
							data.data.userRole.forEach((e,i)=>{
								if(e.rid == 1){
									$scope.rules.push(e.subjectName+" "+e.gradeName + " (" + e.className + ") 班")
								}
							})
						}
						if(bol3){
							$scope.roles.push("任课教师");
							data.data.userRole.forEach((e,i)=>{
								if(e.rid == 14){
									$scope.rules.push(e.subjectName+" "+e.gradeName + " (" + e.className + ") 班")
								}
							})
						}
					}
//					else if(userType=="2"){
//						$scope.userLoggedMsg = data.data.stuInfo;
//					}else if(userType=="3"){
//						$scope.userLoggedMsg = data.data.parInfo;
//						$scope.roles = data.data.userRole;
//					}else if(userType=="4"){
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

