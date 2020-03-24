app.controller('teacherSpaceCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($scope, $state, $timeout, $http, $location, $interval) {

	$scope.entrance = null;
	$http.get("file/teacher.json").success((data) => {
		$scope.entrance = data;
	})
	$scope.jump = function (url) {
		if (sessionStorage.userId) {
			window.open(url + "&userId=" + sessionStorage.userId + "&token=" + sessionStorage.token, '_blank')
		} else {
			alert("请先登录")
		}
	}
	$scope.upload1 = function () {
		angular.element(document.getElementById("file1")).click();
	}
//	是否是本人
	$scope.visiter = sessionStorage.visiter;

	$scope.faceHave = true;
	$scope.uploadTeaImage = function (target) {
		console.log(target.files[0])


		var fd = new FormData();
		fd.append("file", target.files[0]);
		fd.append("id", sessionStorage.userId);
		$.ajax({
			url: spaceEaIp + "/ea/api/uc/ucUser/uploadUserFace",
			type: "POST",
			data: fd,
			dataType: "text",
			processData: false,
			contentType: false,
			success: function (data) {
				$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
					if (data.ret == 200) {
						if (data.data.userInfo.userFace == "") {
							$scope.faceHave = true;
						} else {
							$scope.faceHave = false;
						}
						$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.userInfo.userFace + "?" + new Date().getTime();
						//						$state.reload()
						$scope.$broadcast('transfer.type', $scope.userImage);

					}
				})

			},

		});



	}
	$scope.roles = [];
	$scope.rules = [];
	$scope.userLoggedMsg = {};
	//访客优先级最高  其次是 地址栏自己携带   其次是session
	var userId = $state.params.id || $location.search().userId || sessionStorage.getItem("userId");
	var userType = $state.params.type || $location.search().userType || sessionStorage.getItem("userType");
	var token = $location.search().token || sessionStorage.getItem("token");
	var toUserId = $location.search().toUserId || sessionStorage.getItem("toUserId");
	$scope.spaceEaIp = spaceEaIp;
	$scope.userId = userId;
	/*var userId = sessionStorage.getItem('userId') || '';
	var userType = sessionStorage.getItem('userType') || '';*/


	if (userId) {
		$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
			if (data.ret == 200) {
				console.log(data)
				sessionStorage.setItem("userId", userId);
				sessionStorage.setItem("userName", data.data.userInfo.realname);
				sessionStorage.setItem("userType", userType);
				sessionStorage.setItem("officeId", data.data.userInfo.officeId);
				sessionStorage.setItem("token", token);
				let arr = [];
				data.data.userCourse.forEach(ele=>{
					if(ele.roleName == "任课教师"){
						arr.push(ele.cid)
					}
				});
				sessionStorage.setItem("classId1", JSON.stringify(arr));

				for (var i = 0; i < data.data.userRole.length; i++) {
					if (data.data.userRole[i].rid == 1) {
						//班主任
						sessionStorage.setItem("classId", data.data.userRole[i].cid);
						if (sessionStorage.getItem("roleId") != "18" && sessionStorage.getItem("roleId") != "15") {
							sessionStorage.setItem("roleId", "1");
						}
					}
					if (data.data.userRole[i].rid == 15) {
						sessionStorage.setItem("roleId", "15");
					}
					if (data.data.userRole[i].rid == 18) {
						sessionStorage.setItem("roleId", "18");
					}
					if(data.data.userRole[i].rid == 14) 
					{
						sessionStorage.setItem("roleId", "14");
					}
				}
				if (!sessionStorage.getItem("myUserId")) {
					sessionStorage.setItem("myUserId", userId);
					sessionStorage.setItem("myUserName", data.data.userInfo.realname);
					sessionStorage.setItem("myUserType",userType);
					sessionStorage.setItem("myRoleId", sessionStorage.roleId);
					sessionStorage.setItem("myClassId", sessionStorage.classId);
				}


				//sessionStorage.setItem("");
				if (data.data.userInfo.userFace == "") {
					$scope.faceHave = true;
				} else {
					$scope.faceHave = false;
				}
				$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.userInfo.userFace + "?" + new Date().getTime();
				if (userType == "1" || userType == "4") {
					$scope.userLoggedMsg = data.data.userInfo;
					let bol1 = data.data.userRole.some((e, i) => {
						return e.rid == 18
					})
					let bol2 = data.data.userRole.some((e, i) => {
						return e.rid == 1
					})
					let bol3 = data.data.userRole.some((e, i) => {
						return e.rid == 14
					})
					if (bol1) {
						$scope.roles.push("管理");
						data.data.userRole.forEach((e, i) => {
							if (e.rid == 18) {
								$scope.rules.push("校级领导组")
							}
						})
					}
					if (bol2) {
						$scope.roles.push("班主任");
						data.data.userRole.forEach((e, i) => {
							if (e.rid == 1) {
								$scope.rules.push(e.subjectName + " " + e.gradeName + " (" + e.className + ") 班")
							}
						})
					}
					if (bol3) {
						$scope.roles.push("任课教师");
						data.data.userRole.forEach((e, i) => {
							if (e.rid == 14) {
								$scope.rules.push(e.subjectName + " " + e.gradeName + " (" + e.className + ") 班")
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

				$scope.userLoggedMsg.surname = $scope.userLoggedMsg.realname.substring(0, 1);
			}
		}).error(function () {

		});
	}
	$scope.Navigation = [
		{
			name: "消息",
			url1: "wrap.space.teacherSpace.teaNews",
			url2: "/wrap/space/teacherSpace/teaNews",
			state: true
		},
		{
			name: "日志",
			url1: "wrap.space.teacherSpace.teaDaily",
			url2: "/wrap/space/teacherSpace/teaDaily",
			state: false
		},
		{
			name: "资源",
			url1: "wrap.space.teacherSpace.teaResources",
			url2: "/wrap/space/teacherSpace/teaResources",
			state: false
		},
		{
			name: "相册",
			url1: "wrap.space.teacherSpace.teaAlbum",
			url2: "/wrap/space/teacherSpace/teaAlbum",
			state: false
		},
	]
	if($scope.visiter==1){
		$scope.Navigation.shift();
		$state.go($scope.Navigation[0].url1);
	}
	
	
	$scope.navigationJump = function (i) {
		$state.go(i.url1);
		$scope.Navigation.forEach(ele => {
			ele.state = false;
		})
		i.state = true;
	}
	$scope.Navigation.forEach(ele => {
		ele.state = false;
		if ($location.path().indexOf(ele.url2) != -1) {
			ele.state = true;
		}
	})
	if(!$scope.Navigation[0].state){
		$scope.Navigation[0].state  =  $scope.Navigation.every(ele=>{
			return  !ele.state
		})
	}
	

}]);

