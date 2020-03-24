app.controller('wrapCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', function ($scope, $state, $timeout, $http, $location, $q, $rootScope) {
	// sessionStorage.setItem("visiter", 0)visiterFlag

	$scope.userName = sessionStorage.getItem("myUserName"); //本地获取自己的名字
	console.log($scope.userName, "用户名")

	//如果没有  说明第一次进    只能通过地址栏携带的参数去获取
	if (!$scope.userName) {
		var userId = $location.search().userId;
		var userType = $location.search().userType;

		$http.get(spaceEaIp + '/ea/api/uc/ucUser/' + userId + '/' + userType).success(function (data) {
			console.log(data)
			if (data.ret == 200) {
				$scope.userName = data.data.userInfo ? data.data.userInfo.realname : data.data.stuInfo.realname;
				if ($location.search().userType == 3) $scope.userName = data.data.stuInfo[0].realname + "家长"
				if (data.data.userInfo) {
					for (var i = 0; i < data.data.userRole.length; i++) {
						console.log(data.data.userRole[i].rid)

						if (data.data.userRole[i].rid == 1) {
							console.log("存了班主任")
							//班主任
							sessionStorage.setItem("classLeader", "1");
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
						if (data.data.userRole[i].rid == 14) {
							sessionStorage.setItem("roleId", "14");
						}

					}
					var roleId = sessionStorage.roleId
					var userType = $location.search().userType
					console.log("----------", roleId)
					if (userType == 1 || userType == 4) {
						$scope.classSpaceFlag = roleId == 14 || roleId == 15 || roleId == 18 ? false : true;
					} else {
						$scope.classSpaceFlag = true
					}
					if (sessionStorage.getItem("classLeader") == 1) $scope.classSpaceFlag = true
				}

			}
		})
	}
	// 判断是否显示班级空间
	var roleId = sessionStorage.getItem("roleId")
	var userType = sessionStorage.getItem("userType")
	if (userType == 1 || userType == 4) {
		$scope.classSpaceFlag = roleId == 14 || roleId == 15 || roleId == 18 ? false : true;
	} else {
		$scope.classSpaceFlag = true
	}
	if (sessionStorage.getItem("classLeader") == 1) $scope.classSpaceFlag = true
	// 是否显示班级学校个人选项卡
	$scope.visiterFlag = true
	// 个人空间
	if ($location.path().indexOf('/wrap/space') != -1) {
		$scope.activeSpace = 0
		if ($state.params.id && $state.params.id !== sessionStorage.getItem("myUserId")) { //访客
			$scope.visiterFlag = false;
			sessionStorage.setItem("visiter", 1);
			sessionStorage.setItem("visiterId", $state.params.id);
			// sessionStorage.setItem("visiterType", $state.params.type);
		}
	}
	//班级空间
	if ($location.path().indexOf('classSpace') != -1) {
		$scope.activeSpace = 1
		if ($state.params.classId && $state.params.classId != sessionStorage.getItem("classId") || sessionStorage.getItem("visiter") == 1) {
			sessionStorage.setItem("visiter", 1);
			sessionStorage.setItem("visiterClassId", $state.params.classId);
			$scope.visiterFlag = false
		}
	}
	//学校空间
	if ($location.path().indexOf('schoolSpace') != -1) {
		$scope.activeSpace = 2
	}

	//点击跳转页面
	$scope.toSpace = function (index) {
		if ($scope.activeSpace == index) return
		if (index == 0) {
			$scope.activeSpace = 0
			var str = sessionStorage.getItem("userType") == 2 || sessionStorage.getItem("userType") == 3 ? "wrap.space.studentSpace.stuNews" : "wrap.space.teacherSpace.teaNews"
			$state.go(str)
		} else if (index == 1) {
			$scope.activeSpace = 1
			$state.go("wrap.classSpace.classSpaceIndex", {
				'userId': sessionStorage.getItem("userId"),
				'userType': sessionStorage.getItem("userType")
			})
		} else if (index == 2) {
			$scope.activeSpace = 2
			$state.go("wrap.schoolSpace.schoolSpaceIndex", {
				'userId': sessionStorage.getItem("userId"),
				'userType': sessionStorage.getItem("userType")
			})
		}
		sessionStorage.setItem("visiter", 0)
	}
	//退出登录
	$scope.logout = function () {
		sessionStorage.clear();
		window.location.href = 'http://www.mdjedu.net/Home/Index/index.html'

	}
	//防止用户直接通过地址栏输入
	if (sessionStorage.visiter == 1) $scope.visiterFlag = false
}]);
//新闻展示时间过滤器
app.filter('unique', function () {
	return function (collection) {
		var output = [],
			keys = [];
		angular.forEach(collection, function (item) {
			var key = item.roleName;
			if (keys.indexOf(key) === -1) {
				keys.push(key);
				output.push(item);
			}
		});
		return output;
	}
});