app.controller('managerInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams','IDCheck',function($scope,$state,$timeout,$http,$location,$interval,$stateParams,IDCheck) {
	//导航切换
	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	//民族
	$http.get("file/nation.json").success(function (data) {
        $scope.nations = data.data;
    });
	
	//提交时必填项提示信息
	$scope.errorTip = false;
	
	//用户信息
	$scope.userInfo = {
		userName : '',
		userSex : '',
		userNation : '',
		userMobile : '',
		userId : '',
		userEmail : '',
		company : ''
	};
	
//	console.log(IDCheck.checkID('150104198902210147'))
	//身份证号验证
	$scope.checked = IDCheck.checkID;
	
	//
	$scope.selectChange = function (n){
		console.log(n)
	};
	
	//按钮
	$scope.submit = function (n){
		console.log(n.id_card.$viewValue)
		if($scope.userInfo.userName == '' || $scope.userInfo.userSex == '' || $scope.userInfo.userNation == '' || $scope.userInfo.userMobile == '' || $scope.userInfo.userId == '' || $scope.userInfo.userEmail == ''){
			$scope.errorTip = true;
		}else{
			$scope.errorTip = false;
		}
	};
	
}]);