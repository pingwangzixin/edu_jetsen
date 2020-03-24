app.controller('studentInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	$scope.xuanze=true;
	$scope.tianjia=false;
	$scope.qiehuan="xz"
	//导航切换
	$scope.personalInfoState = 0;
//	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	$scope.test=function(){
		if($scope.qiehuan=="xz"){
			$scope.xuanze=true;
			$scope.tianjia=false;
		}
		if($scope.qiehuan=="add"){
			$scope.xuanze=false;
			$scope.tianjia=true;
		}
	}
	
	
	
	
	
	//变量包
	$scope.aggregate = {
		join : 0,
	};
	
	//个人信息，账户管理切换
	$scope.switchContent = function(i){
		$scope.aggregate.join = i;
	}
	
	
	
	
	
}]);

