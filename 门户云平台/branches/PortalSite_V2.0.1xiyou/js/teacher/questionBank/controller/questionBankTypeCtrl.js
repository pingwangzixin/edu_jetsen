app.controller('questionBankTypeCtrl',['$scope','$rootScope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$rootScope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航相关设置（导航名称等）
	$rootScope.variableGlobal.navShowDet.modularName = '题库';
	
	//变量包
	$scope.variablePacket = {
		foundQuestion:false
	}
	
}]);


