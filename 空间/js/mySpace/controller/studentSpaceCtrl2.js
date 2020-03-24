app.controller('studentSpaceCtrl',['$scope','$state','$timeout','$http','$location','$interval',function($scope,$state,$timeout,$http,$location,$interval) {

	//公告通知
	$scope.noticeData = [
		{name : '李二狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李三狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李四狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
		{name : '李五狗',cont:'2017-10月5日-11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日学校放假11日'},
	];
	$scope.noticeData = $scope.noticeData.concat($scope.noticeData);
	
	
}]);

