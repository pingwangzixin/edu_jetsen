app.controller('teachingStatisticsNavCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
	//$rootScope.variableGlobal 全局变量包 详见app.js 需要全局变量可追加
	$rootScope.variableGlobal.leaderInquiryNav = [
		{name : '资源统计',url : 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.resourcesStatisticsWrap'},
		{name : '试题统计',url : 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.testQuestions'},
		{name : '课堂统计',url : 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.classroom'},
		{name : '作业统计',url : 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.homework'},
		{name : '评价统计',url : 'secondNav.leftTree.leaderInquiryNav.teachingStatisticsNav.evaluateWrap'}
	];
	
	//变量包
    $scope.variablePacket = {

    };

//	var str = "http://192.168.9.113:81/Preview/20181026/03f1c4aac60f405283b99589b3b5430e.jpg".replace(/^(?:[^/]*\/){3}(.*)$/,"$1")  
//	console.log(str) // def/dagdsgf/  
}]);
