app.controller('schoolSpaceShowCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$http', '$location', '$interval', function ($rootScope, $scope, $state, $timeout, $http, $location, $interval) {
	$scope.spaceEaIp = spaceEaIp ;

	//定义变量
	$scope.variable = {
		officeId: sessionStorage.getItem("officeId"),
		// officeId: 1000,
		userId: sessionStorage.getItem("userId"),
		userType: sessionStorage.getItem("userType"),
		goodSpaceState: ["班级", "老师", "学生"],		//优秀空间类型
		goodSpaceIndex: 0,				//优秀空间选项索引
		goodSpacePage: 0,				//优秀空间当前页数
		goodSpacePageTotal: [],				//优秀空间总页数
	};
	// 优秀空间切换
	$scope.nextFlag = false;
	$scope.prevFlag = false;
	$scope.goodSpaceStateChange = function (num) {
		if ($scope.variable.goodSpaceIndex == num) return
		$scope.nextFlag = false;
		$scope.prevFlag = false;
		$scope.variable.goodSpaceIndex = num;
		$scope.goodSpaceArr = num == 0 ? $scope.gradeList : num == 1 ? $scope.teaList : $scope.stuList;
		if ($scope.goodSpaceArr.length > 21) {
			$scope.nextFlag = true;
			$scope.variable.goodSpacePageTotal.length =Math.ceil($scope.goodSpaceArr.length/21) ;
		}else{
			$scope.variable.goodSpacePageTotal.length = 0
		}
		$scope.variable.goodSpacePage = 0;
		$scope.goodSpaceShowList = $scope.goodSpaceArr.slice(0, 21)
	}
	//优秀空间左右翻页		传入-1 为 跳转指定页
	$scope.showMoreSpace = function (direction,page) {
		if($scope.variable.goodSpacePage == page ) return
		//向左翻页
		if (direction == 0) {
			$scope.variable.goodSpacePage--
			$scope.goodSpaceShowList = $scope.goodSpaceArr.slice($scope.variable.goodSpacePage * 21, $scope.variable.goodSpacePage * 21 + 21)
			$scope.nextFlag = true;
			$scope.prevFlag = $scope.variable.goodSpacePage == 0 ? false : true;
		}
		//向右翻页
		if (direction == 1) {
			$scope.variable.goodSpacePage++
			$scope.goodSpaceShowList = $scope.goodSpaceArr.slice($scope.variable.goodSpacePage * 21, $scope.variable.goodSpacePage * 21 + 21)
			$scope.prevFlag = true;
			$scope.nextFlag = $scope.variable.goodSpacePage * 21 + 21 >= $scope.goodSpaceArr.length ? false : true;
		}
		//跳转指定页
		if(direction == -1){		
			$scope.variable.goodSpacePage = page 
			$scope.goodSpaceShowList = $scope.goodSpaceArr.slice($scope.variable.goodSpacePage * 21, $scope.variable.goodSpacePage * 21 + 21)
			if(page == 0){
				$scope.prevFlag = false;
				$scope.nextFlag = $scope.variable.goodSpacePage * 21 + 21 >= $scope.goodSpaceArr.length ? false : true;
			}else if(page == $scope.variable.goodSpacePageTotal.length -1){
				$scope.nextFlag = false;
				$scope.prevFlag = $scope.variable.goodSpacePage == 0 ? false : true;
			}else{
				$scope.prevFlag = true;
				$scope.nextFlag = true;
			}

		}	
	}
	// 优秀班级
	$http.get(spaceEaIp + "/ea/api/ea/eaGrade?officeId=" + $scope.variable.officeId).success(function (data) {
		if (data.ret == 200) {
			var arr = []
			data.data.forEach(item => {
				item.classes.forEach(child => {
					child.className = item.gradeName + child.className
					arr.push(child)
				})
			})
			// for (var i = 0; i < 22; i++) {
			// 	arr.push(i)
			// }
			$scope.gradeList = arr;
			$scope.goodSpaceArr = arr;
			$scope.goodSpaceShowList = $scope.gradeList.slice(0, 21)
			if ($scope.gradeList.length > 21) {
				$scope.nextFlag = true;
				$scope.variable.goodSpacePageTotal.length =Math.ceil($scope.goodSpaceArr.length/21) ;
			}
		}
	})
	// 优秀老师
	$http.get(spaceEaIp + "/ea/api/uc/ucUser?schoolId=" + $scope.variable.officeId + "&delFlag=0&state=1&userType=1").success(function (data) {
		if (data.ret == 200) {
			$scope.teaList = data.data.list
		}
	})
	// 优秀学生
	$http.get(spaceEaIp + "/ea/api/uc/ucUser?schoolId=" + $scope.variable.officeId + "&delFlag=0&state=1&userType=2").success(function (data) {
		if (data.ret == 200) {
			$scope.stuList = data.data.list
		}
	})





}]);
