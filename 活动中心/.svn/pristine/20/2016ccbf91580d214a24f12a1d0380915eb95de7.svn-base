app.controller('wrapCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope',function($scope,$state,$timeout,$http,$location,$q,$rootScope) {

	//个人信息       
	$scope.personalMsg = {};
	var token = $location.$$search.token;
	if(token == null || token == "" || token == undefined){
		token = sessionStorage.getItem('token');
	}else{
		sessionStorage.setItem('token',token);
	}
	
	$scope.personalMsg.userFace = "./img/userPhoto.png";
	
//	sessionStorage.setItem('token',token);
	var url = jeucIp+"/Api/UserInfo/getUser?token="+token+"&clientId="+id+"&clientSecret="+clientSecret;
//	var url = "http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaIdCard=100000200006090000"
	$http.get(url).success(function(res){
		if(res.ret != "1"){
			//没有权限 跳首页
			location.href = portalUrl;
			return ;
		}
		var userType = 1;
		var userId = null;
		if(res.userRole == "tea"){
			sessionStorage.setItem("user",JSON.stringify(res.teacherInfo));
			$scope.personalMsg.name = res.teacherInfo.teaName;
			$scope.personalMsg.role = res.teacherInfo.teaRole;
			$scope.personalMsg.school = res.teacherInfo.schoolName;
			if(!$.isEmptyObject(res.teacherInfo.teachingInfo)){
				$scope.personalMsg.class = res.teacherInfo.teachingInfo[1].subStages;
			}
			userType =1;
			userId = res.teacherInfo.teaId;
		}else if(res.userRole == "stu"){
			sessionStorage.setItem("user",JSON.stringify(res.studentInfo));
			$scope.personalMsg.name = res.studentInfo.stuName;
			$scope.personalMsg.role = "学生";
			$scope.personalMsg.school = res.studentInfo.stuClassInfo.schoolName;
			$scope.personalMsg.class= res.studentInfo.stuClassInfo.subStages
				$scope.personalMsg.classNo = res.studentInfo.stuClassInfo.classNo+"班";
			userType = 2;
			userId = res.studentInfo.stuId;
		}else{
			//没有权限 跳首页
			location.href = portalUrl;
		}
		
		$http.get(jeucIp+"api/uc/ucUser/findUserInfoUserId?userId="+userId+"&userType="+userType).success(function(data){
			console.log(data);
			if(data.ret != 200){
				return ;
			}
			if(res.userRole=="tea") {
				if(data.data.userInfo.userFace != ""){
				$scope.personalMsg.userFace = data.data.userInfo.userFace ;
			  }else{
				$scope.personalMsg.userFace = "./img/userPhoto.png";
			  }
			}else{
				if(data.data.stuInfo.userFace !=""){
					$scope.personalMsg.userFace = data.data.stuInfo.userFace;
				}else{
					$scope.personalMsg.userFace = "./img/userPhoto.png";
				}
			}
			sessionStorage.setItem("officeId",data.data.userInfo.officeId);
			sessionStorage.setItem("areaId",data.data.userInfo.areaId);
			sessionStorage.setItem("cityId",data.data.userInfo.cityId);
		});
		$scope.$broadcast('usertype',res.userRole)
		sessionStorage.setItem("type",res.userRole);
		$rootScope.userType = res.userRole;
		console.log($rootScope.userType);
	    $scope.showNav = res.userRole == 'tea' ? $scope.showNav =  true: $scope.showNav = false;
		
	});



	//退出
	$scope.logout = function(){
		sessionStorage.clear();
		location.href = portalUrl;
	};
	
}]);
