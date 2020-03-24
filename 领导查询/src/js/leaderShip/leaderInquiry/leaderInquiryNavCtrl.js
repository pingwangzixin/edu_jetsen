app.controller('leaderInquiryNavCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	
	//面包屑导航
	$rootScope.variableGlobal.crumbs = {
		provincename : '黑龙江省',
		cityname : '牡丹江市',
		countyname : '',
		schoolname : '',
		provincenav: false,
		citynav: true,
		countynav: false,
		schoolnav: false,
	};
	
	//变量包
    $scope.variablePacket = {
		
    };

	
}]);
