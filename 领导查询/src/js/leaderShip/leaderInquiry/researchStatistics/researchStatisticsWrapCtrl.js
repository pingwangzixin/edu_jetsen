app.controller('researchStatisticsWrapCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	//$rootScope.variableGlobal 全局变量包 详见app.js 需要全局变量可追加
	//领导查询一级导航
	$rootScope.variableGlobal.leaderInquiryNav = [
		{name : '教案统计',url : 'secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap.teachingStatistics'},
		{name : '活动统计',url : 'secondNav.leftTree.leaderInquiryNav.researchStatisticsWrap.activeStatistics'}
	];
	
	//变量包
    $scope.variablePacket = {
		
    };

	
}]);
