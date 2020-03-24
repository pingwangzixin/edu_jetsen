app.controller('studentSpaceCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($scope, $state, $timeout, $http, $location, $interval) {
	$scope.entrance = null;
	$http.get("file/student.json").success((data) => {
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

//	是否本人
	$scope.visiter = sessionStorage.visiter;


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
				console.log("bbbbbbbb")
				console.log(data);
				$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
					if (data.ret == 200) {
						if (userType == 2) {
							$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.stuInfo.userFace + "?" + new Date().getTime();
							if (data.data.stuInfo.userFace == "") {
								$scope.faceHave = true;
							} else {
								$scope.faceHave = false;
							}
						} else {
							$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.parInfo.userFace + "?" + new Date().getTime();
							if (data.data.parInfo.userFace == "") {
								$scope.faceHave = true;
							} else {
								$scope.faceHave = false;
							}
						};
						$scope.$broadcast('transfer.type', $scope.userImage);
					}

				})

			}
		})
	};



	var userId = $state.params.id || $location.search().userId || sessionStorage.getItem("userId");
	var userType = $state.params.type || $location.search().userType || sessionStorage.getItem("userType");
	var token = $location.search().token || sessionStorage.getItem("token");

	$scope.userId = userId;
	$scope.spaceEaIp = spaceEaIp;
	if (userId) {
		$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
			if (data.ret == 200) {
				if (userType == 2) {
					$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.stuInfo.userFace + "?" + new Date().getTime();
					if (data.data.stuInfo.userFace == "") {
						$scope.faceHave = true;
					} else {
						$scope.faceHave = false;
					}
				} else {
					$scope.userImage = spaceEaIp + '/resource/user/face/' + data.data.parInfo.userFace + "?" + new Date().getTime();
					if (data.data.parInfo.userFace == "") {
						$scope.faceHave = true;
					} else {
						$scope.faceHave = false;
					}
				};
				if (userType == "2") {
					console.log("此时存储了userType")
					sessionStorage.setItem("userType", userType);
					sessionStorage.setItem("userId", userId);
					sessionStorage.setItem("userName", data.data.stuInfo.realname);
					sessionStorage.setItem("classId", data.data.stuInfo.classId);
					sessionStorage.setItem("officeId", data.data.stuInfo.officeId);
					sessionStorage.setItem("token", token);
					if(!sessionStorage.getItem("myUserId")){
						console.log("此时存储了myUserId")
						sessionStorage.setItem("myUserId",userId);
						sessionStorage.setItem("myUserName",data.data.stuInfo.realname);
						sessionStorage.setItem("myUserType",2);
					}
					$scope.userLoggedMsg = data.data.stuInfo;
				} else if (userType == "3") {
					$scope.$broadcast('stuId', data.data.stuInfo[0].id);
					sessionStorage.setItem("userType", userType);
					sessionStorage.setItem("userId", userId);
					sessionStorage.setItem("stuId", data.data.stuInfo[0].id);
					sessionStorage.setItem("userName", data.data.parInfo.realname+"家长");
					sessionStorage.setItem("token", token);
					sessionStorage.setItem("classId", data.data.stuInfo[0].classId);
					sessionStorage.setItem("officeId", data.data.stuInfo[0].officeId);

					$scope.userLoggedMsg = data.data.stuInfo[0];
					$scope.userLoggedMsg.realname = data.data.stuInfo[0].realname + "家长";
					if(!sessionStorage.getItem("myUserId")){
						sessionStorage.setItem("myUserId",userId);
						sessionStorage.setItem("myUserName",data.data.parInfo.realname+"家长");
						sessionStorage.setItem("myUserType",3);
					}
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
				$scope.userLoggedMsg.surname = $scope.userLoggedMsg.realname.substring(0, 1);
			}
		}).error(function () {

		});
	}
	$scope.Navigation = [
			{
				name: "消息",
				url1: "wrap.space.studentSpace.stuNews",
				url2: "/wrap/space/studentSpace/stuNews",
				state: true
			},
			{
				name: "日志",
				url1: "wrap.space.studentSpace.stuDaily",
				url2: "/wrap/space/studentSpace/stuDaily",
				state: false
			},
			{
				name: "资源",
				url1: "wrap.space.studentSpace.stuResources",
				url2: "/wrap/space/studentSpace/stuResources",
				state: false
			},
			{
				name: "相册",
				url1: "wrap.space.studentSpace.stuAlbum",
				url2: "/wrap/space/studentSpace/stuAlbum",
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
	});
	if(!$scope.Navigation[0].state){
		$scope.Navigation[0].state  =  $scope.Navigation.every(ele=>{
			return  !ele.state
		})
	}
}]);



