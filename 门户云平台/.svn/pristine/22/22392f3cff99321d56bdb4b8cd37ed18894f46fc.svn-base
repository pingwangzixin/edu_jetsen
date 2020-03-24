app.controller('successInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
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
	
}]);

